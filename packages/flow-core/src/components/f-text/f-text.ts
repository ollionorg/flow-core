import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-text.scss?inline";
import globalStyle from "./f-text-global.scss?inline";
import getCustomFillColor from "../../utils/get-custom-fill-color";
import { validateHTMLColor } from "validate-color";
import { validateHTMLColorName } from "validate-color";
import { flowElement } from "./../../utils";
import { FIcon } from "../f-icon/f-icon";
import { injectCss } from "@nonfx/flow-core-config";
import Mark from "mark.js/dist/mark.es6.min";
injectCss("f-text", globalStyle);

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
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle), ...FIcon.styles];

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
	 * @attribute f-text converts into an editable section .
	 */
	@property({ reflect: true, type: Boolean })
	editable?: boolean = false;

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

	@query(".slot-text")
	innerTextValue!: HTMLDivElement;

	@query(".textarea")
	spanEditable!: HTMLSpanElement;

	@query(".pseudo-edit-text")
	editTextIcon!: HTMLDivElement;

	@state()
	isTextInput = false;

	get iconSize() {
		return this.size === "x-small" ? "x-small" : "small";
	}

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

	handleInput(e: InputEvent) {
		e.stopPropagation();

		const event = new CustomEvent("input", {
			detail: {
				value: this.spanEditable?.textContent?.trim()
			},
			bubbles: true,
			composed: true
		});
		this.showEmptyPlaceholder();

		this.dispatchEvent(event);
	}

	handleEdit() {
		this.isTextInput = true;
	}

	handleSubmit(e: MouseEvent) {
		e.stopPropagation();
		this.isTextInput = false;
	}

	editOnHover(display: "flex" | "none") {
		if (this.editTextIcon) {
			this.editTextIcon.style.display = display;
		}
	}

	showEmptyPlaceholder() {
		if (this.isTextInput) {
			this.spanEditable.dataset.isEmpty = String(this.spanEditable?.textContent?.trim() === "");
		}
	}

	get headerLevel() {
		switch (this.size) {
			case "x-large":
				return "1";
			case "large":
				return "2";
			case "medium":
				return "3";
			case "small":
				return "4";
			case "x-small":
				return "4";
			default:
				return "3";
		}
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		if (!this.role) {
			if (this.variant === "heading") {
				this.role = "heading";
				this.setAttribute("aria-level", this.headerLevel);
			} else {
				this.role = "paragraph";
			}
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
		if (this.fill && this.fill.trim() !== "") {
			this.style.color = this.fill;
		} else {
			this.style.removeProperty("color");
		}
		if (!this.weight) {
			if (this.variant === "heading") {
				this.weight = "bold";
			} else {
				this.weight = "regular";
			}
		}

		const textareaSnippet = html` <div class="textarea-wrapper">
			<span
				class="textarea"
				role="textbox"
				contenteditable=${true}
				.variant=${this.variant}
				.size=${this.size}
				.weight=${this.weight}
				@input=${this.handleInput}
				data-placeholder="Enter Your Text here"
			>
				<div class="slot-text">${this.textContent ?? ""}</div>
			</span>
			<div class="pseudo-submit-text">
				<f-icon
					source="i-tick"
					.size=${this.iconSize}
					state="success"
					clickable
					@click=${this.handleSubmit}
				></f-icon>
			</div>
		</div>`;

		const editableSnippet = html`<div class="non-editable-slot">
			<slot></slot>
		</div>`;

		if (this.editable) {
			return html`
				<div
					class="f-text-editable"
					?data-hover=${!this.isTextInput}
					@click=${this.handleEdit}
					@focusout=${this.handleSubmit}
					@mouseenter=${() => this.editOnHover("flex")}
					@mouseleave=${() => this.editOnHover("none")}
				>
					${this.isTextInput ? textareaSnippet : editableSnippet}
				</div>
			`;
		}

		/**
		 * Final html to render
		 */
		return html`<slot></slot>`;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		void this.updateComplete.then(() => {
			this.showEmptyPlaceholder();
			if (changedProperties.has("highlight")) {
				const markInstance = new Mark(this);

				markInstance.unmark();
				if (this.highlight && this.highlight.trim()) {
					markInstance.mark(this.highlight);
				}
			}
			if (this.isTextInput) {
				this.spanEditable?.focus();
				this.moveCursorToEnd(this.spanEditable);
			}
		});
	}

	handleSlotChange() {
		this.requestUpdate();
	}

	moveCursorToEnd(el: HTMLSpanElement) {
		if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
			const range = document.createRange();
			range.selectNodeContents(el);
			range.collapse(false);
			const sel = window.getSelection();
			sel?.removeAllRanges();
			sel?.addRange(range);
		}
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
