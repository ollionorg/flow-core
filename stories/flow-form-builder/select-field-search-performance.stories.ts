import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderField } from "@nonfx/flow-form-builder";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { faker } from "@faker-js/faker";

export default {
	title: "@nonfx/flow-form-builder/Examples/Select field search performance",
	argTypes: {
		field: {
			control: false
		}
	}
} as Meta<SampleFormBuilder>;

type SampleFormBuilder = {
	field: FormBuilderField;
};

const optionsArray = [];

for (let p = 0; p < 30000; p++) {
	optionsArray.push(`${p} - ${faker.location.city()}`);
}

const sampleFormBuilder: SampleFormBuilder = {
	field: {
		type: "select",
		options: optionsArray,
		searchable: true
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
	return html`
		<f-div padding="medium" dicrection="column" gap="large">
			<f-div>
				<f-form-builder .field=${args.field} @keydown=${handleKeydown} @input=${handleInput}>
					<f-div>
						<f-button label="submit" type="submit"></f-button>
					</f-div>
				</f-form-builder>
			</f-div>
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
