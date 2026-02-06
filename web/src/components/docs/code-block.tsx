import { Highlight, themes, type Language } from "prism-react-renderer";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
	code: string;
	language: Language;
	className?: string;
}

export function CodeBlock({ code, language, className }: CodeBlockProps) {
	return (
		<Highlight theme={themes.vsDark} code={code.trim()} language={language}>
			{({ className: preClassName, style, tokens, getLineProps, getTokenProps }) => (
				<pre
					className={cn(preClassName, "overflow-x-auto p-4 text-sm", className)}
					style={style}
				>
					<code>
						{tokens.map((line, i) => (
							<div key={i} {...getLineProps({ line, key: i })}>
								{line.map((token, key) => (
									<span key={key} {...getTokenProps({ token, key })} />
								))}
							</div>
						))}
					</code>
				</pre>
			)}
		</Highlight>
	);
}
