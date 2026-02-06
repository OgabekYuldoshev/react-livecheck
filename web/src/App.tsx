import { Github, ScanFace } from "lucide-react";
import { LanguageSwitcher } from "@/components/docs/language-switcher";
import Landing from "@/pages/landing";

function TopBar() {
	return (
		<header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
			<div className="flex h-14 items-center justify-between px-4 md:px-8">
				<a href="/" className="flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-80 transition-opacity">
					<ScanFace className="size-7 shrink-0 md:size-8" strokeWidth={1.5} />
					react-livecheck
				</a>
				<div className="flex items-center gap-4">
					<a
						href="https://github.com/OgabekYuldoshev/react-livecheck"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						<Github className="size-4" />
						GitHub
					</a>
					<LanguageSwitcher />
				</div>
			</div>
		</header>
	);
}

export function App() {
	return (
		<div className="min-h-screen bg-background">
			<TopBar />
			<Landing />
		</div>
	);
}
