import { LitElement, PropertyValues, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";

import eleStyle from "./f-root.scss";

// to avoid recursive tye check
type TooltipElement = HTMLElement & {
	target: unknown;
	open: boolean;
	closable: boolean;
};

/**
 * @summary Every component must extent this class to consume gbobal styles , such as css reset, font family,...
 *
 */
export class FRoot extends LitElement {
	static styles = [unsafeCSS(eleStyle)];

	@query("f-popover")
	tooltipElement!: HTMLElement;

	/**
	 * @attribute Value of a switch defines if it is on or off.
	 */
	@property({ reflect: true, type: String })
	tooltip?: string;

	mouseEnter?: () => void;

	mouseLeave?: () => void;

	disconnectedCallback() {
		const tooltipElement = document.querySelector<TooltipElement>("#flow-tooltip");
		if (this.tooltip && tooltipElement?.target === this && tooltipElement) {
			tooltipElement.open = false;
		}
		super.disconnectedCallback();
	}

	protected updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);
		/**
		 * check if changed properties has tooltip
		 */
		if (changedProperties.has("tooltip")) {
			/**
			 * get global tooltip component
			 */
			let tooltipElement = document.querySelector<TooltipElement>("#flow-tooltip");
			/**
			 * is tooltip external
			 */
			let isExternalTooltip = false;

			/**
			 * mouse enter behaviour
			 */
			if (!this.mouseEnter) {
				this.mouseEnter = () => {
					if (tooltipElement) {
						tooltipElement.target = this;
						if (!isExternalTooltip) {
							const tooltipText = tooltipElement?.querySelector("#tooltip-text");
							if (tooltipText) {
								tooltipText.innerHTML = this.tooltip as string;
							}
						}
						tooltipElement.open = true;
					}
				};
			}

			/**
			 * mouse leave behavior
			 */
			if (!this.mouseLeave) {
				this.mouseLeave = () => {
					if (tooltipElement && !tooltipElement?.closable) {
						tooltipElement.open = false;
					}
				};
			}

			/**
			 * If tooltip is specified by user
			 */
			if (this.tooltip) {
				/**
				 * check if tooltip contains id
				 */
				if (this.tooltip.startsWith("#")) {
					tooltipElement = document.querySelector<TooltipElement>(this.tooltip);
					isExternalTooltip = true;
					if (!tooltipElement) {
						console.warn(`${this.tooltip} tooltip not found`);
					}
				}
				/**
				 * if global tooltip not present
				 */
				if (!tooltipElement && !isExternalTooltip) {
					const tooltipDefine = `<f-tooltip placement="auto" id="flow-tooltip">
        <f-text variant="para" size="small" id="tooltip-text">
        </f-text>
</f-tooltip>`;
					document.body?.insertAdjacentHTML("beforeend", tooltipDefine);

					// if tooltip present with particular id `flow-tooltip`
					tooltipElement = document.querySelector("#flow-tooltip");
				}

				this.addEventListener("mouseenter", this.mouseEnter);
				this.addEventListener("mouseleave", this.mouseLeave);
			} else {
				if (this.mouseLeave !== undefined && tooltipElement && tooltipElement.target === this) {
					this.mouseLeave();
				}
				this.removeEventListener("mouseenter", this.mouseEnter);
				this.removeEventListener("mouseleave", this.mouseLeave);
			}
		}
	}
}
