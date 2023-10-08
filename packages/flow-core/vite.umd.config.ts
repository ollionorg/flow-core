import { defineConfig } from "vite";
import path from "path";

/**
 * UMD build with no externals , to consume through CDN in static html files.
 */
export default defineConfig({
	build: {
		sourcemap: true,
		lib: {
			entry: "src/index.ts",
			name: "flowCore",
			fileName: format => `flow-core.${format}.js`,
			formats: ["umd"]
		},
		outDir: "umd"
	},

	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./src/index.ts"),
			"@cldcvr/flow-core-config": path.resolve(__dirname, "../flow-core-config/src/index.ts")
		}
	}
});
