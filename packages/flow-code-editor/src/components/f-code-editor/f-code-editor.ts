import { PropertyValueMap, unsafeCSS } from "lit";
import { FRoot, flowElement } from "@cldcvr/flow-core";
import eleStyle from "./f-code-editor.scss";
import * as monaco from "monaco-editor";

import { property } from "lit/decorators.js";

export type FCodeEditorLanguage =
	| "scala"
	| "python"
	| "json"
	| "css"
	| "scss"
	| "less"
	| "html"
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

	/**
	 * monoco editor never works in shadow dom
	 */
	createRenderRoot() {
		return this;
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
