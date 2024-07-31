import { html, PropertyValueMap, unsafeCSS } from "lit";
import { FRoot, flowElement, FButton } from "@nonfx/flow-core";
import globalStyle from "./f-code-editor-global.scss?inline";
import * as monaco from "monaco-editor";

import { property, query } from "lit/decorators.js";
import { languageCommentsMap } from "../../utils/lang-comments-map";
import { injectCss } from "@nonfx/flow-core-config";

injectCss("f-code-editor", globalStyle);

export type FCodeEditorLanguage =
	| "scala"
	| "python"
	| "json"
	| "css"
	| "scss"
	| "less"
	| "html"
	| "yaml"
	| "javascript"
	| "typescript";

export type FCodeEditorSettings = monaco.editor.IStandaloneEditorConstructionOptions;
export type FCodeEditorServices = monaco.editor.IStandaloneEditorConstructionOptions;

export type FCodeEditorStateProp = "subtle" | "default" | "secondary";

@flowElement("f-code-editor")
export class FCodeEditor extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle)];

	/**
	 * editor instance
	 */
	editor?: monaco.editor.IStandaloneCodeEditor;

	/**
	 * actual code to display in editor
	 */
	@property({ type: String })
	code?: string;

	/**
	 * @attribute header title
	 */
	@property({ reflect: true, type: String })
	title = "";

	/**
	 * @attribute state property defines the background color.
	 */
	@property({ reflect: true, type: String })
	state?: FCodeEditorStateProp = "default";

	/**
	 * language of code
	 */
	@property({ reflect: true, type: String })
	language?: FCodeEditorLanguage = "typescript";

	/**
	 * height to is required to create editor
	 */
	@property({ type: String })
	height?: string = "100%";

	/**
	 * width to is required to create editor
	 */
	@property({ type: String })
	width?: string = "100%";

	@property({ type: Object })
	settings?: FCodeEditorSettings = {};

	@property({ type: Object })
	services?: FCodeEditorServices = {};

	/**
	 * @attribute comments toggle actions
	 */
	@property({ type: Boolean, reflect: true })
	comments?: boolean = false;

	/**
	 * @attribute copy on click action
	 */
	@property({ type: Boolean, reflect: true, attribute: "copy-button" })
	copyButton?: boolean = false;

	/**
	 * @attribute show/hide line no.
	 */
	@property({ type: Boolean, reflect: true, attribute: "show-line-numbers" })
	showLineNumbers?: boolean = true;

	/**
	 * @attribute read-only-mode
	 */
	@property({ type: Boolean, reflect: true, attribute: "read-only" })
	readOnly?: boolean = false;

	@query(".copy-button")
	copyCodeButton?: FButton;

	removedCommentsMap = new Map<number, string>();

	get dymanicWidth() {
		return this.title ? "hug-content" : "100%";
	}

	get fixedLang() {
		return this.language ?? "javascript";
	}

	multiLineStart(startIndex: number, endIndex: number, line: string) {
		if (startIndex >= 0 && endIndex >= 0) {
			return line.substring(0, startIndex) + line.substring(endIndex + 2);
		} else {
			return line.substring(0, startIndex);
		}
	}

	multiLineEnd(endIndex: number, line: string) {
		if (endIndex >= 0) {
			return { code: line.substring(endIndex + 2), insideMultiLine: false };
		} else {
			return { code: "", insideMultiLine: true };
		}
	}

	addNewLine(modifiedLine: string, newLines: string[]) {
		if (modifiedLine.trim() !== "") {
			newLines.push(modifiedLine);
		}
	}

	toggleComments() {
		if (!this.editor) return;
		const code = this.editor.getValue();
		const lines = code.split("\n");
		const newLines: string[] = [];
		let insideMultiLineComment = false;
		const removedCommentsMap = new Map<number, string>();
		const startPattern = languageCommentsMap.get(this.fixedLang)?.multiLine?.start;
		const endPattern = languageCommentsMap.get(this.fixedLang)?.multiLine?.end;
		const singleLinePattern = languageCommentsMap.get(this.fixedLang)?.singleLine;

		for (const [index, line] of lines.entries()) {
			let modifiedLine = line;

			// Check for multi-line comments start
			if (startPattern && endPattern && !insideMultiLineComment && line.includes(startPattern)) {
				insideMultiLineComment = true;
				const startIndex = line.indexOf(startPattern);
				const endIndex = line.indexOf(endPattern);
				modifiedLine = this.multiLineStart(startIndex, endIndex, line);
				// Save the multi-line comment in the map
				removedCommentsMap.set(index, line);
			}

			// Check for multi-line comments end
			if (endPattern && insideMultiLineComment) {
				const endIndex = line.indexOf(endPattern);
				const { code, insideMultiLine } = this.multiLineEnd(endIndex, line);
				modifiedLine = code;
				insideMultiLineComment = insideMultiLine ?? true;
				removedCommentsMap.set(index, line);
			}

			// Check for single-line comments
			if (singleLinePattern) {
				const commentIndex = modifiedLine.indexOf(singleLinePattern);
				if (commentIndex >= 0 && !insideMultiLineComment) {
					modifiedLine = modifiedLine.substring(0, commentIndex);
					// Save the single-line comment in the map
					removedCommentsMap.set(index, line);
				}
				this.addNewLine(modifiedLine, newLines);
				// Only add the line if it's not an empty line after removing the comments
			}
		}
		this.editor.setValue(newLines.join("\n"));
		this.removedCommentsMap = removedCommentsMap;
	}

	restoreComments() {
		if (!this.editor) return;
		const modifiedLines = this.editor.getValue().split("\n");
		const lines = modifiedLines.slice();
		const restoredLines = modifiedLines.slice();

		for (const [_index, removedComment] of this.removedCommentsMap.entries()) {
			lines.forEach((item, lineIndex) => {
				if (removedComment.trim().includes(item.trim())) {
					restoredLines.splice(lineIndex, 1);
				}
			});
		}

		for (const [index, removedComment] of this.removedCommentsMap.entries()) {
			// Restore the removed comment to its original position
			restoredLines.splice(index, 0, removedComment);
		}

		const code = restoredLines.join("\n");

		this.editor?.setValue(code);
		this.removedCommentsMap.clear();
	}

	errorMessageOnCopy() {
		if (this.copyCodeButton) {
			this.copyCodeButton.state = "danger";
			this.copyCodeButton.label = "ERROR!";
			this.copyCodeButton.iconLeft = "i-close";
		}
		setTimeout(() => {
			if (this.copyCodeButton) {
				this.copyCodeButton.state = "primary";
				this.copyCodeButton.label = "COPY";
				this.copyCodeButton.iconLeft = "i-copy";
			}
		}, 2000);
	}

	successMessageOnCopy() {
		if (this.copyCodeButton) {
			this.copyCodeButton.state = "success";
			this.copyCodeButton.label = "COPIED!";
			this.copyCodeButton.iconLeft = "i-tick";
		}
		setTimeout(() => {
			if (this.copyCodeButton) {
				this.copyCodeButton.state = "primary";
				this.copyCodeButton.label = "COPY";
				this.copyCodeButton.iconLeft = "i-copy";
			}
		}, 2000);
	}

	// Function to copy the code inside the editor to the clipboard
	copyCodeToClipboard() {
		if (this.editor) {
			const code = this.editor?.getValue();

			// Copy the entire code to the clipboard
			navigator.clipboard
				.writeText(code)
				.then(() => {
					this.successMessageOnCopy();
				})
				.catch(() => {
					this.errorMessageOnCopy();
				});
		}
	}

	handleChange(e: CustomEvent<{ value: unknown }>) {
		if (!e.detail.value) {
			this.toggleComments();
		} else {
			this.restoreComments();
		}
	}

	/**
	 * monoco editor never works in shadow dom
	 */
	createRenderRoot() {
		return this;
	}

	render() {
		const titleSection = this.title
			? html` <f-div gap="medium" align="middle-left">
					<f-icon source="i-code" state="default" size="x-small"></f-icon>
					<f-text variant="code" size="small" weight="regular" state="secondary"
						>${this.title}</f-text
					>
			  </f-div>`
			: null;

		const copyButtonSection = this.copyButton
			? html` <f-button
					class="copy-button"
					variant="curved"
					category="fill"
					size="x-small"
					label="COPY"
					icon-left="i-copy"
					@click=${this.copyCodeToClipboard}
			  ></f-button>`
			: null;
		const commentsToggleSection = this.comments
			? html` <f-div gap="small" align="middle-left" width="hug-content">
					<f-text variant="heading" size="x-small" weight="regular" state="subtle">Comments</f-text>
					<f-div width="hug-content" overflow="hidden">
						<f-switch size="small" @input=${this.handleChange} .value=${true}></f-switch>
					</f-div>
			  </f-div>`
			: null;

		const actionSection =
			this.copyButton || this.comments
				? html` <f-div gap="medium" align="middle-right" width=${this.dymanicWidth}>
						${commentsToggleSection} ${copyButtonSection}
				  </f-div>`
				: null;

		if (this.comments || this.copyButton || this.title) {
			return html` <f-div state="secondary" class="f-code-editor-header" padding="medium">
				${titleSection} ${actionSection}
			</f-div>`;
		} else {
			return "";
		}
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		if (this.editor) {
			this.editor.dispose();
		}
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		this.style.height = this.height as string;
		this.style.width = this.width as string;
		if (this.code) {
			this.editor = monaco.editor.create(
				this,
				{
					value: this.code,
					theme: "vs-dark",
					language: this.language,
					automaticLayout: true,
					autoDetectHighContrast: false,
					readOnly: this.readOnly,
					fontSize: 16,
					padding: {
						top: 16
					},
					minimap: { enabled: false },
					dimension: {
						width: this.offsetWidth,
						height: this.offsetHeight
					},
					...this.settings
				},
				this.services
			);

			if (this.showLineNumbers) {
				this.editor.updateOptions({ lineNumbers: "on" });
			} else {
				this.editor.updateOptions({ lineNumbers: "off" });
			}

			this.editor?.getModel()?.onDidChangeContent(() => {
				const inputEvent = new CustomEvent("content-change", {
					detail: {
						value: this.editor?.getModel()?.getValue()
					},
					bubbles: true,
					composed: true
				});

				this.dispatchEvent(inputEvent);
			});

			this.querySelector(".monaco-editor")?.setAttribute("state", this.state ?? "default");
		}
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-code-editor": FCodeEditor;
	}
}
