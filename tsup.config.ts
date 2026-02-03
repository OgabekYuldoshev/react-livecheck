import { defineConfig } from "tsup";

export default defineConfig({
	entry: ["src/main.ts"],
	bundle: true,
	clean: true,
	format: ["cjs", "esm"],
	minify: true,
	dts: true,
	outDir: "dist",
	splitting: false,
	external: ["react", "react/jsx-runtime"],
	esbuildOptions(options) {
		options.jsx = "automatic";
	},
	sourcemap: true,
	treeshake: true,
});
