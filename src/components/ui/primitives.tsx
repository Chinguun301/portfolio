"use client";

import { motion } from "framer-motion";
import type { ReactNode, ButtonHTMLAttributes } from "react";

export function Section({
	children,
	className = "",
	id,
}: {
	children: ReactNode;
	className?: string;
	id?: string;
}) {
	return (
		<section
			id={id}
			className={`mx-auto max-w-5xl px-4 py-16 sm:py-24 ${className}`}
		>
			{children}
		</section>
	);
}

export function SectionTitle({
	children,
	subtitle,
}: {
	children: ReactNode;
	subtitle?: string;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			className="mb-12"
		>
			<h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
				{children}
			</h2>
			{subtitle && (
				<p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
					{subtitle}
				</p>
			)}
		</motion.div>
	);
}

export function Button({
	children,
	variant = "primary",
	...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: "primary" | "secondary";
}) {
	const base =
		"inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200";
	const variants = {
		primary:
			"bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300",
		secondary:
			"border border-zinc-300 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800",
	};

	return (
		<button className={`${base} ${variants[variant]}`} {...props}>
			{children}
		</button>
	);
}
