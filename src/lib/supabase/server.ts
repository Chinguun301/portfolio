import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Create a Supabase client for use in **server components**, **route
 * handlers**, and **server actions**.
 *
 * Uses `@supabase/ssr` to read and write auth cookies via the
 * `next/headers` `cookies()` API, so session state is fully managed
 * on the server and survives server-side rendering.
 *
 * Call this in every server component / action that needs auth-aware
 * Supabase access:
 *
 *   import { createClient } from "@/lib/supabase/server";
 *   const supabase = await createClient();
 *   const { data: { user } } = await supabase.auth.getUser();
 */
export async function createClient() {
	const cookieStore = await cookies();

	return createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return cookieStore.getAll();
				},
				setAll(cookiesToSet) {
					for (const { name, value, options } of cookiesToSet) {
						cookieStore.set(name, value, options);
					}
				},
			},
		},
	);
}
