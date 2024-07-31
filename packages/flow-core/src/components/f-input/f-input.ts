import { html, PropertyValueMap, unsafeCSS } from "lit";
import { query, queryAssignedElements, state } from "lit/decorators.js";
import globalStyle from "./f-input-global.scss?inline";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";
import { FIcon } from "../f-icon/f-icon";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
import { FInputBase, FInputCustomEvent } from "./f-input-base";
import { FInputLight } from "./f-input-light";
injectCss("f-input", globalStyle);

export type { FInputState, FInputCustomEvent, FInputSuffixWhen } from "./f-input-base";

@flowElement("f-input")
export class FInput extends FInputBase {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(globalStyle),
		...FText.styles,
		...FDiv.styles,
		...FIcon.styles,
		...FInputLight.styles
	];

	@queryAssignedElements({ slot: "label" })
	_labelNodes!: NodeListOf<HTMLElement>;

	@state()
	_hasLabel = false;

	@queryAssignedElements({ slot: "help" })
	_helpNodes!: NodeListOf<HTMLElement>;

	@state()
	_hasHelperText = false;

	/**
	 * input element reference
	 */
	@query("f-input-light")
	inputLight!: FInputLight;

	get inputElement() {
		return this.inputLight.inputElement;
	}

	get inputWrapperElement() {
		return this.inputLight.inputWrapperElement;
	}

	get clearIcon() {
		return this.inputLight.clearIcon;
	}

	_onLabelSlotChange() {
		this._hasLabel = this._labelNodes.length > 0;
	}
	_onHelpSlotChange() {
		this._hasHelperText = this._helpNodes.length > 0;
	}

	updateValue(e: CustomEvent<FInputCustomEvent>) {
		if (e.detail) {
			this.value = e.detail.value;
		}
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "textbox";
		if (this.placeholder) this.setAttribute("aria-placeholder", this.placeholder);
	}

	render() {
		/**
		 * Final html to render
		 */
		return html`
			<f-div
				padding="none"
				.gap=${this._hasLabel && this._hasHelperText ? "x-small" : "none"}
				direction="column"
				width="100%"
			>
				<f-div padding="none" gap="none" align="bottom-left">
					<f-div padding="none" direction="column" width="fill-container">
						<f-div padding="none" gap="auto" direction="row" height="hug-content">
							<f-div
								padding="none"
								gap="small"
								direction="row"
								width="hug-content"
								height="hug-content"
							>
								<slot name="label" @slotchange=${this._onLabelSlotChange}></slot>
								<slot name="icon-tooltip"></slot>
							</f-div>
							<f-div width="hug-content">
								<slot name="subtitle"></slot>
							</f-div>
						</f-div>
						<slot name="description"></slot>
					</f-div>
					<f-div
						.padding=${this._hasLabel ? "none" : this.maxLength ? "none none x-small none" : "none"}
						gap="none"
						width="hug-content"
					>
						${this.maxLength
							? html` <f-text variant="para" size="small" weight="regular" state="secondary"
									>${(this.value + "")?.length ?? 0} / ${this.maxLength}</f-text
							  >`
							: null}
					</f-div>
				</f-div>
				<f-div
					.padding=${this._hasLabel && !this._hasHelperText ? "x-small none none none" : "none"}
					gap="x-small"
					direction="row"
					width="100%"
					class="f-input-row"
					align="middle-center"
					overflow="hidden"
				>
					<f-input-light
						.variant=${this.variant}
						.category=${this.category}
						.state=${this.state}
						.size=${this.size}
						.disabled=${this.disabled}
						.type=${this.type}
						.placeholder=${this.placeholder}
						.value=${this.value}
						.readOnly=${this.readOnly}
						.iconLeft=${this.iconLeft}
						.iconRight=${this.iconRight}
						.prefix=${this.prefix}
						.suffix=${this.suffix}
						.loading=${this.loading}
						.clear=${this.clear}
						.suffixWhen=${this.suffixWhen}
						aria-label="${this.getAttribute("aria-label")}"
						data-qa-element-id=${this.getAttribute("data-qa-element-id")}
						autofocus=${ifDefined(this.getAttribute("autofocus"))}
						autocomplete=${ifDefined(this.getAttribute("autocomplete"))}
						.maxLength=${this.maxLength}
						@input=${(e: CustomEvent<FInputCustomEvent>) => this.updateValue(e)}
					></f-input-light>
				</f-div>
				<f-div
					.padding=${this._hasHelperText && !this._hasLabel ? "x-small none none none" : "none"}
				>
					<slot name="help" @slotchange=${this._onHelpSlotChange}></slot>
				</f-div>
			</f-div>
		`;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		if (!this.getAttribute("aria-label")) {
			const labelElement = this.querySelector<HTMLElement>("[slot='label']");
			if (labelElement) {
				this.setAttribute("aria-label", labelElement.textContent as string);
			}
		}
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-input": FInput;
	}
}
