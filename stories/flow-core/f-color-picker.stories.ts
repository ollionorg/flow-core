import { html } from "lit-html";

export default {
	title: "@nonfx/flow-core/f-color-picker",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, unknown>) => {
		return html`<f-color-picker
			aria-label="Color Picker"
			.variant=${args.variant}
			.state=${args.state}
			.size=${args.size}
			.value=${args.value}
			.disabled=${args.disabled}
			.readOnly=${args["read-only"]}
		></f-color-picker>`;
	},

	name: "Playground",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	},

	argTypes: {
		variant: {
			control: "select",
			options: ["curved", "round", "block"]
		},
		state: {
			control: "select",
			options: ["default", "success", "warning", "danger", "primary"]
		},
		size: {
			control: "select",
			options: ["medium", "small"]
		},
		value: {
			control: "text"
		},
		disabled: {
			control: "boolean"
		},
		["read-only"]: {
			control: "boolean"
		}
	},

	args: {
		variant: "curved",
		state: "default",
		size: "medium",
		value: "#000",
		disabled: false,
		["read-only"]: false
	}
};

export const Variant = {
	render: () => {
		const variants = ["curved", "round", "block"];

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${variants.map(
					item =>
						html` <f-color-picker .variant=${item} size="medium">
							<f-div slot="label" padding="none" gap="none">Label (variant="${item}")</f-div>
							<f-text slot="help" variant="para" size="small"
								>This is a Subtext (Helper Text)</f-text
							>
							<f-text slot="subtitle" state="secondary" variant="para" size="small"
								>Optional</f-text
							>
							<f-icon slot="icon-tooltip" source="i-question-filled" tooltip="some info"></f-icon>
						</f-color-picker>`
				)}
			</f-div>
		`;
	},

	name: "variant"
};

export const Size = {
	render: () => {
		const sizes = ["small", "medium"];

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${sizes.map(
					item =>
						html` <f-color-picker size=${item}>
							<f-div slot="label" padding="none" gap="none">Label (size="${item}")</f-div>
							<f-text slot="help" variant="para" size="small"
								>This is a Subtext (Helper Text)</f-text
							>
						</f-color-picker>`
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
			["danger", "warning"]
		];

		return html`
			<f-div direction="column" gap="medium">
				${states.map(
					item =>
						html` <f-div padding="large" gap="medium">
							${item.map(
								state =>
									html`<f-color-picker size="medium" state=${state}>
										<f-div slot="label" padding="none" gap="none">Label (state="${state}")</f-div>
										<f-text slot="help" variant="para" size="small"
											>This is a Subtext (Helper Text)</f-text
										>
									</f-color-picker>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state"
};

export const Flags = {
	render: () => {
		const flagNames: Record<number, string> = {
			0: "Disabled",
			1: "Readonly"
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${[0, 1].map(
					item =>
						html` <f-color-picker size="medium" ?disabled=${item === 0} ?read-only=${item === 1}>
							<f-div slot="label" padding="none" gap="none">${flagNames[item]}</f-div>
							<f-text slot="help" variant="para" size="small"
								>This is a Subtext (Helper Text)</f-text
							>
						</f-color-picker>`
				)}
			</f-div>
		`;
	},

	name: "Flags"
};
