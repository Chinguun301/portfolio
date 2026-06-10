"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Button, Badge, SectionTitle } from "@/components/ui/primitives";

interface Project {
	id: string;
	title: string;
	slug: string;
	status: string;
	featured: boolean;
	created_at: string;
}

export default function AdminProjects() {
	const [projects, setProjects] = useState<Project[]>([]);

	useEffect(() => {
		async function load() {
			try {
				const supabase = createClient(
					process.env.NEXT_PUBLIC_SUPABASE_URL!,
					process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
				);
				const { data } = await supabase
					.from("projects")
					.select("id,title,slug,status,featured,created_at")
					.order("created_at", { ascending: false });
				if (data) setProjects(data);
			} catch {
				// Supabase not configured
			}
		}
		load();
	}, []);

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<SectionTitle subtitle="Manage your portfolio projects">
					Projects
				</SectionTitle>
				<Link href="/admin/projects/new">
					<Button>New Project</Button>
				</Link>
			</div>

			{projects.length === 0 && (
				<div className="rounded-lg border border-dashed border-neutral-300 p-12 text-center dark:border-neutral-700">
					<p className="text-neutral-500 dark:text-neutral-400">
						No projects found. Create your first project to get started.
					</p>
				</div>
			)}

			<div className="overflow-x-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
				<table className="w-full text-left text-sm">
					<thead>
						<tr className="border-b border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900">
							<th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
								Title
							</th>
							<th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
								Status
							</th>
							<th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
								Featured
							</th>
							<th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
								Date
							</th>
							<th className="px-4 py-3 font-medium text-neutral-600 dark:text-neutral-400">
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{projects.map((p) => (
							<tr
								key={p.id}
								className="border-b border-neutral-200 last:border-0 dark:border-neutral-800"
							>
								<td className="px-4 py-3 font-medium text-neutral-900 dark:text-neutral-100">
									{p.title}
								</td>
								<td className="px-4 py-3">
									<Badge
										variant={p.status === "published" ? "success" : "default"}
									>
										{p.status}
									</Badge>
								</td>
								<td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
									{p.featured ? "⭐" : "—"}
								</td>
								<td className="px-4 py-3 text-neutral-500 dark:text-neutral-400">
									{new Date(p.created_at).toLocaleDateString()}
								</td>
								<td className="px-4 py-3">
									<Link href={`/admin/projects/${p.id}/edit`}>
										<Button variant="secondary" size="sm">
											Edit
										</Button>
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
