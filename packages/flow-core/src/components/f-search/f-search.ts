import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, queryAssignedElements } from "lit/decorators.js";
import eleStyle from "./f-search.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";
import { FSelect } from "../f-select/f-select";
import { FSuggest } from "../f-suggest/f-suggest";
import { FIconButton } from "../f-icon-button/f-icon-button";
import { flowElement } from "./../../utils";

export type FSearchState = "primary" | "default" | "success" | "warning" | "danger";

export type FSearchCustomEvent = {
	value: string;
	scope: string;
};

export type FSearchSuffixWhen = (value: string) => boolean;

export type FSearchSuggestions = string[];

export type FSearchScope = string[] | "none";

@flowElement("f-search")
export class FSearch extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
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
	@property({ reflect: true, type: String })
	["selected-scope"]?: string;

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
	handleInput(e: CustomEvent) {
		e.stopPropagation();
		this.value = e.detail.value;
		this.dispatchInputEvent(e.detail.value, this["selected-scope"]);
	}

	/**
	 * emit input custom event for scope
	 */
	handleScopeSelection(e: CustomEvent) {
		e.stopPropagation();
		this["selected-scope"] = e.detail.value;
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
		this.dispatchInputEvent("", this["selected-scope"]);
	}

	/**
	 *
	 * @param value string for value
	 * @param scope string for scope value
	 */
	dispatchInputEvent(value: string, scope = "") {
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
	render() {
		return html` <f-div
			width="100%"
			?disabled=${this.disabled}
			direction="column"
			gap="x-small"
			height="hug-content"
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
					? html` <f-select
							class="f-search-border"
							.options=${this.scope ?? []}
							.variant=${this.variant}
							.category=${this.category}
							placeholder="Search by"
							width="140"
							.state=${this.state}
							.size=${this.size}
							.value=${this["selected-scope"]}
							@input=${this.handleScopeSelection}
					  ></f-select>`
					: ""}
				<f-div>
					<f-suggest
						class=${this.applyStyling}
						data-suggest="search"
						.value=${this.value}
						.variant=${this.variant}
						.category=${this.category}
						.placeholder=${this.placeholder ?? "Search"}
						.suggestions=${this.result}
						icon-left=${this["search-button"] ? "" : "i-search"}
						.state=${this.state}
						?clear=${this.clear}
						.size=${this.size}
						@input=${this.handleInput}
					>
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
	protected async updated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
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
