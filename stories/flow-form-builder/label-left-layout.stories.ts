import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderField } from "@nonfx/flow-form-builder";
import { createRef, Ref, ref } from "lit/directives/ref.js";

export default {
	title: "@nonfx/flow-form-builder/Examples/Label Left Layout",
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
			division: {
				type: "suggest",

				label: {
					title: html`<f-div gap="large" align="middle-left" width="200px">
						<f-icon state="secondary" source="i-grid-view" size="large"></f-icon>
						<f-text state="secondary">Division</f-text>
					</f-div>`
				},
				validationRules: [
					{
						name: "required"
					}
				],
				layout: "label-left",
				iconRight: "i-search",
				suggestions: ["option1", "option2", "option3", "option4"]
			},
			class: {
				type: "suggest",
				label: {
					title: html`<f-div gap="large" align="middle-left" width="200px">
						<f-icon state="secondary" source="i-org" size="large"></f-icon>
						<f-text state="secondary">Class</f-text>
					</f-div>`
				},
				layout: "label-left",
				iconRight: "i-search",
				suggestions: ["option1", "option2", "option3", "option4"]
			},
			family: {
				type: "suggest",
				layout: "label-left",
				label: {
					title: html`<f-div gap="large" align="middle-left" width="200px">
						<f-icon state="secondary" source="i-cart" size="large"></f-icon>
						<f-text state="secondary">Family</f-text>
					</f-div>`
				},
				iconRight: "i-search",
				suggestions: ["option1", "option2", "option3", "option4"]
			},
			canonicalName: {
				type: "suggest",
				layout: "label-left",
				label: {
					title: html`<f-div gap="large" align="middle-left" width="200px">
						<f-icon state="secondary" source="i-crown" size="large"></f-icon>
						<f-text state="secondary">Canonical name</f-text>
					</f-div>`
				},
				iconRight: "i-search",
				suggestions: ["option1", "option2", "option3", "option4"]
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
			<f-form-builder
				.field=${args.field}
				.values=${args.values}
				@keydown=${handleKeydown}
				@input=${handleInput}
				@submit="${handleSubmit}"
			>
				<f-div>
					<f-button label="save" type="submit"></f-button>
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
