import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";

import { FDiv, FIcon, FRoot, flowElement, FIconButton } from "@nonfx/flow-core";
import { FTcell } from "../f-tcell/f-tcell";
import eleStyle from "./f-trow.scss?inline";
import globalStyle from "./f-trow-global.scss?inline";
import { injectCss } from "@nonfx/flow-core-config";

injectCss("f-trow", globalStyle);

export type FTrowState =
	| "primary"
	| "neutral"
	| "success"
	| "warning"
	| "danger"
	| "inherit"
	| "default";
export type FTrowChevronPosition = "left" | "right";

@flowElement("f-trow")
export class FTrow extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle), ...FDiv.styles, ...FIcon.styles];

	/**
	 * @attribute state applies background to row
	 */
	@property({ type: String, reflect: true })
	state?: FTrowState = "default";

	/**
	 * @attribute is details slot collapsed
	 */
	@property({ type: Boolean, reflect: true })
	open?: boolean;

	/**
	 * @attribute is row selected
	 */
	@property({ type: Boolean, reflect: true })
	selected?: boolean;

	/**
	 * @attribute chevron position
	 */
	@property({ type: String, reflect: true, attribute: "expand-icon-position" })
	expandIconPosition?: FTrowChevronPosition = "right";

	/**
	 * @attribute is row selected
	 */
	@property({ type: Boolean, reflect: true, attribute: "disable-selection" })
	disableSelection?: boolean;

	@query(".expandable")
	expndablePanel?: FTcell;

	@query("slot[name='details']")
	detailsSlotElement!: HTMLSlotElement;

	chevron: FIconButton | undefined;

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "row";
	}

	render() {
		return html`<slot
				@slotchange=${this.propogateProps}
				@toggle-row=${this.toggleDetails}
				@update-row-selection=${this.handleInput}
			></slot>

			<f-div
				direction="column"
				border="small solid default bottom"
				class="expandable ${this.open ? "opened" : "closed"}"
			>
				<slot name="details" @slotchange=${this.handleDetailsSlot}></slot>
			</f-div>`;
	}
	protected async updated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
		super.updated(changedProperties);
		await this.updateComplete;
		const allCells = Array.from(this.children).filter(
			el => el.tagName.toLocaleLowerCase() === "f-tcell"
		);

		if (this.expndablePanel) {
			this.expndablePanel.style.gridColumnEnd = `${allCells.length + 1}`;
		}

		this.propogateProps();
	}

	/**
	 * propogate props related to chevron and checkbox and radio boxes
	 */
	propogateProps() {
		const firstCell = Array.from(this.children).filter(
			el => el.tagName.toLocaleLowerCase() === "f-tcell"
		)[0] as FTcell;

		firstCell?.setSelection(this.selected, Boolean(this.disableSelection));
		this.handleDetailsSlot();
	}

	toggleDetails(event: CustomEvent) {
		this.open = !this.open;
		const chevron = (event.target as FTcell).chevron;
		if (chevron) {
			if (this.open) {
				chevron.icon = "i-chevron-up";
			} else {
				chevron.icon = "i-chevron-down";
			}
		}
	}

	handleInput(event: CustomEvent) {
		this.selected = event.detail;
		const toggle = new CustomEvent("selected-row", {
			detail: { element: this, value: event.detail },
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(toggle);
	}
	handleDetailsSlot() {
		if (this.detailsSlotElement.assignedNodes().length > 0) {
			const allCells = Array.from(this.children).filter(
				el => el.tagName.toLocaleLowerCase() === "f-tcell"
			) as FTcell[];

			let chevronCell;
			if (this.expandIconPosition === "left") {
				chevronCell = allCells[0];
			} else {
				chevronCell = allCells[allCells.length - 1];
			}
			chevronCell.expandIcon = true;
			chevronCell.expandIconPosition = this.expandIconPosition as FTrowChevronPosition;
			this.chevron = chevronCell.chevron;
			if (this.chevron) {
				if (this.open) {
					this.chevron.icon = "i-chevron-up";
				} else {
					this.chevron.icon = "i-chevron-down";
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
		"f-trow": FTrow;
	}
}
