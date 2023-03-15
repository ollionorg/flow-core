import { html, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import eleStyle from "./f-date-time-picker.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import getCustomFillColor from "../../utils/get-custom-fill-color";
import { validateHTMLColor } from "validate-color";
import { validateHTMLColorName } from "validate-color";
import { FDiv } from "../f-div/f-div";
import flatpickr from "flatpickr";

export type FDateTimePickerState = "default" | "secondary" | "subtle" | `custom, ${string}`;

@customElement("f-date-time-picker")
export class FDateTimePicker extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle)];

	/**
	 * @attribute local state for managing custom fill.
	 */
	@state()
	fill = "";

	/**
	 * @attribute The solid variant is the default.
	 */
	@property({ reflect: true, type: String })
	variant?: "solid" | "dashed" | "dotted" = "solid";

	/**
	 * @attribute The medium size is the default.
	 */
	@property({ reflect: true, type: String })
	size?: "large" | "medium" = "medium";

	/**
	 * @attribute The state of Divider helps in indicating the degree of emphasis. By default it is default state.
	 */
	@property({ reflect: true, type: String })
	state?: FDateTimePickerState = "default";

	@query("input")
	dateTimePickerElement!: HTMLInputElement;

	render() {
		return html`<input />`;
	}
	updated() {
		flatpickr(this.dateTimePickerElement, {});
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
