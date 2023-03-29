import { html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import eleStyle from "./f-carousel.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { FCarouselContent } from "../f-carousel-content/f-carousel-content";

@customElement("f-carousel")
export class FCarousel extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles];

	/**
	 * @attribute content-id for f-carousel
	 */
	@property({ type: Number, reflect: true, attribute: "active-content-id" })
	activeContentId?: number = 0;

	/**
	 * @attribute f-carousel can have 2 sizes.
	 */
	@property({ type: String, reflect: true })
	size?: "small" | "medium" = "medium";

	/**
	 * @attribute f-carousel interval for autoplay.
	 */
	@property({ type: Number, reflect: true })
	interval?: number = 5000;

	/**
	 * @attribute f-carousel autoplay
	 */
	@property({ type: Boolean, reflect: true })
	autoplay?: boolean = false;

	/**
	 * @attribute query-selector for carousel wrapper.
	 */
	@query(".f-carousel")
	carouselWrapper!: FDiv;

	allCarouselContents?: NodeListOf<FCarouselContent>;
	intervalTimeout?: number;

	/**
	 * icon size
	 */
	get iconSize() {
		if (this.size === "medium") {
			return "small";
		} else {
			return "x-small";
		}
	}

	/**
	 * clear the interval on unmount
	 */
	disconnectedCallback() {
		clearInterval(this.intervalTimeout);
		super.disconnectedCallback();
	}

	/**
	 * handling click affect for caraousel
	 * @param clickType string value for left and right click
	 */
	handleArrowClicks(clickType: "left" | "right") {
		if (this.allCarouselContents) {
			let currentActiveId = this.activeContentId ?? 0;
			if (clickType === "right") {
				if (currentActiveId < this.allCarouselContents.length - 1) {
					currentActiveId++;
				} else {
					currentActiveId = 0;
				}
			} else {
				if (currentActiveId > 0) {
					currentActiveId--;
				} else {
					currentActiveId = this.allCarouselContents.length - 1;
				}
			}
			this.activeContentId = currentActiveId;
			this.allCarouselContents[currentActiveId].setAttribute(
				"class",
				`content-slide-${clickType === "right" ? "left" : "right"}`
			);

			clearInterval(this.intervalTimeout);
		}
	}

	/**
	 * add active state if default active state not present
	 */
	addActiveContent() {
		this.allCarouselContents?.forEach(item => {
			if (item.contentId === this.activeContentId) {
				item.active = true;
			} else {
				item.active = false;
			}
		});
	}

	/**
	 * autoplay carousel
	 */
	autoplayMode() {
		if (this.autoplay) {
			this.intervalTimeout = window.setInterval(() => {
				this.handleArrowClicks("right");
			}, this.interval);
		}
	}

	render() {
		/**
		 * Final html to render
		 */
		return html`<f-div
			class="f-carousel"
			align="middle-center"
			width="100%"
			.gap=${this.size === "small" ? "medium" : "small"}
		>
			<f-div width="hug-content" align="middle-center">
				<f-icon-button
					icon="i-chevron-left"
					type="packed"
					variant="block"
					state="inherit"
					.size=${this.iconSize}
					@click=${() => this.handleArrowClicks("left")}
				></f-icon-button>
			</f-div>
			<f-div align="middle-center">
				<slot></slot>
			</f-div>
			<f-div width="hug-content" align="middle-center">
				<f-icon-button
					icon="i-chevron-right"
					type="packed"
					variant="block"
					state="inherit"
					.size=${this.iconSize}
					@click=${() => this.handleArrowClicks("right")}
				></f-icon-button> </f-div
		></f-div>`;
	}
	updated() {
		this.allCarouselContents = this.querySelectorAll<FCarouselContent>("f-carousel-content");
		this.addActiveContent();
		this.autoplayMode();
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-carousel": FCarousel;
	}
}
