import { html } from "lit-html";
import fButtonAnatomy from "../svg/i-fbutton-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { createRef, ref } from "lit/directives/ref.js";
import type { FButton } from "@nonfx/flow-core";

export default {
	title: "@nonfx/flow-core/f-button",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, any>) => {
		const fieldRef = createRef<FButton>();

		const handleClick = (event: Event) => {
			console.log(event);
		};

		setTimeout(() => {
			if (fieldRef.value) {
				fieldRef.value.tooltip = undefined;
			}
		}, 2000);

		const handleAction = (event: CustomEvent) => {
			if (fieldRef.value) {
				fieldRef.value.label = event.detail.action;
			}
		};

		return html` <f-div padding="none">
			<f-button
				${ref(fieldRef)}
				.label=${args.label}
				.category=${args.category}
				.size=${args.size}
				.state=${args.state}
				.variant=${args.variant}
				icon-left=${args["icon-left"]}
				icon-right=${args["icon-right"]}
				.counter=${args.counter}
				.loading=${args.loading}
				.disabled=${args.disabled}
				.actions=${args.actions}
				.selectedAction=${args["selected-action"]}
				tooltip="Tooltip for button"
				.label-wrap=${args["label-wrap"]}
				@click=${handleClick}
				@action=${handleAction}
			></f-button
		></f-div>`;
	},

	name: "Playground",

	argTypes: {
		label: {
			control: "text"
		},

		category: {
			control: "select",
			options: ["fill", "outline", "transparent", "packed"]
		},

		size: {
			control: "select",
			options: ["large", "medium", "small", "x-small"]
		},

		state: {
			control: "select",

			options: [
				"primary",
				"neutral",
				"success",
				"warning",
				"danger",
				"inherit",
				"custom, #0000FF",
				"custom, gray",
				"custom, #fff",
				"custom, white",
				"custom, black",
				"custom, #607B9F"
			]
		},

		variant: {
			control: "select",
			options: ["round", "curved", "block"]
		},

		["icon-left"]: {
			control: "text"
		},

		["icon-right"]: {
			control: "text"
		},

		counter: {
			control: "text"
		},
		actions: {
			control: "object"
		},
		["selected-action"]: {
			control: "text"
		},
		loading: {
			control: "boolean"
		},

		disabled: {
			control: "boolean"
		},

		["label-wrap"]: {
			control: "boolean"
		}
	},

	args: {
		label: "label",
		category: "fill",
		size: "medium",
		state: "primary",
		variant: "round",
		["icon-left"]: undefined,
		["icon-right"]: undefined,
		counter: undefined,
		actions: ["Merge", "Squash and merge", "Rebase and merge"],
		["selected-action"]: "Merge",
		loading: false,
		disabled: false,
		["label-wrap"]: false
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fButtonAnatomy)}</div>`,
	name: "Anatomy"
};

export const Variant = {
	render: () =>
		html`<f-div gap="x-large" padding="x-large" align="middle-center">
			<f-button variant="round" label="Round"></f-button>
			<f-button variant="curved" label="Curved"></f-button>
			<f-button variant="block" label="Block (taking width of its parent)"></f-button>
		</f-div>`,

	name: "variant"
};

export const Category = {
	render: () =>
		html`<f-div gap="x-large" padding="x-large" align="middle-center">
			<f-button label="Fill" category="fill"></f-button>
			<f-button label="Outline" category="outline"></f-button>
			<f-button label="Transparent" category="transparent"></f-button>
			<f-button label="Packed" category="packed"></f-button>
		</f-div>`,

	name: "category"
};

export const Size = {
	render: () =>
		html`<f-div gap="x-large" padding="x-large" align="middle-center">
			<f-button size="large" label="Large"></f-button>
			<f-button size="medium" label="Medium"></f-button>
			<f-button size="small" label="Small"></f-button>
			<f-button size="x-small" label="x-Small"></f-button>
		</f-div>`,

	name: "size"
};

export const State = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="column">
			<f-div padding="none" gap="x-large">
				<f-button category="fill" label="Primary" state="primary"></f-button>
				<f-button category="outline" label="Primary" state="primary"></f-button>
				<f-button category="transparent" label="Primary" state="primary"></f-button>
			</f-div>
			<f-div padding="none" gap="x-large">
				<f-button category="fill" label="Neutral" state="neutral"></f-button>
				<f-button category="outline" label="Neutral" state="neutral"></f-button>
				<f-button category="transparent" label="Neutral" state="neutral"></f-button>
			</f-div>
			<f-div padding="none" gap="x-large">
				<f-button category="fill" label="Success" state="success"></f-button>
				<f-button category="outline" label="Success" state="success"></f-button>
				<f-button category="transparent" label="Success" state="success"></f-button>
			</f-div>
			<f-div padding="none" gap="x-large">
				<f-button category="fill" label="Warning" state="warning"></f-button>
				<f-button category="outline" label="Warning" state="warning"></f-button>
				<f-button category="transparent" label="Warning" state="warning"></f-button>
			</f-div>
			<f-div padding="none" gap="x-large">
				<f-button category="fill" label="Danger" state="danger"></f-button>
				<f-button category="outline" label="Danger" state="danger"></f-button>
				<f-button category="transparent" label="Danger" state="danger"></f-button>
			</f-div>
			<f-div padding="none" gap="x-large" state="warning">
				<f-button category="fill" label="inherit" state="inherit"></f-button>
				<f-button category="outline" label="inherit" state="inherit"></f-button>
				<f-button category="transparent" label="inherit" state="inherit"></f-button>
			</f-div>
			<f-div padding="none" gap="x-large">
				<f-button category="fill" label="custom" state="custom, pink"></f-button>
				<f-button category="outline" label="custom" state="custom, pink"></f-button>
				<f-button category="transparent" label="custom" state="custom, pink"></f-button>
			</f-div>
		</f-div>`,

	name: "state"
};

export const Label = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="column" align="middle-center">
			<f-button label="label"></f-button>
		</f-div>`,

	name: "label"
};

export const IconLeft = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="column" align="middle-center">
			<f-button label="icon left" icon-left="i-plus"></f-button>
		</f-div>`,

	name: "icon-left"
};

export const IconRight = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="row" align="middle-center">
			<f-button label="icon right" icon-right="i-plus"></f-button>
			<f-button label="icon left-right" icon-right="i-plus" icon-left="💰"></f-button>
		</f-div>`,

	name: "icon-right"
};

export const Counter = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="row" align="middle-center">
			<f-button label="Label" counter="88"></f-button>
			<f-button label="Label" icon-left="i-plus" counter="88"></f-button>
			<f-button label="Label" icon-right="i-plus" counter="88"></f-button>
		</f-div>`,

	name: "counter"
};

export const Actions = {
	render: () => {
		const actions = ["Merge", "Squash and merge", "Rebase and merge"];

		const mergeTemplate = () =>
			html`<f-div direction="column">
				<f-div padding="medium" gap="small" align="middle-left">
					<f-icon source="i-enter"></f-icon>
					<f-text>Merge</f-text>
				</f-div>
				<f-div padding="none medium medium medium">
					<f-text state="secondary" size="x-small"
						>In hac habitasse platea dictumst. Nunc gravida lacus in nulla euismod, eget varius enim
						mattis.</f-text
					>
				</f-div>
			</f-div>`;
		const sqAndMergeTemplate = () =>
			html`<f-div direction="column">
				<f-div padding="medium" gap="small" align="middle-left">
					<f-icon source="i-collapse"></f-icon>
					<f-text>Squash and merge</f-text>
				</f-div>
				<f-div padding="none medium medium medium">
					<f-text state="secondary" size="x-small"
						>In hac habitasse platea dictumst. Nunc gravida lacus in nulla euismod, eget varius enim
						mattis.</f-text
					>
				</f-div>
			</f-div>`;
		const rbAndMergeTemplate = () =>
			html`<f-div direction="column">
				<f-div padding="medium" gap="small" align="middle-left">
					<f-icon source="i-reload"></f-icon>
					<f-text>Rebase and merge</f-text>
				</f-div>
				<f-div padding="none medium medium medium">
					<f-text state="secondary" size="x-small"
						>In hac habitasse platea dictumst. Nunc gravida lacus in nulla euismod, eget varius enim
						mattis.</f-text
					>
				</f-div>
			</f-div>`;
		const templateActions = [mergeTemplate, sqAndMergeTemplate, rbAndMergeTemplate];
		return html`<f-div gap="large" padding="x-large" direction="row" align="middle-center">
			<f-button label="Array Of String" .actions=${actions}></f-button>
			<f-button label="Array Of Template" .actions=${templateActions}></f-button>
		</f-div>`;
	},
	name: "actions"
};

export const SelectedAction = {
	render: () => {
		const actions = ["Merge", "Squash and merge", "Rebase and merge"];

		return html`<f-div gap="large" padding="x-large" direction="row" align="middle-center">
			<f-button label="Merge" .actions=${actions} selected-action="Merge"></f-button>
		</f-div>`;
	},
	name: "selected-action"
};

export const Action = {
	render: () => {
		const actions = ["Merge", "Squash and merge", "Rebase and merge"];
		const fieldRef = createRef<FButton>();
		const handleAction = (event: CustomEvent) => {
			if (fieldRef.value) {
				fieldRef.value.label = event.detail.action;
			}
		};
		return html`<f-div gap="large" padding="x-large" align="middle-center" direction="column">
			<f-text state="warning"
				>'action' event emitted when action is selected, In following example we are updating label
				when action is selected.</f-text
			>
			<f-button
				${ref(fieldRef)}
				@action=${handleAction}
				label="Merge"
				.actions=${actions}
				selected-action="Merge"
			></f-button>
		</f-div>`;
	},
	name: "@action"
};

export const Flags = {
	render: () =>
		html`<f-div gap="large" padding="x-large" direction="column">
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Loading</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-button label="label"></f-button>
				<f-button label="label" ?loading=${true}></f-button>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-button label="label" icon-left="i-plus"></f-button>
				<f-button label="label" ?loading=${true} icon-left="i-plus"></f-button>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-button label="label" icon-right="i-plus"></f-button>
				<f-button label="label" ?loading=${true} icon-right="i-plus"></f-button>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Disabled</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-button label="label"></f-button>
				<f-button label="label" ?disabled=${true}></f-button>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium"
					>Clickable (Button is always clickable)</f-text
				>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-button label="label"></f-button>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Selected</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-button label="label"></f-button>
				<f-button label="label" selected=${true}></f-button>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Focused</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-button label="label"></f-button>
				<f-button label="label" focused=${true}></f-button>
			</f-div>
			<f-div height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Label Wrap</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="x-large">
				<f-button label="Text-wrap label button"></f-button>
				<f-button label="Text-wrap label button" label-wrap=${true}></f-button>
			</f-div>
		</f-div>`,

	name: "Flags"
};
