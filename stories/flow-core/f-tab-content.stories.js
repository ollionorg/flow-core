import { html } from "lit-html";
import FDivAnatomy from "../svg/i-fdiv-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useState, useEffect } from "@storybook/client-api";

export default {
	title: "@nonfx/flow-core/f-tab-content",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		return html`
			<f-tab-content .transition=${args.transition} .duration=${args.duration}
				><f-div direction="column" width="100%" padding="large"
					><f-div
						><f-text variant="heading" size="x-large" weight="bold">Tab Content</f-text></f-div
					>
					<f-div>
						<f-text
							>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
							Ipsum has been the industry's standard dummy text ever since the 1500s, when an
							unknown printer took a galley of type and scrambled it to make a type specimen book.
							It has survived not only five centuries, but also the leap into electronic
							typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
							release of Letraset sheets containing Lorem Ipsum passages, and more recently with
							desktop publishing software like Aldus PageMaker including versions of Lorem
							Ipsum.</f-text
						></f-div
					></f-div
				></f-tab-content
			>
		`;
	},

	name: "Playground",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 250
		}
	},

	argTypes: {
		transition: {
			control: "radio",
			options: ["none", "fade", "slide"]
		},

		duration: {
			control: "number"
		}
	},

	args: {
		transition: "none",
		duration: 200
	}
};

export const Id = {
	render: args => {
		const [selected, setSelected] = useState("uni-1");

		return html`
			<f-div>
				<f-tab
					?active=${selected === "uni-1"}
					content-id="uni-1"
					@click=${() => setSelected("uni-1")}
					>Tab 1</f-tab
				>
				<f-tab
					?active=${selected === "uni-2"}
					content-id="uni-2"
					@click=${() => setSelected("uni-2")}
					>Tab 2</f-tab
				>
			</f-div>
			<f-tab-content transition="fade" id="uni-1"
				><f-div direction="column" width="100%" padding="large"
					><f-div
						><f-text variant="heading" size="x-large" weight="bold">Tab Content - 1</f-text></f-div
					>
					<f-div>
						<f-text
							>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
							Ipsum has been the industry's standard dummy text ever since the 1500s, when an
							unknown printer took a galley of type and scrambled it to make a type specimen book.
							It has survived not only five centuries, but also the leap into electronic
							typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
							release of Letraset sheets containing Lorem Ipsum passages, and more recently with
							desktop publishing software like Aldus PageMaker including versions of Lorem
							Ipsum.</f-text
						></f-div
					></f-div
				></f-tab-content
			>
			<f-tab-content transition="fade" id="uni-2"
				><f-div direction="column" width="100%" padding="large"
					><f-div
						><f-text variant="heading" size="x-large" weight="bold">Tab Content - 2</f-text></f-div
					>
					<f-div>
						<f-text
							>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
							Ipsum has been the industry's standard dummy text ever since the 1500s, when an
							unknown printer took a galley of type and scrambled it to make a type specimen book.
							It has survived not only five centuries, but also the leap into electronic
							typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
							release of Letraset sheets containing Lorem Ipsum passages, and more recently with
							desktop publishing software like Aldus PageMaker including versions of Lorem
							Ipsum.</f-text
						></f-div
					></f-div
				></f-tab-content
			>
		`;
	},

	name: "id",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};

export const Transition = {
	render: args => {
		let [currentTransition, setCurrentTransition] = useState("none");

		return html`
			<f-button
				?disabled=${currentTransition === "fade"}
				label="Fade"
				@click=${() => setCurrentTransition("fade")}
			></f-button>
			<f-button
				?disabled=${currentTransition === "slide"}
				label="slide"
				@click=${() => setCurrentTransition("slide")}
			></f-button>
			<f-button
				?disabled=${currentTransition === "none"}
				label="none"
				@click=${() => setCurrentTransition("none")}
			></f-button>
			<f-tab-content .transition=${currentTransition}
				><f-div direction="column" width="100%" padding="large"
					><f-div
						><f-text variant="heading" size="x-large" weight="bold">Tab Content</f-text></f-div
					>
					<f-div>
						<f-text
							>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
							Ipsum has been the industry's standard dummy text ever since the 1500s, when an
							unknown printer took a galley of type and scrambled it to make a type specimen book.
							It has survived not only five centuries, but also the leap into electronic
							typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
							release of Letraset sheets containing Lorem Ipsum passages, and more recently with
							desktop publishing software like Aldus PageMaker including versions of Lorem
							Ipsum.</f-text
						></f-div
					></f-div
				></f-tab-content
			>
		`;
	},

	name: "transition",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};

export const Duration = {
	render: args => {
		let [currentTransition, setCurrentTransition] = useState("none");

		return html`
			<f-button
				?disabled=${currentTransition === "fade"}
				label="Fade"
				@click=${() => setCurrentTransition("fade")}
			></f-button>
			<f-button
				?disabled=${currentTransition === "slide"}
				label="slide"
				@click=${() => setCurrentTransition("slide")}
			></f-button>
			<f-button
				?disabled=${currentTransition === "none"}
				label="none"
				@click=${() => setCurrentTransition("none")}
			></f-button>
			<f-tab-content .transition=${currentTransition} duration="2000"
				><f-div direction="column" width="100%" padding="large"
					><f-div
						><f-text variant="heading" size="x-large" weight="bold"
							>Tab Content (Duration 2000ms)</f-text
						></f-div
					>
					<f-div>
						<f-text
							>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
							Ipsum has been the industry's standard dummy text ever since the 1500s, when an
							unknown printer took a galley of type and scrambled it to make a type specimen book.
							It has survived not only five centuries, but also the leap into electronic
							typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
							release of Letraset sheets containing Lorem Ipsum passages, and more recently with
							desktop publishing software like Aldus PageMaker including versions of Lorem
							Ipsum.</f-text
						></f-div
					></f-div
				></f-tab-content
			>
		`;
	},

	name: "duration",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};
