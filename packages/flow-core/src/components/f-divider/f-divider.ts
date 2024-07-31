import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import globalStyle from "./f-divider-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import getCustomFillColor from "../../utils/get-custom-fill-color";
import { validateHTMLColor } from "validate-color";
import { validateHTMLColorName } from "validate-color";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
injectCss("f-divider", globalStyle);

export type FDividerState = "default" | "secondary" | "subtle" | `custom, ${string}`;

@flowElement("f-divider")
export class FDivider extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle)];

	/**
	 * @attribute local state for managing custom fill.
	 */
	@state()
	fill = "";

	/**
	 * @attribute The solid variant is the default.
	 */
	@property({ reflect: true, type: String })
	variant?: "solid" | "dashed" | "dotted" = "solid";

	/**
	 * @attribute The medium size is the default.
	 */
	@property({ reflect: true, type: String })
	size?: "large" | "medium" = "medium";

	/**
	 * @attribute The state of Divider helps in indicating the degree of emphasis. By default it is default state.
	 */
	@property({ reflect: true, type: String })
	state?: FDividerState = "default";

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "separator";
	}

	render() {
		/**
		 * creating local fill variable out of state prop.
		 */
		this.fill = getCustomFillColor(this.state ?? "");

		//validation
		if (
			this.state?.includes("custom") &&
			this.fill &&
			!validateHTMLColor(this.fill) &&
			!validateHTMLColorName(this.fill)
		) {
			throw new Error("f-divider : enter correct color-name or hex-color-code");
		}

		if (this.fill) {
			this.style.borderColor = this.fill;
		}

		// render empty string, since there no need of any child element
		return html`&nbsp;`;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-divider": FDivider;
	}
}
