import { PropertyValueMap, unsafeCSS } from "lit";
import { FRoot, flowElement } from "@cldcvr/flow-core";
import eleStyle from "./f-code-editor.scss";
import * as monaco from "monaco-editor";

import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { property } from "lit/decorators.js";

self.MonacoEnvironment = {
	getWorker(_, label) {
		if (label === "json") {
			return new jsonWorker();
		}
		if (label === "css" || label === "scss" || label === "less") {
			return new cssWorker();
		}
		if (label === "html" || label === "handlebars" || label === "razor") {
			return new htmlWorker();
		}
		if (label === "typescript" || label === "javascript") {
			return new tsWorker();
		}
		return new editorWorker();
	}
};

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
@flowElement("f-code-editor")
export class FCodeEditor extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle)];

	editor?: monaco.editor.IStandaloneCodeEditor;

	@property({ type: String })
	code?: string;

	@property({ reflect: true, type: String })
	language?: FCodeEditorLanguage;

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
		this.editor = monaco.editor.create(this, {
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
			dimension: {
				width: this.offsetWidth,
				height: this.offsetHeight
			}
		});
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
