import { html, nothing, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { FDiv } from "../f-div/f-div";
import { FTableSelectable } from "../f-table/f-table";
import { FRoot } from "./../../mixins/components/f-root/f-root";
import eleStyle from "./f-tcell.scss";

@customElement("f-tcell")
export class FTcell extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles];

	/**
	 * @attribute comments baout title
	 */
	@property({ type: String })
	title!: string;

	@state()
	selectable?: FTableSelectable = "none";
	render() {
		return html`<f-div aling="middle-left" gap="medium"
			>${this.selectable === "multiple" ? html`<f-checkbox></f-checkbox>` : nothing}
			${this.selectable === "single" ? html`<f-radio></f-radio>` : nothing} <slot></slot
		></f-div>`;
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-tcell": FTcell;
	}
}
