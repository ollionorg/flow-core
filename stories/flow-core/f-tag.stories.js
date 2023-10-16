import { html } from "lit-html";
import fTagAnatomy from "../svg/i-ftag-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";

export default {
	title: "@cldcvr/flow-core/f-tag",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args =>
		html` <f-div padding="large" width="150px">
			<f-tag
				.label=${args.label}
				.size=${args.size}
				.state=${args.state}
				icon-left=${args["icon-left"]}
				icon-right=${args["icon-right"]}
				.counter=${args.counter}
				.loading=${args.loading}
				.disabled=${args.disabled}
				.selected=${args.selected}
				?clickable=${args.clickable}
			></f-tag
		></f-div>`,

	name: "Playground",

	argTypes: {
		label: {
			control: "text"
		},

		size: {
			control: "select",
			options: ["large", "medium", "small"]
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
		label: "labelsdjkhfsjhgmndf sdfgjdf sgdfhsd dghgfjhsdgfgjsdfnmsgdfjhgsdjfjsdgfhegfjehwgjfgwegj",
		size: "medium",
		state: "neutral",
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
	render: args =>
		html`<f-div gap="x-large" padding="x-large" align="middle-center">
			<f-tag size="large" label="Large" state="neutral"></f-tag>
			<f-tag size="medium" label="Medium" state="neutral"></f-tag>
			<f-tag size="small" label="Small" state="neutral"></f-tag>
		</f-div>`,

	name: "size"
};

export const State = {
	render: args =>
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

export const Label = {
	render: args =>
		html`<f-div gap="large" padding="x-large" direction="row" align="middle-center">
			<f-tag label="Label" state="neutral"></f-tag>
			<f-tag state="neutral" icon-left="i-star"></f-tag>
		</f-div>`,

	name: "label"
};

export const IconLeft = {
	render: args =>
		html`<f-div gap="large" padding="x-large" align="middle-center" direction="row">
			<f-tag label="icon left" icon-left="i-star" state="neutral"></f-tag>
			<f-tag icon-left="i-star" state="neutral"></f-tag>
		</f-div>`,

	name: "icon-left"
};

export const IconRight = {
	render: args =>
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

export const Counter = {
	render: args =>
		html`<f-div gap="large" padding="x-large" direction="row" align="middle-center">
			<f-tag label="Label" state="neutral" counter="88"></f-tag>
			<f-tag label="Label" state="neutral" icon-left="i-star" counter="88"></f-tag>
			<f-tag label="Label" state="neutral" icon-right="i-star" counter="88"></f-tag>
			<f-tag state="neutral" icon-left="i-star" counter="88"></f-tag>
		</f-div>`,

	name: "counter"
};

export const Flags = {
	render: args =>
		html`<f-div gap="large" padding="x-large" direction="column">
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Loading</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-tag state="neutral" label="label"></f-tag>
				<f-tag state="neutral" label="label" loading=${true}></f-tag>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-tag state="neutral" label="label" icon-left="i-plus"></f-tag>
				<f-tag state="neutral" label="label" loading=${true} icon-left="i-plus"></f-tag>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-tag state="neutral" label="label" icon-right="i-plus"></f-tag>
				<f-tag state="neutral" label="label" loading=${true} icon-right="i-plus"></f-tag>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Disabled</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-tag state="neutral" label="label"></f-tag>
				<f-tag state="neutral" label="label" disabled=${true}></f-tag>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Clickable</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-tag state="neutral" label="label"></f-tag>
				<f-tag state="neutral" label="label" clickable=${true}></f-tag>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Selected</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-tag state="neutral" label="label"></f-tag>
				<f-tag state="neutral" label="label" selected=${true}></f-tag>
			</f-div>
		</f-div>`,

	name: "Flags"
};
