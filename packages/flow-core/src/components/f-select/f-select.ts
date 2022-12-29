import { html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import eleStyle from "./f-select.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { classMap } from "lit-html/directives/class-map.js";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";

export type FSelectState = "primary" | "default" | "success" | "warning" | "danger" | "inherit";
export type FSelectHeightProp = `${number}px` | `${number}%` | `${number}vh`;
export type FSelectWidthProp = "fill-container" | `${number}px` | `${number}%` | `${number}vw`;
export type FSelectArrayOfStrings = String[];
export type FSelectOptionObject = {
  icon?: string;
  title: string;
};
export type FSelectArrayOfObjects = FSelectOptionObject[];
export type FSelectOptionsProp = FSelectArrayOfObjects | FSelectArrayOfStrings;
export type FSelectSingleOption = FSelectOptionObject | string;

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
   * @attribute local state for dropdown open and close boolean
   */
  @state({})
  selectedOptions: FSelectArrayOfObjects = [];

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
  state?: FSelectState = "inherit";

  /**
   * @attribute f-select can have 2 sizes. By default size is inherited by the parent f-field.
   */
  @property({ reflect: true, type: String })
  size?: "medium" | "small";

  /**
   * @attribute Defines the value of an f-select. Validation rules are applied on the value depending on the type property of the f-text-input.
   */
  @property({ reflect: true, type: String })
  value?: string;

  /**
   * @attribute Defines the placeholder text for f-text-input
   */
  @property({ reflect: true, type: Array })
  options?: FSelectArrayOfObjects = [];

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
   * @attribute Loader icon replaces the content of the button .
   */
  @property({ reflect: true, type: Boolean })
  clear?: boolean = false;

  /**
   * fetch read-only value from nearest parent f-field element
   */
  get isReadOnly() {
    return this.closest("f-field")?.hasAttribute("read-only") ?? false;
  }

  /**
   * fetch can-duplicate value from nearest parent f-field element
   */
  get canDuplicate() {
    return this.closest("f-field")?.hasAttribute("can-duplicate") ?? false;
  }

  /**
   * emit input custom event
   */
  handleInput(e: InputEvent) {
    e.stopPropagation();
    const event = new CustomEvent("input", {
      detail: {
        value: (e.target as HTMLInputElement)?.value,
      },
    });
    this.value = (e.target as HTMLInputElement)?.value;
    this.dispatchEvent(event);
  }

  /**
   * clear input value on clear icon clicked
   */
  clearInputValue() {
    const event = new CustomEvent("input", {
      detail: {
        value: "",
      },
    });
    this.value = "";
    this.dispatchEvent(event);
  }

  /**
   * icon size
   */
  get iconSize() {
    if (this.size === "medium") return "small";
    else if (this.size === "small") return "x-small";
    else return undefined;
  }

  applyHeight() {
    if (this.openDropdown)
      return `max-height:${this.height}; transition: max-height 0.25s ease-in 0s;`;
    else return `max-height:0px; transition: max-height 0.25s ease-in 0s;`;
  }

  applyWidth() {
    return `width:${this.width === "fill-container" ? "100%" : this.width};`;
  }

  handleDropDown(e: MouseEvent) {
    this.openDropdown = !this.openDropdown;
    e.stopPropagation();
  }

  handleOptionSelection(option: FSelectOptionObject, e: MouseEvent) {
    if (this.type === "single") {
      this.selectedOptions = [option];
    } else {
      this.selectedOptions.indexOf(option) === -1
        ? this.selectedOptions.push(option)
        : this.selectedOptions.splice(this.selectedOptions.indexOf(option), 1);
      e.stopPropagation();
    }
    this.requestUpdate();
  }

  render() {
    /**
     * create iconLeft if available
     */

    document.body.addEventListener(
      "click",
      (e: MouseEvent) => {
        if ((e.target as HTMLInputElement)?.tagName !== "F-SELECT") {
          this.openDropdown = false;
        }
      },
      true
    );

    const iconLeft = this.iconLeft
      ? html` <f-icon
          .source=${this.iconLeft}
          .size=${this.iconSize}
          class=${!this.size ? "f-input-icons-size" : ""}
        ></f-icon>`
      : "";
    /**
     * create iconRight if available
     */
    const iconRight = !this.openDropdown
      ? html`<f-icon source="i-caret-down" .size=${"small"} clickable></f-icon>`
      : html`<f-icon source="i-caret-up" .size=${"small"} clickable></f-icon>`;
    /**
     * append prefix
     */
    const prefixAppend = this.iconLeft
      ? html` <div class="f-select-prefix">
          ${iconLeft}
          ${this.selectedOptions.length > 0
            ? html` <f-div
                height="hug-content"
                width="hug-content"
                padding="none medium none none"
                direction="row"
                gap="small"
              >
                ${this.type === "single"
                  ? this.selectedOptions.map(
                      (option) =>
                        html`<f-text variant="para" size="small" weight="regular" class="word-break"
                          >${option?.title}</f-text
                        >`
                    )
                  : this.selectedOptions.map(
                      (option) =>
                        html`<f-tag
                          icon-right="i-close"
                          size="small"
                          label=${option?.title}
                          state="neutral"
                          @click=${(e: MouseEvent) => {
                            this.handleOptionSelection(option, e);
                          }}
                        ></f-tag> `
                    )}
              </f-div>`
            : ""}
        </div>`
      : "";
    /**
     * append suffix
     */
    const suffixAppend = !this.loading
      ? this.value && this.clear
        ? html`<div class="f-select-suffix">
            <f-icon
              ?clickable=${true}
              source="i-close"
              .size=${this.iconSize}
              @click=${this.clearInputValue}
              class=${!this.size ? "f-select-icons-size" : ""}
            ></f-icon>
          </div>`
        : html`<div class="f-select-suffix">${iconRight}</div>`
      : html`<div class="loader-suffix">${unsafeSVG(loader)}</div>`;

    /**
     * Final html to render
     */

    return html`
      <div
        class="f-select-wrapper"
        variant=${this.variant}
        category=${this.category}
        state=${this.state}
        size=${this.size}
        style="${this.applyWidth()}"
        @click=${this.handleDropDown}
      >
        ${prefixAppend}
        <input
          class=${classMap({ "f-select": true })}
          variant=${this.variant}
          category=${this.category}
          state=${this.state}
          placeholder=${this.placeholder}
          .value="${this.value || ""}"
          size=${this.size}
          ?readonly=${this.isReadOnly}
          @input=${this.handleInput}
        />
        ${suffixAppend}
        <div class="f-select-options" style="${this.applyHeight()}" size=${this.size}>
          <f-div padding="none" gap="none" direction="column">
            ${this.options?.map(
              (option) => html`<f-div
                padding="medium"
                height="hug-content"
                width="fill-container"
                direction="row"
                ?clickable=${true}
                align="middle-left"
                gap="small"
                .selected=${this.selectedOptions.indexOf(option) !== -1 ? "background" : undefined}
                @click=${(e: MouseEvent) => {
                  this.handleOptionSelection(option, e);
                }}
              >
                ${option?.icon
                  ? html` <f-div padding="none" gap="none" height="hug-content" width="hug-content"
                      ><f-icon size="medium" source=${option?.icon}></f-icon
                    ></f-div>`
                  : ""}
                <f-div padding="none" gap="none" height="hug-content" width="fill-container"
                  ><f-text variant="para" size="small" weight="regular"
                    >${option?.title ?? option}</f-text
                  ></f-div
                >
                ${this.selectedOptions.indexOf(option) !== -1
                  ? html` <f-div padding="none" gap="none" height="hug-content" width="hug-content"
                      ><f-icon size="medium" source="i-tick"></f-icon
                    ></f-div>`
                  : ""}
              </f-div>`
            )}
          </f-div>
        </div>
      </div>
    `;
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
