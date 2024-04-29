import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import terser from "@rollup/plugin-terser";

export default defineConfig({
	plugins: [
		visualizer({
			gzipSize: true
		})
	],
	build: {
		// Disabling minification makes it easy to debug during development
		// And all modern bundlers will consume the library and minify it anyway
		minify: true,
		sourcemap: true,
		lib: {
			entry: "src/index.ts",
			name: "flow-elements",
			fileName: format => `flow-core.${format}.js`,
			formats: ["es", "cjs"]
		},
		rollupOptions: {
			// If we want to publish standalone components we don't externalize lit,
			// if you are going to use lit in your own project, you can make it a dep instead.
			// external: /^lit/, <-- comment this line
			external: [
				"axios",
				"emoji-mart",
				"lodash-es",
				/^lit/,
				"rxjs",
				"@ollion/flow-core-config",
				"vanilla-colorful",
				"mark.js",
				"@emoji-mart/data",
				"@lit-labs/virtualizer",
				"flatpickr",
				"@floating-ui/dom"
			],
			plugins: [terser()]
		}
	}
});
