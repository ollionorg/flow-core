import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import eleStyle from "./f-accordion.scss?inline";
import globalStyle from "./f-accordion-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv, FDivPaddingProp } from "../f-div/f-div";
import { flowElement } from "./../../utils";
import { injectCss } from "@cldcvr/flow-core-config";

injectCss("f-accordion", globalStyle);

export type FAccordionBodyHeightProp = `${number}px` | `${number}%` | `${number}vh`;

export type FAccordionCustomEvent = {
	value: boolean;
};

export type FAccordionPadding = FDivPaddingProp;
@flowElement("f-accordion")
export class FAccordion extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle), ...FDiv.styles];

	/**
	 * @attribute toggle accordion
	 */
	@property({ reflect: true, type: Boolean })
	open?: boolean = false;

	/**
	 * @attribute
	 */
	@property({ reflect: true, type: String })
	icon?: "chevron" | "caret" | "plus" | "none" = "chevron";

	/**
	 * @attribute
	 */
	@property({ reflect: true, type: String, attribute: "icon-size" })
	iconSize?: "x-small" | "small" | "medium" | "large" = "small";

	/**
	 * @attribute placement of icon on left or right
	 */
	@property({ reflect: true, type: String, attribute: "icon-placement" })
	iconPlacement?: "right" | "left" = "right";

	/**
	 * @attribute placement of icon on left or right
	 */
	@property({ reflect: true, type: String, attribute: "max-height" })
	maxHeight?: FAccordionBodyHeightProp;

	/**
	 * @attribute padding applies on header slot container.
	 */
	@property({
		type: String,
		reflect: true,
		attribute: "header-padding"
	})
	headerPadding?: FAccordionPadding = "medium";

	/**
	 * @attribute padding applies on body slot container.
	 */
	@property({
		type: String,
		reflect: true,
		attribute: "body-padding"
	})
	bodyPadding?: FAccordionPadding = "none medium";

	@query(".f-accordion")
	fAccordionBody?: FDiv;

	@query(".f-accordion-header")
	fAccordionHeader?: FDiv;

	/**
	 * identify icon-name from string
	 */
	get iconName() {
		return this.icon === "caret"
			? "i-caret-down"
			: this.icon === "chevron"
			? "i-chevron-down"
			: this.open
			? "i-minus"
			: "i-plus";
	}

	/**
	 * toggle accordion
	 */
	toggleAccordion() {
		this.open = !this.open;
		this.dispatchToggleEvent(this.open);
	}

	/**
	 * changeState
	 */
	stateChange(mouseState: "enter" | "leave") {
		if (this.fAccordionHeader) {
			if (mouseState === "enter") {
				this.fAccordionHeader.style.background = "var(--color-surface-default-hover)";
			} else {
				this.fAccordionHeader.style.background = "transparent";
			}
		}
	}

	/**
	 * toggle event dispatch
	 * @param value boolean
	 */
	dispatchToggleEvent(value: boolean) {
		const event = new CustomEvent<FAccordionCustomEvent>("toggle", {
			detail: {
				value
			},
			bubbles: true,
			composed: true
		});

		this.dispatchEvent(event);
	}

	/**
	 * handling max-height of body
	 */
	handleAccordionBody() {
		if (this.fAccordionBody) {
			if (this.maxHeight) {
				if (this.open) {
					this.fAccordionBody.style.setProperty("max-height", this.maxHeight, "important");
					this.fAccordionBody.style.setProperty("overflow-y", "scroll", "important");
				} else {
					this.fAccordionBody.style.setProperty("max-height", "0px", "important");
				}
			}
		}
	}

	render() {
		// render accordion-icon
		const accordionIcon = html` <f-div
			padding="none none none small"
			height="hug-content"
			width="hug-content"
			overflow="hidden"
		>
			<f-icon-button
				icon=${this.iconName}
				class=${this.icon === "caret" || this.icon === "chevron" ? "f-accordion-icon" : ""}
				?data-accordion-open=${this.open}
				variant="block"
				category="packed"
				.size=${this.iconSize}
				state="inherit"
			></f-icon-button>
		</f-div>`;

		return html`
			<f-div direction="column" width="100%">
				<f-div
					height="hug-content"
					@click=${this.toggleAccordion}
					align="top-left"
					.gap=${this.iconPlacement === "left" ? "medium" : "auto"}
					width="100%"
					class="f-accordion-header"
					part="accordion-header"
					.padding=${this.headerPadding}
					clickable
					@mouseenter=${() => this.stateChange("enter")}
					@mouseleave=${() => this.stateChange("leave")}
				>
					${this.icon !== "none" && this.iconPlacement === "left" ? accordionIcon : ""}
					<f-div>
						<slot></slot>
					</f-div>
					${this.icon !== "none" && this.iconPlacement === "right" ? accordionIcon : ""}
				</f-div>
				<f-div
					class="f-accordion"
					part="accordion-body"
					?data-accordion-open=${this.open}
					direction="column"
					.padding=${this.bodyPadding}
					overflow="hidden"
				>
					<slot name="body"></slot>
				</f-div>
			</f-div>
		`;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
		super.updated(changedProperties);
		this.handleAccordionBody();
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-accordion": FAccordion;
	}
}
