export const SECTION_IDS = [
	"intro",
	"installation",
	"quick-start",
	"usage",
	"api-reference",
	"components",
	"examples",
	"configuration",
	"faq",
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export interface SectionConfig {
	id: SectionId;
	labelKey: string;
}

export const sections: SectionConfig[] = [
	{ id: "intro", labelKey: "nav.introduction" },
	{ id: "installation", labelKey: "nav.installation" },
	{ id: "quick-start", labelKey: "nav.quickStart" },
	{ id: "usage", labelKey: "nav.usage" },
	{ id: "api-reference", labelKey: "nav.apiReference" },
	{ id: "components", labelKey: "nav.useLiveness" },
	{ id: "examples", labelKey: "nav.examples" },
	{ id: "configuration", labelKey: "nav.configuration" },
	{ id: "faq", labelKey: "nav.faq" },
];
