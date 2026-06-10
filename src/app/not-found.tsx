import type { Metadata } from "next";
import NotFoundContent from "./_components/not-found-content";

export const metadata: Metadata = {
	title: "404 — Page Not Found",
	description: "The page you are looking for does not exist.",
	robots: {
		index: false,
		follow: true,
	},
};

export default function NotFoundPage() {
	return <NotFoundContent />;
}
