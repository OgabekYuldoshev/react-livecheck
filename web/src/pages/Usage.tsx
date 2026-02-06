import { CodeBlock } from "@/components/docs/CodeBlock";
import { useTranslation } from "@/hooks/useTranslation";

const usageCode =
	'import { useLiveness, LivenessErrorCode } from "react-livecheck";\n\n' +
	"function LivenessScreen() {\n" +
	"  const {\n" +
	"    videoRef,\n" +
	"    blinkCount,\n" +
	"    passed,\n" +
	"    error,\n" +
	"    isReady,\n" +
	"    isFaceDetected,\n" +
	"    faceBoundingBox,\n" +
	"    retry,\n" +
	"  } = useLiveness({\n" +
	"    requiredBlinks: 2,\n" +
	'    onSuccess: () => console.log("Liveness passed!"),\n' +
	"    onError: (err) => console.error(err.code, err.message),\n" +
	"    faceDetectionTimeout: 30_000,\n" +
	"  });\n\n" +
	"  if (error) {\n" +
	"    return (\n" +
	"      <div>\n" +
	"        <p>{error.message}</p>\n" +
	"        {error.code === LivenessErrorCode.PERMISSION_DENIED && (\n" +
	"          <p>Please allow camera access.</p>\n" +
	"        )}\n" +
	'        <button type="button" onClick={retry}>Try again</button>\n' +
	"      </div>\n" +
	"    );\n" +
	"  }\n\n" +
	"  return (\n" +
	'    <div style={{ position: "relative", display: "inline-block" }}>\n' +
	"      {!isReady && <p>Starting camera…</p>}\n" +
	"      <video ref={videoRef} autoPlay playsInline muted />\n" +
	"      {faceBoundingBox && (\n" +
	"        <div\n" +
	"          style={{\n" +
	'            position: "absolute",\n' +
	"            left: `${faceBoundingBox.x * 100}%`,\n" +
	"            top: `${faceBoundingBox.y * 100}%`,\n" +
	"            width: `${faceBoundingBox.width * 100}%`,\n" +
	"            height: `${faceBoundingBox.height * 100}%`,\n" +
	'            border: "2px solid lime",\n' +
	'            pointerEvents: "none",\n' +
	"          }}\n" +
	"        />\n" +
	"      )}\n" +
	"      {isReady && !isFaceDetected && <p>Position your face in the frame.</p>}\n" +
	'      <p>Blinks: {blinkCount} {passed && "— Passed!"}</p>\n' +
	"    </div>\n" +
	"  );\n" +
	"}";

export default function Usage() {
	const { t } = useTranslation();
	return (
		<article className="space-y-4">
			<h1 className="text-2xl font-semibold tracking-tight">{t("usage.title")}</h1>
			<p className="text-sm text-muted-foreground leading-relaxed">{t("usage.description")}</p>
			<CodeBlock code={usageCode} language="tsx" />
		</article>
	);
}
