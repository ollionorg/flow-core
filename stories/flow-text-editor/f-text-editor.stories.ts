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
		const handleInput = function (ev: CustomEvent) {
			console.log(ev);
		};

		return html`<f-div height="100%">
			<f-text-editor
				.placeholder=${args.placeholder}
				.value=${args.value}
				.mode=${args.mode}
				@input=${handleInput}
			></f-text-editor>
		</f-div>`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "text"
		},
		placeholder: {
			control: "text"
		}
	},

	args: {
		value: `<h1>Hello World!</h1>`,
		placeholder: `Enter rich text here...`
	}
};
