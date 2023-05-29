import { html, nothing, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import eleStyle from "./f-suggest.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";
import { FPopover } from "../f-popover/f-popover";
import { FInput } from "../f-input/f-input";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { classMap } from "lit-html/directives/class-map.js";
import _ from "lodash";
import { flowElement } from "./../../utils";

export type FSuggestState = "primary" | "default" | "success" | "warning" | "danger";

export type FSuggestCustomEvent = {
	value: string;
};

export type FSuggestSuffixWhen = (value: string) => boolean;

export type FSuggestSuggestionsCategory = Record<string, string[]>;

export type FSuggestSuggestions = string[] | FSuggestSuggestionsCategory;

@flowElement("f-suggest")
export class FSuggest extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		...FText.styles,
		...FDiv.styles,
		...FPopover.styles,
		...FInput.styles
	];

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
	 * @attribute suggestions to show on value
	 */
	@property({ reflect: false, type: Array })
	suggestions?: FSuggestSuggestions = [];

	/**
	 * @attribute States are used to communicate purpose and connotations.
	 */
	@property({ reflect: true, type: String })
	state?: FSuggestState = "default";

	/**
	 * @attribute f-input can have 2 sizes. By default size is inherited by the parent f-field.
	 */
	@property({ reflect: true, type: String })
	size?: "medium" | "small" = "medium";

	/**
	 * @attribute Defines the value of an f-input. Validation rules are applied on the value depending on the type property of the f-text-input.
	 */
	@property({ reflect: true, type: String })
	value?: string;

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
	@property({ reflect: true, type: String, attribute: "prefix" })
	fInputPrefix?: string;

	/**
	 * @attribute Suffix property enables a string on the right side of the input box.
	 */
	@property({ reflect: true, type: String, attribute: "suffix" })
	fInputSuffix?: string;

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
	suffixWhen?: FSuggestSuffixWhen;

	/**
	 * input element reference
	 */
	@query("f-input")
	fInput!: FInput;

	/**
	 * popover element reference
	 */
	@query("f-popover")
	popOverElement!: FPopover;

	/**
	 * emit input custom event
	 */
	handleInput(e: CustomEvent) {
		e.stopPropagation();
		this.value = e.detail.value;
		this.dispatchInputEvent(e.detail.value);
	}

	/**
	 * clear input value on clear icon clicked
	 */
	clearInputValue() {
		this.value = "";
		this.dispatchInputEvent("");
	}

	dispatchInputEvent(value: string) {
		const event = new CustomEvent<FSuggestCustomEvent>("input", {
			detail: {
				value
			},
			bubbles: true,
			composed: true
		});

		this.dispatchEvent(event);
	}
	async handleBlur(wait = true) {
		// waiting if it is normal blur or selection blur, otherwise value not updated
		if (wait) {
			await new Promise(resolve => setTimeout(resolve, 200));
		}
		this.popOverElement.open = false;
	}
	handleFocus() {
		this.popOverElement.target = this.fInput.inputWrapperElement;
		this.popOverElement.offset = {
			mainAxis: 4
		};
		this.popOverElement.style.width = this.offsetWidth + "px";
		this.popOverElement.style.maxHeight = "300px";
		this.popOverElement.open = true;
	}
	get anySuggestions() {
		const suggestionsCount = this.filteredSuggestions?.length ?? 0;
		return suggestionsCount > 0;
	}

	get isSuggestionArray() {
		return Array.isArray(this.suggestions);
	}

	get filteredSuggestions() {
		if (this.value) {
			if (this.isSuggestionArray) {
				return (this.suggestions as string[])?.filter(sg => sg.includes(this.value as string));
			} else {
				const filtered = _.cloneDeep(this.suggestions) as FSuggestSuggestionsCategory;
				Object.entries(filtered).forEach(([objName, objValue]) => {
					filtered[objName] = objValue.filter(item => item.includes(this.value as string));
				});
				for (const key in filtered) {
					if (Array.isArray(filtered[key]) && !filtered[key].length) delete filtered[key];
				}
				return filtered;
			}
		}
		return this.suggestions;
	}

	get isSearchComponent() {
		return this.getAttribute("data-suggest") === "search";
	}

	render() {
		// classes to apply on inner element
		const classes: Record<string, boolean> = {};
		// merging host classes
		this.classList.forEach(cl => {
			classes[cl] = true;
		});
		return html` <f-div direction="column" width="100%"
			><f-input
				class=${classMap(classes)}
				.value=${this.value}
				.variant=${this.variant}
				.category=${this.category}
				.placeholder=${this.placeholder}
				@input=${this.handleInput}
				@focus=${this.handleFocus}
				@blur=${this.handleBlur}
				type="text"
				data-qa-element-id=${this.getAttribute("data-qa-element-id")}
				icon-left=${this.iconLeft}
				icon-right=${this.iconRight}
				prefix=${this.prefix}
				suffix=${this.fInputSuffix}
				state=${this.state}
				.maxLength=${ifDefined(this.maxLength)}
				?loading=${this.loading}
				?disabled=${this.disabled}
				?clear=${this.clear}
				?read-only=${this.readOnly}
				.size=${this.size}
			>
				${this.isSearchComponent
					? ""
					: html` <f-div slot="label"><slot name="label"></slot></f-div>
							<f-div slot="description"><slot name="description"></slot></f-div>
							<f-div slot="help"><slot name="help"></slot></f-div>
							<f-div slot="icon-tooltip"><slot name="icon-tooltip"></slot></f-div
							><f-div slot="subtitle"><slot name="subtitle"></slot></f-div>`}
			</f-input>
			<f-popover .overlay=${false} .placement=${"bottom-start"} class="f-suggest-popover">
				<f-div direction="column" state="secondary">
					${this.getSuggestionHtml(this.filteredSuggestions ?? [])}
				</f-div>
			</f-popover>
		</f-div>`;
	}

	getSuggestionHtml(suggestions: FSuggestSuggestions) {
		if (this.isSuggestionArray) {
			if (this.anySuggestions) {
				return html`<f-div height="hug-content" direction="column"
					>${(suggestions as string[]).map(sg => {
						return html`<f-div
							class="f-select-options-clickable"
							height="hug-content"
							@click=${this.handleSuggest}
							clickable
							padding="medium"
						>
							<f-div direction="row" gap="medium">
								${this.isSearchComponent ? html` <f-icon source="i-search"></f-icon>` : ""}
								<f-text variant="para" size="small" weight="regular"> ${unsafeHTML(sg)} </f-text>
							</f-div>
						</f-div>`;
					})}</f-div
				>`;
			}
			return nothing;
		} else {
			return Object.entries(suggestions as FSuggestSuggestionsCategory).map(
				([objName, objValue]) => {
					return html`<f-div
						padding="none"
						height="hug-content"
						width="fill-container"
						direction="column"
						align="middle-left"
						border="small solid default bottom"
						><f-div
							padding="medium"
							height="hug-content"
							width="fill-container"
							align="middle-left"
							direction="row"
							><f-text variant="para" size="small" weight="regular" state="secondary"
								>${objName}</f-text
							></f-div
						>
						${objValue.map(item => {
							return html`<f-div
								class="f-select-options-clickable"
								padding="medium"
								height="hug-content"
								width="fill-container"
								direction="row"
								?clickable=${true}
								align="middle-left"
								gap="small"
								@click=${this.handleSuggest}
							>
								<f-div direction="row" gap="medium">
									${this.isSearchComponent ? html` <f-icon source="i-search"></f-icon>` : ""}
									<f-text variant="para" size="small" weight="regular">
										${unsafeHTML(item)}
									</f-text>
								</f-div>
							</f-div>`;
						})}
					</f-div>`;
				}
			);
		}
	}

	async handleSuggest(event: PointerEvent) {
		if (event.target && (event.target as FDiv).textContent) {
			this.value = (event.target as FDiv).textContent?.trim();

			this.dispatchInputEvent(this.value as string);
		}
		await this.handleBlur(false);
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-suggest": FSuggest;
	}
}
