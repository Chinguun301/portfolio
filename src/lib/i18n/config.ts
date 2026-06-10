export type Locale = "en" | "mn";

export const defaultLocale: Locale = "en";

export const locales: Locale[] = ["en", "mn"];

export const localeLabels: Record<Locale, string> = {
	en: "EN",
	mn: "MN",
};

export const localeNames: Record<Locale, string> = {
	en: "English",
	mn: "Монгол",
};
