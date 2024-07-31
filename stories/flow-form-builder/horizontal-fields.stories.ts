import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderField } from "@nonfx/flow-form-builder";
import { createRef, Ref, ref } from "lit/directives/ref.js";

export default {
	title: "@nonfx/flow-form-builder/Examples/Horiontal fields",
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
		fields: {
			cloudProvider: {
				type: "select",
				label: { title: "Cloud Provider" },
				validationRules: [{ name: "required" }],
				options: [
					{
						title: "AWS",
						icon: "p-aws"
					},
					{
						title: "GCP",
						icon: "p-gcp"
					},
					{
						title: "Azure",
						icon: "p-azure"
					}
				]
			},
			text: {
				type: "text"
			},
			texta: {
				type: "textarea"
			},
			sugg: {
				type: "suggest",
				suggestions: ["suggestion1", "suggestion2", "suggestion3"]
			},
			date: {
				type: "datetime"
			}
		}
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
		console.log(event);
		window.location.reload();
	};
	return html`
		<f-div padding="medium">
			<f-form-builder
				.field=${args.field}
				.values=${args.values}
				@keydown=${handleKeydown}
				@input=${handleInput}
				@submit="${handleSubmit}"
			>
				<f-div>
					<f-button label="login" type="submit"></f-button>
				</f-div>
			</f-form-builder>
		</f-div>
	`;
};

export const basic = Template.bind({});

basic.args = {
	field: sampleFormBuilder.field,
	values: { username: "", password: "" }
};
