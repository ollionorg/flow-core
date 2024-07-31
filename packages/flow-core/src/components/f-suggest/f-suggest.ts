import { html, HTMLTemplateResult, nothing, PropertyValues, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import eleStyle from "./f-suggest.scss?inline";
import globalStyle from "./f-suggest-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";
import { FPopover } from "../f-popover/f-popover";
import { FInput } from "../f-input/f-input";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { classMap } from "lit-html/directives/class-map.js";
import { cloneDeep } from "lodash-es";
import { flowElement } from "./../../utils";
import { displayCustomTemplate, displayOptions, displayCategories } from "./display-options";
import { injectCss } from "@nonfx/flow-core-config";
injectCss("f-suggest", globalStyle);

export type FSuggestState = "primary" | "default" | "success" | "warning" | "danger";

export type FSuggestCustomEvent = {
	value?: string | FSuggestTemplate;
};

export type FSuggestSuffixWhen = (value: string) => boolean;

export type FSuggestSuggestionsCategory = Record<string, string[]>;

export type FSuggestTemplate<Type = unknown> = {
	value: Type;
	template: (value?: string) => HTMLTemplateResult;
	toString: () => string;
};

export type FSuggestWhen = (suggestion: string | FSuggestTemplate, value?: string) => boolean;

export type FSuggestSuggestions = string[] | FSuggestSuggestionsCategory | FSuggestTemplate[];

@flowElement("f-suggest")
export class FSuggest extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
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
	 * @attribute disable showing suggestions
	 */
	@property({ reflect: true, type: Boolean, attribute: "disable-suggestions" })
	disableSuggestions = false;

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
	@property({ reflect: true, type: String })
	prefix: string | null = null;

	/**
	 * @attribute Suffix property enables a string on the right side of the input box.
	 */
	@property({ reflect: true, type: String })
	suffix?: string;

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

	@property({ reflect: false, type: Function, attribute: "suggest-when" })
	suggestWhen: FSuggestWhen = (sg, value) => {
		if (typeof sg === "object") {
			return sg
				.toString()
				.toLocaleLowerCase()
				.includes(value?.toLocaleLowerCase() ?? "");
		}
		return sg.toLocaleLowerCase().includes(value?.toLocaleLowerCase() ?? "");
	};

	set ["suggest-when"](val: FSuggestWhen) {
		this.suggestWhen = val;
	}

	/**
	 * @attribute max height for options
	 */
	@property({ reflect: true, type: String, attribute: "options-max-height" })
	optionsMaxHeight?: string;
	/**
	 * input element reference
	 */
	@query("f-input")
	fInput!: FInput;

	/**
	 * popover element reference
	 */
	@query("f-popover")
	popOverElement?: FPopover;

	@query(".f-select-options-clickable")
	FSelectOptions?: FDiv;

	@state()
	currentIndex = -1;

	@state()
	currentCategoryIndex = 0;

	filteredSuggestions?: FSuggestSuggestions;

	/**
	 * emit input custom event
	 */
	handleInput(e: CustomEvent<{ value: string }>) {
		e.stopPropagation();
		this.value = e.detail.value;
		this.handleFocus();
		this.dispatchInputEvent(e.detail.value);
	}

	dispatchInputEvent(value?: string | FSuggestTemplate) {
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
		if (this.popOverElement) this.popOverElement.open = false;
		this.currentIndex = -1;
		this.currentCategoryIndex = 0;
		this.setAttribute("aria-expanded", "false");
	}
	handleFocus() {
		if (!this.disableSuggestions && this.popOverElement) {
			this.popOverElement.target = this.fInput.inputWrapperElement;
			this.popOverElement.offset = {
				mainAxis: 4
			};
			this.popOverElement.style.width = this.offsetWidth + "px";
			this.popOverElement.style.maxHeight = this.optionsMaxHeight ?? "600px";
			if (!this.loading) {
				this.popOverElement.open = true;
				this.setAttribute("aria-expanded", "true");
			}
		}
	}

	get filteredSuggestionsLength() {
		if (Array.isArray(this.filteredSuggestions)) {
			return this.filteredSuggestions.length;
		} else if (this.filteredSuggestions) {
			return Object.keys(this.filteredSuggestions).length;
		}

		return 0;
	}

	get anySuggestions() {
		return this.filteredSuggestionsLength > 0;
	}

	get isStringArraySuggestions() {
		return Array.isArray(this.suggestions);
	}

	get isTemplateArraySuggestions() {
		return (
			this.isStringArraySuggestions &&
			(this.suggestions as FSuggestTemplate[])?.every(
				item => typeof item === "object" && item !== null && !Array.isArray(item)
			)
		);
	}

	get isSearchComponent() {
		return this.getAttribute("data-suggest") === "search";
	}

	handleKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case "ArrowUp":
				event.preventDefault();
				this.navigateOptions(-1);
				break;
			case "ArrowDown":
				event.preventDefault();
				this.navigateOptions(1);
				break;
			case "Enter":
				event.preventDefault();
				this.selectOption();
				break;
			case "Escape":
				event.preventDefault();
				if (this.popOverElement) this.popOverElement.open = false;
				break;
		}
	}

	navigateOptions(direction: number) {
		if (this.isStringArraySuggestions) {
			const totalOptions = this.filteredSuggestions?.length;
			if (totalOptions === 0) return;

			// Calculate the next index based on the direction
			const newIndex = this.currentIndex + direction;

			// Ensure the new index stays within bounds
			this.currentIndex = (newIndex + (totalOptions as number)) % (totalOptions as number);

			// Optionally, you can scroll the dropdown to bring the selected option into view if it's outside the viewport.
			this.scrollFocusedOptionIntoView();
		} else {
			if (this.filteredSuggestions) {
				const totalCategories = Object.keys(this.filteredSuggestions).length;
				if (totalCategories === 0) return;

				const currentCategory = Object.keys(this.filteredSuggestions)[this.currentCategoryIndex];
				const totalOptions = (this.filteredSuggestions as FSuggestSuggestionsCategory)[
					currentCategory
				].length;

				// Calculate the next option index based on the direction
				const newIndex = this.currentIndex + direction;

				// Handle navigation within the current category
				if (newIndex >= 0 && newIndex < totalOptions) {
					this.currentIndex = newIndex;
				} else if (newIndex >= totalOptions) {
					// Move to the next category
					this.currentCategoryIndex = (this.currentCategoryIndex + 1) % totalCategories;
					this.currentIndex = 0; // Set the first option of the new category as focused
				} else {
					// Move to the previous category
					this.currentCategoryIndex =
						(this.currentCategoryIndex - 1 + totalCategories) % totalCategories;
					this.currentIndex =
						(this.filteredSuggestions as FSuggestSuggestionsCategory)[currentCategory].length - 1; // Set the last option of the new category as focused
				}

				// Optionally, you can scroll the dropdown to bring the selected option into view if it's outside the viewport.
				this.scrollFocusedOptionIntoView();
			}
		}
	}

	scrollFocusedOptionIntoView() {
		const optionElements = this.shadowRoot?.querySelectorAll(".f-select-options-clickable");
		if (optionElements) {
			if (optionElements.length > this.currentIndex) {
				optionElements[this.currentIndex].scrollIntoView({
					behavior: "auto", // 'auto' or 'smooth' for scrolling behavior
					block: "nearest" // Scroll to the nearest edge of the container
				});
			}
		}
	}

	selectOption() {
		if (this.isStringArraySuggestions) {
			if (this.filteredSuggestions) {
				if (this.currentIndex >= 0 && this.currentIndex < this.filteredSuggestionsLength) {
					const selectedOption = (this.filteredSuggestions as string[] | FSuggestTemplate[])[
						this.currentIndex
					];
					if (this.isTemplateArraySuggestions) {
						this.value = (selectedOption as FSuggestTemplate).toString();
					} else {
						this.value = selectedOption as string;
					}
					this.dispatchInputEvent(selectedOption);
					void this.handleBlur(false);
				}
			}
		} else {
			if (this.currentCategoryIndex >= 0 && this.currentIndex >= 0 && this.filteredSuggestions) {
				const selectedCategory = Object.keys(this.filteredSuggestions)[this.currentCategoryIndex];
				const selectedOption = (this.filteredSuggestions as FSuggestSuggestionsCategory)[
					selectedCategory
				][this.currentIndex];

				this.dispatchInputEvent(selectedOption);
				void this.handleBlur(false);
			}
		}
	}

	displayOptions = displayOptions;
	displayCategories = displayCategories;
	displayCustomTemplate = displayCustomTemplate;

	willUpdate(changedProperties: PropertyValues<this>) {
		if (changedProperties.has("value") || changedProperties.has("suggestions")) {
			if (this.value) {
				if (this.isStringArraySuggestions && !this.isTemplateArraySuggestions) {
					this.filteredSuggestions = (this.suggestions as string[])?.filter(sg =>
						this.suggestWhen(sg, this.value)
					);
				} else if (this.isTemplateArraySuggestions) {
					this.filteredSuggestions = (this.suggestions as FSuggestTemplate[])?.filter(sg =>
						this.suggestWhen(sg, this.value)
					);
				} else {
					const filtered = cloneDeep(this.suggestions) as FSuggestSuggestionsCategory;
					Object.entries(filtered).forEach(([objName, objValue]) => {
						filtered[objName] = objValue.filter(item => this.suggestWhen(item, this.value));
					});
					for (const key in filtered) {
						if (Array.isArray(filtered[key]) && !filtered[key].length) delete filtered[key];
					}
					this.filteredSuggestions = filtered;
				}
			} else {
				this.filteredSuggestions = this.suggestions;
			}
		} else if (this.value === undefined) {
			this.filteredSuggestions = this.suggestions;
		}
		super.willUpdate(changedProperties);
		this.role = "combobox";
		this.setAttribute("aria-expanded", "false");
		this.setAttribute("aria-haspopup", "false");
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
				aria-placeholder="${ifDefined(this.placeholder)}"
				aria-label="${ifDefined(this.getAttribute("aria-label") ?? undefined)}"
				@input=${this.handleInput}
				@focus=${this.handleFocus}
				@blur=${this.handleBlur}
				@keydown=${this.handleKeyDown}
				type="text"
				data-qa-element-id=${ifDefined(this.getAttribute("data-qa-element-id") ?? undefined)}
				icon-left=${ifDefined(this.iconLeft)}
				icon-right=${ifDefined(this.iconRight)}
				prefix=${ifDefined(this.prefix ?? undefined)}
				suffix=${ifDefined(this.suffix)}
				state=${ifDefined(this.state)}
				.maxLength=${this.maxLength}
				?loading=${this.loading}
				?disabled=${this.disabled}
				.clear=${this.clear}
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
			${!this.isSuggesstionsEmpty()
				? html` <f-popover .overlay=${false} .placement=${"bottom-start"} class="f-suggest-popover">
						<f-div direction="column" state="secondary">
							${this.filteredSuggestions && this.filteredSuggestionsLength > 0
								? this.getSuggestionHtml(this.filteredSuggestions)
								: html`<slot name="no-data"></slot>`}
						</f-div>
				  </f-popover>`
				: nothing}
		</f-div>`;
	}

	isSuggesstionsEmpty() {
		if (Array.isArray(this.suggestions)) {
			return this.suggestions.length === 0;
		} else if (typeof this.suggestions === "object") {
			return Object.keys(this.suggestions).length == 0;
		}
		return true;
	}

	getSuggestionHtml(suggestions: FSuggestSuggestions) {
		if (this.isStringArraySuggestions && !this.isTemplateArraySuggestions) {
			if (this.anySuggestions) {
				return this.displayOptions(suggestions as string[]);
			}
			return nothing;
		} else if (this.isTemplateArraySuggestions) {
			if (this.anySuggestions) {
				return this.displayCustomTemplate(suggestions as FSuggestTemplate[]);
			}
			return nothing;
		} else {
			return this.displayCategories(suggestions as FSuggestSuggestionsCategory);
		}
	}

	async handleSuggest(event: PointerEvent) {
		if (event.target && (event.target as FDiv).textContent) {
			this.value = (event.target as FDiv).textContent?.trim();
			this.dispatchInputEvent(this.value as string);
			this.dispatchSelectedEvent(this.value as string);
		}
		await this.handleBlur(false);
	}

	async handleSelect(sg: FSuggestTemplate) {
		this.value = sg.toString();
		this.dispatchInputEvent(sg.toString());
		this.dispatchSelectedEvent(sg);
		await this.handleBlur(false);
	}

	dispatchSelectedEvent(value: string | FSuggestTemplate) {
		const event = new CustomEvent<FSuggestCustomEvent>("selected", {
			detail: {
				value
			},
			bubbles: true,
			composed: true
		});

		this.dispatchEvent(event);
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
