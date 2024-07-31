import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useEffect, useState } from "@storybook/client-api";
import fCheckboxAnatomy from "../svg/i-fcheckbox-anatomy.js";

export default {
	title: "@nonfx/flow-core/f-checkbox",

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
			<f-div width="100%" padding="large">
				<f-div width="80%">
					<f-checkbox
						size=${args.size}
						value=${args.value}
						state=${args.state}
						?disabled=${args.disabled}
						@input=${handleInput}
					>
						<f-div slot="label" padding="none">
							<f-text variant="para" size="small">Banana</f-text>
						</f-div>
						<f-div slot="help" gap="none" padding="none">
							<f-text variant="para" size="small" state="secondary">This is a subtext </f-text>
						</f-div>
						<f-text slot="subtitle" align="right" state="secondary" variant="para" size="small"
							>Optional</f-text
						>
						<f-icon
							slot="icon-tooltip"
							source="i-question-filled"
							tooltip="some info"
						></f-icon> </f-checkbox></f-div
			></f-div>
		`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "radio",
			options: ["checked", "unchecked", "indeterminate"]
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
		value: "checked",
		state: "default",
		size: "medium",

		disabled: false
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fCheckboxAnatomy)}</div>`,
	name: "Anatomy"
};

export const Value = {
	render: args => {
		const values = ["checked", "unchecked", "indeterminate"];
		const [value, setValue] = useState("checked");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${values.map(
					item => html`<f-div>
           <f-checkbox
              size="medium"
              .value=${item}
              @input=${handleValue}
            >
              <f-div slot="label" padding="none">
                <f-text variant="para" size="small">This is a checkbox (value="${item}")</f-text>
              </f-div>
              <f-div slot="help" gap="none" padding="none">
                <f-text variant="para" size="small" state="secondary">This is a subtext </f-text>
              </f-div>
            </f-checkbox></f-div
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
		const [value, setValue] = useState("unchecked");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${sizes.map(
					item => html`<f-div>
          <f-checkbox
              .size=${item}
              .value=${value}
              @input=${handleValue}
            >
              <f-div slot="label" padding="none">
                <f-text variant="para" size="small">This is a checkbox (size="${item}")</f-text>
              </f-div>
              <f-div slot="help" gap="none" padding="none">
                <f-text variant="para" size="small" state="secondary">This is a subtext </f-text>
              </f-div>
            </f-checkbox></f-div
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
		const [value, setValue] = useState("unchecked");

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
									html`<f-div
										><f-checkbox
											size="medium"
											.value=${value}
											.state=${state}
											@input=${handleValue}
										>
											<f-div slot="label" padding="none">
												<f-text variant="para" size="small"
													>This is a checkbox (state="${state}")</f-text
												>
											</f-div>
											<f-div slot="help" gap="none" padding="none">
												<f-text variant="para" size="small" state="secondary"
													>This is a subtext
												</f-text>
											</f-div>
										</f-checkbox></f-div
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
		const [value, setValue] = useState("checked");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${[0].map(
					item => html`<f-div>
          <f-checkbox
              size="medium"
              .value=${value}
              @input=${handleValue}
              ?disabled=${true}
            >
              <f-div slot="label" padding="none">
                <f-text variant="para" size="small">This is a Disabled checkbox (disabled=true)</f-text>
              </f-div>
              <f-div slot="help" gap="none" padding="none">
                <f-text variant="para" size="small" state="secondary">This is a subtext </f-text>
              </f-div>
            </f-checkbox></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "Flags"
};
