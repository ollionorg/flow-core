import { defineConfig } from "vite";

/**
 * UMD build with no externals , to consume through CDN in static html files.
 */
export default defineConfig({
	build: {
		sourcemap: true,
		lib: {
			entry: "src/index.ts",
			name: "flowDashboard",
			fileName: format => `flow-dashboard.${format}.js`,
			formats: ["umd"]
		},
		outDir: "umd"
	}
});
