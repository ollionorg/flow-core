import { html, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import { FCheckbox, FDiv, FIconButton, FIcon, FRadio, FRoot, flowElement } from "@nonfx/flow-core";
import { FTableSelectable } from "../f-table/f-table";
import eleStyle from "./f-tcell.scss?inline";
import globalStyle from "./f-tcell-global.scss?inline";
import { FTrowChevronPosition } from "../f-trow/f-trow";
import { createRef, ref } from "lit/directives/ref.js";
import { injectCss } from "@nonfx/flow-core-config";

injectCss("f-tcell", globalStyle);

export type FTcellAction = {
	icon: string;
	id: string;
	tooltip?: string;
	disabled?: boolean;
	onClick?: (event: PointerEvent, element?: FIconButton) => void;
	onMouseOver?: (event: MouseEvent, element?: FIconButton) => void;
	onMouseLeave?: (event: MouseEvent, element?: FIconButton) => void;
};

export type FTcellActions = FTcellAction[];

export type FTcellAlign =
	| "top-left"
	| "top-center"
	| "top-right"
	| "middle-left"
	| "middle-center"
	| "middle-right"
	| "bottom-left"
	| "bottom-center"
	| "bottom-right";

@flowElement("f-tcell")
export class FTcell extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FDiv.styles,
		...FCheckbox.styles,
		...FRadio.styles,
		...FIcon.styles,
		...FIconButton.styles
	];

	/**
	 * @attribute comments baout title
	 */
	@property({ type: Object, reflect: false })
	actions?: FTcellActions;

	@property({ type: Boolean, reflect: true })
	selected? = false;

	@property({ type: String, reflect: true })
	width?: string;

	@property({ type: String, reflect: true })
	align?: FTcellAlign = "top-left";

	@state()
	selectable?: FTableSelectable = "none";

	@state()
	isDisabled = false;

	@state()
	expandIcon = false;

	@state()
	expandIconPosition: FTrowChevronPosition = "right";

	@query("f-checkbox")
	checkbox?: FCheckbox;

	@query("f-radio")
	radio?: FRadio;

	@query(".row-toggler")
	chevron?: FIconButton;

	renderActions() {
		if (this.actions) {
			return html`${this.actions.map(ac => {
				const actionRef = createRef<FIconButton>();
				return html`<f-icon-button
					${ref(actionRef)}
					id=${ac.id}
					class="f-tcell-actions"
					size="medium"
					category="packed"
					state="neutral"
					?disabled=${ac.disabled}
					.icon=${ac.icon}
					.tooltip=${ac.tooltip ?? undefined}
					@click=${(event: PointerEvent) => {
						if (ac.onClick) {
							ac.onClick(event, actionRef.value);
						}
					}}
					@mouseover=${(event: MouseEvent) => {
						if (ac.onMouseOver) {
							ac.onMouseOver(event, actionRef.value);
						}
					}}
					@mouseleave=${(event: MouseEvent) => {
						if (ac.onMouseLeave) {
							ac.onMouseLeave(event, actionRef.value);
						}
					}}
				></f-icon-button>`;
			})}`;
		}
		return nothing;
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		if (!this.role) this.role = "cell";
	}

	render() {
		return html`<div class="f-tcell-wrapper">
			<f-div .align=${this.align} height="100%" class="f-tcell-content">
				${this.selectable === "multiple"
					? html`<f-checkbox
							?disabled=${this.isDisabled}
							@click=${(event: PointerEvent) => event.stopPropagation()}
							@input=${this.handleSelection}
					  ></f-checkbox>`
					: nothing}
				${this.selectable === "single"
					? html`<f-radio
							?disabled=${this.isDisabled}
							@input=${this.handleSelection}
							@click=${(event: PointerEvent) => event.stopPropagation()}
							class="cell-radio"
					  ></f-radio>`
					: nothing}
				${this.expandIcon && this.expandIconPosition === "left"
					? html`
							<f-icon-button
								size="medium"
								category="packed"
								class="row-toggler left"
								state="neutral"
								@click=${this.toggleDetails}
								icon="i-chevron-down"
							></f-icon-button>
					  `
					: nothing}
				<f-div .align=${this.align}><slot></slot></f-div>
			</f-div>
			<f-div
				class="details-toggle"
				height="100%"
				width="hug-content"
				gap="medium"
				.align=${this.align ?? "middle-right"}
			>
				${this.renderActions()}
				${this.expandIcon && this.expandIconPosition === "right"
					? html`
							<f-icon-button
								size="medium"
								category="packed"
								class="row-toggler"
								state="neutral"
								@click=${this.toggleDetails}
								icon="i-chevron-down"
							></f-icon-button>
					  `
					: nothing}
			</f-div>
		</div>`;
	}

	setSelection(value = false, isDisabled = false) {
		this.isDisabled = isDisabled;
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
		const toggle = new CustomEvent("update-row-selection", {
			detail: event.detail.value === "checked" || event.detail.value === "selected",
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(toggle);
	}
	toggleDetails() {
		const toggle = new CustomEvent("toggle-row", {
			detail: { value: this.chevron?.icon === "i-chevron-down" },
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(toggle);
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
		super.updated(changedProperties);

		this.onmouseover = () => this.toggleColumnHighlight("add");

		this.onmouseleave = () => this.toggleColumnHighlight("remove");
		this.onclick = this.toggleColumnSelection;
		if (this.width) {
			this.style.minWidth = this.width;
			this.style.display = "block";
		}
	}

	toggleColumnSelection() {
		const row = this.closest("f-trow");
		if (row?.getAttribute("slot") === "header") {
			const columnIndex = Array.from(this.parentNode?.children ?? []).indexOf(this);
			const toggle = new CustomEvent("selected-column", {
				detail: { columnIndex },
				bubbles: true,
				composed: true
			});
			this.dispatchEvent(toggle);
		}
	}

	toggleColumnHighlight(type: "add" | "remove") {
		const row = this.closest("f-trow");
		if (row?.getAttribute("slot") === "header") {
			const columnIndex = Array.from(this.parentNode?.children ?? []).indexOf(this);
			const toggle = new CustomEvent("highlight-column", {
				detail: { columnIndex, type },
				bubbles: true,
				composed: true
			});
			this.dispatchEvent(toggle);
		}
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
