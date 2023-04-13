import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-accordion.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";

@customElement("f-accordion")
export class FAccordion extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles];

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
	 * identify icon-name from string
	 */
	get iconName() {
		return this.icon === "caret"
			? "i-caret-down"
			: this.icon === "chevron"
			? "i-chevron-down"
			: this.open
			? "i-minus-fill"
			: "i-plus-fill";
	}

	/**
	 * toggle accordion
	 */
	toggleAccordion() {
		this.open = !this.open;
	}

	/**
	 * handling overflow of body on max-height
	 */
	handleBodyOverflow() {
		const bodySlot = this.querySelector<FDiv>("f-div[slot='body']");
		if (bodySlot) {
			if (!this.open) {
				bodySlot.overflow = "hidden";
			} else {
				bodySlot.overflow = "scroll";
			}
		}
	}

	render() {
		// render accordion-icon
		const accordionIcon = html` <f-div height="hug-content" width="hug-content" overflow="hidden">
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
					align="middle-left"
					.gap=${this.iconPlacement === "left" ? "medium" : "auto"}
					width="100%"
					class="f-accordion-header"
					padding="small"
					state="default"
					clickable
				>
					${this.icon !== "none" && this.iconPlacement === "left" ? accordionIcon : ""}
					<slot></slot>
					${this.icon !== "none" && this.iconPlacement === "right" ? accordionIcon : ""}
				</f-div>
				<f-div
					class="f-accordion"
					?data-accordion-open=${this.open}
					direction="column"
					padding="none small"
					overflow="hidden"
				>
					<slot name="body"></slot>
				</f-div>
			</f-div>
		`;
	}
	updated() {
		this.handleBodyOverflow();
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
