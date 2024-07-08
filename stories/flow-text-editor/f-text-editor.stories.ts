import { html } from "lit-html";

export default {
	title: "@ollion/flow-text-editor/f-text-editor",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, any>) => {
		const handleInput = function (ev: Event) {
			console.log(ev);
		};

		return html`<f-div padding="x-large" height="100%">
			<f-text-editor .value=${args.value} .mode=${args.mode} @input=${handleInput}></f-text-editor>
		</f-div>`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "text"
		}
	},

	args: {
		value: `Hello World!`
	}
};
