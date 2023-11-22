import { html, unsafeCSS } from "lit";
import { query } from "lit/decorators.js";

import globalStyle from "./f-input-light-global.scss?inline";
import { classMap } from "lit-html/directives/class-map.js";
import { FIcon } from "../f-icon/f-icon";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { flowElement } from "./../../utils";
import { injectCss } from "@cldcvr/flow-core-config";
import { FInputBase } from "./f-input-base";
injectCss("f-input-light", globalStyle);

@flowElement("f-input-light")
export class FInputLight extends FInputBase {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle)];

	/**
	 * input element reference
	 */
	@query("input")
	inputElement!: HTMLInputElement;

	/**
	 * input element reference
	 */
	@query(".f-input-wrapper")
	inputWrapperElement!: HTMLInputElement;

	/**
	 * clear icon
	 */
	@query(".clear-icon")
	clearIcon?: FIcon;

	createRenderRoot() {
		return this;
	}

	render() {
		/**
		 * create iconLeft if available
		 */
		const iconLeft = this.iconLeft
			? html` <f-icon
					.source=${this.iconLeft}
					.size=${this.iconSize}
					class=${!this.size ? "f-input-icons-size" : ""}
			  ></f-icon>`
			: "";
		/**
		 * create iconRight if available
		 */
		const iconRight = this.iconRight
			? html`<f-icon
					.source=${this.iconRight}
					.size=${this.iconSize}
					class=${!this.size ? "f-input-icons-size" : ""}
			  ></f-icon>`
			: "";
		/**
		 * append prefix
		 */
		const prefixAppend =
			this.prefix || this.iconLeft
				? html` <div class="f-input-prefix">
						${this.prefix
							? html`
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
							  `
							: ""}
						${iconLeft}
				  </div>`
				: "";

		/**
		 * password view suffix
		 */
		const passwordToggle =
			this.type === "password" || this.showPassword
				? html` <f-icon
						?clickable=${true}
						.source=${this.showPassword ? "i-view-off-fill" : "i-view-fill"}
						.size=${this.iconSize}
						@click=${this.togglePasswordView}
						class=${!this.size ? "f-input-icons-size" : ""}
				  ></f-icon>`
				: "";

		/**
		 * main suffix
		 */
		const mainSuffix =
			this.suffix || this.iconRight
				? html`
						${this.suffix && (this.suffixWhen ? this.suffixWhen(this.value) : true)
							? html`
									<f-div height="hug-content" width="hug-content" padding="none" direction="row">
										<f-text variant="para" size="x-small" weight="regular" class="word-break"
											>${this.suffix}</f-text
										>
									</f-div>
							  `
							: ""}
						${iconRight}
				  `
				: "";
		/**
		 * append suffix
		 */
		const suffixAppend = !this.loading
			? this.value !== undefined && this.value !== null && this.value !== "" && this.clear
				? html`<div class="f-input-suffix">
						${passwordToggle}
						<f-icon
							?clickable=${true}
							source="i-close"
							size="x-small"
							@click=${this.clearInputValue}
							class=${!this.size ? "f-input-icons-size clear-icon" : "clear-icon"}
						></f-icon>
						${mainSuffix}
				  </div>`
				: html`<div class="f-input-suffix">${passwordToggle} ${mainSuffix}</div>`
			: html`
					<div class="f-input-suffix">${passwordToggle}${mainSuffix}</div>
					<div class="loader-suffix" state=${this.state}>${unsafeSVG(loader)}</div>
			  `;

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
				${prefixAppend}
				<input
					class=${classMap({ "f-input": true })}
					variant=${this.variant}
					category=${this.category}
					type=${this.type}
					state=${this.state}
					name=${this.getAttribute("name")}
					data-qa-id=${this.getAttribute("data-qa-element-id")}
					placeholder=${this.placeholder}
					.value=${this.value === undefined ? null : this.value}
					size=${this.size}
					?readonly=${this.readOnly}
					autofocus=${ifDefined(this.getAttribute("autofocus"))}
					autocomplete=${ifDefined(this.getAttribute("autocomplete"))}
					maxlength="${ifDefined(this.maxLength)}"
					@input=${this.handleInput}
				/>
				${suffixAppend}
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
