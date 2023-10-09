import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	build: {
		sourcemap: true,
		lib: {
			entry: "src/index.ts",
			name: "flow-lineage",
			fileName: format => `flow-lineage.${format}.js`,
			formats: ["es", "cjs"]
		},
		// outDir: "dist",
		rollupOptions: {
			external: ["@cldcvr/flow-core-config", "@cldcvr/flow-core", /^lit/],
			output: {
				globals: {
					"@cldcvr/flow-core": "@cldcvr/flow-core"
				}
			}
		}
	},
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./src/index.ts")
		}
	}
});
