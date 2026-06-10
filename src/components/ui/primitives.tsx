"use client";

import { motion } from "framer-motion";
import type {
	ReactNode,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
	ButtonHTMLAttributes,
} from "react";

/* ──────────────────────────────────────────
   Section
   Max-w-5xl centered container
   ────────────────────────────────────────── */
export function Section({
	children,
	className = "",
	id,
}: {
	children: ReactNode;
	className?: string;
	id?: string;
}) {
	return (
		<section
			id={id}
			className={`mx-auto max-w-5xl px-4 py-16 sm:py-24 ${className}`}
		>
			{children}
		</section>
	);
}

/* ──────────────────────────────────────────
   SectionTitle
   Animated heading + subtitle with accent line
   ────────────────────────────────────────── */
export function SectionTitle({
	children,
	subtitle,
	className = "",
}: {
	children: ReactNode;
	subtitle?: string;
	className?: string;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-100px" }}
			transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
			className={`mb-12 ${className}`}
		>
			<div className="mb-4 h-1 w-12 rounded-full bg-accent-500" />
			<h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
				{children}
			</h2>
			{subtitle && (
				<p className="mt-2 max-w-2xl text-lg text-neutral-500 dark:text-neutral-400">
					{subtitle}
				</p>
			)}
		</motion.div>
	);
}

/* ──────────────────────────────────────────
   Button
   Variants: primary | secondary | outline | ghost
   Uses motion.button for spring-based hover/tap
   ────────────────────────────────────────── */
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

const buttonVariants: Record<ButtonVariant, string> = {
	primary:
		"bg-neutral-900 text-white hover:bg-neutral-700 active:bg-neutral-800 " +
		"dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300 dark:active:bg-neutral-400",
	secondary:
		"bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300 " +
		"dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:active:bg-neutral-600",
	outline:
		"border border-neutral-300 text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 " +
		"dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700",
	ghost:
		"text-neutral-700 hover:bg-neutral-100 active:bg-neutral-200 " +
		"dark:text-neutral-400 dark:hover:bg-neutral-800 dark:active:bg-neutral-700",
};

const buttonSizes = {
	sm: "px-3 py-1.5 text-xs",
	md: "px-4 py-2 text-sm",
	lg: "px-6 py-3 text-base",
};

interface ButtonProps
	extends Omit<
		ButtonHTMLAttributes<HTMLButtonElement>,
		| "onDrag"
		| "onDragEnd"
		| "onDragStart"
		| "onAnimationStart"
		| "onAnimationEnd"
		| "onAnimationIteration"
	> {
	variant?: ButtonVariant;
	size?: keyof typeof buttonSizes;
	icon?: ReactNode;
}

export function Button({
	children,
	variant = "primary",
	size = "md",
	icon,
	className = "",
	...props
}: ButtonProps) {
	return (
		<motion.button
			whileHover={{
				scale: 1.02,
				transition: { type: "spring", stiffness: 400, damping: 15 },
			}}
			whileTap={{
				scale: 0.98,
				transition: { type: "spring", stiffness: 500, damping: 20 },
			}}
			className={`
        inline-flex items-center justify-center gap-2 rounded-lg font-medium
        transition-colors duration-150 cursor-pointer select-none
        ${buttonVariants[variant]}
        ${buttonSizes[size]}
        ${className}
      `}
			{...props}
		>
			{icon && <span className="shrink-0">{icon}</span>}
			{children}
		</motion.button>
	);
}

/* ──────────────────────────────────────────
   Card
   Variants: default | hover | featured
   Wrap with motion.div for spring lift on hover
   ────────────────────────────────────────── */
type CardVariant = "default" | "hover" | "featured";

const cardVariants: Record<CardVariant, string> = {
	default:
		"border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900",
	hover:
		"border border-neutral-200 bg-white transition-colors duration-250 hover:border-neutral-400 hover:shadow-md " +
		"dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-600",
	featured:
		"border border-accent-200 bg-accent-50/30 shadow-sm " +
		"dark:border-accent-800/50 dark:bg-accent-950/20",
};

interface CardProps {
	children: ReactNode;
	variant?: CardVariant;
	className?: string;
	onClick?: () => void;
	as?: "div" | "article" | "li";
}

export function Card({
	children,
	variant = "default",
	className = "",
	onClick,
	as: Tag = "div",
}: CardProps) {
	return (
		<motion.div
			whileHover={
				variant === "hover"
					? {
							y: -4,
							transition: { type: "spring", stiffness: 300, damping: 20 },
						}
					: undefined
			}
			style={variant === "hover" ? { willChange: "transform" } : undefined}
		>
			<Tag
				onClick={onClick}
				className={`
        rounded-lg p-6 block
        ${cardVariants[variant]}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
			>
				{children}
			</Tag>
		</motion.div>
	);
}

/* ──────────────────────────────────────────
   Badge
   For tech tags, categories, status indicators
   ────────────────────────────────────────── */
type BadgeVariant = "default" | "accent" | "success" | "warning" | "error";

const badgeVariants: Record<BadgeVariant, string> = {
	default:
		"bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300",
	accent:
		"bg-accent-100 text-accent-700 dark:bg-accent-900/50 dark:text-accent-300",
	success:
		"bg-success-100 text-success-700 dark:bg-success-900/50 dark:text-success-300",
	warning:
		"bg-warning-100 text-warning-700 dark:bg-warning-900/50 dark:text-warning-300",
	error: "bg-error-100 text-error-700 dark:bg-error-900/50 dark:text-error-300",
};

interface BadgeProps {
	children: ReactNode;
	variant?: BadgeVariant;
	className?: string;
	size?: "sm" | "md";
}

export function Badge({
	children,
	variant = "default",
	className = "",
	size = "sm",
}: BadgeProps) {
	return (
		<motion.span
			whileHover={{
				scale: 1.08,
				transition: { type: "spring", stiffness: 400, damping: 12 },
			}}
			whileTap={{
				scale: 0.95,
				transition: { type: "spring", stiffness: 500, damping: 15 },
			}}
			style={{ willChange: "transform" }}
			className={`
        inline-flex items-center rounded-full font-medium
        ${size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"}
        ${badgeVariants[variant]}
        ${className}
      `}
		>
			{children}
		</motion.span>
	);
}

/* ──────────────────────────────────────────
   Input
   Form input with validation styling
   ────────────────────────────────────────── */
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	label?: string;
}

export function Input({
	error,
	label,
	className = "",
	id,
	...props
}: InputProps) {
	const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

	return (
		<div className="space-y-1.5">
			{label && (
				<label
					htmlFor={inputId}
					className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
				>
					{label}
				</label>
			)}
			<input
				id={inputId}
				className={`
          block w-full rounded-lg border px-3 py-2 text-sm
          bg-white text-neutral-900 placeholder-neutral-400
          transition-colors duration-150
          ${
						error
							? "border-error-500 focus:border-error-500 focus:ring-error-500/30"
							: "border-neutral-300 focus:border-accent-500 dark:border-neutral-700"
					}
          focus:outline-none focus:ring-4
          dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder-neutral-500
          dark:focus:border-accent-400
          disabled:cursor-not-allowed disabled:opacity-50
          ${className}
        `}
				{...props}
			/>
			{error && <p className="text-xs text-error-500">{error}</p>}
		</div>
	);
}

/* ──────────────────────────────────────────
   Textarea
   Form textarea with validation styling
   ────────────────────────────────────────── */
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	error?: string;
	label?: string;
}

export function Textarea({
	error,
	label,
	className = "",
	id,
	...props
}: TextareaProps) {
	const textareaId = id || label?.toLowerCase().replace(/\s+/g, "-");

	return (
		<div className="space-y-1.5">
			{label && (
				<label
					htmlFor={textareaId}
					className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
				>
					{label}
				</label>
			)}
			<textarea
				id={textareaId}
				className={`
          block w-full rounded-lg border px-3 py-2 text-sm
          bg-white text-neutral-900 placeholder-neutral-400
          transition-colors duration-150 resize-y min-h-[100px]
          ${
						error
							? "border-error-500 focus:border-error-500 focus:ring-error-500/30"
							: "border-neutral-300 focus:border-accent-500 dark:border-neutral-700"
					}
          focus:outline-none focus:ring-4
          dark:bg-neutral-950 dark:text-neutral-100 dark:placeholder-neutral-500
          dark:focus:border-accent-400
          disabled:cursor-not-allowed disabled:opacity-50
          ${className}
        `}
				{...props}
			/>
			{error && <p className="text-xs text-error-500">{error}</p>}
		</div>
	);
}

/* ──────────────────────────────────────────
   Skeleton
   Loading placeholder with soft pulse animation
   ────────────────────────────────────────── */
interface SkeletonProps {
	className?: string;
	variant?: "text" | "circular" | "rectangular";
	width?: string | number;
	height?: string | number;
}

export function Skeleton({
	className = "",
	variant = "text",
	width,
	height,
}: SkeletonProps) {
	const base = "animate-pulse-soft bg-neutral-200 dark:bg-neutral-800";

	const shape =
		variant === "circular"
			? "rounded-full"
			: variant === "rectangular"
				? "rounded-lg"
				: "h-4 rounded-md";

	return (
		<div
			className={`${base} ${shape} ${className}`}
			style={{ width, height }}
			aria-hidden="true"
		/>
	);
}
