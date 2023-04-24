import { html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FTcell } from "../f-tcell/f-tcell";
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
	 * @attribute size to apply on each cell
	 */
	@property({ type: String, reflect: true })
	selectable?: FTableSelectable = "none";

	render() {
		return html`<slot @slotchange=${this.propogateProps}></slot>`;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		this.propogateProps();
	}
	propogateProps() {
		this.applySelectable();
	}

	applySelectable() {
		const allRows = this.querySelectorAll<FTcell>("f-thead > f-trow, f-tbody > f-trow");
		allRows.forEach(row => {
			const firstChild = row.children.item(0) as FTcell;
			firstChild.selectable = this.selectable;
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
