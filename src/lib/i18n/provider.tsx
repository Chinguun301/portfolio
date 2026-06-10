"use client";

import {
	createContext,
	useContext,
	useCallback,
	useEffect,
	useSyncExternalStore,
	type ReactNode,
} from "react";
import type { Locale } from "./config";
import enMessages from "./en.json";
import mnMessages from "./mn.json";

interface I18nContextType {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	t: (path: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

const messagesMap: Record<Locale, Record<string, unknown>> = {
	en: enMessages as Record<string, unknown>,
	mn: mnMessages as Record<string, unknown>,
};

function getNestedValue(obj: unknown, path: string): string | undefined {
	return path.split(".").reduce((acc: unknown, key: string) => {
		if (
			acc &&
			typeof acc === "object" &&
			key in (acc as Record<string, unknown>)
		) {
			return (acc as Record<string, unknown>)[key];
		}
		return undefined;
	}, obj) as string | undefined;
}

/** Read locale from cookie set by inline script before hydration */
function getLocaleFromCookie(): Locale {
	if (typeof document === "undefined") return "en";
	try {
		const match = document.cookie.match(/(?:^|; )locale=([^;]+)/);
		if (match) {
			const val = match[1] as Locale;
			if (val === "en" || val === "mn") return val;
		}
	} catch {}
	return "en";
}

function subscribeToCookie(cb: () => void): () => void {
	window.addEventListener("storage", cb);
	return () => window.removeEventListener("storage", cb);
}

export function I18nProvider({ children }: { children: ReactNode }) {
	// useSyncExternalStore ensures server & client agree on first render,
	// then hydrates with the real value from the cookie without mismatch.
	const locale = useSyncExternalStore(
		subscribeToCookie,
		getLocaleFromCookie,
		() => "en" as Locale,
	);

	// Sync lang attribute + localStorage whenever locale changes
	useEffect(() => {
		document.documentElement.lang = locale;
		try {
			localStorage.setItem("locale", locale);
		} catch {}
	}, [locale]);

	const setLocale = useCallback((newLocale: Locale) => {
		try {
			localStorage.setItem("locale", newLocale);
			document.cookie = `locale=${newLocale};path=/;max-age=31536000`;
		} catch {}
		document.documentElement.lang = newLocale;
	}, []);

	const t = useCallback(
		(path: string): string => {
			const messages = messagesMap[locale];
			const value = getNestedValue(messages, path);
			if (value !== undefined) return value;
			if (process.env.NODE_ENV === "development") {
				console.warn(`Missing translation: ${path}`);
			}
			return path;
		},
		[locale],
	);

	return (
		<I18nContext.Provider value={{ locale, setLocale, t }}>
			{children}
		</I18nContext.Provider>
	);
}

export function useTranslation() {
	const ctx = useContext(I18nContext);
	if (!ctx) throw new Error("useTranslation must be used within I18nProvider");
	return ctx;
}
