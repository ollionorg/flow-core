import { defineConfig } from "vite";
import litcss from "rollup-plugin-postcss-lit";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.ts",
      name: "flow-elements",
      fileName: (format) => `flow-core.${format}.js`,
      formats: ["es"],
    },
    // outDir: "dist",
    rollupOptions: {
      // If we want to publish standalone components we don't externalize lit,
      // if you are going to use lit in your own project, you can make it a dep instead.
      // external: /^lit/, <-- comment this line
      //external: ["f-core-poc"],
    },
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src/index.ts"),
    },
  },
  plugins: [litcss()],
});
