import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	turbopack: {
		root: process.cwd(),
	},

	// Image optimization configuration
	images: {
		formats: ["image/avif", "image/webp"],
		deviceSizes: [640, 768, 1024, 1280, 1536],
		minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
		remotePatterns: [
			{
				protocol: "https",
				hostname: "**.vercel.app",
			},
		],
	},

	// Security and SEO headers
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "X-Content-Type-Options",
						value: "nosniff",
					},
					{
						key: "X-Frame-Options",
						value: "DENY",
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block",
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin",
					},
				],
			},
			{
				source: "/fonts/(.*)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable",
					},
				],
			},
			{
				source: "/images/(.*)",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=86400, stale-while-revalidate=604800",
					},
				],
			},
		];
	},
};

export default nextConfig;
