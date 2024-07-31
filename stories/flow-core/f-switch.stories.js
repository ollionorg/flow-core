import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useEffect, useState } from "@storybook/client-api";
import fSwitchAnatomy from "../svg/i-fswitch-anatomy.js";

export default {
	title: "@nonfx/flow-core/f-switch",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const [_, updateArgs] = useArgs();

		const handleInput = e => {
			updateArgs({
				value: e.detail.value
			});
		};

		return html`
			<f-div width="hug-content">
				<f-switch
					size=${args.size}
					value=${args.value}
					state=${args.state}
					?disabled=${args.disabled}
					tooltip="This is switch"
					@input=${handleInput}
				>
					<f-div slot="label" padding="none">
						<f-text variant="para" size="small">Switch Label</f-text>
					</f-div>
				</f-switch>
			</f-div>
		`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "boolean"
		},

		state: {
			control: "select",
			options: ["default", "success", "primary", "warning", "danger"]
		},

		size: {
			control: "radio",
			options: ["small", "medium"]
		},

		disabled: {
			control: "boolean"
		}
	},

	args: {
		value: true,
		state: "default",
		size: "medium",

		disabled: false
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fSwitchAnatomy)}</div>`,
	name: "Anatomy"
};

export const Value = {
	render: args => {
		const values = [true, false];
		const [value, setValue] = useState(true);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${values.map(
					item => html`<f-div padding="medium">
           <f-switch
              size="medium"
              .value=${item}
              @input=${handleValue}
            >
              <f-div padding="none" align="middle-center" slot="label">
            <f-text variant="para" size="small">Switch (value="${item}")</f-text>
          </f-div>
          <f-div padding="none" align="middle-center" slot="help">
            <f-text variant="para" size="small">This is helper text</f-text>
          </f-div>
            </f-switch></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "value"
};

export const Size = {
	render: args => {
		const sizes = ["small", "medium"];
		const [value, setValue] = useState(false);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${sizes.map(
					item => html`<f-div padding="small">
         <f-switch
              .size=${item}
              .value=${value}
              @input=${handleValue}
            >
              <f-div padding="none" align="middle-center" slot="label">
            <f-text variant="para" size="small">Switch (size="${item}")</f-text>
          </f-div>
          <f-div padding="none" align="middle-center" slot="help">
            <f-text variant="para" size="small">This is helper text</f-text>
          </f-div>
            </f-switch></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "size"
};

export const State = {
	render: args => {
		const states = [
			["default", "primary", "success"],
			["danger", "warning", "default"]
		];
		const [value, setValue] = useState(true);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div direction="column" gap="medium">
				${states.map(
					item =>
						html` <f-div align="middle-center" padding="large" gap="medium">
							${item.map(
								state =>
									html`<f-div padding="small"
										><f-switch size="medium" .value=${value} .state=${state} @input=${handleValue}>
											<f-div padding="none" align="middle-center" slot="label">
												<f-text variant="para" size="small">Switch (state="${state}")</f-text>
											</f-div>
											<f-div padding="none" align="middle-center" slot="help">
												<f-text variant="para" size="small">This is helper text</f-text>
											</f-div>
										</f-switch></f-div
									>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state"
};

export const Flags = {
	render: args => {
		const [value, setValue] = useState(true);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${[0].map(
					item => html`<f-div>
         <f-switch
              size="medium"
              .value=${value}
              ?disabled=${true}
              @input=${handleValue}
            >
              <f-div padding="none" align="middle-center" slot="label">
            <f-text variant="para" size="small">Switch Disabled</f-text>
          </f-div>
          <f-div padding="none" align="middle-center" slot="help">
            <f-text variant="para" size="small">This is helper text</f-text>
          </f-div>
            </f-switch></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "Flags"
};
