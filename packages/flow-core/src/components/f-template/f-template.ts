import { html, unsafeCSS } from "lit";
import eleStyle from "./f-template.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { flowElement } from "./../../utils";

@flowElement("f-template")
export class FTemplate extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle)];

	render() {
		return html`<slot></slot>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"f-template": FTemplate;
	}
}
