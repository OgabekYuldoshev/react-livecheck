import { Highlight, themes } from "prism-react-renderer";
import Prism from "prismjs";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-bash";
import { cn } from "@/lib/utils";

// Register tsx as alias for jsx (TypeScript + JSX)
if (!Prism.languages.tsx) {
	Prism.languages.tsx = Prism.languages.extend("jsx", Prism.languages.typescript ?? {});
}

export function CodeBlock({
	code,
	language = "tsx",
	className,
}: {
	code: string;
	language?: "tsx" | "bash" | "typescript";
	className?: string;
}) {
	return (
		<div className={cn("overflow-x-auto rounded-md border border-border/50 bg-muted/20 px-3 py-2.5 text-[13px]", className)}>
			<Highlight theme={themes.vsDark} code={code.trim()} language={language}>
				{({ className: innerClassName, style, tokens, getLineProps, getTokenProps }) => (
					<pre className={cn(innerClassName, "m-0 overflow-x-auto p-0")} style={style}>
						<code className={cn("font-mono text-sm")}>
							{tokens.map((line, i) => (
								<div key={`line-${i}`} {...getLineProps({ line })}>
									{line.map((token, k) => (
										<span key={`${i}-${k}`} {...getTokenProps({ token })} />
									))}
								</div>
							))}
						</code>
					</pre>
				)}
			</Highlight>
		</div>
	);
}
