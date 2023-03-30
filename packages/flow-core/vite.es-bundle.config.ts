import { defineConfig } from "vite";
import litcss from "rollup-plugin-postcss-lit";
import path from "path";

/**
 * Es build with no externals , to consume through CDN in static html files.
 */
export default defineConfig({
	build: {
		sourcemap: true,
		lib: {
			entry: "src/index.ts",
			name: "flow-elements",
			fileName: format => `flow-core.${format}.js`,
			formats: ["es"]
		},
		outDir: "es-bundle"
	},

	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./src/index.ts")
		}
	},
	plugins: [litcss()]
});
