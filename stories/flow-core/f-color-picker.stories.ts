import { html } from "lit-html";

export default {
	title: "@cldcvr/flow-core/f-color-picker",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, unknown>) => {
		return html`<f-color-picker
			.variant=${args.variant}
			.state=${args.state}
			.size=${args.size}
			.value=${args.value}
			.disabled=${args.disabled}
			.readOnly=${args["read-only"]}
		></f-color-picker>`;
	},

	name: "Playground",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	},

	argTypes: {
		variant: {
			control: "select",
			options: ["curved", "round", "block"]
		},
		state: {
			control: "select",
			options: ["default", "success", "warning", "danger", "primary"]
		},
		size: {
			control: "select",
			options: ["medium", "small"]
		},
		value: {
			control: "text"
		},
		disabled: {
			control: "boolean"
		},
		["read-only"]: {
			control: "boolean"
		}
	},

	args: {
		variant: "curved",
		state: "default",
		size: "medium",
		value: "#000",
		disabled: false,
		["read-only"]: false
	}
};
