"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import { motion } from "framer-motion";

/* ──────────────────────────────────────────
   Dark Mode Hook
   Persists to localStorage, falls back to system preference.
   Uses useSyncExternalStore for tear-free, SSR-safe state sync.
   ────────────────────────────────────────── */
function getSnapshot(): boolean {
	if (typeof window === "undefined") return false;
	const stored = localStorage.getItem("theme");
	if (stored === "dark") return true;
	if (stored === "light") return false;
	return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function subscribe(callback: () => void) {
	const mql = window.matchMedia("(prefers-color-scheme: dark)");
	mql.addEventListener("change", callback);
	window.addEventListener("storage", callback);
	return () => {
		mql.removeEventListener("change", callback);
		window.removeEventListener("storage", callback);
	};
}

function useDarkMode() {
	const dark = useSyncExternalStore(
		typeof window === "undefined" ? () => () => {} : subscribe,
		getSnapshot,
		() => false, // SSR fallback
	);

	useEffect(() => {
		const root = document.documentElement;
		if (dark) {
			root.classList.add("dark");
		} else {
			root.classList.remove("dark");
		}
	}, [dark]);

	const toggle = useCallback(() => {
		const next = !dark;
		localStorage.setItem("theme", next ? "dark" : "light");
		/* Dispatch storage event so useSyncExternalStore picks it up
       (same-tab localStorage changes don't fire 'storage' natively) */
		window.dispatchEvent(new Event("storage"));
	}, [dark]);

	return { dark, toggle };
}

/* ──────────────────────────────────────────
   Dark Mode Toggle
   ────────────────────────────────────────── */
export function DarkModeToggle() {
	const { dark, toggle } = useDarkMode();

	return (
		<button
			onClick={toggle}
			className="relative flex h-8 w-8 items-center justify-center rounded-md text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
			aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
			suppressHydrationWarning
		>
			<motion.div
				key={dark ? "moon" : "sun"}
				initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
				animate={{ rotate: 0, opacity: 1, scale: 1 }}
				transition={{ duration: 0.2, ease: "easeOut" }}
			>
				{dark ? (
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<circle cx="12" cy="12" r="5" />
						<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
					</svg>
				) : (
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
					</svg>
				)}
			</motion.div>
		</button>
	);
}
