import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
	const { locale, setLocale } = useTranslation();
	return (
		<div className={cn("flex gap-0.5", className)}>
			<Button variant={locale === "en" ? "secondary" : "ghost"} size="xs" onClick={() => setLocale("en")}>
				EN
			</Button>
			<Button variant={locale === "uz" ? "secondary" : "ghost"} size="xs" onClick={() => setLocale("uz")}>
				UZ
			</Button>
		</div>
	);
}
