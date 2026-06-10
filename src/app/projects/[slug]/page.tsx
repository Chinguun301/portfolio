import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/content/projects";

export function generateStaticParams() {
	return projects.map((project) => ({ slug: project.slug }));
}

export default function ProjectPage({
	params,
}: {
	params: { slug: string };
}) {
	const project = projects.find((p) => p.slug === params.slug);

	if (!project) {
		notFound();
	}

	return (
		<article className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
			<Link
				href="/projects"
				className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
			>
				&larr; Back to Projects
			</Link>

			<h1 className="mt-8 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
				{project.title}
			</h1>

			<p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
				{project.longDescription || project.description}
			</p>

			<section className="mt-12">
				<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
					Tech Stack
				</h2>
				<div className="mt-3 flex flex-wrap gap-2">
					{project.technologies.map((tech) => (
						<span
							key={tech}
							className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
						>
							{tech}
						</span>
					))}
				</div>
			</section>

			{project.features && (
				<section className="mt-12">
					<h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
						Key Features
					</h2>
					<ul className="mt-3 space-y-2">
						{project.features.map((feature) => (
							<li
								key={feature}
								className="flex items-start gap-2 text-zinc-600 dark:text-zinc-400"
							>
								<span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
								{feature}
							</li>
						))}
					</ul>
				</section>
			)}

			<div className="mt-12 flex gap-4">
				{project.liveUrl && (
					<a
						href={project.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 transition-colors"
					>
						View Live →
					</a>
				)}
				{project.githubUrl && (
					<a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
					>
						View Source
					</a>
				)}
			</div>
		</article>
	);
}
