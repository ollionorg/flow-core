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
		return html`<slot name="header" @select=${this.handleHeaderRowSelection}></slot
			><slot @slotchange=${this.propogateProps} @select=${this.handleRowSelection}></slot>`;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		this.propogateProps();
	}

	async propogateProps() {
		this.updateGridTemplateColumns();
		this.applySelectable();
		await this.updateComplete;
		if (this.selectable === "multiple") {
			this.updateHeaderSelectionCheckboxState();
		}
		if (this.selectable === "single") {
			const selectedRow = this.querySelector<FTrow>(":scope > f-trow[selected]");
			if (selectedRow) {
				this.updateRadioChecks(selectedRow);
			}
		}
	}

	updateGridTemplateColumns() {
		const firstRow = this.querySelector(":scope > f-trow");
		const firstRowCells = firstRow?.querySelectorAll(":scope > f-tcell");
		this.style.gridTemplateColumns = `repeat(${firstRowCells?.length},auto)`;
	}

	/**
	 * apply checkbox or radio based on selection property
	 */
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
	/**
	 * if checkbox from header got clicked
	 * @param event
	 */
	handleHeaderRowSelection(event: CustomEvent) {
		if (this.selectable === "multiple") {
			const allRows = this.querySelectorAll<FTrow>(":scope > f-trow");
			if (event.detail.value === true) {
				allRows.forEach(r => {
					r.selected = true;
				});
			} else {
				allRows.forEach(r => {
					r.selected = false;
				});
			}
		}
	}
	/**
	 * if checkbox or radio clicked in row
	 * @param event
	 */
	async handleRowSelection(event: CustomEvent) {
		this.updateRadioChecks(event.detail.element);
		this.updateHeaderSelectionCheckboxState();
		await this.updateComplete;

		const selectedRows = this.querySelectorAll<FTrow>(
			":scope > f-trow[selected]:not([slot='header'])"
		);
		const toggle = new CustomEvent("selected-rows", {
			detail: Array.from(selectedRows),
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(toggle);
	}
	/**
	 * only one radio should be selected
	 * @param element
	 */
	updateRadioChecks(element: HTMLElement) {
		if (this.selectable === "single") {
			const allRows = this.querySelectorAll<FTrow>(":scope > f-trow");

			allRows.forEach(row => {
				if (row.selected && row !== element) {
					row.selected = false;
				}
			});
		}
	}
	/**
	 * update header checkbox based on rest of the selection
	 */
	async updateHeaderSelectionCheckboxState() {
		if (this.selectable === "multiple") {
			const allRows = this.querySelectorAll<FTrow>(":scope > f-trow");
			const rowsWithoutHeader = Array.from(allRows).filter(
				r => r.getAttribute("slot") !== "header"
			);
			const selectedRows = rowsWithoutHeader.filter(r => r.selected);
			const headerRow = this.querySelector<FTrow>(":scope > f-trow[slot='header']");
			if (headerRow) {
				const firstCell = headerRow.querySelector<FTcell>(":scope > f-tcell");
				if (firstCell && firstCell.checkbox) {
					if (selectedRows.length === 0) {
						headerRow.selected = false;
						firstCell.checkbox.value = "unchecked";
					} else if (selectedRows.length === rowsWithoutHeader.length) {
						headerRow.selected = true;
					} else {
						headerRow.selected = false;
						await headerRow.updateComplete;
						firstCell.checkbox.value = "indeterminate";
					}
				}
			}
		}
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
