import { html, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
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
	@state()
	active?: boolean = false;

	/**
	 * @attribute content-id for f-carousel
	 */
	@property({ type: Number, reflect: true, attribute: "content-id" })
	contentId?: number;

	@query(".f-carousel-content")
	carouselContentWrapper?: FDiv;

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
		return this.active
			? html`<f-div class=${classMap(classes)} width="100%"><slot></slot></f-div>`
			: "";
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
