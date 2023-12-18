import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useEffect, useState } from "@storybook/client-api";
import fSelectAnatomy from "../svg/i-fselect-anatomy.js";

export default {
	title: "@cldcvr/flow-core/f-select",

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

		const handleCreateOption = e => {
			console.log(e.detail.value);
			const array = [...args.options];
			array.push(e.detail.value);

			updateArgs({
				options: array
			});
		};

		const handleSearchInput = e => {
			console.log("search input : ", e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div
					width="80%"
					align="middle-center"
					height="200px"
					state="subtle"
					padding="large"
					variant="curved"
				>
					<f-select
						.variant=${args.variant}
						.category=${args.category}
						.placeholder=${args.placeholder}
						.type=${args.type}
						.state=${args.state}
						.value=${args.value}
						@input=${handleInput}
						?searchable=${args.searchable}
						.options=${args.options}
						?checkbox=${args.checkbox}
						?clear=${args.clear}
						.width=${args.width}
						.height=${args.height}
						?disabled=${args.disabled}
						?loading=${args.loading}
						selection-limit=${args["selection-limit"]}
						?create-option=${args["create-option"]}
						.option-template=${args["option-template"]}
						icon-left=${args["icon-left"]}
						.size=${args.size}
						?auto-add-option=${args["auto-add-option"]}
						@create-option=${handleCreateOption}
						@search-input=${handleSearchInput}
					>
						<f-div slot="label" padding="none" gap="none">Label for f-select</f-div>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
						<f-text slot="subtitle" state="secondary" variant="para" size="small">Optional</f-text>
						<f-icon
							slot="icon-tooltip"
							source="i-question-filled"
							tooltip="some info"
						></f-icon> </f-select></f-div
			></f-div>
		`;
	},

	name: "Playground",

	argTypes: {
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

		type: {
			control: "radio",
			options: ["single", "multiple"]
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

		disabled: {
			control: "boolean"
		},

		loading: {
			control: "boolean"
		},

		clear: {
			control: "boolean"
		},

		searchable: {
			control: "boolean"
		},

		["selection-limit"]: {
			control: "number"
		},

		height: {
			control: "number"
		},

		width: {
			control: "text"
		},

		options: {
			control: "object"
		},

		value: {
			control: "object"
		},

		["option-template"]: {
			control: "text"
		},

		checkbox: {
			control: "boolean",

			if: {
				arg: "type",
				eq: "multiple"
			}
		},

		["create-option"]: {
			control: "boolean"
		},

		["auto-add-option"]: {
			control: "boolean",

			if: {
				arg: "create-option",
				eq: true
			}
		}
	},

	args: {
		type: "single",
		placeholder: "Select Option",
		variant: "curved",
		category: "fill",
		state: "default",
		size: "medium",

		options: [
			"options 1",
			"options 2",
			"options 3",
			"options 4",
			"options 5",
			"options 6",
			"options 7",
			`<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/250px-Google_2015_logo.svg.png" />`
		],

		value: ["options 1"],
		["option-template"]: undefined,
		["icon-left"]: undefined,
		height: 180,
		width: "fill-container",
		searchable: false,
		disabled: false,
		loading: false,
		clear: false,
		checkbox: false,
		["selection-limit"]: 2,
		["create-option"]: false,
		["auto-add-option"]: true
	}
};

export const Anatomy = {
	render: () => html`<div class="align-center">${unsafeSVG(fSelectAnatomy)}</div>`,
	name: "Anatomy"
};

export const Type = {
	render: args => {
		const types = ["single", "multiple"];
		const [value, setValue] = useState([]);
		const [options, setOptions] = useState([
			"thisIsBigOptiontoTest 1",
			"Hour",
			"option 3",
			"option 4"
		]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${types.map(
					item =>
						html`<f-div>
							<f-select
								placeholder="Select Option"
								.type=${item}
								@input=${handleValue}
								?searchable=${false}
								.options=${options}
							>
								<f-div slot="label" padding="none" gap="none"
									>Label for f-select | type="${item}"</f-div
								>
								<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
							</f-select></f-div
						>`
				)}
			</f-div>
		`;
	},

	name: "type"
};

export const Variant = {
	render: args => {
		const variants = ["curved", "round", "block"];
		const [value, setValue] = useState([]);
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${variants.map(
					item =>
						html`<f-div>
							<f-select
								placeholder="Select Option"
								@input=${handleValue}
								?searchable=${false}
								.options=${options}
								.variant=${item}
							>
								<f-div slot="label" padding="none" gap="none"
									>Label for f-select | variant="${item}"</f-div
								>
								<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
							</f-select></f-div
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
		const [value, setValue] = useState([]);
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				${categories.map(
					item =>
						html`<f-div>
							<f-select
								placeholder="Select Option"
								@input=${handleValue}
								?searchable=${false}
								.options=${options}
								.category=${item}
							>
								<f-div slot="label" padding="none" gap="none"
									>Label for f-select | category="${item}"</f-div
								>
								<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
							</f-select></f-div
						>`
				)}
			</f-div>
		`;
	},

	name: "category"
};

export const Value = {
	render: args => {
		const types = ["single", "multiple"];
		const [value, setValue] = useState("option 1");
		const [multiValue, setMultiValue] = useState(["option 1"]);
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		const handleMultiValue = e => {
			setMultiValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						?searchable=${false}
						.options=${options}
						.value=${value}
						.type=${"single"}
					>
						<f-div slot="label" padding="none" gap="none"
							>Label for f-select | value="option 1"</f-div
						>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleMultiValue}
						?searchable=${false}
						.options=${options}
						.value=${multiValue}
						.type=${"multiple"}
					>
						<f-div slot="label" padding="none" gap="none"
							>Label for f-select | value="[option 1]"</f-div
						>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
			</f-div>
		`;
	},

	name: "value"
};

export const Placeholder = {
	render: args => {
		const [value, setValue] = useState("");
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						.options=${options}
						.value=${value}
					>
						<f-div slot="label" padding="none" gap="none">Label for f-select</f-div>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				></f-div
			>
		`;
	},

	name: "placeholder"
};

export const Options = {
	render: args => {
		const [value, setValue] = useState([]);
		const [valueObjects, setValueObjects] = useState(null);
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const [optionsObjects, setOptionsObjects] = useState([
			{
				icon: "i-home",
				title: "option 1",
				qaId: "TestQa"
			},
			{
				icon: "i-user",
				title: "option 2",
				disabled: true
			},
			{
				icon: "i-setting",
				title: "option 3"
			},
			{
				icon: "i-app",
				title: "option 4"
			}
		]);

		const [groupOptions, setGroupOptions] = useState({
			Group1: ["option 1", "option 2", "option 3", "option 4"],
			Group2: ["option 5", "option 6", "option 7", "option "]
		});

		const [groupOtionsObjects, setGroupOptionsObjects] = useState({
			Group1: [
				{
					icon: "i-home",
					title: "option 1"
				},
				{
					icon: "i-user",
					title: "option 2"
				},
				{
					icon: "i-setting",
					title: "option 3"
				},
				{
					icon: "i-app",
					title: "option 4"
				}
			],

			Group2: [
				{
					icon: "i-home",
					title: "option 5"
				},
				{
					icon: "i-user",
					title: "option 6"
				},
				{
					icon: "i-setting",
					title: "option 7"
				},
				{
					icon: "i-app",
					title: "option 8"
				}
			]
		});

		const handleValue = e => {
			setValue(e.detail.value);
		};

		const handleValueGroup = e => {
			setValueObjects(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						?searchable=${false}
						.options=${options}
						.value=${value}
					>
						<f-div slot="label" padding="none" gap="none">Label for f-select</f-div>
						<f-div slot="description" padding="none" gap="none"
							>Options passed as Array of strings eg. ['option 1']</f-div
						>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						?searchable=${false}
						.options=${optionsObjects}
						.value=${value}
					>
						<f-div slot="label" padding="none" gap="none">Label for f-select</f-div>
						<f-div slot="description" padding="none" gap="none"
							>Options passed as Array of Objects eg. [{title:'option 1', icon:'i-app'}]</f-div
						>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
			</f-div>
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValueGroup}
						?searchable=${false}
						.options=${groupOptions}
						.value=${valueObjects}
					>
						<f-div slot="label" padding="none" gap="none"
							>Label for f-select (Group Categorization)</f-div
						>
						<f-div slot="description" padding="none" gap="none"
							>Options passed as Array of strings eg. ['option 1']
						</f-div>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValueGroup}
						?searchable=${false}
						.options=${groupOtionsObjects}
						.value=${valueObjects}
					>
						<f-div slot="label" padding="none" gap="none"
							>Label for f-select (Group Categorization</f-div
						>
						<f-div slot="description" padding="none" gap="none"
							>Options passed as Array of Objects eg. [{title:'option 1', icon:'i-app'}]</f-div
						>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
			</f-div>
		`;
	},

	name: "options"
};

export const OptionTemplate = {
	render: args => {
		const [value, setValue] = useState(null);

		const optionTemplate = function (option, isSelected) {
			if (isSelected) {
				return html`<f-text>${option.title}</f-text>`;
			} else {
				return html`<f-div
					><f-div direction="column" gap="x-small"
						><f-text>${option.title}</f-text
						><f-text ellipsis>${option.data.name}, ${option.data.email}</f-text></f-div
					></f-div
				>`;
			}
		};

		const [valueObjects, setValueObjects] = useState(null);

		const [options, setOptions] = useState([
			{
				icon: "i-home",
				title: "option 1",
				disabled: true,

				data: {
					name: "Alex",
					email:
						"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a m"
				}
			},
			{
				icon: "i-user",
				title: "option 2",

				data: {
					name: "Cran",
					email: "alex#cldcvr.com"
				}
			},
			{
				icon: "i-setting",
				title: "option 3",

				data: {
					name: "Tony",
					email: "alex#cldcvr.com"
				}
			},
			{
				icon: "i-app",
				title: "option 4",

				data: {
					name: "Stark",
					email: "alex#cldcvr.com"
				}
			}
		]);

		const [groupOtionsObjects, setGroupOptionsObjects] = useState({
			Group1: [
				{
					icon: "i-home",
					title: "option 1",

					data: {
						name: "Alex",
						email: "alex#cldcvr.com"
					}
				},
				{
					icon: "i-user",
					title: "option 2",

					data: {
						name: "Cran",
						email: "alex#cldcvr.com"
					}
				},
				{
					icon: "i-setting",
					title: "option 3",

					data: {
						name: "Tony",
						email: "alex#cldcvr.com"
					}
				},
				{
					icon: "i-app",
					title: "option 4",

					data: {
						name: "Stark",
						email: "alex#cldcvr.com"
					}
				}
			],

			Group2: [
				{
					icon: "i-home",
					title: "option 5",

					data: {
						name: "Bruce",
						email: "alex#cldcvr.com"
					}
				},
				{
					icon: "i-user",
					title: "option 6",

					data: {
						name: "Wayne",
						email: "alex#cldcvr.com"
					}
				},
				{
					icon: "i-setting",
					title: "option 7",

					data: {
						name: "Mater",
						email: "alex#cldcvr.com"
					}
				},
				{
					icon: "i-app",
					title: "option 8",

					data: {
						name: "Thunder",
						email: "alex#cldcvr.com"
					}
				}
			]
		});

		const handleValue = e => {
			setValue(e.detail.value);
		};

		const handleValueGroup = e => {
			setValueObjects(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						?searchable=${false}
						.options=${options}
						.value=${value}
						type="multiple"
						.optionTemplate=${optionTemplate}
					>
						<f-div slot="label" padding="none" gap="none">Label for f-select</f-div>
						<f-div slot="description" padding="none" gap="none"
							>Options passed as Array of strings eg. ['option 1']</f-div
						>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValueGroup}
						?searchable=${false}
						.options=${groupOtionsObjects}
						.value=${valueObjects}
						.optionTemplate=${optionTemplate}
					>
						<f-div slot="label" padding="none" gap="none"
							>Label for f-select (Group Categorization</f-div
						>
						<f-div slot="description" padding="none" gap="none"
							>Options passed as Array of Objects eg. [{title:'option 1', icon:'i-app'}]</f-div
						>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
			</f-div>
		`;
	},

	name: "option-template"
};

export const Size = {
	render: args => {
		const sizes = ["small", "medium"];
		const [value, setValue] = useState("");
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-center" padding="large" gap="medium">
				${sizes.map(
					item =>
						html`<f-div>
							<f-select
								placeholder="Select Option"
								@input=${handleValue}
								.options=${options}
								.value=${value}
								.size=${item}
							>
								<f-div slot="label" padding="none" gap="none"
									>Label for f-select (size="${item}")</f-div
								>
								<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
							</f-select></f-div
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
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);
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
										><f-select
											placeholder="Select Option"
											@input=${handleValue}
											.options=${options}
											.value=${value}
											.state=${state}
										>
											<f-div slot="label" padding="none" gap="none"
												>Label for f-select (state="${state}")</f-div
											>
											<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
										</f-select></f-div
									>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state"
};

export const IconLeft = {
	render: args => {
		const [value, setValue] = useState("");
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						.options=${options}
						.value=${value}
						icon-left=${"i-app"}
					>
						<f-div slot="label" padding="none" gap="none"
							>Label for f-select (icon-left="i-app")</f-div
						>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				></f-div
			>
		`;
	},

	name: "icon-left"
};

export const Width = {
	render: args => {
		const [value, setValue] = useState("");
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						.options=${options}
						.value=${value}
						icon-left=${"i-app"}
						width="200"
						type="multiple"
						?searchable=${true}
					>
						<f-div slot="label" padding="none" gap="none">Label for f-select (width="200")</f-div>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				></f-div
			>
		`;
	},

	name: "width"
};

export const Height = {
	render: args => {
		const [value, setValue] = useState("");
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						.options=${options}
						.value=${value}
						icon-left=${"i-app"}
						height="100"
					>
						<f-div slot="label" padding="none" gap="none">Label for f-select (height="100")</f-div>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				></f-div
			>
		`;
	},

	name: "height"
};

export const SelectionLimit = {
	render: args => {
		const [value, setValue] = useState("");

		const [options, setOptions] = useState([
			"option 1",
			"option 2",
			"option 3",
			"option 4",
			"option 5",
			"option 6",
			"option 7"
		]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large">
				<f-div width="80%" align="middle-center">
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						.options=${options}
						.value=${value}
						icon-left=${"i-app"}
						selection-limit="5"
						type="multiple"
					>
						<f-div slot="label" padding="none" gap="none">Label for f-select (height="100")</f-div>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				></f-div
			>
		`;
	},

	name: "selection-limit"
};

export const Searchable = {
	render: args => {
		const [value, setValue] = useState([]);
		const [valueObjects, setValueObjects] = useState(null);
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const [optionsObjects, setOptionsObjects] = useState([
			{
				icon: "i-home",
				title: "option 1"
			},
			{
				icon: "i-user",
				title: "option 2"
			},
			{
				icon: "i-setting",
				title: "option 3"
			},
			{
				icon: "i-app",
				title: "option 4"
			}
		]);

		const [groupOptions, setGroupOptions] = useState({
			Group1: ["option 1", "option 2", "option 3", "option 4"],
			Group2: ["option 5", "option 6", "option 7", "option "]
		});

		const [groupOtionsObjects, setGroupOptionsObjects] = useState({
			Group1: [
				{
					icon: "i-home",
					title: "option 1"
				},
				{
					icon: "i-user",
					title: "option 2"
				},
				{
					icon: "i-setting",
					title: "option 3"
				},
				{
					icon: "i-app",
					title: "option 4"
				}
			],

			Group2: [
				{
					icon: "i-home",
					title: "option 5"
				},
				{
					icon: "i-user",
					title: "option 6"
				},
				{
					icon: "i-setting",
					title: "option 7"
				},
				{
					icon: "i-app",
					title: "option 8"
				}
			]
		});

		const handleValue = e => {
			setValue(e.detail.value);
		};

		const handleBlur = e => {
			console.log(e.detail.value);
		};

		const handleValueGroup = e => {
			setValueObjects(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						@blur=${handleBlur}
						.options=${options}
						.value=${value}
						?searchable=${true}
					>
						<f-div slot="label" padding="none" gap="none">Label for f-select</f-div>
						<f-div slot="description" padding="none" gap="none"
							>Options passed as Array of strings eg. ['option 1']</f-div
						>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						@blur=${handleBlur}
						.options=${optionsObjects}
						.value=${value}
						?searchable=${true}
					>
						<f-div slot="label" padding="none" gap="none">Label for f-select</f-div>
						<f-div slot="description" padding="none" gap="none"
							>Options passed as Array of Objects eg. [{title:'option 1', icon:'i-app'}]</f-div
						>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
			</f-div>
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValueGroup}
						@blur=${handleBlur}
						.options=${groupOptions}
						.value=${valueObjects}
						?searchable=${true}
					>
						<f-div slot="label" padding="none" gap="none"
							>Label for f-select (Group Categorization)</f-div
						>
						<f-div slot="description" padding="none" gap="none"
							>Options passed as Array of strings eg. ['option 1']
						</f-div>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValueGroup}
						@blur=${handleBlur}
						.options=${groupOtionsObjects}
						.value=${valueObjects}
						?searchable=${true}
					>
						<f-div slot="label" padding="none" gap="none"
							>Label for f-select (Group Categorization)</f-div
						>
						<f-div slot="description" padding="none" gap="none"
							>Options passed as Array of Objects eg. [{title:'option 1', icon:'i-app'}]</f-div
						>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
			</f-div>
		`;
	},

	name: "searchable"
};

export const Checkbox = {
	//setValue(e.detail.value);
	render:
		//setValueObjects(e.detail.value);
		args => {
			const [value, setValue] = useState([]);
			const [valueObjects, setValueObjects] = useState(null);
			const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

			const [optionsObjects, setOptionsObjects] = useState([
				{
					icon: "i-home",
					title: "option 1"
				},
				{
					icon: "i-user",
					title: "option 2"
				},
				{
					icon: "i-setting",
					title: "option 3"
				},
				{
					icon: "i-app",
					title: "option 4"
				}
			]);

			const [groupOptions, setGroupOptions] = useState({
				Group1: ["option 1", "option 2", "option 3", "option 4"],
				Group2: ["option 5", "option 6", "option 7", "option "]
			});

			const [groupOtionsObjects, setGroupOptionsObjects] = useState({
				Group1: [
					{
						icon: "i-home",
						title: "option 1"
					},
					{
						icon: "i-user",
						title: "option 2"
					},
					{
						icon: "i-setting",
						title: "option 3"
					},
					{
						icon: "i-app",
						title: "option 4"
					}
				],

				Group2: [
					{
						icon: "i-home",
						title: "option 5"
					},
					{
						icon: "i-user",
						title: "option 6"
					},
					{
						icon: "i-setting",
						title: "option 7"
					},
					{
						icon: "i-app",
						title: "option 8"
					}
				]
			});

			const handleValue = e => {};
			const handleValueGroup = e => {};

			return html`
				<f-div width="100%" align="middle-center" padding="large" gap="medium">
					<f-div>
						<f-select
							placeholder="Select Option"
							@input=${handleValue}
							.options=${options}
							?searchable=${true}
							?checkbox=${true}
							type="multiple"
						>
							<f-div slot="label" padding="none" gap="none">Label for f-select</f-div>
							<f-div slot="description" padding="none" gap="none"
								>Options passed as Array of strings eg. ['option 1']</f-div
							>
							<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
						</f-select></f-div
					>
					<f-div>
						<f-select
							placeholder="Select Option"
							@input=${handleValue}
							.options=${optionsObjects}
							?searchable=${true}
							?checkbox=${true}
							type="multiple"
						>
							<f-div slot="label" padding="none" gap="none">Label for f-select</f-div>
							<f-div slot="description" padding="none" gap="none"
								>Options passed as Array of Objects eg. [{title:'option 1', icon:'i-app'}]</f-div
							>
							<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
						</f-select></f-div
					>
				</f-div>
				<f-div width="100%" align="middle-center" padding="large" gap="medium">
					<f-div>
						<f-select
							placeholder="Select Option"
							@input=${handleValueGroup}
							.options=${groupOptions}
							?searchable=${true}
							?checkbox=${true}
							type="multiple"
						>
							<f-div slot="label" padding="none" gap="none"
								>Label for f-select (Group Categorization)</f-div
							>
							<f-div slot="description" padding="none" gap="none"
								>Options passed as Array of strings eg. ['option 1']
							</f-div>
							<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
						</f-select></f-div
					>
					<f-div>
						<f-select
							placeholder="Select Option"
							@input=${handleValueGroup}
							.options=${groupOtionsObjects}
							?searchable=${true}
							?checkbox=${true}
							type="multiple"
						>
							<f-div slot="label" padding="none" gap="none"
								>Label for f-select (Group Categorization)</f-div
							>
							<f-div slot="description" padding="none" gap="none"
								>Options passed as Array of Objects eg. [{title:'option 1', icon:'i-app'}]</f-div
							>
							<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
						</f-select></f-div
					>
				</f-div>
			`;
		},

	name: "checkbox"
};

export const Clear = {
	render: args => {
		const [value, setValue] = useState("");
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						.options=${options}
						.value=${value}
						icon-left=${"i-app"}
						type="multiple"
						?searchable=${true}
						?clear=${true}
					>
						<f-div slot="label" padding="none" gap="none">Label for f-select (clear=true)</f-div>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						.options=${options}
						.value=${value}
						icon-left=${"i-app"}
						type="multiple"
						?searchable=${true}
						?clear=${false}
					>
						<f-div slot="label" padding="none" gap="none">Label for f-select (clear=false)</f-div>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
			</f-div>
		`;
	},

	name: "clear"
};

export const Disabled = {
	render: args => {
		const [value, setValue] = useState("");
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						.options=${options}
						.value=${value}
						icon-left=${"i-app"}
						type="multiple"
						?searchable=${true}
						?clear=${true}
						?disabled=${true}
					>
						<f-div slot="label" padding="none" gap="none">Label for f-select (disabled=true)</f-div>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
			</f-div>
		`;
	},

	name: "disabled"
};

export const Loading = {
	render: args => {
		const [value, setValue] = useState("");
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						.options=${options}
						.value=${value}
						icon-left=${"i-app"}
						type="multiple"
						?searchable=${true}
						?clear=${true}
						?loading=${true}
					>
						<f-div slot="label" padding="none" gap="none">Label for f-select (loading=true)</f-div>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
			</f-div>
		`;
	},

	name: "loading"
};

export const CreateOption = {
	render: args => {
		const [value, setValue] = useState("");
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		const handleCreateOption = e => {
			console.log(e.detail);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						.options=${options}
						.value=${value}
						icon-left=${"i-app"}
						type="multiple"
						?searchable=${true}
						width="200"
						?create-option=${true}
						@add-option=${handleCreateOption}
						?auto-add-option=${false}
					>
						<f-div slot="label" padding="none" gap="none"
							>Label for f-select (create-option=true)</f-div
						>
						<f-div slot="description" padding="none" gap="none">width is 200px</f-div>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						.options=${options}
						.value=${value}
						icon-left=${"i-app"}
						type="multiple"
						?searchable=${true}
						?create-option=${true}
						?auto-add-option=${false}
					>
						<f-div slot="label" padding="none" gap="none"
							>Label for f-select (create-option=true)</f-div
						>
						<f-div slot="description" padding="none" gap="none">normal width</f-div>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
			</f-div>
		`;
	},

	name: "create-option"
};

export const AutoAddOption = {
	render: args => {
		const [value, setValue] = useState("");
		const [options, setOptions] = useState(["option 1", "option 2", "option 3", "option 4"]);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		const handleCreateOption = e => {
			console.log(e.detail);
		};

		return html`
			<f-div width="100%" align="middle-center" padding="large" gap="medium">
				<f-div>
					<f-select
						placeholder="Select Option"
						@input=${handleValue}
						.options=${options}
						.value=${value}
						icon-left=${"i-app"}
						type="multiple"
						?searchable=${true}
						?create-option=${true}
						?auto-add-option=${true}
					>
						<f-div slot="label" padding="none" gap="none"
							>Label for f-select (auto-add-option=true)</f-div
						>
						<f-div slot="description" padding="none" gap="none">normal width</f-div>
						<f-div slot="help" padding="none" gap="none">This is a helper text</f-div>
					</f-select></f-div
				>
			</f-div>
		`;
	},

	name: "auto-add-option"
};
