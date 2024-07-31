import { html } from "lit-html";
import sampleMd from "./sample-md";
import { createRef, ref } from "lit-html/directives/ref.js";
import { FMDEditor } from "@nonfx/flow-md-editor";

export default {
	title: "@nonfx/flow-md-editor/f-md-editor",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, string>) => {
		const mdRef = createRef<FMDEditor>();
		const handleInput = function (ev: CustomEvent) {
			console.log(ev.detail.value);
		};

		return html`<f-div padding="x-large" height="100%">
			<f-md-editor
				${ref(mdRef)}
				.value=${args.value}
				.mode=${args.mode}
				@input=${handleInput}
			></f-md-editor>
		</f-div>`;
	},

	name: "Playground",

	argTypes: {
		value: {
			control: "text"
		},

		mode: {
			control: "radio",
			options: ["edit", "view"]
		}
	},

	args: {
		value: sampleMd,
		mode: "view"
	}
};

export const Value = {
	render: () => {
		return html`<f-div height="100%" direction="column" gap="large">
			<f-text state="warning">'value' will display inside editor</f-text>
			<f-md-editor
				mode="edit"
				.value=${`## Heading 2
			### Heading 3
			#### Heading 4`}
			></f-md-editor>
		</f-div>`;
	},

	name: "value"
};

export const Mode = {
	render: () => {
		const editValue = `## This is edit mode`;
		const viewValue = `## This is view mode`;
		return html`<f-div height="100%" gap="large">
			<f-md-editor mode="edit" .value=${editValue}></f-md-editor>
			<f-divider></f-divider>
			<f-md-editor mode="view" .value=${viewValue}></f-md-editor>
		</f-div>`;
	},

	name: "mode"
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
						<f-md-editor
							mode="edit"
							@input=${handleInput}
							.value=${`# This is value`}
						></f-md-editor>
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
