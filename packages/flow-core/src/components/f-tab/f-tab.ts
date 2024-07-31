import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import eleStyle from "./f-tab.scss?inline";
import globalStyle from "./f-tab-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { FTabNode } from "../f-tab-node/f-tab-node";
import { FIconButton } from "../f-icon-button/f-icon-button";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
injectCss("f-tab", globalStyle);

export type FTabNodeWidthProp = "fill" | "hug-content" | `${number}`;

@flowElement("f-tab")
export class FTab extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FDiv.styles,
		...FIconButton.styles
	];

	/**
	 * id selecteor for f-tab-section
	 */
	@query("#f-tab-section")
	tabSection!: FDiv;

	/**
	 * local state for showing and vanishing scroll-icons
	 */
	@state()
	showScrollIcons = false;

	/**
	 * localState to check whether on overflow, scroll exists or not
	 */
	@state()
	isOverflowing = false;

	/**
	 * @attribute Variants are various representations of f-tab. f-tab can have filled tabs, or transparent tabs.
	 */
	@property({ type: String, reflect: true })
	variant?: "fill" | "transparent" | "no-border" = "transparent";

	/**
	 * @attribute Vertical tabs can be enabled using direction property. By default tabs are horizontal.
	 */
	@property({ type: String, reflect: true })
	direction: "horizontal" | "vertical" = "horizontal";

	/**
   * @attribute The alignment property aligns a f-tab content with respect to the parent container.
For horizontal f-tab, content can align to left, center, or right.
For vertical f-tab, content can align to top, middle, or bottom.
   */
	@property({ type: String, reflect: true })
	alignment?: "left" | "right" | "center" | "top" | "bottom" | "middle" = "left";

	/**
	 * @attribute width of `f-tab-node`
	 */
	@property({ type: String, reflect: true, attribute: "node-width" })
	nodeWidth?: FTabNodeWidthProp = "hug-content";

	/**
	 * return alignment of the tabs according to the scroll-bar and directions+alignment conditions.
	 */
	get tabsAlignment() {
		if (!this.isOverflowing) {
			if (this.direction === "horizontal") {
				if (this.alignment === "right") {
					return "top-right";
				} else if (this.alignment === "center") {
					return "top-center";
				} else {
					return "top-left";
				}
			} else {
				if (this.alignment === "bottom") {
					return "bottom-left";
				} else if (this.alignment === "middle") {
					return "middle-left";
				} else {
					return "top-left";
				}
			}
		} else {
			return "top-left";
		}
	}

	/**
	 *
	 * @param e MouseEvtn
	 * @param position name of the position
	 * @param positionValue value of the position
	 */
	handleScroll(e: MouseEvent, position: "left" | "top", positionValue: number) {
		e.stopPropagation();
		this.tabSection.scrollBy({
			[position]: positionValue,
			behavior: "smooth"
		});
	}

	/**
	 * @return return true/false according to the scroll present in the tab view or not.
	 */
	checkOverflowing() {
		let isOverflowing;
		if (this.direction === "vertical") {
			isOverflowing = this.tabSection.clientHeight < this.tabSection.scrollHeight;
		} else {
			isOverflowing = this.tabSection.clientWidth < this.tabSection.scrollWidth;
		}
		return isOverflowing;
	}

	render() {
		/**
		 * assign attribute direction to child `f-tab` components to align border-positioning accordingly.
		 */
		for (let i = 0; i < this.children.length; i++) {
			this.children[i].setAttribute("direction", this.direction ?? "horizontal");
			(this.children[i] as FTabNode).width = this.nodeWidth;
		}

		/**
		 * first scroll icon
		 */
		const firstScrollButton =
			this.showScrollIcons && this.isOverflowing
				? html`<f-div
						class=${this.direction === "horizontal"
							? "f-tab-scroll-icons icon-left"
							: "f-tab-scroll-icons icon-top"}
						.width=${this.direction === "horizontal" ? "hug-content" : "100%"}
						.height=${this.direction === "horizontal" ? "100%" : "hug-content"}
						align="middle-center"
				  >
						${this.direction === "horizontal"
							? html` <f-icon-button
									data-qa-chevron-left
									icon="i-chevron-left"
									state="neutral"
									size="x-small"
									@click=${(e: MouseEvent) => this.handleScroll(e, "left", -150)}
							  ></f-icon-button>`
							: html` <f-icon-button
									data-qa-chevron-up
									icon="i-chevron-up"
									state="neutral"
									size="x-small"
									@click=${(e: MouseEvent) => this.handleScroll(e, "top", -150)}
							  ></f-icon-button>`}</f-div
				  >`
				: "";

		const lastScrollButton =
			this.showScrollIcons && this.isOverflowing
				? html`<f-div
						class=${this.direction === "horizontal"
							? "f-tab-scroll-icons icon-right"
							: "f-tab-scroll-icons icon-bottom"}
						.width=${this.direction === "horizontal" ? "hug-content" : "100%"}
						.height=${this.direction === "horizontal" ? "100%" : "hug-content"}
						align="middle-center"
				  >
						${this.direction === "horizontal"
							? html` <f-icon-button
									data-qa-chevron-right
									icon="i-chevron-right"
									state="neutral"
									size="x-small"
									@click=${(e: MouseEvent) => this.handleScroll(e, "left", 150)}
							  ></f-icon-button>`
							: html` <f-icon-button
									data-qa-chevron-down
									icon="i-chevron-down"
									state="neutral"
									size="x-small"
									@click=${(e: MouseEvent) => this.handleScroll(e, "top", 150)}
							  ></f-icon-button>`}
				  </f-div> `
				: "";

		const getBorder = () => {
			if (this.variant === "transparent") {
				if (this.direction === "horizontal") {
					return `small solid default bottom`;
				} else {
					return `small solid default right`;
				}
			}

			return "none";
		};

		/**
		 * Final html to render
		 */
		return html`<f-div
			class="f-tab"
			@mouseenter=${() => (this.showScrollIcons = true)}
			@mouseleave=${() => (this.showScrollIcons = false)}
			overflow="hidden"
			.height=${this.direction === "vertical" ? "100%" : "fill-container"}
		>
			${firstScrollButton}
			<f-div
				data-qa-tab-section
				id="f-tab-section"
				.height=${this.direction === "vertical" ? "100%" : "hug-content"}
				.width=${this.direction === "vertical" ? "hug-content" : "fill-container"}
				.border=${getBorder()}
				.direction=${this.direction === "vertical" ? "column" : "row"}
				.align=${this.tabsAlignment}
				overflow="scroll"
				.gap=${this.variant === "fill" ? "x-small" : "none"}
				tabindex="0"
				role="tablist"
			>
				<slot></slot>
			</f-div>
			${lastScrollButton}
		</f-div>`;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
		super.updated(changedProperties);
		/**
		 * on every update check if scroll is present or not
		 */
		this.isOverflowing = this.checkOverflowing();
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-tab": FTab;
	}
}
