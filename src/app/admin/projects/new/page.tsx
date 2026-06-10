"use client";

import {
	SectionTitle,
	Card,
	Input,
	Textarea,
	Button,
} from "@/components/ui/primitives";

export default function NewProjectPage() {
	return (
		<div className="space-y-6">
			<SectionTitle subtitle="Add a project to your portfolio">
				New Project
			</SectionTitle>

			<Card className="!p-6">
				<form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
					<Input label="Title" placeholder="Project name" />
					<Input label="Slug" placeholder="project-name" />
					<Textarea label="Description" placeholder="Short description" />
					<Textarea label="Content" placeholder="Full project description" />
					<Input
						label="Technologies"
						placeholder="React, TypeScript, Tailwind..."
					/>
					<div className="flex gap-4">
						<Input label="GitHub URL" placeholder="https://github.com/..." />
						<Input label="Live URL" placeholder="https://..." />
					</div>
					<Button type="submit">Create Project</Button>
				</form>
			</Card>
		</div>
	);
}
