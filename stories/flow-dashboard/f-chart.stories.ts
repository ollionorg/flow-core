import { html } from "lit-html";
import { createRef, ref } from "lit/directives/ref.js";

export default {
	title: "@cldcvr/flow-dashboard/f-chart",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Basic = {
	render: () => {
		return html` <f-chart></f-chart> `;
	},

	name: "basic"
};
