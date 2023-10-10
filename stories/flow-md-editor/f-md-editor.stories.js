import { html } from "lit-html";
import sampleMd from "./sample-md";

export default {
	title: "@cldcvr/flow-md-editor/f-md-editor",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const handleInput = function (ev) {
			console.log(ev);
		};

		return html`<f-div padding="x-large" height="100%">
			<f-md-editor .value=${args.value} .mode=${args.mode} @input=${handleInput}></f-md-editor>
		</f-div>`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "text"
		},

		mode: {
			control: "radio",
			options: ["edit", "view"]
		}
	},

	args: {
		value: sampleMd,
		mode: "view"
	}
};
