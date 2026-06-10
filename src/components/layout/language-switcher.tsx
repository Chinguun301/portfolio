"use client";

import { useTranslation } from "@/lib/i18n/provider";
import { locales, localeLabels, localeNames } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";

export function LanguageSwitcher() {
	const { locale, setLocale } = useTranslation();

	return (
		<div className="flex items-center gap-1">
			{locales.map((l: Locale) => (
				<button
					key={l}
					onClick={() => setLocale(l)}
					className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
						locale === l
							? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
							: "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
					}`}
					aria-label={localeNames[l]}
				>
					{localeLabels[l]}
				</button>
			))}
		</div>
	);
}
