import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import { FTcell } from "../f-tcell/f-tcell";
import { FTrow } from "../f-trow/f-trow";
import { FRoot, flowElement } from "@nonfx/flow-core";
import globalStyle from "./f-table-global.scss?inline";
import { injectCss } from "@nonfx/flow-core-config";

injectCss("f-table", globalStyle);

export type FTableVariant = "stripped" | "outlined" | "underlined" | "bordered";
export type FTableSize = "medium" | "small";
export type FTableSelectable = "single" | "multiple" | "none";

@flowElement("f-table")
export class FTable extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle)];

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

	// fix for vue
	set ["highlight-selected"](val: boolean) {
		this.highlightSelected = val;
	}

	/**
	 * @attribute highlight on hover
	 */
	@property({ type: Boolean, reflect: true, attribute: "highlight-hover" })
	highlightHover = false;

	// fix for vue
	set ["highlight-hover"](val: boolean) {
		this.highlightHover = val;
	}

	/**
	 * @attribute highlight on column hover
	 */
	@property({ type: Boolean, reflect: true, attribute: "highlight-column-hover" })
	highlightColumnHover = true;

	// fix for vue
	set ["highlight-column-hover"](val: boolean) {
		this.highlightColumnHover = val;
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "table";
	}
	render() {
		return html`<slot
				name="header"
				@selected-column=${this.toggleColumnSelected}
				@highlight-column=${this.toggleColumnHighlight}
				@selected-row=${this.handleHeaderRowSelection}
				@slotchange=${this.updateGridTemplateColumns}
			></slot>
			<slot @slotchange=${this.propogateProps} @selected-row=${this.handleRowSelection}></slot>`;
	}
	protected async updated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
		super.updated(changedProperties);

		await this.propogateProps();
	}

	async propogateProps() {
		this.updateGridTemplateColumns();
		this.applySelectable();
		await this.updateComplete;
		if (this.selectable === "multiple") {
			await this.updateHeaderSelectionCheckboxState();
		}
		if (this.selectable === "single") {
			const headerRow = Array.from(this.children).filter(
				el =>
					el.tagName.toLocaleLowerCase() === "f-trow" &&
					el.getAttribute("slot") === "header" &&
					el.hasAttribute("selected")
			)[0] as FTrow;
			if (headerRow) {
				headerRow.selected = false;
			}

			const selectedRow = Array.from(this.children).filter(
				el =>
					el.tagName.toLocaleLowerCase() === "f-trow" &&
					el.getAttribute("slot") !== "header" &&
					el.hasAttribute("selected")
			)[0] as FTrow;
			if (selectedRow) {
				this.updateRadioChecks(selectedRow);
			}
		}
	}

	updateGridTemplateColumns() {
		const firstRow = Array.from(this.children).filter(
			el => el.tagName.toLocaleLowerCase() === "f-trow"
		)[0] as FTrow;
		if (firstRow !== null) {
			/**
			 * following query is not working vue app so replaced with firstRow.children
			 * firstRow?.querySelectorAll<FTcell>(":scope > f-tcell");
			 * */
			const firstRowCells = firstRow.children;
			const noOfCells = firstRowCells.length;
			let gridColumnTemplate = ``;
			for (let i = 0; i < noOfCells; i++) {
				const cellElement = firstRowCells.item(i) as FTcell;
				if (cellElement.width) {
					gridColumnTemplate += `${cellElement?.width} `;
				} else {
					gridColumnTemplate += `auto `;
				}
			}

			this.style.gridTemplateColumns = gridColumnTemplate;
		}
	}

	/**
	 * apply checkbox or radio based on selection property
	 */
	applySelectable() {
		const allRows = Array.from(this.children).filter(
			el => el.tagName.toLocaleLowerCase() === "f-trow"
		) as FTrow[];
		allRows.forEach(row => {
			const firstChild = Array.from(row.children).find(child => {
				return child.tagName === "F-TCELL";
			}) as FTcell;
			if (firstChild) {
				firstChild.selectable = this.selectable;
				setTimeout(() => firstChild.setSelection(row.selected, Boolean(row.disableSelection)));
			}
		});
	}
	/**
	 * if checkbox from header got clicked
	 * @param event
	 */
	async handleHeaderRowSelection(event: CustomEvent) {
		event.stopPropagation();
		if (this.selectable === "multiple") {
			const allRows = Array.from(this.children).filter(
				el => el.tagName.toLocaleLowerCase() === "f-trow"
			) as FTrow[];
			if (event.detail.value === true) {
				allRows.forEach(r => {
					if (!r.disableSelection) {
						r.selected = true;
					}
				});
			} else {
				allRows.forEach(r => {
					if (!r.disableSelection) {
						r.selected = false;
					}
				});
			}
			await this.updateComplete;

			this.dispatchSelectedRowEvent();
		}
	}
	/**
	 * if checkbox or radio clicked in row
	 * @param event
	 */
	async handleRowSelection(event: CustomEvent<{ element: HTMLElement }>) {
		event.stopPropagation();
		this.updateRadioChecks(event.detail.element);
		await this.updateHeaderSelectionCheckboxState();
		await this.updateComplete;

		this.dispatchSelectedRowEvent();
	}

	dispatchSelectedRowEvent() {
		const selectedRows = Array.from(this.children).filter(
			el =>
				el.tagName.toLocaleLowerCase() === "f-trow" &&
				el.getAttribute("slot") !== "header" &&
				el.hasAttribute("selected")
		) as FTrow[];
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
			const allRows = Array.from(this.children).filter(
				el => el.tagName.toLocaleLowerCase() === "f-trow" && el.getAttribute("slot") !== "header"
			) as FTrow[];

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
			const allRows = Array.from(this.children).filter(
				el => el.tagName.toLocaleLowerCase() === "f-trow"
			) as FTrow[];
			const rowsWithoutHeader = Array.from(allRows).filter(
				r => r.getAttribute("slot") !== "header"
			);
			const selectedRows = rowsWithoutHeader.filter(r => r.selected);
			const headerRow = Array.from(this.children).filter(
				el => el.tagName.toLocaleLowerCase() === "f-trow" && el.getAttribute("slot") === "header"
			)[0] as FTrow;
			if (headerRow) {
				await headerRow.updateComplete;
				const firstCell = Array.from(headerRow.children).filter(
					el => el.tagName.toLocaleLowerCase() === "f-tcell"
				)[0] as FTcell;
				if (firstCell?.checkbox) {
					if (selectedRows.length === 0) {
						headerRow.selected = false;
						firstCell.checkbox.value = "unchecked";
					} else if (selectedRows.length === rowsWithoutHeader.length) {
						headerRow.selected = true;
					} else {
						firstCell.checkbox.value = "indeterminate";
					}
				}
			}
		}
	}

	toggleColumnHighlight(event: CustomEvent) {
		if (event.detail.columnIndex >= 0 && this.highlightColumnHover) {
			const allRows = Array.from(this.children).filter(
				el => el.tagName.toLocaleLowerCase() === "f-trow"
			) as FTrow[];
			allRows.forEach(row => {
				const allCells = Array.from(row.children).filter(
					el => el.tagName.toLocaleLowerCase() === "f-tcell"
				) as FTcell[];
				if (event.detail.type === "add") {
					allCells[event.detail.columnIndex]?.classList.add("highlight");
				} else {
					allCells[event.detail.columnIndex]?.classList.remove("highlight");
				}
			});
		}
	}

	toggleColumnSelected(event: CustomEvent) {
		if (event.detail.columnIndex >= 0) {
			const allRows = Array.from(this.children).filter(
				el => el.tagName.toLocaleLowerCase() === "f-trow"
			) as FTrow[];
			allRows.forEach(row => {
				const allCells = Array.from(row.children).filter(
					el => el.tagName.toLocaleLowerCase() === "f-tcell"
				) as FTcell[];
				if (allCells[event.detail.columnIndex]) {
					allCells[event.detail.columnIndex].selected =
						!allCells[event.detail.columnIndex].selected;
				}
				allCells.forEach(cell => {
					if (cell !== allCells[event.detail.columnIndex]) {
						cell.selected = false;
					}
				});
			});
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
