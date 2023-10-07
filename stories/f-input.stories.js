import { html } from "lit-html";
import fInputAnatomy from "./svg/i-finput-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useEffect, useState } from "@storybook/client-api";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export default {
	title: "Components/f-input",

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

			if (args.type === "tel") {
				updateArgs({
					["calling-code"]: e.detail.callingCode
				});
			}
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-input
						.value=${args.value}
						.variant=${args.variant}
						.category=${args.category}
						.placeholder=${args.placeholder}
						data-qa-element-id="testId"
						@input=${handleInput}
						.type=${args.type}
						icon-left=${args["icon-left"]}
						icon-right=${args["icon-right"]}
						prefix=${args["prefix"]}
						suffix=${args["suffix"]}
						state=${args.state}
						max-length=${args["max-length"]}
						?loading=${args.loading}
						?disabled=${args.disabled}
						.clear=${args.clear}
						?read-only=${args.readOnly}
						.size=${args.size}
						autofocus
						autocomplete="on"
					>
						${unsafeHTML(args.slot)}
					</f-input></f-div
				></f-div
			>
		`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "text"
		},

		slot: {
			control: "text"
		},

		placeholder: {
			control: "text"
		},

		variant: {
			control: "select",
			options: ["curved", "round", "block"]
		},

		category: {
			control: "select",
			options: ["fill", "transparent", "outline"]
		},

		type: {
			control: "select",
			options: ["text", "number", "email", "password", "url", "tel"]
		},

		state: {
			control: "select",
			options: ["default", "success", "primary", "warning", "danger"]
		},

		size: {
			control: "radio",
			options: ["small", "medium"]
		},

		["icon-left"]: {
			control: "text"
		},

		["icon-right"]: {
			control: "text"
		},

		["prefix"]: {
			control: "text"
		},

		["suffix"]: {
			control: "text"
		},

		loading: {
			control: "boolean"
		},

		disabled: {
			control: "boolean"
		},

		readOnly: {
			control: "boolean"
		},

		clear: {
			control: "boolean"
		},

		["max-length"]: {
			control: "text"
		}
	},

	args: {
		value: null,
		placeholder: "Enter your text here",
		variant: "round",
		category: "fill",
		type: "text",
		state: "default",
		size: "medium",

		slot: `              <f-div slot="label" padding="none" gap="none">Label</f-div>
              <f-text slot="help" variant="para" size="small">This is a Subtext</f-text>`,

		["icon-left"]: undefined,
		["icon-right"]: undefined,
		["prefix"]: undefined,
		["suffix"]: undefined,
		["max-length"]: undefined,
		loading: false,
		disabled: false,
		readOnly: false,
		clear: false
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fInputAnatomy)}</div>`,
	name: "Anatomy"
};

export const Variant = {
	render: args => {
		const variants = ["curved", "round", "block"];
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${variants.map(
					item => html`<f-div>
          <f-input
            value=${value}
            placeholder="Write here"
            @input=${handleValue}
            .variant=${item}
            size="medium"
          >
             <f-div slot="label" padding="none" gap="none">Label (variant="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
      <f-text slot="subtitle" state="secondary" variant="para" size="small">Optional</f-text>
      <f-icon slot="icon-tooltip" source="i-question-filled" tooltip="some info"></f-icon>
          </f-input></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "variant"
};

export const Category = {
	render: args => {
		const categories = ["fill", "outline", "transparent"];
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${categories.map(
					item => html`<f-div>
          <f-input
            value=${value}
            placeholder="Write here"
            @input=${handleValue}
            .category=${item}
            size="medium"
            .variant=${item === "transparent" ? "block" : "curved"}
          >
            <f-div slot="label" padding="none" gap="none">Label (category="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-input></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "category"
};

export const Type = {
	render: args => {
		const types = [
			["text", "number", "email"],
			["password", "tel", "url"]
		];
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div direction="column" gap="medium">
				${types.map(
					item =>
						html` <f-div align="middle-center" padding="large" gap="medium">
							${item.map(
								type =>
									html`<f-div
										><f-input
											value=${value}
											placeholder="Write here"
											@input=${handleValue}
											type=${type}
											size="medium"
										>
											<f-div slot="label" padding="none" gap="none">Label (type="${type}")</f-div>
											<f-text slot="help" variant="para" size="small"
												>This is a Subtext (Helper Text)</f-text
											>
										</f-input></f-div
									>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "type"
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
					<f-input value=${value} placeholder="Write here" @input=${handleValue} size="medium">
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-input></f-div
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
					<f-input
						value=${value}
						placeholder="This is the placeholder"
						@input=${handleValue}
						size="medium"
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-input></f-div
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
          <f-input
            value=${value}
            placeholder="Write here"
            @input=${handleValue}
            size=${item}
          >
            <f-div slot="label" padding="none" gap="none">Label (size="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-input></f-div
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
									html`<f-div
										><f-input
											value=${value}
											placeholder="Write here"
											@input=${handleValue}
											size="medium"
											state=${state}
										>
											<f-div slot="label" padding="none" gap="none">Label (state="${state}")</f-div>
											<f-text slot="help" variant="para" size="small"
												>This is a Subtext (Helper Text)</f-text
											>
										</f-input></f-div
									>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state"
};

export const IconLeft = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-input
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						icon-left="i-app"
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for icon-left="i-app" prop</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-input></f-div
				></f-div
			>
		`;
	},

	name: "icon-left"
};

export const IconRight = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-input
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						icon-left="i-app"
						icon-right="i-delete"
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for icon-right="i-app" prop</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-input></f-div
				></f-div
			>
		`;
	},

	name: "icon-right"
};

export const Prefix = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-input
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						icon-left="i-app"
						icon-right="i-delete"
						prefix="+91"
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none">This is a demo for prefix</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-input></f-div
				></f-div
			>
		`;
	},

	name: "prefix"
};

export const Suffix = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-input
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						icon-left="i-app"
						icon-right="i-delete"
						prefix="+91"
						suffix="Delete"
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none">This is a demo for suffix</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-input></f-div
				></f-div
			>
		`;
	},

	name: "suffix"
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
					<f-input
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						icon-left="i-app"
						icon-right="i-delete"
						prefix="+91"
						suffix="Delete"
						max-length="10"
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-input></f-div
				></f-div
			>
		`;
	},

	name: "max-length"
};

export const Flags = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${[0, 1, 2, 3].map(
					item => html`<f-div>
          <f-input
            value=${value}
            placeholder="Write here"
            @input=${handleValue}
            size="medium"
            ?loading=${item === 0 ? true : false}
            ?disabled=${item === 1 ? true : false}
            ?clear=${item === 2 ? true : false}
            ?read-only=${item === 3 ? true : false}
          >
            <f-div slot="label" padding="none" gap="none">${
							item === 0
								? "Loader"
								: item === 1
								? "Disabled"
								: item === 2
								? "Clear Icon on Type"
								: "Readonly"
						}</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-input></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "Flags"
};
