import { CodeBlock } from "@/components/docs/CodeBlock";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

const configExample = `useLiveness({
  camera: { width: 640, height: 480, facingMode: "user" },
  faceMesh: {
    maxNumFaces: 1,
    minDetectionConfidence: 0.7,
    minTrackingConfidence: 0.7,
  },
  locateFile: (file) => \`https://your-cdn.com/face_mesh/\${file}\`,
  faceDetectionTimeout: 30_000,
})`;

export default function Configuration() {
	const { t } = useTranslation();
	return (
		<article className="space-y-4">
			<h1 className="text-2xl font-semibold tracking-tight">{t("configuration.title")}</h1>
			<p className="text-sm text-muted-foreground leading-relaxed">{t("configuration.intro")}</p>
			<Card className="border-border/50 shadow-none">
				<CardHeader className="py-3">
					<CardTitle className="text-base font-medium">{t("configuration.camera")}</CardTitle>
				</CardHeader>
				<CardContent className="py-0 text-sm text-muted-foreground">{t("configuration.cameraDesc")}</CardContent>
			</Card>
			<Card className="border-border/50 shadow-none">
				<CardHeader className="py-3">
					<CardTitle className="text-base font-medium">{t("configuration.faceMesh")}</CardTitle>
				</CardHeader>
				<CardContent className="py-0 text-sm text-muted-foreground">{t("configuration.faceMeshDesc")}</CardContent>
			</Card>
			<Card className="border-border/50 shadow-none">
				<CardHeader className="py-3">
					<CardTitle className="text-base font-medium">{t("configuration.locateFile")}</CardTitle>
				</CardHeader>
				<CardContent className="py-0 text-sm text-muted-foreground">{t("configuration.locateFileDesc")}</CardContent>
			</Card>
			<Card className="border-border/50 shadow-none">
				<CardHeader className="py-3">
					<CardTitle className="text-base font-medium">{t("configuration.faceDetectionTimeout")}</CardTitle>
				</CardHeader>
				<CardContent className="py-0 text-sm text-muted-foreground">
					{t("configuration.faceDetectionTimeoutDesc")}
				</CardContent>
			</Card>
			<CodeBlock code={configExample} language="tsx" />
		</article>
	);
}
