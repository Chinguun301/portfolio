"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Button, Card } from "@/components/ui/primitives";
import { SectionTitle } from "@/components/ui/primitives";

interface DashboardStats {
	totalProjects: number;
	unreadMessages: number;
	totalMessages: number;
}

export default function AdminDashboard() {
	const [stats, setStats] = useState<DashboardStats>({
		totalProjects: 0,
		unreadMessages: 0,
		totalMessages: 0,
	});

	useEffect(() => {
		async function loadStats() {
			try {
				const supabase = createClient(
					process.env.NEXT_PUBLIC_SUPABASE_URL!,
					process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
				);
				const [projectsRes, messagesRes] = await Promise.all([
					supabase.from("projects").select("*", { count: "exact", head: true }),
					supabase.from("messages").select("*", { count: "exact", head: true }),
				]);
				setStats({
					totalProjects: projectsRes.count ?? 0,
					unreadMessages: 0,
					totalMessages: messagesRes.count ?? 0,
				});

				if (messagesRes.count && messagesRes.count > 0) {
					const { count } = await supabase
						.from("messages")
						.select("*", { count: "exact", head: true })
						.eq("read", false);
					setStats((prev) => ({ ...prev, unreadMessages: count ?? 0 }));
				}
			} catch {
				// Supabase not configured yet — show zeros with fallback
			}
		}
		loadStats();
	}, []);

	const statCards = [
		{
			label: "Total Projects",
			value: stats.totalProjects,
			color:
				"bg-accent-50 text-accent-700 dark:bg-accent-950/30 dark:text-accent-400",
		},
		{
			label: "Unread Messages",
			value: stats.unreadMessages,
			color:
				"bg-success-50 text-success-700 dark:bg-success-950/30 dark:text-success-400",
		},
		{
			label: "Total Messages",
			value: stats.totalMessages,
			color:
				"bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
		},
	];

	return (
		<div className="space-y-8">
			<SectionTitle subtitle="Overview of your portfolio">
				Dashboard
			</SectionTitle>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{statCards.map((stat) => (
					<Card key={stat.label} className="!p-6">
						<p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
							{stat.label}
						</p>
						<p className={`mt-2 text-3xl font-bold ${stat.color}`}>
							{stat.value}
						</p>
					</Card>
				))}
			</div>

			<div className="flex gap-3">
				<Link href="/admin/projects/new">
					<Button>New Project</Button>
				</Link>
				<Link href="/admin/messages">
					<Button variant="secondary">View Messages</Button>
				</Link>
			</div>
		</div>
	);
}
