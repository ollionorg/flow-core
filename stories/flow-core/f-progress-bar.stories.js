import { html } from "lit-html";
import fProgressBarAnatomy from "../svg/i-fprogress-bar-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";

export default {
	title: "@ollion/flow-core/f-progress-bar",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args =>
		html`<f-div direction="row" padding="x-large" gap="medium"
			><f-progress-bar
				.value=${args.value}
				.variant=${args.variant}
				.size=${args.size}
				.state=${args.state}
				.width=${args.width}
			></f-progress-bar>
		</f-div>`,

	name: "Playground",

	argTypes: {
		value: {
			control: "text"
		},

		variant: {
			control: "radio",
			options: ["curved", "block"]
		},

		size: {
			control: "radio",
			options: ["large", "medium", "small", "x-small"]
		},

		state: {
			control: "select",

			options: [
				"default",
				"primary",
				"success",
				"warning",
				"danger",
				"custom, #0000FF",
				"custom, gray",
				"custom, #fff",
				"custom, white",
				"custom, black",
				"custom, #607B9F"
			]
		},

		width: {
			control: "select",
			options: ["fill-container", "150px", "200px", "300px", "450px"]
		}
	},

	args: {
		value: "30%",
		variant: "block",
		size: "medium",
		state: "default",
		width: "fill-container"
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fProgressBarAnatomy)}</div>`,
	name: "Anatomy"
};

export const Value = {
	render: args => {
		return html`<f-div direction="row" padding="x-large" gap="medium"
			><f-progress-bar value="30%" variant="curved" state="success"></f-progress-bar>
			<f-div width="hug-content"
				><f-text variant="para" size="small" state="success">30%</f-text></f-div
			>
		</f-div>`;
	},

	name: "value"
};

export const Variant = {
	render: args => {
		const variants = ["block", "curved"];

		return html`<f-div direction="row" gap="medium"
			>${variants.map(
				item =>
					html`<f-div direction="row" padding="x-large" gap="medium"
						><f-progress-bar value="30%" .variant=${item}></f-progress-bar>
						<f-div width="hug-content"
							><f-text variant="para" size="small" .state=${args.state}
								>variant="${item}"</f-text
							></f-div
						>
					</f-div>`
			)}</f-div
		>`;
	},

	name: "variant"
};

export const Size = {
	render: args => {
		const sizes = ["large", "medium", "small", "x-small"];

		return html`<f-div direction="column" gap="medium"
			>${sizes.map(
				item =>
					html`<f-div direction="row" padding="x-large" gap="medium"
						><f-progress-bar
							value="30%"
							.size=${item}
							variant="curved"
							state="primary"
						></f-progress-bar>
						<f-div width="20%"
							><f-text variant="para" size="small" .state=${args.state}
								>size="${item}"</f-text
							></f-div
						>
					</f-div>`
			)}</f-div
		>`;
	},

	name: "size"
};

export const State = {
	render: args => {
		const states = ["default", "primary", "success", "danger", "warning", "custom,#fff"];

		return html`<f-div direction="column" gap="medium"
			>${states.map(
				item =>
					html`<f-div direction="row" padding="x-large" gap="medium"
						><f-progress-bar value="30%" .state=${item} variant="curved"></f-progress-bar>
						<f-div width="20%"
							><f-text variant="para" size="small" .state=${args.state}
								>state="${item}"</f-text
							></f-div
						>
					</f-div>`
			)}</f-div
		>`;
	},

	name: "state"
};

export const Width = {
	render: args => {
		const widths = ["fill-container", "300px"];

		return html`<f-div direction="column" gap="medium"
			>${widths.map(
				item =>
					html`<f-div direction="row" padding="x-large" gap="medium"
						><f-progress-bar
							value="30%"
							.width=${item}
							variant="curved"
							state="primary"
						></f-progress-bar>
						<f-div width="20%"
							><f-text variant="para" size="small" .state=${args.state}
								>width="${item}"</f-text
							></f-div
						>
					</f-div>`
			)}</f-div
		>`;
	},

	name: "width"
};
