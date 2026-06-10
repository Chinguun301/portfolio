"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@supabase/supabase-js";
import { SectionTitle, Card, Input, Button } from "@/components/ui/primitives";

type FormState = {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
};

type PageMessage = {
	type: "success" | "error";
	text: string;
};

export default function AdminPasswordPage() {
	const [form, setForm] = useState<FormState>({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<PageMessage | null>(null);

	function updateField(field: keyof FormState) {
		return (e: React.ChangeEvent<HTMLInputElement>) => {
			setForm((prev) => ({ ...prev, [field]: e.target.value }));
			setMessage(null);
		};
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setMessage(null);

		// Validation
		if (!form.currentPassword) {
			setMessage({ type: "error", text: "Current password is required." });
			return;
		}
		if (form.newPassword.length < 6) {
			setMessage({
				type: "error",
				text: "New password must be at least 6 characters.",
			});
			return;
		}
		if (form.newPassword !== form.confirmPassword) {
			setMessage({ type: "error", text: "Passwords do not match." });
			return;
		}

		setLoading(true);

		try {
			const supabase = createClient(
				process.env.NEXT_PUBLIC_SUPABASE_URL!,
				process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			);

			// First re-authenticate with current password
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (!user?.email) {
				setMessage({
					type: "error",
					text: "Not authenticated. Please log in again.",
				});
				setLoading(false);
				return;
			}

			const { error: signInError } = await supabase.auth.signInWithPassword({
				email: user.email,
				password: form.currentPassword,
			});

			if (signInError) {
				setMessage({
					type: "error",
					text: "Current password is incorrect.",
				});
				setLoading(false);
				return;
			}

			// Update password
			const { error: updateError } = await supabase.auth.updateUser({
				password: form.newPassword,
			});

			if (updateError) {
				setMessage({
					type: "error",
					text: updateError.message,
				});
				setLoading(false);
				return;
			}

			// Success
			setMessage({
				type: "success",
				text: "Password changed successfully!",
			});
			setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
		} catch {
			setMessage({
				type: "error",
				text: "An unexpected error occurred. Supabase may not be configured.",
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="space-y-6">
			<SectionTitle subtitle="Update your admin account password">
				Password
			</SectionTitle>

			<Card className="!p-6">
				<form onSubmit={handleSubmit} className="space-y-4">
					{message && (
						<div
							className={`rounded-lg border px-4 py-3 text-sm ${
								message.type === "success"
									? "border-success-200 bg-success-50 text-success-700 dark:border-success-800 dark:bg-success-950/30 dark:text-success-400"
									: "border-error-200 bg-error-50 text-error-700 dark:border-error-800 dark:bg-error-950/30 dark:text-error-400"
							}`}
						>
							{message.text}
						</div>
					)}

					<Input
						label="Current Password"
						type="password"
						placeholder="Enter current password"
						autoComplete="current-password"
						value={form.currentPassword}
						onChange={updateField("currentPassword")}
						disabled={loading}
						autoFocus
					/>

					<Input
						label="New Password"
						type="password"
						placeholder="At least 6 characters"
						autoComplete="new-password"
						value={form.newPassword}
						onChange={updateField("newPassword")}
						disabled={loading}
					/>

					<Input
						label="Confirm New Password"
						type="password"
						placeholder="Repeat new password"
						autoComplete="new-password"
						value={form.confirmPassword}
						onChange={updateField("confirmPassword")}
						disabled={loading}
					/>

					<Button type="submit" disabled={loading}>
						{loading ? "Changing..." : "Change Password"}
					</Button>
				</form>
			</Card>
		</div>
	);
}
