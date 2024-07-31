import { html, LitElement, PropertyValueMap, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import globalStyle from "./f-tooltip-global.scss?inline";
import { FDiv } from "../f-div/f-div";
import { FText } from "../f-text/f-text";
import { FPopover } from "../f-popover/f-popover";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
injectCss("f-tooltip", globalStyle);

export type FTooltipPlacement =
	| "top"
	| "top-start"
	| "top-end"
	| "right"
	| "right-start"
	| "right-end"
	| "bottom"
	| "bottom-start"
	| "bottom-end"
	| "left"
	| "left-start"
	| "left-end"
	| "auto";

@flowElement("f-tooltip")
export class FTooltip extends LitElement {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle), ...FDiv.styles, ...FText.styles, ...FPopover.styles];

	/**
	 * local attribute for opem/close of tooltip
	 */
	@state()
	open = false;

	/**
	 * @attribute placement of `f-tooltip`
	 */
	@property({ type: String, reflect: true })
	placement?: FTooltipPlacement = "auto";

	/**
	 * @attribute close icon for tooltip
	 */
	@property({ type: Boolean, reflect: true })
	closable?: boolean = false;

	/**
	 * @attribute query selector of target
	 */

	target!: string | HTMLElement;

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "tooltip";

		if (!this.getAttribute("aria-label")) {
			// default label if no label is provided
			this.setAttribute("aria-label", "Tooltip");
		}
	}

	render() {
		this.setAttribute("data-theme", "f-dark");
		/**
		 * Final html to render
		 */
		if (this.open) {
			return html` <f-popover
				.overlay=${false}
				.placement=${this.placement}
				?open=${this.open}
				.target=${this.target}
				class="tooltip"
			>
				<f-div gap="small" state="custom, black">
					<f-div overflow="scroll" padding="small medium"> <slot></slot> </f-div>
					${this.closable
						? html` <f-div width="hug-content" padding="small"
								><f-icon
									source="i-close"
									size="x-small"
									clickable
									@click=${() => (this.open = false)}
								></f-icon
						  ></f-div>`
						: ""}
				</f-div>
			</f-popover>`;
		}
		return html``;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-tooltip": FTooltip;
	}
}
