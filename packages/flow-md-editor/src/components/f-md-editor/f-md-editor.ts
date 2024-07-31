import { unsafeCSS, html } from "lit";
import { FRoot, flowElement } from "@nonfx/flow-core";
import globalStyle from "./f-md-editor-global.scss?inline";
import { FTextArea } from "@nonfx/flow-core";
import * as showdown from "showdown";
import { property, query } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { injectCss } from "@nonfx/flow-core-config";

injectCss("f-md-editor", globalStyle);
@flowElement("f-md-editor")
export class FMDEditor extends FRoot {
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
	mode?: "edit" | "view" = "view";

	@query(".flow-editable")
	editor?: HTMLDivElement;

	createRenderRoot() {
		return this;
	}

	render() {
		if (this.mode === "view") {
			const converter = new showdown.Converter();
			converter.setFlavor("github");

			const htmlContent = converter.makeHtml(this.value ?? "");
			return html`<div class="markdown-body">${unsafeHTML(htmlContent)}</div>`;
		}
		// prettier-ignore
		return html`<div class="flow-editable" @input=${this.handleInput} contenteditable="true">${this.value?.trim()}</div>`;
	}

	handleInput(event: InputEvent) {
		if (this.editor) {
			event.stopPropagation();
			event.stopImmediatePropagation();

			const inputEvent = new CustomEvent("input", {
				detail: {
					value: this.editor?.textContent,
					nativeEvent: event
				},
				bubbles: true,
				composed: true
			});

			this.dispatchEvent(inputEvent);
		}
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-md-editor": FMDEditor;
	}
}
