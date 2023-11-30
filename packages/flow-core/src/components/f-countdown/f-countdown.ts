import { html, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import eleStyle from "./f-countdown.scss?inline";
import globalStyle from "./f-countdown-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv, FDivPaddingProp } from "../f-div/f-div";
import { flowElement } from "../../utils";
import { injectCss } from "@cldcvr/flow-core-config";
import getCustomFillColor from "../../utils/get-custom-fill-color";

injectCss("f-countdown", globalStyle);

const states = ["primary", "danger", "warning", "success", "default"] as const;

export type FCountdownStateProp = typeof states[number];

@flowElement("f-countdown")
export class FCountdown extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle)];

	/**
	 * @attribute toggle accordion
	 */
	@property({ reflect: true, type: Boolean })
	showLabel?: boolean = false;

	/**
	 * @attribute toggle accordion
	 */
	@property({ reflect: true, type: Number })
	duration?: number = 5;

	/**
	 * @attribute Each variant has various sizes. By default medium is the default size.
	 */
	@property({ type: String, reflect: true })
	size?: "x-large" | "large" | "medium" | "small" | "x-small" = "medium";

	/**
	 * @attribute The states on tags are to indicate various degrees of emphasis of the action.
	 */
	@property({ reflect: true, type: String })
	state?: FCountdownStateProp = "default";

	/**
	 * @attribute local state for managing custom fill.
	 */
	@state()
	fill = "";

	@state()
	remaining = 0;

	/**
	 * apply inline styles to shadow-dom for custom fill.
	 */
	applyStyles() {
		if (this.fill) {
			return `background: ${this.fill};`;
		}
		return "";
	}

	applyPieStyles() {
		if (this.fill) {
			return `background: ${this.fill}; animation-duration: ${this.duration}s`;
		}
		return `animation-duration: ${this.duration}s`;
	}

	maskStyles() {
		return `animation-duration: ${this.duration}s`;
	}

	render() {
		this.fill = getCustomFillColor(this.state ?? "");

		return html`
			<div class="f-countdown-wrapper">
				${this.showLabel && this.remaining > 0
					? html` <div class="f-countdown-label">
							<f-text weight="medium" size="small"> ${this.remaining}s </f-text>
					  </div>`
					: nothing}
				${this.remaining > 0
					? html` <div class="f-countdown-circle" style=${this.applyStyles()}>
							<div class="f-countdown-pie f-countdown-spinner" style=${this.applyPieStyles()}></div>
							<div class="f-countdown-pie f-countdown-filler" style=${this.applyPieStyles()}></div>
							<div class="mask" style=${this.maskStyles()}></div>
					  </div>`
					: nothing}
			</div>
		`;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
		super.updated(changedProperties);
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-countdown": FCountdown;
	}
}
