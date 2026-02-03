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
  
});
