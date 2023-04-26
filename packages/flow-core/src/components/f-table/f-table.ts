import { html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FTcell } from "../f-tcell/f-tcell";
import { FTrow } from "../f-trow/f-trow";
import { FRoot } from "./../../mixins/components/f-root/f-root";
import eleStyle from "./f-table.scss";

export type FTableVariant = "stripped" | "outlined" | "underlined" | "bordered";
export type FTableSize = "medium" | "small";
export type FTableSelectable = "single" | "multiple" | "none";

@customElement("f-table")
export class FTable extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle)];

	/**
	 * @attribute Variants are various representations of a table. For example a table can be stripped,outlined,underlined or bordered..
	 */
	@property({ type: String, reflect: true })
	variant?: FTableVariant = "stripped";

	/**
	 * @attribute size to apply on each cell
	 */
	@property({ type: String, reflect: true })
	size?: FTableSize = "medium";

	/**
	 * @attribute whether to display checkbox or radiobox
	 */
	@property({ type: String, reflect: true })
	selectable?: FTableSelectable = "none";

	/**
	 * @attribute highlight selected row, when selectable has value "single" or "multiple"
	 */
	@property({ type: Boolean, reflect: true, attribute: "highlight-selected" })
	highlightSelected = false;

	/**
	 * @attribute highlight on hover
	 */
	@property({ type: Boolean, reflect: true, attribute: "highlight-hover" })
	highlightHover = false;

	render() {
		return html`<slot name="header"></slot
			><slot @slotchange=${this.propogateProps} @select=${this.handleRowSelection}></slot>`;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		this.propogateProps();
	}

	propogateProps() {
		this.updateGridTemplateColumns();
		this.applySelectable();
	}

	updateGridTemplateColumns() {
		const firstRow = this.querySelector(":scope > f-trow");
		this.style.gridTemplateColumns = `repeat(${firstRow?.children.length},auto)`;
	}

	applySelectable() {
		const allRows = this.querySelectorAll<FTrow>(":scope > f-trow");
		allRows.forEach(row => {
			const firstChild = Array.from(row.children).find(child => {
				return child.tagName === "F-TCELL";
			}) as FTcell;
			if (firstChild) {
				firstChild.selectable = this.selectable;
			}
		});
	}
	handleRowSelection(event: CustomEvent) {
		const allRows = this.querySelectorAll<FTrow>(":scope > f-trow");

		allRows.forEach(row => {
			if (this.selectable === "single") {
				if (row.selected && row !== event.detail.element) {
					row.selected = false;
				}
			}
		});
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-table": FTable;
	}
}
