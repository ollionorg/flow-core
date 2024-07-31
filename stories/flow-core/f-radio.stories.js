import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useEffect, useState } from "@storybook/client-api";
import fRadioAnatomy from "../svg/i-fradio-anatomy.js";

export default {
	title: "@nonfx/flow-core/f-radio",

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
					<f-radio
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
						></f-icon> </f-radio></f-div
			></f-div>
		`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "radio",
			options: ["selected", "unselected"]
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
		value: "selected",
		state: "default",
		size: "medium",

		disabled: false
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fRadioAnatomy)}</div>`,
	name: "Anatomy"
};

export const Value = {
	render: args => {
		const values = ["selected", "unselected"];
		const [value, setValue] = useState("selected");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${values.map(
					item => html`<f-div>
           <f-radio
              size="medium"
              .value=${item}
              @input=${handleValue}
            >
              <f-div slot="label" padding="none">
                <f-text variant="para" size="small">This is a radio (value="${item}")</f-text>
              </f-div>
              <f-div slot="help" gap="none" padding="none">
                <f-text variant="para" size="small" state="secondary">This is a subtext </f-text>
              </f-div>
            </f-radio></f-div
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
		const [value, setValue] = useState("unselected");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${sizes.map(
					item => html`<f-div>
          <f-radio
              .size=${item}
              .value=${value}
              @input=${handleValue}
            >
              <f-div slot="label" padding="none">
                <f-text variant="para" size="small">This is a radio (size="${item}")</f-text>
              </f-div>
              <f-div slot="help" gap="none" padding="none">
                <f-text variant="para" size="small" state="secondary">This is a subtext </f-text>
              </f-div>
            </f-radio></f-div
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
		const [value, setValue] = useState("unselected");

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
										><f-radio size="medium" .value=${value} .state=${state} @input=${handleValue}>
											<f-div slot="label" padding="none">
												<f-text variant="para" size="small"
													>This is a radio (state="${state}")</f-text
												>
											</f-div>
											<<<<<<< HEAD =======
											<f-div slot="description" gap="none" padding="none">
												<f-text variant="para" size="small" state="secondary"
													>States are used to communicate purpose and connotations.
												</f-text>
											</f-div>
											>>>>>>> main
											<f-div slot="help" gap="none" padding="none">
												<f-text variant="para" size="small" state="secondary"
													>This is a subtext
												</f-text>
											</f-div>
										</f-radio></f-div
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
		const [value, setValue] = useState("selected");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${[0].map(
					item => html`<f-div>
          <f-radio
              size="medium"
              .value=${value}
              @input=${handleValue}
              ?disabled=${true}
            >
              <f-div slot="label" padding="none">
                <f-text variant="para" size="small">This is a Disabled f-radio (disabled=true)</f-text>
              </f-div>
              <f-div slot="help" gap="none" padding="none">
                <f-text variant="para" size="small" state="secondary">This is a subtext </f-text>
              </f-div>
            </f-radio></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "Flags"
};
