import { unsafeCSS, html, PropertyValues, PropertyValueMap } from "lit";
import { FRoot, flowElement } from "@nonfx/flow-core";
import globalStyle from "./f-text-editor-global.scss?inline";
import { FTextArea } from "@nonfx/flow-core";
import { property } from "lit/decorators.js";
import { injectCss } from "@nonfx/flow-core-config";
import { createRef, ref } from "lit-html/directives/ref.js";
import Quill from "quill";
import { keyed } from "lit-html/directives/keyed.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

injectCss("f-text-editor", globalStyle);

export type FTextEditorToolbarAction =
	| "bold"
	| "italic"
	| "underline"
	| "strike"
	| "blockquote"
	| "code-block"
	| "link"
	| "image"
	| "video"
	| "formula"
	| { header: (1 | 2 | 3 | 4 | 5 | 6 | false)[] | 1 | 2 | 3 | 4 | 5 | 6 }
	| { list: "ordered" | "bullet" | "check" }
	| { script: "super" | "sub" }
	| { indent: "-1" | "+1" }
	| { direction: "rtl" }
	| { size: "small" | false | "large" | "huge" }
	| { color: string[] }
	| { background: string[] }
	| { align: ("left" | "center" | "right" | "justify")[] };

export type FTextEditorToolbar = FTextEditorToolbarAction[] | FTextEditorToolbarAction[][];
@flowElement("f-text-editor")
export class FTextEditor extends FRoot {
	/**
	 * To force re-render
	 */
	key = 0;
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle), ...FTextArea.styles];

	/**
	 * @attribute value to be inserted in text-area.
	 */
	@property({ reflect: false, type: String })
	value?: string;
	/**
	 * @attribute value to be inserted in text-area.
	 */
	@property({ reflect: true, type: String })
	placeholder?: string;

	/**
	 * @attribute to make read-only
	 */
	@property({ reflect: true, type: Boolean, attribute: "read-only" })
	readOnly?: boolean;

	set ["read-only"](val: boolean) {
		this.readOnly = val;
	}

	/**
	 * @attribute toolbar to be displayed on top
	 */
	@property({ reflect: true, type: String })
	toolbar?: FTextEditorToolbar = ["bold", "italic", "underline", "strike", "link"];

	editorRoot = createRef<HTMLDivElement>();

	quillInstance?: Quill;

	createRenderRoot() {
		return this;
	}
	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);

		this.key += 1;
	}

	render() {
		return keyed(
			this.key,
			html`<div
				${ref(this.editorRoot)}
				@input=${(ev: InputEvent) => ev.stopPropagation()}
				class="f-text-editor-root"
			>
				${unsafeHTML(this.value)}
			</div>`
		);
	}

	protected updated(changedProperties: PropertyValues): void {
		super.updated(changedProperties);

		if (this.editorRoot.value) {
			this.quillInstance = new Quill(this.editorRoot.value, {
				theme: "snow",
				placeholder: this.placeholder,
				readOnly: this.readOnly,
				modules: {
					toolbar: this.toolbar
				}
			});

			this.quillInstance.on("editor-change", (eventName, ...args) => {
				const event = new CustomEvent<{
					value: string;
					quillMeta: { eventName: string; args: unknown };
				}>("input", {
					detail: {
						value: this.quillInstance?.root.innerHTML ?? "",
						quillMeta: { eventName, args }
					},
					bubbles: true,
					composed: true
				});
				this.dispatchEvent(event);
			});
		}
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-text-editor": FTextEditor;
	}
}
