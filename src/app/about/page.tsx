"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/provider";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const skills = [
	{ name: "Flutter", level: "Advanced" },
	{ name: "Dart", level: "Advanced" },
	{ name: "Next.js", level: "Advanced" },
	{ name: "React", level: "Advanced" },
	{ name: "Vue.js", level: "Advanced" },
	{ name: "TypeScript", level: "Advanced" },
	{ name: "JavaScript", level: "Advanced" },
	{ name: "Node.js", level: "Intermediate" },
	{ name: "Tailwind CSS", level: "Advanced" },
	{ name: "PostgreSQL", level: "Intermediate" },
	{ name: "Git", level: "Advanced" },
	{ name: "REST APIs", level: "Advanced" },
];

const experience = [
	{
		title: "Frontend Engineer",
		company: "И Клиник",
		period: "2024 — Present",
		description:
			"Built and maintained cross-platform medical clinic management system using Flutter for mobile and Vue.js for admin panel.",
	},
];

export default function AboutPage() {
	const { t } = useTranslation();

	return (
		<div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
			<motion.div
				initial="hidden"
				animate="visible"
				variants={staggerContainer}
			>
				{/* Intro */}
				<motion.div variants={fadeInUp}>
					<h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
						{t("about.title")}
					</h1>
					<p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
						{t("about.intro")}
					</p>
				</motion.div>

				{/* Experience */}
				<motion.section variants={fadeInUp} className="mt-16">
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						{t("about.experience")}
					</h2>
					<div className="mt-6 space-y-8">
						{experience.map((exp) => (
							<div
								key={exp.title}
								className="border-l-2 border-zinc-200 pl-4 dark:border-zinc-800"
							>
								<h3 className="font-medium text-zinc-900 dark:text-zinc-100">
									{exp.title}
								</h3>
								<p className="text-sm text-zinc-500">{exp.company}</p>
								<p className="text-sm text-zinc-400">{exp.period}</p>
								<p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
									{exp.description}
								</p>
							</div>
						))}
					</div>
				</motion.section>

				{/* Skills */}
				<motion.section variants={fadeInUp} className="mt-16">
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						{t("about.skills")}
					</h2>
					<div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
						{skills.map((skill) => (
							<div
								key={skill.name}
								className="rounded-lg border border-zinc-200 p-3 dark:border-zinc-800"
							>
								<div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
									{skill.name}
								</div>
								<div className="text-xs text-zinc-500 mt-0.5">
									{skill.level}
								</div>
							</div>
						))}
					</div>
				</motion.section>

				{/* Contact CTA */}
				<motion.div variants={fadeInUp} className="mt-16">
					<a
						href="/contact"
						className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 transition-colors"
					>
						{t("about.contact")} →
					</a>
				</motion.div>
			</motion.div>
		</div>
	);
}
