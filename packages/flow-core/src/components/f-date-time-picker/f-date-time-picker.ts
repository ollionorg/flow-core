import { html, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import eleStyle from "./f-date-time-picker.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import flatpickr from "flatpickr";
import { Instance } from "flatpickr/dist/types/instance";
import { DateLimit, DateOption } from "flatpickr/dist/types/options";

export type FDateTimePickerState = "primary" | "default" | "success" | "warning" | "danger";

export type DateValueType = DateOption | DateOption[];

export type DateDisableType = DateLimit<DateOption>[];

@customElement("f-date-time-picker")
export class FDateTimePicker extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle)];

	/**
	 * @attribute Variants are various visual representations of a date-time-picker field.
	 */
	@property({ reflect: true, type: String })
	variant?: "curved" | "round" | "block" = "curved";

	/**
	 * @attribute Categories are various visual representations of date-time-picker field.
	 */
	@property({ reflect: true, type: String })
	category?: "fill" | "outline" | "transparent" = "fill";

	/**
	 * @attribute The mode property specifies whether the picker will include both date and time or only one of them.
	 */
	@property({ reflect: true, type: String })
	mode?: "date-time" | "date-only" | "time-only" = "date-time";

	/**
	 * @attribute Defines the value of the field. Standard validation rules of date and time are applied on the value.
	 */
	@property({ reflect: true, type: Date })
	value?: DateValueType;

	/**
	 * @attribute Defines the placeholder text for f-date-time-picker
	 */
	@property({ reflect: true, type: String })
	placeholder?: string;

	/**
	 * @attribute The medium size is the default.
	 */
	@property({ reflect: true, type: String })
	size?: "small" | "medium" = "medium";

	/**
	 * @attribute The state helps in indicating the degree of emphasis. By default it is default state.
	 */
	@property({ reflect: true, type: String })
	state?: FDateTimePickerState = "default";

	/**
	 * @attribute Sets the minimum value of the date allowed in the picker
	 */
	@property({ reflect: true, type: Date })
	["min-date"]?: DateOption;

	/**
	 * @attribute Sets the maximum value of the date allowed in the picker
	 */
	@property({ reflect: true, type: Date })
	["max-date"]?: DateOption;

	/**
	 * @attribute Sets the certain dates unavailable. There can be multiple options:
1. Disabling specific date(s)
2. Disabling range of dates
3. Disabling dates using a function
	 */
	@property({ reflect: true, type: String })
	["disable-date"]?: DateDisableType = [];

	/**
	 * @attribute Displays a close icon-button on the right side of the input that allows the user to clear the input value
	 */
	@property({ reflect: true, type: Boolean })
	clear?: boolean = false;

	/**
	 * @attribute Allow a range of dates to be selected by choosing start-date and end-date
	 */
	@property({ reflect: true, type: Boolean })
	["is-range"]?: boolean = false;

	/**
	 * @attribute Display the date-time picker always in open state. Not acting as a popover now.
	 */
	@property({ reflect: true, type: Boolean })
	inline?: boolean = false;

	/**
	 * @attribute Shows the week numbers on the picker.
	 */
	@property({ reflect: true, type: Boolean })
	["week-number"]?: boolean = false;

	/**
	 * @attribute Shows the input field in disabled state. Opacity 50%
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * @attribute Sets the input field to the loading state.
	 */
	@property({ reflect: true, type: Boolean })
	loading?: boolean = false;

	/**
	 * @attribute query selector for input field
	 */
	@query("f-input")
	dateTimePickerElement!: HTMLInputElement;

	flatPickerElement!: Instance;

	/**
	 * close the date-picker on unmount
	 */
	disconnectedCallback() {
		this.flatPickerElement?.close();
		super.disconnectedCallback();
	}

	/**
	 * emit input custom event
	 */
	handleInput(dateObj: object, dateStr: string) {
		this.value = dateStr;
		this.dispatchInputEvent(dateObj, dateStr);
	}

	/**
	 *
	 * @param dateObj Date as an object
	 * @param dateStr Date oin string format
	 */
	dispatchInputEvent(dateObj: object, dateStr: string) {
		const event = new CustomEvent("input", {
			detail: {
				value: dateObj,
				date: dateStr
			},
			bubbles: true,
			composed: true
		});

		this.dispatchEvent(event);
	}

	/**
	 * conditional placeholder
	 */
	get placeholderText() {
		if (this.mode === "date-only") {
			return "Select date";
		} else if (this.mode === "time-only") {
			return "Select time";
		} else {
			return "Select date and time";
		}
	}

	render() {
		return html`<f-div width="100%"
			><f-input
				icon-left=${this.mode === "time-only" ? "i-clock-fill" : "i-calendar"}
				placeholder=${this.placeholder ?? this.placeholderText}
				.size=${this.size}
				.state=${this.state}
				.variant=${this.variant}
				.category=${this.category}
				?clear=${this.clear}
				?loading=${this.loading}
				?disabled=${this.disabled}
				?read-only=${true}
			>
				<f-div slot="label"><slot name="label"></slot></f-div>
				<f-div slot="description"><slot name="description"></slot></f-div>
				<f-div slot="help"><slot name="help"></slot></f-div>
				<f-div slot="icon-tooltip"><slot name="icon-tooltip"></slot></f-div> </f-input
		></f-div>`;
	}
	updated() {
		this.flatPickerElement = flatpickr(this.dateTimePickerElement, {
			dateFormat:
				this.mode === "date-time" ? "d/m/Y H:i" : this.mode === "date-only" ? "d/m/Y" : "H:i",
			enableTime: this.mode === "date-time" || this.mode === "time-only",
			noCalendar: this.mode === "time-only",
			defaultDate: this.value,
			mode: this["is-range"] ? "range" : "single",
			minDate: this["min-date"],
			maxDate: this["max-date"],
			disable: this["disable-date"] && this["disable-date"]?.length > 0 ? this["disable-date"] : [],
			inline: this.inline,
			weekNumbers: this["week-number"],
			onChange: (selectedDates, dateStr) => {
				if (this["is-range"]) {
					if (selectedDates.length === 2) {
						this.handleInput(selectedDates, dateStr);
					}
				} else {
					console.log(selectedDates);
					this.handleInput(selectedDates, dateStr);
				}
			},
			nextArrow:
				"<f-icon-button icon='i-chevron-right' size='small' class='datepicker-arrow-icon' variant='block' type='packed' state='neutral'></f-icon-button>",
			prevArrow:
				"<f-icon-button icon='i-chevron-left' size='small' class='datepicker-arrow-icon' variant='block' type='packed' state='neutral'></f-icon-button>"
		});
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-date-time-picker": FDateTimePicker;
	}
}
