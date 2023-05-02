const litcss = require("rollup-plugin-postcss-lit");
const path = require("path");

module.exports = {
	stories: ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"storybook-addon-themes",
		"@storybook/addon-storysource"
	],
	framework: "@storybook/web-components",
	core: {
		builder: "@storybook/builder-vite"
	},
	async viteFinal(config, { configType }) {
		//  config.build.assetsDir = "v2/assets/";
		// customize the Vite config here
		if (!config.optimizeDeps) {
			config.optimizeDeps = {};
		}
		if (configType === "PRODUCTION") {
			config.base = "/v2/";
			config.resolve.alias = [
				{
					find: "@cldcvr/flow-core/src",
					replacement: path.resolve(__dirname, "../packages/flow-core/src")
				},
				{
					find: "@cldcvr/flow-table/src",
					replacement: path.resolve(__dirname, "../packages/flow-table/src")
				}
			];
		}

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
