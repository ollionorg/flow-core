import { html } from "lit-html";
import fInputAnatomy from "../svg/i-finput-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";

export default {
	title: "@nonfx/flow-core/f-suggest",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, unknown>) => {
		const handleInput = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		const handleKeydown = (event: CustomEvent) => {
			event.stopPropagation();
			event.stopImmediatePropagation();
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-suggest
					value=${args.value}
					.variant=${args.variant}
					.category=${args.category}
					.placeholder=${args.placeholder}
					.suggestions=${args.suggestions}
					@input=${handleInput}
					icon-left=${args["icon-left"]}
					icon-right=${args["icon-right"]}
					prefix=${args["prefix"]}
					suffix=${args["suffix"]}
					state=${args.state}
					max-length=${args["max-length"]}
					?loading=${args.loading}
					?disabled=${args.disabled}
					?clear=${args.clear}
					?read-only=${args.readOnly}
					.size=${args.size}
					.optionsMaxHeight=${args["options-max-height"]}
					@keydown=${handleKeydown}
				>
					<f-div slot="label" padding="none" gap="none">Label</f-div>
					<f-div width="100%" slot="help"
						><f-text variant="para" size="small">This is a Subtext</f-text></f-div
					>
					<f-text slot="subtitle" state="secondary" variant="para" size="small">Optional</f-text>
					<f-icon slot="icon-tooltip" source="i-question-filled" tooltip="some info"></f-icon>
					<f-div slot="no-data" padding="medium"><f-text>this is no-data slot.</f-text></f-div>
				</f-suggest>
			</f-div>
		`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "text"
		},

		slot: {
			control: "text"
		},

		placeholder: {
			control: "text"
		},

		variant: {
			control: "select",
			options: ["curved", "round", "block"]
		},

		category: {
			control: "select",
			options: ["fill", "transparent", "outline"]
		},

		state: {
			control: "select",
			options: ["default", "success", "primary", "warning", "danger"]
		},

		size: {
			control: "radio",
			options: ["small", "medium"]
		},

		["icon-left"]: {
			control: "text"
		},

		["icon-right"]: {
			control: "text"
		},

		["prefix"]: {
			control: "text"
		},

		["suffix"]: {
			control: "text"
		},

		loading: {
			control: "boolean"
		},

		disabled: {
			control: "boolean"
		},

		readOnly: {
			control: "boolean"
		},

		clear: {
			control: "boolean"
		},

		["max-length"]: {
			control: "text"
		},

		["options-max-height"]: {
			control: "text"
		}
	},

	args: {
		value: "",
		placeholder: "Enter your text here",
		variant: "round",
		category: "fill",
		state: "default",
		size: "medium",
		["icon-left"]: undefined,
		["icon-right"]: undefined,
		["prefix"]: undefined,
		["suffix"]: undefined,
		["max-length"]: undefined,
		loading: false,
		disabled: false,
		readOnly: false,
		clear: false,
		suggestions: [
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam iaculis porta dignissim. Etiam a aliquam elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam hendrerit quis lorem cursus consectetur. Donec sem ipsum, scelerisque at nulla vel, rutrum efficitur tortor. Praesent eu tincidunt mauris. Nam eu aliquam turpis. Curabitur placerat maximus tempor. Donec non ante in nunc eleifend elementum eu quis lorem",
			"Suggestion 2",
			"Suggestion 3",
			"Suggestion 4",
			"Suggestion 5",
			"Suggestion 6",
			"Suggestion 7",
			"Suggestion 8",
			"Suggestion 9",
			"Suggestion 10",
			"Suggestion 11",
			"Suggestion 12",
			"Suggestion 13",
			"Suggestion 14",
			"Suggestion 15",
			"Suggestion 16",
			"Suggestion 17",
			"Suggestion 18"
		]
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fInputAnatomy)}</div>`,
	name: "Anatomy"
};

export const Variant = {
	render: () => {
		const variants = ["curved", "round", "block"];
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${variants.map(
					item => html`<f-div>
          <f-suggest
            value=${value}
            placeholder="Write here"
            @input=${handleValue}
            .variant=${item}
            size="medium"
      .suggestions=${[
				"Suggestion 1",
				"Suggestion 2",
				"Suggestion 3",
				"Suggestion 4",
				"Suggestion 5",
				"Suggestion 6",
				"Suggestion 7",
				"Suggestion 8",
				"Suggestion 9",
				"Suggestion 10",
				"Suggestion 11",
				"Suggestion 12",
				"Suggestion 13",
				"Suggestion 14",
				"Suggestion 15",
				"Suggestion 16",
				"Suggestion 17",
				"Suggestion 18"
			]}
          >
             <f-div slot="label" padding="none" gap="none">Label (variant="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>

          </f-suggest></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "variant"
};

export const Category = {
	render: () => {
		const categories = ["fill", "outline", "transparent"];
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${categories.map(
					item => html`<f-div>
          <f-suggest
            value=${value}
            placeholder="Write here"
            @input=${handleValue}
            .category=${item}
            size="medium"
            .variant=${item === "transparent" ? "block" : "curved"}
      .suggestions=${[
				"Suggestion 1",
				"Suggestion 2",
				"Suggestion 3",
				"Suggestion 4",
				"Suggestion 5",
				"Suggestion 6",
				"Suggestion 7",
				"Suggestion 8",
				"Suggestion 9",
				"Suggestion 10",
				"Suggestion 11",
				"Suggestion 12",
				"Suggestion 13",
				"Suggestion 14",
				"Suggestion 15",
				"Suggestion 16",
				"Suggestion 17",
				"Suggestion 18"
			]}
          >
            <f-div slot="label" padding="none" gap="none">Label (category="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-suggest></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "category"
};

export const Value = {
	render: () => {
		const value = "";
		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-suggest
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.suggestions=${[
							"Suggestion 1",
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-suggest></f-div
				></f-div
			>
		`;
	},

	name: "value"
};

export const Placeholder = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-suggest
						value=${value}
						placeholder="This is the placeholder"
						@input=${handleValue}
						size="medium"
						.suggestions=${[
							"Suggestion 1",
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-suggest></f-div
				></f-div
			>
		`;
	},

	name: "placeholder"
};

export const Size = {
	render: () => {
		const sizes = ["small", "medium"];
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${sizes.map(
					item => html`<f-div>
          <f-suggest
            value=${value}
            placeholder="Write here"
            @input=${handleValue}
            size=${item}
      .suggestions=${[
				"Suggestion 1",
				"Suggestion 2",
				"Suggestion 3",
				"Suggestion 4",
				"Suggestion 5",
				"Suggestion 6",
				"Suggestion 7",
				"Suggestion 8",
				"Suggestion 9",
				"Suggestion 10",
				"Suggestion 11",
				"Suggestion 12",
				"Suggestion 13",
				"Suggestion 14",
				"Suggestion 15",
				"Suggestion 16",
				"Suggestion 17",
				"Suggestion 18"
			]}
          >
            <f-div slot="label" padding="none" gap="none">Label (size="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-suggest></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "size"
};

export const State = {
	render: () => {
		const states = [
			["default", "primary", "success"],
			["danger", "warning", "default"]
		];
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div direction="column" gap="medium">
				${states.map(
					item =>
						html` <f-div align="middle-center" padding="large" gap="medium">
							${item.map(
								state =>
									html`<f-div
										><f-suggest
											value=${value}
											placeholder="Write here"
											@input=${handleValue}
											size="medium"
											state=${state}
											.suggestions=${[
												"Suggestion 1",
												"Suggestion 2",
												"Suggestion 3",
												"Suggestion 4",
												"Suggestion 5",
												"Suggestion 6",
												"Suggestion 7",
												"Suggestion 8",
												"Suggestion 9",
												"Suggestion 10",
												"Suggestion 11",
												"Suggestion 12",
												"Suggestion 13",
												"Suggestion 14",
												"Suggestion 15",
												"Suggestion 16",
												"Suggestion 17",
												"Suggestion 18"
											]}
										>
											<f-div slot="label" padding="none" gap="none">Label (state="${state}")</f-div>
											<f-text slot="help" variant="para" size="small"
												>This is a Subtext (Helper Text)</f-text
											>
										</f-suggest></f-div
									>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state"
};

export const Suggestions = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		const template = [
			{
				value: "Hello",

				template: function (value: string) {
					return html`<f-div gap="medium" direction="column"
						><f-text inline highlight=${value}>${this.value}</f-text
						><f-text inline highlight=${value}>subtitle</f-text></f-div
					>`;
				},

				toString: function () {
					return "Hello";
				}
			},
			{
				value: "Hello123",

				template: function (value: string) {
					return html`<f-div gap="medium" direction="column"
						><f-text inline highlight=${value}>${this.value}</f-text
						><f-text inline highlight=${value}>subtitle</f-text></f-div
					>`;
				},

				toString: function () {
					return "Hello123";
				}
			}
		];

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div align="middle-center">
					<f-suggest
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.suggestions=${[
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for array search result</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-suggest></f-div
				>
				<f-div align="middle-center">
					<f-suggest
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.suggestions=${{
							Category1: ["option 1", "option2"],
							Category2: ["option3", "option 4"],
							Category3: ["option5", "option6"]
						}}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for categorized search result</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-suggest></f-div
				>
				<f-div align="middle-center">
					<f-suggest
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						.suggestions=${template}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for custom template search result</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-suggest></f-div
				>
			</f-div>
		`;
	},

	name: "suggestions"
};

export const IconLeft = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-suggest
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						icon-left="i-app"
						.suggestions=${[
							"Suggestion 1",
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for icon-left="i-app" prop</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-suggest></f-div
				></f-div
			>
		`;
	},

	name: "icon-left"
};

export const IconRight = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-suggest
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						icon-left="i-app"
						icon-right="i-delete"
						.suggestions=${[
							"Suggestion 1",
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for icon-right="i-app" prop</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-suggest></f-div
				></f-div
			>
		`;
	},

	name: "icon-right"
};

export const Prefix = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-suggest
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						icon-left="i-app"
						icon-right="i-delete"
						prefix="+91"
						.suggestions=${[
							"Suggestion 1",
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none">This is a demo for prefix</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-suggest></f-div
				></f-div
			>
		`;
	},

	name: "prefix"
};

export const Suffix = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-suggest
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						icon-left="i-app"
						icon-right="i-delete"
						prefix="+91"
						suffix="Delete"
						.suggestions=${[
							"Suggestion 1",
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none">This is a demo for suffix</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-suggest></f-div
				></f-div
			>
		`;
	},

	name: "suffix"
};

export const MaxLength = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-suggest
						value=${value}
						placeholder="Write here"
						@input=${handleValue}
						size="medium"
						icon-left="i-app"
						icon-right="i-delete"
						prefix="+91"
						suffix="Delete"
						max-length="10"
						.suggestions=${[
							"Suggestion 1",
							"Suggestion 2",
							"Suggestion 3",
							"Suggestion 4",
							"Suggestion 5",
							"Suggestion 6",
							"Suggestion 7",
							"Suggestion 8",
							"Suggestion 9",
							"Suggestion 10",
							"Suggestion 11",
							"Suggestion 12",
							"Suggestion 13",
							"Suggestion 14",
							"Suggestion 15",
							"Suggestion 16",
							"Suggestion 17",
							"Suggestion 18"
						]}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-suggest></f-div
				></f-div
			>
		`;
	},

	name: "max-length"
};

export const Flags = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${[0, 1, 2, 3].map(
					item => html`<f-div>
          <f-suggest
            value=${value}
            placeholder="Write here"
            @input=${handleValue}
            size="medium"
            ?loading=${item === 0 ? true : false}
            ?disabled=${item === 1 ? true : false}
            ?clear=${item === 2 ? true : false}
            ?read-only=${item === 3 ? true : false}
      .suggestions=${[
				"Suggestion 1",
				"Suggestion 2",
				"Suggestion 3",
				"Suggestion 4",
				"Suggestion 5",
				"Suggestion 6",
				"Suggestion 7",
				"Suggestion 8",
				"Suggestion 9",
				"Suggestion 10",
				"Suggestion 11",
				"Suggestion 12",
				"Suggestion 13",
				"Suggestion 14",
				"Suggestion 15",
				"Suggestion 16",
				"Suggestion 17",
				"Suggestion 18"
			]}
          >
            <f-div slot="label" padding="none" gap="none">${
							item === 0
								? "Loader"
								: item === 1
								? "Disabled"
								: item === 2
								? "Clear Icon on Type"
								: "Readonly"
						}</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-suggest></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "Flags"
};
