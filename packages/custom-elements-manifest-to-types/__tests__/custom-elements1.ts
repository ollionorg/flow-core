import { Package } from "custom-elements-manifest/schema";
export const customElements = {
	schemaVersion: "1.0.0",
	readme: "",
	modules: [
		{
			kind: "javascript-module",
			path: "src/index.ts",
			declarations: [],
			exports: [
				{
					kind: "js",
					name: "*",
					declaration: {
						name: "*",
						package: '"./f-icon/f-icon"'
					}
				}
			]
		},
		{
			kind: "javascript-module",
			path: "src/f-icon/f-icon.ts",
			declarations: [
				{
					kind: "class",
					description: "",
					name: "FIcon",
					members: [
						{
							kind: "field",
							name: "state",
							type: {
								text: '"primary" | "success" | "warning"'
							},
							default: '"primary"',
							attribute: "state"
						}
					],
					attributes: [
						{
							name: "state",
							type: {
								text: '"primary" | "success" | "warning"'
							},
							default: '"primary"',
							fieldName: "state"
						}
					],
					superclass: {
						name: "LitElement",
						package: "lit"
					},
					tagName: "f-icon",
					customElement: true
				}
			],
			exports: [
				{
					kind: "js",
					name: "FIcon",
					declaration: {
						name: "FIcon",
						module: "src/f-icon/f-icon.ts"
					}
				},
				{
					kind: "custom-element-definition",
					name: "f-icon",
					declaration: {
						name: "FIcon",
						module: "src/f-icon/f-icon.ts"
					}
				}
			]
		}
	]
} as Package;
