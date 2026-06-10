"use client";

import { motion, LayoutGroup } from "framer-motion";
import type { ReactNode } from "react";

/* ──────────────────────────────────────────
   Tabs
   Horizontal tab bar with animated underline indicator
   ────────────────────────────────────────── */
interface Tab {
	value: string;
	label: ReactNode;
}

interface TabsProps {
	tabs: Tab[];
	active: string;
	onChange: (value: string) => void;
	className?: string;
}

export function Tabs({ tabs, active, onChange, className = "" }: TabsProps) {
	return (
		<LayoutGroup id="tabs">
			<div
				className={`flex flex-wrap gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800 ${className}`}
				role="tablist"
			>
				{tabs.map((tab) => {
					const isActive = tab.value === active;
					return (
						<button
							key={tab.value}
							role="tab"
							aria-selected={isActive}
							onClick={() => onChange(tab.value)}
							className={`
                relative rounded-md px-4 py-1.5 text-sm font-medium
                transition-colors duration-150
                ${isActive ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"}
              `}
						>
							{isActive && (
								<motion.span
									layoutId="active-tab"
									className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-neutral-700"
									transition={{ type: "spring", stiffness: 380, damping: 30 }}
								/>
							)}
							<span className="relative z-10">{tab.label}</span>
						</button>
					);
				})}
			</div>
		</LayoutGroup>
	);
}
