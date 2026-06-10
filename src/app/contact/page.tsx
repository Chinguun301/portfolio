"use client";

import { motion } from "framer-motion";
import { useTranslation } from "@/lib/i18n/provider";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function ContactPage() {
	const { t } = useTranslation();

	return (
		<div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
			<motion.div
				initial="hidden"
				animate="visible"
				variants={staggerContainer}
			>
				<motion.div variants={fadeInUp}>
					<h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
						{t("contact.title")}
					</h1>
					<p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
						{t("contact.description")}
					</p>
				</motion.div>

				<motion.div variants={fadeInUp} className="mt-12 grid gap-8 sm:grid-cols-2">
					{/* Contact Info */}
					<div className="space-y-6">
						<div>
							<h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
								Email
							</h3>
							<a
								href="mailto:chinguunv@gmail.com"
								className="mt-1 block text-zinc-900 dark:text-zinc-100 hover:underline"
							>
								chinguunv@gmail.com
							</a>
						</div>
						<div>
							<h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
								Phone
							</h3>
							<p className="mt-1 text-zinc-900 dark:text-zinc-100">
								95247512
							</p>
						</div>
						<div>
							<h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
								Location
							</h3>
							<p className="mt-1 text-zinc-900 dark:text-zinc-100">
								Ulaanbaatar, Mongolia
							</p>
						</div>
					</div>

					{/* Contact Form */}
					<form
						className="space-y-4"
						onSubmit={(e) => e.preventDefault()}
					>
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
							>
								{t("contact.form.name")}
							</label>
							<input
								type="text"
								id="name"
								className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
							/>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
							>
								{t("contact.form.email")}
							</label>
							<input
								type="email"
								id="email"
								className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
							/>
						</div>
						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
							>
								{t("contact.form.message")}
							</label>
							<textarea
								id="message"
								rows={4}
								className="mt-1 block w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500"
							/>
						</div>
						<button
							type="submit"
							className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 transition-colors"
						>
							{t("contact.form.send")}
						</button>
					</form>
				</motion.div>
			</motion.div>
		</div>
	);
}
