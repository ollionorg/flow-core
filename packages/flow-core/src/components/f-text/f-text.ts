import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-text.scss";
import getCustomFillColor from "../../utils/get-custom-fill-color";
import { validateHTMLColor } from "validate-color";
import { validateHTMLColorName } from "validate-color";
import { flowElement } from "./../../utils";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { FIcon } from "../f-icon/f-icon";

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
	static styles = [unsafeCSS(eleStyle), ...FIcon.styles];

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

	@query(".pseudo-edit-text")
	editTextIcon!: HTMLDivElement;

	@state()
	highlightedText: string | null = null;

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
				value: this.innerTextValue.textContent
			},
			bubbles: true,
			composed: true
		});

		this.dispatchEvent(event);
	}

	handleEdit() {
		this.isTextInput = true;
	}

	handleSubmit() {
		this.isTextInput = false;
	}

	editOnHover(display: "flex" | "none") {
		if (this.editTextIcon) {
			this.editTextIcon.style.display = display;
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

		const highlightSnippet = html`${unsafeHTML(this.highlightedText)}<slot
				@slotchange=${this.handleSlotChange}
				style="display:none"
			></slot>`;

		const textareaSnippet = html`<span
			class="textarea"
			role="textbox"
			contenteditable
			.variant=${this.variant}
			.size=${this.size}
			.weight=${this.weight}
			@input=${this.handleInput}
			><div class="slot-text">${this.textContent ?? ""}</div>
			<div class="pseudo-submit-text">
				<f-icon
					source="i-tick"
					.size=${this.iconSize}
					state="success"
					clickable
					@click=${this.handleSubmit}
				></f-icon></div
		></span>`;

		const editableSnippet = html`<div class="non-editable-slot">
				${this.highlightedText ? highlightSnippet : html`<slot></slot>`}
			</div>
			<div class="pseudo-edit-text">
				<f-icon
					source="i-edit"
					state="primary"
					.size=${this.iconSize}
					clickable
					@click=${this.handleEdit}
				></f-icon>
			</div>`;

		if (this.editable) {
			return html`
				<div
					class="f-text-editable"
					@mouseenter=${() => this.editOnHover("flex")}
					@mouseleave=${() => this.editOnHover("none")}
				>
					${this.isTextInput ? textareaSnippet : editableSnippet}
				</div>
			`;
		} else if (this.highlightedText) {
			return highlightSnippet;
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
			let content = this.textContent;
			content = this.removeMarkTag(content ?? "");

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
