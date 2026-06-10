import type { Project } from "@/lib/projects";

export const projects: Project[] = [
	{
		slug: "i-clinic",
		title: "И Клиник",
		description:
			"A comprehensive medical clinic management system with mobile and web platforms for patient registration, appointments, and electronic health records.",
		longDescription:
			"И Клиник is a full-featured clinic management platform that digitizes patient records, appointment scheduling, and medical documentation. Built with Flutter for the mobile patient app and Vue.js for the admin dashboard.",
		category: "fullstack",
		technologies: ["Flutter", "Vue.js", "TypeScript", "Node.js"],
		features: [
			"Patient registration and management",
			"Appointment scheduling system",
			"Electronic health records",
			"Multi-platform (Mobile + Web Admin)",
		],
		featured: true,
	},
	{
		slug: "portfolio",
		title: "Personal Portfolio",
		description:
			"Modern developer portfolio built with Next.js, Tailwind CSS, and Framer Motion with bilingual (English/Mongolian) support.",
		longDescription:
			"A bilingual developer portfolio showcasing projects and skills. Features dark/light theme, smooth page transitions, project filtering, and full English/Mongolian i18n support.",
		category: "web",
		technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
		features: [
			"Bilingual support (EN/MN)",
			"Responsive design",
			"Dark/light theme",
			"Page transitions & animations",
		],
		liveUrl: "https://portfolio-sepia-theta-70.vercel.app",
		featured: true,
	},
	{
		slug: "i-clinic-admin",
		title: "И Клиник Admin Panel",
		description:
			"Administrative web interface for the И Клиник system with dashboards, reporting, and user management.",
		longDescription:
			"A comprehensive admin panel for managing clinic operations, users, and generating reports. Built with Vue.js and TypeScript with role-based access control.",
		category: "web",
		technologies: ["Vue.js", "TypeScript", "Vuex", "SCSS"],
		features: [
			"Dashboard with analytics",
			"User management",
			"Report generation",
			"Role-based access control",
		],
		featured: true,
	},
];
