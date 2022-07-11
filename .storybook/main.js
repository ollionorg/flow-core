const litcss = require("rollup-plugin-postcss-lit");

module.exports = {
	stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
	framework: "@storybook/web-components",
	core: {
		builder: "@storybook/builder-vite"
	},
	async viteFinal(config, { configType }) {
		// customize the Vite config here
		config.optimizeDeps.include = [
			...(config.optimizeDeps?.include ?? []),
			"@storybook/web-components"
		];
		config.optimizeDeps.exclude = [...(config.optimizeDeps?.exclude ?? []), "lit", "lit-html"];
		config.plugins = [
			...config.plugins,
			{
				...litcss(),
				enforce: "post"
			}
		];
		// return the customized config
		return config;
	}
};
