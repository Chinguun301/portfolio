import type { Variants } from "framer-motion";

// ── Existing Variants (preserved) ──

export const fadeIn: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const fadeInUp: Variants = {
	hidden: { opacity: 0, y: 40 },
	visible: (i = 0) => ({
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, delay: i * 0.1 },
	}),
};

export const staggerContainer: Variants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.1, delayChildren: 0.2 },
	},
};

export const scaleIn: Variants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

// ── Hero Entrance (spring-based stagger) ──

/** Parent container for spring-based hero text entrance */
export const heroReveal: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.12,
			delayChildren: 0.1,
		},
	},
};

/** Individual hero item with spring physics */
export const heroItem: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 80,
			damping: 20,
			mass: 0.8,
		},
	},
};

// ── Card & Button Hover/Tap ──

/** Spring hover/tap effects for cards */
export const cardHover = {
	whileHover: {
		y: -6,
		scale: 1.02,
		boxShadow: "0 12px 40px rgba(0,0,0,0.12)",
		transition: {
			type: "spring" as const,
			stiffness: 300,
			damping: 20,
			mass: 0.9,
		},
	},
	whileTap: {
		scale: 0.98,
		transition: {
			type: "spring" as const,
			stiffness: 400,
			damping: 25,
		},
	},
};

/** Subtle spring hover/tap for buttons */
export const buttonHover = {
	whileHover: {
		scale: 1.02,
		transition: {
			type: "spring" as const,
			stiffness: 400,
			damping: 15,
		},
	},
	whileTap: {
		scale: 0.98,
		transition: {
			type: "spring" as const,
			stiffness: 500,
			damping: 20,
		},
	},
};

/** Badge hover spring */
export const badgeHover = {
	whileHover: {
		scale: 1.08,
		transition: {
			type: "spring" as const,
			stiffness: 400,
			damping: 12,
		},
	},
	whileTap: {
		scale: 0.95,
		transition: {
			type: "spring" as const,
			stiffness: 500,
			damping: 15,
		},
	},
};

// ── List & Stagger ──

/** Stagger children with spring physics for lists */
export const listStagger: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.08,
			delayChildren: 0.15,
		},
	},
};

/** Spring list item entrance */
export const listItem: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 100,
			damping: 15,
		},
	},
};

// ── Timeline ──

/** Timeline item slide-in (alternating sides via custom direction) */
export const timelineItem: Variants = {
	hidden: (direction: "left" | "right" = "left") => ({
		opacity: 0,
		x: direction === "left" ? -30 : 30,
	}),
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			type: "spring",
			stiffness: 100,
			damping: 20,
			mass: 1,
		},
	},
};

// ── Scroll-triggered ──

/** Scale + fade on scroll */
export const scaleOnScroll: Variants = {
	hidden: { opacity: 0, scale: 0.92 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.6,
			ease: [0.16, 1, 0.3, 1],
		},
	},
};

// ── Slide variants ──

/** Slide up from bottom with spring */
export const slideUp: Variants = {
	hidden: { opacity: 0, y: 60 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			type: "spring",
			stiffness: 70,
			damping: 20,
		},
	},
};

/** Slide in from left */
export const slideInLeft: Variants = {
	hidden: { opacity: 0, x: -40 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			type: "spring",
			stiffness: 80,
			damping: 18,
		},
	},
};

/** Slide in from right */
export const slideInRight: Variants = {
	hidden: { opacity: 0, x: 40 },
	visible: {
		opacity: 1,
		x: 0,
		transition: {
			type: "spring",
			stiffness: 80,
			damping: 18,
		},
	},
};

// ── Badge stagger ──

/** Stagger container for badge groups */
export const badgeStagger: Variants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.05,
			delayChildren: 0.2,
		},
	},
};

/** Single badge spring entrance */
export const badgeItem: Variants = {
	hidden: { opacity: 0, scale: 0.5 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			type: "spring",
			stiffness: 250,
			damping: 15,
		},
	},
};

// ── Progress bar ──

/** Animated progress bar fill */
export const progressFill = (width: number) => ({
	initial: { width: 0 },
	whileInView: {
		width: `${width}%`,
		transition: {
			duration: 1.2,
			delay: 0.2,
			ease: [0.16, 1, 0.3, 1],
		},
	},
});
