import ApiReference from "@/pages/ApiReference";
import ComponentsUseLiveness from "@/pages/ComponentsUseLiveness";
import Configuration from "@/pages/Configuration";
import Examples from "@/pages/Examples";
import Faq from "@/pages/Faq";
import Installation from "@/pages/Installation";
import Introduction from "@/pages/Introduction";
import QuickStart from "@/pages/QuickStart";
import Usage from "@/pages/Usage";
import { sections } from "@/sections";

const sectionComponents = {
	intro: Introduction,
	installation: Installation,
	"quick-start": QuickStart,
	usage: Usage,
	"api-reference": ApiReference,
	components: ComponentsUseLiveness,
	examples: Examples,
	configuration: Configuration,
	faq: Faq,
} as const;

export default function DocPage() {
	return (
		<main className="min-h-screen">
			{sections.map(({ id }) => {
				const Component = sectionComponents[id];
				return (
					<section
						key={id}
						id={id}
						className="scroll-mt-20 border-b border-border/50 py-14 last:border-b-0"
					>
						<div className="max-w-2xl">
							<Component />
						</div>
					</section>
				);
			})}
		</main>
	);
}
