import { html, nothing, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { FCheckbox } from "../f-checkbox/f-checkbox";
import { FDiv } from "../f-div/f-div";
import { FRadio } from "../f-radio/f-radio";
import { FTableSelectable } from "../f-table/f-table";
import { FRoot } from "./../../mixins/components/f-root/f-root";
import eleStyle from "./f-tcell.scss";

@customElement("f-tcell")
export class FTcell extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles, ...FCheckbox.styles, ...FRadio.styles];

	/**
	 * @attribute comments baout title
	 */
	@property({ type: String })
	title!: string;

	@state()
	selectable?: FTableSelectable = "none";

	@query("f-checkbox")
	checkbox?: FCheckbox;

	@query("f-radio")
	radio?: FRadio;

	render() {
		return html`<f-div aling="middle-left" gap="medium"
			>${this.selectable === "multiple"
				? html`<f-checkbox @input=${this.handleSelection}></f-checkbox>`
				: nothing}
			${this.selectable === "single" ? html`<f-radio></f-radio>` : nothing} <slot></slot
		></f-div>`;
	}

	setSelection(value = false) {
		if (value) {
			if (this.checkbox) {
				this.checkbox.value = "checked";
			}
			if (this.radio) {
				this.radio.value = "selected";
			}
		} else {
			if (this.checkbox) {
				this.checkbox.value = "unchecked";
			}
			if (this.radio) {
				this.radio.value = "unselected";
			}
		}
	}

	handleSelection(event: CustomEvent) {
		const toggle = new CustomEvent("toggle-row", {
			detail: event.detail.value === "checked" || event.detail.value === "selected",
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(toggle);
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
