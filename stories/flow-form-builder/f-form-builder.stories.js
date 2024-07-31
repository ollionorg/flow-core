import { html } from "lit-html";
import field from "./f-formbuilder-field";
import { useArgs, useState } from "@storybook/client-api";
import { createRef, ref } from "lit/directives/ref.js";

export default {
	title: "@nonfx/flow-form-builder/f-form-builder",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const [_, updateArgs] = useArgs();
		const [state, setState] = useState({});
		const fieldRef = createRef();
		const stateRef = createRef();
		const formRef = createRef();

		const handleSubmit = event => {
			console.log("Submit event", event.detail);
			window.alert("event submit successfully");
		};

		const handleInput = event => {
			if (fieldRef.value) {
				fieldRef.value.textContent = JSON.stringify(event.detail, undefined, 2);
			}

			if (formRef.value) {
				formRef.value.values = event.detail;
			}

			console.log("input event", event.detail);
		};

		const handleStateChange = event => {
			if (stateRef.value) {
				stateRef.value.textContent = JSON.stringify(event.detail, undefined, 2);
			}

			console.log("state change event", event.detail);
		};

		const handleKeydown = event => {
			event.stopPropagation();
			event.stopImmediatePropagation();
		};

		return html`<f-div padding="medium" gap="medium" height="100%" overflow="scroll">
			<f-div>
				<f-form-builder
					${ref(formRef)}
					.field=${args.field}
					.values=${args.values}
					.variant=${args.variant}
					.category=${args.category}
					.size=${args.size}
					.gap=${args.gap}
					.label=${{
						title: "Form label",
						description: "Description about form",
						iconTooltip: "Form more info"
					}}
					@submit=${handleSubmit}
					@input=${handleInput}
					@keydown=${handleKeydown}
					@state-change=${handleStateChange}
				>
					<f-div>
						<f-button label="submit" type="submit"></f-button>
					</f-div>
				</f-form-builder>
			</f-div>
			<f-divider></f-divider>
			<f-div width="400px" height="hug-content" direction="column" gap="small" overflow="scroll">
				<f-text>Values</f-text>
				<pre ${ref(fieldRef)}>${JSON.stringify(args.values, undefined, 8)}</pre>
				<f-divider></f-divider>
				<f-text size="large" weight="bold" state="secondary">Form State with silent errors</f-text>
				<pre ${ref(stateRef)}></pre>
			</f-div>
		</f-div>`;
	},

	name: "Playground",

	argTypes: {
		field: {
			control: "object"
		},

		values: {
			control: "object"
		},

		variant: {
			control: "select",
			options: ["curved", "round", "block"]
		},

		category: {
			control: "select",
			options: ["fill", "transparent", "outline"]
		},

		size: {
			control: "select",
			options: ["medium", "small"]
		},

		gap: {
			control: "select",
			options: ["large", "medium", "small", "x-small"]
		}
	},

	args: {
		field,

		values: {
			hiddenField: "IAmHidden",
			selectBox: ["option 1"],
			nestedArray: [],

			orgDetails: {
				name: "par"
			}
		},

		variant: "curved",
		category: "fill",
		size: "medium",
		gap: "medium"
	}
};
