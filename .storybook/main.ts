import { mergeConfig } from "vite";
import path from "path";

const alias = [
	"flow-code-editor",
	"flow-core-config",
	"flow-core",
	"flow-form-builder",
	"flow-lineage",
	"flow-log",
	"flow-md-editor",
	"flow-table"
].map(pkg => ({
	find: `@cldcvr/${pkg}`,
	replacement: path.resolve(__dirname, "../packages", pkg, "src")
}));

export default {
	stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],

	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"storybook-addon-themes",
		"@storybook/addon-storysource"
	],

	framework: "@storybook/web-components-vite",

	async viteFinal(config, { configType }) {
		return mergeConfig(config, {
			base: configType === "PRODUCTION" ? "/v2/" : "",
			resolve: {
				alias
			}
		});
	},

	docs: {
		autodocs: true
	}
};
