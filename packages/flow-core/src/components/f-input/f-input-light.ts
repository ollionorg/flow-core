import { html, nothing, PropertyValueMap, TemplateResult, unsafeCSS } from "lit";
import { query } from "lit/decorators.js";

import globalStyle from "./f-input-light-global.scss?inline";
import { classMap } from "lit-html/directives/class-map.js";
import { FIcon } from "../f-icon/f-icon";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
import { FInputBase } from "./f-input-base";
injectCss("f-input-light", globalStyle);

@flowElement("f-input-light")
export class FInputLight extends FInputBase {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle)];

	/**
	 * native input element reference
	 */
	@query("input")
	inputElement!: HTMLInputElement;

	/**
	 * native input element wrapper reference, (Used in f-suggest to display popover)
	 */
	@query(".f-input-wrapper")
	inputWrapperElement!: HTMLInputElement;

	/**
	 * clear icon reference
	 */
	@query(".clear-icon")
	clearIcon?: FIcon;

	createRenderRoot() {
		return this;
	}

	get iconRightTemplate() {
		if (this.iconRight) {
			return html`<f-icon
				.source=${this.iconRight}
				.size=${this.iconSize}
				class=${!this.size ? "f-input-icons-size" : ""}
			></f-icon>`;
		}
		return nothing;
	}

	get passwordToggle() {
		if (this.type === "password" || this.showPassword) {
			return html` <f-icon
				?clickable=${true}
				.source=${this.showPassword ? "i-view-off-fill" : "i-view-fill"}
				.size=${this.iconSize}
				@click=${this.togglePasswordView}
				class=${!this.size ? "f-input-icons-size" : ""}
			></f-icon>`;
		}
		return nothing;
	}

	get suffixTextTemplate() {
		if (this.suffix && (this.suffixWhen ? this.suffixWhen(this.value) : true)) {
			return html`
				<f-div height="hug-content" width="hug-content" padding="none" direction="row">
					<f-text variant="para" size="x-small" weight="regular" class="word-break"
						>${this.suffix}</f-text
					>
				</f-div>
			`;
		}
		return nothing;
	}

	get suffixTemplate() {
		let computedSuffix: TemplateResult<1> | symbol = nothing;
		/**
		 * check if suffix available
		 */
		if (this.suffix || this.iconRight) {
			computedSuffix = html` ${this.suffixTextTemplate} ${this.iconRightTemplate} `;
		}

		let clearIcon: TemplateResult<1> | symbol = nothing;
		let loadingIcon: TemplateResult<1> | symbol = nothing;
		/**
		 * cheak if clear icon needs to be display
		 */
		if (
			this.value !== undefined &&
			this.value !== null &&
			this.value !== "" &&
			this.clear &&
			!this.loading
		) {
			clearIcon = html`<f-icon
				?clickable=${true}
				source="i-close"
				size="x-small"
				@click=${this.clearInputValue}
				class=${!this.size ? "f-input-icons-size clear-icon" : "clear-icon"}
			></f-icon>`;
		}

		if (this.loading) {
			loadingIcon = html`<div class="loader-suffix" state=${this.state}>${unsafeSVG(loader)}</div>`;
		}
		return html`<div class="f-input-suffix">
				${this.passwordToggle}${clearIcon}${computedSuffix}
			</div>
			${loadingIcon}`;
	}

	get iconleftTemplate() {
		if (this.iconLeft) {
			return html` <f-icon
				.source=${this.iconLeft}
				.size=${this.iconSize}
				class=${!this.size ? "f-input-icons-size" : ""}
			></f-icon>`;
		}
		return nothing;
	}

	get prefixTemplate() {
		let textPrefixTemplate: TemplateResult<1> | symbol = nothing;

		if (this.prefix) {
			textPrefixTemplate = html`
				<f-div
					height="hug-content"
					width="hug-content"
					padding="none medium none none"
					direction="row"
					border="small solid default right"
				>
					<f-text variant="para" size="small" weight="regular" class="word-break"
						>${this.prefix}</f-text
					>
				</f-div>
			`;
		}
		if (this.prefix || this.iconLeft) {
			return html` <div class="f-input-prefix">
				${textPrefixTemplate} ${this.iconleftTemplate}
			</div>`;
		}
		return nothing;
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
			<div
				class="f-input-wrapper"
				variant=${this.variant}
				category=${this.category}
				state=${this.state}
				size=${this.size}
				?disabled=${this.disabled}
			>
				${this.prefixTemplate}
				<input
					class=${classMap({ "f-input": true })}
					variant=${this.variant}
					category=${this.category}
					type=${this.type}
					state=${this.state}
					name=${this.getAttribute("name")}
					data-qa-id=${this.getAttribute("data-qa-element-id")}
					placeholder=${this.placeholder}
					.value=${this.value ?? null}
					size=${this.size}
					?readonly=${this.readOnly}
					autofocus=${ifDefined(this.getAttribute("autofocus"))}
					autocomplete=${ifDefined(this.getAttribute("autocomplete"))}
					maxlength="${ifDefined(this.maxLength)}"
					aria-label="${this.getAttribute("aria-label")}"
					@input=${this.handleInput}
				/>
				${this.suffixTemplate}
			</div>
		`;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-input-light": FInputLight;
	}
}
