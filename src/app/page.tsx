import type { Metadata } from "next";
import HomeContent from "./_components/home-content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chinguun.com";

export const metadata: Metadata = {
	title: "Chinguun Vanchinsuren — Frontend Engineer",
	description:
		"Portfolio of Chinguun Vanchinsuren — Frontend Engineer specializing in Flutter, Next.js, and Vue.js. Building performant, user-friendly web and mobile applications.",
	openGraph: {
		title: "Chinguun Vanchinsuren — Frontend Engineer",
		description:
			"Portfolio of Chinguun Vanchinsuren — Frontend Engineer specializing in Flutter, Next.js, and Vue.js.",
		url: siteUrl,
		images: [
			{
				url: `${siteUrl}/og-image.png`,
				width: 1200,
				height: 630,
				alt: "Chinguun Vanchinsuren — Frontend Engineer",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Chinguun Vanchinsuren — Frontend Engineer",
		description:
			"Portfolio of Chinguun Vanchinsuren — Frontend Engineer specializing in Flutter, Next.js, and Vue.js.",
		images: [`${siteUrl}/og-image.png`],
	},
};

export default function HomePage() {
	return <HomeContent />;
}
