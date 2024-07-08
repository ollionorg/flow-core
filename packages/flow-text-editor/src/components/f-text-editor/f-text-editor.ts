import { unsafeCSS, html } from "lit";
import { FRoot, flowElement } from "@ollion/flow-core";
import globalStyle from "./f-text-editor-global.scss?inline";
import { FTextArea } from "@ollion/flow-core";
import { property } from "lit/decorators.js";
import { injectCss } from "@ollion/flow-core-config";

injectCss("f-text-editor", globalStyle);
@flowElement("f-text-editor")
export class FTextEditor extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle), ...FTextArea.styles];

	/**
	 * @attribute value to be inserted in text-area.
	 */
	@property({ reflect: false, type: String })
	value?: string;

	createRenderRoot() {
		return this;
	}

	render() {
		return html`<f-text>This is text editor</f-text>`;
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
