import { FRoot } from "../../mixins/components/f-root/f-root";
import { property, state } from "lit/decorators.js";

export type FInputState = "primary" | "default" | "success" | "warning" | "danger";

export type FInputCustomEvent = {
	value?: string | number;
	type: "clear" | "input";
};

export type FInputSuffixWhen = (value?: string | number) => boolean;

export class FInputBase extends FRoot {
	/**
	 * @attribute local state for password to text toggling and vice versa.
	 */
	@state({})
	showPassword = false;
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
}
