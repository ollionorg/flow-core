import { defineConfig } from "vite";

export default defineConfig({
	build: {
		// Disabling minification makes it easy to debug during development
		// And all modern bundlers will consume the library and minify it anyway
		minify: false,
		sourcemap: true,
		lib: {
			entry: "src/index.ts",
			name: "flow-lineage",
			fileName: format => `flow-lineage.${format}.js`,
			formats: ["es", "cjs"]
		},
		rollupOptions: {
			external: ["@ollion/flow-core-config", "@ollion/flow-core", /^lit/],
			output: {
				globals: {
					"@ollion/flow-core": "@ollion/flow-core"
				}
			}
		}
	}
});
