import { html } from "lit-html";
import fFormAnatomy from "../svg/i-fform-anatomy.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useState } from "@storybook/client-api";

export default {
	title: "@nonfx/flow-core/f-form",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`<f-form .gap=${args.gap} ?separator=${args.separator}>
			<f-div>Form Title</f-div>
			<f-form-group direction="vertical">
				<f-input placeholder="Write here">
					<f-div slot="label" padding="none" gap="none">Label</f-div>
					<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
				</f-input>
				<f-input placeholder="Write here">
					<f-div slot="label" padding="none" gap="none">Label</f-div>
					<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
				</f-input>
			</f-form-group>
			<f-form-group
				direction="vertical"
				collapse="accordion"
				.label=${{
					title: "Group Label",
					description: "This is a description"
				}}
			>
				<f-select
					placeholder="Select Option"
					@input=${handleValue}
					.options=${options}
					.value=${value}
				>
					<f-div slot="label" padding="none" gap="none">Label for f-select</f-div>
					<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
				</f-select>
				<f-text-area placeholder="This is a textarea" rows="4">
					<f-text slot="label" variant="para" size="small">Label</f-text>
					<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
				</f-text-area>
			</f-form-group>
			<f-form-group
				direction="vertical"
				.label=${{
					title: "Checkbox Label"
				}}
			>
				<f-checkbox>
					<f-div slot="label" padding="none" gap="none">Apple</f-div>
				</f-checkbox>
				<f-checkbox>
					<f-div slot="label" padding="none" gap="none">Orange</f-div>
				</f-checkbox>
				<f-checkbox>
					<f-div slot="label" padding="none" gap="none">Banana</f-div>
				</f-checkbox>
			</f-form-group>
		</f-form>`;
	},

	name: "Playground",

	argTypes: {
		gap: {
			control: "select",
			options: ["large", "medium", "small", "x-small"]
		},

		separator: {
			control: "boolean"
		}
	},

	args: {
		gap: "medium",
		separator: false
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fFormAnatomy)}</div>`,
	name: "Anatomy"
};

export const Gap = {
	render: args => {
		const gaps = ["large", "medium", "small", "x-small"];
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${gaps.map(
					item =>
						html`<f-form gap=${item}>
							<f-input value=${value} placeholder="Write here" @input=${handleValue}>
								<f-div slot="label" padding="none" gap="none">Label (gap="${item}")</f-div>
								<f-text slot="help" variant="para" size="small"
									>This is a Subtext (Helper Text)</f-text
								>
							</f-input>
							<f-input value=${value} placeholder="Write here" @input=${handleValue}>
								<f-div slot="label" padding="none" gap="none">Label (gap="${item}")</f-div>
								<f-text slot="help" variant="para" size="small"
									>This is a Subtext (Helper Text)</f-text
								>
							</f-input>
						</f-form>`
				)}
			</f-div>
		`;
	},

	name: "gap"
};
