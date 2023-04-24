import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FRoot } from "./../../mixins/components/f-root/f-root";
import eleStyle from "./f-tbody.scss";

@customElement("f-tbody")
export class FTbody extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle)];

	/**
	 * @attribute comments baout title
	 */
	@property({ type: String })
	title!: string;

	render() {
		return html`<slot></slot>`;
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-tbody": FTbody;
	}
}
