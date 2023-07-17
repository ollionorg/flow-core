import { unsafeCSS, html } from "lit";
import { FRoot, flowElement } from "@cldcvr/flow-core";
import eleStyle from "./f-md-editor.scss";
import { FTextArea } from "@cldcvr/flow-core";
import * as showdown from "showdown";
import { property, query } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

@flowElement("f-md-editor")
export class FMDEditor extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FTextArea.styles];

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
