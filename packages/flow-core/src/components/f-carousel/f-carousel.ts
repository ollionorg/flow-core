import { html, PropertyValueMap, render, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { FRoot } from "./../../mixins/components/f-root/f-root";
import eleStyle from "./f-carousel.scss";
import { FDiv } from "../f-div/f-div";
import { FCarouselContent } from "../f-carousel-content/f-carousel-content";

@customElement("f-carousel")
export class FCarousel extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		...FDiv.styles
		// unsafeCSS(splidecss), unsafeCSS(splidetheme)
	];

	/**
	 * @attribute  provide `f-corousel-content` content-id
	 */
	@property({ type: String, attribute: "active-content-id" })
	activeContentId?: string;

	@query(".slides")
	slides!: HTMLElement;

	@query("#dots")
	dots!: HTMLElement;

	activeSlide?: HTMLElement | null;

	slideElements?: NodeListOf<FCarouselContent>;

	handleNavigation(type = "next") {
		if (this.activeSlide) {
			let nextActive = this.activeSlide.nextElementSibling;
			if (type === "prev") {
				nextActive = this.activeSlide.previousElementSibling;
			}
			if (nextActive) {
				nextActive.scrollIntoView({ block: "end", inline: "nearest", behavior: "smooth" });
				this.activeSlide = nextActive as HTMLElement;
			}

			this.renderDots();
		}
	}

	render() {
		return html` <f-div width="100%" direction="column" gap="medium">
			<f-div height="hug-content">
				<f-div class="arrow" width="hug-content" padding="large" height="100%" align="middle-center"
					><f-icon
						source="i-chevron-left"
						clickable
						@click=${() => this.handleNavigation("prev")}
					></f-icon
				></f-div>
				<f-div overflow="scroll" class="slides"><slot></slot></f-div>
				<f-div
					class="arrow"
					width="hug-content"
					padding="large"
					height="100%"
					align="middle-center"
				>
					<f-icon
						source="i-chevron-right"
						clickable
						@click=${() => this.handleNavigation("next")}
					></f-icon>
				</f-div>
			</f-div>
			<f-div align="middle-center" id="dots" gap="x-small"> </f-div>
		</f-div>`;
	}

	protected async updated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
		super.updated(changedProperties);
		await this.updateComplete;

		this.slideElements = this.querySelectorAll<FCarouselContent>(`f-carousel-content`);

		this.activeSlide = this.querySelector<HTMLElement>(`[content-id='${this.activeContentId}']`);

		this.renderDots();

		if (this.activeSlide) {
			setTimeout(() => {
				this.activeSlide?.scrollIntoView({ block: "end", inline: "nearest" });
			});
		}
	}

	renderDots() {
		if (this.slideElements) {
			render(
				html`${Array.from(this.slideElements).map(el => {
					let state = "inherit";

					if (el === this.activeSlide) {
						state = "primary";
					}
					return html`<f-icon source="i-circle" .state=${state} size="x-small"></f-icon>`;
				})}`,
				this.dots
			);
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
