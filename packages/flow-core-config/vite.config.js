import { defineConfig } from "vite";

export default defineConfig({
	build: {
		sourcemap: true,
		lib: {
			entry: "index.ts",
			name: "index",
			fileName: format => `index.${format}.js`,
			formats: ["es", "cjs"]
		},
		rollupOptions: {
			external: ["rxjs"]
		}
	}
});
