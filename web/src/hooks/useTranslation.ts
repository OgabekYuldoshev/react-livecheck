import { useMemo } from "react";
import { useI18n } from "@/context/I18nContext";
import { en } from "@/locales/en";
import { uz } from "@/locales/uz";

const locales = { en, uz };

function getByPath(obj: Record<string, unknown>, path: string): string | undefined {
	const keys = path.split(".");
	let current: unknown = obj;
	for (const key of keys) {
		if (current === null || current === undefined) return undefined;
		current = (current as Record<string, unknown>)[key];
	}
	return typeof current === "string" ? current : undefined;
}

export function useTranslation() {
	const { locale, setLocale } = useI18n();
	const strings = locales[locale] as Record<string, unknown>;

	const t = useMemo(
		() =>
			(key: string): string => {
				const value = getByPath(strings, key);
				return value ?? key;
			},
		[locale, strings],
	);

	return { t, locale, setLocale };
}
