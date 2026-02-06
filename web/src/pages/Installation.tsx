import { CodeBlock } from "@/components/docs/CodeBlock";
import { useTranslation } from "@/hooks/useTranslation";

export default function Installation() {
	const { t } = useTranslation();
	return (
		<article className="space-y-4">
			<h1 className="text-2xl font-semibold tracking-tight">{t("installation.title")}</h1>
			<CodeBlock code={t("installation.installCommand")} language="bash" />
			<section>
				<h2 className="mb-1.5 text-lg font-medium">{t("installation.requirements")}</h2>
				<ul className="list-inside list-disc space-y-0.5 text-sm text-muted-foreground">
					<li>{t("installation.reqReact")}</li>
					<li>{t("installation.reqHttps")}</li>
					<li>{t("installation.reqBrowser")}</li>
					<li>{t("installation.reqInstance")}</li>
				</ul>
			</section>
		</article>
	);
}
