import { html, PropertyValueMap, render, unsafeCSS, svg, nothing } from "lit";
import { property, query } from "lit/decorators.js";
import { FRoot } from "./../../mixins/components/f-root/f-root";
import eleStyle from "./f-carousel.scss?inline";
import globalStyle from "./f-carousel-global.scss?inline";
import { FDiv } from "../f-div/f-div";
import { FCarouselContent } from "../f-carousel-content/f-carousel-content";
import { FIcon } from "../f-icon/f-icon";
import { flowElement } from "./../../utils";

import { injectCss } from "@nonfx/flow-core-config";

injectCss("f-carousel", globalStyle);

@flowElement("f-carousel")
export class FCarousel extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle), ...FDiv.styles];

	/**
	 * @attribute  provide `f-corousel-content` content-id for activation
	 */
	@property({ type: String, attribute: "active-content-id" })
	activeContentId?: string;

	/**
	 * @attribute  it will auto-play all content in loop
	 */
	@property({ type: Boolean, attribute: "auto-play" })
	autoPlay?: boolean;
	/**
	 * @attribute  it will auto-play all content in loop
	 */
	@property({ type: Number, attribute: "auto-play-interval" })
	autoPlayInterval?: number;

	@query(".slides")
	slides!: HTMLElement;

	@query(".slider")
	slider!: HTMLElement;

	@query("#dots")
	dots!: HTMLElement;

	@query(".next")
	nextArrow!: FIcon;

	@query(".progress")
	progress?: FDiv;

	@query(".prev")
	prevArrow!: FIcon;

	activeSlide?: HTMLElement | null;

	slideElements?: NodeListOf<FCarouselContent>;

	handleNavigation(type: "next" | "prev" = "next") {
		if (this.activeSlide) {
			let nextActive = this.activeSlide.nextElementSibling;
			if (type === "prev") {
				nextActive = this.activeSlide.previousElementSibling;
			}

			if (nextActive) {
				if ((nextActive as HTMLElement).id === "firstNode") {
					this.slideTransition((this.slideElements?.length as number) + 1);
				} else if ((nextActive as HTMLElement).id === "lastNode") {
					this.slideTransition(0);
				} else if (nextActive) {
					this.slideTransition(this.getSlideIndex(nextActive as HTMLElement) + 1);
				}

				this.activeSlide = nextActive as HTMLElement;

				this.updateDots();

				this.emitNavigationEvent(type, (this.activeSlide as FCarouselContent).contentId);

				this.checkAutoPlay();
			}
		}
	}

	handleTransitionEnd() {
		if (this.activeSlide?.id === "firstNode") {
			this.slideTransition(1, 0);
			this.activeSlide = this.slideElements?.item(0) as HTMLElement;
		}
		if (this.activeSlide?.id === "lastNode") {
			this.slideTransition(this.slideElements?.length as number, 0);
			this.activeSlide = this.slideElements?.item(this.slideElements.length - 1) as HTMLElement;
		}

		this.updateDots();
	}

	render() {
		const progressBar = () => {
			return nothing;
			// return this.autoPlay
			// 	? html`
			// 			<f-div class="progress-bar" state="secondary">
			// 				<f-div
			// 					class="progress"
			// 					@transitionend=${this.handleProgressEnd}
			// 					width="2px"
			// 					height="2px"
			// 				>
			// 				</f-div>
			// 			</f-div>
			// 	  `
			// 	: nothing;
		};
		return html` <f-div width="100%" direction="column" gap="medium">
			<f-div height="hug-content">
				<f-div class="arrow" width="hug-content" padding="large" height="100%" align="middle-center"
					><f-icon
						class="prev"
						tabindex="0"
						source="i-chevron-left"
						clickable
						@keyup=${(e: KeyboardEvent) => {
							if (e.key === "Enter") this.handleNavigation("prev");
						}}
						@click=${() => this.handleNavigation("prev")}
					></f-icon
				></f-div>
				<f-div class="slider" overflow="scroll">
					<f-div class="slides" @transitionend=${this.handleTransitionEnd}>
						<slot></slot>
					</f-div>
				</f-div>
				<f-div
					class="arrow"
					width="hug-content"
					padding="large"
					height="100%"
					align="middle-center"
				>
					<f-icon
						source="i-chevron-right"
						class="next"
						tabindex="0"
						clickable
						@keyup=${(e: KeyboardEvent) => {
							if (e.key === "Enter") this.handleNavigation("next");
						}}
						@click=${() => this.handleNavigation("next")}
					></f-icon>
				</f-div>
			</f-div>
			${progressBar()}
			<f-div class="dot-wrapper" width="hug-content" align="middle-center">
				<f-div overflow="visible" id="dots" align="middle-left"> </f-div>
			</f-div>
		</f-div>`;
	}

	protected async updated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
		super.updated(changedProperties);

		this.addEventListener("keyup", (e: KeyboardEvent) => {
			if (e.key === "ArrowRight") this.handleNavigation("next");
			if (e.key === "ArrowLeft") this.handleNavigation("prev");
		});
		await this.updateComplete;
		/**
		 * remove clonned elements if any
		 */
		this.removeClonnedSlides();

		/**
		 * get all slide elements
		 */
		this.slideElements = this.querySelectorAll<FCarouselContent>(`f-carousel-content`);
		/**
		 * set active slide if any
		 */
		if (this.activeContentId) {
			this.activeSlide = this.querySelector<HTMLElement>(`[content-id='${this.activeContentId}']`);
		} else {
			this.activeSlide = this.slideElements.item(0);
		}

		/**
		 clone last slide for looping
		 */
		const lastNode = this.slideElements
			?.item(this.slideElements.length - 1)
			.cloneNode(true) as HTMLElement;
		lastNode.id = "lastNode";
		this.prepend(lastNode);

		/**
		 clone first slide for looping
		 */
		const firstNode = this.slideElements?.item(0).cloneNode(true) as HTMLElement;
		firstNode.id = "firstNode";
		this.append(firstNode);

		this.slideElements.forEach(n => {
			n.style.width = this.slider.offsetWidth + "px";
		});
		lastNode.style.width = this.slider.offsetWidth + "px";
		firstNode.style.width = this.slider.offsetWidth + "px";
		this.renderDots();

		if (this.activeSlide) {
			this.slideTransition(this.getSlideIndex(this.activeSlide) + 1, 0);

			this.emitNavigationEvent("next", (this.activeSlide as FCarouselContent).contentId);
		}

		this.checkAutoPlay();
	}

	removeClonnedSlides() {
		const clonnedNodes = this.querySelectorAll<FCarouselContent>(`#firstNode,#lastNode`);
		clonnedNodes.forEach(el => {
			el.remove();
		});
	}

	checkAutoPlay() {
		if (this.autoPlay) {
			setTimeout(() => {
				this.nextArrow.click();
			}, this.autoPlayInterval ?? 5000);
		}
		// if (this.autoPlay) {
		// 	if (this.progress) {
		// 		this.progress.style.transitionDuration = `${
		// 			this.autoPlayInterval ? this.autoPlayInterval / 1000 : 5
		// 		}s`;
		// 		this.progress.width = "100%";
		// 	}
		// }
	}

	handleProgressEnd() {
		if (this.progress) {
			this.progress.style.transitionDuration = `0s`;
			this.progress.width = "2px";
		}
		this.nextArrow.click();
		setTimeout(() => {
			this.checkAutoPlay();
		});
	}

	emitNavigationEvent(type: "next" | "prev", contentId: string) {
		const event = new CustomEvent(type, {
			detail: {
				contentId: contentId
			},
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(event);
	}

	jumpTo(contentId: string) {
		this.activeSlide = this.querySelector<HTMLElement>(`[content-id='${contentId}']`);
		if (this.activeSlide) {
			this.slideTransition(this.getSlideIndex(this.activeSlide) + 1);
		}
	}

	getSlideIndex(slide: HTMLElement) {
		if (this.slideElements) {
			return Array.from(this.slideElements).findIndex(el => el === slide);
		}
		return -1;
	}
	slideTransition(slideIndex: number, duration = 0.3) {
		this.slides.style.transition = `transform ${duration}s ease-in-out`;
		this.slides.style.transform = "translateX(" + -this.slider.offsetWidth * slideIndex + "px)";
	}

	renderDots() {
		if (this.slideElements) {
			const activeIndex = Array.from(this.slideElements).findIndex(el => el === this.activeSlide);
			render(
				html`${Array.from(this.slideElements).map((el, index) => {
					let dotClass = "dot tertiary";

					if (activeIndex === index) {
						dotClass = "dot active";
					} else if (Math.abs(activeIndex - index) === 1) {
						dotClass = "dot secondary";
					}
					return html`<f-div
						align="middle-center"
						overflow="visible"
						class="dot-container"
						padding="x-small"
						@click=${() => {
							this.updateDots(index);
							this.jumpTo(el.getAttribute("content-id") as string);
						}}
					>
						${svg`<svg content-id=${el.getAttribute(
							"content-id"
						)} class=${dotClass} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					<circle cx="50" cy="50" r="50"  />
				  </svg>`}</f-div
					>`;
				})}`,
				this.dots
			);
		}
	}

	updateDots(activeIndex: number | null = null) {
		if (this.slideElements) {
			if (!activeIndex) {
				activeIndex = Array.from(this.slideElements).findIndex(el => el === this.activeSlide);
			}

			Array.from(this.slideElements).forEach((el, index) => {
				let dotClass = "tertiary";

				if (activeIndex === index) {
					dotClass = "active";
				} else if (activeIndex && Math.abs(activeIndex - index) === 1) {
					dotClass = "secondary";
				}

				const svgElement = this.shadowRoot?.querySelector<HTMLElement>(
					`[content-id='${el.getAttribute("content-id")}']`
				);

				if (svgElement) {
					svgElement.classList.remove("tertiary");
					svgElement.classList.remove("active");
					svgElement.classList.remove("secondary");

					svgElement.classList.add(dotClass);
				}
			});
		}
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-carousel": FCarousel;
	}
}
