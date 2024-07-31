import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { FRoot } from "./../../mixins/components/f-root/f-root";
import globalStyle from "./f-carousel-content-global.scss?inline";
import { FDiv } from "../f-div/f-div";
import { flowElement } from "./../../utils";

import { injectCss } from "@nonfx/flow-core-config";

injectCss("f-carousel-content", globalStyle);
@flowElement("f-carousel-content")
export class FCarouselContent extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle), ...FDiv.styles];

	/**
	 * @attribute mandatory content-id to uniquely identify content
	 */
	@property({ type: String, attribute: "content-id", reflect: true })
	contentId!: string;

	render() {
		/**
		 * Final html to render
		 */
		return html`<f-div direction="column" width="100%" align="middle-center"><slot></slot></f-div>`;
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-carousel-content": FCarouselContent;
	}
}
