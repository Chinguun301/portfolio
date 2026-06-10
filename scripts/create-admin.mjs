/**
 * Admin user creator for Supabase.
 *
 * Usage:
 *   node scripts/create-admin.mjs you@example.com your-password
 *
 * This calls the Supabase Management API (service_role key required).
 * If you don't have the service_role key, use the SQL method instead:
 *   cat artifacts/db/setup-admin.sql
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
	console.error(`
Usage: node scripts/create-admin.mjs <email> <password>

Environment:
  NEXT_PUBLIC_SUPABASE_URL  (required, from .env.local)
  SUPABASE_SERVICE_ROLE_KEY (required, from Supabase dashboard → Settings → API)
`);
	process.exit(1);
}

if (!SERVICE_ROLE_KEY) {
	console.error(`
❌ SUPABASE_SERVICE_ROLE_KEY not set.

To get it:
  1. Go to https://supabase.com/dashboard/project/${new URL(SUPABASE_URL || "").hostname.split(".")[0]}/settings/api
  2. Copy the service_role key (NOT the anon key!)
  3. Run: SUPABASE_SERVICE_ROLE_KEY=<key> node scripts/create-admin.mjs ${email} ${password}

Or use the SQL method:
  cat artifacts/db/setup-admin.sql
`);
	process.exit(1);
}

async function main() {
	try {
		const res = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				apikey: SERVICE_ROLE_KEY,
				Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
			},
			body: JSON.stringify({
				email,
				password,
				email_confirm: true, // auto-confirm so no email needed
			}),
		});

		const data = await res.json();

		if (res.ok) {
			console.log(`✅ Admin user created: ${email}`);
			console.log(`   Login at http://localhost:3000/admin/login`);
		} else {
			console.error(
				`❌ Failed: ${data.msg || data.error || JSON.stringify(data)}`,
			);
			console.error(
				`\nUse the SQL method instead: cat artifacts/db/setup-admin.sql`,
			);
		}
	} catch (err) {
		console.error(`❌ Error: ${err.message}`);
	}
}

main();
