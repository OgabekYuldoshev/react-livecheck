import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslation } from "@/hooks/useTranslation";
import { cn } from "@/lib/utils";
import type { SectionId } from "@/sections";
import { sections } from "@/sections";

export function Sidebar({ className }: { className?: string }) {
	const { t } = useTranslation();
	const [activeId, setActiveId] = useState<SectionId>("intro");

	useEffect(() => {
		const ids: SectionId[] = sections.map((s) => s.id);
		const observer = new IntersectionObserver(
			(entries) => {
				for (const e of entries) {
					if (!e.isIntersecting) continue;
					const id = e.target.id as SectionId;
					if (ids.includes(id)) setActiveId(id);
				}
			},
			{ rootMargin: "-80px 0px -70% 0px", threshold: 0 },
		);
		for (const id of ids) {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	}, []);

	return (
		<aside
			className={cn(
				"hidden w-44 shrink-0 border-r border-border/50 bg-background/50 md:block",
				className,
			)}
		>
			<ScrollArea className="h-[calc(100vh-3rem)]">
				<nav className="flex flex-col gap-0.5 p-3">
					{sections.map(({ id, labelKey }) => (
						<a
							key={id}
							href={`#${id}`}
							className={cn(
								"rounded px-2.5 py-1.5 text-[13px] transition-colors",
								activeId === id
									? "bg-muted/80 text-foreground font-medium"
									: "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
							)}
						>
							{t(labelKey)}
						</a>
					))}
				</nav>
			</ScrollArea>
		</aside>
	);
}
