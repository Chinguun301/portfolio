import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Pages that are always accessible without authentication.
 * Every other /admin/* route requires a valid Supabase session.
 */
const PUBLIC_ADMIN_ROUTES = ["/admin/login"];

/**
 * Return `true` when the pathname is under /admin but is NOT in the
 * public allowlist.
 */
function isProtectedRoute(pathname: string): boolean {
	if (!pathname.startsWith("/admin")) return false;
	for (const pub of PUBLIC_ADMIN_ROUTES) {
		if (pathname === pub || pathname.startsWith(pub + "/")) return false;
	}
	return true;
}

export async function proxy(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip non-admin routes entirely
	if (!pathname.startsWith("/admin")) {
		return NextResponse.next();
	}

	let supabaseResponse = NextResponse.next({ request });

	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				getAll() {
					return request.cookies.getAll();
				},
				setAll(cookiesToSet) {
					// Write request cookies so subsequent middleware calls see them
					for (const { name, value } of cookiesToSet) {
						request.cookies.set(name, value);
					}
					supabaseResponse = NextResponse.next({ request });
					for (const { name, value, options } of cookiesToSet) {
						supabaseResponse.cookies.set(name, value, options);
					}
				},
			},
		},
	);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	// Protected route without a user → redirect to login
	if (isProtectedRoute(pathname) && !user) {
		const loginUrl = new URL("/admin/login", request.url);
		loginUrl.searchParams.set("redirect", pathname);
		return NextResponse.redirect(loginUrl);
	}

	// Already logged in and visiting login → redirect to dashboard
	if (pathname === "/admin/login" && user) {
		return NextResponse.redirect(new URL("/admin", request.url));
	}

	return supabaseResponse;
}

export const config = {
	matcher: [
		// Run on every /admin route and also on the root favicon (not needed here)
		"/admin/:path*",
	],
};
