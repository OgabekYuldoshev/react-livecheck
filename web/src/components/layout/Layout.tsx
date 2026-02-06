import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTranslation } from "@/hooks/useTranslation";
import { sections } from "@/sections";
import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

function MobileNav() {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button variant="ghost" size="icon" className="md:hidden size-8">
					<MenuIcon className="size-4" />
					<span className="sr-only">Open menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-52 p-0">
				<ScrollArea className="h-full">
					<nav className="flex flex-col gap-0.5 p-3">
						{sections.map(({ id, labelKey }) => (
							<a
								key={id}
								href={`#${id}`}
								onClick={() => setOpen(false)}
								className="rounded px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground"
							>
								{t(labelKey)}
							</a>
						))}
					</nav>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
}

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="min-h-screen flex flex-col bg-background">
			<Navbar />
			<div className="flex flex-1">
				<Sidebar />
				<div className="flex-1 overflow-auto">
					<div className="flex items-center gap-2 md:hidden px-4 pt-3 pb-2">
						<MobileNav />
					</div>
					<div className="px-4 pb-16 md:px-8 lg:px-12">{children}</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}
