"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n/provider";
import { projects } from "@/content/projects";
import { projectCategories, type ProjectCategory } from "@/lib/projects";
import { Section, SectionTitle, Card, Badge } from "@/components/ui/primitives";
import { Tabs } from "@/components/ui/tabs";
import { fadeInUp, staggerContainer, cardHover } from "@/lib/animations";

export default function ProjectsContent() {
	const { t, locale } = useTranslation();
	const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">(
		"all",
	);

	const filtered =
		activeCategory === "all"
			? projects
			: projects.filter((p) => p.category === activeCategory);

	return (
		<Section>
			<SectionTitle subtitle={t("projects.description")}>
				{t("projects.title")}
			</SectionTitle>

			{/* Category Tabs */}
			<nav aria-label="Project category filter">
				<div className="mb-8">
					<Tabs
						tabs={projectCategories.map((cat) => ({
							value: cat.value,
							label: locale === "mn" ? cat.labelMn : cat.labelEn,
						}))}
						active={activeCategory}
						onChange={(value) =>
							setActiveCategory(value as ProjectCategory | "all")
						}
					/>
				</div>
			</nav>

			{/* Project Grid */}
			<AnimatePresence mode="wait">
				{filtered.length === 0 ? (
					<motion.p
						key="empty"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="py-16 text-center text-neutral-500"
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
						{filtered.map((project) => (
							<motion.div
								key={project.slug}
								variants={fadeInUp}
								whileHover={cardHover.whileHover}
								whileTap={cardHover.whileTap}
								style={{ willChange: "transform" }}
							>
								<Link href={`/projects/${project.slug}`}>
									<Card
										variant="hover"
										className="group h-full transition-all duration-250"
									>
										<div className="flex h-full flex-col">
											<h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
												{project.title}
											</h2>
											<p className="mt-2 flex-1 text-sm text-neutral-600 line-clamp-3 dark:text-neutral-400">
												{project.description}
											</p>
											<div className="mt-4 flex flex-wrap gap-2">
												{project.technologies.map((tech) => (
													<Badge key={tech}>{tech}</Badge>
												))}
											</div>
											<span className="mt-4 inline-block text-sm font-medium text-accent-500 opacity-0 transition-opacity group-hover:opacity-100">
												{t("projects.viewProject")} &rarr;
											</span>
										</div>
									</Card>
								</Link>
							</motion.div>
						))}
					</motion.div>
				)}
			</AnimatePresence>
		</Section>
	);
}
