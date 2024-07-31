import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderField, FormBuilderValidatorFunction } from "@nonfx/flow-form-builder";
import { createRef, Ref, ref } from "lit/directives/ref.js";

export default {
	title: "@nonfx/flow-form-builder/Examples/Object field",
	argTypes: {
		field: {
			control: false
		}
	}
} as Meta<SampleFormBuilder>;

type SampleFormBuilder = {
	field: FormBuilderField;
};

const validateName: FormBuilderValidatorFunction<Record<string, string>> = values => {
	return values.firstname === "Iron" && values.lastname === "Man";
};
const sampleFormBuilder: SampleFormBuilder = {
	field: {
		type: "object",
		direction: "horizontal",
		isCollapsible: false,
		isCollapsed: true,
		helperText: "This is helper text for object",
		label: {
			title: "Object field form",
			description: "showing object field",
			iconTooltip: "Simple object with 2 fields `firstname` & `lastname` "
		},
		fields: {
			firstname: {
				type: "text"
			},
			lastname: {
				type: "text"
			}
		},
		validationRules: [
			{
				name: "custom",
				message: "Please provide either firstname or lastname",
				validate: values => {
					const records = values as unknown as Record<string, string>;
					return records.firstname !== undefined || records.lastname !== undefined;
				}
			}
		]
	}
};

const Template: Story<unknown> = (args: any) => {
	const handleKeydown = (event: Event) => {
		event.stopPropagation();
		event.stopImmediatePropagation();
	};
	const fieldRef: Ref<HTMLElement> = createRef();
	const handleInput = (event: CustomEvent) => {
		if (fieldRef.value) {
			fieldRef.value.innerHTML = JSON.stringify(event.detail, undefined, 8);
		}
	};
	const handleSubmit = (event: CustomEvent) => {
		console.log(event.detail);
	};
	return html`
		<f-div padding="medium" gap="large">
			<f-form-builder
				.field=${args.field}
				.values=${args.values}
				@keydown=${handleKeydown}
				@input=${handleInput}
				@submit=${handleSubmit}
			>
				<f-div>
					<f-button label="submit" type="submit"></f-button>
				</f-div>
			</f-form-builder>
			<f-div>
				<pre ${ref(fieldRef)}>${JSON.stringify(args.values, undefined, 8)}</pre>
			</f-div>
		</f-div>
	`;
};

export const basic = Template.bind({});

basic.args = {
	field: sampleFormBuilder.field
};
