"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/provider";
import { projects } from "@/content/projects";
import {
	Section,
	SectionTitle,
	Button,
	Card,
	Badge,
} from "@/components/ui/primitives";
import {
	heroReveal,
	heroItem,
	fadeInUp,
	staggerContainer,
	cardHover,
} from "@/lib/animations";

/* ──────────────────────────────────────────
   Animated Counter
   Spring-animated number for stats
   ────────────────────────────────────────── */
function AnimatedCounter({
	value,
	suffix = "",
}: {
	value: string;
	suffix?: string;
}) {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref, { once: true, margin: "-50px" });

	return (
		<span
			ref={ref}
			className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 sm:text-4xl"
		>
			{inView ? (
				<motion.span
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ type: "spring", stiffness: 80, damping: 15 }}
				>
					{value}
				</motion.span>
			) : (
				<span>0</span>
			)}
			{suffix}
		</span>
	);
}

export default function HomeContent() {
	const { t } = useTranslation();
	const featured = projects.filter((p) => p.featured);

	return (
		<>
			{/* ── Hero Section ── */}
			<section className="relative mx-auto max-w-5xl px-4 py-24 sm:py-32">
				{/* Background grid effect */}
				<div
					className="pointer-events-none absolute inset-0 -z-10"
					style={{
						backgroundImage:
							"linear-gradient(rgba(59,130,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.03) 1px, transparent 1px)",
						backgroundSize: "64px 64px",
					}}
					aria-hidden="true"
				/>
				<div
					className="pointer-events-none absolute left-1/2 top-0 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-accent-500/5 blur-3xl"
					aria-hidden="true"
				/>

				<motion.div initial="hidden" animate="visible" variants={heroReveal}>
					<motion.p
						variants={heroItem}
						className="text-sm font-medium text-accent-500"
					>
						{t("hero.greeting")}
					</motion.p>
					<motion.h1
						variants={heroItem}
						className="mt-2 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-6xl"
					>
						{t("hero.name")}
					</motion.h1>
					<motion.p
						variants={heroItem}
						className="mt-4 text-xl text-neutral-600 dark:text-neutral-400"
					>
						{t("hero.title")}
					</motion.p>
					<motion.p
						variants={heroItem}
						className="mt-1 text-lg text-neutral-500"
					>
						{t("hero.subtitle")}
					</motion.p>
					<motion.div variants={heroItem} className="mt-8 flex flex-wrap gap-4">
						<Link href="/projects">
							<Button size="lg">{t("hero.cta")}</Button>
						</Link>
						<Link href="/contact">
							<Button variant="outline" size="lg">
								{t("hero.contact")}
							</Button>
						</Link>
					</motion.div>
				</motion.div>
			</section>

			{/* ── Stats Section ── */}
			<section
				className="border-y border-neutral-200 dark:border-neutral-800"
				aria-label="Statistics"
			>
				<div className="mx-auto max-w-5xl px-4 py-12">
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-50px" }}
						variants={staggerContainer}
						className="grid grid-cols-2 gap-8 sm:grid-cols-4"
					>
						{[
							{ value: "10+", label: t("home.stats.projects") },
							{ value: "2+", label: t("home.stats.experience") },
							{ value: "5+", label: t("home.stats.clients") },
							{ value: "15+", label: t("home.stats.technologies") },
						].map((stat) => (
							<motion.div
								key={stat.label}
								variants={fadeInUp}
								className="text-center"
							>
								<AnimatedCounter value={stat.value} />
								<div className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
									{stat.label}
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>
			</section>

			{/* ── Featured Projects ── */}
			<Section>
				<SectionTitle subtitle={t("home.featuredDesc")}>
					{t("home.featured")}
				</SectionTitle>
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={staggerContainer}
					className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
				>
					{featured.map((project) => (
						<motion.div
							key={project.slug}
							variants={fadeInUp}
							whileHover={cardHover.whileHover}
							whileTap={cardHover.whileTap}
							style={{ willChange: "transform" }}
						>
							<Link href={`/projects/${project.slug}`}>
								<Card variant="hover" className="group h-full">
									<div className="flex h-full flex-col">
										<h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
											{project.title}
										</h3>
										<p className="mt-2 flex-1 text-sm text-neutral-600 line-clamp-3 dark:text-neutral-400">
											{project.description}
										</p>
										<div className="mt-4 flex flex-wrap gap-2">
											{project.technologies.slice(0, 3).map((tech) => (
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
			</Section>

			{/* ── Skills Preview ── */}
			<section
				className="border-y border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/50"
				aria-label="Skills and Technologies"
			>
				<Section>
					<SectionTitle subtitle="Technologies and tools I work with daily">
						Skills &amp; Technologies
					</SectionTitle>
					<motion.div
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, margin: "-100px" }}
						variants={staggerContainer}
						className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
					>
						{[
							{ name: "Flutter", level: 90 },
							{ name: "Next.js", level: 85 },
							{ name: "React", level: 85 },
							{ name: "Vue.js", level: 80 },
							{ name: "TypeScript", level: 90 },
							{ name: "Tailwind CSS", level: 85 },
							{ name: "Node.js", level: 70 },
							{ name: "PostgreSQL", level: 65 },
						].map((skill) => (
							<motion.div
								key={skill.name}
								variants={fadeInUp}
								whileHover={{
									y: -4,
									transition: { type: "spring", stiffness: 300, damping: 20 },
								}}
								style={{ willChange: "transform" }}
							>
								<Card variant="hover" className="h-full">
									<p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
										{skill.name}
									</p>
									<div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
										<motion.div
											initial={{ width: 0 }}
											whileInView={{ width: `${skill.level}%` }}
											viewport={{ once: true }}
											transition={{
												duration: 1,
												delay: 0.3,
												ease: [0.16, 1, 0.3, 1],
											}}
											className="h-full rounded-full bg-accent-500"
										/>
									</div>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</Section>
			</section>

			{/* ── Contact CTA ── */}
			<Section>
				<motion.div
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={staggerContainer}
					className="text-center"
				>
					<motion.h2
						variants={fadeInUp}
						className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl"
					>
						Let&apos;s Work Together
					</motion.h2>
					<motion.p
						variants={fadeInUp}
						className="mx-auto mt-4 max-w-lg text-neutral-600 dark:text-neutral-400"
					>
						Have a project in mind or just want to say hi? I&apos;m always open
						to new opportunities and collaborations.
					</motion.p>
					<motion.div variants={fadeInUp} className="mt-8">
						<Link href="/contact">
							<Button size="lg">{t("hero.contact")}</Button>
						</Link>
					</motion.div>
				</motion.div>
			</Section>
		</>
	);
}
