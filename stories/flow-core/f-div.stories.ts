import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import FDivAnatomy from "../svg/i-fdiv-anatomy.js";
import { createRef, ref } from "lit/directives/ref.js";
import { FDiv } from "@nonfx/flow-core";

export default {
	title: "@nonfx/flow-core/f-div",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, unknown>) => {
		const handleClick = (event: PointerEvent) => {
			console.log(event);
		};

		return html`
			<f-div
				padding="large"
				gap="x-large"
				direction="row"
				height="hug-content"
				align="middle-center"
			>
				<f-div
					width="100%"
					height="hug-content"
					.padding=${args.padding}
					direction="row"
					.gap=${args.gap}
					.overflow=${args.overflow}
					.variant=${args.variant}
					.direction=${args.direction}
					.state=${args.state}
					.border=${args.border}
					.align=${args.align}
					.disabled=${args.disabled}
					.clickable=${args.clickable}
					.loading=${args.loading}
					.maxWidth=${args["max-width"]}
					.maxHeight=${args["max-height"]}
					@click=${handleClick}
				>
					<f-div
						.variant=${args.variant}
						.width=${args.width}
						.height=${args.height}
						state="success"
						.sticky=${args.sticky}
						.selected=${args.selected}
						padding="large"
					>
						<f-div
							padding="large"
							height="hug-content"
							.border=${args.border}
							.state=${args.state}
							direction="column"
							gap="medium"
						>
							<f-text variant="para" size="large" weight="regular" state="inherit"
								>Dynamic state f-div -> ${args.state} state
							</f-text>
							${args.state === "inherit"
								? html` <f-text variant="para" size="large" weight="regular" state="inherit"
										>Inherited "success" state from its parent f-div
								  </f-text>`
								: null}
							<f-div
								padding="large"
								height="hug-content"
								.border=${args.border}
								state="inherit"
								gap="medium"
							>
								<f-text variant="para" size="small" weight="regular" state="inherit">
									This f-div even have state="inherit" so <br /><br />its state is even derived from
									its parent f-div ${args.state} state. <br /><br />
									<br />
									<br />
									Child f-div with
									<br />
									<br />
									height: ${args.height} width: ${args.width}
								</f-text>
								<f-counter label="888" size="medium" state="inherit"></f-counter>
								<f-icon state="inherit" source="i-plus"></f-icon>
							</f-div>
						</f-div>
					</f-div>
					<f-div
						.variant=${args.variant}
						width="300px"
						height="hug-content"
						padding="x-large"
						state="secondary"
						id="abc-1"
						?highlight=${args.highlight}
					>
						<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
					</f-div>
					<f-div
						.variant=${args.variant}
						width="300px"
						height="hug-content"
						padding="x-large"
						state="secondary"
					>
						<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
					</f-div>
					<f-div
						.variant=${args.variant}
						width="300px"
						height="hug-content"
						padding="x-large"
						state="secondary"
					>
						<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
					</f-div>
					<f-div
						.variant=${args.variant}
						width="300px"
						height="hug-content"
						padding="x-large"
						state="secondary"
					>
						<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
					</f-div>
				</f-div>
			</f-div>
		`;
	},

	argTypes: {
		variant: {
			control: "radio",
			options: ["curved", "block", "round"]
		},

		direction: {
			control: "radio",
			options: ["row", "column"]
		},

		state: {
			control: "select",

			options: [
				"transparent",
				"default",
				"subtle",
				"secondary",
				"tertiary",
				"primary",
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

		border: {
			control: "select",

			options: [
				"large",
				"medium",
				"small",
				"medium solid",
				"medium dotted",
				"medium dashed",
				"medium solid default",
				"medium solid secondary",
				"medium solid subtle",
				"medium solid default top",
				"medium solid default bottom",
				"medium solid default left",
				"medium solid default right",
				"medium solid default around"
			]
		},

		gap: {
			control: "select",
			options: ["auto", "x-large", "large", "medium", "small", "x-small", "none"]
		},

		padding: {
			control: "select",
			options: ["x-large", "large", "medium", "small", "x-small", "none"]
		},

		width: {
			control: "select",
			options: ["hug-content", "fill-container"]
		},

		height: {
			control: "select",
			options: ["hug-content", "fill-container"]
		},

		["max-width"]: {
			control: "text"
		},

		["max-height"]: {
			control: "text"
		},

		overflow: {
			control: "radio",
			options: ["wrap", "scroll", "hidden", "visible"]
		},

		align: {
			control: "select",

			options: [
				"top-left",
				"top-center",
				"top-right",
				"bottom-left",
				"bottom-center",
				"bottom-right",
				"middle-left",
				"middle-center",
				"middle-right"
			]
		},

		sticky: {
			control: "select",
			options: ["none", "top", "bottom", "right", "left"]
		},

		selected: {
			control: "select",
			options: ["background", "border", "notch-right", "notch-left", "None"]
		},

		highlight: {
			control: {
				type: "boolean"
			}
		},

		loading: {
			control: "radio",
			options: ["loader", "skeleton", "None"]
		},

		clickable: {
			control: {
				type: "boolean"
			},

			if: {
				arg: "disabled",
				eq: false
			}
		},

		disabled: {
			control: {
				type: "boolean"
			},

			if: {
				arg: "clickable",
				eq: false
			}
		}
	},

	args: {
		variant: "block",
		direction: "row",
		state: "default",
		border: "medium solid default around",
		gap: "x-large",
		padding: "medium",
		width: "hug-content",
		height: "hug-content",
		["max-width"]: undefined,
		["max-height"]: undefined,
		overflow: "wrap",
		align: "top-left",
		sticky: "none",
		selected: "",
		loading: "",
		highlight: false,
		disabled: false,
		clickable: false
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(FDivAnatomy)}</div>`,
	name: "Anatomy"
};

export const Variant = {
	render: () =>
		html`<f-div gap="medium" padding="none">
			<f-div
				state="subtle"
				height="180px"
				variant="block"
				direction="column"
				padding="medium"
				gap="medium"
			>
				<f-div padding="none" height="hug-content">
					<f-text variant="para" weight="medium" size="large"
						>An f-div with no corner radius.
					</f-text>
				</f-div>
				<f-div padding="none" height="hug-content">
					<f-text variant="code" weight="medium" size="large">variant="block" </f-text>
				</f-div>
			</f-div>
			<f-div
				state="subtle"
				height="180px"
				variant="curved"
				direction="column"
				padding="medium"
				gap="medium"
			>
				<f-div padding="none" height="hug-content">
					<f-text variant="para" weight="medium" size="large"
						>f-div with with corner radius of 4px.
					</f-text>
				</f-div>
				<f-div padding="none" height="hug-content">
					<f-text variant="code" weight="medium" size="large">variant=”curved” </f-text>
				</f-div>
			</f-div>
			<f-div
				state="subtle"
				height="180px"
				variant="round"
				direction="column"
				padding="x-large"
				gap="medium"
			>
				<f-div padding="none" height="hug-content">
					<f-text variant="para" weight="medium" size="large"
						>An f-div with height/2 px corner radius.
					</f-text>
				</f-div>
				<f-div padding="none" height="hug-content">
					<f-text variant="code" weight="medium" size="large">variant="round" </f-text>
				</f-div>
			</f-div>
		</f-div>`,

	name: "variant"
};

export const Direction = {
	render: () =>
		html`<f-div gap="medium" padding="none" direction="column">
			<f-div width="100%" padding="large" direction="row" gap="medium" state="subtle">
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div
				width="hug-content"
				height="hug-content"
				padding="large"
				direction="column"
				gap="medium"
				state="subtle"
			>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
		</f-div>`,

	name: "direction"
};

export const State = {
	render: () =>
		html`<f-div gap="medium" padding="none" direction="column">
			<f-div gap="medium" padding="large" state="transparent" width="100%" height="hug-content">
				<f-text variant="para" size="large" weight="medium">transparent state</f-text>
			</f-div>
			<f-div gap="medium" padding="large" state="default" width="100%" height="hug-content">
				<f-text variant="para" size="large" weight="medium">default state</f-text>
			</f-div>
			<f-div gap="medium" padding="large" state="subtle" width="100%" height="hug-content">
				<f-text variant="para" size="large" weight="medium">subtle state</f-text>
			</f-div>
			<f-div gap="medium" padding="large" state="secondary" width="100%" height="hug-content">
				<f-text variant="para" size="large" weight="medium">secondary state</f-text>
			</f-div>
			<f-div gap="medium" padding="large" state="tertiary" width="100%" height="hug-content">
				<f-text variant="para" size="large" weight="medium">tertiary state</f-text>
			</f-div>
			<f-div gap="medium" padding="large" state="primary" width="100%" height="hug-content">
				<f-text variant="para" size="large" weight="medium">primary state</f-text>
			</f-div>
			<f-div gap="medium" padding="large" state="success" width="100%" height="hug-content">
				<f-text variant="para" size="large" weight="medium">success state</f-text>
			</f-div>
			<f-div gap="medium" padding="large" state="warning" width="100%" height="hug-content">
				<f-text variant="para" size="large" weight="medium">warning state</f-text>
			</f-div>
			<f-div gap="medium" padding="large" state="danger" width="100%" height="hug-content">
				<f-text variant="para" size="large" weight="medium">danger state</f-text>
			</f-div>
		</f-div>`,

	name: "state"
};

export const Border = {
	render: () =>
		html` <f-div gap="medium" padding="none" direction="column">
			<f-div padding="medium" gap="large" width="100%" height="hug-content" state="default">
				<f-div padding="medium" height="hug-content" border="large" state="secondary">
					<f-text variant="para" size="large" weight="medium">border-width=large</f-text>
				</f-div>
				<f-div padding="medium" height="hug-content" border="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">border-width=medium</f-text>
				</f-div>
				<f-div padding="medium" height="hug-content" border="small" state="secondary">
					<f-text variant="para" size="large" weight="medium">border-width=small</f-text>
				</f-div>
			</f-div>
			<f-div padding="medium" gap="large" width="100%" height="hug-content" state="default">
				<f-div padding="medium" height="hug-content" border="large solid" state="secondary">
					<f-text variant="para" size="large" weight="medium">border-style=solid</f-text>
				</f-div>
				<f-div padding="medium" height="hug-content" border="large dashed" state="secondary">
					<f-text variant="para" size="large" weight="medium">border-style=dashed</f-text>
				</f-div>
				<f-div padding="medium" height="hug-content" border="large dotted" state="secondary">
					<f-text variant="para" size="large" weight="medium">border-style=dotted</f-text>
				</f-div>
			</f-div>
			<f-div padding="medium" gap="large" width="100%" height="hug-content" state="default">
				<f-div
					padding="medium"
					height="hug-content"
					border="medium solid default"
					state="secondary"
				>
					<f-text variant="para" size="large" weight="medium">border-color=default</f-text>
				</f-div>
				<f-div
					padding="medium"
					height="hug-content"
					border="medium solid secondary"
					state="secondary"
				>
					<f-text variant="para" size="large" weight="medium">border-color=secondary</f-text>
				</f-div>
				<f-div padding="medium" height="hug-content" border="medium solid subtle" state="secondary">
					<f-text variant="para" size="large" weight="medium">border-color=subtle</f-text>
				</f-div>
			</f-div>
			<f-div padding="medium" gap="large" width="100%" height="hug-content" state="default">
				<f-div
					padding="medium"
					height="hug-content"
					border="medium solid default top"
					state="secondary"
				>
					<f-text variant="para" size="large" weight="medium">border-position=bottom</f-text>
				</f-div>
				<f-div
					padding="medium"
					height="hug-content"
					border="medium solid default bottom"
					state="secondary"
				>
					<f-text variant="para" size="large" weight="medium">border-position=top</f-text>
				</f-div>
				<f-div
					padding="medium"
					height="hug-content"
					border="medium solid default left"
					state="secondary"
				>
					<f-text variant="para" size="large" weight="medium">border-position=left</f-text>
				</f-div>
				<f-div
					padding="medium"
					height="hug-content"
					border="medium solid default right"
					state="secondary"
				>
					<f-text variant="para" size="large" weight="medium">border-position=right</f-text>
				</f-div>
				<f-div
					padding="medium"
					height="hug-content"
					border="medium solid default around"
					state="secondary"
				>
					<f-text variant="para" size="large" weight="medium">border-position=around</f-text>
				</f-div>
			</f-div>
		</f-div>`,

	name: "border"
};

export const Gap = {
	render: () =>
		html`<f-div gap="medium" padding="none" direction="column">
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">gap="auto"</f-text>
			</f-div>
			<f-div width="100%" padding="large" direction="row" gap="auto" state="subtle">
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">gap="x-large"</f-text>
			</f-div>
			<f-div width="100%" padding="large" direction="row" gap="x-large" state="subtle">
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">gap="large"</f-text>
			</f-div>
			<f-div width="100%" padding="large" direction="row" gap="large" state="subtle">
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">gap="medium"</f-text>
			</f-div>
			<f-div width="100%" padding="large" direction="row" gap="medium" state="subtle">
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">gap="small"</f-text>
			</f-div>
			<f-div width="100%" padding="large" direction="row" gap="small" state="subtle">
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">gap="x-small"</f-text>
			</f-div>
			<f-div width="100%" padding="large" direction="row" gap="x-small" state="subtle">
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">gap="none"</f-text>
			</f-div>
			<f-div width="100%" padding="large" direction="row" gap="none" state="subtle">
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="tertiary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
		</f-div>`,

	name: "gap"
};

export const Padding = {
	render: () =>
		html`<f-div gap="medium" padding="none" direction="column">
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">padding="x-large"</f-text>
			</f-div>
			<f-div width="100%" padding="x-large" direction="row" gap="x-large" state="subtle">
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">padding="large"</f-text>
			</f-div>
			<f-div width="100%" padding="large" direction="row" gap="x-large" state="subtle">
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">padding="medium"</f-text>
			</f-div>
			<f-div width="100%" padding="medium" direction="row" gap="x-large" state="subtle">
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">padding="small"</f-text>
			</f-div>
			<f-div width="100%" padding="small" direction="row" gap="x-large" state="subtle">
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">padding="x-small"</f-text>
			</f-div>
			<f-div width="100%" padding="x-small" direction="row" gap="x-large" state="subtle">
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">padding="none"</f-text>
			</f-div>
			<f-div width="100%" padding="none" direction="row" gap="x-large" state="subtle">
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="tertiary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
		</f-div>`,

	name: "padding"
};

export const Width = {
	render: () =>
		html`<f-div gap="medium" padding="none" direction="column">
			<f-div
				width="fill-container"
				padding="large"
				direction="row"
				gap="x-large"
				state="subtle"
				align="middle-center"
			>
				<f-div width="hug-content" height="hug-content" padding="x-large">
					<f-text variant="para" size="large" weight="medium">width="fill-container"</f-text>
				</f-div>
			</f-div>
			<f-div
				width="hug-content"
				padding="large"
				direction="row"
				gap="x-large"
				state="subtle"
				align="middle-center"
			>
				<f-div width="hug-content" height="hug-content" padding="x-large">
					<f-text variant="para" size="large" weight="medium">width="hug-content"</f-text>
				</f-div>
			</f-div>
			<f-div
				width="500px"
				padding="large"
				direction="row"
				gap="x-large"
				state="subtle"
				align="middle-center"
			>
				<f-div width="hug-content" height="hug-content" padding="x-large">
					<f-text variant="para" size="large" weight="medium"
						>width="{num-value}" (e.g. 240px, 100%)</f-text
					>
				</f-div>
			</f-div>
		</f-div>`,

	name: "width"
};

export const Height = {
	render: () =>
		html`<f-div gap="medium" padding="none" direction="row" height="100%">
			<f-div
				height="fill-container"
				padding="large"
				gap="x-large"
				state="subtle"
				align="middle-center"
			>
				<f-div width="hug-content" height="hug-content" padding="x-large">
					<f-text variant="para" size="large" weight="medium">width="fill-container"</f-text>
				</f-div>
			</f-div>
			<f-div
				height="hug-content"
				padding="large"
				gap="x-large"
				state="subtle"
				align="middle-center"
			>
				<f-div width="hug-content" height="hug-content" padding="x-large">
					<f-text variant="para" size="large" weight="medium">width="hug-content"</f-text>
				</f-div>
			</f-div>
			<f-div height="500px" padding="large" gap="x-large" state="subtle" align="middle-center">
				<f-div width="hug-content" height="hug-content" padding="x-large">
					<f-text variant="para" size="large" weight="medium"
						>width=500px (e.g. 240px, 100%)</f-text
					>
				</f-div>
			</f-div>
		</f-div>`,

	name: "height"
};

export const MaxWidth = {
	render: () =>
		html`<f-div gap="medium" padding="none" direction="column">
			<f-div
				width="fill-container"
				padding="large"
				direction="row"
				gap="x-large"
				state="subtle"
				align="middle-center"
			>
				<f-div width="hug-content" height="hug-content" padding="x-large">
					<f-text variant="para" size="large" weight="medium">div without max-width</f-text>
				</f-div>
			</f-div>
			<f-div
				width="fill-container"
				padding="large"
				direction="row"
				gap="x-large"
				state="subtle"
				align="middle-center"
				max-width="200px"
			>
				<f-div width="hug-content" height="hug-content" padding="x-large">
					<f-text variant="para" size="large" weight="medium">max-width="200px"</f-text>
				</f-div>
			</f-div>
		</f-div>`,

	name: "max-width"
};

export const MaxHeight = {
	render: () =>
		html`<f-div gap="medium" padding="none" direction="row" height="100%">
			<f-div
				height="fill-container"
				padding="large"
				gap="x-large"
				state="subtle"
				align="middle-center"
			>
				<f-div width="hug-content" height="hug-content" padding="x-large">
					<f-text variant="para" size="large" weight="medium">div without max-height</f-text>
				</f-div>
			</f-div>
			<f-div
				height="fill-container"
				padding="large"
				gap="x-large"
				state="subtle"
				align="middle-center"
				max-height="200px"
			>
				<f-div width="hug-content" height="hug-content" padding="x-large">
					<f-text variant="para" size="large" weight="medium">max-height="200px"</f-text>
				</f-div>
			</f-div>
		</f-div>`,

	name: "max-height"
};

export const Tooltip = {
	render: () =>
		html`<f-div gap="medium" padding="none" direction="column">
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Tooltip as a directive</f-text>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				tooltip="Tooltip content"
			>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">Rich Tooltip</f-text>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				tooltip="#Tooltip-ID"
			>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="hug-content" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-tooltip id="Tolltip-ID">
				<f-row><f-text>Tooltip content</f-text></f-row>
			</f-tooltip>
		</f-div>`,

	name: "tooltip"
};

export const Overflow = {
	render: () =>
		html`<f-div gap="medium" padding="none" direction="column">
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">overflow="wrap"</f-text>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				overflow="wrap"
			>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">overflow="scroll"</f-text>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				overflow="scroll"
			>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">overflow="hidden"</f-text>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				overflow="hidden"
			>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">overflow="visible"</f-text>
			</f-div>
			<f-div
				width="100%"
				height="100px"
				padding="x-large"
				direction="column"
				gap="x-large"
				state="subtle"
				overflow="visible"
			>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
		</f-div>`,

	name: "overflow"
};

export const Align = {
	render: () =>
		html`<f-div gap="medium" padding="none" direction="column">
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				height="150px"
				align="top-left"
			>
				<f-div width="200px" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">align="top-left"</f-text>
				</f-div>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				height="150px"
				align="top-center"
			>
				<f-div width="200px" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">align="top-center"</f-text>
				</f-div>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				height="150px"
				align="top-right"
			>
				<f-div width="200px" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">align="top-right"</f-text>
				</f-div>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				height="150px"
				align="middle-left"
			>
				<f-div width="200px" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">align="middle-left"</f-text>
				</f-div>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				height="150px"
				align="middle-center"
			>
				<f-div width="200px" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">align="middle-center"</f-text>
				</f-div>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				height="150px"
				align="middle-right"
			>
				<f-div width="200px" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">align="middle-right"</f-text>
				</f-div>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				height="150px"
				align="bottom-left"
			>
				<f-div width="200px" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">align="bottom-left"</f-text>
				</f-div>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				height="150px"
				align="bottom-center"
			>
				<f-div width="200px" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">align="bottom-center"</f-text>
				</f-div>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				height="150px"
				align="bottom-right"
			>
				<f-div width="200px" height="hug-content" padding="medium" state="secondary">
					<f-text variant="para" size="large" weight="medium">align="bottom-right"</f-text>
				</f-div>
			</f-div>
		</f-div>`,

	name: "align"
};

export const Sticky = {
	render: () =>
		html`<f-div gap="medium" padding="large" direction="column">
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">sticky="none"</f-text>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				overflow="scroll"
			>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary" sticky="none">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">sticky="top"</f-text>
			</f-div>
			<f-div
				height="200px"
				padding="x-large"
				direction="column"
				gap="x-large"
				state="subtle"
				overflow="scroll"
			>
				<f-div
					width="300px"
					height="hug-content"
					padding="x-large"
					state="secondary"
					sticky="top"
					border="medium solid default around"
				>
					<f-text variant="para" size="large" weight="medium">sticky-top f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">sticky="bottom"</f-text>
			</f-div>
			<f-div
				height="200px"
				padding="x-large"
				direction="column"
				gap="x-large"
				state="subtle"
				overflow="scroll"
			>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div
					width="300px"
					height="hug-content"
					padding="x-large"
					state="secondary"
					sticky="bottom"
					border="medium solid default around"
				>
					<f-text variant="para" size="large" weight="medium">sticky-bottom f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">sticky="right"</f-text>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				overflow="scroll"
			>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div
					width="300px"
					height="hug-content"
					padding="x-large"
					state="secondary"
					sticky="right"
					border="medium solid default around"
				>
					<f-text variant="para" size="large" weight="medium">sticky-right f-div</f-text>
				</f-div>
			</f-div>
			<f-div width="hug-content" height="hug-content" padding="none">
				<f-text variant="para" size="large" weight="medium">sticky="left"</f-text>
			</f-div>
			<f-div
				width="100%"
				padding="x-large"
				direction="row"
				gap="x-large"
				state="subtle"
				overflow="scroll"
			>
				<f-div
					width="300px"
					height="hug-content"
					padding="x-large"
					state="secondary"
					sticky="left"
					border="medium solid default around"
				>
					<f-text variant="para" size="large" weight="medium">sticky-left f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
				<f-div width="300px" height="hug-content" padding="x-large" state="secondary">
					<f-text variant="para" size="large" weight="medium">Child f-div</f-text>
				</f-div>
			</f-div>
		</f-div>`,

	name: "sticky"
};

export const Selected = {
	render: () =>
		html`<f-div gap="medium" padding="x-large" direction="row">
			<f-div padding="x-large" state="subtle" width="hug-content" selected="background"
				><f-text variant="para" size="medium" weight="regular">selected="background"</f-text>
			</f-div>
			<f-div padding="x-large" state="subtle" width="hug-content" selected="border"
				><f-text variant="para" size="medium" weight="regular">selected="border"</f-text></f-div
			>
			<f-div padding="x-large" state="subtle" width="hug-content" selected="notch-right"
				><f-text variant="para" size="medium" weight="regular"
					>selected="notch-right"</f-text
				></f-div
			>
			<f-div padding="x-large" state="subtle" width="hug-content" selected="notch-left"
				><f-text variant="para" size="medium" weight="regular">selected="notch-left"</f-text></f-div
			>
		</f-div>`,

	name: "selected"
};

export const ShowScrollbar = {
	render: () =>
		html` <f-text state="secondary"
				>default behaviour when content overflows, scrollbar is hidden</f-text
			>
			<f-div gap="medium" direction="column" padding="medium" height="200px" direction="row">
				<f-text
					>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero eros, ultrices eu
					tortor ut, fermentum vehicula augue. Fusce pellentesque odio interdum eros aliquet
					pharetra. Morbi venenatis lobortis vehicula. Mauris imperdiet hendrerit dolor ac
					consequat. Sed venenatis tortor enim, tincidunt tristique justo dictum at. Aliquam
					dignissim auctor odio et fermentum. Cras vitae nisi magna. Vivamus a sem molestie,
					venenatis tortor ac, tincidunt nibh. Phasellus mi erat, euismod id pulvinar sit amet,
					tincidunt quis eros. Pellentesque a metus elementum, posuere tortor nec, pulvinar turpis.
					Maecenas est risus, bibendum id ornare nec, posuere eget massa. Sed finibus quis felis vel
					imperdiet. Morbi consequat sapien sem. Integer sed eros efficitur, egestas diam ut,
					gravida urna. Curabitur tincidunt est et convallis aliquam. Sed consectetur dui ut ligula
					sollicitudin rhoncus. Donec luctus ut massa non tempus. Sed a euismod tortor. Suspendisse
					nunc quam, vulputate vel scelerisque non, viverra a enim. Nam leo justo, egestas sit amet
					metus porttitor, hendrerit dignissim felis. Aliquam et leo mollis, ultricies metus
					gravida, blandit ipsum. Vivamus lobortis neque id luctus tincidunt. Maecenas neque felis,
					faucibus id mi non, laoreet lacinia dui. Donec eleifend semper commodo. Aliquam erat
					volutpat. Nunc non velit nunc. Sed accumsan pretium massa sed dignissim. Ut eu fringilla
					justo. Quisque rhoncus dictum velit in finibus. Mauris at velit lobortis, condimentum ex
					ac, scelerisque est. Morbi diam metus, ornare vitae rhoncus vel, maximus sit amet arcu.
					Aliquam placerat finibus tincidunt. Phasellus sagittis odio eget lorem ullamcorper
					dapibus. Integer massa turpis, sollicitudin et mattis nec, suscipit et turpis. Lorem ipsum
					dolor sit amet, consectetur adipiscing elit. Mauris pretium risus eu quam gravida, vitae
					tempus eros ullamcorper. Maecenas sed odio quis erat facilisis fermentum non ultricies
					tellus. Sed pellentesque accumsan turpis. Morbi ut orci consequat, sodales nibh quis,
					ultricies magna.</f-text
				>
			</f-div>
			<br /><br />
			<f-divider></f-divider>
			<br /><br />
			<f-text>show-scrollbar is set (Note: Users can still scroll through the content.)</f-text>
			<f-div
				gap="medium"
				direction="column"
				show-scrollbar
				padding="medium"
				height="200px"
				direction="row"
			>
				<f-text
					>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec libero eros, ultrices eu
					tortor ut, fermentum vehicula augue. Fusce pellentesque odio interdum eros aliquet
					pharetra. Morbi venenatis lobortis vehicula. Mauris imperdiet hendrerit dolor ac
					consequat. Sed venenatis tortor enim, tincidunt tristique justo dictum at. Aliquam
					dignissim auctor odio et fermentum. Cras vitae nisi magna. Vivamus a sem molestie,
					venenatis tortor ac, tincidunt nibh. Phasellus mi erat, euismod id pulvinar sit amet,
					tincidunt quis eros. Pellentesque a metus elementum, posuere tortor nec, pulvinar turpis.
					Maecenas est risus, bibendum id ornare nec, posuere eget massa. Sed finibus quis felis vel
					imperdiet. Morbi consequat sapien sem. Integer sed eros efficitur, egestas diam ut,
					gravida urna. Curabitur tincidunt est et convallis aliquam. Sed consectetur dui ut ligula
					sollicitudin rhoncus. Donec luctus ut massa non tempus. Sed a euismod tortor. Suspendisse
					nunc quam, vulputate vel scelerisque non, viverra a enim. Nam leo justo, egestas sit amet
					metus porttitor, hendrerit dignissim felis. Aliquam et leo mollis, ultricies metus
					gravida, blandit ipsum. Vivamus lobortis neque id luctus tincidunt. Maecenas neque felis,
					faucibus id mi non, laoreet lacinia dui. Donec eleifend semper commodo. Aliquam erat
					volutpat. Nunc non velit nunc. Sed accumsan pretium massa sed dignissim. Ut eu fringilla
					justo. Quisque rhoncus dictum velit in finibus. Mauris at velit lobortis, condimentum ex
					ac, scelerisque est. Morbi diam metus, ornare vitae rhoncus vel, maximus sit amet arcu.
					Aliquam placerat finibus tincidunt. Phasellus sagittis odio eget lorem ullamcorper
					dapibus. Integer massa turpis, sollicitudin et mattis nec, suscipit et turpis. Lorem ipsum
					dolor sit amet, consectetur adipiscing elit. Mauris pretium risus eu quam gravida, vitae
					tempus eros ullamcorper. Maecenas sed odio quis erat facilisis fermentum non ultricies
					tellus. Sed pellentesque accumsan turpis. Morbi ut orci consequat, sodales nibh quis,
					ultricies magna.</f-text
				>
			</f-div>`,

	name: "show-scrollbar"
};

export const Loading = {
	render: () =>
		html`<f-div gap="medium" padding="x-large" direction="row">
			<f-div padding="none" direction="column" align="middle-center" gap="large">
				<f-div padding="none" width="hug-content" align="middle-center"
					><f-text variant="para" size="medium" weight="regular" align="center"
						>loading="loader"</f-text
					>
				</f-div>
				<f-div padding="small" state="subtle" width="200px" loading="loader" align="middle-center"
					><f-text variant="para" size="medium" weight="regular">loader</f-text></f-div
				>
			</f-div>
			<f-div padding="none" direction="column" align="middle-center" gap="large">
				<f-div padding="none" width="hug-content" align="middle-center"
					><f-text variant="para" size="medium" weight="regular" align="center"
						>loading="skeleton"</f-text
					>
				</f-div>
				<f-div
					padding="small"
					state="subtle"
					width="200px"
					gap="large"
					loading="skeleton"
					align="middle-center"
					><f-text variant="para" size="medium" weight="regular">loader</f-text>
					<f-pictogram source="i-plus"></f-pictogram>
					<f-icon source="i-plus"></f-icon>
					<f-icon-button icon="i-plus"></f-icon-button>
					<f-button label="TEst"></f-button>
					<f-counter tooltip="Test" label="7889"></f-counter>
					<f-tag label="test" icon-left="i-plus"></f-tag>
				</f-div>
			</f-div>
		</f-div>`,

	name: "loading"
};

export const Flags = {
	render: () => {
		const highlight = false;

		const highlightDiv = createRef<FDiv>();
		const toggleHighlight = () => {
			if (highlightDiv.value) {
				highlightDiv.value.highlight = !highlightDiv.value.highlight;
			}
		};

		return html`<f-div gap="medium" padding="x-large" direction="column">
			<f-div padding="none" width="hug-content" align="middle-center"
				><f-text variant="para" size="medium" weight="regular" align="center">Disabled</f-text>
			</f-div>
			<f-div padding="none" direction="row" gap="large">
				<f-div
					gap="medium"
					padding="large"
					width="hug-content"
					height="hug-content"
					state="subtle"
					variant="curved"
				>
					<f-div
						gap="medium"
						padding="large"
						width="100px"
						height="hug-content"
						state="primary"
						variant="curved"
					></f-div>
					<f-div
						gap="medium"
						padding="large"
						width="100px"
						height="hug-content"
						state="primary"
						variant="curved"
					></f-div>
					<f-div
						gap="medium"
						padding="large"
						width="100px"
						height="hug-content"
						state="primary"
						variant="curved"
					></f-div>
				</f-div>
				<f-div
					gap="medium"
					padding="large"
					width="hug-content"
					height="hug-content"
					state="subtle"
					variant="curved"
					disabled
				>
					<f-div
						gap="medium"
						padding="large"
						width="100px"
						height="hug-content"
						state="primary"
						variant="curved"
					></f-div>
					<f-div
						gap="medium"
						padding="large"
						width="100px"
						height="hug-content"
						state="primary"
						variant="curved"
					></f-div>
					<f-div
						gap="medium"
						padding="large"
						width="100px"
						height="hug-content"
						state="primary"
						variant="curved"
					></f-div>
				</f-div>
			</f-div>
			<f-div padding="none" width="hug-content" align="middle-center"
				><f-text variant="para" size="medium" weight="regular" align="center">Clickable</f-text>
			</f-div>
			<f-div
				gap="medium"
				padding="large"
				width="hug-content"
				height="hug-content"
				state="subtle"
				variant="curved"
				clickable
			>
				<f-div
					gap="medium"
					padding="large"
					width="100px"
					height="hug-content"
					state="primary"
					variant="curved"
				></f-div>
				<f-div
					gap="medium"
					padding="large"
					width="100px"
					height="hug-content"
					state="primary"
					variant="curved"
				></f-div>
				<f-div
					gap="medium"
					padding="large"
					width="100px"
					height="hug-content"
					state="primary"
					variant="curved"
				></f-div>
			</f-div>
			<f-div padding="none" width="hug-content" align="middle-center"
				><f-text variant="para" size="medium" weight="regular" align="center"
					>Higlight : When the highlight is enabled, the corresponding F-div is emphasized, and the
					remaining content is obscured by an overlay..</f-text
				>
			</f-div>
			<f-button label="Highlight Toggle" @click=${toggleHighlight}></f-button>
			<f-div
				gap="medium"
				padding="large"
				width="hug-content"
				height="hug-content"
				state="secondary"
				variant="curved"
				${ref(highlightDiv)}
				?highlight=${highlight}
			>
				<f-div
					gap="medium"
					padding="large"
					width="100px"
					height="hug-content"
					state="primary"
					variant="curved"
				></f-div>
				<f-div
					gap="medium"
					padding="large"
					width="100px"
					height="hug-content"
					state="primary"
					variant="curved"
				></f-div>
				<f-div
					gap="medium"
					padding="large"
					width="100px"
					height="hug-content"
					state="primary"
					variant="curved"
				></f-div>
			</f-div>
		</f-div>`;
	},

	name: "Flags"
};
