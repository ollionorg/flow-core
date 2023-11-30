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
	render: () => {
		return html`<f-color-picker></f-color-picker>`;
	},

	name: "Playground",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};
