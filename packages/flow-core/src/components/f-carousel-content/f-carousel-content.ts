import { html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import eleStyle from "./f-carousel-content.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { classMap } from "lit-html/directives/class-map.js";

@customElement("f-carousel-content")
export class FCarouselContent extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles];

	/**
	 * @attribute active selected f-carousel-content
	 */
	@property({ type: Boolean, reflect: true })
	active?: boolean = false;

	/**
	 * @attribute content-id for f-carousel
	 */
	@property({ type: Number, reflect: true })
	["content-id"]?: number;

	@query(".f-carousel-content")
	carouselContentWrapper!: FDiv;

	render() {
		const classes: Record<string, boolean> = {
			"f-carousel-content": true
		};
		// merging host classes
		this.classList.forEach(cl => {
			classes[cl] = true;
		});

		/**
		 * Final html to render
		 */
		return html`<f-div class=${classMap(classes)} width="100%"><slot></slot></f-div>`;
	}
	updated() {
		// condition for making a particualr content active
		if (!this.active) {
			this.carouselContentWrapper.style.display = "none";
		} else {
			this.carouselContentWrapper?.style?.removeProperty("display");
		}
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-carousel-content": FCarouselContent;
	}
}
