"use client";

import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
import { DarkModeToggle } from "@/components/ui/dark-mode-toggle";

/* ──────────────────────────────────────────
   Icons (inline SVG for zero deps)
   ────────────────────────────────────────── */

const Icons = {
	dashboard: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<rect x="3" y="3" width="7" height="7" />
			<rect x="14" y="3" width="7" height="7" />
			<rect x="3" y="14" width="7" height="7" />
			<rect x="14" y="14" width="7" height="7" />
		</svg>
	),
	projects: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
		</svg>
	),
	messages: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
		</svg>
	),
	settings: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<circle cx="12" cy="12" r="3" />
			<path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
		</svg>
	),
	logout: (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
			<polyline points="16 17 21 12 16 7" />
			<line x1="21" y1="12" x2="9" y2="12" />
		</svg>
	),
	menu: (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		>
			<line x1="3" y1="6" x2="21" y2="6" />
			<line x1="3" y1="12" x2="21" y2="12" />
			<line x1="3" y1="18" x2="21" y2="18" />
		</svg>
	),
	close: (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
		>
			<line x1="18" y1="6" x2="6" y2="18" />
			<line x1="6" y1="6" x2="18" y2="18" />
		</svg>
	),
};

/* ──────────────────────────────────────────
   Navigation items
   ────────────────────────────────────────── */

interface NavItem {
	label: string;
	href: string;
	icon: React.ReactNode;
}

const navItems: NavItem[] = [
	{ label: "Dashboard", href: "/admin", icon: Icons.dashboard },
	{ label: "Projects", href: "/admin/projects", icon: Icons.projects },
	{ label: "Messages", href: "/admin/messages", icon: Icons.messages },
	{ label: "Settings", href: "/admin/settings", icon: Icons.settings },
];

/* ──────────────────────────────────────────
   Sidebar (desktop) + Drawer (mobile)
   ────────────────────────────────────────── */

function Sidebar({
	pathname,
	onNavigate,
}: {
	pathname: string;
	onNavigate?: () => void;
}) {
	return (
		<nav className="flex flex-1 flex-col gap-1" aria-label="Admin navigation">
			{navItems.map((item) => {
				const isActive =
					item.href === "/admin"
						? pathname === "/admin"
						: pathname.startsWith(item.href);

				return (
					<Link
						key={item.href}
						href={item.href}
						onClick={onNavigate}
						className={`
                flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150
                ${
									isActive
										? "bg-neutral-200 text-neutral-900 dark:bg-neutral-700 dark:text-neutral-100"
										: "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
								}
              `}
					>
						<span className="shrink-0">{item.icon}</span>
						{item.label}
					</Link>
				);
			})}
		</nav>
	);
}

/* ──────────────────────────────────────────
   Logout button
   ────────────────────────────────────────── */

function LogoutButton() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);

	const handleLogout = useCallback(async () => {
		setLoading(true);
		try {
			const supabase = createClient(
				process.env.NEXT_PUBLIC_SUPABASE_URL!,
				process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
			);
			await supabase.auth.signOut();
			router.push("/admin/login");
			router.refresh();
		} catch {
			// Fallback: force redirect
			window.location.href = "/admin/login";
		}
	}, [router]);

	return (
		<button
			onClick={handleLogout}
			disabled={loading}
			className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-600 transition-colors duration-150 hover:bg-error-50 hover:text-error-600 dark:text-neutral-400 dark:hover:bg-error-950/30 dark:hover:text-error-400"
		>
			<span className="shrink-0">{Icons.logout}</span>
			{loading ? "Signing out..." : "Logout"}
		</button>
	);
}

/* ──────────────────────────────────────────
   Admin Layout
   ────────────────────────────────────────── */

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-950">
			{/* Mobile overlay */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
					onClick={() => setSidebarOpen(false)}
					aria-hidden="true"
				/>
			)}

			{/* Mobile sidebar drawer */}
			<aside
				className={`
            fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-neutral-200 bg-white p-4 transition-transform duration-250 lg:hidden
            dark:border-neutral-800 dark:bg-neutral-900
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          `}
			>
				<div className="mb-6 flex items-center justify-between">
					<Link
						href="/admin"
						onClick={() => setSidebarOpen(false)}
						className="text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
					>
						Admin
					</Link>
					<button
						onClick={() => setSidebarOpen(false)}
						className="rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300"
						aria-label="Close menu"
					>
						{Icons.close}
					</button>
				</div>
				<Sidebar pathname={pathname} onNavigate={() => setSidebarOpen(false)} />
				<div className="mt-auto border-t border-neutral-200 pt-4 dark:border-neutral-800">
					<LogoutButton />
				</div>
			</aside>

			{/* Desktop sidebar */}
			<aside className="hidden w-64 shrink-0 border-r border-neutral-200 bg-white p-4 lg:flex lg:flex-col dark:border-neutral-800 dark:bg-neutral-900">
				<Link
					href="/admin"
					className="mb-6 flex items-center gap-2 px-3 text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100"
				>
					<svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						className="text-accent-500"
					>
						<rect x="3" y="3" width="7" height="9" />
						<rect x="14" y="3" width="7" height="5" />
						<rect x="14" y="12" width="7" height="9" />
						<rect x="3" y="16" width="7" height="5" />
					</svg>
					Admin
				</Link>
				<Sidebar pathname={pathname} />
				<div className="mt-auto border-t border-neutral-200 pt-4 dark:border-neutral-800">
					<LogoutButton />
				</div>
			</aside>

			{/* Main content */}
			<div className="flex min-w-0 flex-1 flex-col">
				{/* Top bar (mobile only) */}
				<header className="sticky top-0 z-30 flex items-center justify-between border-b border-neutral-200 bg-white/80 px-4 py-3 backdrop-blur-md lg:hidden dark:border-neutral-800 dark:bg-neutral-950/80">
					<button
						onClick={() => setSidebarOpen(true)}
						className="rounded-md p-1 text-neutral-600 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
						aria-label="Open menu"
					>
						{Icons.menu}
					</button>
					<span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
						Admin
					</span>
					<DarkModeToggle />
				</header>

				{/* Page content */}
				<main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
					{children}
				</main>
			</div>
		</div>
	);
}
