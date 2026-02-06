import { CodeBlock } from "@/components/docs/code-block";
import { ExamplePreview } from "@/components/docs/example-preview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";

const basicCode =
	"const { videoRef, blinkCount, passed, isReady } = useLiveness({\n" +
	"  requiredBlinks: 2,\n" +
	'  onSuccess: () => console.log("Passed!"),\n' +
	"});\n" +
	"return (\n" +
	"  <>\n" +
	"    {!isReady && <p>Starting camera…</p>}\n" +
	"    <video ref={videoRef} autoPlay playsInline muted />\n" +
	'    <p>Blinks: {blinkCount} {passed && "Passed!"}</p>\n' +
	"  </>\n" +
	");";

const overlayCode =
	"const { videoRef, blinkCount, passed, error, isReady, faceBoundingBox, retry } = useLiveness({\n" +
	"  requiredBlinks: 2,\n" +
	'  onSuccess: () => console.log("Passed!"),\n' +
	"  onError: (err) => console.error(err),\n" +
	"  faceDetectionTimeout: 30_000,\n" +
	"});\n" +
	"if (error) return (\n" +
	"  <div><p>{error.message}</p><button onClick={retry}>Try again</button></div>\n" +
	");\n" +
	"return (\n" +
	'  <div style={{ position: "relative" }}>\n' +
	"    <video ref={videoRef} autoPlay playsInline muted />\n" +
	"    {faceBoundingBox && (\n" +
	'      <div style={{ position: "absolute", left: faceBoundingBox.x * 100 + "%", ... }} />\n' +
	"    )}\n" +
	'    <p>Blinks: {blinkCount} {passed && "Passed!"}</p>\n' +
	"  </div>\n" +
	");";

const timeoutCode = `useLiveness({
  requiredBlinks: 2,
  faceDetectionTimeout: 30_000, // FACE_NOT_DETECTED after 30s if no face
});`;

const customCode = `useLiveness({
  camera: { width: 1280, height: 720, facingMode: "user" },
  faceMesh: { minDetectionConfidence: 0.8, minTrackingConfidence: 0.8 },
  locateFile: (file) => \`/models/\${file}\`,
});`;

export default function Examples() {
	const { t } = useTranslation();
	return (
		<article className="space-y-6">
			<h1 className="text-2xl font-semibold tracking-tight">{t("examples.title")}</h1>

			<section className="space-y-3">
				<h2 className="text-lg font-medium">{t("examples.basic")}</h2>
				<p className="text-sm text-muted-foreground">{t("examples.basicDesc")}</p>
				<Card className="border-border/50 shadow-none">
					<CardHeader className="py-3">
						<CardTitle className="text-xs font-medium text-muted-foreground">{t("common.liveDemo")}</CardTitle>
					</CardHeader>
					<CardContent>
						<ExamplePreview variant="basic" />
					</CardContent>
				</Card>
				<CodeBlock code={basicCode} language="tsx" />
			</section>

			<section className="space-y-3">
				<h2 className="text-lg font-medium">{t("examples.withOverlay")}</h2>
				<p className="text-sm text-muted-foreground">{t("examples.withOverlayDesc")}</p>
				<Card className="border-border/50 shadow-none">
					<CardHeader className="py-3">
						<CardTitle className="text-xs font-medium text-muted-foreground">{t("common.liveDemo")}</CardTitle>
					</CardHeader>
					<CardContent>
						<ExamplePreview variant="full" />
					</CardContent>
				</Card>
				<CodeBlock code={overlayCode} language="tsx" />
			</section>

			<section className="space-y-3">
				<h2 className="text-lg font-medium">{t("examples.withTimeout")}</h2>
				<p className="text-sm text-muted-foreground">{t("examples.withTimeoutDesc")}</p>
				<CodeBlock code={timeoutCode} language="tsx" />
			</section>

			<section className="space-y-3">
				<h2 className="text-lg font-medium">{t("examples.customConfig")}</h2>
				<p className="text-sm text-muted-foreground">{t("examples.customConfigDesc")}</p>
				<CodeBlock code={customCode} language="tsx" />
			</section>
		</article>
	);
}
