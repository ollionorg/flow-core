import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
	build: {
		sourcemap: true,
		lib: {
			entry: "src/index.ts",
			name: "flow-form-builder",
			fileName: format => `flow-form-builder.${format}.js`,
			formats: ["es", "cjs"]
		},
		// outDir: "dist",
		rollupOptions: {
			external: ["@cldcvr/flow-core", /^lit/, "rxjs", "lodash-es"],
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
