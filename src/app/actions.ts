"use server";

import { createClient } from "@supabase/supabase-js";

/**
 * Initialize a Supabase client for server-side operations.
 * Uses environment variables set in .env.local or Vercel project.
 */
function getSupabaseClient() {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

	if (!url || !key) {
		throw new Error(
			"Missing Supabase environment variables. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
		);
	}

	return createClient(url, key);
}

export type ContactFormState = {
	success: boolean;
	error?: string;
	fields?: {
		name: string;
		email: string;
		message: string;
	};
};

/**
 * Server action: submit a contact form message to Supabase.
 * Validates inputs, inserts into `messages` table, returns success/error.
 */
export async function submitContactForm(
	prevState: ContactFormState | null,
	formData: FormData,
): Promise<ContactFormState> {
	const name = (formData.get("name") as string)?.trim();
	const email = (formData.get("email") as string)?.trim();
	const message = (formData.get("message") as string)?.trim();

	// Client-side validation
	const errors: string[] = [];
	if (!name || name.length < 2) {
		errors.push("Name must be at least 2 characters.");
	}
	if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
		errors.push("Please enter a valid email address.");
	}
	if (!message || message.length < 10) {
		errors.push("Message must be at least 10 characters.");
	}

	if (errors.length > 0) {
		return {
			success: false,
			error: errors.join(" "),
			fields: { name, email, message },
		};
	}

	try {
		const supabase = getSupabaseClient();

		const { error: dbError } = await supabase.from("messages").insert({
			name,
			email,
			message,
			created_at: new Date().toISOString(),
		});

		if (dbError) {
			console.error("Supabase insert error:", dbError);
			return {
				success: false,
				error: "Failed to save your message. Database error occurred.",
				fields: { name, email, message },
			};
		}

		return { success: true };
	} catch (err) {
		console.error("Contact form error:", err);
		return {
			success: false,
			error:
				"Service temporarily unavailable. Please try again later or email me directly at chinguunv@gmail.com.",
			fields: { name, email, message },
		};
	}
}
