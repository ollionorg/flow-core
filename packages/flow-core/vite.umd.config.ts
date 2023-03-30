import { defineConfig } from "vite";
import litcss from "rollup-plugin-postcss-lit";
import path from "path";

export default defineConfig({
	build: {
		sourcemap: true,
		lib: {
			entry: "src/index.ts",
			name: "flow-elements",
			fileName: format => `flow-core.${format}.js`,
			formats: ["umd"]
		},
		outDir: "umd"
	},

	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./src/index.ts")
		}
	},
	plugins: [litcss()]
});
