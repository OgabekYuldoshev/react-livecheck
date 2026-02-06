import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
	return (
		<footer
			className={cn(
				"border-t border-border/50 py-5 text-center text-xs text-muted-foreground",
				className,
			)}
		>
			<a
				href="https://github.com/OgabekYuldoshev/react-livecheck"
				target="_blank"
				rel="noopener noreferrer"
				className="hover:text-foreground underline underline-offset-2"
			>
				GitHub
			</a>
			<span className="mx-1.5">·</span>
			<span>MIT</span>
		</footer>
	);
}
