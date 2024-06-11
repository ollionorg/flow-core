const path = require("path");

module.exports = {
	root: true,
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:storybook/recommended",
		"prettier"
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module"
	},
	plugins: ["@typescript-eslint"],
	env: {
		browser: true,
		node: true
	},
	rules: {
		"no-prototype-builtins": "off",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_"
			}
		]
	},
	overrides: [
		{
			files: ["rollup.config.js", "web-test-runner.config.js"],
			env: {
				node: true
			}
		},
		{
			files: ["stories/**"],
			rules: {
				"@typescript-eslint/no-unused-vars": "off",
				"@typescript-eslint/no-explicit-any": "off"
			}
		},
		{
			files: ["packages/**/*.ts"],
			extends: [
				"eslint:recommended",
				"plugin:@typescript-eslint/recommended-type-checked",
				"plugin:storybook/recommended",
				"prettier"
			],
			parserOptions: {
				project: path.resolve(__dirname, "./tsconfig.eslint.json")
			},
			rules: {
				"@typescript-eslint/unbound-method": "off",

				//@todo Remove individiual rules and fix them
				"@typescript-eslint/no-unsafe-member-access": "off",
				"@typescript-eslint/no-explicit-any": "off",
				"@typescript-eslint/no-unsafe-assignment": "off"
			}
		},
		{
			files: ["**/*_test.ts", "**/*.test.ts", "**/custom_typings/*.ts"],
			rules: {
				"@typescript-eslint/no-explicit-any": "off",
				"@typescript-eslint/no-unsafe-call": "off",
				"@typescript-eslint/no-unsafe-member-access": "off",
				"@typescript-eslint/no-floating-promises": "off",
				"@typescript-eslint/no-unnecessary-type-assertion": "off"
			}
		}
	]
};
