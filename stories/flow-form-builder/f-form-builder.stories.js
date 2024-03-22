import { html } from "lit-html";
import field from "./f-formbuilder-field";
import { useArgs, useState } from "@storybook/client-api";
import { createRef, ref } from "lit/directives/ref.js";

export default {
	title: "@ollion/flow-form-builder/f-form-builder",

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

		return html`<f-div direction="column">
			<f-div padding="medium" direction="row" height="hug-content" gap="medium" overflow="scroll">
				<f-div width="hug-content" align="middle-center">
					<f-text variant="para" size="medium" weight="regular" state="default" align="left"
						>Target environment</f-text
					>
				</f-div>
				<f-div align="middle-center" width="224px">
					<f-select .options=${["test1", "test2", "test3"]} placeholder="Select Target Environment">
					</f-select>
				</f-div> </f-div
		></f-div>`;
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
