import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import eleStyle from "./f-date-time-picker.scss?inline";
import globalStyle from "./f-date-time-picker-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import flatpickr from "flatpickr";
import { Instance } from "flatpickr/dist/types/instance";
import { DateLimit, DateOption } from "flatpickr/dist/types/options";
import { FInput } from "../f-input/f-input";
import { FDiv } from "../f-div/f-div";
import { FText } from "../f-text/f-text";
import { flowElement } from "./../../utils";

import { injectCss } from "@cldcvr/flow-core-config";

injectCss("f-date-time-picker", globalStyle);

export type FDateTimePickerState = "primary" | "default" | "success" | "warning" | "danger";

export type DateValueType = DateOption | DateOption[];

export type DateDisableType = DateLimit<DateOption>[];

export type FDateOption = DateOption;

@flowElement("f-date-time-picker")
export class FDateTimePicker extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FDiv.styles,
		...FText.styles,
		...FInput.styles
	];

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
	["min-date"]?: FDateOption;

	/**
	 * @attribute Sets the maximum value of the date allowed in the picker
	 */
	@property({ reflect: true, type: Date })
	["max-date"]?: FDateOption;

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
	dateTimePickerElement!: FInput;

	/**
	 * @attribute query selector for help slot
	 */
	@query("f-div[slot='help']")
	helpSlotElement!: FDiv;

	/**
	 * flatpickr instance
	 */
	flatPickerElement!: Instance;

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

	/**
	 * regex for date-time validation on keyboard typing
	 */
	get regexDateTime() {
		if (this.mode === "date-time") {
			return /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/-]\d{4} ([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
		} else if (this.mode === "date-only") {
			return /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/-]\d{4}$/;
		} else {
			return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
		}
	}

	/**
	 * validation message
	 */
	get dateValidationMessage() {
		return `Please Enter a valid date format: ${
			this.mode === "date-time"
				? "DD/MM/YYYY HH:ii"
				: this.mode === "date-only"
				? "DD/MM/YYYY"
				: "HH:ii"
		}`;
	}

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
		this.helpSlotElement.innerHTML = `<slot name="help"></slot>`;
		this.dateTimePickerElement.state = this.state;
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
	 *
	 * @param e custom-event value having date string
	 * @returns date object formed from string
	 */
	dateObjectFromString(e: CustomEvent) {
		const dateTime = e.detail.value.split(" ");
		const date = dateTime[0].split("/");
		const time = dateTime[1].split(":");
		const dateObjFormation = new Date(date[2], date[1], date[0], time[0], time[1]);
		return dateObjFormation;
	}

	/**
	 *
	 * @param e custom-event value having date string
	 */
	handleKeyboardInput(e: CustomEvent) {
		e.stopPropagation();
		if (e.detail?.value) {
			if (e.detail.value.match(this.regexDateTime)) {
				this.handleInput([this.dateObjectFromString(e)], e.detail.value);
			} else {
				this.helpSlotElement.innerHTML = this.dateValidationMessage;
				this.dateTimePickerElement.state = "danger";
			}
			this.dateTimePickerElement.inputElement.focus();
		}
		if (e.detail?.type === "clear") {
			this.handleInput([], "");
		}
	}

	/**
	 *
	 * @param selectedDates selected date object array
	 * @param dateStr selected date string
	 */
	datePickerOnChange(selectedDates: Date[], dateStr: string) {
		if (this["is-range"]) {
			if (selectedDates.length === 2) {
				this.handleInput(selectedDates, dateStr);
			}
		} else {
			this.handleInput(selectedDates, dateStr);
		}
	}

	/**
	 * creates date picker
	 * @param element element w.r.t which creation of date picker takes place
	 */
	createDateTimePicker(element: HTMLElement) {
		this.flatPickerElement = flatpickr(element, {
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
				this.datePickerOnChange(selectedDates, dateStr);
			},
			nextArrow:
				"<f-icon-button icon='i-chevron-right' size='small' class='datepicker-arrow-icon' variant='block' type='packed' state='neutral'></f-icon-button>",
			prevArrow:
				"<f-icon-button icon='i-chevron-left' size='small' class='datepicker-arrow-icon' variant='block' type='packed' state='neutral'></f-icon-button>"
		});
	}

	/**
	 * week-number border conditional styling
	 */
	addWeekNoStyle() {
		if (this["week-number"]) {
			(this.flatPickerElement.rContainer as HTMLDivElement).style.borderLeft =
				"1px solid var(--color-border-secondary";
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
				.clear=${this.clear}
				?loading=${this.loading}
				?disabled=${this.disabled}
				class="f-date-input-picker"
				data-qa-element-id=${this.getAttribute("data-qa-element-id")}
				@keydown=${() => {
					this.flatPickerElement.close();
					this.dateTimePickerElement.inputElement.focus();
				}}
				@input=${this.handleKeyboardInput}
				?read-only=${this["is-range"]}
			>
				<f-div slot="label"><slot name="label"></slot></f-div>
				<f-div slot="description"><slot name="description"></slot></f-div>
				<f-div slot="help"><slot name="help"></slot></f-div>
				<f-div slot="icon-tooltip"><slot name="icon-tooltip"></slot></f-div> </f-input
		></f-div>`;
	}
	protected async updated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
		super.updated(changedProperties);
		if (!this.inline) {
			requestAnimationFrame(() => {
				this.createDateTimePicker(this.dateTimePickerElement.inputWrapperElement);
				this.dateTimePickerElement.value = this.flatPickerElement.input.value;
				this.addWeekNoStyle();
			});
		} else {
			this.createDateTimePicker(this.dateTimePickerElement);
		}
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
