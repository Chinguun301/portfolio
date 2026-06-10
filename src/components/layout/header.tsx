"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n/provider";
import { LanguageSwitcher } from "./language-switcher";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";

const navLinks = [
	{ href: "/", key: "nav.home" },
	{ href: "/projects", key: "nav.projects" },
	{ href: "/about", key: "nav.about" },
	{ href: "/contact", key: "nav.contact" },
];

export function Header() {
	const pathname = usePathname();
	const { t } = useTranslation();
	const [mobileOpen, setMobileOpen] = useState(false);

	return (
		<header className="fixed inset-x-0 top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
			<nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
				{/* Logo */}
				<Link
					href="/"
					className="text-sm font-medium text-neutral-900 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-400"
				>
					Chinguun
				</Link>

				{/* Desktop nav */}
				<div className="hidden items-center gap-6 sm:flex">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className={`text-sm transition-colors ${
								pathname === link.href
									? "font-medium text-neutral-900 dark:text-neutral-100"
									: "text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-300"
							}`}
						>
							{t(link.key)}
						</Link>
					))}
					<DarkModeToggle />
					<LanguageSwitcher />
				</div>

				{/* Mobile controls */}
				<div className="flex items-center gap-2 sm:hidden">
					<DarkModeToggle />
					<button
						onClick={() => setMobileOpen(!mobileOpen)}
						className="relative flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
						aria-label={mobileOpen ? "Close menu" : "Open menu"}
					>
						<motion.div
							animate={mobileOpen ? "open" : "closed"}
							className="flex flex-col items-center justify-center gap-[3px]"
						>
							<motion.span
								variants={{
									closed: { rotate: 0, y: 0 },
									open: { rotate: 45, y: 4.5 },
								}}
								transition={{ duration: 0.2, ease: "easeInOut" }}
								className="block h-[1.5px] w-4 rounded-full bg-current"
							/>
							<motion.span
								variants={{
									closed: { opacity: 1 },
									open: { opacity: 0 },
								}}
								transition={{ duration: 0.15 }}
								className="block h-[1.5px] w-4 rounded-full bg-current"
							/>
							<motion.span
								variants={{
									closed: { rotate: 0, y: 0 },
									open: { rotate: -45, y: -4.5 },
								}}
								transition={{ duration: 0.2, ease: "easeInOut" }}
								className="block h-[1.5px] w-4 rounded-full bg-current"
							/>
						</motion.div>
					</button>
				</div>
			</nav>

			{/* Mobile drawer */}
			<AnimatePresence>
				{mobileOpen && (
					<motion.div
						key="mobile-menu"
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
						className="overflow-hidden border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950"
					>
						<div className="space-y-1 px-4 py-4">
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={() => setMobileOpen(false)}
									className={`block rounded-md px-3 py-2 text-sm transition-colors ${
										pathname === link.href
											? "bg-neutral-100 font-medium text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
											: "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900 dark:hover:bg-neutral-800/50 dark:hover:text-neutral-300"
									}`}
								>
									{t(link.key)}
								</Link>
							))}
							<div className="pt-2">
								<LanguageSwitcher />
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
