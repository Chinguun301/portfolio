"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import {
	SectionTitle,
	Card,
	Input,
	Textarea,
	Button,
} from "@/components/ui/primitives";

interface ProjectForm {
	title: string;
	slug: string;
	description: string;
	content: string;
	technologies: string;
	status: string;
	featured: boolean;
	github_url: string;
	live_url: string;
}

export default function EditProjectPage() {
	const params = useParams();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [form, setForm] = useState<ProjectForm>({
		title: "",
		slug: "",
		description: "",
		content: "",
		technologies: "",
		status: "draft",
		featured: false,
		github_url: "",
		live_url: "",
	});

	useEffect(() => {
		async function load() {
			try {
				const supabase = createClient(
					process.env.NEXT_PUBLIC_SUPABASE_URL!,
					process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
				);
				const { data } = await supabase
					.from("projects")
					.select("*")
					.eq("id", params.id)
					.single();
				if (data) {
					setForm({
						title: data.title || "",
						slug: data.slug || "",
						description: data.description || "",
						content: data.content || "",
						technologies: (data.technologies || []).join(", "),
						status: data.status || "draft",
						featured: data.featured || false,
						github_url: data.links?.github || "",
						live_url: data.links?.live || "",
					});
				}
			} catch {
				console.warn("Could not load project for editing");
			} finally {
				setLoading(false);
			}
		}
		load();
	}, [params.id]);

	async function handleSave() {
		setSaving(true);
		try {
			const supabase = createClient(
				process.env.NEXT_PUBLIC_SUPABASE_URL!,
				process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			);
			await supabase
				.from("projects")
				.update({
					title: form.title,
					slug: form.slug,
					description: form.description,
					content: form.content,
					technologies: form.technologies
						.split(",")
						.map((t: string) => t.trim()),
					status: form.status,
					featured: form.featured,
					links: { github: form.github_url, live: form.live_url },
				})
				.eq("id", params.id);
			router.push("/admin/projects");
		} catch {
			alert("Failed to save. Supabase may not be configured.");
		} finally {
			setSaving(false);
		}
	}

	if (loading) {
		return <div className="p-8 text-neutral-500">Loading...</div>;
	}

	return (
		<div className="space-y-6">
			<SectionTitle subtitle="Edit project details">Edit Project</SectionTitle>

			<Card className="!p-6">
				<form
					className="space-y-4"
					onSubmit={(e) => {
						e.preventDefault();
						handleSave();
					}}
				>
					<div className="grid gap-4 sm:grid-cols-2">
						<Input
							label="Title"
							value={form.title}
							onChange={(e) => setForm({ ...form, title: e.target.value })}
						/>
						<Input
							label="Slug"
							value={form.slug}
							onChange={(e) => setForm({ ...form, slug: e.target.value })}
						/>
					</div>
					<Textarea
						label="Description"
						value={form.description}
						onChange={(e) => setForm({ ...form, description: e.target.value })}
					/>
					<Textarea
						label="Content"
						value={form.content}
						onChange={(e) => setForm({ ...form, content: e.target.value })}
					/>
					<Input
						label="Technologies (comma-separated)"
						value={form.technologies}
						onChange={(e) => setForm({ ...form, technologies: e.target.value })}
					/>
					<div className="grid gap-4 sm:grid-cols-2">
						<Input
							label="GitHub URL"
							value={form.github_url}
							onChange={(e) => setForm({ ...form, github_url: e.target.value })}
						/>
						<Input
							label="Live URL"
							value={form.live_url}
							onChange={(e) => setForm({ ...form, live_url: e.target.value })}
						/>
					</div>
					<div className="flex items-center gap-4">
						<label className="flex items-center gap-2 text-sm">
							<input
								type="checkbox"
								checked={form.featured}
								onChange={(e) =>
									setForm({ ...form, featured: e.target.checked })
								}
								className="h-4 w-4 rounded border-neutral-300 text-accent-500"
							/>
							Featured
						</label>
						<select
							value={form.status}
							onChange={(e) => setForm({ ...form, status: e.target.value })}
							className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-800"
						>
							<option value="draft">Draft</option>
							<option value="published">Published</option>
							<option value="archived">Archived</option>
						</select>
					</div>
					<div className="flex gap-3">
						<Button type="submit" disabled={saving}>
							{saving ? "Saving..." : "Save Changes"}
						</Button>
						<Button
							variant="secondary"
							type="button"
							onClick={() => router.push("/admin/projects")}
						>
							Cancel
						</Button>
					</div>
				</form>
			</Card>
		</div>
	);
}
