import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useEffect, useState } from "@storybook/client-api";
import fTextAreaAnatomy from "../svg/i-ftextarea-anatomy.js";

export default {
	title: "@nonfx/flow-core/f-text-area",

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
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-text-area
						category=${args.category}
						placeholder=${args.placeholder}
						?resizable=${args.resizable}
						?clear=${args.clear}
						.state=${args.state}
						.size=${args.size}
						value=${args.value}
						@input=${handleInput}
						max-length=${args["max-length"]}
						?disabled=${args.disabled}
						?read-only=${args["read-only"]}
						?mask-value=${args["mask-value"]}
						rows=${args.rows}
						mask-value
					>
						<f-text slot="label" variant="para" size="small">Label</f-text>
						<f-text slot="help" variant="para" size="small">This is subtext</f-text>
						<f-text slot="subtitle" state="secondary" variant="para" size="small">Optional</f-text>
						<f-icon
							slot="icon-tooltip"
							source="i-question-filled"
							tooltip="some info"
						></f-icon> </f-text-area></f-div
			></f-div>
		`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "text"
		},

		placeholder: {
			control: "text"
		},

		category: {
			control: "select",
			options: ["fill", "transparent", "outline"]
		},

		state: {
			control: "select",
			options: ["default", "success", "primary", "warning", "danger"]
		},

		size: {
			control: "radio",
			options: ["small", "medium"]
		},

		slot: {
			control: "text"
		},

		rows: {
			control: "text"
		},

		["max-length"]: {
			control: "text"
		},

		disabled: {
			control: "boolean"
		},

		["read-only"]: {
			control: "boolean"
		},

		["mask-value"]: {
			control: "boolean"
		},

		clear: {
			control: "boolean"
		},

		resizable: {
			control: "boolean"
		}
	},

	args: {
		value: undefined,
		placeholder: "Enter your text here",
		category: "fill",
		state: "default",
		size: "medium",

		rows: undefined,
		["max-length"]: undefined,
		resizable: false,
		disabled: false,
		["read-only"]: false,
		["mask-value"]: false,
		clear: false
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fTextAreaAnatomy)}</div>`,
	name: "Anatomy"
};

export const Category = {
	render: args => {
		const categories = ["fill", "outline", "transparent"];
		const [value, setValue] = useState("");

		const handleInput = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${categories.map(
					item => html`<f-div>
           <f-text-area
              category=${item}
              placeholder="This is a textarea"
              size="medium"
              value=${value}
              @input=${handleInput}
            >
              <f-text slot="label" variant="para" size="small">Label (category="${item}")</f-text>
              <f-text slot="help" variant="para" size="small">This is subtext</f-text>
            </f-text-area></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "category"
};

export const Value = {
	render: args => {
		const [value, setValue] = useState("Value Here");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-text-area
						placeholder="This is a textarea"
						size="medium"
						value=${value}
						@input=${handleValue}
					>
						<f-text slot="label" variant="para" size="small">Label</f-text>
						<f-text slot="help" variant="para" size="small">This is subtext</f-text>
					</f-text-area></f-div
				></f-div
			>
		`;
	},

	name: "value"
};

export const Placeholder = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-text-area
						placeholder="This is a textarea"
						size="medium"
						value=${value}
						@input=${handleValue}
					>
						<f-text slot="label" variant="para" size="small">Label </f-text>
						<f-text slot="help" variant="para" size="small">This is subtext</f-text>
					</f-text-area></f-div
				></f-div
			>
		`;
	},

	name: "placeholder"
};

export const Size = {
	render: args => {
		const sizes = ["small", "medium"];
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${sizes.map(
					item => html`<f-div>
          <f-text-area
              placeholder="This is a textarea"
              size=${item}
              value=${value}
              @input=${handleValue}
            >
              <f-text slot="label" variant="para" size="small">Label (size="${item}")</f-text>
              <f-text slot="help" variant="para" size="small">This is subtext</f-text>
            </f-text-area></f-div
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
		const [value, setValue] = useState("");

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
									html`<f-div>
										<f-text-area
											placeholder="This is a textarea"
											size="medium"
											state=${state}
											value=${value}
											@input=${handleValue}
										>
											<f-text slot="label" variant="para" size="small"
												>Label (state="${state}")</f-text
											>
											<f-text slot="help" variant="para" size="small">This is subtext</f-text>
										</f-text-area></f-div
									>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state"
};

export const MaxLength = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-text-area
						placeholder="This is a textarea"
						size="medium"
						value=${value}
						@input=${handleValue}
						max-length="100"
					>
						<f-text slot="label" variant="para" size="small">Label</f-text>
						<f-text slot="help" variant="para" size="small">This is subtext</f-text>
					</f-text-area></f-div
				></f-div
			>
		`;
	},

	name: "max-length"
};

export const Rows = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-text-area
						placeholder="This is a textarea"
						size="medium"
						value=${value}
						@input=${handleValue}
						rows="8"
					>
						<f-text slot="label" variant="para" size="small">Label (rows="8")</f-text>
						<f-text slot="help" variant="para" size="small">This is subtext</f-text>
					</f-text-area></f-div
				></f-div
			>
		`;
	},

	name: "rows"
};

export const Flags = {
	render: args => {
		const [value, setValue] = useState("some text");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${["Resizable", "Disabled", "Clear Icon on Type", "Readonly", "Mask Value"].map(
					item => html`<f-div>
          <f-text-area
            value=${value}
            placeholder="Write here"
            @input=${handleValue}
            size="medium"
            ?resizable=${item === "Resizable" ? true : false}
            ?disabled=${item === "Disabled" ? true : false}
            ?clear=${item === "Clear Icon on Type" ? true : false}
            ?read-only=${item === "Readonly" ? true : false}
      ?mask-value=${item === "Mask Value" ? true : false}
          >
            <f-div slot="label" padding="none" gap="none">${item}</f-div>
            <f-div slot="description" padding="none" gap="none">This is a ${item} Flag</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-text-area></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "Flags"
};
