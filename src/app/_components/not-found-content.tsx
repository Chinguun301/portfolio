"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/provider";
import { Button } from "@/components/ui/primitives";

export default function NotFoundContent() {
	const { t } = useTranslation();

	return (
		<div className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 text-center">
			{/* Animated 404 */}
			<motion.div
				initial={{ opacity: 0, scale: 0.5 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{
					type: "spring",
					stiffness: 200,
					damping: 15,
				}}
				className="select-none"
			>
				<h1 className="text-[8rem] font-bold leading-none tracking-tighter sm:text-[10rem]">
					<span className="text-neutral-200 dark:text-neutral-800">4</span>
					<span className="text-accent-500">0</span>
					<span className="text-neutral-200 dark:text-neutral-800">4</span>
				</h1>
			</motion.div>

			{/* Floating dots */}
			<div className="mb-8 flex gap-2" aria-hidden="true">
				{[0, 1, 2].map((i) => (
					<motion.span
						key={i}
						className="h-2 w-2 rounded-full bg-neutral-300 dark:bg-neutral-600"
						animate={{
							y: [0, -8, 0],
							opacity: [0.5, 1, 0.5],
						}}
						transition={{
							duration: 1.5,
							repeat: Number.POSITIVE_INFINITY,
							delay: i * 0.3,
							ease: "easeInOut",
						}}
					/>
				))}
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.4, duration: 0.5 }}
			>
				<h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
					{t("notFound.title")}
				</h2>
				<p className="mt-2 text-neutral-500 dark:text-neutral-400">
					{t("notFound.description")}
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.6, duration: 0.5 }}
				className="mt-8"
			>
				<Link href="/">
					<Button variant="primary" size="lg">
						{t("notFound.backHome")}
					</Button>
				</Link>
			</motion.div>
		</div>
	);
}
