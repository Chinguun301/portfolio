import type { Metadata } from "next";
import AboutContent from "./_components/about-content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chinguun.com";

export const metadata: Metadata = {
	title: "About",
	description:
		"Learn about Chinguun Vanchinsuren — a Frontend Engineer with 2+ years of experience in Flutter, Next.js, Vue.js, and TypeScript.",
	openGraph: {
		title: "About — Chinguun Vanchinsuren",
		description:
			"Learn about Chinguun Vanchinsuren — a Frontend Engineer with 2+ years of experience in Flutter, Next.js, Vue.js, and TypeScript.",
		url: `${siteUrl}/about`,
		images: [
			{
				url: `${siteUrl}/og-image.png`,
				width: 1200,
				height: 630,
				alt: "About — Chinguun Vanchinsuren",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "About — Chinguun Vanchinsuren",
		description:
			"Learn about Chinguun Vanchinsuren — a Frontend Engineer with 2+ years of experience.",
		images: [`${siteUrl}/og-image.png`],
	},
};

export default function AboutPage() {
	return <AboutContent />;
}
