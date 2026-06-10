"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { track } from "@vercel/analytics";
import { Badge, Button } from "@/components/ui/primitives";
import {
	listStagger,
	listItem,
	badgeStagger,
	badgeItem,
	heroReveal,
	heroItem,
} from "@/lib/animations";
import type { Project } from "@/lib/projects";

function CheckIcon() {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="3"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<polyline points="20 6 9 17 4 12" />
		</svg>
	);
}

function ExternalLinkIcon() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
		>
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
			<polyline points="15 3 21 3 21 9" />
			<line x1="10" x2="21" y1="14" y2="3" />
		</svg>
	);
}

export function ProjectDetailContent({ project }: { project: Project }) {
	// Track project view on mount
	useEffect(() => {
		try {
			track("project_view", { slug: project.slug, title: project.title });
		} catch {
			// Analytics tracking non-blocking
		}
	}, [project.slug, project.title]);

	return (
		<motion.article
			initial="hidden"
			animate="visible"
			variants={heroReveal}
			className="mx-auto max-w-3xl px-4 py-16 sm:py-24"
		>
			{/* Back link */}
			<motion.div variants={heroItem}>
				<Link
					href="/projects"
					className="group inline-flex items-center gap-2 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:hover:text-neutral-100"
					aria-label="Back to projects list"
				>
					<svg
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="transition-transform group-hover:-translate-x-0.5"
						aria-hidden="true"
					>
						<path d="M19 12H5" />
						<polyline points="12 19 5 12 12 5" />
					</svg>
					Back to Projects
				</Link>
			</motion.div>

			{/* Title & Description */}
			<motion.h1
				variants={heroItem}
				className="mt-8 text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl"
			>
				{project.title}
			</motion.h1>
			<motion.p
				variants={heroItem}
				className="mt-4 text-lg text-neutral-600 dark:text-neutral-400"
			>
				{project.longDescription || project.description}
			</motion.p>

			{/* Tech Stack */}
			<motion.section
				variants={heroItem}
				className="mt-12"
				aria-label="Tech stack"
			>
				<h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
					Tech Stack
				</h2>
				<motion.div
					initial="hidden"
					animate="visible"
					variants={badgeStagger}
					className="mt-3 flex flex-wrap gap-2"
				>
					{project.technologies.map((tech) => (
						<motion.div key={tech} variants={badgeItem}>
							<Badge variant="accent" size="md">
								{tech}
							</Badge>
						</motion.div>
					))}
				</motion.div>
			</motion.section>

			{/* Key Features */}
			{project.features && (
				<motion.section
					variants={heroItem}
					className="mt-12"
					aria-label="Key features"
				>
					<h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
						Key Features
					</h2>
					<motion.ul
						initial="hidden"
						animate="visible"
						variants={listStagger}
						className="mt-3 space-y-3"
					>
						{project.features.map((feature) => (
							<motion.li
								key={feature}
								variants={listItem}
								className="flex items-start gap-3 text-neutral-600 dark:text-neutral-400"
							>
								<span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-100 text-xs text-accent-600 dark:bg-accent-900/50 dark:text-accent-400">
									<CheckIcon />
								</span>
								{feature}
							</motion.li>
						))}
					</motion.ul>
				</motion.section>
			)}

			{/* Actions */}
			<motion.div variants={heroItem} className="mt-12 flex flex-wrap gap-4">
				{project.liveUrl && (
					<a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
						<Button variant="primary" size="lg" icon={<ExternalLinkIcon />}>
							View Live
						</Button>
					</a>
				)}
				{project.githubUrl && (
					<a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
						<Button variant="outline" size="lg">
							View Source
						</Button>
					</a>
				)}
			</motion.div>
		</motion.article>
	);
}
