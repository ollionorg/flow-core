import { html, unsafeCSS } from "lit";
import globalStyle from "./f-template-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";

import { injectCss } from "@ollion/flow-core-config";
injectCss("f-template", globalStyle);

export class FTemplate extends FRoot {
	static tagName = "f-template";
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle)];

	render() {
		return html`<slot></slot>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"f-template": FTemplate;
	}
}
