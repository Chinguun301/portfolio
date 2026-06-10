"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/provider";
import { projects } from "@/content/projects";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function FeaturedProjects() {
	const { t } = useTranslation();
	const featured = projects.filter((p) => p.featured);

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
						{t("home.featured")}
					</h2>
					<p className="mt-2 text-lg text-zinc-500 dark:text-zinc-400">
						{t("home.featuredDesc")}
					</p>
				</motion.div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{featured.map((project, i) => (
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
									{project.technologies.slice(0, 3).map((tech) => (
										<span
											key={tech}
											className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
										>
											{tech}
										</span>
									))}
								</div>
							</Link>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
}
