import { html } from "lit-html";
import fAccordionAnatomy from "../svg/i-faccordion-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useState } from "@storybook/client-api";

export default {
	title: "@nonfx/flow-core/f-accordion",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const [_, updateArgs] = useArgs();

		const metaData = {
			["NAME"]: {
				type: "label-text",
				value: "Brendon Compliance"
			},

			["ROLE"]: {
				type: "text",
				value: "Senior DevOps Engineer"
			},

			["TEAM"]: {
				type: "text",
				value: "Office of CTO"
			},

			["LOCATION"]: {
				type: "text",
				value: "Singapore"
			},

			["ORG ID"]: {
				type: "text",
				value: "brendon.compliance@nonfx.com"
			},

			["CONNECT ON"]: {
				type: "connect-array",

				value: [
					{
						icon: "p-slack",
						name: "Slack"
					},
					{
						icon: "i-mail",
						name: "Email"
					}
				]
			}
		};

		const handleToggle = e => {
			console.log(e.detail.value);

			updateArgs({
				open: e.detail.value
			});
		};

		return html`<f-div direction="column" padding="x-large"
			><f-accordion
				.open=${args.open}
				.icon=${args.icon}
				icon-size=${args["icon-size"]}
				icon-placement=${args["icon-placement"]}
				max-height=${args["max-height"]}
				header-padding=${args["header-padding"]}
				body-padding=${args["body-padding"]}
				@toggle=${handleToggle}
			>
				<f-div><f-text variant="para" size="small" weight="bold">Requester details</f-text></f-div>
				<f-div slot="body" direction="column">
					${Object.entries(metaData).map(
						([name, value]) => html`
							<f-div direction="row" padding="small none" height="hug-content">
								<f-div width="33%"
									><f-text variant="para" size="small" weight="regular" state="secondary"
										>${name}</f-text
									></f-div
								>
								${value.type === "label-text"
									? html` <f-div align="middle-left" gap="x-small">
											<f-pictogram
												variant="circle"
												size="small"
												state="default"
												source="BC"
											></f-pictogram>
											<f-text variant="para" size="small" weight="regular"
												>${value.value}</f-text
											></f-div
									  >`
									: value.type === "text"
									? html` <f-div
											><f-text variant="para" size="small" weight="regular"
												>${value.value}</f-text
											></f-div
									  >`
									: html` <f-div direction="column" gap="small" align="middle-center">
											${value.value.map(
												item =>
													html` <f-div gap="x-small">
														<f-icon .source=${item.icon} size="small" clickable></f-icon>
														<f-text ?inline=${true} variant="para" size="small" weight="medium"
															>${item.name}</f-text
														>
													</f-div>`
											)}
									  </f-div>`}
							</f-div>
						`
					)}
				</f-div>
			</f-accordion>
		</f-div>`;
	},

	name: "Playground",

	argTypes: {
		open: {
			control: "boolean"
		},

		icon: {
			control: "radio",
			options: ["chevron", "caret", "plus", "none"]
		},

		["icon-size"]: {
			control: "radio",
			options: ["x-small", "small", "medium", "large"]
		},

		["icon-placement"]: {
			control: "radio",
			options: ["right", "left"]
		},

		["max-height"]: {
			control: "text"
		},

		["header-padding"]: {
			control: "text"
		},

		["body-padding"]: {
			control: "text"
		}
	},

	args: {
		open: false,
		icon: "chevron",
		["icon-size"]: "small",
		["icon-placement"]: "right",
		["max-height"]: "180px",
		["header-padding"]: "medium",
		["body-padding"]: "none medium"
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fAccordionAnatomy)}</div>`,
	name: "Anatomy"
};

export const Icon = {
	render: args => {
		const icons = ["chevron", "caret", "plus", "none"];

		return html`<f-div direction="column"
			>${icons.map(
				item =>
					html`<f-accordion .open=${true} .icon=${item}>
							<f-div
								><f-text variant="para" size="small" weight="bold">Requester details</f-text></f-div
							>
							<f-div slot="body" direction="column" padding="small none">
								<f-text variant="para" size="small" weight="regular" state="secondary">
									In publishing and graphic design, Lorem ipsum is a placeholder text commonly used
									to demonstrate the visual form. In publishing and graphic design, Lorem ipsum is a
									placeholder text commonly used to demonstrate the visual form. In publishing and
									graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the
									visual form.
								</f-text>
							</f-div>
						</f-accordion>
						<f-divider></f-divider> `
			)}</f-div
		>`;
	},

	name: "icon"
};

export const IconSize = {
	render: args => {
		const icons = ["x-small", "small", "medium", "large"];

		return html`<f-div
			>${icons.map(
				item =>
					html`<f-div direction="column" padding="x-large"
						><f-accordion .open=${true} icon-size=${item}>
							<f-div
								><f-text variant="para" size="small" weight="bold">Requester details</f-text></f-div
							>
							<f-div slot="body" direction="column" padding="medium none">
								<f-text variant="para" size="small" weight="regular" state="secondary">
									In publishing and graphic design, Lorem ipsum is a placeholder text commonly used
									to demonstrate the visual form.</f-text
								>
							</f-div>
						</f-accordion></f-div
					>`
			)}</f-div
		>`;
	},

	name: "icon-size"
};

export const IconPlacement = {
	render: args => {
		const icons = ["right", "left"];

		return html`<f-div
			>${icons.map(
				item =>
					html`<f-div direction="column" padding="x-large"
						><f-accordion .open=${true} icon-placement=${item}>
							<f-div
								><f-text variant="para" size="small" weight="bold">Requester details</f-text></f-div
							>
							<f-div slot="body" direction="column" padding="medium none">
								<f-text variant="para" size="small" weight="regular" state="secondary">
									In publishing and graphic design, Lorem ipsum is a placeholder text commonly used
									to demonstrate the visual form.</f-text
								>
							</f-div>
						</f-accordion></f-div
					>`
			)}</f-div
		>`;
	},

	name: "icon-placement"
};

export const MaxHeight = {
	render: args => {
		return html`<f-div
			><f-div direction="column" padding="x-large" width="300px"
				><f-accordion .open=${true} max-height="50px">
					<f-div
						><f-text variant="para" size="small" weight="bold">Requester details</f-text></f-div
					>
					<f-div slot="body" direction="column" padding="medium none">
						<f-text variant="para" size="small" weight="regular" state="secondary">
							In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to
							demonstrate the visual form.</f-text
						>
					</f-div>
				</f-accordion></f-div
			></f-div
		>`;
	},

	name: "max-height"
};

export const Flags = {
	render: args => {
		const icons = [true, false];

		return html`<f-div
			>${icons.map(
				item =>
					html`<f-div direction="column" padding="x-large"
						><f-accordion .open=${item}>
							<f-div
								><f-text variant="para" size="small" weight="bold"
									>Accordion (open=${item})</f-text
								></f-div
							>
							<f-div slot="body" direction="column" padding="medium none">
								<f-text variant="para" size="small" weight="regular" state="secondary">
									In publishing and graphic design, Lorem ipsum is a placeholder text commonly used
									to demonstrate the visual form.</f-text
								>
							</f-div>
						</f-accordion></f-div
					>`
			)}</f-div
		>`;
	},

	name: "Flags"
};
