import { defineConfig } from "vite";

export default defineConfig({
	build: {
		// Disabling minification makes it easy to debug during development
		// And all modern bundlers will consume the library and minify it anyway
		minify: false,
		sourcemap: true,
		lib: {
			entry: "src/index.ts",
			name: "flow-log",
			fileName: format => `flow-log.${format}.js`,
			formats: ["es"]
		},
		rollupOptions: {
			// If we want to publish standalone components we don't externalize lit,
			// if you are going to use lit in your own project, you can make it a dep instead.
			// external: /^lit/, <-- comment this line
			external: ["@nonfx/flow-core-config", "@nonfx/flow-core", /^lit/, "mark.js"],
			output: {
				globals: {
					"@nonfx/flow-core": "@nonfx/flow-core"
				}
			}
		}
	}
});
