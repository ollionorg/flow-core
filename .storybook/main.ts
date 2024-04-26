import { mergeConfig } from "vite";

export default {
	stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],

	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/addon-storysource",
		"@storybook/addon-a11y"
	],

	framework: "@storybook/web-components-vite",

	async viteFinal(config, { configType }) {
		return mergeConfig(config, {
			base: configType === "PRODUCTION" ? "/v2/" : ""
		});
	}
};
