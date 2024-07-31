import { html } from "lit-html";
import fInputAnatomy from "../svg/i-finput-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useState } from "@storybook/preview-api";

export default {
	title: "@nonfx/flow-core/f-input",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, unknown>) => {
		const handleInput = (e: CustomEvent) => {
			console.log(e.detail);
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
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext</f-text>
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
	render: () => {
		const variants = ["curved", "round", "block"];
		const [value, setValue] = useState("");

		const handleValue = (e: CustomEvent) => {
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
	render: () => {
		const categories = ["fill", "outline", "transparent"];
		const [value, setValue] = useState("");

		const handleValue = (e: CustomEvent) => {
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
	render: () => {
		const types = [
			["text", "number", "email"],
			["password", "tel", "url"]
		];
		const [value, setValue] = useState("");

		const handleValue = (e: CustomEvent) => {
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
	render: () => {
		const [value, setValue] = useState("Value Here");

		const handleValue = (e: CustomEvent) => {
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
	render: () => {
		const [value, setValue] = useState("");

		const handleValue = (e: CustomEvent) => {
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
	render: () => {
		const sizes = ["small", "medium"];
		const [value, setValue] = useState("");

		const handleValue = (e: CustomEvent) => {
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
	render: () => {
		const states = [
			["default", "primary", "success"],
			["danger", "warning", "default"]
		];
		const [value, setValue] = useState("");

		const handleValue = (e: CustomEvent) => {
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
	render: () => {
		const [value, setValue] = useState("");

		const handleValue = (e: CustomEvent) => {
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
	render: () => {
		const [value, setValue] = useState("");

		const handleValue = (e: CustomEvent) => {
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
	render: () => {
		const [value, setValue] = useState("");

		const handleValue = (e: CustomEvent) => {
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
	render: () => {
		const [value, setValue] = useState("");

		const handleValue = (e: CustomEvent) => {
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
	render: () => {
		const [value, setValue] = useState("");

		const handleValue = (e: CustomEvent) => {
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
	render: () => {
		const [value, setValue] = useState("");

		const handleValue = (e: CustomEvent) => {
			setValue(e.detail.value);
		};
		const flagNames: Record<number, string> = {
			0: "Loader",
			1: "Disabled",
			2: "Clear Icon on Type",
			3: "Readonly"
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
            ?loading=${item === 0}
            ?disabled=${item === 1}
            ?clear=${item === 2}
            ?read-only=${item === 3}
          >
            <f-div slot="label" padding="none" gap="none">${flagNames[item]}</f-div>
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
