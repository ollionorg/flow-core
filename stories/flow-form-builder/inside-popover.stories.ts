import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { FormBuilderField } from "@nonfx/flow-form-builder";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { FButton, FSelectOptionObject } from "@nonfx/flow-core";

export default {
	title: "@nonfx/flow-form-builder/Examples/In PopOver",
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
			iconTooltip: "Simple object with 2 fields `name` & `emoji` "
		},
		fields: {
			topField: {
				type: "text",
				label: {
					title: "Top field",
					subTitle: "Optional"
				}
			},
			nameAndEmoji: {
				type: "object",
				direction: "horizontal",
				fields: {
					name: {
						type: "text",
						label: {
							title: "Testing external tooltip",
							iconTooltip: "#testTooltip"
						},
						helperText: `<f-text size="small" state="warning">This class is pretty straight-forward. It has two mandatory methods, bind and react which are called upon app initialization and after the scope updates respectively. Since this is a one-way binding on the text property, all we do here is set the innerText of the element.</f-text>`,
						validationRules: [
							{
								name: "required"
							}
						]
					},
					emoji: {
						type: "emoji"
					}
				}
			},
			dropdown: {
				label: {
					title: "Dorpdown",
					subTitle: "MyDropDown"
				},
				type: "select",
				options: [
					{ title: "Hash", data: { description: "[a-f0-9]" } },
					{ title: "Two Digits", data: { description: "\\d+\\.\\d+" } }
				],
				optionTemplate: function (option) {
					option = option as FSelectOptionObject;
					return html`<f-div direction="column" gap="x-small">
						<f-div gap="small">
							${option.title === "Hash" ? html`<f-icon source="i-crown"></f-icon>` : ""}
							<f-text>${option.title}</f-text>
						</f-div>
						<f-text state="secondary">${option.data?.description}</f-text></f-div
					>`;
				},
				validationRules: [
					{
						name: "required"
					}
				]
			},
			checkbox: {
				type: "checkbox",
				label: { title: " " },
				options: [
					{
						id: "aws-arn-checkbox-terms",
						title: html`<f-text size="medium" data-qa-id="aws-arn-checkbox-terms"
							>I have designated my AWS account with Code Pipes Account ID and Organization
							ID.</f-text
						>`
					}
				],

				validationRules: [
					{
						name: "required",
						message:
							"Please make sure you have designated your AWS account with Code Pipes Account ID and Organization ID."
					}
				],

				id: "checkbox"
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
	const buttonRef: Ref<FButton> = createRef();
	const stateRef = createRef();
	const handleInput = (event: CustomEvent) => {
		if (fieldRef.value) {
			fieldRef.value.innerHTML = JSON.stringify(event.detail, undefined, 8);
		}
	};
	const handleStateChange = (event: CustomEvent) => {
		if (stateRef.value) {
			stateRef.value.textContent = JSON.stringify(event.detail, undefined, 2);
		}
		// if (buttonRef.value) {
		// 	buttonRef.value.disabled = !event.detail.isValid;
		// }
	};
	return html`
		<f-popover open size="large">
			<f-tooltip id="testTooltip">
				<f-div gap="medium">
					<f-icon source="i-bulb"></f-icon
					><f-text state="warning">This comes from external tooltip</f-text>
				</f-div>
			</f-tooltip>
			<f-div padding="large" width="100%" height="500px" state="default" gap="large">
				<f-div>
					<f-form-builder
						.field=${args.field}
						.values=${args.values}
						@keydown=${handleKeydown}
						@input=${handleInput}
						@state-change=${handleStateChange}
					>
						<f-div>
							<f-button ${ref(buttonRef)} label="submit" type="submit"></f-button>
						</f-div>
					</f-form-builder>
				</f-div>
				<f-divider></f-divider>
				<f-div direction="column" height="hug-content">
					<f-div direction="column">
						<f-text>Values : </f-text>
						<pre ${ref(fieldRef)}>${JSON.stringify(args.values, undefined, 8)}</pre>
					</f-div>
					<f-divider></f-divider>
					<f-div direction="column">
						<f-text>State : </f-text>
						<pre ${ref(stateRef)}>${JSON.stringify(args.values, undefined, 8)}</pre>
					</f-div>
				</f-div>
			</f-div>
		</f-popover>
	`;
};

export const basic = Template.bind({});

basic.args = {
	field: sampleFormBuilder.field
};
