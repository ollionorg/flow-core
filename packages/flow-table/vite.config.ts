import { defineConfig } from "vite";
import litcss from "rollup-plugin-postcss-lit";
import path from "path";

export default defineConfig({
	build: {
		sourcemap: true,
		lib: {
			entry: "src/index.ts",
			name: "flow-table",
			fileName: format => `flow-table.${format}.js`,
			formats: ["es", "cjs"]
		},
		// outDir: "dist",
		rollupOptions: {
			// If we want to publish standalone components we don't externalize lit,
			// if you are going to use lit in your own project, you can make it a dep instead.
			// external: /^lit/, <-- comment this line
			external: ["@cldcvr/flow-core", /^lit/],
			output: {
				globals: {
					"@cldcvr/flow-core": "@cldcvr/flow-core"
				}
			}
		}
	},
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./src/index.ts"),
			"@cldcvr/flow-core/src/index": "@cldcvr/flow-core"
		}
	},
	plugins: [litcss()]
});
