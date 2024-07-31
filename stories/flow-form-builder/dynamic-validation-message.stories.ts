import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderField } from "@nonfx/flow-form-builder/src/types";
import { createRef, Ref, ref } from "lit/directives/ref.js";

export default {
	title: "@nonfx/flow-form-builder/Examples/Dynamic Validation Message",
	argTypes: {
		field: {
			control: false
		}
	}
} as Meta<SampleFormBuilder>;

type SampleFormBuilder = {
	field: FormBuilderField;
};

const extVariable = "External Variable";
const sampleFormBuilder: SampleFormBuilder = {
	field: {
		type: "object",
		direction: "vertical",
		fields: {
			username: {
				type: "text",
				validationRules: [
					{
						name: "required",
						message: (name, _value) => {
							return `${name} with  ${extVariable}`;
						}
					}
				]
			},
			password: {
				type: "password"
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
		<f-div padding="medium" dicrection="column" gap="large">
			<form style="width:500px">
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
	values: { username: "", password: "" }
};
