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
		value: `Hello World!`,
		placeholder: `Enter rich text here...`
	}
};
