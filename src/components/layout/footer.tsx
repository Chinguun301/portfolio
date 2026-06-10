"use client";

import { useTranslation } from "@/lib/i18n/provider";

export function Footer() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-zinc-200 dark:border-zinc-800">
			<div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-6 sm:flex-row">
				<p className="text-sm text-zinc-500">
					&copy; {year} Chinguun. {t("footer.copyright")}
				</p>
				<p className="text-sm text-zinc-400">{t("footer.madeWith")}</p>
			</div>
		</footer>
	);
}
