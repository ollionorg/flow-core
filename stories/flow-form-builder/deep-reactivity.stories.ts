import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderField } from "@nonfx/flow-form-builder";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { useArgs } from "@storybook/manager-api";
import { FFormBuilder } from "@nonfx/flow-form-builder/src";

export default {
	title: "@nonfx/flow-form-builder/Examples/Deep Reactivity",
	argTypes: {
		field: {
			control: false
		}
	}
} as Meta<SampleFormBuilder>;

type SampleFormBuilder = {
	field: FormBuilderField;
};

const sampleFormBuilder: SampleFormBuilder = {
	field: {
		type: "object",
		direction: "vertical",
		isCollapsible: false,
		isCollapsed: true,
		label: {
			title: "Object field form",
			description: "showing object field",
			iconTooltip: "Simple object with 2 fields `firstname` & `lastname` "
		},
		fields: {
			firstname: {
				type: "text",
				validationRules: [
					{
						name: "required"
					}
				]
			},
			lastname: {
				type: "text",

				validationRules: [
					{
						name: "required"
					}
				]
			},
			arrayOfObjects: {
				type: "array",
				label: {
					title: "Array of Objects"
				},
				field: {
					type: "object",
					fields: {
						firstname: {
							type: "text",
							label: {
								title: "MCD no 1",
								description: "This is no1 choice"
							},
							validationRules: [
								{
									name: "required"
								}
							]
						},
						lastname: {
							qaId: "lastQa",
							type: "select",
							label: {
								title: "Select Title",
								description: "Hello description"
							},
							selection: "single",
							options: ["op1", "op2"],
							validationRules: [
								{
									name: "required"
								}
							]
						}
					}
				}
			},
			array: {
				type: "array",
				label: {
					title: "Array"
				},
				field: {
					type: "text",
					validationRules: [
						{
							name: "required"
						}
					]
				}
			}
		}
	}
};
let count = 0;
const Template: Story<unknown> = (args: any) => {
	const [_, updateArgs] = useArgs();
	const handleKeydown = (event: Event) => {
		event.stopPropagation();
		event.stopImmediatePropagation();
	};
	const fieldRef: Ref<HTMLElement> = createRef();
	const formRef: Ref<FFormBuilder> = createRef();
	const stateRef: Ref<HTMLElement> = createRef();
	const handleInput = (event: CustomEvent) => {
		if (formRef.value) {
			const someCoolValues = { ...event.detail };
			someCoolValues.lastname = `Cloud${(count += 1)}`;
			formRef.value.values = someCoolValues;
		}
		if (fieldRef.value) {
			fieldRef.value.innerHTML = JSON.stringify(event.detail, undefined, 8);
		}
	};
	const handleStateChange = (event: CustomEvent) => {
		if (stateRef.value) {
			stateRef.value.textContent = JSON.stringify(event.detail, undefined, 2);
		}
	};
	return html`
		<f-div padding="medium" gap="large">
			<f-form-builder
				.field=${args.field}
				.values=${args.values}
				${ref(formRef)}
				@keydown=${handleKeydown}
				@input=${handleInput}
				@state-change=${handleStateChange}
			>
				<f-div>
					<f-button label="submit" type="submit"></f-button>
				</f-div>
			</f-form-builder>
			<f-div width="400px" height="hug-content" direction="column" gap="small" overflow="scroll">
				<f-text>Values</f-text>
				<pre ${ref(fieldRef)}>${JSON.stringify(args.values, undefined, 8)}</pre>
				<f-divider></f-divider>
				<f-text size="large" weight="bold" state="secondary">Form State with silent errors</f-text>
				<pre ${ref(stateRef)}></pre>
			</f-div>
		</f-div>
	`;
};

export const basic = Template.bind({});

basic.args = {
	field: sampleFormBuilder.field,
	values: {
		firstname: "Tony",
		lastname: "Stark",
		arrayOfObjects: [{ lastname: "Khan" }]
	}
};
