import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import globalStyle from "./f-grid-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
injectCss("f-grid", globalStyle);

export type FGridBodyHeightProp = `${number}px` | `${number}%` | `${number}vh`;

@flowElement("f-grid")
export class FGrid extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle), ...FDiv.styles];

	/**
	 * @attribute Defines the minimum value of width of each cell. A cell can not be smaller than this in any viewport.
	 */
	@property({ reflect: true, type: Number, attribute: "min-cell-width" })
	minCellWidth?: number;

	/**
	 * @attribute Defines the maximum width of each cell.
	 */
	@property({ reflect: true, type: Number, attribute: "max-cell-width" })
	maxCellWidth?: number;

	/**
	 * @attribute Defines the height of each cell
	 */
	@property({ reflect: true, type: Number, attribute: "cell-height" })
	cellHeight?: number;

	/**
	 * @attribute Gap defines the space between the items of a f-grid
	 */
	@property({ type: String, reflect: true })
	gap?: "x-large" | "large" | "medium" | "small" | "x-small" = "small";

	/**
	 * grid-template-columns to assign cell-width
	 */
	get gridTemplateColumns() {
		return `repeat(auto-fill,minmax(${
			this.minCellWidth && this.minCellWidth > 0 ? this.minCellWidth : 180
		}px, ${this.maxCellWidth ? `${this.maxCellWidth}px` : "1fr"}))`;
	}

	/**
	 * styling for grid
	 */
	applyGridStyles() {
		this.style.gridTemplateColumns = this.gridTemplateColumns;
		this.style.gridTemplateRows = this.cellHeight ? `repeat(auto-fill,${this.cellHeight}px)` : "";
		this.style.gridAutoRows = this.cellHeight ? `${this.cellHeight}px` : `1fr`;
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "grid";
	}

	render() {
		this.applyGridStyles();
		return html` <slot></slot> `;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-grid": FGrid;
	}
}
