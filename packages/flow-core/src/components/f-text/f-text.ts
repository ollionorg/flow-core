import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-text.scss";
import getCustomFillColor from "../../utils/get-custom-fill-color";
import { validateHTMLColor } from "validate-color";
import { validateHTMLColorName } from "validate-color";
import { flowElement } from "./../../utils";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export type FTextStateProp =
	| "default"
	| "secondary"
	| "subtle"
	| "primary"
	| "success"
	| "danger"
	| "warning"
	| "inherit"
	| `custom, ${string}`;

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@flowElement("f-text")
export class FText extends FRoot {
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
	 * @attribute Variants of text component are use cases such as Heading, paragraph, and code.
	 */
	@property({ type: String, reflect: true })
	variant?: "heading" | "para" | "code" = "para";

	/**
	 * @attribute Each variant has various sizes. By default medium is the default size.
	 */
	@property({ type: String, reflect: true })
	size?: "x-large" | "large" | "medium" | "small" | "x-small" = "medium";

	/**
	 * @attribute Weight property defines the visual weight of the text such as regular, medium and bold.
	 */
	@property({ type: String, reflect: true })
	weight?: "bold" | "medium" | "regular";

	/**
	 * @attribute text to highlight
	 */
	@property({ type: String, reflect: true })
	highlight?: string;
	/**
	 * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
	 */
	@property({ type: String, reflect: true })
	state?: FTextStateProp = "default";

	/**
	 * @attribute Sets the alignment of the text. Can take 3 values: left, center, and right.
	 */
	@property({ type: String, reflect: true })
	align?: "left" | "center" | "right" = "left";

	/**
	 * @attribute will work as in the form inline span element taking just the width of internal text
	 */
	@property({ reflect: true, type: Boolean })
	inline?: boolean = false;

	/**
	 * @attribute Loader icon replaces the content of the button .
	 */
	@property({ reflect: true, type: Boolean })
	loading?: boolean = false;

	/**
	 * @attribute The disabled attribute can be set to keep a user from clicking on the button.
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * @attribute will ellipsis apply on overflow
	 */
	@property({ reflect: true, type: Boolean })
	ellipsis?: boolean = false;

	@query("slot")
	defaultSlot!: HTMLSlotElement;

	@state()
	highlightedText: string | null = null;

	/**
	 * validation for all atrributes
	 */
	validateProperties() {
		if (
			this.state?.includes("custom") &&
			this.fill &&
			!validateHTMLColor(this.fill) &&
			!validateHTMLColorName(this.fill)
		) {
			throw new Error("f-text : enter correct color-name or color-code");
		}
	}

	protected update(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.update(changedProperties);

		if (changedProperties.has("highlight")) {
			this.highlightedText = null;
		}
	}

	render() {
		/**
		 * creating local fill variable out of state prop.
		 */
		this.fill = getCustomFillColor(this.state ?? "");

		/**
		 * validate
		 */
		this.validateProperties();

		/**
		 * set default weight according to variant
		 */
		if (this.fill) {
			this.style.color = this.fill;
		}
		if (!this.weight) {
			if (this.variant === "heading") {
				this.weight = "bold";
			} else {
				this.weight = "regular";
			}
		}
		if (this.highlightedText) {
			return html`${unsafeHTML(this.highlightedText)}<slot
					@slotchange=${this.handleSlotChange}
					style="display:none"
				></slot>`;
		}
		/**
		 * Final html to render
		 */
		return html`<slot></slot>`;
	}

	protected async updated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
		super.updated(changedProperties);
		await this.updateComplete;
		if (this.highlight && this.highlight.trim() && !this.highlightedText) {
			let content = this.innerHTML;
			content = this.removeMarkTag(content);

			const regex = new RegExp(this.highlight, "gi");
			content = content.replace(regex, "<mark>$&</mark>");

			this.highlightedText = content;
		}
	}
	removeMarkTag(str: string) {
		return str.replace(/<\/?mark>/g, "");
	}

	handleSlotChange() {
		this.highlightedText = null;
		this.requestUpdate();
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-text": FText;
	}
}
