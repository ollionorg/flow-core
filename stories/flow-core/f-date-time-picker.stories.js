import { html } from "lit-html";
import fDateTimePickerAnatomy from "../svg/i-fdate-time-picker-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useEffect, useState } from "@storybook/client-api";

export default {
	title: "@nonfx/flow-core/f-date-time-picker",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const [_, updateArgs] = useArgs();

		const handleInput = e => {
			console.log(e.detail);

			updateArgs({
				value: e.detail.date
			});
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-date-time-picker
						aria-label="Date time Picker"
						.mode=${args.mode}
						.value=${args.value}
						.size=${args.size}
						.state=${args.state}
						.variant=${args.variant}
						.category=${args.category}
						.placeholder=${args.placeholder}
						min-date=${args["min-date"]}
						max-date=${args["max-date"]}
						disable-date=${args["disable-date"]}
						@input=${handleInput}
						?is-range=${args["is-range"]}
						?inline=${args.inline}
						?week-number=${args["week-number"]}
						?loading=${args.loading}
						?disabled=${args.disabled}
						.clear=${args.clear}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext</f-text>
					</f-date-time-picker>
				</f-div></f-div
			>
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

		mode: {
			control: "radio",
			options: ["date-time", "date-only", "time-only"]
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

		["min-date"]: {
			control: "text"
		},

		["max-date"]: {
			control: "text"
		},

		["disable-date"]: {
			control: "object"
		},

		["is-range"]: {
			control: "boolean"
		},

		loading: {
			control: "boolean"
		},

		disabled: {
			control: "boolean"
		},

		clear: {
			control: "boolean"
		},

		["week-number"]: {
			control: "boolean"
		},

		inline: {
			control: "boolean"
		}
	},

	args: {
		placeholder: "Enter your text here",
		variant: "round",
		mode: "date-time",
		value: new Date(),
		category: "fill",
		state: "default",
		size: "medium",

		["min-date"]: undefined,
		["max-date"]: undefined,
		["disable-date"]: [],
		["is-range"]: false,
		inline: false,
		["week-number"]: false,
		loading: false,
		disabled: false,
		clear: false
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fDateTimePickerAnatomy)}</div>`,
	name: "Anatomy"
};

export const Variant = {
	render: args => {
		const variants = ["curved", "round", "block"];
		const [value, setValue] = useState(new Date());

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${variants.map(
					item => html`<f-div>
          <f-date-time-picker
            value=${value}
            @input=${handleValue}
            .variant=${item}
            size="medium"
          >
             <f-div slot="label" padding="none" gap="none">Label (variant="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-date-time-picker></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "variant"
};

export const Category = {
	render: args => {
		const categories = ["fill", "outline", "transparent"];
		const [value, setValue] = useState(new Date());

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${categories.map(
					item => html`<f-div>
          <f-date-time-picker
            value=${value}
            @input=${handleValue}
            .category=${item}
            size="medium"
            .variant=${item === "transparent" ? "block" : "curved"}
          >
            <f-div slot="label" padding="none" gap="none">Label (category="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-date-time-picker></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "category"
};

export const Mode = {
	render: args => {
		const types = [["date-time", "date-only", "time-only"]];
		const [value, setValue] = useState(new Date());

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div direction="column" gap="medium">
				${types.map(
					item =>
						html` <f-div align="middle-center" padding="large" gap="medium">
							${item.map(
								type =>
									html`<f-div
										><f-date-time-picker
											value=${value}
											@input=${handleValue}
											mode=${type}
											size="medium"
										>
											<f-div slot="label" padding="none" gap="none">Label (mode="${type}")</f-div>
											<f-text slot="help" variant="para" size="small"
												>This is a Subtext (Helper Text)</f-text
											>
										</f-date-time-picker></f-div
									>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "mode"
};

export const Value = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-date-time-picker value=${value} @input=${handleValue} size="medium">
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-date-time-picker></f-div
				></f-div
			>
		`;
	},

	name: "value"
};

export const Placeholder = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-date-time-picker
						value=${value}
						placeholder="This is the placeholder"
						@input=${handleValue}
						size="medium"
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-date-time-picker></f-div
				></f-div
			>
		`;
	},

	name: "placeholder"
};

export const Size = {
	render: args => {
		const sizes = ["small", "medium"];
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${sizes.map(
					item => html`<f-div>
          <f-date-time-picker
            value=${value}
            @input=${handleValue}
            size=${item}
          >
            <f-div slot="label" padding="none" gap="none">Label (size="${item}")</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-date-time-picker></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "size"
};

export const State = {
	render: args => {
		const states = [
			["default", "primary", "success"],
			["danger", "warning", "default"]
		];
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div direction="column" gap="medium">
				${states.map(
					item =>
						html` <f-div align="middle-center" padding="large" gap="medium">
							${item.map(
								state =>
									html`<f-div
										><f-date-time-picker
											value=${value}
											@input=${handleValue}
											size="medium"
											state=${state}
										>
											<f-div slot="label" padding="none" gap="none">Label (state="${state}")</f-div>
											<f-text slot="help" variant="para" size="small"
												>This is a Subtext (Helper Text)</f-text
											>
										</f-date-time-picker></f-div
									>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state"
};

export const MinDate = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-date-time-picker value=${value} @input=${handleValue} size="medium" min-date="today">
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for min-date="today" prop</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-date-time-picker></f-div
				></f-div
			>
		`;
	},

	name: "min-date"
};

export const MaxDate = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-date-time-picker
						value=${value}
						@input=${handleValue}
						size="medium"
						max-date=${new Date()}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo for max-date="new Date()" prop</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-date-time-picker></f-div
				></f-div
			>
		`;
	},

	name: "max-date"
};

export const DisableDate = {
	// return true to disable
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-date-time-picker
						value=${value}
						@input=${handleValue}
						size="medium"
						.disable-date=${[new Date(), new Date().fp_incr(2)]}
					>
						<f-div slot="label" padding="none" gap="none">Label (Disable specific dates)</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo - [new Date(), new Date().fp_incr(2)]</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-date-time-picker></f-div
				>
				<f-div>
					<f-date-time-picker
						value=${value}
						@input=${handleValue}
						size="medium"
						.disable-date=${[
							{
								from: new Date(),
								to: new Date().fp_incr(8)
							}
						]}
					>
						<f-div slot="label" padding="none" gap="none">Label (Disable dates range)</f-div>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo - [{ from: new Date(), to: new Date().fp_incr(8) }]</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-date-time-picker></f-div
				>
				<f-div>
					<f-date-time-picker
						value=${value}
						@input=${handleValue}
						size="medium"
						.disable-date=${[
							function (date) {
								return date.getDay() === 0 || date.getDay() === 6;
							}
						]}
					>
						<f-div slot="label" padding="none" gap="none"
							>Label (Disable dates from function)</f-div
						>
						<f-div slot="description" padding="none" gap="none"
							>This is a demo - [ function(date) { // return true to disable return (date.getDay()
							=== 0 || date.getDay() === 6); }]</f-div
						>
						<f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
					</f-date-time-picker></f-div
				>
			</f-div>
		`;
	},

	name: "disable-date"
};

export const Flags = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		const array = [
			[0, 1, 2],
			[3, 4, 5]
		];

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="large" direction="column">
				${array.map(
					row =>
						html`<f-div gap="medium"
							>${row.map(item => {
								return html`<f-div>
          <f-date-time-picker
            value=${value}
            @input=${handleValue}
            size="medium"
            ?loading=${item === 0}
            ?disabled=${item === 1}
            ?clear=${item === 2}
      ?is-range=${item === 3}
      ?week-number=${item === 4}
      ?inline=${item === 5}
          >
            <f-div slot="label" padding="none" gap="none">${
							item === 0
								? "Loader"
								: item === 1
								? "Disabled"
								: item === 2
								? "Clear Icon on Type"
								: item === 3
								? "Range Calendar"
								: item === 4
								? "Week Numbers Display"
								: "Inline"
						}</f-div>
            <f-text slot="help" variant="para" size="small">This is a Subtext (Helper Text)</f-text>
          </f-date-time-picker></f-div
        ></f-div
      >`;
							})}</f-div
						>`
				)}
			</f-div>
		`;
	},

	name: "Flags"
};
