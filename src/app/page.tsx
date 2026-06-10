"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/provider";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { fadeInUp } from "@/lib/animations";

export default function Home() {
	const { t } = useTranslation();

	return (
		<>
			{/* Hero Section */}
			<section className="mx-auto max-w-5xl px-4 py-24 sm:py-32">
				<motion.div
					initial="hidden"
					animate="visible"
					variants={{
						hidden: {},
						visible: { transition: { staggerChildren: 0.15 } },
					}}
				>
					<motion.p
						variants={fadeInUp}
						className="text-sm font-medium text-zinc-500 dark:text-zinc-400"
					>
						{t("hero.greeting")}
					</motion.p>
					<motion.h1
						variants={fadeInUp}
						className="mt-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-6xl"
					>
						{t("hero.name")}
					</motion.h1>
					<motion.p
						variants={fadeInUp}
						className="mt-4 text-xl text-zinc-600 dark:text-zinc-400"
					>
						{t("hero.title")}
					</motion.p>
					<motion.p
						variants={fadeInUp}
						className="mt-1 text-lg text-zinc-500 dark:text-zinc-500"
					>
						{t("hero.subtitle")}
					</motion.p>
					<motion.div variants={fadeInUp} className="mt-8 flex gap-4">
						<Link
							href="/projects"
							className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
						>
							{t("hero.cta")}
						</Link>
						<Link
							href="/contact"
							className="rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
						>
							{t("hero.contact")}
						</Link>
					</motion.div>
				</motion.div>
			</section>

			{/* Stats Section */}
			<section className="border-y border-zinc-200 dark:border-zinc-800">
				<div className="mx-auto max-w-5xl px-4 py-12">
					<div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
						{[
							{ key: "projects", value: "10+", label: t("home.stats.projects") },
							{
								key: "experience",
								value: "2+",
								label: t("home.stats.experience"),
							},
							{
								key: "clients",
								value: "5+",
								label: t("home.stats.clients"),
							},
							{
								key: "tech",
								value: "15+",
								label: t("home.stats.technologies"),
							},
						].map((stat) => (
							<div key={stat.key} className="text-center">
								<div className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
									{stat.value}
								</div>
								<div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
									{stat.label}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<FeaturedProjects />
		</>
	);
}
