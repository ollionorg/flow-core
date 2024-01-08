import { HTMLTemplateResult, PropertyValues, unsafeCSS } from "lit";
import { property, query, queryAll, queryAssignedElements, state } from "lit/decorators.js";
import eleStyle from "./f-select.scss?inline";
import globalStyle from "./f-select-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";
import { FIcon } from "../f-icon/f-icon";
import { cloneDeep } from "lodash-es";
import render, { renderSingleSelection, renderMultipleSelectionTag } from "./render";
import {
	handleDropDownOpen,
	handleDropDownClose,
	handleOptionSelection,
	handleSelectionGroup,
	handleRemoveGroupSelection,
	handleCheckboxInput,
	handleCheckboxGroup,
	handleSelectAll,
	handleViewMoreTags,
	handleInput,
	handleBlur,
	handleKeyDown,
	handleOptionMouseOver
} from "./handlers";
import { FIconButton } from "../f-icon-button/f-icon-button";
import { flowElement } from "./../../utils";
import { injectCss } from "@ollion/flow-core-config";
injectCss("f-select", globalStyle);

export type FSelectState = "primary" | "default" | "success" | "warning" | "danger";
export type FSelectHeightProp = number;
export type FSelectWidthProp = "fill-container" | `${number}`;
export type FSelectArrayOfStrings = string[];
export type FSelectOptionObject<T extends Record<string, unknown> = Record<string, unknown>> = {
	icon?: string;
	title: string;
	data?: T;
	qaId?: string;
	disabled?: boolean;
};
export type FSelectOptionsGroup = { [key: string]: FSelectOptionsProp };
export type FSelectArrayOfObjects = FSelectOptionObject[];
export type FSelectArray = FSelectSingleOption[];
export type FSelectOptionsProp = FSelectSingleOption[];
export type FSelectSingleOption = FSelectOptionObject | string;
export type FSelectOptions = FSelectOptionsProp | FSelectOptionsGroup;
export type FSelectValue = FSelectOptions | FSelectSingleOption;
export type FSelectOptionTemplate = (
	option: FSelectSingleOption,
	isSelected?: boolean
) => HTMLTemplateResult;

export type FSelectCustomEvent = {
	value: unknown;
	searchValue?: string;
};

export type FSelectCreateOptionEvent = {
	value: string;
	options?: FSelectOptions;
};

@flowElement("f-select")
export class FSelect extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FText.styles,
		...FDiv.styles,
		...FIcon.styles,
		...FIconButton.styles
	];

	@queryAssignedElements({ slot: "label" })
	_labelNodes!: NodeListOf<HTMLElement>;

	@state()
	_hasLabel = false;

	@queryAssignedElements({ slot: "help" })
	_helpNodes!: NodeListOf<HTMLElement>;

	@state()
	_hasHelperText = false;

	/**
	 * @attribute local state for dropdown open and close boolean
	 */
	@state({})
	openDropdown = false;

	/**
	 * @attribute Multiple tags View/Hide
	 */
	@state({})
	viewMoreTags = false;

	/**
	 * @attribute local state for typing string and searching in f-select
	 */
	@state({})
	searchValue = "";

	/**
	 * @attribute local state for options selected
	 */
	@state({})
	selectedOptions: FSelectOptions = [];

	/**
	 * @attribute local state for filtered options on search
	 */
	@state({})
	filteredOptions: FSelectOptions = [];

	@state({})
	optimizedHeight = 0;

	@state({})
	preferredOpenDirection = "below";

	@state({})
	optionsTop = "";

	@state({})
	optionsBottom = "";

	@query("#f-select")
	inputElement!: HTMLInputElement;

	@query("#f-select-wrapper")
	wrapperElement!: HTMLDivElement;

	@query("#f-select-options")
	optionElement!: HTMLDivElement;

	@queryAll(".f-select-options-clickable:not([disabled])")
	allOptions?: NodeListOf<HTMLElement>;

	/**
	 * @attribute Categories are various visual representations of an input field.
	 */
	@property({ reflect: true, type: String })
	type?: "single" | "multiple" = "single";

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
	 * @attribute States are used to communicate purpose and connotations.
	 */
	@property({ reflect: true, type: String })
	state?: FSelectState = "default";

	/**
	 * @attribute f-select can have 2 sizes. By default size is inherited by the parent f-field.
	 */
	@property({ reflect: true, type: String })
	size?: "medium" | "small";

	/**
	 * @attribute Defines the value of an f-select. Validation rules are applied on the value depending on the type property of the f-text-input.
	 */
	@property({ reflect: true, type: Object })
	value?: FSelectValue;

	/**
	 * @attribute Defines the placeholder text for f-text-input
	 */
	@property({ reflect: true, type: Object })
	options!: FSelectOptions;

	/**
	 * @attribute Defines the placeholder text for f-text-input
	 */
	@property({ reflect: true, type: String })
	placeholder?: string;

	/**
	 * @attribute Defines the placeholder text for f-text-input
	 */
	@property({ reflect: false, type: Function, attribute: "option-template" })
	optionTemplate?: FSelectOptionTemplate;

	set ["option-template"](val: FSelectOptionTemplate | undefined) {
		this.optionTemplate = val;
	}

	/**
	 * @attribute Icon-left enables an icon on the left of the input value.
	 */
	@property({ reflect: true, type: String, attribute: "icon-left" })
	iconLeft?: string;

	/**
	 * @attribute height of `f-select`
	 */
	@property({ type: String, reflect: true })
	height: FSelectHeightProp = 180;

	/**
	 * @attribute width of `f-select`
	 */
	@property({ type: String, reflect: true })
	width?: FSelectWidthProp = "fill-container";

	/**
	 * @attribute Loader icon replaces the content of the button .
	 */
	@property({ reflect: true, type: Boolean })
	loading?: boolean = false;

	/**
	 * @attribute Shows disabled state of  select element
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * @attribute defines whether user can search within the options or not .
	 */
	@property({ reflect: true, type: Boolean })
	searchable?: boolean = false;

	/**
	 * @attribute  a ‘close’ icon button appear on right of the select to clear the input value(s).
	 */
	@property({ reflect: true, type: Boolean })
	clear?: boolean = false;

	/**
	 * @attribute options with checkboxes.
	 */
	@property({ reflect: true, type: Boolean })
	checkbox?: boolean = false;

	/**
	 * @attribute when on search no option is presnt, show create new button
	 */
	@property({ reflect: true, type: Boolean, attribute: "create-option" })
	createOption?: boolean = false;

	/**
	 * @attribute when on search no option is presnt, and on click of create-button, for array of strings, auto-addition of option toggle
	 */
	@property({ reflect: true, type: Boolean, attribute: "auto-add-option" })
	autoAddOption?: boolean = true;

	/**
	 * @attribute limit to show the selection tags inside f-select.
	 */
	@property({ reflect: true, type: Number, attribute: "selection-limit" })
	selectionLimit = 2;

	/**
	 * icon size
	 */
	get iconSize() {
		if (this.size === "medium") return "small";
		else if (this.size === "small") return "x-small";
		else return undefined;
	}
	outsideClick = (e: MouseEvent) => {
		if (!this.contains(e.target as HTMLInputElement) && this.openDropdown) {
			this.handleDropDownClose(e, false);
		}
	};
	containerScroll = () => {
		if (this.openDropdown) {
			this.updateDimentions();
		}
	};
	connectedCallback(): void {
		super.connectedCallback();
		/**
		 * click outside the f-select wrapper area
		 */
		window.addEventListener("mouseup", this.outsideClick);

		/**
		 * on scoll apply dimetions to options wrapper
		 */
		window.addEventListener("scroll", this.containerScroll, {
			capture: true
		});

		window.addEventListener("resize", this.updateDimentions);
	}
	disconnectedCallback(): void {
		super.disconnectedCallback();

		window.removeEventListener("mouseup", this.outsideClick);

		window.removeEventListener("scroll", this.containerScroll, {
			capture: true
		});
		window.removeEventListener("resize", this.updateDimentions);
	}

	/**
	 * apply styling to f-select options wrapper.
	 */
	applyOptionsStyle(width: number) {
		if (this.openDropdown)
			if (this.classList.contains("f-search-border")) {
				return `max-height:${this.optimizedHeight}px; transition: max-height var(--transition-time-rapid) ease-in 0s;  min-width:240px; max-width:fit-content; top:${this.optionsTop};bottom:${this.optionsBottom}`;
			} else {
				return `max-height:${this.optimizedHeight}px; transition: max-height var(--transition-time-rapid) ease-in 0s;  width:${width}px; top:${this.optionsTop};bottom:${this.optionsBottom}`;
			}
		else if (this.classList.contains("f-search-border")) {
			return `max-height:0px; transition: max-height var(--transition-time-rapid) ease-in 0s;  min-width:240px; max-width:fit-content; top:${this.optionsTop};bottom:${this.optionsBottom}`;
		} else {
			return `max-height:0px; transition: max-height var(--transition-time-rapid) ease-in 0s;  width:${width}px; top:${this.optionsTop};bottom:${this.optionsBottom}`;
		}
	}

	/**
	 * index search for the resepctive option
	 */
	getIndex(option: FSelectSingleOption) {
		if (typeof option === "string") {
			return (this.selectedOptions as FSelectArrayOfStrings).indexOf(option);
		} else {
			return (this.selectedOptions as FSelectOptionsProp).findIndex(
				item => (item as FSelectOptionObject)?.title === option?.title
			);
		}
	}

	/**
	 * index search for respective option of the respective group
	 */
	getIndexInGroup(option: FSelectSingleOption, group: string) {
		if ((this.selectedOptions as FSelectOptionsGroup)[group]) {
			return (
				(this.selectedOptions as FSelectOptionsGroup)[group] as FSelectArrayOfObjects
			).findIndex(item => JSON.stringify(item) === JSON.stringify(option));
		} else {
			return -1;
		}
	}

	/**
	 * check selection for respective option.
	 */
	isSelected(option: FSelectOptionObject | string) {
		return (this.selectedOptions as FSelectArrayOfObjects).find(
			item => JSON.stringify(item) === JSON.stringify(option)
		)
			? true
			: false;
	}

	/**
	 * check selection for respective option of the respective group
	 */
	isGroupSelection(option: FSelectSingleOption, group: string) {
		if ((this.selectedOptions as FSelectOptionsGroup)[group]) {
			return ((this.selectedOptions as FSelectOptionsGroup)[group] as FSelectArrayOfObjects).find(
				item => JSON.stringify(item) === JSON.stringify(option)
			)
				? true
				: false;
		} else if (
			this.type === "single" &&
			JSON.stringify((this.selectedOptions as FSelectOptionsProp)[0]) === JSON.stringify(option)
		) {
			return true;
		}
		return false;
	}

	/**
	 * clear input value on clear icon clicked
	 */
	clearInputValue(e: MouseEvent) {
		e.stopPropagation();
		this.value = undefined;
		const event = new CustomEvent<FSelectCustomEvent>("input", {
			detail: {
				value: this.value
			},
			bubbles: true,
			composed: true
		});
		this.selectedOptions = [];

		this.clearFilterSearchString();
		this.dispatchEvent(event);
		this.requestUpdate();
	}

	/**
	 * clear te search string
	 */
	clearSelectionInGroups(e: MouseEvent) {
		e.stopPropagation();
		const event = new CustomEvent<FSelectCustomEvent>("input", {
			detail: {
				value: Array.isArray(this.selectedOptions)
					? []
					: Object.keys(this.selectedOptions).forEach(group => {
							(this.selectedOptions as FSelectOptionsGroup)[group] = [];
					  })
			},
			bubbles: true,
			composed: true
		});
		(this.value as unknown) = Array.isArray(this.selectedOptions)
			? []
			: Object.keys(this.selectedOptions).forEach(group => {
					(this.selectedOptions as FSelectOptionsGroup)[group] = [];
			  });
		this.clearFilterSearchString();
		this.dispatchEvent(event);
		this.requestUpdate();
	}

	/**
	 * check if all values of group are selected or not or are in idetereminate state
	 */
	getCheckedValue(group: string) {
		if (
			(this.selectedOptions as FSelectOptionsGroup)[group]?.length === 0 ||
			!(this.selectedOptions as FSelectOptionsGroup)[group]
		) {
			return "unchecked";
		} else if (
			(this.selectedOptions as FSelectOptionsGroup)[group]?.length ===
			(this.options as FSelectOptionsGroup)[group]?.length
		) {
			return "checked";
		} else {
			return "indeterminate";
		}
	}

	/**
	 * get sliced array to show selected options
	 */
	getSlicedSelections(optionList: FSelectOptionsProp) {
		return this.viewMoreTags ? optionList.length : this.selectionLimit;
	}

	/**
	 * change width of input inside f-select according to searchable prop
	 */
	applyInputStyle() {
		return this.searchable
			? `${
					this.openDropdown
						? "width:75%;"
						: "width:0px; transition: width var(--transition-time-rapid) ease-in 0s;"
			  }`
			: `max-width:0px`;
	}

	/**
	 * get concatinated array from groups
	 */
	getConcaticateGroupOptions(array: FSelectOptionsGroup) {
		const selectedOptions = cloneDeep(array);

		return Object.keys(array).reduce(function (arr, key) {
			return arr.concat(selectedOptions[key]);
		}, [] as FSelectSingleOption[]);
	}

	/**
	 * clear search string
	 */
	clearFilterSearchString() {
		this.searchValue = "";
		this.filteredOptions = this.options;
		this.requestUpdate();
	}

	isStringsArray(arr: unknown[]) {
		return arr.every(i => typeof i === "string");
	}

	/**
	 * Create New Option when option not present
	 */
	createNewOption(e: MouseEvent) {
		e.stopPropagation();
		e.stopImmediatePropagation();
		const event = new CustomEvent<FSelectCreateOptionEvent>("add-option", {
			detail: {
				value: this.searchValue,
				options: this.options
			},
			bubbles: true,
			composed: true
		});
		if (this.autoAddOption && this.isStringsArray(this.options as unknown[])) {
			const event = new CustomEvent<FSelectCustomEvent>("input", {
				detail: {
					value: this.searchValue
				},
				bubbles: true,
				composed: true
			});
			this.dispatchEvent(event);

			if (this.type === "single") {
				(this.selectedOptions as string[]) = [this.searchValue];
				this.value = this.searchValue;
			} else {
				(this.selectedOptions as string[]).push(this.searchValue);
				this.value = this.selectedOptions;
			}
			(this.options as string[]).push(this.searchValue);

			this.openDropdown = false;
			this.clearFilterSearchString();
		}
		this.dispatchEvent(event);
	}

	/**
	 * validate properties
	 */
	validateProperties() {
		if (!this.options) {
			throw new Error("f-select : options field can't be empty");
		}
		if (this.type === "single" && this.checkbox) {
			throw new Error("f-select : checkbox can only be present in `type=multiple`");
		}
	}

	/**
	 * options wrapper dimentions update on the basis of window screen
	 */
	updateDimentions() {
		if (this.wrapperElement) {
			const spaceAbove = this.wrapperElement.getBoundingClientRect().top;
			const spaceBelow = window.innerHeight - this.wrapperElement.getBoundingClientRect().bottom;
			const hasEnoughSpaceBelow = spaceBelow > this.height;

			if (hasEnoughSpaceBelow || spaceBelow > spaceAbove) {
				this.preferredOpenDirection = "below";
				this.optimizedHeight = +Math.min(spaceBelow - 40, this.height).toFixed(0);
				this.optionsBottom = "";
				this.optionsTop = `${(
					this.wrapperElement.getBoundingClientRect().top +
					this.wrapperElement.offsetHeight +
					4
				).toFixed(0)}px`;
			} else {
				this.preferredOpenDirection = "above";
				this.optimizedHeight = +Math.min(spaceAbove - 40, this.height).toFixed(0);
				this.optionsTop = "";
				this.optionsBottom = `${(spaceBelow + this.wrapperElement.offsetHeight - 4).toFixed(0)}px`;
			}
		}
	}

	_onLabelSlotChange() {
		this._hasLabel = this._labelNodes.length > 0;
	}
	_onHelpSlotChange() {
		this._hasHelperText = this._helpNodes.length > 0;
	}

	get singleSelectionStyle() {
		return `max-width:${`${this.offsetWidth - this.rightOffset}px`}`;
	}
	get rightOffset() {
		return this.clear ? 74 : 54;
	}

	protected updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);

		this.updateDimentions();

		if (changedProperties.has("value")) {
			if (this.value && this.type === "single") {
				this.selectedOptions = [this.value as FSelectSingleOption];
			} else if (this.value && this.type === "multiple") {
				this.selectedOptions = this.value as FSelectOptionsProp;
			} else {
				this.selectedOptions = [];
			}
		}

		if (changedProperties.has("options")) {
			this.filteredOptions = this.options;
		}
	}
	getOptionQaId(option: FSelectSingleOption) {
		if (typeof option === "string") {
			return option;
		} else {
			return option.qaId ?? option.title;
		}
	}

	handleDropDownOpen = handleDropDownOpen;
	handleDropDownClose = handleDropDownClose;
	handleOptionSelection = handleOptionSelection;
	handleSelectionGroup = handleSelectionGroup;
	handleRemoveGroupSelection = handleRemoveGroupSelection;
	handleCheckboxInput = handleCheckboxInput;
	handleCheckboxGroup = handleCheckboxGroup;
	handleSelectAll = handleSelectAll;
	handleViewMoreTags = handleViewMoreTags;
	handleInput = handleInput;
	handleBlur = handleBlur;
	handleKeyDown = handleKeyDown;
	handleOptionMouseOver = handleOptionMouseOver;
	render = render;
	renderSingleSelection = renderSingleSelection;
	renderMultipleSelectionTag = renderMultipleSelectionTag;
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-select": FSelect;
	}
}
