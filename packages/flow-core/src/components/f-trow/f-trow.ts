import { html, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { FDiv } from "../f-div/f-div";
import { FIcon } from "../f-icon/f-icon";
import { FTcell } from "../f-tcell/f-tcell";
import { FRoot } from "./../../mixins/components/f-root/f-root";
import eleStyle from "./f-trow.scss";

@customElement("f-trow")
export class FTrow extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles, ...FIcon.styles];

	/**
	 * @attribute open row details
	 */
	@property({ type: Boolean })
	open?: boolean;

	@query(".expandable")
	expndablePanel?: FTcell;
	@query(".details-toggle")
	toggleElement?: FDiv;
	@query("slot[name='details']")
	detailsSlotElement?: FDiv;

	render() {
		return html`<slot></slot>
			<f-div class="details-toggle" width="36px" @click=${this.toggleDetails} align="middle-center">
				<f-icon clickable .source=${this.open ? "i-chevron-up" : "i-chevron-down"}></f-icon>
			</f-div>
			${this.open
				? html`<f-div direction="column" border="small solid default bottom" class="expandable">
						<slot name="details"></slot>
				  </f-div>`
				: nothing}`;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		const allCells = this.querySelectorAll("f-tcell");
		if (this.expndablePanel) {
			this.expndablePanel.style.gridColumnEnd = `${allCells.length + 2}`;
		}
		if (this.toggleElement) {
			this.toggleElement.style.gridColumnEnd = `${allCells.length + 1}`;
		}
	}

	toggleDetails() {
		this.open = !this.open;
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
