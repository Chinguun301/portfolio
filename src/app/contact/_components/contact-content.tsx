"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/provider";
import {
	Section,
	SectionTitle,
	Button,
	Input,
	Textarea,
} from "@/components/ui/primitives";
import {
	fadeInUp,
	staggerContainer,
	slideInLeft,
	slideInRight,
	listStagger,
} from "@/lib/animations";
import { submitContactForm } from "@/app/actions";
import type { ContactFormState } from "@/app/actions";
import { track } from "@vercel/analytics";

const initialState: ContactFormState = {
	success: false,
};

const contactInfo = [
	{
		label: "Email",
		value: "chinguunv@gmail.com",
		href: "mailto:chinguunv@gmail.com",
		icon: (
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<rect width="20" height="16" x="2" y="4" rx="2" />
				<path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
			</svg>
		),
	},
	{
		label: "Phone",
		value: "95247512",
		icon: (
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
			</svg>
		),
	},
	{
		label: "Location",
		value: "Ulaanbaatar, Mongolia",
		icon: (
			<svg
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
				<circle cx="12" cy="10" r="3" />
			</svg>
		),
	},
];

export default function ContactContent() {
	const { t } = useTranslation();
	const [state, formAction, isPending] = useActionState(
		submitContactForm,
		initialState,
	);

	// Track contact form submission
	const handleFormSubmit = (formData: FormData) => {
		try {
			track("contact_submit", {
				email: (formData.get("email") as string)?.slice(0, 3) + "...",
			});
		} catch {
			// Analytics tracking non-blocking
		}
		formAction(formData);
	};

	return (
		<Section>
			<motion.div
				initial="hidden"
				animate="visible"
				variants={staggerContainer}
			>
				<motion.div variants={fadeInUp}>
					<SectionTitle subtitle={t("contact.description")}>
						{t("contact.title")}
					</SectionTitle>
				</motion.div>

				<motion.div variants={fadeInUp} className="grid gap-12 lg:grid-cols-5">
					{/* ── Contact Info (left) ── */}
					<motion.div
						initial="hidden"
						animate="visible"
						variants={listStagger}
						className="space-y-8 lg:col-span-2"
					>
						{contactInfo.map((info) => (
							<motion.div
								key={info.label}
								variants={slideInLeft}
								whileHover={{
									x: 4,
									transition: { type: "spring", stiffness: 200, damping: 20 },
								}}
								className="group"
							>
								<div className="flex items-start gap-4">
									<span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors group-hover:border-accent-500 group-hover:text-accent-500 dark:border-neutral-800 dark:text-neutral-400">
										{info.icon}
									</span>
									<div>
										<p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
											{info.label}
										</p>
										{info.href ? (
											<a
												href={info.href}
												className="mt-0.5 block text-neutral-900 transition-colors hover:text-accent-500 dark:text-neutral-100"
											>
												{info.value}
											</a>
										) : (
											<p className="mt-0.5 text-neutral-900 dark:text-neutral-100">
												{info.value}
											</p>
										)}
									</div>
								</div>
							</motion.div>
						))}

						{/* Social links */}
						<motion.div variants={slideInLeft}>
							<p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
								Social
							</p>
							<div className="mt-3 flex gap-3">
								<a
									href="https://github.com/chinguunv"
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors hover:border-accent-500 hover:text-accent-500 dark:border-neutral-800 dark:text-neutral-400"
									aria-label="GitHub"
								>
									<svg
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="currentColor"
										aria-hidden="true"
									>
										<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
									</svg>
								</a>
								<a
									href="https://linkedin.com/in/chinguunv"
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-500 transition-colors hover:border-accent-500 hover:text-accent-500 dark:border-neutral-800 dark:text-neutral-400"
									aria-label="LinkedIn"
								>
									<svg
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="currentColor"
										aria-hidden="true"
									>
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
									</svg>
								</a>
							</div>
						</motion.div>
					</motion.div>

					{/* ── Contact Form (right) ── */}
					<motion.div
						initial="hidden"
						animate="visible"
						variants={listStagger}
						className="lg:col-span-3"
					>
						{state.success ? (
							<motion.div
								initial={{ opacity: 0, scale: 0.9 }}
								animate={{ opacity: 1, scale: 1 }}
								transition={{
									type: "spring",
									stiffness: 120,
									damping: 18,
									mass: 0.9,
								}}
								className="flex flex-col items-center justify-center rounded-xl border border-success-200 bg-success-50 px-6 py-16 text-center dark:border-success-900/50 dark:bg-success-950/20"
							>
								<motion.div
									initial={{ scale: 0, rotate: -180 }}
									animate={{ scale: 1, rotate: 0 }}
									transition={{
										type: "spring",
										stiffness: 200,
										damping: 15,
										delay: 0.15,
									}}
									className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-100 dark:bg-success-900/30"
								>
									<svg
										width="32"
										height="32"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="text-success-600 dark:text-success-400"
										aria-hidden="true"
									>
										<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
										<polyline points="22 4 12 14.01 9 11.01" />
									</svg>
								</motion.div>
								<motion.h3
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 }}
									className="text-xl font-semibold text-neutral-900 dark:text-neutral-100"
								>
									{t("contact.form.success")}
								</motion.h3>
								<motion.p
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.4 }}
									className="mt-2 text-sm text-neutral-500"
								>
									I&apos;ll get back to you as soon as possible.
								</motion.p>
							</motion.div>
						) : (
							<form action={handleFormSubmit} className="space-y-5">
								<motion.div variants={slideInRight}>
									<Input
										label={t("contact.form.name")}
										name="name"
										type="text"
										placeholder="Your name"
										defaultValue={state.fields?.name ?? ""}
										error={
											state.error?.includes("Name") ? state.error : undefined
										}
										required
									/>
								</motion.div>
								<motion.div variants={slideInRight}>
									<Input
										label={t("contact.form.email")}
										name="email"
										type="email"
										placeholder="your@email.com"
										defaultValue={state.fields?.email ?? ""}
										error={
											state.error?.includes("email") ? state.error : undefined
										}
										required
									/>
								</motion.div>
								<motion.div variants={slideInRight}>
									<Textarea
										label={t("contact.form.message")}
										name="message"
										placeholder="Tell me about your project..."
										rows={5}
										defaultValue={state.fields?.message ?? ""}
										error={
											state.error?.includes("Message") ? state.error : undefined
										}
										required
									/>
								</motion.div>

								<motion.div variants={slideInRight}>
									{state.error &&
										!state.error.includes("Name") &&
										!state.error.includes("email") &&
										!state.error.includes("Message") && (
											<div className="rounded-lg border border-error-200 bg-error-50 p-3 text-sm text-error-600 dark:border-error-900/50 dark:bg-error-950/20 dark:text-error-400">
												{state.error}
											</div>
										)}
									<Button
										type="submit"
										variant="primary"
										size="lg"
										className="w-full"
										disabled={isPending}
									>
										{isPending ? (
											<span className="flex items-center gap-2">
												<svg
													className="h-4 w-4 animate-spin"
													viewBox="0 0 24 24"
													fill="none"
													aria-hidden="true"
												>
													<circle
														className="opacity-25"
														cx="12"
														cy="12"
														r="10"
														stroke="currentColor"
														strokeWidth="4"
													/>
													<path
														className="opacity-75"
														fill="currentColor"
														d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
													/>
												</svg>
												{t("contact.form.sending")}
											</span>
										) : (
											t("contact.form.send")
										)}
									</Button>
								</motion.div>
							</form>
						)}
					</motion.div>
				</motion.div>
			</motion.div>
		</Section>
	);
}
