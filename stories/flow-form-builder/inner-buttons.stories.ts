import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderField } from "@nonfx/flow-form-builder";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { FFormBuilder } from "@nonfx/flow-form-builder/src";

export default {
	title: "@nonfx/flow-form-builder/Examples/Test Inner Buttons",
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
		fieldSeparator: true,
		fields: {
			featureFlags: {
				type: "object",
				direction: "vertical",
				label: { title: "Feature flags" },
				fields: {
					ENABLE_NX_PLATFORM: {
						type: "switchButton",
						qaId: "ENABLE_NX_PLATFORM",
						label: { title: "VN-3176 - ENABLE_NX_PLATFORM" },
						helperText: "Enables features for the NX Platform",
						state: "primary"
					}
				}
			},
			highlightDataQa: { type: "switchButton", label: { title: "Highlight data-qa attributes" } },
			debugFunctions: {
				type: "object",
				direction: "vertical",
				label: { title: "Debug functions" },
				fields: {
					createSeedClassifications: {
						type: "button",
						label: "createSeedClassifications",
						state: "success",
						variant: "round",
						size: "small",
						iconLeft: "i-play",
						loading: false
					},
					createSeedTemplate: {
						type: "button",
						label: "createSeedTemplate",
						state: "success",
						variant: "round",
						size: "small",
						iconLeft: "i-play",
						loading: false
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
	const formRef: Ref<FFormBuilder> = createRef();
	const handleInput = (event: CustomEvent) => {
		console.log(event);
		if (fieldRef.value) {
			fieldRef.value.innerHTML = JSON.stringify(event.detail, undefined, 8);
		}
		if (formRef.value) {
			formRef.value.field = { ...sampleFormBuilder.field };
		}
	};
	return html`
		<f-div padding="medium" gap="large">
			<f-form-builder
				${ref(formRef)}
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
		firstname: "Tony",
		lastname: "Stark"
	}
};
