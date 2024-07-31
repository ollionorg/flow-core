import { html } from "lit-html";
import fSpacerAnatomy from "../svg/i-fspacer-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";

export default {
	title: "@nonfx/flow-core/f-spacer",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args =>
		html` <f-div
			padding="large"
			border="medium solid default around"
			direction="row"
			height="hug-content"
		>
			<f-div
				padding="large"
				gap="large"
				border="medium dashed secondary around"
				height="100%"
				direction="column"
				width="100px"
			>
				<f-div height="80px" padding="none" state="secondary" variant="curved"></f-div>
			</f-div>
			<f-spacer .size=${args.size}></f-spacer>
			<f-div
				width="100px"
				padding="none"
				gap="large"
				state="secondary"
				height="120px"
				variant="curved"
			></f-div>
		</f-div>`,

	name: "Playground",

	argTypes: {
		size: {
			control: "select",
			options: ["fill-container", "x-large", "large", "medium", "small", "x-small"]
		}
	},

	args: {
		size: "medium"
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fSpacerAnatomy)}</div>`,
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
						width="100px"
					>
						<f-div height="80px" padding="none" state="secondary" variant="curved"></f-div>
						<f-div height="80px" padding="none" state="secondary" variant="curved"></f-div>
						<f-div height="200px" padding="none" state="secondary" variant="curved"></f-div>
					</f-div>
					<f-spacer size="fill-container"></f-spacer>
					<f-div
						width="100px"
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
						<f-div height="50px" padding="none" state="secondary" variant="curved"></f-div>
						<f-div height="50px" padding="none" state="secondary" variant="curved"></f-div>
					</f-div>
					<f-spacer size="fill-container"></f-spacer>
					<f-div
						padding="none"
						state="secondary"
						height="124px"
						variant="curved"
						width="100%"
					></f-div>
				</f-div>
			</f-div>`,

	name: "Specifications"
};

export const Size = {
	render: args =>
		html`<f-div gap="medium" padding="x-large" direction="column">
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">size="fill-container"</f-text>
			</f-div>
			<f-div
				padding="large"
				gap="x-large"
				border="medium solid default around"
				direction="row"
				height="hug-content"
			>
				<f-div
					padding="large"
					gap="large"
					border="medium dashed secondary around"
					height="100%"
					direction="column"
					width="100px"
				>
					<f-div height="80px" padding="none" state="secondary" variant="curved"></f-div>
				</f-div>
				<f-spacer size="fill-container"></f-spacer>
				<f-div
					width="100px"
					padding="none"
					gap="large"
					state="secondary"
					height="120px"
					variant="curved"
				></f-div>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">size="x-large"</f-text>
			</f-div>
			<f-div
				padding="large"
				gap="x-large"
				border="medium solid default around"
				direction="row"
				height="hug-content"
			>
				<f-div
					padding="large"
					gap="large"
					border="medium dashed secondary around"
					height="100%"
					direction="column"
					width="100px"
				>
					<f-div height="80px" padding="none" state="secondary" variant="curved"></f-div>
				</f-div>
				<f-spacer size="x-large"></f-spacer>
				<f-div
					width="100px"
					padding="none"
					gap="large"
					state="secondary"
					height="120px"
					variant="curved"
				></f-div>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">size="large"</f-text>
			</f-div>
			<f-div
				padding="large"
				gap="x-large"
				border="medium solid default around"
				direction="row"
				height="hug-content"
			>
				<f-div
					padding="large"
					gap="large"
					border="medium dashed secondary around"
					height="100%"
					direction="column"
					width="100px"
				>
					<f-div height="80px" padding="none" state="secondary" variant="curved"></f-div>
				</f-div>
				<f-spacer size="large"></f-spacer>
				<f-div
					width="100px"
					padding="none"
					gap="large"
					state="secondary"
					height="120px"
					variant="curved"
				></f-div>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">size="medium"</f-text>
			</f-div>
			<f-div
				padding="large"
				gap="x-large"
				border="medium solid default around"
				direction="row"
				height="hug-content"
			>
				<f-div
					padding="large"
					gap="large"
					border="medium dashed secondary around"
					height="100%"
					direction="column"
					width="100px"
				>
					<f-div height="80px" padding="none" state="secondary" variant="curved"></f-div>
				</f-div>
				<f-spacer size="medium"></f-spacer>
				<f-div
					width="100px"
					padding="none"
					gap="large"
					state="secondary"
					height="120px"
					variant="curved"
				></f-div>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">size="small"</f-text>
			</f-div>
			<f-div
				padding="large"
				gap="x-large"
				border="medium solid default around"
				direction="row"
				height="hug-content"
			>
				<f-div
					padding="large"
					gap="large"
					border="medium dashed secondary around"
					height="100%"
					direction="column"
					width="100px"
				>
					<f-div height="80px" padding="none" state="secondary" variant="curved"></f-div>
				</f-div>
				<f-spacer size="small"></f-spacer>
				<f-div
					width="100px"
					padding="none"
					gap="large"
					state="secondary"
					height="120px"
					variant="curved"
				></f-div>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">size="x-small"</f-text>
			</f-div>
			<f-div
				padding="large"
				gap="x-large"
				border="medium solid default around"
				direction="row"
				height="hug-content"
			>
				<f-div
					padding="large"
					gap="large"
					border="medium dashed secondary around"
					height="100%"
					direction="column"
					width="100px"
				>
					<f-div height="80px" padding="none" state="secondary" variant="curved"></f-div>
				</f-div>
				<f-spacer size="x-small"></f-spacer>
				<f-div
					width="100px"
					padding="none"
					gap="large"
					state="secondary"
					height="120px"
					variant="curved"
				></f-div>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">size="300px"</f-text>
			</f-div>
			<f-div
				padding="large"
				gap="x-large"
				border="medium solid default around"
				direction="row"
				height="hug-content"
			>
				<f-div
					padding="large"
					gap="large"
					border="medium dashed secondary around"
					height="100%"
					direction="column"
					width="100px"
				>
					<f-div height="80px" padding="none" state="secondary" variant="curved"></f-div>
				</f-div>
				<f-spacer size="300px"></f-spacer>
				<f-div
					width="100px"
					padding="none"
					gap="large"
					state="secondary"
					height="120px"
					variant="curved"
				></f-div>
			</f-div>
		</f-div>`,

	name: "size"
};
