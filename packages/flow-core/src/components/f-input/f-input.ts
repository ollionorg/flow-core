import { html, unsafeCSS } from "lit";
import { property, query, queryAssignedElements, state } from "lit/decorators.js";
import eleStyle from "./f-input.scss?inline";
import globalStyle from "./f-input-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { classMap } from "lit-html/directives/class-map.js";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";
import { FIcon } from "../f-icon/f-icon";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { flowElement } from "./../../utils";
import { injectCss } from "@cldcvr/flow-core-config";
injectCss("f-input", globalStyle);

export type FInputState = "primary" | "default" | "success" | "warning" | "danger";

export type FInputCustomEvent = {
	value?: string | number;
	type: "clear" | "input";
};

export type FInputSuffixWhen = (value?: string | number) => boolean;

@flowElement("f-input")
export class FInput extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FText.styles,
		...FDiv.styles,
		...FIcon.styles
	];

	/**
	 * @attribute local state for password to text toggling and vice versa.
	 */
	@state({})
	showPassword = false;

	@queryAssignedElements({ slot: "label" })
	_labelNodes!: NodeListOf<HTMLElement>;

	@state()
	_hasLabel = false;

	@queryAssignedElements({ slot: "help" })
	_helpNodes!: NodeListOf<HTMLElement>;

	@state()
	_hasHelperText = false;

	/**
	 * @attribute Variants are various visual representations of an input field.
	 */
	@property({ reflect: true, type: String })
	variant?: "curved" | "round" | "block" = "curved";

	/**
	 * @attribute Categories are various visual representations of an input field.
	 */
	@property({ reflect: true, type: String })
	category?: "fill" | "outline" | "transparent" = "fill";

	/**
	 * @attribute States are used to communicate purpose and connotations.
	 */
	@property({ reflect: true, type: String })
	state?: FInputState = "default";

	/**
	 * @attribute f-input can have 2 sizes. By default size is inherited by the parent f-field.
	 */
	@property({ reflect: true, type: String })
	size?: "medium" | "small" = "medium";

	/**
	 * @attribute The type attribute specifies the type of <input> element to display.
	 */
	@property({ reflect: true, type: String })
	type?: "text" | "number" | "email" | "password" | "url" | "tel" = "text";

	/**
	 * @attribute Defines the value of an f-input. Validation rules are applied on the value depending on the type property of the f-text-input.
	 */
	@property({ reflect: true, type: String })
	value?: string | number;

	/**
	 * @attribute Defines the placeholder text for f-text-input
	 */
	@property({ reflect: true, type: String })
	placeholder?: string;

	/**
	 * @attribute Icon-left enables an icon on the left of the input value.
	 */
	@property({ reflect: true, type: String, attribute: "icon-left" })
	iconLeft?: string;

	/**
	 * @attribute Icon-right enables an icon on the right of the input value.
	 */
	@property({ reflect: true, type: String, attribute: "icon-right" })
	iconRight?: string;

	/**
	 * @attribute Prefix property enables a string before the input value.
	 */
	@property({ reflect: true, type: String })
	prefix: string | null = null;
	/**
	 * @attribute Suffix property enables a string on the right side of the input box.
	 */
	@property({ reflect: true, type: String })
	suffix?: string;

	/**
	 * @attribute This shows the character count while typing and auto limits after reaching the max length.
	 */
	@property({ reflect: true, type: [Number, undefined], attribute: "max-length" })
	maxLength?: number;

	/**
	 * @attribute Loader icon replaces the content of the button .
	 */
	@property({ reflect: true, type: Boolean })
	loading?: boolean = false;

	/**
	 * @attribute Shows disabled state of input element
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * @attribute  Displays a close icon-button on the right side of the input that allows the user to clear the input value
	 */
	@property({ reflect: true, type: Boolean })
	clear?: boolean = true;

	/**
	 * @attribute When true the user can not select the input element.
	 */
	@property({ reflect: true, type: Boolean, attribute: "read-only" })
	readOnly?: boolean = false;

	@property({ reflect: false, type: Function })
	suffixWhen?: FInputSuffixWhen;

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
	 * emit input custom event
	 */
	handleInput(e: InputEvent) {
		e.stopPropagation();
		const val = (e.target as HTMLInputElement)?.value;
		this.value = this.type === "number" ? Number(val) : val;
		this.dispatchInputEvent(this.value, "input");
	}

	/**
	 * clear input value on clear icon clicked
	 */
	clearInputValue() {
		this.value = undefined;
		this.dispatchInputEvent(undefined, "clear");
	}

	dispatchInputEvent(value: string | number | undefined, type: "clear" | "input") {
		const event = new CustomEvent<FInputCustomEvent>("input", {
			detail: {
				value: value,
				type: type
			},
			bubbles: true,
			composed: true
		});

		this.dispatchEvent(event);
	}

	/**
	 * icon size
	 */
	get iconSize() {
		if (this.size === "medium") return "small";
		else if (this.size === "small") return "x-small";
		else return undefined;
	}

	/**
	 * Toggle Password view
	 */
	togglePasswordView() {
		if (this.type === "text") {
			this.type = "password";
		} else {
			this.type = "text";
		}
		this.showPassword = !this.showPassword;
	}

	_onLabelSlotChange() {
		this._hasLabel = this._labelNodes.length > 0;
	}
	_onHelpSlotChange() {
		this._hasHelperText = this._helpNodes.length > 0;
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
							class=${!this.size ? "f-input-icons-size" : ""}
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
				</f-div>
				<f-div
					.padding=${this._hasHelperText && !this._hasLabel ? "x-small none none none" : "none"}
				>
					<slot name="help" @slotchange=${this._onHelpSlotChange}></slot>
				</f-div>
			</f-div>
		`;
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
