import { Camera } from "@mediapipe/camera_utils";
import { FaceMesh, type Results } from "@mediapipe/face_mesh";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	DEFAULT_HEIGHT,
	DEFAULT_LOCATE_FILE,
	DEFAULT_REQUIRED_BLINKS,
	DEFAULT_WIDTH,
	LEFT_EYE,
	RIGHT_EYE,
} from "./constants";
import type { FaceBoundingBox, Landmarks, LivenessError, UseLivenessOptions, UseLivenessReturn } from "./types";
import { LivenessErrorCode } from "./types";
import { ear, getMediaErrorCode, isFaceCentered } from "./utils";

export function useLiveness(options: UseLivenessOptions = {}): UseLivenessReturn {
	const optionsRef = useRef(options);
	optionsRef.current = options;

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const cameraRef = useRef<Camera | null>(null);
	const eyeClosedRef = useRef(false);
	const faceDetectionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const faceEverDetectedRef = useRef(false);
	const initCountRef = useRef(0);
	const mountedRef = useRef(true);
	const modelErrorRef = useRef(false);
	const multipleFacesErrorSentRef = useRef(false);

	const [blinkCount, setBlinkCount] = useState(0);
	const [passed, setPassed] = useState(false);
	const [error, setErrorState] = useState<LivenessError | null>(null);
	const [isReady, setReady] = useState(false);
	const [isFaceDetected, setFaceDetected] = useState(false);
	const [faceBoundingBox, setFaceBoundingBox] = useState<FaceBoundingBox | null>(null);
	const [retryCount, setRetryCount] = useState(0);

	const onSuccessRef = useRef(options.onSuccess);
	const onErrorRef = useRef(options.onError);
	onSuccessRef.current = options.onSuccess;
	onErrorRef.current = options.onError;

	const setError = useCallback((err: LivenessError) => {
		setErrorState(err);
		onErrorRef.current?.(err);
	}, []);

	const retry = useCallback(() => {
		setErrorState(null);
		setBlinkCount(0);
		setPassed(false);
		setReady(false);
		setFaceDetected(false);
		setFaceBoundingBox(null);
		faceEverDetectedRef.current = false;
		modelErrorRef.current = false;
		multipleFacesErrorSentRef.current = false;
		if (faceDetectionTimeoutRef.current) {
			clearTimeout(faceDetectionTimeoutRef.current);
			faceDetectionTimeoutRef.current = null;
		}
		setRetryCount((c) => c + 1);
	}, []);

	const detectBlink = useCallback((lm: Landmarks, required: number) => {
		if (!isFaceCentered(lm)) return;

		const L = LEFT_EYE.map((i) => lm[i]).filter(Boolean);
		const R = RIGHT_EYE.map((i) => lm[i]).filter(Boolean);
		if (L.length !== 6 || R.length !== 6) return;

		const v = (ear(L as Landmarks) + ear(R as Landmarks)) / 2;

		if (v < 0.2 && !eyeClosedRef.current) eyeClosedRef.current = true;
		if (v > 0.25 && eyeClosedRef.current) {
			setBlinkCount((b) => {
				const next = b + 1;
				if (next >= required) setPassed(true);
				return next;
			});
			eyeClosedRef.current = false;
		}
	}, []);

	const onResultsRef = useRef<(results: Results) => void>(() => {});
	onResultsRef.current = (results: Results) => {
		if (!mountedRef.current || modelErrorRef.current) return;

		const faces = results.multiFaceLandmarks ?? [];
		if (faces.length > 1) {
			setFaceDetected(false);
			setFaceBoundingBox(null);
			if (!multipleFacesErrorSentRef.current) {
				multipleFacesErrorSentRef.current = true;
				setError({
					code: LivenessErrorCode.MULTIPLE_FACES,
					message: "Only one face should be visible",
				});
				setPassed(false);
				setReady(false);
				cameraRef.current?.stop();
				cameraRef.current = null;
			}
			return;
		}
		const lm: Landmarks | undefined = faces[0];
		if (!lm || lm.length < 468) {
			setFaceDetected(false);
			setFaceBoundingBox(null);
			return;
		}

		const xs = lm.map((p) => p.x);
		const ys = lm.map((p) => p.y);
		const minX = Math.min(...xs);
		const maxX = Math.max(...xs);
		const minY = Math.min(...ys);
		const maxY = Math.max(...ys);
		setFaceBoundingBox({
			x: minX,
			y: minY,
			width: maxX - minX,
			height: maxY - minY,
		});

		if (faceDetectionTimeoutRef.current) {
			clearTimeout(faceDetectionTimeoutRef.current);
			faceDetectionTimeoutRef.current = null;
		}
		faceEverDetectedRef.current = true;
		setFaceDetected(true);
		detectBlink(lm, optionsRef.current.requiredBlinks ?? DEFAULT_REQUIRED_BLINKS);
	};

	// Not supported (SSR / no mediaDevices)
	const canUseMedia = typeof window !== "undefined" && !!navigator?.mediaDevices;

	useEffect(() => {
		mountedRef.current = true;

		if (!canUseMedia) {
			setError({
				code: LivenessErrorCode.NOT_ALLOWED,
				message: "Camera not supported in this environment",
			});
			return () => {
				mountedRef.current = false;
			};
		}
		if (!videoRef.current) {
			return () => {
				mountedRef.current = false;
			};
		}

		const initId = ++initCountRef.current;
		const opts = optionsRef.current;
		const cam = opts.camera ?? {};
		const fm = opts.faceMesh ?? {};
		const width = cam.width ?? DEFAULT_WIDTH;
		const height = cam.height ?? DEFAULT_HEIGHT;
		const facingMode = cam.facingMode ?? "user";
		const timeoutMs = opts.faceDetectionTimeout ?? 0;

		const faceMesh = new FaceMesh({
			locateFile: opts.locateFile ?? DEFAULT_LOCATE_FILE,
		});

		faceMesh.setOptions({
			maxNumFaces: fm.maxNumFaces ?? 1,
			refineLandmarks: true,
			minDetectionConfidence: fm.minDetectionConfidence ?? 0.7,
			minTrackingConfidence: fm.minTrackingConfidence ?? 0.7,
		});

		const handleResults = (results: Results) => onResultsRef.current(results);
		faceMesh.onResults(handleResults);

		const camera = new Camera(videoRef.current, {
			width,
			height,
			facingMode,
			onFrame: async () => {
				if (!videoRef.current || initId !== initCountRef.current || modelErrorRef.current) return;
				try {
					await faceMesh.send({ image: videoRef.current });
				} catch (err) {
					if (!mountedRef.current || initId !== initCountRef.current) return;
					modelErrorRef.current = true;
					setError({
						code: LivenessErrorCode.MODEL_LOAD_FAILED,
						message: err instanceof Error ? err.message : "Model failed to load",
					});
					setReady(false);
					cameraRef.current?.stop();
					cameraRef.current = null;
				}
			},
		});

		faceEverDetectedRef.current = false;

		camera
			.start()
			.then(() => {
				if (!mountedRef.current || initId !== initCountRef.current) return;
				setReady(true);
				setErrorState(null);
				if (timeoutMs > 0) {
					faceDetectionTimeoutRef.current = setTimeout(() => {
						if (!mountedRef.current || initId !== initCountRef.current) return;
						if (!faceEverDetectedRef.current) {
							faceDetectionTimeoutRef.current = null;
							setError({
								code: LivenessErrorCode.FACE_NOT_DETECTED,
								message: "No face detected in time",
							});
							setReady(false);
							setFaceDetected(false);
							setFaceBoundingBox(null);
							cameraRef.current?.stop();
							cameraRef.current = null;
						}
					}, timeoutMs);
				}
				videoRef.current?.play()?.catch((playErr: unknown) => {
					if (!mountedRef.current || initId !== initCountRef.current) return;
					setError({
						code: LivenessErrorCode.PLAY_FAILED,
						message: playErr instanceof Error ? playErr.message : "Video play failed (try allowing autoplay)",
					});
					setReady(false);
					cameraRef.current?.stop();
					cameraRef.current = null;
				});
			})
			.catch((err: unknown) => {
				if (!mountedRef.current || initId !== initCountRef.current) return;
				setError({
					code: getMediaErrorCode(err),
					message: err instanceof Error ? err.message : "Camera failed to start",
				});
			});

		cameraRef.current = camera;

		return () => {
			mountedRef.current = false;
			if (faceDetectionTimeoutRef.current) {
				clearTimeout(faceDetectionTimeoutRef.current);
				faceDetectionTimeoutRef.current = null;
			}
			cameraRef.current?.stop();
			cameraRef.current = null;
		};
	}, [canUseMedia, retryCount, detectBlink]);

	// onSuccess when passed becomes true (once)
	useEffect(() => {
		if (passed) onSuccessRef.current?.();
	}, [passed]);

	return {
		videoRef,
		blinkCount,
		passed,
		error,
		isReady,
		isFaceDetected,
		faceBoundingBox,
		retry,
	};
}
