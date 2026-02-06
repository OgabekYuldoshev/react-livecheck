import { createContext, type ReactNode, useCallback, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "react-livecheck-docs-locale";

type Locale = "en" | "uz";

type I18nContextValue = {
	locale: Locale;
	setLocale: (locale: Locale) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLocale(): Locale {
	if (typeof window === "undefined") return "en";
	const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
	if (stored === "en" || stored === "uz") return stored;
	// Optional: match navigator.language (e.g. "uz" or "uz-UZ") -> "uz"
	const lang = navigator.language?.toLowerCase();
	if (lang?.startsWith("uz")) return "uz";
	return "en";
}

function I18nProvider({ children }: { children: ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>("en");

	useEffect(() => {
		setLocaleState(getInitialLocale());
	}, []);

	const setLocale = useCallback((next: Locale) => {
		setLocaleState(next);
		localStorage.setItem(STORAGE_KEY, next);
	}, []);

	const value: I18nContextValue = { locale, setLocale };
	return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

function useI18n(): I18nContextValue {
	const ctx = useContext(I18nContext);
	if (!ctx) throw new Error("useI18n must be used within I18nProvider");
	return ctx;
}

export type { Locale };
export { I18nProvider, useI18n };
