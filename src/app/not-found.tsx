"use client";

import Link from "next/link";
import { useTranslation } from "@/lib/i18n/provider";

export default function NotFound() {
	const { t } = useTranslation();

	return (
		<div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
			<h1 className="text-6xl font-bold text-zinc-200 dark:text-zinc-800">
				404
			</h1>
			<h2 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
				{t("notFound.title")}
			</h2>
			<p className="mt-2 text-zinc-500 dark:text-zinc-400">
				{t("notFound.description")}
			</p>
			<Link
				href="/"
				className="mt-8 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 transition-colors"
			>
				{t("notFound.backHome")}
			</Link>
		</div>
	);
}
