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
			external: ["@nonfx/flow-core-config", "@nonfx/flow-core"],
			output: {
				globals: {
					"@nonfx/flow-core": "flowCore"
				}
			}
		}
	}
});
