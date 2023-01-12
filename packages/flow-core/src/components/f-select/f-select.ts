import { html, unsafeCSS } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import eleStyle from "./f-select.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { classMap } from "lit-html/directives/class-map.js";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import _ from "lodash";
import getComputedHTML from "../../utils/get-computed-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export type FSelectState = "primary" | "default" | "success" | "warning" | "danger";
export type FSelectHeightProp = `${number}px` | `${number}%` | `${number}vh`;
export type FSelectWidthProp = "fill-container" | `${number}px` | `${number}%` | `${number}vw`;
export type FSelectArrayOfStrings = string[];
export type FSelectOptionObject = {
  icon?: string;
  title: string;
  data?: Record<string, unknown>;
};
export type FSelectOptionsGroup = { [key: string]: FSelectOptionsProp };
export type FSelectArrayOfObjects = FSelectOptionObject[];
export type FSelectArray = FSelectOptionObject[] | string[];
export type FSelectOptionsProp = FSelectOptionObject[] | string[];
export type FSelectSingleOption = FSelectOptionObject | string;
export type FSelectOptions = FSelectOptionsProp | FSelectOptionsGroup;

@customElement("f-select")
export class FSelect extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FText.styles, ...FDiv.styles];

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

  /**
   * @attribute keyboard hover for array of objects
   */
  @state({})
  currentCursor = -1;

  /**
   * @attribute keyboard hover for group for objects consisting groups
   */
  @state({})
  currentGroupCursor = -1;

  /**
   * @attribute wrapper offset height
   */
  @state({})
  fSelectWrapperHeight = 0;

  /**
   * @attribute keyboard hover for options in group for objects consisting groups
   */
  @state({})
  currentGroupOptionCursor = -1;

  @query(".f-select")
  inputElement!: HTMLInputElement;

  @query(".f-select-wrapper")
  wrapperElement!: HTMLDivElement;

  @query("#option-0")
  optionFocus!: HTMLDivElement;

  @query("#group-0")
  groupFocus!: HTMLDivElement;

  @query("#group-0-option-0")
  groupOptionFocus!: HTMLDivElement;

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
  value?: FSelectOptions | string = [];

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
  @property({ reflect: true, type: String, attribute: "option-template" })
  optionTemplate?: string;

  /**
   * @attribute Icon-left enables an icon on the left of the input value.
   */
  @property({ reflect: true, type: String, attribute: "icon-left" })
  iconLeft?: string;

  /**
   * @attribute height of `f-select`
   */
  @property({ type: String, reflect: true })
  height?: FSelectHeightProp = "180px";

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
   * @attribute defines whether user can search within the options or not .
   */
  @property({ reflect: true, type: Boolean })
  searchable?: boolean = false;

  /**
   * @attribute  a ‘close’ icon button appear on right of the select to clear the input value(s).
   */
  @property({ reflect: true, type: Boolean })
  clear?: boolean = true;

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

  /**
   * apply height styling to f-select options wrapper.
   */
  applyHeight() {
    if (this.openDropdown)
      return `max-height:${this.height}; transition: max-height var(--transition-time-rapid) ease-in 0s; top: calc(${this.fSelectWrapperHeight}px + 4px);`;
    else
      return `max-height:0px; transition: max-height var(--transition-time-rapid) ease-in 0s; top: calc(${this.fSelectWrapperHeight}px + 4px);`;
  }

  /**
   * index search for the resepctive option
   */
  getIndex(option: FSelectSingleOption) {
    if (typeof option === "string") {
      return (this.selectedOptions as FSelectArrayOfStrings).indexOf(option);
    } else {
      return (this.selectedOptions as FSelectOptionsProp).findIndex(
        (item) => (item as FSelectOptionObject)?.title === (option as FSelectOptionObject)?.title
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
      ).findIndex((item) => JSON.stringify(item) === JSON.stringify(option));
    } else {
      return -1;
    }
  }

  /**
   * check selection for respective option.
   */
  isSelected(option: FSelectOptionObject | string) {
    return (this.selectedOptions as FSelectArrayOfObjects).find(
      (item) => JSON.stringify(item) === JSON.stringify(option)
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
        (item) => JSON.stringify(item) === JSON.stringify(option)
      )
        ? true
        : false;
    } else {
      return false;
    }
  }

  /**
   * emit input custom event for option selection
   */
  handleInput(e: InputEvent) {
    e.stopPropagation();
    e.preventDefault();
    this.openDropdown = true;
    if (this.searchable) {
      this.searchValue = (e.target as HTMLInputElement)?.value;
      if (Array.isArray(this.options)) {
        this.filteredOptions = (this.options as FSelectArrayOfObjects)?.filter(
          (item: FSelectSingleOption) =>
            typeof item === "string"
              ? item.toLowerCase().includes((e.target as HTMLInputElement)?.value.toLowerCase())
              : (item as FSelectOptionObject).title
                  .toLowerCase()
                  .includes((e.target as HTMLInputElement)?.value.toLowerCase())
        );
      } else {
        const filteredOptionsCloned = _.cloneDeep(this.filteredOptions);
        Object.keys(this.options).forEach((item) => {
          (filteredOptionsCloned as FSelectOptionsGroup)[item] = (
            (this.options as FSelectOptionsGroup)[item] as FSelectArrayOfObjects
          )?.filter((obj: FSelectSingleOption) =>
            typeof obj === "string"
              ? obj.toLowerCase().includes((e.target as HTMLInputElement)?.value.toLowerCase())
              : (obj as FSelectOptionObject).title
                  .toLowerCase()
                  .includes((e.target as HTMLInputElement)?.value.toLowerCase())
          );
        });
        this.filteredOptions = filteredOptionsCloned;
      }
      this.requestUpdate();
    }
  }

  /**
   * clear input value on clear icon clicked
   */
  clearInputValue(e: MouseEvent) {
    e.stopPropagation();
    const event = new CustomEvent("input", {
      detail: {
        value: [],
      },
    });
    this.selectedOptions = [];
    this.value = [];
    this.clearFilterSearchString();
    this.dispatchEvent(event);
    this.requestUpdate();
  }

  /**
   * clear te search string
   */
  clearSelectionInGroups(e: MouseEvent) {
    e.stopPropagation();
    const event = new CustomEvent("input", {
      detail: {
        value: Array.isArray(this.selectedOptions)
          ? []
          : Object.keys(this.selectedOptions).forEach((group) => {
              (this.selectedOptions as FSelectOptionsGroup)[group] = [];
            }),
      },
    });

    this.clearFilterSearchString();
    this.dispatchEvent(event);
    this.requestUpdate();
  }

  /**
   * open options menu
   */
  handleDropDownOpen(e: MouseEvent) {
    this.openDropdown = true;
    this?.inputElement?.focus();
    e.stopPropagation();
  }

  /**
   * close options menu
   */
  handleDropDownClose(e: MouseEvent) {
    this.openDropdown = false;
    this.clearFilterSearchString();
    this.currentCursor = -1;
    this.currentGroupCursor = -1;
    this.currentGroupOptionCursor = -1;
    this.requestUpdate();
    e.stopPropagation();
  }

  /**
   * action for selection of options if the options is in the form of array
   */
  handleOptionSelection(option: FSelectSingleOption, e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (Array.isArray(this.options)) {
      if (this.type === "single") {
        !this.isSelected(option)
          ? ((this.selectedOptions as FSelectArrayOfObjects) = [option as FSelectOptionObject])
          : (this.selectedOptions as FSelectArrayOfObjects).splice(this.getIndex(option), 1);
      } else {
        !this.isSelected(option)
          ? (this.selectedOptions as FSelectArrayOfObjects).push(option as FSelectOptionObject)
          : (this.selectedOptions as FSelectArrayOfObjects).splice(this.getIndex(option), 1);
      }
    }
    const event = new CustomEvent("input", {
      detail: {
        value:
          this.type === "multiple"
            ? this.selectedOptions
            : (this.selectedOptions as FSelectArrayOfObjects)[0],
      },
    });
    this.dispatchEvent(event);
    this.requestUpdate();
  }

  /**
   * action for selection of options if the options is in the form of groups
   */
  handleSelectionGroup(option: FSelectSingleOption, group: string, e: MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    let selectedOptionsInGroup = (this.selectedOptions as FSelectOptionsGroup)[group];
    if (this.type === "single") {
      selectedOptionsInGroup = [option as string];
    } else {
      !this.isGroupSelection(option, group)
        ? !selectedOptionsInGroup
          ? (this.selectedOptions = {
              ...this.selectedOptions,
              [group]: [option as FSelectOptionObject],
            })
          : (selectedOptionsInGroup as FSelectArrayOfObjects).push(option as FSelectOptionObject)
        : selectedOptionsInGroup.splice(this.getIndexInGroup(option, group), 1);
    }
    const event = new CustomEvent("input", {
      detail: {
        value:
          this.type === "multiple"
            ? this.selectedOptions
            : (this.selectedOptions as FSelectOptionsGroup)[group][0],
      },
    });
    this.dispatchEvent(event);
    this.requestUpdate();
  }

  /**
   * remove selection option (in group) when f-tag is clicked
   */
  handleRemoveGroupSelection(option: FSelectSingleOption, e: MouseEvent) {
    e.stopPropagation();
    Object.keys(this.selectedOptions).forEach((group) => {
      const index = (this.selectedOptions as FSelectOptionsGroup)[group].findIndex(
        (item) => JSON.stringify(item) === JSON.stringify(option)
      );
      if (index !== -1) {
        const selectedOptionsInGroup = (this.selectedOptions as FSelectOptionsGroup)[group];
        selectedOptionsInGroup.splice(index, 1);
        this.selectedOptions = { ...this.selectedOptions, [group]: selectedOptionsInGroup };
        e.stopPropagation();
        const event = new CustomEvent("input", {
          detail: {
            value:
              this.type === "multiple"
                ? this.selectedOptions
                : (this.selectedOptions as FSelectOptionsGroup)[group][0],
          },
        });
        this.dispatchEvent(event);
      }
    });
    this.requestUpdate();
  }

  /**
   * handle click on checkbox
   */
  handleCheckboxInput(option: FSelectSingleOption, e: MouseEvent) {
    e.stopPropagation();
    this.handleOptionSelection(option, e);
  }

  /**
   * handle click on checkbox in group
   */
  handleCheckboxGroup(option: FSelectSingleOption, group: string, e: MouseEvent) {
    e.stopPropagation();
    this.handleSelectionGroup(option, group, e);
  }

  /**
   * select all options inside a particular group
   */
  handleSelectAll(e: MouseEvent, group: string) {
    e.stopPropagation();
    if (
      this.getCheckedValue(group) === "unchecked" ||
      this.getCheckedValue(group) === "indeterminate"
    ) {
      (this.selectedOptions as FSelectOptionsGroup)[group] = [
        ...(this.options as FSelectOptionsGroup)[group],
      ] as FSelectArrayOfObjects;
    } else {
      (this.selectedOptions as FSelectOptionsGroup)[group] = [];
    }
    const event = new CustomEvent("input", {
      detail: {
        value: this.selectedOptions,
      },
    });
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
   * hide/show f-tags when multiple options are selected
   */
  handleViewMoreTags(e: MouseEvent) {
    e.stopPropagation();
    this.viewMoreTags = !this.viewMoreTags;
    this.requestUpdate();
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
   * actions on keyboard navigation through options
   */
  handleKeyDown(e: KeyboardEvent | MouseEvent) {
    e.stopPropagation();
    if (Array.isArray(this.filteredOptions)) {
      if (this.openDropdown) {
        if ((e as KeyboardEvent).keyCode === 38 && this.currentCursor === -1) {
          this.currentCursor = 0;
        } else if ((e as KeyboardEvent).keyCode === 38 && this.currentCursor > 0) {
          this.currentCursor--;
        } else if (
          (e as KeyboardEvent).keyCode === 40 &&
          this.currentCursor < this.filteredOptions.length - 1
        ) {
          this.optionFocus.focus();
          this.optionFocus.style.outline = "none";
          this.currentCursor++;
        } else if ((e as KeyboardEvent).keyCode === 13) {
          this.handleOptionSelection(this.filteredOptions[this.currentCursor], e as MouseEvent);
          if (this.type === "single") {
            this.openDropdown = false;
          }
        } else if ((e as KeyboardEvent).keyCode === 27) {
          this.openDropdown = false;
        }
      } else {
        if ((e as KeyboardEvent).keyCode === 13) {
          this.openDropdown = true;
        }
      }
    } else {
      if (this.openDropdown) {
        if (
          (e as KeyboardEvent).keyCode === 38 &&
          this.currentGroupCursor === -1 &&
          this.currentGroupOptionCursor === -1
        ) {
          this.currentGroupCursor = 0;
          this.currentGroupOptionCursor = 0;
        } else if (
          (e as KeyboardEvent).keyCode === 38 &&
          this.currentGroupCursor <= Object.keys(this.filteredOptions).length - 1
        ) {
          if (this.currentGroupOptionCursor > 0) {
            this.currentGroupOptionCursor--;
          } else {
            if (this.currentGroupCursor !== 0) {
              this.currentGroupCursor--;
              this.currentGroupOptionCursor =
                this.filteredOptions[Object.keys(this.filteredOptions)[this.currentGroupCursor]]
                  .length - 1;
            }
          }
        } else if (
          (e as KeyboardEvent).keyCode === 40 &&
          this.currentGroupCursor < Object.keys(this.filteredOptions).length
        ) {
          if (
            this.currentGroupOptionCursor <
            this.filteredOptions[Object.keys(this.filteredOptions)[this.currentGroupCursor]]
              .length -
              1
          ) {
            this.groupOptionFocus.focus();
            this.groupOptionFocus.style.outline = "none";
            this.currentGroupOptionCursor++;
          } else {
            if (this.currentGroupCursor < Object.keys(this.filteredOptions).length - 1) {
              this.currentGroupCursor++;
              this.currentGroupOptionCursor = 0;
            }
          }
        } else if ((e as KeyboardEvent).keyCode === 13) {
          this.handleSelectionGroup(
            this.filteredOptions[Object.keys(this.filteredOptions)[this.currentGroupCursor]][
              this.currentGroupOptionCursor
            ],
            Object.keys(this.filteredOptions)[this.currentGroupCursor],
            e as MouseEvent
          );
          if (this.type === "single") {
            this.openDropdown = false;
          }
        } else if ((e as KeyboardEvent).keyCode === 27) {
          this.openDropdown = false;
        }
      } else {
        if ((e as KeyboardEvent).keyCode === 13) {
          this.openDropdown = true;
        }
      }
    }
  }

  /**
   * get concatinated array from groups
   */
  getConcaticateGroupOptions(array: FSelectOptionsGroup) {
    const selectedOptions = _.cloneDeep(array);
    return Object.keys(array).reduce(function (arr: FSelectArrayOfObjects, key: string) {
      return arr.concat((selectedOptions as any)[key]);
    }, []);
  }

  /**
   * clear search string
   */
  clearFilterSearchString() {
    this.searchValue = "";
    this.filteredOptions = this.options;
    this.requestUpdate();
  }

  isStringsArray(arr: string[]) {
    return arr.every((i) => typeof i === "string");
  }

  /**
   * Create New Option when option not present
   */
  createNewOption(e: MouseEvent) {
    const event = new CustomEvent("input", {
      detail: {
        value: Array.isArray(this.options)
          ? this.type === "single"
            ? (this.selectedOptions as FSelectArray)[0]
            : this.selectedOptions
          : this.selectedOptions,
        searchValue: this.searchValue,
      },
    });
    this.dispatchEvent(event);
    this.requestUpdate();
    this.handleDropDownClose(e);
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

  render() {
    this.validateProperties();
    this.fSelectWrapperHeight = this.wrapperElement?.offsetHeight;

    if (this.width === "fill-container") {
      this.style.width = "100%";
    } else {
      this.style.width = this.width ?? "100%";
    }
    /**
     * concaticated array from groups
     */
    const concatinatedSelectedOptions = !Array.isArray(this.selectedOptions)
      ? this.getConcaticateGroupOptions(this.selectedOptions)
      : [];

    /**
     * click outside the f-select wrapper area
     */
    window.addEventListener(
      "click",
      (e: MouseEvent) => {
        if (!this.contains(e.target as HTMLInputElement) && this.openDropdown) {
          this.handleDropDownClose(e);
        }
      },
      true
    );

    /**
     * create iconlLeft if available
     */
    const iconLeft = this.iconLeft
      ? html`
          <f-icon
            .source=${this.iconLeft}
            .size=${this.iconSize}
            class=${!this.size ? "f-input-icons-size" : ""}
          ></f-icon>
        `
      : "";

    /**
     * create caret-up/caret-down icon for open/close option-menu
     */
    const iconRight = !this.openDropdown
      ? html`<f-icon
          source="i-caret-down"
          .size=${"small"}
          clickable
          @click=${this.handleDropDownOpen}
        ></f-icon>`
      : html`<f-icon
          source="i-caret-up"
          .size=${"small"}
          clickable
          @click=${this.handleDropDownClose}
        ></f-icon>`;

    /**
     * input text area with alternate f-text placeholder when not searchable
     */
    const inputAppend = html`
      ${this.selectedOptions?.length === 0 &&
      concatinatedSelectedOptions?.length === 0 &&
      !this.searchable
        ? html`<f-text
            class="placeholder-text"
            variant="para"
            size="small"
            weight="regular"
            state="subtle"
            >${this.placeholder}</f-text
          >`
        : ""}
      <input
        class=${classMap({ "f-select": true })}
        variant=${this.variant}
        category=${this.category}
        state=${this.state}
        placeholder=${this.selectedOptions?.length > 0 || concatinatedSelectedOptions?.length > 0
          ? this.searchable && this.openDropdown
            ? this.placeholder
            : ""
          : this.placeholder}
        size=${this.size}
        ?readonly=${!this.searchable}
        .value=${this.searchValue}
        @input=${this.handleInput}
        style="${this.applyInputStyle()}"
      />
    `;

    /**
     * append prefix consisting of f-tags, iiconLeft and search string
     */
    const prefixAppend = html`<div class="f-select-prefix">
      ${this.iconLeft ? html` ${iconLeft}` : ""}
      ${Array.isArray(this.selectedOptions) && this.selectedOptions?.length > 0
        ? html` <div class="f-select-searchable">
            ${this.type === "single"
              ? (this.selectedOptions as FSelectOptionsProp).map(
                  (option) =>
                    html`<f-div padding="none" ellipsis=${true}
                      ><f-text variant="para" size="small" weight="regular" class="word-break"
                        >${(option as FSelectOptionObject)?.title ?? option}</f-text
                      ></f-div
                    >`
                )
              : html`${(this.selectedOptions as FSelectOptionsProp)
                  .slice(0, this.getSlicedSelections(this.selectedOptions))
                  .map(
                    (option) =>
                      html`<f-tag
                        class="f-tag-system-icon"
                        icon-right="i-close"
                        size="small"
                        label=${(option as FSelectOptionObject)?.title ?? option}
                        state="neutral"
                        @click=${(e: MouseEvent) => {
                          this.handleOptionSelection(option, e);
                        }}
                      ></f-tag> `
                  )}
                ${this.selectedOptions.length > this.selectionLimit
                  ? !this.viewMoreTags
                    ? html` <f-div height="hug-content" width="hug-content" padding="none">
                        <f-text
                          variant="para"
                          size="small"
                          weight="regular"
                          state="primary"
                          @click=${this.handleViewMoreTags}
                          ><a href="" @click=${(e: MouseEvent) => e.preventDefault()}
                            >+${this.selectedOptions.length - this.selectionLimit} more</a
                          ></f-text
                        ></f-div
                      >`
                    : html`<f-div height="hug-content" width="hug-content" padding="none"
                        ><f-text
                          variant="para"
                          size="small"
                          weight="regular"
                          state="primary"
                          @click=${this.handleViewMoreTags}
                          ><a href="" @click=${(e: MouseEvent) => e.preventDefault()}
                            >show less</a
                          ></f-text
                        ></f-div
                      >`
                  : ""} `}
            ${inputAppend}
          </div>`
        : html`<div class="f-select-searchable">
            ${(concatinatedSelectedOptions as FSelectOptionsProp)
              .slice(0, this.getSlicedSelections(concatinatedSelectedOptions))
              .map(
                (option) =>
                  html`<f-tag
                    class="f-tag-system-icon"
                    icon-right="i-close"
                    size="small"
                    label=${(option as FSelectOptionObject)?.title ?? option}
                    state="neutral"
                    @click=${(e: MouseEvent) => {
                      this.handleRemoveGroupSelection(option, e);
                    }}
                  ></f-tag> `
              )}
            ${concatinatedSelectedOptions.length > this.selectionLimit
              ? !this.viewMoreTags
                ? html`<f-div height="hug-content" width="hug-content" padding="none"
                    ><f-text
                      variant="para"
                      size="small"
                      weight="regular"
                      state="primary"
                      @click=${this.handleViewMoreTags}
                      ><a href="" @click=${(e: MouseEvent) => e.preventDefault()}
                        >+${concatinatedSelectedOptions.length - this.selectionLimit} more</a
                      ></f-text
                    ></f-div
                  >`
                : html`<f-div height="hug-content" width="hug-content" padding="none"
                    ><f-text
                      variant="para"
                      size="small"
                      weight="regular"
                      state="primary"
                      @click=${this.handleViewMoreTags}
                      ><a href="" @click=${(e: MouseEvent) => e.preventDefault()}
                        >show less</a
                      ></f-text
                    ></f-div
                  >`
              : ""}
            ${inputAppend}
          </div> `}
    </div>`;

    /**
     * append suffix consisting of clear icon caret-up/caret-down icon and loader
     */
    const suffixAppend = !this.loading
      ? html`<div class="f-select-suffix">
          ${(this.selectedOptions?.length > 0 || concatinatedSelectedOptions?.length > 0) &&
          this.clear
            ? html`
                <f-icon
                  ?clickable=${true}
                  source="i-close"
                  .size=${this.iconSize}
                  @click=${(e: MouseEvent) =>
                    Array.isArray(this.selectedOptions)
                      ? this.clearInputValue(e)
                      : this.clearSelectionInGroups(e)}
                  class=${!this.size ? "f-input-icons-size" : ""}
                ></f-icon>
              `
            : ""}
          ${iconRight}
        </div>`
      : html`<div class="loader-suffix">${unsafeSVG(loader)}</div>`;

    /**
     * empty filtered options
     */
    const emptyMenu = html`<f-div
      id=${`option-0`}
      padding="medium"
      height="hug-content"
      width="fill-container"
      direction="row"
      align="middle-left"
      gap="auto"
      tabindex=${0}
    >
      <f-div width="fill-container" height="hug-content" padding="none"
        ><f-text variant="para" size="small" weight="regular">No Options found.</f-text></f-div
      >
      ${this.createOption && this.searchValue && this.searchable
        ? html`
            <f-div width="hug-content" height="hug-content" padding="none">
              ${this.offsetWidth > 200
                ? html` <f-button
                    size="small"
                    category="transparent"
                    label="CREATE"
                    @click=${this.createNewOption}
                  ></f-button>`
                : html`<f-icon-button
                    icon="i-plus"
                    state="primary"
                    size="x-small"
                    @click=${this.createNewOption}
                  ></f-icon-button>`}
            </f-div>
          `
        : ""}
    </f-div>`;

    /**
     * Final html to render
     */
    return html`
      <div class="f-select-field">
        <f-div
          padding="none"
          gap="none"
          align="bottom-left"
          @click=${(e: MouseEvent) => {
            this.handleDropDownClose(e);
          }}
        >
          <f-div padding="none" gap="x-small" direction="column" width="fill-container">
            <slot name="label"></slot>
            <slot name="description"></slot>
          </f-div>
        </f-div>
        <div
          class="f-select-wrapper"
          variant=${this.variant}
          category=${this.category}
          state=${this.state}
          size=${this.size}
          type=${this.type}
          @click=${this.handleDropDownOpen}
          @keydown=${this.handleKeyDown}
        >
          ${prefixAppend} ${suffixAppend}
          <div class="f-select-options" style="${this.applyHeight()}" size=${this.size}>
            <f-div padding="none" gap="none" direction="column">
              ${Array.isArray(this.options)
                ? this.filteredOptions.length > 0
                  ? (this.filteredOptions as FSelectArray)?.map(
                      (option, index) =>
                        html`<f-div
                          class="f-select-options-clickable"
                          id=${`option-${index}`}
                          padding="medium"
                          height="hug-content"
                          width="fill-container"
                          direction="row"
                          ?clickable=${true}
                          align="middle-left"
                          gap="small"
                          .selected=${this.isSelected(option) || this.currentCursor === index
                            ? "background"
                            : undefined}
                          @click=${(e: MouseEvent) => {
                            this.handleOptionSelection(option, e);
                          }}
                          tabindex=${0}
                        >
                          ${this.checkbox
                            ? html` <f-checkbox
                                state=${this.state}
                                size=${this.size}
                                value=${this.isSelected(option) ? "checked" : "unchecked"}
                                @input=${(e: MouseEvent) => {
                                  this.handleCheckboxInput(option, e);
                                }}
                              ></f-checkbox>`
                            : ""}
                          ${(option as FSelectOptionObject)?.icon && !this.optionTemplate
                            ? html` <f-div
                                padding="none"
                                gap="none"
                                height="hug-content"
                                width="hug-content"
                                ><f-icon
                                  size="medium"
                                  source=${(option as FSelectOptionObject)?.icon}
                                ></f-icon
                              ></f-div>`
                            : ""}
                          ${this.optionTemplate
                            ? html`
                                ${unsafeHTML(
                                  getComputedHTML(html`${eval("`" + this.optionTemplate + "`")}`)
                                )}
                              `
                            : ""}
                          ${!this.optionTemplate
                            ? html` <f-div
                                padding="none"
                                gap="none"
                                height="hug-content"
                                width="fill-container"
                                ><f-text variant="para" size="small" weight="regular"
                                  >${(option as FSelectOptionObject)?.title ?? option}</f-text
                                ></f-div
                              >`
                            : ""}
                          ${this.isSelected(option) && !this.checkbox
                            ? html` <f-div
                                padding="none"
                                gap="none"
                                height="hug-content"
                                width="hug-content"
                                ><f-icon size="medium" source="i-tick"></f-icon
                              ></f-div>`
                            : ""}
                        </f-div>`
                    )
                  : emptyMenu
                : Object.keys(this.filteredOptions)?.length > 0 &&
                  Object.keys(this.filteredOptions)?.every(
                    (groupName) =>
                      (this.filteredOptions as FSelectOptionsGroup)[groupName].length > 0
                  )
                ? Object.keys(this.filteredOptions)?.map((group, groupIndex) =>
                    (this.filteredOptions as FSelectOptionsGroup)[group].length > 0
                      ? html`<f-div
                    padding="none"
                    height="hug-content"
                    width="fill-container"
                    direction="column"
                    align="middle-left"
                    border="small solid default bottom"
                  >
                    <f-div
                      class="f-select-options-clickable"
                      id=${`group-${groupIndex}`}
                      padding="medium"
                      height="hug-content"
                      width="fill-container"
                      align="middle-left"
                      direction="row"
                      ?clickable=${true}
                      .selected=${
                        this.getCheckedValue(group) === "checked" ? "background" : undefined
                      }
                      @click=${(e: MouseEvent) => this.handleSelectAll(e, group)}
                      tabindex=${0}
                    >
                       ${
                         this.checkbox
                           ? html` <f-checkbox
                               state=${this.state}
                               size=${this.size}
                               .value="${this.getCheckedValue(group)}"
                               @input=${(e: MouseEvent) => this.handleSelectAll(e, group)}
                             ></f-checkbox>`
                           : ""
                       }
                      <f-text variant="para" size="small" weight="regular" state="secondary"
                                  >${group}</f-text
                                >
                      </f-div>
                      ${(this.filteredOptions as FSelectOptionsGroup)[group].map(
                        (option, optionIndex) =>
                          html`
                            <f-div
                              class="f-select-options-clickable"
                              id=${`group-${groupIndex}-option-${optionIndex}`}
                              padding="medium x-large"
                              height="hug-content"
                              width="fill-container"
                              direction="row"
                              ?clickable=${true}
                              align="middle-left"
                              gap="small"
                              .selected=${this.isGroupSelection(option, group) ||
                              (this.currentGroupOptionCursor === optionIndex &&
                                this.currentGroupCursor === groupIndex)
                                ? "background"
                                : undefined}
                              @click=${(e: MouseEvent) => {
                                this.handleSelectionGroup(option, group, e);
                              }}
                              tabindex=${0}
                            >
                              ${this.checkbox
                                ? html` <f-checkbox
                                    state=${this.state}
                                    size=${this.size}
                                    value=${this.isGroupSelection(option, group)
                                      ? "checked"
                                      : "unchecked"}
                                    @input=${(e: MouseEvent) => {
                                      this.handleCheckboxGroup(option, group, e);
                                    }}
                                  ></f-checkbox>`
                                : ""}
                              ${(option as FSelectOptionObject)?.icon && !this.optionTemplate
                                ? html` <f-div
                                    padding="none"
                                    gap="none"
                                    height="hug-content"
                                    width="hug-content"
                                    ><f-icon
                                      size="medium"
                                      source=${(option as FSelectOptionObject)?.icon}
                                    ></f-icon
                                  ></f-div>`
                                : ""}
                              ${this.optionTemplate
                                ? html`
                                    ${unsafeHTML(
                                      getComputedHTML(
                                        html`${eval("`" + this.optionTemplate + "`")}`
                                      )
                                    )}
                                  `
                                : ""}
                              ${!this.optionTemplate
                                ? html` <f-div
                                    padding="none"
                                    gap="none"
                                    height="hug-content"
                                    width="fill-container"
                                    ><f-text variant="para" size="small" weight="regular"
                                      >${(option as FSelectOptionObject)?.title ?? option}</f-text
                                    ></f-div
                                  >`
                                : ""}
                              ${this.isGroupSelection(option, group) && !this.checkbox
                                ? html` <f-div
                                    padding="none"
                                    gap="none"
                                    height="hug-content"
                                    width="hug-content"
                                    ><f-icon size="medium" source="i-tick"></f-icon
                                  ></f-div>`
                                : ""}
                            </f-div>
                          `
                      )}
                    </f-div></f-div
                  >`
                      : ""
                  )
                : emptyMenu}
            </f-div>
          </div>
        </div>
        <slot name="help"></slot>
      </div>
    `;
  }
  firstUpdated() {
    /**
     * initial value of selectedOptions
     */
    this.selectedOptions = this.value
      ? typeof this.value === "string"
        ? [this.value]
        : this.value
      : [];
    /**
     * initial value of filteredOptions
     */
    this.filteredOptions = this.options;
  }
  updated(changedProps: Map<string, any>) {
    this.fSelectWrapperHeight = changedProps.get("fSelectWrapperHeight");
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-select": FSelect;
  }
}
