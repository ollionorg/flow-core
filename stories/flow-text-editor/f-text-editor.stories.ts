import { html } from "lit-html";
import { createRef, ref } from "lit-html/directives/ref.js";

export default {
	title: "@nonfx/flow-text-editor/f-text-editor",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, any>) => {
		const handleInput = function (ev: CustomEvent) {
			console.log(ev);
		};

		return html`<f-div height="100%">
			<f-text-editor
				.placeholder=${args.placeholder}
				.value=${args.value}
				@input=${handleInput}
			></f-text-editor>
		</f-div>`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "text"
		},
		placeholder: {
			control: "text"
		}
	},

	args: {
		value: `<h1>Hello World!</h1>`,
		placeholder: `Enter rich text here...`
	}
};

export const Value = {
	render: () => {
		return html`<f-div height="100%" direction="column" gap="large">
			<f-text state="warning">'value' will display inside editor</f-text>
			<f-text-editor .value=${"<h1>This is value</h1>"}></f-text-editor>
		</f-div>`;
	},

	name: "value"
};

export const Placeholder = {
	render: () => {
		return html`<f-div height="100%" direction="column" gap="large">
			<f-text state="warning">'placeholder' will display whenever there is no content</f-text>
			<f-text-editor .placeholder=${"This is placeholder"}></f-text-editor>
		</f-div>`;
	},

	name: "placeholder"
};

export const ReadOnly = {
	render: () => {
		return html`<f-div height="100%" direction="column" gap="large">
			<f-text state="warning">If 'read-only' is set then you can't edit</f-text>
			<f-text-editor
				.readOnly=${true}
				.value=${"<h1>You can't edit this value</h1>"}
			></f-text-editor>
		</f-div>`;
	},

	name: "read-only"
};

export const ToolBar = {
	render: () => {
		const toolbarOptions = [
			["bold", "italic", "underline", "strike"], // toggled buttons
			["blockquote", "code-block"],
			["link", "image", "video", "formula"],

			[{ header: 1 }, { header: 2 }], // custom button values
			[{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
			[{ script: "sub" }, { script: "super" }], // superscript/subscript
			[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
			[{ direction: "rtl" }], // text direction

			[{ size: ["small", false, "large", "huge"] }], // custom dropdown
			[{ header: [1, 2, 3, 4, 5, 6, false] }],

			[{ color: [] }, { background: [] }], // dropdown with defaults from theme
			[{ font: [] }],
			[{ align: [] }],

			["clean"] // remove formatting button
		];
		return html`<f-div height="100%" direction="column" gap="large">
			<f-div height="hug-content">
				<f-text state="warning">'toolbar' is used customize toolbar actions</f-text>
			</f-div>
			<f-div>
				<f-text-editor
					.toolbar=${toolbarOptions}
					.value=${`<pre>${JSON.stringify(toolbarOptions, null, 4)}</pre>`}
				></f-text-editor>
			</f-div>
		</f-div>`;
	},

	name: "tooltbar"
};

export const InputEvent = {
	render: () => {
		const preRef = createRef<HTMLPreElement>();
		const handleInput = (ev: CustomEvent) => {
			if (preRef.value) {
				preRef.value.textContent = JSON.stringify(ev.detail, null, 4);
			}
		};
		return html`
			<f-div height="100%">
				<f-div height="100%" direction="column" gap="large" padding="medium">
					<f-div height="hug-content">
						<f-text state="warning"
							>It will emit 'input' event whenver there are any modification in editor</f-text
						>
					</f-div>
					<f-div>
						<f-text-editor @input=${handleInput} .value=${`<h1>This is value</h1>`}></f-text-editor>
					</f-div>
				</f-div>
				<f-divider></f-divider>
				<f-div direction="column" gap="large" padding="medium">
					<f-text state="warning">'event.detail' will display here</f-text>
					<pre ${ref(preRef)}></pre>
				</f-div>
			</f-div>
		`;
	},

	name: "@input"
};
