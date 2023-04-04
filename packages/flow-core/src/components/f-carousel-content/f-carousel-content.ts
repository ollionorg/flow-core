import { html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import eleStyle from "./f-carousel-content.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";

@customElement("f-carousel-content")
export class FCarouselContent extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles];

	/**
	 * @attribute content-id for f-carousel
	 */
	@property({ type: Number, reflect: true, attribute: "content-id" })
	contentId?: number;

	@query(".f-carousel-content")
	carouselContentWrapper?: FDiv;

	render() {
		/**
		 * Final html to render
		 */
		return html`<f-div width="100%"><slot></slot></f-div>`;
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
