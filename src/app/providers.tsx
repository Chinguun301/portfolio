"use client";

import { Analytics } from "@vercel/analytics/react";
import { I18nProvider } from "@/lib/i18n/provider";
import { PageTransition } from "@/components/animations/page-transition";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
	return (
		<I18nProvider>
			<PageTransition>{children}</PageTransition>
			<Analytics />
		</I18nProvider>
	);
}
