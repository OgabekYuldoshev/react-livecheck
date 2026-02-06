import { APISection } from "@/components/docs/APISection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslation } from "@/hooks/useTranslation";

export default function ApiReference() {
	const { t } = useTranslation();
	const optionHeaders = [t("api.option"), t("api.type"), t("api.default"), t("api.description")];
	const returnHeaders = [t("api.property"), t("api.type"), t("api.description")];
	const errorHeaders = [t("api.code"), t("api.meaning")];

	const optionsRows = [
		{ cells: ["requiredBlinks", "number", "2", "Number of blinks required to pass."] },
		{ cells: ["onSuccess", "() => void", "—", "Called once when liveness passes."] },
		{ cells: ["onError", "(error: LivenessError) => void", "—", "Called when an error occurs."] },
		{ cells: ["locateFile", "(file: string) => string", "jsDelivr CDN", "URL for MediaPipe model files."] },
		{ cells: ["camera", "{ width?, height?, facingMode? }", "640×480, user", "Camera constraints."] },
		{
			cells: [
				"faceMesh",
				"{ maxNumFaces?, minDetectionConfidence?, minTrackingConfidence? }",
				"—",
				"FaceMesh model options.",
			],
		},
		{
			cells: [
				"faceDetectionTimeout",
				"number",
				"0 (off)",
				"Timeout in ms before FACE_NOT_DETECTED if no face is seen.",
			],
		},
	];

	const returnRows = [
		{ cells: ["videoRef", "RefObject<HTMLVideoElement | null>", "Attach to a <video> element."] },
		{ cells: ["blinkCount", "number", "Current number of detected blinks."] },
		{ cells: ["passed", "boolean", "true when required blinks are reached."] },
		{ cells: ["error", "LivenessError | null", "Current error (code + message)."] },
		{ cells: ["isReady", "boolean", "Camera has started."] },
		{ cells: ["isFaceDetected", "boolean", "A face is currently in frame."] },
		{
			cells: ["faceBoundingBox", "FaceBoundingBox | null", "Normalized face box (0–1) for overlay; null when no face."],
		},
		{ cells: ["retry", "() => void", "Clear error and restart (e.g. after permission grant)."] },
	];

	const errorRows = [
		{ cells: ["ABORTED", "Camera request was aborted (e.g. user navigated away)."] },
		{ cells: ["CAMERA_IN_USE", "Camera is in use by another app or tab (NotReadableError)."] },
		{ cells: ["CAMERA_NOT_FOUND", "No camera device found."] },
		{ cells: ["FACE_NOT_DETECTED", "No face seen within faceDetectionTimeout."] },
		{ cells: ["MODEL_LOAD_FAILED", "MediaPipe model failed to load (network, CDN, or WASM)."] },
		{ cells: ["MULTIPLE_FACES", "More than one face in frame; use retry() to try again."] },
		{ cells: ["NOT_ALLOWED", "Camera not supported (e.g. non-HTTPS, no mediaDevices)."] },
		{ cells: ["OVERCONSTRAINED", "Requested camera constraints not supported."] },
		{ cells: ["PERMISSION_DENIED", "User denied camera access."] },
		{ cells: ["PLAY_FAILED", "Video failed to play (e.g. autoplay policy)."] },
		{ cells: ["UNKNOWN", "Other errors."] },
	];

	return (
		<article className="space-y-4">
			<h1 className="text-2xl font-semibold tracking-tight">{t("api.title")}</h1>
			<Tabs defaultValue="options">
				<TabsList>
					<TabsTrigger value="options">{t("api.options")}</TabsTrigger>
					<TabsTrigger value="return">{t("api.return")}</TabsTrigger>
					<TabsTrigger value="errors">{t("api.errorCodes")}</TabsTrigger>
				</TabsList>
				<TabsContent value="options">
					<APISection title={t("api.useLivenessOptions")} headers={optionHeaders} rows={optionsRows} />
				</TabsContent>
				<TabsContent value="return">
					<APISection title={t("api.useLivenessOptions")} headers={returnHeaders} rows={returnRows} />
				</TabsContent>
				<TabsContent value="errors">
					<APISection title={t("api.errorCodes")} headers={errorHeaders} rows={errorRows} />
				</TabsContent>
			</Tabs>
		</article>
	);
}
