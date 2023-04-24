import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FCheckbox } from "../f-checkbox/f-checkbox";
import { FTcell } from "../f-tcell/f-tcell";
import { FRoot } from "./../../mixins/components/f-root/f-root";
import eleStyle from "./f-trow.scss";

@customElement("f-trow")
export class FTrow extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FCheckbox.styles, ...FTcell.styles];

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
		"f-trow": FTrow;
	}
}
