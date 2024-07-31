import { html } from "lit-html";
import { useArgs, useEffect, useState } from "@storybook/client-api";

export default {
	title: "@nonfx/flow-core/f-emoji-picker",

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
			updateArgs({
				value: e.detail.value
			});
		};

		return html`
			<f-div width="100%" align="top-left" padding="large">
				<f-div width="hug-content" align="top-left">
					<f-emoji-picker
						aria-label="Emoji Picker"
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
					</f-emoji-picker>
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

		include: {
			control: "object"
		},

		exclude: {
			control: "object"
		},

		["exclude-emojis"]: {
			control: "object"
		},

		custom: {
			control: "object"
		},

		recent: {
			control: "object"
		},

		["close-on-select"]: {
			control: "boolean"
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
		recent: ["office", "compass", "luggage", "hourglass", "gem", "computer"],
		include: [],
		exclude: [],
		["exclude-emojis"]: [],

		custom: [
			{
				id: "github",
				name: "GitHub",

				emojis: [
					{
						id: "octocat",
						name: "Octocat",
						keywords: ["github"],

						skins: [
							{
								src: "https://octodex.github.com/images/snowoctocat.png"
							}
						]
					}
				]
			}
		],

		disabled: false,
		clear: true,
		["close-on-select"]: false
	}
};

export const Variant = {
	render: args => {
		const variants = ["curved", "round", "block"];
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${variants.map(
					item => html`<f-div width="hug-content">
      <f-emoji-picker
      value=${value}
            @input=${handleValue}
            .variant=${item}
            size="medium"
            >
 <f-div slot="label" padding="none" gap="none">Label</f-div>
            <f-text slot="help" variant="para" size="small">Help!</f-text>						</f-emoji-picker>
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
	render: args => {
		const categories = ["fill", "outline", "transparent"];
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${categories.map(
					item => html`<f-div width="hug-content">
          <f-emoji-picker
            value=${value}
            @input=${handleValue}
            .category=${item}
            size="medium"
            .variant=${item === "transparent" ? "block" : "curved"}
          >
 <f-div slot="label" padding="none" gap="none">Label</f-div>
            <f-text slot="help" variant="para" size="small">Help!</f-text>
          </f-emoji-picker></f-div
        ></f-div
      >`
				)}
			</f-div>
		`;
	},

	name: "category"
};

export const Value = {
	render: args => {
		const [value, setValue] = useState("⌛");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="hug-content" align="middle-center">
					<f-emoji-picker value=${value} @input=${handleValue} size="medium">
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-emoji-picker></f-div
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
				<f-div width="hug-content" align="middle-center">
					<f-emoji-picker value=${value} placeholder="🧭" @input=${handleValue} size="medium">
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-emoji-picker></f-div
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
					item => html`<f-div width="hug-content">
          <f-emoji-picker
            value=${value}
            @input=${handleValue}
            size=${item}
          >
           <f-div slot="label" padding="none" gap="none">Label</f-div>
            <f-text slot="help" variant="para" size="small">Help!</f-text>
          </f-emoji-picker></f-div
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
									html`<f-div width="hug-content"
										><f-emoji-picker
											value=${value}
											@input=${handleValue}
											size="medium"
											state=${state}
										>
											<f-div slot="label" padding="none" gap="none">Label</f-div>
											<f-text slot="help" variant="para" size="small">Help!</f-text>
										</f-emoji-picker></f-div
									>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state"
};

export const Recent = {
	render: args => {
		const [value, setValue] = useState("");
		const recent = ["office", "compass", "luggage", "hourglass", "gem", "computer"];

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="hug-content" align="middle-center">
					<f-emoji-picker value=${value} @input=${handleValue} size="medium" .recent=${recent}>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-emoji-picker></f-div
				></f-div
			>
		`;
	},

	name: "recent"
};

export const Include = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		const include = ["frequent", "people", "flags"];

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="hug-content" align="middle-center">
					<f-emoji-picker value=${value} @input=${handleValue} size="medium" .include=${include}>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-emoji-picker></f-div
				></f-div
			>
		`;
	},

	name: "include"
};

export const Exclude = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		const exclude = ["people", "foods"];

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="hug-content" align="middle-center">
					<f-emoji-picker value=${value} @input=${handleValue} size="medium" .exclude=${exclude}>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-emoji-picker></f-div
				></f-div
			>
		`;
	},

	name: "exclude"
};

export const ExcludeEmojis = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		const excludeEmojis = ["office"];

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="hug-content" align="middle-center">
					<f-emoji-picker
						value=${value}
						@input=${handleValue}
						size="medium"
						.exclude-emojis=${excludeEmojis}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-emoji-picker></f-div
				></f-div
			>
		`;
	},

	name: "exclude-emojis"
};

export const Custom = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		const custom = [
			{
				id: "github",
				name: "GitHub",

				emojis: [
					{
						id: "octocat",
						name: "Octocat",
						keywords: ["github"],

						skins: [
							{
								src: "https://octodex.github.com/images/snowoctocat.png"
							}
						]
					}
				]
			}
		];

		return html`
			<f-div width="100%" align="middle-center" padding="large" direction="row">
				<f-div width="50%" align="middle-center">
					<f-div width="hug-content" align="middle-center">
						<f-emoji-picker value=${value} @input=${handleValue} size="medium" .custom=${custom}>
							<f-div slot="label" padding="none" gap="none">Label</f-div>
							<f-text slot="help" variant="para" size="small">Help!</f-text>
						</f-emoji-picker></f-div
					>
				</f-div>
				<f-div state="subtle">
					<f-text>
						<pre>
  [{
  "id": "github",
  "name": "GitHub",
  "emojis":
  [
    {
      "id": "octocat",
      "name": "Octocat",
      "keywords": ["github"],
      "skins": [{"src":
      "https://octodex.github.com/images/snowoctocat.png"
      }]
    }
  ]
  }]
</pre
						>
					</f-text>
				</f-div>
			</f-div>
		`;
	},

	name: "custom"
};

export const Flags = {
	render: args => {
		const [value, setValue] = useState("");

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html` <f-div width="100%" align="middle-center" padding="large">
			<f-div direction="column">
				<f-text>disabled=true</f-text>
				<f-div width="hug-content" align="middle-center">
					<f-emoji-picker value=${value} @input=${handleValue} size="medium" ?disabled=${true}>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-emoji-picker></f-div
				>
			</f-div>
			<f-div direction="column">
				<f-text>clear=false</f-text>
				<f-div width="hug-content" align="middle-center">
					<f-emoji-picker value=${value} @input=${handleValue} size="medium" .clear=${false}>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-emoji-picker></f-div
				>
			</f-div>
			<f-div direction="column">
				<f-text>close-on-select=true</f-text>
				<f-div width="hug-content" align="middle-center">
					<f-emoji-picker
						value=${value}
						@input=${handleValue}
						size="medium"
						.close-on-select=${true}
					>
						<f-div slot="label" padding="none" gap="none">Label</f-div>
						<f-text slot="help" variant="para" size="small">Help!</f-text>
					</f-emoji-picker></f-div
				>
			</f-div>
		</f-div>`;
	},

	name: "Flags"
};
