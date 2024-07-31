import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderField } from "@nonfx/flow-form-builder";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { FFormBuilder } from "@nonfx/flow-form-builder/src";

export default {
	title: "@nonfx/flow-form-builder/Examples/Multiple Async Custom Validator",
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
		fields: {
			username: {
				type: "text",
				validationRules: [
					{
						name: "required"
					},
					{
						name: "custom",
						validate: async function (value) {
							console.log("a called");
							return !value.includes("a");
						},
						message: "{{value}} has a"
					},
					{
						name: "custom",
						validate: async function (value) {
							console.log("b called");
							return !value.includes("b");
						},
						message: "{{value}} has b"
					}
				]
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
	const formRef: Ref<FFormBuilder> = createRef();
	const handleInput = (event: CustomEvent) => {
		if (fieldRef.value) {
			fieldRef.value.innerHTML = JSON.stringify(event.detail, undefined, 8);
		}
	};
	const handleSubmit = (event: CustomEvent) => {
		console.log(event);
		window.location.reload();
	};
	const handleStateChange = (_event: CustomEvent) => {
		if (formRef.value) {
			formRef.value.field = { ...sampleFormBuilder.field };
		}
	};
	return html`
		<f-div padding="medium" dicrection="column" gap="large">
			<form style="width:500px">
				<f-form-builder
					${ref(formRef)}
					.field=${args.field}
					.values=${args.values}
					@keydown=${handleKeydown}
					@input=${handleInput}
					@submit=${handleSubmit}
					@state-change=${handleStateChange}
				>
					<f-div>
						<f-button label="login" type="submit"></f-button>
					</f-div>
				</f-form-builder>
			</form>
			<f-div>
				<pre ${ref(fieldRef)}>${JSON.stringify(args.values, undefined, 8)}</pre>
			</f-div>
		</f-div>
	`;
};

export const basic = Template.bind({});

basic.args = {
	field: sampleFormBuilder.field,
	values: {
		username: "kkb"
	}
};
