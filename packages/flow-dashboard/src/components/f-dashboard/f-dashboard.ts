import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { FRoot, flowElement } from "@cldcvr/flow-core";
import globalStyle from "./f-suggest-global.scss?inline";
import { injectCss } from "@cldcvr/flow-core-config";

injectCss("f-dashboard", globalStyle);
@flowElement("f-dashboard")
export class FDashboard extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle)];

	/**
	 * @attribute comments baout title
	 */
	@property({ type: String })
	title!: string;

	render() {
		return html``;
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-dashboard": FDashboard;
	}
}
