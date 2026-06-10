import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectDetailContent } from "@/components/sections/project-detail-content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chinguun.com";
const authorName = "Chinguun Vanchinsuren";

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({
	params,
}: {
	params: { slug: string };
}): Metadata {
	const project = projects.find((p) => p.slug === params.slug);

	if (!project) {
		return {
			title: "Project Not Found",
		};
	}

	return {
		title: project.title,
		description: project.description,
		openGraph: {
			title: `${project.title} — Chinguun Vanchinsuren`,
			description: project.description,
			url: `${siteUrl}/projects/${project.slug}`,
			type: "article",
			images: [
				{
					url: `${siteUrl}/og-image.png`,
					width: 1200,
					height: 630,
					alt: project.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: `${project.title} — Chinguun Vanchinsuren`,
			description: project.description,
			images: [`${siteUrl}/og-image.png`],
		},
	};
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
	const project = projects.find((p) => p.slug === params.slug);

	if (!project) {
		notFound();
	}

	const projectJsonLd = {
		"@context": "https://schema.org",
		"@type": "Article",
		name: project.title,
		description: project.description,
		author: {
			"@type": "Person",
			name: authorName,
		},
		headline: project.title,
		datePublished: "2024-01-01",
		keywords: project.technologies.join(", "),
	};

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
			/>
			<ProjectDetailContent project={project} />
		</>
	);
}
