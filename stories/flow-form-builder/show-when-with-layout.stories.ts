import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderField, FormBuilderValues } from "@nonfx/flow-form-builder";
import { createRef, Ref, ref } from "lit/directives/ref.js";

export default {
	title: "@nonfx/flow-form-builder/Examples/Show When With Layout",
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
		label: {
			title: "Label left Layout fields"
		},
		fields: {
			first: {
				type: "text",
				label: {
					title: "First"
				},
				layout: "label-left"
			},
			second: {
				type: "text",
				label: {
					title: "Second"
				},
				layout: "label-left",
				showWhen(values) {
					console.log((values as Record<string, any>).first === "xyz");
					return (values as Record<string, any>).first === "xyz";
				}
			},
			thirdWithIcon: {
				type: "object",
				label: {
					title: "Icon is added after field"
				},
				gap: "x-small",
				fields: {
					third: {
						type: "text",
						label: {
							title: "Third"
						},
						layout: "label-left"
					},
					icon: {
						type: "icon-button",
						icon: "i-close",
						category: "transparent",
						variant: "block",
						state: "neutral"
					}
				}
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
	return html`
		<f-div padding="medium" gap="large">
			<f-form-builder
				.field=${args.field}
				.values=${args.values}
				@keydown=${handleKeydown}
				@input=${handleInput}
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
	field: sampleFormBuilder.field,
	values: {
		first: "Tony",
		second: "Stark"
	}
};
