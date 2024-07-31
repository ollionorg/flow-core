import { html } from "lit-html";
import { useState } from "@storybook/preview-api";
import { FTooltipObject, FTooltipPlacement } from "@nonfx/flow-core";

export default {
	title: "@nonfx/flow-core/f-tooltip",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

type TooltipStoryArgs = {
	tooltip: string | FTooltipObject;
	closable: boolean;
	open: boolean;
	placement: FTooltipPlacement;
	["Custom Tooltip Template"]: string;
};

export const PlaygroundDirectiveTooltip = {
	render: (args: TooltipStoryArgs) =>
		html`<f-div padding="large" height="200px" align="middle-center" gap="auto">
			<f-icon source="i-question-filled" size="medium" .tooltip=${args.tooltip} clickable></f-icon>
			<f-button label="Submit" .tooltip=${args.tooltip}></f-button>
			<f-tag label="Environment" .tooltip=${args.tooltip}></f-tag>
			<f-icon-button icon="i-plus" .tooltip=${args.tooltip}></f-icon-button>
			<f-counter size="large" label="88" .tooltip=${args.tooltip}></f-counter>
			<f-pictogram size="large" source="i-app" .tooltip=${args.tooltip}></f-pictogram>
		</f-div>`,

	name: "Playground - Directive Tooltip",

	argTypes: {
		tooltip: {
			content: "text"
		}
	},

	args: {
		tooltip: {
			text: "This is object tooltip",
			placement: "bottom",
			closable: true
		}
	}
};

export const PlaygroundRichTooltipComponent = {
	render: (args: TooltipStoryArgs) =>
		html`${typeof args.tooltip === "string" && args.tooltip.startsWith("#")
			? html`<f-div padding="large" height="200px" align="middle-center" gap="large">
						<f-icon-button icon="i-plus" .tooltip=${args.tooltip}></f-icon-button>
						<f-button label="Submit" .tooltip=${args.tooltip}></f-button>
					</f-div>
					<f-tooltip .placement=${args.placement} id="tooltipTarget" ?closable=${args.closable}>
						<f-div direction="column" width="hug-content">
							<f-text variant="para" size="small"> Hello Everyone </f-text>
							<f-text variant="para" size="small" state="primary"> Learn More </f-text>
						</f-div></f-tooltip
					>`
			: html`<f-div padding="large" height="200px" align="middle-center" gap="large">
					<f-icon-button icon="i-plus" .tooltip=${args.tooltip}></f-icon-button>
					<f-button label="Submit" .tooltip=${args.tooltip}></f-button>
			  </f-div>`}`,

	name: "Playground - Rich Tooltip Component",

	argTypes: {
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

		tooltip: {
			control: "text"
		},

		closable: {
			control: "boolean"
		}
	},

	args: {
		tooltip: "#tooltipTarget",
		placement: "auto",

		closable: false
	}
};

export const Id = {
	render: () => {
		return html`
			<f-div gap="large" padding="x-large" direction="column">
				<f-div height="hug-content" padding="none">
					<f-text variant="para" size="large" weight="medium">id="tooltip-target"</f-text>
				</f-div>
				<f-div padding="none" direction="row" gap="x-large" overflow="hidden">
					<f-icon-button icon="i-plus" tooltip="#tooltip-target"></f-icon-button>
				</f-div>
				<f-tooltip id="tooltip-target">
					<f-div width="350px" gap="medium" direction="column" overflow="visible">
						<f-text size="small" inline data-qa-azure-cred-field-clientId-tooltip
							>1. Go to the
							<f-text size="small" weight="bold" inline>
								Azure Portal Home page > All Services > Azure Active Directory > App Registrations.
							</f-text>
						</f-text>
						<f-text size="small"
							>2. Select an existing application or register a new application (e.g.
							CodePipes).</f-text
						>
						<f-text size="small"
							>3. Copy the Application (client) ID of the newly registered application.</f-text
						>
						<f-text size="small">
							<f-text size="small" inline weight="bold">Note: </f-text> Once you have registered an
							Application, it is required to explicitly grant it permissions in a form of a Role
							assignment to work with the current Azure subscription.
						</f-text>
					</f-div>
				</f-tooltip>
			</f-div>
		`;
	},

	name: "id"
};

export const Placement = {
	render: () => {
		const [dummyPlacementArray, setDummyPlacementArray] = useState([
			[
				{
					title: "Bottom Button End",
					placement: "bottom-end"
				},
				{
					title: "Bottom",
					placement: "bottom"
				},
				{
					title: "Bottom Start",
					placement: "bottom-start"
				}
			],
			[
				{
					title: "Right Start",
					placement: "right-start"
				},
				{
					title: "Left Start",
					placement: "left-start"
				}
			],
			[
				{
					title: "Right",
					placement: "right"
				},
				{
					title: "Auto",
					placement: "auto"
				},
				{
					title: "Left",
					placement: "left"
				}
			],
			[
				{
					title: "Right End",
					placement: "right-end"
				},
				{
					title: "left End",
					placement: "left-end"
				}
			],
			[
				{
					title: "Top End",
					placement: "top-end"
				},
				{
					title: "Top",
					placement: "top"
				},
				{
					title: "Top Start",
					placement: "top-start"
				}
			]
		]);

		return html`
			<f-div height="hug-content" gap="large" direction="column">
				${dummyPlacementArray.map(item => {
					return html`
						<f-div height="hug-content" gap="auto" direction="row">
							${item.map(main => {
								return html`
									<f-tooltip placement=${main.placement} id=${main.placement}>
										<f-text variant="para" size="small" id="tooltip-text">
											This is a tooltip
										</f-text></f-tooltip
									>
									<f-button tooltip=${`#${main.placement}`} label=${main.title}> </f-button>
								`;
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

export const Flags = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="column">
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">closable="true"</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large" overflow="hidden">
				<f-button label="Closable Tooltip" tooltip="#tooltipTarget2"></f-button>
			</f-div>
			<f-tooltip id="tooltipTarget2" ?closable=${true}
				><f-div direction="column" width="hug-content">
					<f-text variant="para" size="small"> This is a tooltip </f-text>
					<f-text variant="para" size="small" state="primary"> Learn More </f-text>
				</f-div></f-tooltip
			>
		</f-div>`,

	name: "Flags"
};
