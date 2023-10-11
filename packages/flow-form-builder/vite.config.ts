import { defineConfig } from "vite";

export default defineConfig({
	build: {
		// Disabling minification makes it easy to debug during development
		// And all modern bundlers will consume the library and minify it anyway
		minify: false,
		sourcemap: true,
		lib: {
			entry: "src/index.ts",
			name: "flow-form-builder",
			fileName: format => `flow-form-builder.${format}.js`,
			formats: ["es", "cjs"]
		},
		rollupOptions: {
			external: ["@cldcvr/flow-core-config", "@cldcvr/flow-core", /^lit/, "rxjs", "lodash-es"],
			output: {
				globals: {
					"@cldcvr/flow-core": "@cldcvr/flow-core"
				}
			}
		}
	}
});
