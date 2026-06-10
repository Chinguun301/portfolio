"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n/provider";
import { projects } from "@/content/projects";
import { projectCategories, type ProjectCategory } from "@/lib/projects";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function ProjectGallery() {
	const { t, locale } = useTranslation();
	const [activeCategory, setActiveCategory] = useState<
		ProjectCategory | "all"
	>("all");

	const filtered =
		activeCategory === "all"
			? projects
			: projects.filter((p) => p.category === activeCategory);

	return (
		<section className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
			>
				<motion.div variants={fadeInUp} className="mb-12">
					<h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
						{t("projects.title")}
					</h2>
					<p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
						{t("projects.description")}
					</p>
				</motion.div>

				{/* Category Filter */}
				<motion.div variants={fadeInUp} className="mb-8 flex flex-wrap gap-2">
					{projectCategories.map((cat) => (
						<button
							key={cat.value}
							onClick={() => setActiveCategory(cat.value)}
							className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
								activeCategory === cat.value
									? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
									: "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
							}`}
						>
							{locale === "mn" ? cat.labelMn : cat.labelEn}
						</button>
					))}
				</motion.div>

				{/* Project Grid */}
				<AnimatePresence mode="wait">
					{filtered.length === 0 ? (
						<motion.p
							key="empty"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="text-center text-zinc-500"
						>
							{t("projects.noProjects")}
						</motion.p>
					) : (
						<motion.div
							key={activeCategory}
							initial="hidden"
							animate="visible"
							variants={staggerContainer}
							className="grid gap-6 sm:grid-cols-2"
						>
							{filtered.map((project, i) => (
								<motion.div key={project.slug} variants={fadeInUp} custom={i}>
									<Link
										href={`/projects/${project.slug}`}
										className="group block rounded-lg border border-zinc-200 p-6 transition-all hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
									>
										<h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
											{project.title}
										</h3>
										<p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3">
											{project.description}
										</p>
										<div className="mt-4 flex flex-wrap gap-2">
											{project.technologies.map((tech) => (
												<span
													key={tech}
													className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
												>
													{tech}
												</span>
											))}
										</div>
										<span className="mt-4 inline-block text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:underline">
											{t("projects.viewProject")} →
										</span>
									</Link>
								</motion.div>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</motion.div>
		</section>
	);
}
