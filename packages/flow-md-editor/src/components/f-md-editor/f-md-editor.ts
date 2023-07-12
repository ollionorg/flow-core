import { unsafeCSS, html } from "lit";
import { FRoot, flowElement } from "@cldcvr/flow-core";
import eleStyle from "./f-md-editor.scss";
import { FTextArea } from "@cldcvr/flow-core";
import * as showdown from "showdown";
import { property } from "lit/decorators.js";
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

	render() {
		if (this.mode === "view") {
			const converter = new showdown.Converter({
				simplifiedAutoLink: true,
				simpleLineBreaks: true
			});

			const htmlContent = converter.makeHtml(this.value ?? "");
			return html`${unsafeHTML(htmlContent)}`;
		}
		return html`<div class="flow-editable" contenteditable="true">
			${unsafeHTML(this.value?.replace(/(?:\r\n|\r|\n)/g, "<br>"))}
		</div>`;
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
