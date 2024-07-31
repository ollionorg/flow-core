import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs } from "@storybook/manager-api";
import { useState } from "@storybook/preview-api";
import { FBreadcrumbs, FBreadCrumbSize, FBreadCrumbVariant } from "@nonfx/flow-core";

export default {
	title: "@nonfx/flow-core/f-breadcrumb",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export type BreadcrumbArgTypes = {
	crumbs: FBreadcrumbs;
	size: FBreadCrumbSize;
	variant: FBreadCrumbVariant;
	disabled: boolean;
};

export const Playground = {
	render: (args: BreadcrumbArgTypes) => {
		const handleClick = (e: CustomEvent) => {
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
	render: () => {
		type dataString = "medium" | "small";
		type dataType = dataString[];
		const data = ["medium", "small"] as dataType;

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
	render: () => {
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

export const Variant = {
	render: () => {
		const data = [
			[
				{
					tabIndex: 0,
					title: "Home"
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
					title: "Current"
				}
			],
			[
				{
					tabIndex: 0,
					title: "Home",
					icon: "i-home"
				},
				{
					tabIndex: 1,
					title: "Label 2",
					icon: "i-app"
				},
				{
					tabIndex: 2,
					title: "Label 3",
					icon: "i-launch"
				},
				{
					tabIndex: 3,
					title: "info",
					icon: "i-info-fill"
				},
				{
					tabIndex: 4,
					title: "Current",
					icon: "i-user-double"
				}
			]
		];

		return html`<f-div padding="small" gap="x-large">
			${data.map(
				(item, index) =>
					html` <f-div direction="column" gap="large"
						><f-text>${index === 0 ? "variant='text'" : "variant='icon'"}</f-text
						><f-breadcrumb .crumbs=${item} .variant=${index === 0 ? "text" : "icon"}></f-breadcrumb
					></f-div>`
			)}
		</f-div>`;
	},

	name: "variant"
};

export const Flags = {
	render: () => {
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
