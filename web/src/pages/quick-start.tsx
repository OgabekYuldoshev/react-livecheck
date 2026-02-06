import { CodeBlock } from "@/components/docs/code-block";
import { useTranslation } from "@/hooks/use-translation";

const quickStartCode =
	'import { useLiveness } from "react-livecheck";\n\n' +
	"function LivenessScreen() {\n" +
	"  const { videoRef, blinkCount, passed, isReady } = useLiveness({\n" +
	"    requiredBlinks: 2,\n" +
	'    onSuccess: () => console.log("Passed!"),\n' +
	"  });\n\n" +
	"  return (\n" +
	'    <div style={{ position: "relative", display: "inline-block" }}>\n' +
	"      {!isReady && <p>Starting camera…</p>}\n" +
	"      <video ref={videoRef} autoPlay playsInline muted />\n" +
	'      <p>Blinks: {blinkCount} {passed && "— Passed!"}</p>\n' +
	"    </div>\n" +
	"  );\n" +
	"}";

export default function QuickStart() {
	const { t } = useTranslation();
	return (
		<article className="space-y-4">
			<h1 className="text-2xl font-semibold tracking-tight">{t("quickStart.title")}</h1>
			<p className="text-sm text-muted-foreground leading-relaxed">{t("quickStart.description")}</p>
			<CodeBlock code={quickStartCode} language="tsx" />
		</article>
	);
}
