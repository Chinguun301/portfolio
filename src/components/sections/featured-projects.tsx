"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/provider";
import { projects } from "@/content/projects";
import { Badge } from "@/components/ui/primitives";
import { fadeInUp, staggerContainer, cardHover } from "@/lib/animations";

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
					<h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
						{t("home.featured")}
					</h2>
					<p className="mt-2 text-lg text-neutral-500 dark:text-neutral-400">
						{t("home.featuredDesc")}
					</p>
				</motion.div>

				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{featured.map((project) => (
						<motion.div
							key={project.slug}
							variants={fadeInUp}
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
									{project.technologies.slice(0, 3).map((tech) => (
										<Badge key={tech}>{tech}</Badge>
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
