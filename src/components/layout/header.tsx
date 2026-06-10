"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n/provider";
import { LanguageSwitcher } from "./language-switcher";

const navLinks = [
	{ href: "/", key: "nav.home" },
	{ href: "/projects", key: "nav.projects" },
	{ href: "/about", key: "nav.about" },
	{ href: "/contact", key: "nav.contact" },
];

export function Header() {
	const pathname = usePathname();
	const { t } = useTranslation();

	return (
		<header className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
			<nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
				<Link
					href="/"
					className="text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 transition-colors"
				>
					Chinguun
				</Link>
				<div className="flex items-center gap-6">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`text-sm transition-colors ${
								pathname === link.href
									? "text-zinc-900 dark:text-zinc-100 font-medium"
									: "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
							}`}
						>
							{t(link.key)}
						</Link>
					))}
					<LanguageSwitcher />
				</div>
			</nav>
		</header>
	);
}
