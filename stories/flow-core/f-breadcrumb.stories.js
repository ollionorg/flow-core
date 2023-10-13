import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useState } from "@storybook/client-api";

export default {
	title: "@cldcvr/flow-core/f-breadcrumb",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const handleClick = e => {
			console.log(e.detail.value);
		};

		return html` <f-div padding="small">
			<f-breadcrumb
				.crumbs=${args.crumbs}
				.variant=${args.variant}
				.size=${args.size}
				?disabled=${args.disabled}
				@click=${handleClick}
			></f-breadcrumb>
		</f-div>`;
	},

	name: "Playground",

	argTypes: {
		size: {
			control: "radio",
			options: ["medium", "small"]
		},

		variant: {
			control: "radio",
			options: ["text", "icon"]
		},

		crumbs: {
			control: "object"
		},

		disabled: {
			control: "boolean"
		}
	},

	args: {
		size: "medium",
		variant: "text",
		crumbs: [
			{
				tabIndex: 0,
				title: "Label 1 New Label Demo test",
				icon: "i-home"
			},
			{
				tabIndex: 1,
				title: "Label 2",
				icon: "i-pipe"
			},
			{
				tabIndex: 2,
				title: "Label 3",
				icon: "i-info-fill"
			},
			{
				tabIndex: 3,
				title: "Label 4",
				icon: "i-app"
			},
			{
				tabIndex: 4,
				title: "Label 5",
				icon: "i-download"
			}
		],

		disabled: false
	}
};

export const Size = {
	render: args => {
		const data = ["medium", "small"];

		const crumbs = [
			{
				tabIndex: 0,
				title: "Label 1 New Label Demo test"
			},
			{
				tabIndex: 1,
				title: "Label 2"
			},
			{
				tabIndex: 2,
				title: "Label 3"
			},
			{
				tabIndex: 3,
				title: "Label 4"
			}
		];

		return html`<f-div padding="small" gap="x-large">
			${data.map(
				item =>
					html` <f-div direction="column" gap="large"
						><f-text>size=${item}</f-text
						><f-breadcrumb .crumbs=${crumbs} .size=${item}></f-breadcrumb
					></f-div>`
			)}
		</f-div>`;
	},

	name: "size"
};

export const Crumbs = {
	render: args => {
		const data = [
			[
				{
					tabIndex: 0,
					title: "Label 1 New Label Demo test"
				},
				{
					tabIndex: 1,
					title: "Label 2"
				},
				{
					tabIndex: 2,
					title: "Label 3"
				},
				{
					tabIndex: 3,
					title: "Label 4"
				}
			],
			[
				{
					tabIndex: 0,
					title: "Label 1"
				},
				{
					tabIndex: 1,
					title: "Label 2"
				},
				{
					tabIndex: 2,
					title: "Label 3"
				},
				{
					tabIndex: 3,
					title: "Label 4"
				},
				{
					tabIndex: 4,
					title: "Label 5"
				}
			]
		];

		return html`<f-div padding="small" gap="x-large">
			${data.map(
				item =>
					html` <f-div direction="column" gap="large"
						><f-text>${item.length > 4 ? "Crumbs length > 4" : "Crumbs length < 4"}</f-text
						><f-breadcrumb .crumbs=${item}></f-breadcrumb
					></f-div>`
			)}
		</f-div>`;
	},

	name: "crumbs"
};

export const Flags = {
	render: args => {
		const crumbs = [
			{
				tabIndex: 0,
				title: "Label 1 New Label Demo test"
			},
			{
				tabIndex: 1,
				title: "Label 2"
			},
			{
				tabIndex: 2,
				title: "Label 3"
			},
			{
				tabIndex: 3,
				title: "Label 4"
			}
		];

		return html` <f-div padding="small" gap="x-large">
			<f-div direction="column" gap="large"
				><f-text>disabled</f-text><f-breadcrumb .crumbs=${crumbs} ?disabled=${true}></f-breadcrumb
			></f-div>
		</f-div>`;
	},

	name: "Flags"
};
