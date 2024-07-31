import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import FCarouselAnatomy from "../svg/i-fcarousel-anatomy.js";

export default {
	title: "@nonfx/flow-core/f-carousel",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const handleNext = e => {
			console.log("in next callback", e);
		};

		const handlePrev = e => {
			console.log("in previous callback", e);
		};

		return html`<f-div width="100%" padding="large">
			<f-carousel
				.autoPlay=${args["auto-play"]}
				.autoPlayInterval=${args["auto-play-interval"]}
				.activeContentId=${args["active-content-id"]}
				@next=${handleNext}
				@prev=${handlePrev}
			>
				${["primary", "secondary", "tertiary", "warning", "danger"].map(
					(state, idx) =>
						html`<f-carousel-content content-id=${"slide-" + (idx + 1)}>
							<f-div
								height="300px"
								width="100%"
								padding="large"
								gap="large"
								variant="curved"
								align="middle-center"
								.state=${state}
							>
								<f-text size="x-large" weight="bold" variant="heading" state="inherit"
									>${"slide-" + (idx + 1)}</f-text
								>
							</f-div>
						</f-carousel-content>`
				)}
			</f-carousel>
		</f-div>`;
	},

	name: "Playground",

	argTypes: {
		["active-content-id"]: {
			control: "select",
			options: ["slide-1", "slide-2", "slide-3", "slide-4", "slide-5"]
		},

		["auto-play"]: {
			control: "boolean"
		},

		["auto-play-interval"]: {
			control: "number"
		}
	},

	args: {
		["active-content-id"]: "slide-3",
		["auto-play"]: true,
		["auto-play-interval"]: 5000
	}
};

export const Anatomy = {
	render: () =>
		html`<f-div align="middle-center" padding="large">${unsafeSVG(FCarouselAnatomy)}</f-div>`,
	name: "Anatomy"
};

export const ActiveContentId = {
	render: args => {
		return html`<f-div width="100%" padding="large">
			<f-carousel active-content-id="slide-3">
				${["primary", "secondary", "tertiary", "warning", "danger"].map(
					(state, idx) =>
						html`<f-carousel-content content-id=${"slide-" + (idx + 1)}>
							<f-div
								height="300px"
								width="100%"
								padding="large"
								gap="large"
								variant="curved"
								align="middle-center"
								.state=${state}
							>
								<f-text size="x-large" weight="bold" variant="heading" state="inherit">
									${"slide-" + (idx + 1)}</f-text
								>
								<f-text size="small">active-content-id set to ${"slide-" + (idx + 1)}</f-text>
							</f-div>
						</f-carousel-content>`
				)}
			</f-carousel>
		</f-div>`;
	},

	name: "active-content-id"
};

export const AutoPlay = {
	render: args => {
		return html`<f-div width="100%" padding="large">
			<f-carousel auto-play>
				${["primary", "secondary", "tertiary", "warning", "danger"].map(
					(state, idx) =>
						html`<f-carousel-content content-id=${"slide-" + (idx + 1)}>
							<f-div
								height="300px"
								width="100%"
								padding="large"
								gap="large"
								variant="curved"
								align="middle-center"
								.state=${state}
							>
								<f-text size="x-large" weight="bold" variant="heading" state="inherit">
									${"slide-" + (idx + 1)}</f-text
								>
								<f-text size="small">auto-play set to true</f-text>
							</f-div>
						</f-carousel-content>`
				)}
			</f-carousel>
		</f-div>`;
	},

	name: "auto-play"
};

export const AutoPlayInterval = {
	render: args => {
		return html`<f-div width="100%" padding="large">
			<f-carousel auto-play auto-play-interval="7000">
				${["primary", "secondary", "tertiary", "warning", "danger"].map(
					(state, idx) =>
						html`<f-carousel-content content-id=${"slide-" + (idx + 1)}>
							<f-div
								height="300px"
								width="100%"
								direction="column"
								padding="large"
								gap="large"
								variant="curved"
								align="middle-center"
								.state=${state}
							>
								<f-text size="x-large" weight="bold" variant="heading" state="inherit">
									${"slide-" + (idx + 1)}</f-text
								>
								<f-text size="small">auto-play-interval is 7000ms</f-text>
							</f-div>
						</f-carousel-content>`
				)}
			</f-carousel>
		</f-div>`;
	},

	name: "auto-play-interval"
};
