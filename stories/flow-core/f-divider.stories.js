import { html } from "lit-html";
import fDividerAnatomy from "../svg/i-fdivider-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";

export default {
	title: "@nonfx/flow-core/f-divider",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args =>
		html`<f-div direction="column" padding="x-large"
			><f-divider variant=${args.variant} size=${args.size} state=${args.state}></f-divider
		></f-div>`,

	name: "Playground",

	argTypes: {
		variant: {
			control: "select",
			options: ["solid", "dashed", "dotted"]
		},

		size: {
			control: "select",
			options: ["large", "medium"]
		},

		state: {
			control: "select",

			options: [
				"default",
				"secondary",
				"subtle",
				"custom, #0000FF",
				"custom, gray",
				"custom, #fff",
				"custom, white",
				"custom, black",
				"custom, #607B9F"
			]
		}
	},

	args: {
		variant: "solid",
		size: "medium",
		state: "default"
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fDividerAnatomy)}</div>`,
	name: "Anatomy"
};

export const Specifications = {
	render: () =>
		html` <f-div direction="row" gap="auto" padding="large none none none">
				<f-div padding="none x-large" height="hug-content">Row layout</f-div>
				<f-div padding="none x-large" height="hug-content">Column layout</f-div>
			</f-div>
			<f-div padding="x-large" gap="x-large" direction="row">
				<f-div
					padding="large"
					gap="x-large"
					border="medium solid default around"
					direction="row"
					height="486px"
				>
					<f-div
						padding="large"
						gap="large"
						border="medium dashed secondary around"
						height="100%"
						direction="column"
					>
						<f-div height="80px" padding="none" state="secondary" variant="curved"></f-div>
						<f-div height="80px" padding="none" state="secondary" variant="curved"></f-div>
						<f-div height="200px" padding="none" state="secondary" variant="curved"></f-div>
					</f-div>
					<f-divider></f-divider>
					<f-div
						padding="none"
						gap="large"
						state="secondary"
						height="444px"
						variant="curved"
					></f-div>
				</f-div>
				<f-div
					padding="large"
					gap="x-large"
					border="medium solid default around"
					height="486px"
					direction="column"
				>
					<f-div
						padding="large"
						gap="large"
						border="medium dashed secondary around"
						height="hug-content"
						direction="column"
					>
						<f-div height="80px" padding="none" state="secondary" variant="curved"></f-div>
						<f-div height="80px" padding="none" state="secondary" variant="curved"></f-div>
					</f-div>
					<f-divider></f-divider>
					<f-div
						padding="none"
						state="secondary"
						height="164px"
						variant="curved"
						width="100%"
					></f-div>
				</f-div>
			</f-div>`,

	name: "Specifications"
};

export const Variant = {
	render: args =>
		html`<f-div gap="medium" padding="x-large" direction="column">
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Solid</f-text>
			</f-div>
			<f-divider variant="solid"></f-divider>
			<br />
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Dotted</f-text>
			</f-div>
			<f-divider variant="dotted"></f-divider>
			<br />
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Dashed</f-text>
			</f-div>
			<f-divider variant="dashed"></f-divider>
		</f-div>`,

	name: "variant"
};

export const Size = {
	render: args =>
		html`<f-div gap="medium" padding="x-large" direction="column">
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">large</f-text>
			</f-div>
			<f-divider size="large"></f-divider>
			<br />
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">medium</f-text>
			</f-div>
			<f-divider size="medium"></f-divider>
		</f-div>`,

	name: "size"
};

export const State = {
	render: args =>
		html`<f-div gap="medium" padding="x-large" direction="column">
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">state="default"</f-text>
			</f-div>
			<f-divider size="large" state="default"></f-divider>
			<br />
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">state="secondary"</f-text>
			</f-div>
			<f-divider size="large" state="secondary"></f-divider>
			<br />
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">state="subtle"</f-text>
			</f-div>
			<f-divider size="large" state="subtle"></f-divider>
			<br />
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">state="custom,black"</f-text>
			</f-div>
			<f-divider size="large" state="custom,black"></f-divider>
		</f-div>`,

	name: "state"
};
