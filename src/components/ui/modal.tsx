"use client";

import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";

/* ──────────────────────────────────────────
   Modal / Dialog
   Overlay with backdrop blur and scale-in animation
   ────────────────────────────────────────── */
interface ModalProps {
	open: boolean;
	onClose: () => void;
	children: ReactNode;
	title?: string;
	className?: string;
}

const overlayVariants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1 },
} as const;

const panelVariants = {
	hidden: { opacity: 0, scale: 0.95, y: 10 },
	visible: {
		opacity: 1,
		scale: 1,
		y: 0,
		transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
	},
	exit: {
		opacity: 0,
		scale: 0.95,
		y: 10,
		transition: { duration: 0.15, ease: "easeIn" },
	},
} as const;

export function Modal({
	open,
	onClose,
	children,
	title,
	className = "",
}: ModalProps) {
	/* Close on Escape key */
	const handleKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		},
		[onClose],
	);

	useEffect(() => {
		if (open) {
			document.addEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "hidden";
		}
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [open, handleKeyDown]);

	return (
		<AnimatePresence>
			{open && (
				<div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
					{/* Overlay */}
					<motion.div
						key="modal-overlay"
						variants={overlayVariants}
						initial="hidden"
						animate="visible"
						exit="hidden"
						transition={{ duration: 0.15 }}
						className="absolute inset-0 bg-black/50 backdrop-blur-sm"
						onClick={onClose}
						aria-hidden="true"
					/>

					{/* Panel */}
					<motion.div
						key="modal-panel"
						variants={panelVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						role="dialog"
						aria-modal="true"
						aria-label={title}
						className={`
              relative z-10 w-full max-w-lg rounded-xl border
              border-neutral-200 bg-white p-6 shadow-lg
              dark:border-neutral-800 dark:bg-neutral-900
              ${className}
            `}
					>
						{/* Close button */}
						{title && (
							<div className="mb-4 flex items-center justify-between">
								<h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
									{title}
								</h3>
								<button
									onClick={onClose}
									className="rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300 transition-colors"
									aria-label="Close"
								>
									<svg
										width="20"
										height="20"
										viewBox="0 0 20 20"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
									>
										<path d="M5 5l10 10M15 5l-10 10" />
									</svg>
								</button>
							</div>
						)}
						{!title && (
							<button
								onClick={onClose}
								className="absolute right-4 top-4 rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 dark:hover:text-neutral-300 transition-colors"
								aria-label="Close"
							>
								<svg
									width="20"
									height="20"
									viewBox="0 0 20 20"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
								>
									<path d="M5 5l10 10M15 5l-10 10" />
								</svg>
							</button>
						)}
						{children}
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
