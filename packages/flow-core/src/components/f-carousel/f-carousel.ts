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

	allCarouselContents!: NodeListOf<FCarouselContent>;
	currentActiveId = 0;
	intervalTimeout!: number;

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
		this.allCarouselContents[this.currentActiveId].active = false;
		if (clickType === "right") {
			if (this.currentActiveId < this.allCarouselContents.length - 1) {
				this.currentActiveId++;
			} else {
				this.currentActiveId = 0;
			}
		} else {
			if (this.currentActiveId > 0) {
				this.currentActiveId--;
			} else {
				this.currentActiveId = this.allCarouselContents.length - 1;
			}
		}
		this.allCarouselContents[this.currentActiveId].active = true;
		this.allCarouselContents[this.currentActiveId].setAttribute(
			"class",
			`content-slide-${clickType === "right" ? "left" : "right"}`
		);
		clearInterval(this.intervalTimeout);
		this.requestUpdate();
	}

	/**
	 * check if default active content is present
	 */
	checkIfActive() {
		this.allCarouselContents.forEach((item, index) => {
			if (item.active) {
				this.currentActiveId = index;
			}
		});
	}

	/**
	 * add active state if default active state not present
	 */
	addActiveContent() {
		this.allCarouselContents.forEach((item, index) => {
			item["content-id"] = index;
			if (this.currentActiveId === 0 && index === 0) {
				item.active = true;
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
		this.checkIfActive();
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
