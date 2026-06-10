"use client";

import { useState, useCallback, Suspense, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { Button, Input, Card } from "@/components/ui/primitives";

type FormState = {
	email: string;
	password: string;
};

type PageError = {
	message: string;
};

export default function AdminLoginPage() {
	return (
		<Suspense
			fallback={
				<div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
					<div className="text-neutral-500 dark:text-neutral-400">
						Loading...
					</div>
				</div>
			}
		>
			<LoginForm />
		</Suspense>
	);
}

function LoginForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectTo = searchParams.get("redirect") || "/admin";

	const [form, setForm] = useState<FormState>({ email: "", password: "" });
	const [error, setError] = useState<PageError | null>(null);
	const [loading, setLoading] = useState(false);

	const updateField = useCallback(
		(field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) => {
			setForm((prev) => ({ ...prev, [field]: e.target.value }));
			setError(null);
		},
		[],
	);

	const handleLogin = useCallback(
		async (e: FormEvent) => {
			e.preventDefault();
			setError(null);

			// Basic validation
			if (!form.email.trim()) {
				setError({ message: "Email is required." });
				return;
			}
			if (!form.password) {
				setError({ message: "Password is required." });
				return;
			}

			setLoading(true);

			try {
				const supabase = createClient(
					process.env.NEXT_PUBLIC_SUPABASE_URL!,
					process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
				);

				const { error: authError } = await supabase.auth.signInWithPassword({
					email: form.email.trim(),
					password: form.password,
				});

				if (authError) {
					setError({
						message:
							authError.message === "Invalid login credentials"
								? "Invalid email or password. Please try again."
								: authError.message,
					});
					setLoading(false);
					return;
				}

				// Successful login — redirect
				router.push(redirectTo);
				router.refresh();
			} catch {
				setError({
					message: "An unexpected error occurred. Please try again.",
				});
				setLoading(false);
			}
		},
		[form, router, redirectTo],
	);

	return (
		<div className="flex min-h-screen items-center justify-center bg-neutral-50 p-4 dark:bg-neutral-950">
			<div className="w-full max-w-sm">
				{/* Header */}
				<div className="mb-8 text-center">
					<div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 dark:bg-neutral-100">
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="text-white dark:text-neutral-900"
						>
							<rect x="3" y="3" width="7" height="9" />
							<rect x="14" y="3" width="7" height="5" />
							<rect x="14" y="12" width="7" height="9" />
							<rect x="3" y="16" width="7" height="5" />
						</svg>
					</div>
					<h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
						Admin Login
					</h1>
					<p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
						Sign in to manage your portfolio
					</p>
				</div>

				<Card className="!p-6">
					<form onSubmit={handleLogin} className="space-y-4">
						{error && (
							<div className="rounded-lg border border-error-200 bg-error-50 px-4 py-3 text-sm text-error-700 dark:border-error-800 dark:bg-error-950/30 dark:text-error-400">
								{error.message}
							</div>
						)}

						<Input
							label="Email"
							type="email"
							placeholder="admin@example.com"
							autoComplete="email"
							value={form.email}
							onChange={updateField("email")}
							disabled={loading}
							autoFocus
						/>

						<Input
							label="Password"
							type="password"
							placeholder="••••••••"
							autoComplete="current-password"
							value={form.password}
							onChange={updateField("password")}
							disabled={loading}
						/>

						<Button
							type="submit"
							disabled={loading}
							className="w-full"
							size="lg"
						>
							{loading ? "Signing in..." : "Sign In"}
						</Button>
					</form>
				</Card>

				<p className="mt-6 text-center text-xs text-neutral-400 dark:text-neutral-500">
					<Link
						href="/"
						className="underline underline-offset-2 hover:text-neutral-600 dark:hover:text-neutral-300"
					>
						&larr; Back to portfolio
					</Link>
				</p>
			</div>
		</div>
	);
}
