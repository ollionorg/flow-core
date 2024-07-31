import { html } from "lit-html";
import FDivAnatomy from "../svg/i-fdiv-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useState } from "@storybook/client-api";

export default {
	title: "@nonfx/flow-core/f-tab",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
		const [selected, setSelected] = useState(4);

		const handleChange = id => {
			setSelected(id);
		};

		return html`
			<f-div
				direction=${args.direction === "vertical" ? "row" : "column"}
				.height=${args.direction === "vertical" ? "100%" : "fill-container"}
				overflow="visible"
			>
				<f-tab
					.direction=${args.direction}
					.variant=${args.variant}
					.alignment=${args.alignment}
					node-width=${args["node-width"]}
				>
					${array.map(
						item =>
							html` <f-tab-node
								?active=${selected === item ? true : false}
								content-id=${`tab-${item}`}
								@click=${() => handleChange(item)}
								@keyup=${e => {
									if (e.key === "Enter") handleChange(item);
								}}
								><f-div width="100%" height="100%" align="middle-center" direction="column"
									><f-div align="middle-center" height="hug-content" width="hug-content"
										>Tab ${item}</f-div
									><f-div align="middle-center" height="hug-content" width="hug-content"
										>Description</f-div
									></f-div
								></f-tab-node
							>`
					)}</f-tab
				>
				${array.map(
					item => html`
						<f-tab-content
							id=${`tab-${item}`}
							.transition=${args["tab-content-transition"]}
							.duration=${args["tab-content-transition-duration"]}
							><f-div direction="column" width="100%" padding="large"
								><f-div
									><f-text variant="heading" size="x-large" weight="bold"
										>Tab ${item}</f-text
									></f-div
								>
								<f-div>
									<f-text
										>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
										Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
										when an unknown printer took a galley of type and scrambled it to make a type
										specimen book. It has survived not only five centuries, but also the leap into
										electronic typesetting, remaining essentially unchanged. It was popularised in
										the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
										and more recently with desktop publishing software like Aldus PageMaker
										including versions of Lorem Ipsum.</f-text
									></f-div
								></f-div
							></f-tab-content
						>
					`
				)}
			</f-div>
		`;
	},

	name: "Playground",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 400
		}
	},

	argTypes: {
		variant: {
			control: "radio",
			options: ["transparent", "fill", "no-border"]
		},

		direction: {
			control: "radio",
			options: ["horizontal", "vertical"]
		},

		alignment: {
			control: "select",
			options: ["left", "center", "right", "top", "middle", "bottom"]
		},

		["node-width"]: {
			control: "text"
		},

		["tab-content-transition"]: {
			control: "radio",
			options: ["none", "fade", "slide"]
		},

		["tab-content-transition-duration"]: {
			control: "number"
		}
	},

	args: {
		variant: "transparent",
		direction: "horizontal",
		alignment: "left",
		["node-width"]: "hug-content",
		["tab-content-transition"]: "none",
		["tab-content-transition-duration"]: 200
	}
};

export const Variant = {
	render: args => {
		const array = [0, 1, 2, 3, 4, 5];
		const [selected, setSelected] = useState(0);

		const handleChange = id => {
			setSelected(id);
		};

		const variants = ["transparent", "fill"];

		return html`<f-div direction="column">
			${variants.map(
				variant =>
					html` <f-div direction="column" height="fill-container" overflow="visible">
						<f-tab .variant=${variant} node-width="fill">
							${array.map(
								item =>
									html` <f-tab-node
										?active=${selected === item ? true : false}
										content-id=${`tab-${variant}-${item}`}
										@click=${() => handleChange(item)}
										><f-div width="100%" height="100%" align="middle-center" direction="column"
											><f-div align="middle-center" height="hug-content" width="hug-content"
												>Tab ${item}</f-div
											><f-div align="middle-center" height="hug-content" width="hug-content"
												>Description</f-div
											></f-div
										></f-tab-node
									>`
							)}</f-tab
						>
						${array.map(
							item => html`
								<f-tab-content id=${`tab-${variant}-${item}`}
									><f-div direction="column" width="100%" padding="large"
										><f-div
											><f-text variant="heading" size="x-large" weight="bold"
												>Tab ${item}</f-text
											></f-div
										>
										<f-div>
											<f-text
												>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
												Lorem Ipsum has been the industry's standard dummy text ever since the
												1500s, when an unknown printer took a galley of type and scrambled it to
												make a type specimen book. It has survived not only five centuries, but also
												the leap into electronic typesetting, remaining essentially unchanged. It
												was popularised in the 1960s with the release of Letraset sheets containing
												Lorem Ipsum passages, and more recently with desktop publishing software
												like Aldus PageMaker including versions of Lorem Ipsum.</f-text
											></f-div
										></f-div
									></f-tab-content
								>
							`
						)}
					</f-div>`
			)}</f-div
		> `;
	},

	name: "variant",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 500
		}
	}
};

export const Direction = {
	render: args => {
		const array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
		const [selected, setSelected] = useState(0);

		const handleChange = id => {
			setSelected(id);
		};

		const directions = ["horizontal", "vertical"];
		const [selectedDirection, setSelectedDirection] = useState("horizontal");

		return html`
			<f-button
				label="horizontal"
				?disabled=${selectedDirection === "horizontal"}
				@click=${() => setSelectedDirection("horizontal")}
			></f-button>
			<f-button
				label="vertical"
				?disabled=${selectedDirection === "vertical"}
				@click=${() => setSelectedDirection("vertical")}
			></f-button>
			<f-spacer></f-spacer>
			<f-div
				direction=${selectedDirection === "vertical" ? "row" : "column"}
				.height=${selectedDirection === "vertical" ? "100%" : "fill-container"}
				overflow="visible"
			>
				<f-tab .direction=${selectedDirection} node-width="fill">
					${array.map(
						item =>
							html` <f-tab-node
								?active=${selected === item ? true : false}
								content-id=${`tab-${selectedDirection}-${item}`}
								@click=${() => handleChange(item)}
								><f-div width="100%" height="100%" align="middle-center" direction="column"
									><f-div align="middle-center" height="hug-content" width="hug-content"
										>Tab ${item}</f-div
									><f-div align="middle-center" height="hug-content" width="hug-content"
										>Description</f-div
									></f-div
								></f-tab-node
							>`
					)}</f-tab
				>
				${array.map(
					item => html`
                    <f-tab-content id=${`tab-${selectedDirection}-${item}`}
                      ><f-div direction="column" width="100%" padding="large"
                        ><f-div
                          ><f-text variant="heading" size="x-large" weight="bold"
                            >Tab ${item}</f-text
                          ></f-div
                        >
                        <f-div>
                          <f-text
                            >Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the 1960s with the release
                            of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions
                            of Lorem Ipsum.</f-text
                          ></f-div
                        ></f-div
                      ></f-tab-content
                    >
            </f-div>`
				)}</f-div
			>
		`;
	},

	name: "direction",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 500
		}
	}
};

export const NodeWidth = {
	render: args => {
		const array = [0, 1, 2];
		const [selected, setSelected] = useState(0);

		const handleChange = id => {
			setSelected(id);
		};

		const [selectedWidth, setSelectedWidth] = useState("fill");

		return html`
			<f-button
				label="fill"
				?disabled=${selectedWidth === "fill"}
				@click=${() => setSelectedWidth("fill")}
			></f-button>
			<f-button
				label="hug-content"
				?disabled=${selectedWidth === "hug-content"}
				@click=${() => setSelectedWidth("hug-content")}
			></f-button>
			<f-button
				label="300px"
				?disabled=${selectedWidth === "300"}
				@click=${() => setSelectedWidth("300")}
			></f-button>
			<f-spacer></f-spacer>
			<f-div direction="column" height="fill-container" overflow="visible">
				<f-tab node-width=${selectedWidth}>
					${array.map(
						item =>
							html` <f-tab-node
								?active=${selected === item ? true : false}
								content-id=${`tab-${selectedWidth}-${item}`}
								@click=${() => handleChange(item)}
								><f-div width="100%" height="100%" align="middle-center" direction="column"
									><f-div align="middle-center" height="hug-content" width="hug-content"
										>Tab ${item}</f-div
									><f-div align="middle-center" height="hug-content" width="hug-content"
										>Description</f-div
									></f-div
								></f-tab-node
							>`
					)}</f-tab
				>
				${array.map(
					item => html`
                    <f-tab-content id=${`tab-${selectedWidth}-${item}`}
                      ><f-div direction="column" width="100%" padding="large"
                        ><f-div
                          ><f-text variant="heading" size="x-large" weight="bold"
                            >Tab ${item}</f-text
                          ></f-div
                        >
                        <f-div>
                          <f-text
                            >Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the 1960s with the release
                            of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions
                            of Lorem Ipsum.</f-text
                          ></f-div
                        ></f-div
                      ></f-tab-content
                    >
            </f-div>`
				)}</f-div
			>
		`;
	},

	name: "node-width",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 500
		}
	}
};

export const Alignment = {
	render: args => {
		const array = [0, 1, 2];
		const [selected, setSelected] = useState(0);

		const handleChange = id => {
			setSelected(id);
		};

		const [selectedDirection, setSelectedDirection] = useState("horizontal");
		const [selectedAlignment, setSelectedAlignment] = useState("left");

		return html`
			<f-div>
				<f-button
					label="horizontal"
					?disabled=${selectedDirection === "horizontal"}
					@click=${() => setSelectedDirection("horizontal")}
				></f-button>
				<f-button
					label="vertical"
					?disabled=${selectedDirection === "vertical"}
					@click=${() => setSelectedDirection("vertical")}
				></f-button>
			</f-div>
			<f-spacer></f-spacer>
			${selectedDirection === "horizontal"
				? html` <f-button
							label="left"
							?disabled=${selectedAlignment === "left"}
							@click=${() => setSelectedAlignment("left")}
						></f-button>
						<f-button
							label="center"
							?disabled=${selectedAlignment === "center"}
							@click=${() => setSelectedAlignment("center")}
						></f-button>
						<f-button
							label="right"
							?disabled=${selectedAlignment === "right"}
							@click=${() => setSelectedAlignment("right")}
						></f-button>`
				: html` <f-button
							label="top"
							?disabled=${selectedAlignment === "top"}
							@click=${() => setSelectedAlignment("top")}
						></f-button>
						<f-button
							label="middle"
							?disabled=${selectedAlignment === "middle"}
							@click=${() => setSelectedAlignment("middle")}
						></f-button>
						<f-button
							label="bottom"
							?disabled=${selectedAlignment === "bottom"}
							@click=${() => setSelectedAlignment("bottom")}
						></f-button>`}
			<f-spacer></f-spacer>
			<f-div
				direction=${selectedDirection === "vertical" ? "row" : "column"}
				.height=${selectedDirection === "vertical" ? "100%" : "fill-container"}
				overflow="visible"
			>
				<f-tab .alignment=${selectedAlignment} .direction=${selectedDirection}>
					${array.map(
						item =>
							html` <f-tab-node
								?active=${selected === item ? true : false}
								content-id=${`tab-${selectedAlignment}-${item}`}
								@click=${() => handleChange(item)}
								><f-div width="100%" height="100%" align="middle-center" direction="column"
									><f-div align="middle-center" height="hug-content" width="hug-content"
										>Tab ${item}</f-div
									><f-div align="middle-center" height="hug-content" width="hug-content"
										>Description</f-div
									></f-div
								></f-tab-node
							>`
					)}</f-tab
				>
				${array.map(
					item => html`
                    <f-tab-content id=${`tab-${selectedAlignment}-${item}`}
                      ><f-div direction="column" width="100%" padding="large"
                        ><f-div
                          ><f-text variant="heading" size="x-large" weight="bold"
                            >Tab ${item}</f-text
                          ></f-div
                        >
                        <f-div>
                          <f-text
                            >Lorem Ipsum is simply dummy text of the printing and typesetting
                            industry. Lorem Ipsum has been the industry's standard dummy text ever
                            since the 1500s, when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining
                            essentially unchanged. It was popularised in the 1960s with the release
                            of Letraset sheets containing Lorem Ipsum passages, and more recently
                            with desktop publishing software like Aldus PageMaker including versions
                            of Lorem Ipsum.</f-text
                          ></f-div
                        ></f-div
                      ></f-tab-content
                    >
            </f-div>`
				)}</f-div
			>
		`;
	},

	name: "alignment",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 500
		}
	}
};
