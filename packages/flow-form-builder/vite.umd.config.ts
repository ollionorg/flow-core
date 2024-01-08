import { defineConfig } from "vite";

export default defineConfig({
	build: {
		lib: {
			entry: "src/index.ts",
			name: "flowFormBuilder",
			fileName: format => `flow-form-builder.${format}.js`,
			formats: ["umd"]
		},
		outDir: "umd",
		rollupOptions: {
			external: ["@ollion/flow-core-config", "@ollion/flow-core"],
			output: {
				globals: {
					"@ollion/flow-core": "flowCore"
				}
			}
		}
	}
});
