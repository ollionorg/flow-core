import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import globalStyle from "./f-color-picker-global.scss?inline";
import eleStyle from "./f-color-picker.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";

import "vanilla-colorful";
import { FPopover } from "../f-popover/f-popover";
import { FDiv } from "../f-div/f-div";
import { FInput } from "../f-input/f-input";
import { classMap } from "lit-html/directives/class-map.js";

injectCss("f-color-picker", globalStyle);

export type FColorPickerState = "primary" | "default" | "success" | "warning" | "danger";
export type FColorPickerInputEvent = {
	value?: string;
};

@flowElement("f-color-picker")
export class FColorPicker extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FPopover.styles,
		...FDiv.styles,
		...FInput.styles
	];

	/**
	 * @attribute Variants are various visual representations of an input field.
	 */
	@property({ reflect: true, type: String })
	variant?: "curved" | "round" | "block" = "curved";

	/**
	 * @attribute States are used to communicate purpose and connotations.
	 */
	@property({ reflect: true, type: String })
	state?: FColorPickerState = "default";

	/**
	 * @attribute f-input can have 2 sizes. By default size is inherited by the parent f-field.
	 */
	@property({ reflect: true, type: String })
	size?: "medium" | "small" = "medium";

	/**
	 * @attribute Defines the value of an f-input. Validation rules are applied on the value depending on the type property of the f-text-input.
	 */
	@property({ reflect: true, type: String })
	value?: string;

	/**
	 * @attribute Shows disabled state of input element
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * @attribute When true the user can not select the input element.
	 */
	@property({ reflect: true, type: Boolean, attribute: "read-only" })
	readOnly?: boolean = false;

	@query("#f-color-picker-popover")
	popoverElement!: FPopover;

	@state()
	isOpen = false;

	@query("#f-color-picker-input")
	inputElement!: FDiv;

	defaultHexColor: string = "#000000";

	handleColorChange(event: CustomEvent<{ value: string }>) {
		this.value = event.detail.value;
		this.dispatchInputEvent(this.value);
	}
	handleFocus(_event: FocusEvent) {
		if (!this.readOnly) {
			this.isOpen = true;
		}
	}
	handleOverlayClick() {
		this.isOpen = false;
	}

	handleHexInput(event: CustomEvent) {
		this.value = event.detail.value;
		this.dispatchInputEvent(this.value);
	}
	handleKeydown(event: KeyboardEvent) {
		if (event.key === "Enter") {
			this.isOpen = false;
		}
	}

	dispatchInputEvent(value?: string) {
		const event = new CustomEvent<FColorPickerInputEvent>("input", {
			detail: {
				value
			},
			bubbles: true,
			composed: true
		});

		this.dispatchEvent(event);
	}

	get isValueEmpty() {
		return (
			this.value === undefined || this.value === null || (this.value && this.value.trim() === "")
		);
	}

	sizeMap = {
		small: "28px",
		medium: "36px"
	};
	get colorPickerTypeTemplate() {
		return html`<hex-color-picker
				style="width:100%;"
				.color=${this.value ?? this.defaultHexColor}
				@color-changed=${this.handleColorChange}
			></hex-color-picker>
			<f-div gap="small">
				<f-input
					id="hex-input"
					prefix="HEX"
					@input=${this.handleHexInput}
					size="small"
					.clear=${false}
					.value=${this.value ?? this.defaultHexColor}
				>
				</f-input>
			</f-div>`;
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "textbox";
	}

	render() {
		const classes = { focused: this.isOpen, "no-color": this.isValueEmpty };
		// render empty string, since there no need of any child element
		return html`<f-div direction="column" width="hug-content">
			<f-form-field>
				<f-div
					.width=${this.sizeMap[this.size ?? "medium"]}
					.height=${this.sizeMap[this.size ?? "medium"]}
					state="custom,${this.value ?? this.defaultHexColor}"
					border-state="${this.state}"
					.variant=${this.variant}
					.disabled=${this.disabled}
					?read-only=${this.readOnly}
					class=${classMap(classes)}
					@click=${this.handleFocus}
					id="f-color-picker-input"
					data-qa-element=${this.getAttribute("data-qa-element-id")}
				></f-div>
				<f-div slot="label"><slot name="label"></slot></f-div>
				<f-div slot="description"><slot name="description"></slot></f-div>

				<f-div slot="icon-tooltip"><slot name="icon-tooltip"></slot></f-div>
				<f-div slot="help"><slot name="help"></slot></f-div>
			</f-form-field>
			<f-popover
				id="f-color-picker-popover"
				@overlay-click=${this.handleOverlayClick}
				@keydown=${this.handleKeydown}
				.overlay=${false}
				.open=${this.isOpen}
				size="small"
			>
				<f-div direction="column" state="secondary" padding="large" gap="medium" variant="curved">
					${this.colorPickerTypeTemplate}
				</f-div>
			</f-popover>
		</f-div>`;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		this.popoverElement.target = this.inputElement;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-color-picker": FColorPicker;
	}
}
