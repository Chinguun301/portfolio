import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client singleton.
 *
 * Uses `@supabase/supabase-js` to create a browser-safe client for
 * interacting with the Supabase backend. Works in both server and client
 * components (for server components, prefer the server client pattern
 * with service-role key when admin access is needed).
 *
 * Environment variables (set in .env.local / Vercel project):
 *   NEXT_PUBLIC_SUPABASE_URL     – your Supabase project URL
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY – your Supabase anon / public key
 *
 * Usage:
 *   import { supabase } from '@/lib/supabase/client';
 *
 *   // Public read (RLS handles filtering)
 *   const { data: projects } = await supabase
 *     .from('projects')
 *     .select('*')
 *     .eq('status', 'published')
 *     .order('sort_order', { ascending: false });
 *
 *   // Contact form submit
 *   await supabase.from('messages').insert({
 *     name, email, subject, message,
 *   });
 *
 *   // Admin operations (requires active Supabase session)
 *   await supabase.from('projects').insert({ ... });
 *   await supabase.from('site_config').select('*');
 */
export const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
