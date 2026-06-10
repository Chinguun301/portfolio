import type { Metadata } from "next";
import ProjectsContent from "./_components/projects-content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chinguun.com";

export const metadata: Metadata = {
	title: "Projects",
	description:
		"Explore projects by Chinguun Vanchinsuren — mobile apps, web applications, and full-stack solutions built with Flutter, Next.js, Vue.js, and more.",
	openGraph: {
		title: "Projects — Chinguun Vanchinsuren",
		description:
			"Explore projects by Chinguun Vanchinsuren — mobile apps, web applications, and full-stack solutions.",
		url: `${siteUrl}/projects`,
		images: [
			{
				url: `${siteUrl}/og-image.png`,
				width: 1200,
				height: 630,
				alt: "Projects — Chinguun Vanchinsuren",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Projects — Chinguun Vanchinsuren",
		description:
			"Explore projects by Chinguun Vanchinsuren — mobile apps, web applications, and full-stack solutions.",
		images: [`${siteUrl}/og-image.png`],
	},
};

export default function ProjectsPage() {
	return <ProjectsContent />;
}
