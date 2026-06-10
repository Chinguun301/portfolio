"use client";

import { SectionTitle, Card, Input, Button } from "@/components/ui/primitives";

export default function AdminSettings() {
	return (
		<div className="space-y-8">
			<SectionTitle subtitle="Configure your portfolio">Settings</SectionTitle>

			<Card className="!p-6">
				<h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
					Profile Information
				</h3>
				<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
					<Input label="Display Name" placeholder="Your name" />
					<Input label="Title" placeholder="Frontend Developer" />
					<Input label="Email" type="email" placeholder="hello@example.com" />
					<Button type="submit">Save Changes</Button>
				</form>
			</Card>

			<Card className="!p-6">
				<h3 className="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
					Theme Settings
				</h3>
				<p className="text-sm text-neutral-500 dark:text-neutral-400">
					Use the dark mode toggle in the header to switch between light and
					dark themes.
				</p>
			</Card>
		</div>
	);
}
