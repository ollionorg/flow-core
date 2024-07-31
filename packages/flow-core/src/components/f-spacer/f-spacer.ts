import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import globalStyle from "./f-spacer-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
injectCss("f-spacer", globalStyle);

export type FSpacerSizeProp =
	| "fill-container"
	| "x-large"
	| "large"
	| "medium"
	| "small"
	| "x-small"
	| `${number}px`
	| `${number}%`
	| `${number}vw`;

@flowElement("f-spacer")
export class FSpacer extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle)];

	/**
	 * @attribute width of `f-spacer`
	 */
	@property({ type: String, reflect: true })
	size?: FSpacerSizeProp = "medium";

	/**
	 * Applying height,width related style, based on size property
	 */
	applySize() {
		const fixedValues = ["fill-container", "x-large", "large", "medium", "small", "x-small"];
		const parentDiv = this?.closest("f-div");
		if (this.size && !fixedValues.includes(this.size)) {
			if (parentDiv?.direction === "row") {
				this.style.width = this.size;
				this.style.height = "100%";
			} else {
				this.style.height = this.size;
				this.style.width = "100%";
			}
		}
	}

	render() {
		/**
		 * START :  apply inline styles based on attribute values
		 */
		this.applySize();
		/**
		 * END :  apply inline styles based on attribute values
		 */

		/**
		 * Final html to render
		 */
		return html``;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-spacer": FSpacer;
	}
}
