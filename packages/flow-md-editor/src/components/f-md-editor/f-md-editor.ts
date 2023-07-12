import { unsafeCSS, html } from "lit";
import { FRoot, flowElement } from "@cldcvr/flow-core";
import eleStyle from "./f-md-editor.scss";

@flowElement("f-md-editor")
export class FMDEditor extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle)];

	render() {
		return html`<f-text>This is md editor</f-text>`;
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
