import { mergeConfig } from "vite";
import path from "path";

const alias = [
	"flow-core",
	"flow-core-config",
	"flow-log",
	"flow-code-editor",
	"flow-table",
	"flow-md-editor"
].map(pkg => ({
	find: `@cldcvr/${pkg}`,
	replacement: path.resolve(__dirname, "../packages", pkg, "src")
}));

export default {
	stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],

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
