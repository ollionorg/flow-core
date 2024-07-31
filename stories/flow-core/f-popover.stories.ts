import { html } from "lit-html";
import fPopoverAnatomy from "../svg/i-fpopover-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useState } from "@storybook/preview-api";
import { createRef, ref } from "lit/directives/ref.js";
import { FPopover, FPopoverPlacement, FPopoverSize, FPopoverState } from "@nonfx/flow-core";

export default {
	title: "@nonfx/flow-core/f-popover",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export type PopOverStoryArgs = {
	open: boolean;
	overlay: boolean;
	size: FPopoverSize;
	placement: FPopoverPlacement;
	state: FPopoverState;
	shadow: boolean;
	["auto-height"]: boolean;
	["close-on-escape"]: boolean;
};

export const Playground = {
	render: (args: PopOverStoryArgs) => {
		const popoverRef = createRef<FPopover>();
		const handlePopover = (_e: CustomEvent) => {
			if (popoverRef.value) {
				popoverRef.value.open = !popoverRef.value.open;
			}
		};

		return html` <f-div height="hug-content" direction="column" align="middle-center">
			<f-div height="200px"></f-div>
			<f-popover
				${ref(popoverRef)}
				.open=${args.open}
				.overlay=${args.overlay}
				.size=${args.size}
				.state=${args.state}
				.placement=${args.placement}
				.shadow=${args.shadow}
				@overlay-click=${handlePopover}
				target="#popoverTarget"
				?auto-height=${args["auto-height"]}
				?close-on-escape=${args["close-on-escape"]}
			>
				<f-div direction="column" gap="small" padding="medium">
					<f-text>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut mi
						egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
						tristique.
					</f-text>
					<f-select placeholder="Dropdown" .options=${["option1", "option2", "option3"]}></f-select>
				</f-div>
			</f-popover>
			<f-button id="popoverTarget" label="Open" @click=${handlePopover}></f-button>
		</f-div>`;
	},

	name: "Playground",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	},

	argTypes: {
		size: {
			control: "select",
			options: ["stretch", "large", "medium", "small"]
		},
		state: {
			control: "select",
			options: [
				"subtle",
				"default",
				"secondary",
				"success",
				"warning",
				"danger",
				"primary",
				"transparent"
			]
		},
		placement: {
			control: "select",

			options: [
				"auto",
				"top-start",
				"top",
				"top-end",
				"bottom-start",
				"bottom",
				"bottom-end",
				"right-start",
				"right",
				"right-end",
				"left-start",
				"left",
				"left-end"
			]
		},

		open: {
			control: "boolean"
		},

		overlay: {
			control: "boolean"
		},

		shadow: {
			control: "boolean"
		},

		["auto-height"]: {
			control: "boolean"
		},

		["close-on-escape"]: {
			control: "boolean"
		}
	},

	args: {
		open: false,
		overlay: true,
		shadow: false,
		size: "small",
		state: "default",
		placement: "auto",
		["auto-height"]: false,
		["close-on-escape"]: true
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fPopoverAnatomy)}</div>`,
	name: "Anatomy"
};

export const Target = {
	render: (args: PopOverStoryArgs) => {
		const popoverRef = createRef<FPopover>();
		const handlePopover = (_e: CustomEvent) => {
			if (popoverRef.value) {
				popoverRef.value.open = !popoverRef.value.open;
			}
		};

		const escapePopover = () => {
			if (popoverRef.value) {
				popoverRef.value.open = !popoverRef.value.open;
			}
		};

		return html`
			<f-div height="hug-content" align="middle-center">
				<f-popover
					${ref(popoverRef)}
					?open=${args.open}
					?overlay=${true}
					@overlay-click=${handlePopover}
					@esc=${escapePopover}
					size="small"
					target="#popoverTarget"
				>
					<f-div state="tertiary" padding="medium">
						<f-text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut
							mi egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
							tristique.
						</f-text>
					</f-div>
				</f-popover>
				<f-button id="popoverTarget" label="Open" @click=${handlePopover}> </f-button>
			</f-div>
		`;
	},

	name: "target",

	args: {
		open: false
	},

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};

export const Placement = {
	render: () => {
		const [dummyPlacementArray, setDummyPlacementArray] = useState([
			[
				{
					open: false,
					title: "Bottom End",
					placement: "bottom-end"
				},
				{
					open: false,
					title: "Bottom",
					placement: "bottom"
				},
				{
					open: false,
					title: "Bottom Start",
					placement: "bottom-start"
				}
			],
			[
				{
					open: false,
					title: "Right Start",
					placement: "right-start"
				},
				{
					open: false,
					title: "Left Start",
					placement: "left-start"
				}
			],
			[
				{
					open: false,
					title: "Right",
					placement: "right"
				},
				{
					open: false,
					title: "Auto",
					placement: "auto"
				},
				{
					open: false,
					title: "Left",
					placement: "left"
				}
			],
			[
				{
					open: false,
					title: "Right End",
					placement: "right-end"
				},
				{
					open: false,
					title: "left End",
					placement: "left-end"
				}
			],
			[
				{
					open: false,
					title: "Top End",
					placement: "top-end"
				},
				{
					open: false,
					title: "Top",
					placement: "top"
				},
				{
					open: false,
					title: "Top Start",
					placement: "top-start"
				}
			]
		]);

		const handlePopover = (main_index: number, index: number) => {
			const array = [...dummyPlacementArray];
			array[index][main_index].open = !dummyPlacementArray[index][main_index].open;
			setDummyPlacementArray(array);
		};

		return html`
			<f-div height="hug-content" gap="large" direction="column">
				${dummyPlacementArray.map((item, index) => {
					return html`
						<f-div height="hug-content" gap="auto" direction="row">
							${item.map((main, main_index) => {
								return html` <f-popover
										?open=${main.open}
										?overlay=${true}
										placement=${main.placement}
										target=${`#${main.placement}`}
										@overlay-click=${() => handlePopover(main_index, index)}
									>
										<f-div state="tertiary" padding="medium">
											<f-text>
												Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet
												enim ut mi egestas, non efficitur odio varius. Phasellus accumsan
												pellentesque ex vehicula tristique.
											</f-text>
										</f-div>
									</f-popover>
									<f-button
										id=${main.placement}
										label=${main.title}
										@click=${() => handlePopover(main_index, index)}
									>
									</f-button>`;
							})}
						</f-div>
					`;
				})}
			</f-div>
		`;
	},

	name: "placement",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 350
		}
	}
};

export const Size = {
	render: () => {
		const [dummySizeArray, setDummySizeArray] = useState([
			{
				target: "#stretchSize",
				open: false,
				title: `size="stretch"`,
				size: "stretch",
				placement: "auto"
			},
			{
				target: "#large",
				open: false,
				title: `size="large"`,
				size: "large",
				placement: "auto"
			},
			{
				target: "#medium",
				open: false,
				title: `size="medium"`,
				size: "medium",
				placement: "auto"
			},
			{
				target: "#small",
				open: false,
				title: `size="medium"`,
				size: "small",
				placement: "auto"
			},
			{
				target: "#hug-content",
				open: false,
				title: `size="hug-content" placement="right"`,
				size: "hug-content",
				placement: "auto",
				width: "700px"
			},
			{
				target: undefined,
				open: false,
				title: `size="custom(500px,100vh)" placement="right" target="undefined"`,
				size: "custom(500px,100vh)",
				placement: "right"
			}
		]);

		const handlePopover = (_item: unknown, index: number) => {
			const array = [...dummySizeArray];
			array[index].open = !dummySizeArray[index].open;
			setDummySizeArray(array);
		};

		return html` <f-div height="hug-content" direction="column" gap="large">
			${dummySizeArray.map((item, index) => {
				return html`
					<f-popover
						?open=${item.open}
						.overlay=${false}
						size=${item.size}
						.target=${item.target}
						placement=${item.placement}
						@overlay-click=${() => handlePopover(item, index)}
					>
						<f-div
							state="tertiary"
							gap="auto"
							direction="column"
							align="bottom-left"
							padding="medium"
							.width=${item.width ?? "fill-container"}
						>
							<f-text>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut
								mi egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
								tristique.
							</f-text>
							<f-text>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut
								mi egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
								tristique.
							</f-text>
						</f-div>
					</f-popover>
					<f-div
						id=${item.target?.substring(1)}
						state="primary"
						padding="large"
						variant="curved"
						width="hug-content"
						clickable
						@click=${() => handlePopover(item, index)}
					>
						<f-text size="large">${item.title}</f-text>
					</f-div>
				`;
			})}
		</f-div>`;
	},

	name: "size",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 300
		}
	}
};

export const State = {
	render: () => {
		const [dummySizeArray, setDummySizeArray] = useState([
			{
				target: "#default",
				open: false,
				state: "default",
				title: `state="default"`,
				size: "medium",
				placement: "auto"
			},
			{
				target: "#subtle",
				open: false,
				state: "subtle",
				title: `state="subtle"`,
				size: "medium",
				placement: "auto"
			},
			{
				target: "#secondary",
				open: false,
				state: "secondary",
				title: `state="secondary"`,
				size: "medium",
				placement: "auto"
			},
			{
				target: "#success",
				open: false,
				state: "success",
				title: `state="success"`,
				size: "medium",
				placement: "auto"
			},
			{
				target: "#warning",
				open: false,
				state: "warning",
				title: `state="warning"`,
				size: "medium",
				placement: "auto"
			},
			{
				target: "#danger",
				open: false,
				state: "danger",
				title: `state="danger"`,
				size: "medium",
				placement: "auto"
			},
			{
				target: "#primary",
				open: false,
				state: "primary",
				title: `state="primary"`,
				size: "medium",
				placement: "auto"
			},
			{
				target: "#transparent",
				open: false,
				state: "transparent",
				title: `state="transparent"`,
				size: "medium",
				placement: "auto"
			}
		]);

		const handlePopover = (_item: unknown, index: number) => {
			const array = [...dummySizeArray];
			array[index].open = !dummySizeArray[index].open;
			setDummySizeArray(array);
		};

		return html` <f-div height="hug-content" direction="column" gap="large">
			${dummySizeArray.map((item, index) => {
				return html`
					<f-popover
						?open=${item.open}
						.overlay=${true}
						.size=${item.size}
						.state=${item.state}
						.target=${item.target}
						placement=${item.placement}
						@overlay-click=${() => handlePopover(item, index)}
					>
						<f-div padding="large">
							<f-text>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut
								mi egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
								tristique.
							</f-text>
							<f-text>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut
								mi egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
								tristique.
							</f-text>
						</f-div>
					</f-popover>
					<f-div
						id=${item.target?.substring(1)}
						state="primary"
						padding="large"
						variant="curved"
						width="hug-content"
						clickable
						@click=${() => handlePopover(item, index)}
					>
						<f-text size="large">${item.title}</f-text>
					</f-div>
				`;
			})}
		</f-div>`;
	},

	name: "state",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 300
		}
	}
};
export const Flags = {
	render: () => {
		const [openFlag, setOpenFlag] = useState(false);
		const [openFlagForOverlay, setOpenFlagForOverlay] = useState(false);
		const [openFlagForNoOverlay, setOpenFlagForNoOverlay] = useState(false);
		const [openHeightStretch, setOpenHeightStretch] = useState(false);
		const [openEscape, setOpenEscape] = useState(false);
		const [openFlagShadow, setOpenFlagShadow] = useState(false);

		return html` <f-div height="hug-content" gap="large" direction="column">
			<f-div height="hug-content" gap="large" direction="row">
				<f-popover
					?open=${openFlag}
					?overlay=${true}
					size="small"
					target="#openFlag"
					@overlay-click=${() => setOpenFlag(!openFlag)}
				>
					<f-div state="tertiary" padding="medium">
						<f-text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut
							mi egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
							tristique.
						</f-text>
					</f-div>
				</f-popover>
				<f-button id="openFlag" label="open='true'" @click=${() => setOpenFlag(!openFlag)}>
				</f-button>
				<f-popover ?open=${false} ?overlay=${true} size="small" target="#openFlag2">
					<f-div state="tertiary" padding="medium">
						<f-text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut
							mi egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
							tristique.
						</f-text>
					</f-div>
				</f-popover>
				<f-button id="openFlag2" label="open='false'"> </f-button>
			</f-div>
			<f-div height="hug-content" gap="large" direction="row">
				<f-popover
					?open=${openFlagForOverlay}
					?overlay=${true}
					size="small"
					target="#openFlagForOverlay"
					@overlay-click=${() => setOpenFlagForOverlay(!openFlagForOverlay)}
				>
					<f-div state="tertiary" padding="medium">
						<f-text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut
							mi egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
							tristique.
						</f-text>
					</f-div>
				</f-popover>
				<f-button
					id="openFlagForOverlay"
					label="overlay='true'"
					@click=${() => setOpenFlagForOverlay(!openFlagForOverlay)}
				>
				</f-button>
				<f-popover
					?open=${openFlagForNoOverlay}
					.overlay=${false}
					?shadow=${true}
					size="small"
					target="#openFlagForNoOverlay2"
					@overlay-click=${() => setOpenFlagForNoOverlay(!openFlagForNoOverlay)}
				>
					<f-div state="tertiary" padding="medium">
						<f-text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut
							mi egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
							tristique.
						</f-text>
					</f-div>
				</f-popover>
				<f-button
					id="openFlagForNoOverlay2"
					label="overlay='false'"
					@click=${() => setOpenFlagForNoOverlay(!openFlagForNoOverlay)}
				>
				</f-button>
			</f-div>
			<f-div gap="medium">
				<f-popover
					?open=${openHeightStretch}
					.overlay=${true}
					size="stretch"
					target="#popover-height-stretch"
					@overlay-click=${() => setOpenHeightStretch(!openHeightStretch)}
					?auto-height=${true}
				>
					<f-div state="tertiary" padding="medium">
						<f-text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut
							mi egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
							tristique.
						</f-text>
					</f-div>
				</f-popover>
				<f-button
					id="popover-height-stretch"
					label="auto-height='true'"
					@click=${() => setOpenHeightStretch(!openHeightStretch)}
				>
				</f-button>
				<f-popover
					?open=${openEscape}
					.overlay=${true}
					size="stretch"
					target="#popover-height-stretch"
					@overlay-click=${() => setOpenEscape(!openEscape)}
					close-on-escape=${false}
				>
					<f-div state="tertiary" padding="medium">
						<f-text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut
							mi egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
							tristique.
						</f-text>
					</f-div>
				</f-popover>
				<f-button
					id="popover-height-stretch"
					label="close-on-escape='false'"
					@click=${() => setOpenEscape(!openEscape)}
				>
				</f-button>
			</f-div>
			<f-div height="hug-content" gap="large" direction="row">
				<f-popover
					?open=${openFlagShadow}
					.overlay=${false}
					?shadow=${true}
					size="small"
					target="#openFlagShadow"
					@overlay-click=${() => setOpenFlagShadow(!openFlagShadow)}
				>
					<f-div state="tertiary" padding="medium">
						<f-text>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut
							mi egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
							tristique.
						</f-text>
					</f-div>
				</f-popover>
				<f-button
					id="openFlagShadow"
					label="shadow='true'"
					@click=${() => setOpenFlagShadow(!openFlagShadow)}
				>
				</f-button>
			</f-div>
		</f-div>`;
	},

	name: "Flags",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 300
		}
	}
};

export const ChildPopover = {
	render: () => {
		const innerPopover = createRef<FPopover>();

		const handleInnerClose = () => {
			if (innerPopover.value) {
				innerPopover.value.open = !innerPopover.value.open;
			}
		};

		return html`
			<f-popover ?open=${true} ?overlay=${true} size="medium">
				<f-div id="mainPopoverContent" state="tertiary" height="500px" padding="medium">
					<f-text @click=${handleInnerClose}> Main Popover </f-text>
				</f-div>
				<f-popover
					?open=${true}
					?overlay=${false}
					target="#mainPopoverContent"
					placement="left-start"
					size="small"
					${ref(innerPopover)}
				>
					<f-div state="tertiary" gap="auto" height="200px" padding="medium">
						<f-text> Chota Popover </f-text>
						<f-icon source="i-close" @click=${handleInnerClose}></f-icon>
					</f-div>
				</f-popover>
			</f-popover>
		`;
	},

	name: "Child Popover",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 300
		}
	}
};
