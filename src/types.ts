import type { RefObject } from "react";

export type Landmarks = Array<{ x: number; y: number; z: number }>;

/** Normalized face bounding box (0–1 relative to video size) */
export interface FaceBoundingBox {
	x: number;
	y: number;
	width: number;
	height: number;
}

export const LivenessErrorCode = {
	ABORTED: "ABORTED",
	CAMERA_IN_USE: "CAMERA_IN_USE",
	CAMERA_NOT_FOUND: "CAMERA_NOT_FOUND",
	FACE_NOT_DETECTED: "FACE_NOT_DETECTED",
	MODEL_LOAD_FAILED: "MODEL_LOAD_FAILED",
	MULTIPLE_FACES: "MULTIPLE_FACES",
	NOT_ALLOWED: "NOT_ALLOWED",
	OVERCONSTRAINED: "OVERCONSTRAINED",
	PERMISSION_DENIED: "PERMISSION_DENIED",
	PLAY_FAILED: "PLAY_FAILED",
	UNKNOWN: "UNKNOWN",
} as const;

export type LivenessErrorCode = (typeof LivenessErrorCode)[keyof typeof LivenessErrorCode];

export interface LivenessError {
	code: LivenessErrorCode;
	message: string;
}

export interface UseLivenessCameraOptions {
	width?: number;
	height?: number;
	facingMode?: "user" | "environment";
}

export interface UseLivenessFaceMeshOptions {
	maxNumFaces?: number;
	minDetectionConfidence?: number;
	minTrackingConfidence?: number;
}

export interface UseLivenessOptions {
	/** Blinks required to pass (default: 2) */
	requiredBlinks?: number;
	/** Called once when liveness passes */
	onSuccess?: () => void;
	/** Called when an error occurs */
	onError?: (error: LivenessError) => void;
	/** Custom URL for MediaPipe model files (default: jsDelivr CDN) */
	locateFile?: (file: string) => string;
	/** Camera constraints */
	camera?: UseLivenessCameraOptions;
	/** FaceMesh model options */
	faceMesh?: UseLivenessFaceMeshOptions;
	/** Timeout in ms before FACE_NOT_DETECTED if no face seen (0 = disabled) */
	faceDetectionTimeout?: number;
}

export interface UseLivenessReturn {
	videoRef: RefObject<HTMLVideoElement | null>;
	blinkCount: number;
	passed: boolean;
	error: LivenessError | null;
	isReady: boolean;
	isFaceDetected: boolean;
	/** Face bounding box (0–1), null when no face */
	faceBoundingBox: FaceBoundingBox | null;
	retry: () => void;
}
