import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs, useEffect, useState } from "@storybook/client-api";
import fFileUploadAnatomy from "../svg/i-ffile-upload-anatomy.js";
export default {
	title: "@nonfx/flow-core/f-file-upload",

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
			if (e?.detail) {
				console.log(e.detail.value);

				if (args.type === "single") {
					updateArgs({
						value: e.detail.value
							? {
									name: e.detail.value.name
							  }
							: e.detail.value
					});
				} else {
					updateArgs({
						value: e.detail.value
					});
				}
			}
		};

		return html`
			<f-div width="100%" padding="large">
				<f-file-upload
					.type=${args.type}
					.value=${args.value}
					placeholder=${args.placeholder}
					.state=${args.state}
					.size=${args.size}
					file-type=${args["file-type"]}
					max-size=${args["max-size"]}
					?disabled=${args.disabled}
					?loading=${args.loading}
					@input=${handleInput}
				>
					<f-div slot="label" padding="none" gap="none">Label</f-div>
					<f-text slot="help" variant="para" size="small">This is a Subtext</f-text>
					<f-text slot="subtitle" state="secondary" variant="para" size="small">Optional</f-text>
					<f-icon slot="icon-tooltip" source="i-question-filled" tooltip="some info"></f-icon>
				</f-file-upload>
			</f-div>
		`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "object"
		},

		type: {
			control: "radio",
			options: ["single", "multiple"]
		},

		placeholder: {
			control: "text"
		},

		state: {
			control: "select",
			options: ["default", "success", "primary", "warning", "danger"]
		},

		["file-type"]: {
			control: "text"
		},

		size: {
			control: "radio",
			options: ["small", "medium"]
		},

		["max-size"]: {
			control: "text"
		},

		disabled: {
			control: "boolean"
		},

		loading: {
			control: "boolean"
		}
	},

	args: {
		value: undefined,
		type: "single",
		placeholder: "Drag and Drop Files or Click here to upload",
		state: "default",
		size: "medium",
		["file-type"]: "all",
		["max-size"]: undefined,

		disabled: false,
		loading: false
	}
};

export const Anatomy = {
	render: () =>
		html`<div class="align-center" padding="large">${unsafeSVG(fFileUploadAnatomy)}</div>`,
	name: "Anatomy"
};

export const Type = {
	render: args => {
		const types = ["single", "multiple"];
		const [value, setValue] = useState(null);
		const [multipleValue, setMultipleValue] = useState(null);

		const handleValue = (e, type) => {
			if (type === "single") setValue(e.detail.value);
			else setMultipleValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-left" padding="large" gap="medium">
				${types.map(
					item =>
						html`<f-div>
							<f-file-upload
								.type=${item}
								.value=${item === "single" ? value : multipleValue}
								placeholder="Drag and Drop Files or Click here to upload"
								@input=${e => handleValue(e, item)}
							>
								<f-div slot="label" padding="none" gap="none">${item} File Selection</f-div>
								<f-text slot="help" variant="para" size="small">This is a Subtext</f-text>
							</f-file-upload></f-div
						>`
				)}
			</f-div>
		`;
	},

	name: "type",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};

export const Value = {
	render: args => {
		const types = ["single", "multiple"];
		const file = new File(["test"], "test.pdf");
		const [value, setValue] = useState(file);
		const [multipleValue, setMultipleValue] = useState([file]);

		const handleValue = (e, type) => {
			if (type === "single") setValue(e.detail.value);
			else setMultipleValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-left" padding="large" gap="medium">
				${types.map(
					item =>
						html`<f-div>
							<f-file-upload
								.type=${item}
								.value=${item === "single" ? value : multipleValue}
								placeholder="Drag and Drop Files or Click here to upload"
								@input=${e => handleValue(e, item)}
							>
								<f-div slot="label" padding="none" gap="none"
									>${item} File Selection -
									${item === "single"
										? "value as a file object"
										: "value as an array of file objects"}</f-div
								>
								<f-text slot="help" variant="para" size="small">This is a Subtext</f-text>
							</f-file-upload></f-div
						>`
				)}
			</f-div>
		`;
	},

	name: "value",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};

export const Placeholder = {
	render: args => {
		const types = ["single", "multiple"];
		const file = new File(["test"], "test.pdf");
		const [value, setValue] = useState(file);
		const [multipleValue, setMultipleValue] = useState(null);

		const handleValue = (e, type) => {
			if (type === "single") setValue(e.detail.value);
			else setMultipleValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-left" padding="large" gap="medium">
				${types.map(
					item =>
						html`<f-div>
							<f-file-upload
								.type=${item}
								.value=${item === "single" ? value : multipleValue}
								placeholder="Drag and Drop Files or Click here to upload"
								@input=${e => handleValue(e, item)}
							>
								<f-div slot="label" padding="none" gap="none"
									>${item} File Selection - placeholder</f-div
								>
								<f-text slot="help" variant="para" size="small">This is a Subtext</f-text>
							</f-file-upload></f-div
						>`
				)}
			</f-div>
		`;
	},

	name: "placeholder",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};

export const FileType = {
	render: args => {
		const fileTypes = ["all", ".pdf", ".pdf, .jpg, .jpeg"];
		const [value, setValue] = useState(null);

		const handleValue = (e, type) => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-left" padding="large" gap="medium">
				${fileTypes.map(
					item =>
						html`<f-div>
							<f-file-upload
								type="single"
								.value=${value}
								file-type=${item}
								placeholder="Drag and Drop Files or Click here to upload"
								@input=${e => handleValue(e, item)}
							>
								<f-div slot="label" padding="none" gap="none"
									>File Formats accepted - ${item}
								</f-div>
								<f-text slot="help" variant="para" size="small">This is a Subtext</f-text>
							</f-file-upload></f-div
						>`
				)}
			</f-div>
		`;
	},

	name: "file-type",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};

export const Size = {
	render: args => {
		const sizes = ["small", "medium"];
		const [value, setValue] = useState(null);

		const handleValue = (e, type) => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-left" padding="large" gap="medium">
				${sizes.map(
					item =>
						html`<f-div>
							<f-file-upload
								type="single"
								.value=${value}
								.size=${item}
								placeholder="Drag and Drop Files or Click here to upload"
								@input=${e => handleValue(e, item)}
							>
								<f-div slot="label" padding="none" gap="none">Size - ${item} </f-div>
								<f-text slot="help" variant="para" size="small">This is a Subtext</f-text>
							</f-file-upload></f-div
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
		const [value, setValue] = useState(null);

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
									html`<f-div>
										<f-file-upload
											type="single"
											.value=${value}
											.state=${state}
											placeholder="Drag and Drop Files or Click here to upload"
											@input=${e => handleValue(e)}
										>
											<f-div slot="label" padding="none" gap="none">State - ${item} </f-div>
											<f-text slot="help" variant="para" size="small">This is a Subtext</f-text>
										</f-file-upload></f-div
									>`
							)}
						</f-div>`
				)}
			</f-div>
		`;
	},

	name: "state"
};

export const MaxSize = {
	render: args => {
		const [value, setValue] = useState(null);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-left" padding="large" gap="medium"
				><f-div>
					<f-file-upload
						type="single"
						.value=${value}
						placeholder="Drag and Drop Files or Click here to upload"
						max-size="100 MB"
						@input=${e => handleValue(e)}
					>
						<f-div slot="label" padding="none" gap="none">Max Size Label </f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext</f-text>
					</f-file-upload></f-div
				>
			</f-div>
		`;
	},

	name: "max-size"
};

export const Flags = {
	render: args => {
		const [value, setValue] = useState(null);

		const handleValue = e => {
			setValue(e.detail.value);
		};

		return html`
			<f-div width="100%" align="top-left" padding="large" gap="medium"
				><f-div>
					<f-file-upload
						type="single"
						.value=${value}
						placeholder="Drag and Drop Files or Click here to upload"
						max-size="100 MB"
						@input=${e => handleValue(e)}
						?disabled=${true}
					>
						<f-div slot="label" padding="none" gap="none">Disabled Flag </f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext</f-text>
					</f-file-upload></f-div
				>
				<f-div>
					<f-file-upload
						type="single"
						.value=${value}
						placeholder="Drag and Drop Files or Click here to upload"
						max-size="100 MB"
						@input=${e => handleValue(e)}
						?loading=${true}
					>
						<f-div slot="label" padding="none" gap="none">Loading Flag</f-div>
						<f-text slot="help" variant="para" size="small">This is a Subtext</f-text>
					</f-file-upload></f-div
				>
			</f-div>
		`;
	},

	name: "Flags"
};
