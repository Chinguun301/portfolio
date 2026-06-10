"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/lib/i18n/provider";
import { projects } from "@/content/projects";
import { projectCategories, type ProjectCategory } from "@/lib/projects";
import { Badge, Skeleton } from "@/components/ui/primitives";
import { fadeInUp, staggerContainer, cardHover } from "@/lib/animations";

/* ── Loading Skeleton ── */
function GallerySkeleton() {
	return (
		<div className="grid gap-6 sm:grid-cols-2">
			{[...Array(4)].map((_, i) => (
				<div
					key={i}
					className="rounded-lg border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
				>
					<Skeleton variant="text" width="60%" className="mb-3" />
					<Skeleton variant="text" className="mb-2" />
					<Skeleton variant="text" className="mb-2" />
					<Skeleton variant="text" width="80%" className="mb-4" />
					<div className="flex gap-2">
						<Skeleton variant="rectangular" width="60px" height="22px" />
						<Skeleton variant="rectangular" width="80px" height="22px" />
					</div>
				</div>
			))}
		</div>
	);
}

export function ProjectGallery() {
	const { t, locale } = useTranslation();
	const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">(
		"all",
	);
	const [isLoading, setIsLoading] = useState(true);

	// Simulate initial loading
	useEffect(() => {
		const timer = setTimeout(() => setIsLoading(false), 400);
		return () => clearTimeout(timer);
	}, []);

	// Brief loading state on filter change
	const [isFiltering, setIsFiltering] = useState(false);

	const filtered =
		activeCategory === "all"
			? projects
			: projects.filter((p) => p.category === activeCategory);

	const handleCategoryChange = (value: ProjectCategory | "all") => {
		setIsFiltering(true);
		setActiveCategory(value);
		// Brief delay to show transition
		setTimeout(() => setIsFiltering(false), 300);
	};

	return (
		<section className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				variants={staggerContainer}
			>
				<motion.div variants={fadeInUp} className="mb-12">
					<h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
						{t("projects.title")}
					</h2>
					<p className="mt-2 text-lg text-neutral-500 dark:text-neutral-400">
						{t("projects.description")}
					</p>
				</motion.div>

				{/* Category Filter */}
				<motion.div variants={fadeInUp} className="mb-8 flex flex-wrap gap-2">
					{projectCategories.map((cat) => (
						<button
							key={cat.value}
							onClick={() => handleCategoryChange(cat.value)}
							className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
								activeCategory === cat.value
									? "bg-neutral-900 text-white shadow-sm dark:bg-neutral-100 dark:text-neutral-900"
									: "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
							}`}
						>
							{locale === "mn" ? cat.labelMn : cat.labelEn}
						</button>
					))}
				</motion.div>

				{/* Project Grid */}
				{isLoading ? (
					<GallerySkeleton />
				) : (
					<AnimatePresence mode="wait">
						{isFiltering ? (
							<motion.div
								key="loading"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<GallerySkeleton />
							</motion.div>
						) : filtered.length === 0 ? (
							<motion.p
								key="empty"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="text-center text-neutral-500"
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
									<motion.div
										key={project.slug}
										variants={fadeInUp}
										custom={i}
										whileHover={cardHover.whileHover}
										whileTap={cardHover.whileTap}
										style={{ willChange: "transform" }}
									>
										<Link
											href={`/projects/${project.slug}`}
											className="group block rounded-lg border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-400 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600"
										>
											<h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
												{project.title}
											</h3>
											<p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 line-clamp-3">
												{project.description}
											</p>
											<div className="mt-4 flex flex-wrap gap-2">
												{project.technologies.map((tech) => (
													<Badge key={tech}>{tech}</Badge>
												))}
											</div>
											<span className="mt-4 inline-block text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:underline">
												{t("projects.viewProject")} →
											</span>
										</Link>
									</motion.div>
								))}
							</motion.div>
						)}
					</AnimatePresence>
				)}
			</motion.div>
		</section>
	);
}
