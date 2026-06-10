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

interface I18nContextType {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	t: (path: string) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

const messagesCache: Record<string, Record<string, unknown>> = {};

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

export function I18nProvider({ children }: { children: ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>("en");
	const [messages, setMessages] = useState<Record<string, unknown>>({});

	useEffect(() => {
		const stored = localStorage.getItem("locale");
		const initial: Locale = stored === "en" || stored === "mn" ? stored : "en";
		setLocaleState(initial);
		document.documentElement.lang = initial;
	}, []);

	useEffect(() => {
		const load = async () => {
			if (messagesCache[locale]) {
				setMessages(messagesCache[locale]);
			} else {
				try {
					const mod = await import(`./${locale}.json`);
					const msgs = mod.default || mod;
					messagesCache[locale] = msgs;
					setMessages(msgs);
				} catch {
					setMessages({});
				}
			}
		};
		load();
	}, [locale]);

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
			const value = getNestedValue(messages, path);
			if (value !== undefined) return value;
			if (process.env.NODE_ENV === "development") {
				console.warn(`Missing translation: ${path}`);
			}
			return path;
		},
		[messages],
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
