import { useEffect, useRef } from "react";
import { LivenessErrorCode, useLiveness } from "react-livecheck";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useTranslation } from "@/hooks/use-translation";

type LivenessModalProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

const AUTO_CLOSE_MS = 5000;

function LivenessContent({ onSuccess }: { onSuccess: () => void }) {
	const { t } = useTranslation();
	const autoCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const { videoRef, blinkCount, passed, error, isReady, isFaceDetected, faceBoundingBox, retry } = useLiveness({
		requiredBlinks: 2,
		onSuccess: () => {},
		onError: () => {},
		faceDetectionTimeout: 30_000,
	});

	useEffect(() => {
		if (passed) {
			autoCloseTimerRef.current = setTimeout(() => {
				onSuccess();
			}, AUTO_CLOSE_MS);
			return () => {
				if (autoCloseTimerRef.current) clearTimeout(autoCloseTimerRef.current);
			};
		}
	}, [passed, onSuccess]);

	if (error) {
		return (
			<div className="space-y-4">
				<div className="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
					<p className="font-medium">{error.message}</p>
					{error.code === LivenessErrorCode.PERMISSION_DENIED && (
						<p className="mt-1 text-muted-foreground">{t("common.allowCamera")}</p>
					)}
				</div>
				<div className="flex flex-wrap gap-2">
					<Button type="button" onClick={retry} className="min-h-11 touch-manipulation sm:min-h-0">
						{t("demo.retry")}
					</Button>
					<Button type="button" variant="outline" onClick={onSuccess} className="min-h-11 touch-manipulation sm:min-h-0">
						{t("demo.close")}
					</Button>
				</div>
			</div>
		);
	}

	if (passed) {
		return (
			<div className="flex flex-col items-center gap-3 py-4">
				<div className="w-full rounded-lg border border-green-500/50 bg-green-500/10 px-4 py-3 text-center text-sm text-green-700 dark:text-green-400">
					<p className="font-medium">{t("demo.successTitle")}</p>
					<p className="mt-1 text-muted-foreground">{t("demo.successMessage")}</p>
					<p className="mt-2 text-xs text-muted-foreground">{t("demo.autoClose")}</p>
				</div>
				<Button type="button" variant="outline" onClick={onSuccess} className="min-h-11 touch-manipulation sm:min-h-0">
					{t("demo.close")}
				</Button>
			</div>
		);
	}

	return (
		<div className="space-y-3 sm:space-y-4">
			<div className="relative aspect-[4/3] max-h-[45vh] min-h-[180px] overflow-hidden rounded-lg border border-border bg-muted/30 sm:max-h-none sm:min-h-0">
				{!isReady && (
					<div className="absolute inset-0 flex items-center justify-center p-4">
						<p className="text-center text-sm text-muted-foreground">{t("common.startingCamera")}</p>
					</div>
				)}
				<video ref={videoRef} autoPlay playsInline muted className="block h-full w-full object-cover" />
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
			</div>
			<div className="rounded-lg border border-border/50 bg-muted/20 px-3 py-2 text-sm">
				{isReady && !isFaceDetected && <p className="text-muted-foreground">{t("common.positionFace")}</p>}
				<p className="text-foreground">
					{t("common.blinks")}: {blinkCount}
					{passed && <span className="ml-2 font-medium text-green-600 dark:text-green-400">{t("common.passed")}</span>}
				</p>
			</div>
		</div>
	);
}

export function LivenessModal({ open, onOpenChange }: LivenessModalProps) {
	const { t } = useTranslation();

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent showClose={true} closeLabel={t("demo.close")} className="w-[calc(100%-1.5rem)] sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-base sm:text-lg">{t("demo.title")}</DialogTitle>
					<DialogDescription className="text-xs sm:text-sm">{t("demo.description")}</DialogDescription>
				</DialogHeader>
				{open ? <LivenessContent onSuccess={() => onOpenChange(false)} /> : null}
			</DialogContent>
		</Dialog>
	);
}
