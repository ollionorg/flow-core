import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import eleStyle from "./f-text-area.scss?inline";
import globalStyle from "./f-text-area-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
injectCss("f-text-area", globalStyle);

export type FTextAreaState = "primary" | "default" | "success" | "warning" | "danger";

export type FTextAreaCustomEvent = {
	value: string;
};

@flowElement("f-text-area")
export class FTextArea extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle), ...FText.styles, ...FDiv.styles];

	/**
	 * @attribute value to be inserted in text-area.
	 */
	@property({ reflect: true, type: String })
	value?: string;

	/**
	 * @attribute categories are of three types.
	 */
	@property({ reflect: true, type: String })
	category?: "fill" | "transparent" | "outline" = "fill";

	/**
	 * @attribute States are used to communicate purpose and connotations.
	 */
	@property({ reflect: true, type: String })
	state?: FTextAreaState = "default";

	/**
	 * @attribute f-text-area can have 2 sizes.
	 */
	@property({ reflect: true, type: String })
	size?: "small" | "medium";

	/**
	 * @attribute Defines the  no. of rows to display. By default f-text-area provides 3 rows. After 3 rows text area becomes scrollable.
	 */
	@property({ reflect: true, type: String })
	rows?: string;

	/**
	 * @attribute Defines the placeholder text for f-text-area.
	 */
	@property({ reflect: true, type: String })
	placeholder?: string;

	/**
	 * @attribute This shows the character count while typing and auto limits after reaching the max length.
	 */
	@property({ reflect: true, type: String, attribute: "max-length" })
	maxLength?: string;

	/**
	 * @attribute Provides a resize handle on the bottom right of text-area which enables a user to resize the text-area within the parents scope.
	 */
	@property({ reflect: true, type: Boolean })
	resizable?: boolean = false;

	/**
	 * @attribute Displays a close icon-button on the right side of the input that allows the user to clear the input value
	 */
	@property({ reflect: true, type: Boolean })
	clear?: boolean = true;

	/**
	 * @attribute Displays a close icon-button on the right side of the input that allows the user to clear the input value
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * @attribute Only Text could be read, can't be edited
	 */
	@property({ reflect: true, type: Boolean, attribute: "read-only" })
	readOnly?: boolean = false;

	/**
	 * @attribute mask value of text area
	 */
	@property({ reflect: true, type: Boolean, attribute: "mask-value" })
	maskValue?: boolean = false;

	/**
	 * emit event
	 */
	handleInput(e: InputEvent) {
		e.stopPropagation();
		if (this.maskValue) {
			let currentvalue = this.value ?? "";
			if (e.data === null && e.inputType === "insertLineBreak") {
				currentvalue += "\n";
			} else if (e.data === null && e.inputType === "deleteContentBackward") {
				currentvalue = currentvalue.substring(0, currentvalue.length - 1);
			} else if (e.data === null && e.inputType === "insertFromPaste") {
				let val = (e.target as HTMLInputElement)?.value;

				if (this.value) {
					for (let i = 0; i < this.value.length; i++) {
						const idx = val.indexOf("·");
						if (idx >= 0) {
							val = this.replaceCharacter(val, idx, this.value.charAt(i));
						}
					}
				}
				currentvalue = val;
			} else if (e.data !== null) {
				currentvalue += e.data;
			}
			const event = new CustomEvent<FTextAreaCustomEvent>("input", {
				detail: {
					value: currentvalue
				},
				bubbles: true,
				composed: true
			});
			this.value = currentvalue;
			this.dispatchEvent(event);
		} else {
			const event = new CustomEvent<FTextAreaCustomEvent>("input", {
				detail: {
					value: (e.target as HTMLInputElement)?.value
				},
				bubbles: true,
				composed: true
			});
			this.value = (e.target as HTMLInputElement)?.value;
			this.dispatchEvent(event);
		}
	}

	replaceCharacter(string: string, index: number, replacement: string) {
		return string.slice(0, index) + replacement + string.slice(index + replacement.length);
	}

	/**
	 * clear value inside f-text-area on click of clear icon.
	 */
	clearValue() {
		const event = new CustomEvent<FTextAreaCustomEvent>("input", {
			detail: {
				value: ""
			},
			bubbles: true,
			composed: true
		});
		this.value = "";
		this.dispatchEvent(event);
		this.requestUpdate();
	}

	/**
	 * apply styles
	 */
	applyStyles(parent: HTMLElement | "") {
		if (parent && parent.style.height) {
			return `max-height: ${parent.style.height}`;
		} else {
			return `max-height: inherit`;
		}
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "textbox";
		this.ariaMultiLine = "true";
		if (this.placeholder) this.setAttribute("aria-placeholder", this.placeholder);
	}
	render() {
		const parentDiv = this.parentElement?.tagName === "F-DIV" ? this.parentElement : "";
		/**
		 * Final html to render
		 */

		return html`
			<f-div
				padding="none"
				class="f-text-area-root"
				?disabled=${this.disabled}
				gap="x-small"
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
								<slot name="label"></slot>
								<slot name="icon-tooltip"></slot>
							</f-div>
							<f-div width="hug-content">
								<slot name="subtitle"></slot>
							</f-div>
						</f-div>
						<slot name="description"></slot>
					</f-div>
					<f-div padding="none" gap="none" width="hug-content">
						${this.maxLength
							? html` <f-text variant="para" size="small" weight="regular" state="secondary"
									>${this.value?.length ?? 0} / ${this.maxLength}</f-text
							  >`
							: null}
					</f-div>
				</f-div>
				<div class="f-text-area-wrapper">
					<textarea
						class="f-text-area"
						data-qa-id=${this.getAttribute("data-qa-element-id")}
						style=${this.applyStyles(parentDiv)}
						state=${this.state}
						size=${this.size}
						placeholder=${this.placeholder}
						category=${this.category}
						rows=${this.rows ?? "3"}
						maxlength=${this.maxLength}
						?resizable=${this.resizable}
						?readonly=${this.readOnly}
						?mask-value=${this.maskValue}
						spellcheck=${this.maskValue ? "false" : "true"}
						@input=${this.handleInput}
						.value=${this.maskValue ? this.getDots() : this.value ?? ""}
					></textarea>
					${this.clear && this.value
						? html` <f-icon
								class="f-text-area-clear-icon"
								source="i-close"
								clickable
								size="x-small"
								@click=${this.clearValue}
						  ></f-icon>`
						: null}
				</div>
				<slot name="help"></slot>
			</f-div>
		`;
	}

	getDots() {
		return this.value?.replace(/[^\n]/g, "·");
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-text-area": FTextArea;
	}
}
