import { html, PropertyValueMap, unsafeCSS } from "lit";
import { FRoot, flowElement } from "@cldcvr/flow-core";
import eleStyle from "./f-code-editor.scss";
import * as monaco from "monaco-editor";

import { property } from "lit/decorators.js";
import { languageCommentsMap, languageCommentsRegexMap } from "../../utils/lang-comments-map";

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
@flowElement("f-code-editor")
export class FCodeEditor extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle)];

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

	hiddenDecorations: string[] = [];

	commentLineDecorations: string[] = [];

	commentsMap = new Map();

	removedCommentsMap = new Map();

	// toggleComments() {
	// 	const model = this.editor?.getModel();
	// 	if (!model) return;

	// 	const lineCount = model.getLineCount();
	// 	const hiddenLines: number[] = [];

	// 	for (let lineNumber = 1; lineNumber <= lineCount; lineNumber++) {
	// 		const lineContent = model.getLineContent(lineNumber);
	// 		console.log(lineContent.trim());
	// 		if (
	// 			lineContent
	// 				.trim()
	// 				.startsWith(languageCommentsMap.get(this.language ?? "javascript") ?? "//")
	// 		) {
	// 			// Check if the line is a comment
	// 			hiddenLines.push(lineNumber);
	// 		}

	// 		if (
	// 			lineContent
	// 				.trim()
	// 				.includes(" " + languageCommentsMap.get(this.language ?? "javascript") ?? " //")
	// 		) {
	// 			console.log("inline-comment");
	// 		}
	// 	}

	// 	// Hide or show the comment lines using overlay decoration
	// 	this.commentLineDecorations = model.deltaDecorations(
	// 		this.commentLineDecorations,
	// 		hiddenLines.map(line => ({
	// 			range: new monaco.Range(line, 1, line, 1),
	// 			options: {
	// 				isWholeLine: true,
	// 				className: "hidden-comment-line" // CSS class name to apply styling for hidden comment lines
	// 			}
	// 		}))
	// 	);

	// 	// Shift the main code to occupy the space of hidden lines
	// 	if (this.code) {
	// 		const modifiedCode = this.code
	// 			.split("\n")
	// 			.filter((_, index) => !hiddenLines.includes(index + 1))
	// 			.join("\n");
	// 		this.editor?.setValue(modifiedCode);
	// 	}
	// }

	toggleComments() {
		if (!this.editor) return;

		const model = this.editor.getModel();
		if (!model) return;

		const code = this.editor.getValue();
		const lines = code.split("\n");
		const commentPatternSingle =
			languageCommentsRegexMap.get(this.language ?? "javascript")?.singleLine ?? "//";
		const commentPatternMultiple =
			languageCommentsRegexMap.get(this.language ?? "javascript")?.multiLine ?? "//";

		let newCode = "";
		const removedCommentsMap = new Map(); // To store the removed comment lines

		// Remove comments and construct the new code without comments while storing the removed comments
		lines.forEach((line, lineNumber) => {
			const commentIndex = line.indexOf(
				languageCommentsMap.get(this.language ?? "javascript")?.singleLine ??
					("//" || languageCommentsMap.get(this.language ?? "javascript")?.multiLine?.start) ??
					"//"
			);
			if (
				(commentIndex !== -1 && line.slice(commentIndex).trim().match(commentPatternSingle)) ||
				line.slice(commentIndex).trim().match(commentPatternMultiple)
			) {
				// Same-line comment found, remove it
				const comment = line.slice(commentIndex);
				if (line.slice(0, commentIndex).trim() === "") {
					// Entire line is a comment, remove the line
					removedCommentsMap.set(lineNumber + 1, line);
					return; // Skip adding the line to newCode
				}
				line = line.slice(0, commentIndex);
				removedCommentsMap.set(lineNumber + 1, comment); // Adding 1 to lineNumber since Monaco uses 1-based line numbering
			}
			newCode += line + "\n";
		});

		// Update the editor with code without comments
		this.editor.setValue(newCode);

		// Store the removed comments in the component
		this.removedCommentsMap = removedCommentsMap;
	}

	restoreComments() {
		if (!this.editor || !this.removedCommentsMap) return;

		const model = this.editor.getModel();
		if (!model) return;

		const code = this.editor.getValue();
		const lines = code.split("\n");

		// Add the removed comments back to the respective line numbers
		this.removedCommentsMap.forEach((comment, lineNumber) => {
			lines.splice(lineNumber - 1, 0, comment); // Subtracting 1 from lineNumber to convert to 0-based index
		});

		// Reconstruct the code with comments and update the editor
		const codeWithComments = lines.join("\n");
		this.editor.setValue(codeWithComments);

		// Clear the removedCommentsMap since the comments are restored
		this.removedCommentsMap.clear();
	}

	/**
	 * monoco editor never works in shadow dom
	 */
	createRenderRoot() {
		return this;
	}

	render() {
		return html`
			<style>
				.hidden-comment-line {
					display: none;
				}
			</style>
			<f-div @click=${() => this.toggleComments()}>YAML</f-div>
			<f-div @click=${() => this.restoreComments()}>YAML</f-div>
		`;
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
					readOnly: false,
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
