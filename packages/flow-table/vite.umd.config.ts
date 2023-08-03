import { defineConfig } from "vite";
import litcss from "rollup-plugin-postcss-lit";
import path from "path";

/**
 * UMD build with no externals , to consume through CDN in static html files.
 */
export default defineConfig({
	build: {
		sourcemap: true,
		lib: {
			entry: "src/index.ts",
			name: "flowTable",
			fileName: format => `flow-table.${format}.js`,
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
