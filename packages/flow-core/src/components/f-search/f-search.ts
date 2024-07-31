import { html, HTMLTemplateResult, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, queryAssignedElements } from "lit/decorators.js";
import eleStyle from "./f-search.scss?inline";
import globalStyle from "./f-search-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";
import { FSelect } from "../f-select/f-select";
import { FSuggest } from "../f-suggest/f-suggest";
import { FIconButton } from "../f-icon-button/f-icon-button";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
import { ifDefined } from "lit-html/directives/if-defined.js";
injectCss("f-search", globalStyle);

export type FSearchState = "primary" | "default" | "success" | "warning" | "danger";

export type FSearchCustomEvent<Type = unknown> = {
	value: Type;
	scope: string;
};

export type FSearchSuffixWhen = (value: string) => boolean;

export type FSearchSuggestionsCategory = Record<string, string[]>;

export type FSearchOptionTemplate<Type = unknown> = {
	value: Type;
	template: (value?: string) => HTMLTemplateResult;
	toString: () => string;
};
export type FSearchResultWhen = (
	suggestion: string | FSearchOptionTemplate,
	value?: string
) => boolean;

export type FSearchSuggestions = string[] | FSearchSuggestionsCategory | FSearchOptionTemplate[];

export type FSearchScope = string[] | "none";

@flowElement("f-search")
export class FSearch extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FText.styles,
		...FDiv.styles,
		...FSuggest.styles,
		...FSelect.styles,
		...FIconButton.styles
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
	 * @attribute results to show on value
	 */
	@property({ reflect: true, type: String })
	result?: FSearchSuggestions = [];

	/**
	 * @attribute disable showing result
	 */
	@property({ reflect: true, type: Boolean, attribute: "disable-result" })
	disableResult = false;

	/**
	 * @attribute States are used to communicate purpose and connotations.
	 */
	@property({ reflect: true, type: String })
	state?: FSearchState = "default";

	/**
	 * @attribute f-input can have 2 sizes. By default size is inherited by the parent f-field.
	 */
	@property({ reflect: true, type: String })
	size?: "medium" | "small" = "medium";

	/**
	 * @attribute Defines the value of a f-search.
	 */
	@property({ reflect: true, type: String })
	value?: string;

	/**
	 * @attribute sets the value of scope in use
	 */
	@property({ reflect: true, type: String, attribute: "selected-scope" })
	selectedScope?: string;

	/**
	 * for vue2 camelcase support
	 */
	set ["selected-scope"](val: string) {
		this.selectedScope = val;
	}

	/**
	 * @attribute Defines the placeholder text
	 */
	@property({ reflect: true, type: String })
	placeholder?: string;

	/**
	 * @attribute Shows scope list if not none
	 */
	@property({ reflect: true, type: Array })
	scope?: FSearchScope = "none";

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
	 * @attribute Note: Provides an icon button to trigger the search query. Note: Search icon on left is not shown if search-button is true.
	 */
	@property({ reflect: true, type: Boolean })
	["search-button"]?: boolean = false;

	/**
	 * @attribute Loader icon .
	 */
	@property({ reflect: true, type: Boolean })
	loading?: boolean = false;

	/**
	 * to customize result
	 */
	@property({ reflect: false, type: Function, attribute: "result-when" })
	resultWhen: FSearchResultWhen = (sg, value) => {
		if (typeof sg === "object") {
			return sg
				.toString()
				.toLocaleLowerCase()
				.includes(value?.toLocaleLowerCase() ?? "");
		}
		return sg.toLocaleLowerCase().includes(value?.toLocaleLowerCase() ?? "");
	};

	set ["result-when"](val: FSearchResultWhen) {
		this.resultWhen = val;
	}

	/**
	 * @attribute max height for options
	 */
	@property({ reflect: true, type: String, attribute: "result-max-height" })
	resultMaxHeight?: string;

	@query("slot[name='label']")
	labelSlot!: HTMLElement;

	@query("slot[name='description']")
	descriptionSlot!: HTMLElement;

	@query("slot[name='help']")
	helpSlot!: HTMLElement;

	@query("#header-section")
	headerSection!: FDiv;

	@query("#helper-text-section")
	helperTextSection!: FDiv;

	@query("f-suggest")
	suggestElement!: FSuggest;

	/**
	 * @attribute assigned elements inside slot label
	 */
	@queryAssignedElements({ slot: "label" })
	_labelNodes!: NodeListOf<HTMLElement>;

	/**
	 * @attribute assigned elements inside slot description
	 */
	@queryAssignedElements({ slot: "description" })
	_descriptionNodes!: NodeListOf<HTMLElement>;

	/**
	 * @attribute assigned elements inside slot help
	 */
	@queryAssignedElements({ slot: "help" })
	_helpNodes!: NodeListOf<HTMLElement>;

	/**
	 * has label slot
	 */
	get hasLabel() {
		return this._labelNodes.length > 0;
	}

	/**
	 * has description slot
	 */
	get hasDescription() {
		return this._descriptionNodes.length > 0;
	}

	/**
	 * has help slot
	 */
	get hasHelperText() {
		return this._helpNodes.length > 0;
	}
	/**
	 * emit input custom event
	 */
	handleInput(e: CustomEvent<{ value: unknown }>) {
		e.stopPropagation();
		if (e.detail.value) {
			if (typeof e.detail.value === "object") {
				this.value = (e.detail.value as FSearchOptionTemplate)?.toString();
			} else {
				this.value = String(e.detail.value);
			}
		} else {
			this.value = undefined;
		}
		this.dispatchInputEvent(e.detail.value, this.selectedScope);
	}

	/**
	 * emit input custom event for scope
	 */
	handleScopeSelection(e: CustomEvent<{ value: string }>) {
		e.stopPropagation();
		this.selectedScope = e.detail.value;
		this.dispatchInputEvent(this.value ?? "", e.detail.value);
	}

	/**
	 * emit search custom event
	 */
	handleSearchClick(e: CustomEvent) {
		e.stopPropagation();
		const event = new CustomEvent("search", {
			detail: {
				value: this.value,
				search: true
			},
			bubbles: true,
			composed: true
		});

		this.dispatchEvent(event);
	}

	/**
	 * clear input value on clear icon clicked
	 */
	clearInputValue() {
		this.value = "";
		this.dispatchInputEvent("", this.selectedScope);
	}

	/**
	 *
	 * @param value string for value
	 * @param scope string for scope value
	 */
	dispatchInputEvent(value: any, scope = "") {
		const event = new CustomEvent<FSearchCustomEvent>("input", {
			detail: {
				value: value,
				scope: scope
			},
			bubbles: true,
			composed: true
		});

		this.dispatchEvent(event);
	}

	/**
	 * set styling class
	 */
	get applyStyling() {
		return this.scope !== "none"
			? this["search-button"]
				? "f-search-border-button"
				: "f-search-border"
			: this["search-button"]
			? "f-search-suggest-button"
			: "f-search-suggest";
	}

	/**
	 * conditional help section display for false spacing issue
	 */
	displayHelpSection() {
		if (!this.hasHelperText) {
			this.helperTextSection.style.display = "none";
		} else {
			this.helperTextSection.style.display = "";
		}
	}

	/**
	 * conditional header section display for false spacing issue
	 */
	displayHeaderSection() {
		if (!this.hasLabel && !this.hasDescription) {
			this.headerSection.style.display = "none";
		} else {
			this.headerSection.style.display = "";
		}
		if (!this.hasLabel) {
			this.labelSlot.style.display = "none";
		}
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "search";
		if (this.placeholder) this.setAttribute("aria-placeholder", this.placeholder);
	}
	render() {
		return html` <f-div
			width="100%"
			?disabled=${this.disabled}
			direction="column"
			gap="x-small"
			height="hug-content"
			class="f-search-wrapper"
		>
			<f-div padding="none" direction="column" width="fill-container" id="header-section">
				<f-div padding="none" gap="auto" direction="row" height="hug-content">
					<f-div
						padding="none"
						gap="small"
						direction="row"
						width="hug-content"
						height="hug-content"
						id="label-slot"
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
			<f-div direction="row" height="hug-content">
				${this.scope !== "none" && (this.scope as string[])?.length > 0
					? html` <f-div width="hug-content" style="min-width:150px">
							<f-select
								aria-label="Scope of ${this.getAttribute("aria-label")}"
								class="f-search-border"
								.options=${this.scope ?? []}
								.variant=${this.variant}
								.category=${this.category}
								placeholder="Search by"
								.state=${this.state}
								.size=${this.size}
								.value=${this.selectedScope}
								@input=${this.handleScopeSelection}
							></f-select
					  ></f-div>`
					: ""}
				<f-div>
					<f-suggest
						class=${this.applyStyling}
						data-suggest="search"
						aria-label="Input of ${this.getAttribute("aria-label")}"
						data-qa-element-id=${ifDefined(this.getAttribute("data-qa-element-id") ?? undefined)}
						.value=${this.value}
						.variant=${this.variant}
						.category=${this.category}
						.placeholder=${this.placeholder ?? "Search"}
						.suggestions=${this.result}
						.disableSuggestions=${this.disableResult}
						icon-left=${this["search-button"] ? "" : "i-search"}
						.state=${this.state}
						?clear=${this.clear}
						?loading=${this.loading}
						.size=${this.size}
						.suggestWhen=${this.resultWhen}
						.optionsMaxHeight=${this.resultMaxHeight}
						@input=${this.handleInput}
					>
						<slot name="no-data" slot="no-data"> </slot>
					</f-suggest>
				</f-div>
				${this["search-button"]
					? html` <f-icon-button
							class="f-search-border"
							icon="i-search"
							.variant=${this.variant}
							.size=${this.size}
							.state=${this.state === "default" ? "primary" : this.state}
							@click=${this.handleSearchClick}
					  ></f-icon-button>`
					: ""}
			</f-div>
			<f-div direction="column" id="helper-text-section"><slot name="help"></slot> </f-div>
		</f-div>`;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
		super.updated(changedProperties);
		this.displayHelpSection();
		this.displayHeaderSection();
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-search": FSearch;
	}
}
