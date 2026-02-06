import { LivenessErrorCode, useLiveness } from "react-livecheck";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

type Variant = "basic" | "full";

function BasicDemo() {
	const { t } = useTranslation();
	const { videoRef, blinkCount, passed, isReady } = useLiveness({
		requiredBlinks: 2,
		onSuccess: () => {},
	});

	return (
		<div className="relative inline-block overflow-hidden rounded-lg border border-border bg-muted/30">
			{!isReady && <p className="p-4 text-sm text-muted-foreground">{t("common.startingCamera")}</p>}
			<video
				ref={videoRef}
				autoPlay
				playsInline
				muted
				className="block h-auto max-h-[240px] w-full max-w-[320px] object-cover"
			/>
			<div className="border-t border-border bg-card px-4 py-2 text-sm">
				{t("common.blinks")}: {blinkCount}{" "}
				{passed && <span className="font-medium text-green-600">{t("common.passed")}</span>}
			</div>
		</div>
	);
}

function FullDemo() {
	const { t } = useTranslation();
	const { videoRef, blinkCount, passed, error, isReady, isFaceDetected, faceBoundingBox, retry } = useLiveness({
		requiredBlinks: 2,
		onSuccess: () => {},
		onError: () => {},
		faceDetectionTimeout: 30_000,
	});

	if (error) {
		return (
			<div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm">
				<p className="text-destructive">{error.message}</p>
				{error.code === LivenessErrorCode.PERMISSION_DENIED && (
					<p className="mt-2 text-muted-foreground">{t("common.allowCamera")}</p>
				)}
				<Button type="button" variant="outline" size="sm" onClick={retry} className="mt-3">
					{t("common.tryAgain")}
				</Button>
			</div>
		);
	}

	return (
		<div className="relative inline-block overflow-hidden rounded-lg border border-border bg-muted/30">
			{!isReady && <p className="p-4 text-sm text-muted-foreground">{t("common.startingCamera")}</p>}
			<video
				ref={videoRef}
				autoPlay
				playsInline
				muted
				className="block h-auto max-h-[240px] w-full max-w-[320px] object-cover"
			/>
			{faceBoundingBox && (
				<div
					className="pointer-events-none absolute border-2 border-green-500"
					style={{
						left: `${faceBoundingBox.x * 100}%`,
						top: `${faceBoundingBox.y * 100}%`,
						width: `${faceBoundingBox.width * 100}%`,
						height: `${faceBoundingBox.height * 100}%`,
					}}
				/>
			)}
			<div className="border-t border-border bg-card px-4 py-2 text-sm">
				{isReady && !isFaceDetected && <p className="text-muted-foreground">{t("common.positionFace")}</p>}
				{t("common.blinks")}: {blinkCount}{" "}
				{passed && <span className="font-medium text-green-600">{t("common.passed")}</span>}
			</div>
		</div>
	);
}

export function ExamplePreview({ variant }: { variant: Variant }) {
	if (variant === "basic") return <BasicDemo />;
	return <FullDemo />;
}
