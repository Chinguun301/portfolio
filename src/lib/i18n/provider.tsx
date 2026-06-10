"use client";

import {
	createContext,
	useContext,
	useState,
	useCallback,
	useEffect,
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

/**
 * Read initial locale from localStorage.
 * Called once during useState initialization (lazy initializer),
 * so it runs before the first render — no cascading setState.
 */
function getInitialLocale(): Locale {
	if (typeof window === "undefined") return "en";
	const stored = localStorage.getItem("locale");
	return stored === "en" || stored === "mn" ? stored : "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

	// Sync lang attribute to DOM whenever locale changes
	useEffect(() => {
		document.documentElement.lang = locale;
	}, [locale]);

	// Listen for locale changes from other tabs
	useEffect(() => {
		const handler = (e: StorageEvent) => {
			if (e.key === "locale" && (e.newValue === "en" || e.newValue === "mn")) {
				setLocaleState(e.newValue);
			}
		};
		window.addEventListener("storage", handler);
		return () => window.removeEventListener("storage", handler);
	}, []);

	const setLocale = useCallback((newLocale: Locale) => {
		localStorage.setItem("locale", newLocale);
		document.documentElement.lang = newLocale;
		setLocaleState(newLocale);
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
