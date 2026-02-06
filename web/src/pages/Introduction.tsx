import { useTranslation } from "@/hooks/useTranslation";

export default function Introduction() {
	const { t } = useTranslation();
	return (
		<article className="space-y-5">
			<h1 className="text-2xl font-semibold tracking-tight">{t("intro.title")}</h1>
			<p className="text-sm text-muted-foreground leading-relaxed">{t("intro.description")}</p>
			<section className="space-y-1.5">
				<h2 className="text-lg font-medium">{t("intro.whatIs")}</h2>
				<p className="text-sm text-muted-foreground leading-relaxed">{t("intro.whatIsBody")}</p>
			</section>
			<section className="space-y-1.5">
				<h2 className="text-lg font-medium">{t("intro.mediapipe")}</h2>
				<p className="text-sm text-muted-foreground leading-relaxed">{t("intro.mediapipeBody")}</p>
			</section>
			<section className="space-y-1.5">
				<h2 className="text-lg font-medium">{t("intro.singleInstance")}</h2>
				<p className="text-sm text-muted-foreground leading-relaxed">{t("intro.singleInstanceBody")}</p>
			</section>
		</article>
	);
}
