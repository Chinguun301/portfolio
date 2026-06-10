"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button, Card, Badge, SectionTitle } from "@/components/ui/primitives";

interface Message {
	id: string;
	created_at: string;
	name: string;
	email: string;
	subject: string;
	message: string;
	read: boolean;
}

export default function AdminMessages() {
	const [messages, setMessages] = useState<Message[]>([]);
	const [selected, setSelected] = useState<Message | null>(null);

	useEffect(() => {
		async function load() {
			try {
				const supabase = createClient(
					process.env.NEXT_PUBLIC_SUPABASE_URL!,
					process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
				);
				const { data } = await supabase
					.from("messages")
					.select("*")
					.order("created_at", { ascending: false });
				if (data) setMessages(data);
			} catch {
				// Supabase not configured
			}
		}
		load();
	}, []);

	async function markRead(id: string) {
		try {
			const supabase = createClient(
				process.env.NEXT_PUBLIC_SUPABASE_URL!,
				process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			);
			await supabase.from("messages").update({ read: true }).eq("id", id);
			setMessages((prev) =>
				prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
			);
		} catch {
			// ignore
		}
	}

	async function deleteMessage(id: string) {
		try {
			const supabase = createClient(
				process.env.NEXT_PUBLIC_SUPABASE_URL!,
				process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			);
			await supabase.from("messages").delete().eq("id", id);
			setMessages((prev) => prev.filter((m) => m.id !== id));
			if (selected?.id === id) setSelected(null);
		} catch {
			// ignore
		}
	}

	return (
		<div className="space-y-6">
			<SectionTitle subtitle="Contact form submissions">Messages</SectionTitle>

			<div className="grid gap-6 lg:grid-cols-2">
				<div className="space-y-2">
					{messages.length === 0 && (
						<p className="text-sm text-neutral-500 dark:text-neutral-400">
							No messages yet.
						</p>
					)}
					{messages.map((msg) => (
						<button
							key={msg.id}
							onClick={() => {
								setSelected(msg);
								if (!msg.read) markRead(msg.id);
							}}
							className={`w-full rounded-lg border p-4 text-left transition-colors ${
								selected?.id === msg.id
									? "border-accent-500 bg-accent-50 dark:border-accent-500 dark:bg-accent-950/20"
									: "border-neutral-200 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800"
							}`}
						>
							<div className="flex items-start justify-between gap-2">
								<div className="min-w-0 flex-1">
									<p className="truncate font-medium text-neutral-900 dark:text-neutral-100">
										{msg.name}
									</p>
									<p className="truncate text-sm text-neutral-500 dark:text-neutral-400">
										{msg.subject || "(no subject)"}
									</p>
								</div>
								<div className="flex shrink-0 items-center gap-2">
									{!msg.read && <Badge variant="accent">New</Badge>}
									<span className="text-xs text-neutral-400">
										{new Date(msg.created_at).toLocaleDateString()}
									</span>
								</div>
							</div>
						</button>
					))}
				</div>

				{selected && (
					<Card className="!p-6">
						<div className="space-y-4">
							<div>
								<h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
									{selected.subject || "(no subject)"}
								</h3>
								<p className="text-sm text-neutral-500 dark:text-neutral-400">
									From: {selected.name} ({selected.email})
								</p>
								<p className="text-xs text-neutral-400">
									{new Date(selected.created_at).toLocaleString()}
								</p>
							</div>
							<div className="rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800">
								<p className="whitespace-pre-wrap text-sm text-neutral-800 dark:text-neutral-200">
									{selected.message}
								</p>
							</div>
							<div className="flex gap-2">
								<Button
									variant="secondary"
									size="sm"
									onClick={() => deleteMessage(selected.id)}
								>
									Delete
								</Button>
							</div>
						</div>
					</Card>
				)}
			</div>
		</div>
	);
}
