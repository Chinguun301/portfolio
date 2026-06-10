import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chinguun.com";
const authorName = "Chinguun Vanchinsuren";
const siteName = "Chinguun | Frontend Engineer";

let metadataBase: URL | undefined;
try {
	metadataBase = new URL(siteUrl);
} catch {
	// Fallback used when SITE_URL env var is invalid or missing
	metadataBase = undefined;
}

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
	],
	colorScheme: "dark light",
	width: "device-width",
	initialScale: 1,
};

export const metadata: Metadata = {
	...(metadataBase ? { metadataBase } : {}),
	title: {
		default: siteName,
		template: `%s | ${authorName}`,
	},
	description:
		"Chinguun Vanchinsuren — Frontend Engineer specializing in Flutter, Next.js, and Vue.js. Building performant, user-friendly web and mobile applications.",
	authors: [{ name: authorName, url: siteUrl }],
	creator: authorName,
	publisher: authorName,
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	openGraph: {
		title: siteName,
		description:
			"Chinguun Vanchinsuren — Frontend Engineer specializing in Flutter, Next.js, and Vue.js. Building performant, user-friendly web and mobile applications.",
		url: siteUrl,
		siteName: siteName,
		locale: "en_US",
		alternateLocale: "mn_MN",
		type: "website",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Chinguun Vanchinsuren — Frontend Engineer",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteName,
		description:
			"Chinguun Vanchinsuren — Frontend Engineer specializing in Flutter, Next.js, and Vue.js.",
		images: ["/og-image.png"],
		creator: "@chinguunv",
	},
	alternates: {
		canonical: siteUrl,
		languages: {
			en: siteUrl,
			mn: siteUrl,
		},
	},
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/icon.svg", type: "image/svg+xml" },
		],
		apple: [{ url: "/apple-icon.png" }],
	},
};

/* JSON-LD: Person schema + WebSite schema */
const jsonLd = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			name: authorName,
			url: siteUrl,
			jobTitle: "Frontend Engineer",
			image: `${siteUrl}/og-image.png`,
			sameAs: [
				"https://github.com/chinguunv",
				"https://linkedin.com/in/chinguunv",
			],
			knowsAbout: [
				"Flutter",
				"Next.js",
				"React",
				"Vue.js",
				"TypeScript",
				"Tailwind CSS",
			],
		},
		{
			"@type": "WebSite",
			name: siteName,
			url: siteUrl,
			description:
				"Portfolio of Chinguun Vanchinsuren — Frontend Engineer specializing in Flutter, Next.js, and Vue.js.",
			inLanguage: ["en", "mn"],
		},
	],
};

/* Inline scripts to prevent flash before React hydration */
const darkModeScript = `
  (function() {
    try {
      var theme = localStorage.getItem('theme');
      var dark = theme === 'dark' || (theme === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
      if (dark) document.documentElement.classList.add('dark');
      else document.documentElement.classList.remove('dark');
    } catch(e) {}
  })();
`;

/* Set locale cookie and lang attr before hydration so server + client match */
const localeScript = `
  (function() {
    try {
      var locale = localStorage.getItem('locale');
      if (locale === 'en' || locale === 'mn') {
        document.cookie = 'locale=' + locale + ';path=/;max-age=31536000';
        document.documentElement.lang = locale;
      }
    } catch(e) {}
  })();
`;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
			suppressHydrationWarning
		>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<script dangerouslySetInnerHTML={{ __html: darkModeScript }} />
				<script dangerouslySetInnerHTML={{ __html: localeScript }} />
			</head>
			<body className="min-h-full flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-250">
				<Providers>
					<Header />
					<main className="flex-1 pt-14">{children}</main>
					<Footer />
				</Providers>
				<SpeedInsights />
			</body>
		</html>
	);
}
