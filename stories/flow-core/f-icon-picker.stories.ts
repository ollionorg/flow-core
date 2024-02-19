import getCategories from "./f-icon-picker-categories";
import { html } from "lit-html";

export default {
	title: "@ollion/flow-core/f-icon-picker",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

const categories = getCategories();

export const Playground = {
	render: (args: Record<string, unknown>) => {
		const handleInput = (e: CustomEvent) => {
			console.log("input event", e);
		};

		return html`
			<f-div width="100%" align="top-left" padding="large">
				<f-div width="hug-content" align="top-left">
					<f-icon-picker
						.categories=${categories}
						.value=${args.value}
						.state=${args.state}
						.size=${args.size}
						.placeholder=${args.placeholder}
						.category=${args.category}
						.variant=${args.variant}
						.recent=${args.recent}
						.include=${args.include}
						.exclude=${args.exclude}
						.exclude-emojis=${args["exclude-emojis"]}
						.custom=${args.custom}
						?disabled=${args.disabled}
						?clear=${args.clear}
						?resizable=${args.resizable}
						.close-on-select=${args["close-on-select"]}
						@input=${handleInput}
					>
						<f-text slot="label" variant="para" size="small">Label</f-text>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-icon-picker>
				</f-div>
			</f-div>
		`;
	},

	name: "Playground",

	argTypes: {
		value: {
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

		disabled: {
			control: "boolean"
		},

		clear: {
			control: "boolean"
		}
	},

	args: {
		value: undefined,
		placeholder: undefined,
		variant: "round",
		category: "fill",
		state: "default",
		size: "medium",
		disabled: false,
		clear: true
	}
};

export const Variant = {
	render: () => {
		const variants = ["curved", "round", "block"];

		const value = "i-plus";
		const handleValue = (e: CustomEvent) => {
			console.log("input event", e);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${variants.map(
					item => html`<f-div width="hug-content">
      <f-icon-picker
      value=${value}
            @input=${handleValue}
            .variant=${item}
            size="medium"
            >
 <f-div slot="label" padding="none" gap="none">Label</f-div>
            <f-text slot="help" variant="para" size="small">Help!</f-text>						</f-icon-picker>
      </f-div
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
			console.log("input event", e);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${categories.map(
					item => html`<f-div width="hug-content">
          <f-icon-picker
            value=${value}
            @input=${handleValue}
            .category=${item}
            size="medium"
            .variant=${item === "transparent" ? "block" : "curved"}
          >
 <f-div slot="label" padding="none" gap="none">Label</f-div>
            <f-text slot="help" variant="para" size="small">Help!</f-text>
          </f-icon-picker></f-div
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
		const value = "⌛";

		const handleValue = (e: CustomEvent) => {
			console.log("input event", e);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="hug-content" align="middle-center">
					<f-icon-picker value=${value} @input=${handleValue} size="medium">
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-icon-picker></f-div
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
			console.log("input event", e);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="hug-content" align="middle-center">
					<f-icon-picker value=${value} placeholder="🧭" @input=${handleValue} size="medium">
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-icon-picker></f-div
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
			console.log("input event", e);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${sizes.map(
					item => html`<f-div width="hug-content">
          <f-icon-picker
            value=${value}
            @input=${handleValue}
            size=${item}
          >
           <f-div slot="label" padding="none" gap="none">Label</f-div>
            <f-text slot="help" variant="para" size="small">Help!</f-text>
          </f-icon-picker></f-div
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
			console.log("input event", e);
		};

		return html`
			<f-div direction="column" gap="medium">
				${states.map(
					item =>
						html` <f-div align="middle-center" padding="large" gap="medium">
							${item.map(
								state =>
									html`<f-div width="hug-content"
										><f-icon-picker
											value=${value}
											@input=${handleValue}
											size="medium"
											state=${state}
										>
											<f-div slot="label" padding="none" gap="none">Label</f-div>
											<f-text slot="help" variant="para" size="small">Help!</f-text>
										</f-icon-picker></f-div
									>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state"
};

export const Flags = {
	render: () => {
		const value = "";

		const handleValue = (e: CustomEvent) => {
			console.log("input event", e);
		};

		return html` <f-div width="100%" align="middle-center" padding="large">
			<f-div direction="column">
				<f-text>disabled=true</f-text>
				<f-div width="hug-content" align="middle-center">
					<f-icon-picker
						.categories=${categories}
						value=${value}
						@input=${handleValue}
						size="medium"
						?disabled=${true}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-icon-picker></f-div
				>
			</f-div>
			<f-div direction="column">
				<f-text>clear=false</f-text>
				<f-div width="hug-content" align="middle-center">
					<f-icon-picker
						.categories=${categories}
						value=${value}
						@input=${handleValue}
						size="medium"
						.clear=${false}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-icon-picker></f-div
				>
			</f-div>
			<f-div direction="column">
				<f-text>close-on-select=true</f-text>
				<f-div width="hug-content" align="middle-center">
					<f-icon-picker
						.categories=${categories}
						value=${value}
						@input=${handleValue}
						size="medium"
						.close-on-select=${true}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-icon-picker></f-div
				>
			</f-div>
		</f-div>`;
	},

	name: "Flags"
};
