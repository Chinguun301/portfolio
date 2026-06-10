export type ProjectCategory =
	| "mobile"
	| "web"
	| "fullstack"
	| "ui-ux"
	| "other";

export interface Project {
	slug: string;
	title: string;
	description: string;
	longDescription?: string;
	category: ProjectCategory;
	technologies: string[];
	features?: string[];
	image?: string;
	liveUrl?: string;
	githubUrl?: string;
	featured?: boolean;
}

export const projectCategories: {
	value: ProjectCategory | "all";
	labelEn: string;
	labelMn: string;
}[] = [
	{ value: "all", labelEn: "All", labelMn: "Бүгд" },
	{ value: "mobile", labelEn: "Mobile", labelMn: "Мобайл" },
	{ value: "web", labelEn: "Web", labelMn: "Веб" },
	{ value: "fullstack", labelEn: "Full Stack", labelMn: "Бүрэн Стэк" },
	{ value: "ui-ux", labelEn: "UI/UX", labelMn: "UI/UX" },
];
