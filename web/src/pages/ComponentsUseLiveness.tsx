import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

export default function ComponentsUseLiveness() {
	const { t } = useTranslation();
	return (
		<article className="space-y-4">
			<h1 className="text-2xl font-semibold tracking-tight">{t("components.useLivenessTitle")}</h1>
			<Badge variant="secondary" className="text-xs font-normal">Hook</Badge>
			<p className="text-sm text-muted-foreground leading-relaxed">{t("components.useLivenessPurpose")}</p>
			<section className="space-y-1.5">
				<h2 className="text-lg font-medium">{t("components.behavior")}</h2>
				<p className="text-sm text-muted-foreground leading-relaxed">{t("components.behaviorBlink")}</p>
			</section>
			<section className="space-y-1.5">
				<h2 className="text-lg font-medium">{t("components.types")}</h2>
				<p className="text-sm text-muted-foreground leading-relaxed">{t("components.typesBody")}</p>
			</section>
			<Card className="border-border/50 shadow-none">
				<CardHeader>
					<CardTitle>API</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						<a href="#api-reference" className="underline hover:text-foreground">
							{t("components.apiLink")}
						</a>{" "}
						{t("components.apiLinkSuffix")}
					</p>
				</CardContent>
			</Card>
		</article>
	);
}
