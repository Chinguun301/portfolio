import type { Metadata } from "next";
import ContactContent from "./_components/contact-content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chinguun.com";

export const metadata: Metadata = {
	title: "Contact",
	description:
		"Get in touch with Chinguun Vanchinsuren — Frontend Engineer. Reach out for collaboration, freelance work, or just to say hi.",
	openGraph: {
		title: "Contact — Chinguun Vanchinsuren",
		description:
			"Get in touch with Chinguun Vanchinsuren — Frontend Engineer. Reach out for collaboration, freelance work, or just to say hi.",
		url: `${siteUrl}/contact`,
		images: [
			{
				url: `${siteUrl}/og-image.png`,
				width: 1200,
				height: 630,
				alt: "Contact — Chinguun Vanchinsuren",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Contact — Chinguun Vanchinsuren",
		description: "Get in touch with Chinguun Vanchinsuren — Frontend Engineer.",
		images: [`${siteUrl}/og-image.png`],
	},
};

export default function ContactPage() {
	return <ContactContent />;
}
