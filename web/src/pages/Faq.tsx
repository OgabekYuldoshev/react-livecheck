import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useTranslation } from "@/hooks/useTranslation";

export default function Faq() {
	const { t } = useTranslation();
	return (
		<article className="space-y-4">
			<h1 className="text-2xl font-semibold tracking-tight">{t("faq.title")}</h1>
			<Accordion type="single" collapsible className="w-full border-0">
				<AccordionItem value="q1">
					<AccordionTrigger>{t("faq.q1")}</AccordionTrigger>
					<AccordionContent>{t("faq.a1")}</AccordionContent>
				</AccordionItem>
				<AccordionItem value="q2">
					<AccordionTrigger>{t("faq.q2")}</AccordionTrigger>
					<AccordionContent>{t("faq.a2")}</AccordionContent>
				</AccordionItem>
				<AccordionItem value="q3">
					<AccordionTrigger>{t("faq.q3")}</AccordionTrigger>
					<AccordionContent>{t("faq.a3")}</AccordionContent>
				</AccordionItem>
				<AccordionItem value="q4">
					<AccordionTrigger>{t("faq.q4")}</AccordionTrigger>
					<AccordionContent>{t("faq.a4")}</AccordionContent>
				</AccordionItem>
				<AccordionItem value="q5">
					<AccordionTrigger>{t("faq.q5")}</AccordionTrigger>
					<AccordionContent>{t("faq.a5")}</AccordionContent>
				</AccordionItem>
			</Accordion>
		</article>
	);
}
