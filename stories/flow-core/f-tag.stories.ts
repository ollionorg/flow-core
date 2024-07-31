import { html } from "lit-html";
import fTagAnatomy from "../svg/i-ftag-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";

export default {
	title: "@nonfx/flow-core/f-tag",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, string>) =>
		html` <f-tag
			.label=${args.label}
			.category=${args.category}
			.size=${args.size}
			.state=${args.state}
			icon-left=${args["icon-left"]}
			max-width=${args["max-width"]}
			icon-right=${args["icon-right"]}
			.counter=${args.counter}
			.loading=${args.loading}
			.disabled=${args.disabled}
			.selected=${args.selected}
			?clickable=${args.clickable}
		></f-tag>`,

	name: "Playground",

	argTypes: {
		label: {
			control: "text"
		},

		size: {
			control: "select",
			options: ["large", "medium", "small"]
		},
		category: {
			control: "select",
			options: ["fill", "outline"]
		},

		state: {
			control: "select",

			options: [
				"primary",
				"neutral",
				"success",
				"warning",
				"danger",
				"inherit",
				"custom, #0000FF",
				"custom, gray",
				"custom, #fff",
				"custom, white",
				"custom, black",
				"custom, #607B9F"
			]
		},

		["icon-left"]: {
			control: "text"
		},
		["max-width"]: {
			control: "text"
		},
		["icon-right"]: {
			control: "text"
		},

		counter: {
			control: "text"
		},

		loading: {
			control: "boolean",

			if: {
				arg: "selected",
				eq: false
			}
		},

		disabled: {
			control: "boolean",

			if: {
				arg: "selected",
				eq: false
			}
		},

		selected: {
			control: "boolean"
		},

		clickable: {
			control: {
				type: "boolean"
			},

			if: {
				arg: "disabled",
				eq: false
			}
		}
	},

	args: {
		label: "Lorem Ipsum is simply dummy text of the printing and typesetting",
		size: "medium",
		category: "fill",
		state: "neutral",
		["max-width"]: "240px",
		["icon-left"]: undefined,
		["icon-right"]: undefined,
		counter: undefined,
		loading: false,
		disabled: false,
		selected: false,
		clickable: false
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fTagAnatomy)}</div>`,
	name: "Anatomy"
};

export const Size = {
	render: () =>
		html`<f-div gap="x-large" padding="x-large" align="middle-center">
			<f-tag size="large" label="Large" state="neutral"></f-tag>
			<f-tag size="medium" label="Medium" state="neutral"></f-tag>
			<f-tag size="small" label="Small" state="neutral"></f-tag>
		</f-div>`,

	name: "size"
};

export const State = {
	render: () =>
		html`<f-div gap="x-large" padding="x-large" align="middle-center" state="primary">
			<f-tag size="medium" label="Neutral" state="neutral"></f-tag>
			<f-tag size="medium" label="Primary" state="primary"></f-tag>
			<f-tag size="medium" label="Success" state="success"></f-tag>
			<f-tag size="medium" label="Warning" state="warning"></f-tag>
			<f-tag size="medium" label="Danger" state="danger"></f-tag>
			<f-tag size="medium" label="Inherit from Parent" state="inherit"></f-tag>
			<f-tag size="medium" label="Custom" state="custom, pink"></f-tag>
		</f-div>`,

	name: "state"
};
export const Category = {
	render: () =>
		html`<f-div gap="x-large" padding="x-large" align="middle-center">
			<f-tag size="medium" category="fill" label="Fill" state="neutral"></f-tag>
			<f-tag size="medium" category="outline" label="outline" state="neutral"></f-tag>
		</f-div>`,

	name: "category"
};

export const Label = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="row" align="middle-center">
			<f-tag label="Label" state="neutral"></f-tag>
			<f-tag state="neutral" icon-left="i-star"></f-tag>
		</f-div>`,

	name: "label"
};

export const IconLeft = {
	render: () =>
		html`<f-div gap="large" padding="x-large" align="middle-center" direction="row">
			<f-tag label="icon left" icon-left="i-star" state="neutral"></f-tag>
			<f-tag icon-left="i-star" state="neutral"></f-tag>
		</f-div>`,

	name: "icon-left"
};

export const IconRight = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="row" align="middle-center">
			<f-tag label="icon right" icon-right="i-star" state="neutral"></f-tag>
			<f-tag
				icon-left="i-star"
				label="icon left & right"
				icon-right="💰"
				state="custom,white"
			></f-tag>
		</f-div>`,

	name: "icon-right"
};

export const MaxWidth = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="column" align="middle-left">
			<f-tag label="max-width:100px" max-width="100px" state="neutral"></f-tag>
			<f-tag
				label="max-width:200px;Testing lengthy text will get ellipsis"
				max-width="200px"
			></f-tag>
			<f-tag
				label="max-width:300px;Testing lengthy text will get ellipsis"
				max-width="300px"
			></f-tag>
		</f-div>`,

	name: "max-width"
};

export const Counter = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="row" align="middle-center">
			<f-tag label="Label" state="neutral" counter="88"></f-tag>
			<f-tag label="Label" state="neutral" icon-left="i-star" counter="88"></f-tag>
			<f-tag label="Label" state="neutral" icon-right="i-star" counter="88"></f-tag>
			<f-tag state="neutral" icon-left="i-star" counter="88"></f-tag>
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
				<f-tag state="neutral" label="label"></f-tag>
				<f-tag state="neutral" label="label" .loading=${true}></f-tag>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-tag state="neutral" label="label" icon-left="i-plus"></f-tag>
				<f-tag state="neutral" label="label" .loading=${true} icon-left="i-plus"></f-tag>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-tag state="neutral" label="label" icon-right="i-plus"></f-tag>
				<f-tag state="neutral" label="label" .loading=${true} icon-right="i-plus"></f-tag>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Disabled</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-tag state="neutral" label="label"></f-tag>
				<f-tag state="neutral" label="label" .disabled=${true}></f-tag>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Clickable</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-tag state="neutral" label="label"></f-tag>
				<f-tag state="neutral" label="label" .clickable=${true}></f-tag>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Selected</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-tag state="neutral" label="label"></f-tag>
				<f-tag state="neutral" label="label" .selected=${true}></f-tag>
			</f-div>
		</f-div>`,

	name: "Flags"
};
