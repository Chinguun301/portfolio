"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/provider";
import {
	Section,
	SectionTitle,
	Button,
	Card,
	Badge,
} from "@/components/ui/primitives";
import {
	fadeInUp,
	staggerContainer,
	timelineItem,
	listStagger,
	listItem,
	cardHover,
} from "@/lib/animations";

const skills = [
	{ name: "Flutter", level: 90, category: "Mobile" },
	{ name: "Dart", level: 90, category: "Mobile" },
	{ name: "Next.js", level: 85, category: "Frontend" },
	{ name: "React", level: 85, category: "Frontend" },
	{ name: "Vue.js", level: 80, category: "Frontend" },
	{ name: "TypeScript", level: 90, category: "Language" },
	{ name: "JavaScript", level: 85, category: "Language" },
	{ name: "Node.js", level: 70, category: "Backend" },
	{ name: "Tailwind CSS", level: 85, category: "Frontend" },
	{ name: "PostgreSQL", level: 65, category: "Backend" },
	{ name: "Git", level: 85, category: "Tools" },
	{ name: "REST APIs", level: 80, category: "Backend" },
];

const experience = [
	{
		title: "Frontend Engineer",
		company: "И Клиник",
		period: "2024 — Present",
		description:
			"Building and maintaining a cross-platform medical clinic management system using Flutter for the mobile patient app and Vue.js for the admin panel. Implementing electronic health records, appointment scheduling, and real-time notifications.",
		highlights: [
			"Architected the mobile patient app from the ground up",
			"Built a responsive admin dashboard with role-based access",
			"Integrated RESTful APIs for seamless data synchronization",
		],
	},
	{
		title: "Frontend Developer",
		company: "Freelance",
		period: "2022 — 2024",
		description:
			"Delivered responsive web and mobile applications for various clients across different industries, from e-commerce to educational platforms.",
		highlights: [
			"Built 10+ client projects using React, Vue.js, and Flutter",
			"Optimized performance achieving 90+ Lighthouse scores",
			"Implemented bilingual support for Mongolian and English clients",
		],
	},
];

export default function AboutContent() {
	const { t } = useTranslation();

	return (
		<>
			{/* ── Intro ── */}
			<Section>
				<motion.div
					initial="hidden"
					animate="visible"
					variants={staggerContainer}
				>
					<motion.div variants={fadeInUp}>
						<SectionTitle>{t("about.title")}</SectionTitle>
						<p className="mt-4 max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
							{t("about.intro")}
						</p>
					</motion.div>

					{/* Stats row */}
					<motion.div
						variants={fadeInUp}
						className="mt-8 grid grid-cols-3 gap-4 sm:gap-8"
					>
						{[
							{ value: "2+", label: "Years" },
							{ value: "10+", label: "Projects" },
							{ value: "15+", label: "Tech" },
						].map((stat) => (
							<motion.div
								key={stat.label}
								whileHover={{
									y: -4,
									boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
									transition: { type: "spring", stiffness: 300, damping: 20 },
								}}
								style={{ willChange: "transform" }}
								className="rounded-lg border border-neutral-200 p-4 text-center dark:border-neutral-800"
							>
								<div className="text-2xl font-bold text-accent-500">
									{stat.value}
								</div>
								<div className="mt-1 text-sm text-neutral-500">
									{stat.label}
								</div>
							</motion.div>
						))}
					</motion.div>
				</motion.div>
			</Section>

			{/* ── Experience Timeline ── */}
			<section
				className="border-y border-neutral-200 dark:border-neutral-800"
				aria-label="Experience"
			>
				<Section>
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={staggerContainer}
					>
						<SectionTitle>{t("about.experience")}</SectionTitle>

						<div className="relative space-y-8 pl-8 before:absolute before:left-[7px] before:top-2 before:h-[calc(100%-1rem)] before:w-[2px] before:bg-neutral-200 before:dark:bg-neutral-800">
							{experience.map((exp, index) => (
								<motion.div
									key={exp.title + exp.company}
									custom={index % 2 === 0 ? "left" : "right"}
									variants={timelineItem}
									whileHover={{
										x: 6,
										transition: { type: "spring", stiffness: 200, damping: 20 },
									}}
								>
									{/* Timeline dot */}
									<div className="absolute -left-8 top-1.5 h-4 w-4 rounded-full border-2 border-accent-500 bg-white dark:bg-neutral-950">
										<motion.div
											initial={{ scale: 0 }}
											whileInView={{ scale: 1 }}
											viewport={{ once: true }}
											transition={{
												type: "spring",
												stiffness: 300,
												damping: 15,
												delay: index * 0.2,
											}}
											className="h-full w-full rounded-full bg-accent-500/20"
										/>
									</div>

									<Card variant="hover">
										<div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
											<h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
												{exp.title}
											</h3>
											<Badge variant="accent">{exp.period}</Badge>
										</div>
										<p className="text-sm text-accent-500">{exp.company}</p>
										<p className="mt-3 text-sm text-neutral-600 dark:text-neutral-400">
											{exp.description}
										</p>
										{exp.highlights && (
											<motion.ul
												initial="hidden"
												whileInView="visible"
												viewport={{ once: true }}
												variants={listStagger}
												className="mt-3 space-y-1"
											>
												{exp.highlights.map((h) => (
													<motion.li
														key={h}
														variants={listItem}
														className="flex items-start gap-2 text-sm text-neutral-500"
													>
														<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-500" />
														{h}
													</motion.li>
												))}
											</motion.ul>
										)}
									</Card>
								</motion.div>
							))}
						</div>
					</motion.div>
				</Section>
			</section>

			{/* ── Skills Grid ── */}
			<Section>
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={staggerContainer}
				>
					<SectionTitle>{t("about.skills")}</SectionTitle>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{skills.map((skill) => (
							<motion.div
								key={skill.name}
								variants={fadeInUp}
								whileHover={cardHover.whileHover}
								whileTap={cardHover.whileTap}
								style={{ willChange: "transform" }}
							>
								<Card variant="hover" className="h-full">
									<div className="flex items-center justify-between">
										<p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
											{skill.name}
										</p>
										<Badge size="sm">{skill.category}</Badge>
									</div>
									<div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
										<motion.div
											initial={{ width: 0 }}
											whileInView={{ width: `${skill.level}%` }}
											viewport={{ once: true }}
											transition={{
												duration: 1,
												delay: 0.2,
												ease: [0.16, 1, 0.3, 1],
											}}
											className="h-full rounded-full bg-accent-500"
										/>
									</div>
									<p className="mt-1 text-xs text-neutral-400">
										{skill.level}% proficiency
									</p>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.div>
			</Section>

			{/* ── Download CV & Contact ── */}
			<section
				className="border-t border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50"
				aria-label="Resume and contact actions"
			>
				<Section>
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={staggerContainer}
						className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center"
					>
						<motion.div variants={fadeInUp}>
							<Button
								variant="primary"
								size="lg"
								icon={
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
										<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
										<polyline points="7 10 12 15 17 10" />
										<line x1="12" x2="12" y1="15" y2="3" />
									</svg>
								}
								onClick={() => {
									window.open("/resume.pdf", "_blank");
								}}
							>
								Download CV (EN)
							</Button>
						</motion.div>
						<motion.div variants={fadeInUp}>
							<Button
								variant="outline"
								size="lg"
								onClick={() => {
									window.location.href = "/contact";
								}}
							>
								{t("about.contact")} &rarr;
							</Button>
						</motion.div>
					</motion.div>
				</Section>
			</section>
		</>
	);
}
