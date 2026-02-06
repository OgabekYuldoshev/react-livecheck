import { LanguageSwitcher } from "@/components/docs/LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Navbar({ className }: { className?: string }) {
	return (
		<header
			className={cn(
				"sticky top-0 z-40 w-full border-b border-border/50 bg-background/80 backdrop-blur-sm",
				className,
			)}
		>
			<div className="flex h-12 items-center justify-between px-4 md:px-6">
				<a
					href="#intro"
					className="text-sm font-medium text-foreground hover:text-foreground/80"
				>
					react-livecheck
				</a>
				<LanguageSwitcher />
			</div>
		</header>
	);
}
