import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import eleStyle from "./f-radio.scss?inline";
import globalStyle from "./f-radio-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
injectCss("f-radio", globalStyle);

export type FRadioState = "primary" | "default" | "success" | "warning" | "danger";
export type FRadioCustomEvent = {
	value: string;
};

@flowElement("f-radio")
export class FRadio extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle), ...FDiv.styles];

	/**
	 * @attribute Value of a radio defines if it is selected or not
	 */
	@property({ reflect: true, type: String })
	value?: "selected" | "unselected" = "unselected";

	/**
	 * @attribute States are used to communicate purpose and connotations.
	 */
	@property({ reflect: true, type: String })
	state?: FRadioState = "default";

	/**
	 * @attribute f-radio can have 2 sizes.
	 */
	@property({ reflect: true, type: String })
	size?: "small" | "medium";

	/**
	 * @attribute
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	@query(".slot-wrapper")
	slotWrapper!: FDiv;

	@query(".f-radio")
	nativeRadio!: HTMLInputElement;

	/**
	 * emit event on click
	 */
	handleClick(e: MouseEvent) {
		if (this.value === "unselected") {
			e.stopPropagation();
			const event = new CustomEvent<FRadioCustomEvent>("input", {
				detail: {
					value: "selected"
				},
				bubbles: true,
				composed: true
			});
			this.value = "selected";
			this.dispatchEvent(event);
		}
	}

	render() {
		/**
		 * Final html to render
		 */

		return html`
			<f-div
				class="f-radio-wrapper"
				padding="none"
				gap="x-small"
				direction="column"
				size=${this.size}
				?disabled=${this.disabled}
			>
				<f-div class="f-radio-section" align="top-left" padding="none" gap="medium">
					<input
						type="radio"
						class="f-radio"
						aria-label="${this.getAttribute("aria-label")}"
						data-qa-id=${this.getAttribute("data-qa-element-id")}
						checked=${this.value === "selected" ? true : false}
						size=${this.size}
						state=${this.state}
						@click=${this.handleClick}
					/>
					<f-div class="label-wrapper slot-wrapper" align="middle-left" direction="row" gap="small">
						<slot name="label" @slotchange=${this.checkSlots} @click=${this.handleClick}></slot>
						<slot name="icon-tooltip" @slotchange=${this.checkSlots}></slot>
						<slot name="subtitle" @slotchange=${this.checkSlots}></slot>
					</f-div>
					<slot name="description" @slotchange=${this.checkSlots}></slot>
					<slot name="help" @slotchange=${this.checkSlots}></slot>
				</f-div>
			</f-div>
		`;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		this.checkSlots();
		if (!this.getAttribute("aria-label")) {
			const labelElement = this.querySelector<HTMLElement>("[slot='label']");
			if (labelElement) {
				if (labelElement.textContent)
					this.nativeRadio.setAttribute("aria-label", labelElement.textContent);
			}
		}
	}

	checkSlots() {
		const labelSlots = this.shadowRoot?.querySelectorAll<HTMLSlotElement>(
			"slot[name='label'],slot[name='icon-tooltip'],slot[name='subtitle']"
		);
		let displaySlotWrapper = false;
		labelSlots?.forEach(slot => {
			if (slot.assignedNodes().length > 0) {
				displaySlotWrapper = true;
			}
		});

		if (!displaySlotWrapper) {
			this.slotWrapper.style.display = "none";
		}
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-radio": FRadio;
	}
}
