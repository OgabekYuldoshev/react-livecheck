import {
	AlertCircle,
	BookOpen,
	Camera,
	CheckCircle2,
	Code2,
	Github,
	Package,
	Play,
	ScanFace,
	ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { CodeBlock } from "@/components/docs/code-block";
import { LivenessModal } from "@/components/liveness-modal";
import { Button, buttonVariants } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";

const installCode = "pnpm add react-livecheck";

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
	'        <div style={{ position: "absolute", left: `' +
	"${faceBoundingBox.x * 100}%`,\n" +
	"          top: `${faceBoundingBox.y * 100}%`, width: `${faceBoundingBox.width * 100}%`,\n" +
	'          height: `${faceBoundingBox.height * 100}%`, border: "2px solid lime" }} />\n' +
	"      )}\n" +
	"      {isReady && !isFaceDetected && <p>Position your face in the frame.</p>}\n" +
	'      <p>Blinks: {blinkCount} {passed && "— Passed!"}</p>\n' +
	"    </div>\n" +
	"  );\n" +
	"}";

const requirements = [
	{ key: "reqHttps" as const, icon: ShieldCheck },
	{ key: "reqBrowser" as const, icon: Camera },
	{ key: "reqInstance" as const, icon: AlertCircle },
];

const errorCodeKeys: [string, string][] = [
	["ABORTED", "apiTable.errAborted"],
	["CAMERA_IN_USE", "apiTable.errCameraInUse"],
	["CAMERA_NOT_FOUND", "apiTable.errCameraNotFound"],
	["FACE_NOT_DETECTED", "apiTable.errFaceNotDetected"],
	["MODEL_LOAD_FAILED", "apiTable.errModelLoadFailed"],
	["MULTIPLE_FACES", "apiTable.errMultipleFaces"],
	["NOT_ALLOWED", "apiTable.errNotAllowed"],
	["OVERCONSTRAINED", "apiTable.errOverconstrained"],
	["PERMISSION_DENIED", "apiTable.errPermissionDenied"],
	["PLAY_FAILED", "apiTable.errPlayFailed"],
	["UNKNOWN", "apiTable.errUnknown"],
];

export default function Landing() {
	const { t } = useTranslation();
	const [demoOpen, setDemoOpen] = useState(false);
	return (
		<div className="min-h-screen flex flex-col">
			<LivenessModal open={demoOpen} onOpenChange={setDemoOpen} />
			{/* Hero */}
			<section className="flex flex-col items-center justify-center px-4 pt-20 pb-20 md:pt-28 md:pb-28">
				<div className="flex items-center justify-center size-16 rounded-2xl bg-primary/10 text-primary mb-6 md:size-20">
					<ScanFace className="size-8 md:size-10" strokeWidth={1.5} />
				</div>
				<h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">react-livecheck</h1>
				<p className="mt-4 max-w-xl text-center text-muted-foreground md:text-lg leading-relaxed">
					{t("intro.description")}
				</p>
				<div className="mt-8 flex flex-wrap items-center justify-center gap-3">
					<a
						href="https://github.com/OgabekYuldoshev/react-livecheck"
						target="_blank"
						rel="noopener noreferrer"
						className={buttonVariants()}
					>
						<Github className="size-4" />
						{t("common.github")}
					</a>
					<Button type="button" variant="outline" onClick={() => setDemoOpen(true)}>
						<Play className="size-4" />
						{t("common.tryDemo")}
					</Button>
					<a
						href="https://www.npmjs.com/package/react-livecheck"
						target="_blank"
						rel="noopener noreferrer"
						className={buttonVariants({ variant: "outline" })}
					>
						<Package className="size-4" />
						{t("common.npm")}
					</a>
				</div>
			</section>

			{/* Installation */}
			<section className="border-t border-border/50 px-4 py-14 md:py-20 bg-muted/20">
				<div className="mx-auto max-w-2xl">
					<div className="flex items-center gap-2 mb-4">
						<div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
							<Package className="size-4" />
						</div>
						<h2 className="text-xl font-semibold">
							<span className="mr-1.5" aria-hidden>
								📦
							</span>
							{t("installation.title")}
						</h2>
					</div>
					<CodeBlock code={installCode} language="bash" className="rounded-lg" />
					<div className="mt-6">
						<h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
							<CheckCircle2 className="size-4 text-green-600 dark:text-green-500" />
							<span aria-hidden>✅</span>
							{t("installation.requirements")}
						</h3>
						<ul className="space-y-2">
							{requirements.map(({ key, icon: Icon }) => (
								<li
									key={key}
									className="flex items-start gap-3 rounded-lg border border-border/50 bg-background/60 px-3 py-2.5 text-sm text-muted-foreground"
								>
									<Icon className="size-4 shrink-0 mt-0.5 text-muted-foreground/80" />
									<span>{t(`installation.${key}`)}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			{/* Usage */}
			<section className="border-t border-border/50 px-4 py-14 md:py-20">
				<div className="mx-auto max-w-3xl">
					<div className="flex items-center gap-2 mb-4">
						<div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
							<Code2 className="size-4" />
						</div>
						<h2 className="text-xl font-semibold">
							<span className="mr-1.5" aria-hidden>
								💻
							</span>
							{t("usage.title")}
						</h2>
					</div>
					<p className="text-sm text-muted-foreground mb-4">{t("usage.description")}</p>
					<CodeBlock code={usageCode} language="tsx" className="rounded-lg text-[13px]" />
				</div>
			</section>

			{/* API */}
			<section className="border-t border-border/50 px-4 py-14 md:py-20 bg-muted/20">
				<div className="mx-auto max-w-3xl">
					<div className="flex items-center gap-2 mb-6">
						<div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
							<BookOpen className="size-4" />
						</div>
						<h2 className="text-xl font-semibold">
							<span className="mr-1.5" aria-hidden>
								📖
							</span>
							{t("api.title")}
						</h2>
					</div>
					<p className="text-sm text-muted-foreground mb-4">{t("api.useLivenessOptions")}</p>
					{/* Options */}
					<div className="mb-6 rounded-lg border border-border/50 bg-background/80 overflow-hidden">
						<div className="border-b border-border/50 bg-muted/30 px-4 py-2.5">
							<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
								{t("api.options")}
							</span>
						</div>
						<div className="overflow-x-auto">
							<table className="w-full text-left text-sm">
								<thead>
									<tr className="border-b border-border/50">
										<th className="px-4 py-2 font-medium">{t("apiTable.option")}</th>
										<th className="px-4 py-2 font-medium">{t("apiTable.type")}</th>
										<th className="px-4 py-2 font-medium">{t("apiTable.default")}</th>
										<th className="px-4 py-2 font-medium">{t("apiTable.description")}</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-border/50">
									<tr>
										<td className="px-4 py-2 font-mono text-xs">requiredBlinks</td>
										<td className="px-4 py-2 text-muted-foreground">number</td>
										<td className="px-4 py-2">2</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.optRequiredBlinksDesc")}</td>
									</tr>
									<tr>
										<td className="px-4 py-2 font-mono text-xs">onSuccess</td>
										<td className="px-4 py-2 text-muted-foreground">() =&gt; void</td>
										<td className="px-4 py-2">—</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.optOnSuccessDesc")}</td>
									</tr>
									<tr>
										<td className="px-4 py-2 font-mono text-xs">onError</td>
										<td className="px-4 py-2 text-muted-foreground">(err) =&gt; void</td>
										<td className="px-4 py-2">—</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.optOnErrorDesc")}</td>
									</tr>
									<tr>
										<td className="px-4 py-2 font-mono text-xs">locateFile</td>
										<td className="px-4 py-2 text-muted-foreground">(file) =&gt; string</td>
										<td className="px-4 py-2">jsDelivr CDN</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.optLocateFileDesc")}</td>
									</tr>
									<tr>
										<td className="px-4 py-2 font-mono text-xs">camera</td>
										<td className="px-4 py-2 text-muted-foreground">object</td>
										<td className="px-4 py-2">640×480, user</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.optCameraDesc")}</td>
									</tr>
									<tr>
										<td className="px-4 py-2 font-mono text-xs">faceMesh</td>
										<td className="px-4 py-2 text-muted-foreground">object</td>
										<td className="px-4 py-2">—</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.optFaceMeshDesc")}</td>
									</tr>
									<tr>
										<td className="px-4 py-2 font-mono text-xs">faceDetectionTimeout</td>
										<td className="px-4 py-2 text-muted-foreground">number</td>
										<td className="px-4 py-2">0 (off)</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.optFaceDetectionTimeoutDesc")}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					{/* Return */}
					<div className="mb-6 rounded-lg border border-border/50 bg-background/80 overflow-hidden">
						<div className="border-b border-border/50 bg-muted/30 px-4 py-2.5">
							<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
								{t("api.return")}
							</span>
						</div>
						<div className="overflow-x-auto">
							<table className="w-full text-left text-sm">
								<thead>
									<tr className="border-b border-border/50">
										<th className="px-4 py-2 font-medium">{t("apiTable.property")}</th>
										<th className="px-4 py-2 font-medium">{t("apiTable.type")}</th>
										<th className="px-4 py-2 font-medium">{t("apiTable.description")}</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-border/50">
									<tr>
										<td className="px-4 py-2 font-mono text-xs">videoRef</td>
										<td className="px-4 py-2 text-muted-foreground">RefObject</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.retVideoRef")}</td>
									</tr>
									<tr>
										<td className="px-4 py-2 font-mono text-xs">blinkCount</td>
										<td className="px-4 py-2 text-muted-foreground">number</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.retBlinkCount")}</td>
									</tr>
									<tr>
										<td className="px-4 py-2 font-mono text-xs">passed</td>
										<td className="px-4 py-2 text-muted-foreground">boolean</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.retPassed")}</td>
									</tr>
									<tr>
										<td className="px-4 py-2 font-mono text-xs">error</td>
										<td className="px-4 py-2 text-muted-foreground">LivenessError | null</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.retError")}</td>
									</tr>
									<tr>
										<td className="px-4 py-2 font-mono text-xs">isReady</td>
										<td className="px-4 py-2 text-muted-foreground">boolean</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.retIsReady")}</td>
									</tr>
									<tr>
										<td className="px-4 py-2 font-mono text-xs">isFaceDetected</td>
										<td className="px-4 py-2 text-muted-foreground">boolean</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.retIsFaceDetected")}</td>
									</tr>
									<tr>
										<td className="px-4 py-2 font-mono text-xs">faceBoundingBox</td>
										<td className="px-4 py-2 text-muted-foreground">FaceBoundingBox | null</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.retFaceBoundingBox")}</td>
									</tr>
									<tr>
										<td className="px-4 py-2 font-mono text-xs">retry</td>
										<td className="px-4 py-2 text-muted-foreground">() =&gt; void</td>
										<td className="px-4 py-2 text-muted-foreground">{t("apiTable.retRetry")}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					{/* Error codes */}
					<div className="rounded-lg border border-border/50 bg-background/80 overflow-hidden">
						<div className="border-b border-border/50 bg-muted/30 px-4 py-2.5">
							<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
								{t("api.errorCodes")}
							</span>
						</div>
						<div className="divide-y divide-border/50">
							{errorCodeKeys.map(([code, key]) => (
								<div key={code} className="flex flex-col gap-0.5 px-4 py-2.5 sm:flex-row sm:items-center sm:gap-4">
									<code className="text-xs font-mono text-foreground shrink-0 w-40">{code}</code>
									<span className="text-sm text-muted-foreground">{t(key)}</span>
								</div>
							))}
						</div>
					</div>
					<p className="mt-3 text-xs text-muted-foreground">{t("apiTable.retryNote")}</p>
				</div>
			</section>

			{/* Footer */}
			<footer className="mt-auto border-t border-border/50 px-4 py-8">
				<div className="mx-auto max-w-2xl flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
					<a
						href="https://github.com/OgabekYuldoshev/react-livecheck"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
					>
						<Github className="size-4" />
						{t("common.github")}
					</a>
					<span className="text-border">·</span>
					<span>{t("common.mitLicense")}</span>
				</div>
			</footer>
		</div>
	);
}
