import { html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import eleStyle from "./f-emoji-picker.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import data from "@emoji-mart/data";
import { init } from "emoji-mart";

export type FEmojiPickerState = "default" | "secondary" | "subtle" | `custom, ${string}`;

init({ data });

@customElement("f-emoji-picker")
export class FEmojiPicker extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle)];

	render() {
		// render empty string, since there no need of any child element
		return html`<picker-em .data=${data}></picker-em> `;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-emoji-picker": FEmojiPicker;
	}
}
