import { html } from "lit-html";
import fIconButtonAnatomy from "../svg/i-ficon-button-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";

export default {
	title: "@nonfx/flow-core/f-icon-button",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, unknown>) =>
		html`<f-div direction="column" padding="x-large">
			<f-icon-button
				.effect=${args.effect}
				icon=${args.icon}
				.variant=${args.variant}
				.category=${args.category}
				.size=${args.size}
				.state=${args.state}
				counter=${args.counter}
				.loading=${args.loading}
				.disabled=${args.disabled}
			></f-icon-button>
		</f-div>`,

	name: "Playground",

	argTypes: {
		variant: {
			control: "select",
			options: ["round", "curved", "block"]
		},

		category: {
			control: "select",
			options: ["fill", "outline", "transparent", "packed"]
		},

		size: {
			control: "select",
			options: ["large", "medium", "small", "x-small"]
		},

		state: {
			control: "select",

			options: [
				"primary",
				"success",
				"danger",
				"warning",
				"neutral",
				"inherit",
				"custom, #0000FF",
				"custom, gray",
				"custom, #fff",
				"custom, white",
				"custom, black",
				"custom, #607B9F"
			]
		},
		effect: {
			control: "radio",
			options: ["pulse", "wiggle"]
		},

		loading: {
			control: {
				type: "boolean"
			},

			if: {
				arg: "disabled",
				eq: false
			}
		},

		disabled: {
			control: {
				type: "boolean"
			},

			if: {
				arg: "loading",
				eq: false
			}
		}
	},

	args: {
		variant: "round",
		category: "fill",
		size: "medium",
		icon: "i-plus",
		state: "primary",
		counter: "",
		effect: undefined,
		loading: false,
		disabled: false
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fIconButtonAnatomy)}</div>`,
	name: "Anatomy"
};

export const Variant = {
	render: () =>
		html`<f-div gap="x-large" padding="x-large" align="middle-center">
			<f-icon-button icon="i-plus" variant="round"></f-icon-button>
			<f-icon-button icon="i-plus" variant="curved"></f-icon-button>
			<f-icon-button icon="i-plus" variant="block"></f-icon-button>
		</f-div>`,

	name: "variant"
};

export const Category = {
	render: () =>
		html`<f-div gap="x-large" padding="x-large" align="middle-center">
			<f-icon-button icon="i-plus" category="fill"></f-icon-button>
			<f-icon-button icon="i-plus" category="outline"></f-icon-button>
			<f-icon-button icon="i-plus" category="transparent"></f-icon-button>
			<f-icon-button icon="i-plus" category="packed"></f-icon-button>
		</f-div>`,

	name: "category"
};

export const Size = {
	render: () =>
		html`<f-div gap="x-large" padding="x-large" align="middle-center">
			<f-div padding="none" gap="large" direction="column" align="middle-center">
				<f-text variant="para" weight="regular" size="medium">large</f-text>
				<f-icon-button icon="i-plus" size="large"></f-icon-button>
			</f-div>
			<f-div padding="none" gap="large" direction="column" align="middle-center">
				<f-text variant="para" weight="regular" size="medium">medium</f-text>
				<f-icon-button icon="i-plus" size="medium"></f-icon-button>
			</f-div>
			<f-div padding="none" gap="large" direction="column" align="middle-center">
				<f-text variant="para" weight="regular" size="medium">small</f-text>
				<f-icon-button icon="i-plus" size="small"></f-icon-button>
			</f-div>
			<f-div padding="none" gap="large" direction="column" align="middle-center">
				<f-text variant="para" weight="regular" size="medium">x-small</f-text>
				<f-icon-button icon="i-plus" size="x-small"></f-icon-button>
			</f-div>
		</f-div>`,

	name: "size"
};

export const State = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="column">
			<f-text variant="para" weight="regular" size="medium">state="primary"</f-text>
			<f-div padding="none" gap="x-large">
				<f-icon-button icon="i-plus" category="fill" state="primary"></f-icon-button>
				<f-icon-button icon="i-plus" category="outline" state="primary"></f-icon-button>
				<f-icon-button icon="i-plus" category="transparent" state="primary"></f-icon-button>
			</f-div>
			<f-text variant="para" weight="regular" size="medium">state="neutral"</f-text>
			<f-div padding="none" gap="x-large">
				<f-icon-button icon="i-plus" category="fill" state="neutral"></f-icon-button>
				<f-icon-button icon="i-plus" category="outline" state="neutral"></f-icon-button>
				<f-icon-button icon="i-plus" category="transparent" state="neutral"></f-icon-button>
			</f-div>
			<f-text variant="para" weight="regular" size="medium">state="success"</f-text>
			<f-div padding="none" gap="x-large">
				<f-icon-button icon="i-plus" category="fill" state="success"></f-icon-button>
				<f-icon-button icon="i-plus" category="outline" state="success"></f-icon-button>
				<f-icon-button icon="i-plus" category="transparent" state="success"></f-icon-button>
			</f-div>
			<f-text variant="para" weight="regular" size="medium">state="warning"</f-text>
			<f-div padding="none" gap="x-large">
				<f-icon-button icon="i-plus" category="fill" state="warning"></f-icon-button>
				<f-icon-button icon="i-plus" category="outline" state="warning"></f-icon-button>
				<f-icon-button icon="i-plus" category="transparent" state="warning"></f-icon-button>
			</f-div>
			<f-text variant="para" weight="regular" size="medium">state="danger"</f-text>
			<f-div padding="none" gap="x-large">
				<f-icon-button icon="i-plus" category="fill" state="danger"></f-icon-button>
				<f-icon-button icon="i-plus" category="outline" state="danger"></f-icon-button>
				<f-icon-button icon="i-plus" category="transparent" state="danger"></f-icon-button>
			</f-div>
			<f-text variant="para" weight="regular" size="medium">state="inherit"</f-text>
			<f-div padding="none" gap="x-large" state="warning">
				<f-icon-button icon="i-plus" category="fill" state="inherit"></f-icon-button>
				<f-icon-button icon="i-plus" category="outline" state="inherit"></f-icon-button>
				<f-icon-button icon="i-plus" category="transparent" state="inherit"></f-icon-button>
			</f-div>
			<f-text variant="para" weight="regular" size="medium">state="custom,pink"</f-text>
			<f-div padding="none" gap="x-large">
				<f-icon-button icon="i-plus" category="fill" state="custom, pink"></f-icon-button>
				<f-icon-button icon="i-plus" category="outline" state="custom, pink"></f-icon-button>
				<f-icon-button icon="i-plus" category="transparent" state="custom, pink"></f-icon-button>
			</f-div>
		</f-div>`,

	name: "state"
};

export const Effect = {
	render: () =>
		html`<f-div gap="x-large" padding="x-large" align="middle-center">
			<f-div direction="column" gap="medium" overflow="visible" align="middle-center">
				<f-text>effect="pulse"</f-text>
				<f-icon-button icon="i-plus" effect="pulse" variant="round"></f-icon-button>
			</f-div>
			<f-div direction="column" gap="medium" overflow="visible" align="middle-center">
				<f-text>effect="wiggle"</f-text>
				<f-icon-button icon="i-plus" effect="wiggle" variant="curved"></f-icon-button>
			</f-div>
		</f-div>`,

	name: "effect"
};

export const Icon = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="column" align="middle-center">
			<f-icon-button icon="i-plus"></f-icon-button>
		</f-div>`,

	name: "icon"
};

export const Counter = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="column" align="middle-center">
			<f-icon-button icon="i-plus" counter="88"></f-icon-button>
		</f-div>`,

	name: "counter"
};

export const Flags = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="column">
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Loading</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-icon-button icon="i-plus"></f-icon-button>
				<f-icon-button icon="i-plus" loading=${true}></f-icon-button>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Disabled</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-icon-button icon="i-plus"></f-icon-button>
				<f-icon-button icon="i-plus" disabled=${true}></f-icon-button>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium"
					>Clickable (Icon Button is always clickable)</f-text
				>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-icon-button icon="i-plus"></f-icon-button>
			</f-div>
		</f-div>`,

	name: "Flags"
};

export const Tooltip = {
	render: () =>
		html`<f-div gap="large" padding="x-large" align="middle-center">
			<f-icon-button icon="i-plus" tooltip="This is a tooltip"></f-icon-button>
		</f-div>`,

	name: "tooltip"
};
