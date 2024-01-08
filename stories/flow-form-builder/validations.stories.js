import { html } from "lit-html";

import { useArgs, useState } from "@storybook/client-api";
import { createRef, ref } from "lit/directives/ref.js";

export default {
	title: "@ollion/flow-form-builder/Examples/Validations",

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

		const handleSubmit = event => {
			console.log("Submit event", event.detail);
			window.alert("event submit successfully");
		};

		const handleInput = event => {
			if (fieldRef.value) {
				fieldRef.value.textContent = JSON.stringify(event.detail, undefined, 2);
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

		return html` <f-div padding="medium" gap="medium" height="100%" overflow="scroll">
			<f-form-builder
				.field=${args.field}
				.values=${args.values}
				.variant=${args.variant}
				.category=${args.category}
				.size=${args.size}
				.gap=${args.gap}
				.label=${{
					title: "Main form label"
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
		field: {
			type: "object",
			direction: "vertical",
			fieldSeparator: true,

			label: {
				title: "Object level label",
				description: "following fields are used for demo purpose only"
			},

			fields: {
				emailField: {
					type: "email",

					label: {
						title: "Email field",
						description: "default validaiton should apply"
					},

					validationRules: [
						{
							name: "required"
						}
					]
				},

				urlField: {
					type: "url",

					label: {
						title: "URL field",
						description: "default validaiton should apply"
					},

					validationRules: [
						{
							name: "required"
						}
					]
				},

				minMaxLength: {
					type: "text",

					label: {
						title: "Min and Max length check"
					},

					helperText: "Value must be least 3 character long and max 5 character long",

					validationRules: [
						{
							name: "min",

							params: {
								length: 3
							}
						},
						{
							name: "max",

							params: {
								length: 5
							}
						},
						{
							name: "required"
						}
					]
				},

				minMaxValue: {
					type: "number",

					label: {
						title: "Min and Max value check"
					},

					helperText: "Value must be greater than 10 and less than 48",

					validationRules: [
						{
							name: "min-value",

							params: {
								min: 10
							}
						},
						{
							name: "max-value",

							params: {
								max: 48
							}
						},
						{
							name: "required"
						}
					]
				},

				regexField: {
					type: "text",

					label: {
						title: "Regex to not allowing special charcters and spaces"
					},

					helperText: "Value must match /^[\\w&.-]+$/ regex",

					validationRules: [
						{
							name: "regex",
							message: "Special charcters and spaces are not allowed",

							params: {
								regex: /^[\w&.-]+$/
							}
						},
						{
							name: "required"
						}
					]
				}
			}
		},

		values: {},
		variant: "curved",
		category: "fill",
		size: "medium",
		gap: "medium"
	}
};
