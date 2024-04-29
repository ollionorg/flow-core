import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import eleStyle from "./f-form.scss?inline";
import globalStyle from "./f-form-global.scss?inline";
import { FDiv } from "../f-div/f-div";

import { injectCss } from "@ollion/flow-core-config";
import { ifDefined } from "lit/directives/if-defined.js";
injectCss("f-form", globalStyle);

// import { ref, createRef } from "lit/directives/ref.js";

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */

export class FForm extends FRoot {
	static readonly tagName = "f-form";
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle), ...FText.styles, ...FDiv.styles];

	/**
	 * @attribute Gap is used to define the gap between the elements
	 */
	@property({ reflect: true, type: String })
	gap?: "large" | "medium" | "small" | "x-small" = "medium";

	/**
	 * @attribute group separator
	 */
	@property({ reflect: true, type: Boolean })
	separator?: boolean = false;

	render() {
		/**
		 * Final html to render
		 */
		return html`
			<form gap=${ifDefined(this.gap)}>
				<slot></slot>
			</form>
		`;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-form": FForm;
	}
}
