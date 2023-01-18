import { html, unsafeCSS } from "lit";
import { customElement, property, query, queryAssignedNodes, state } from "lit/decorators.js";
import eleStyle from "./f-input.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { classMap } from "lit-html/directives/class-map.js";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import countryCallingCodes from "./country-calling-codes.json";
import isValidEmail from "../../utils/is-valid-email";
import isValidHttpUrl from "../../utils/is-valid-http-url";

export type FInputState = "primary" | "default" | "success" | "warning" | "danger";

@customElement("f-input")
export class FInput extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FText.styles, ...FDiv.styles];

  /**
   * @attribute local state for password to text toggling and vice versa.
   */
  @state({})
  showPassword = false;

  /**
   * @attribute initial state.
   */
  @state({})
  firstState?: FInputState = "default";

  /**
   * @attribute helper text message on error
   */
  @state({})
  helpMessage = "";

  /**
   * @attribute country codes menu open/close
   */
  @state({})
  isCodeMenuOpen = false;

  /**
   * @attribute locally selected calling code
   */
  @state({})
  selectedCallingCode = "";

  /**
   * @attribute height of option menu
   */
  @state({})
  optimizedHeight = 0;

  /**
   * @attribute prefferred opening position of country code option menu
   */
  @state({})
  preferredOpenDirection = "below";

  /**
   * @attribute top area for options-menu
   */
  @state({})
  optionsTop = "";

  /**
   * @attribute slots available for label
   */
  @queryAssignedNodes("label", true)
  _labelNodes!: NodeListOf<HTMLElement>;

  /**
   * @attribute boolean true/false if slot label is present
   */
  @state()
  _hasLabel = false;

  /**
   * @attribute slots available for help text
   */
  @queryAssignedNodes("help", true)
  _helpNodes!: NodeListOf<HTMLElement>;

  /**
   * @attribute query selector for input wrapper
   */
  @query("#f-input-wrapper")
  wrapperElement!: HTMLDivElement;

  /**
   * @attribute query selector for options menu
   */
  @query("#f-input-tel-options")
  optionElement!: HTMLDivElement;

  /**
   * @attribute boolean value of help slot is present
   */
  @state()
  _hasHelperText = false;

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
  state?: FInputState = "default";

  /**
   * @attribute f-input can have 2 sizes. By default size is inherited by the parent f-field.
   */
  @property({ reflect: true, type: String })
  size?: "medium" | "small";

  /**
   * @attribute The type attribute specifies the type of <input> element to display.
   */
  @property({ reflect: true, type: String })
  type?: "text" | "number" | "email" | "password" | "url" | "tel" = "text";

  /**
   * @attribute Defines the value of an f-input. Validation rules are applied on the value depending on the type property of the f-text-input.
   */
  @property({ reflect: true, type: String })
  value?: string;

  /**
   * @attribute Defines the value of an f-input. Validation rules are applied on the value depending on the type property of the f-text-input.
   */
  @property({ reflect: true, type: String })
  callingCode?: string;

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
  @property({ reflect: true, type: Number, attribute: "max-length" })
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

  /**
   * emit input custom event
   */
  handleInput(e: InputEvent) {
    e.stopPropagation();
    const event = new CustomEvent("input", {
      detail: {
        value: (e.target as HTMLInputElement)?.value,
        ...(this.selectedCallingCode &&
          this.type === "tel" && { callingCode: this.selectedCallingCode }),
      },
    });

    this.value = (e.target as HTMLInputElement)?.value;
    if (this.type === "tel") this.callingCode = this.selectedCallingCode;

    this.dispatchEvent(event);
  }

  /**
   * on blur action
   */
  handleBlur() {
    if (this.value && this.type === "email" && !isValidEmail(this.value ?? "")) {
      this.state = "danger";
      this.helpMessage = "Enter a valid email address";
    } else if (this.value && this.type === "url" && !isValidHttpUrl(this.value ?? "")) {
      this.state = "danger";
      this.helpMessage = "Enter a valid URL";
    } else {
      this.state = this.firstState;
      this.helpMessage = "";
    }
  }

  /**
   * on keydown action
   */
  handleKeyDown(e: KeyboardEvent) {
    const reg = /^-?\d*\.?\d*$/;
    this.state = this.firstState;
    this.helpMessage = "";
    if (this.type === "number" && !reg.test(e.key)) {
      this.state = "danger";
      this.helpMessage = "The field must contain only numbers";
      setTimeout(() => {
        this.state = this.firstState;
        this.helpMessage = "";
      }, 1000);
    }
  }

  /**
   * clear input value on clear icon clicked
   */
  clearInputValue() {
    const event = new CustomEvent("input", {
      detail: {
        value: "",
        ...(this.selectedCallingCode && this.type === "tel" && { callingCode: "" }),
      },
    });
    this.value = "";

    if (this.type === "tel") {
      this.selectedCallingCode = "";
      this.callingCode = "";
    }

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

  /**
   * Toggle Password view
   */
  togglePasswordView() {
    if (this.type === "text") {
      this.type = "password";
    } else {
      this.type = "text";
    }
    this.showPassword = !this.showPassword;
  }

  _onLabelSlotChange() {
    this._hasLabel = this._labelNodes.length > 0;
  }
  _onHelpSlotChange() {
    this._hasHelperText = this._helpNodes.length > 0;
  }

  /**
   * apply styling to f-select options wrapper.
   */
  applyOptionsStyle(width: number) {
    if (this.isCodeMenuOpen)
      return `max-height:180px; transition: max-height var(--transition-time-rapid) ease-in 0s; ); width:${width}px; top:${this.optionsTop}`;
    else
      return `max-height:0px; transition: max-height var(--transition-time-rapid) ease-in 0s; ); width:${width}px; top:${this.optionsTop}`;
  }

  optionsHeight = 180;

  /**
   * options wrapper dimentions update on the basis of window screen
   */
  updateDimentions() {
    if (this.type === "tel") {
      const spaceAbove = this.wrapperElement.getBoundingClientRect().top;
      const spaceBelow = window.innerHeight - this.wrapperElement.getBoundingClientRect().bottom;
      const hasEnoughSpaceBelow = spaceBelow > this.optionsHeight;
      const optionsHeight = this.optionElement.offsetHeight;
      const heightToApply = Math.min(optionsHeight, this.optionsHeight);
      if (hasEnoughSpaceBelow || spaceBelow > spaceAbove) {
        this.preferredOpenDirection = "below";
        this.optimizedHeight = +Math.min(spaceBelow - 40, this.optionsHeight).toFixed(0);
        this.optionsTop = `${(
          this.wrapperElement.getBoundingClientRect().top +
          this.wrapperElement.offsetHeight +
          4
        ).toFixed(0)}px`;
      } else {
        this.preferredOpenDirection = "above";
        this.optimizedHeight = +Math.min(spaceAbove - 40, this.optionsHeight).toFixed(0);

        this.optionsTop = `${(
          this.wrapperElement.getBoundingClientRect().top -
          heightToApply -
          4
        ).toFixed(0)}px`;
      }
    }
  }

  /**
   * check selection for respective option.
   */
  isSelected(option: string) {
    return this.selectedCallingCode === option ? true : false;
  }

  /**
   * action for selection of options if the options is in the form of array
   */
  handleOptionSelection(option: string, e: MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (this.isSelected(option)) {
      this.selectedCallingCode = "";
    } else {
      this.selectedCallingCode = option;
    }

    this.isCodeMenuOpen = false;

    const event = new CustomEvent("input", {
      detail: {
        value: this.value,
        callingCode: option,
      },
    });
    this.dispatchEvent(event);
    this.requestUpdate();
  }

  render() {
    /**
     * on scoll apply dimetions to options wrapper
     */
    window.addEventListener(
      "scroll",
      () => {
        if (this.isCodeMenuOpen) {
          this.updateDimentions();
        }
      },
      {
        capture: true,
      }
    );

    /**
     * click outside the f-input wrapper area
     */
    window.addEventListener(
      "click",
      (e: MouseEvent) => {
        if (!this.contains(e.target as HTMLInputElement) && this.isCodeMenuOpen) {
          this.isCodeMenuOpen = false;
        }
      },
      true
    );
    /**
     * create iconLeft if available
     */
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
    const iconRight = this.iconRight
      ? html`<f-icon
          .source=${this.iconRight}
          .size=${this.iconSize}
          class=${!this.size ? "f-input-icons-size" : ""}
        ></f-icon>`
      : "";
    /**
     * append prefix
     */
    const prefixAppend =
      this.fInputPrefix || this.iconLeft
        ? html` <div class="f-input-prefix">
            ${this.fInputPrefix
              ? html`
                  <f-div
                    height="hug-content"
                    width="hug-content"
                    padding="none medium none none"
                    direction="row"
                    border="small solid default right"
                  >
                    <f-text variant="para" size="small" weight="regular" class="word-break"
                      >${this.fInputPrefix}</f-text
                    >
                  </f-div>
                `
              : ""}
            ${iconLeft}
          </div>`
        : "";

    /**
     * password view suffix
     */
    const passwordToggle =
      this.type === "password" || this.showPassword
        ? html` <f-icon
            ?clickable=${true}
            .source=${this.showPassword ? "i-hide" : "i-view"}
            .size=${this.iconSize}
            @click=${this.togglePasswordView}
            class=${!this.size ? "f-input-icons-size" : ""}
          ></f-icon>`
        : "";

    /**
     * error icon suffix
     */
    const dangerSign =
      this.state === "danger"
        ? html` <f-icon
            source="i-alert"
            .state=${this.state}
            .size=${this.iconSize}
            class=${!this.size ? "f-input-icons-size" : ""}
          ></f-icon>`
        : "";
    /**
     * main suffix
     */
    const mainSuffix =
      this.fInputSuffix || this.iconRight
        ? html`
            ${this.fInputSuffix
              ? html`
                  <f-div height="hug-content" width="hug-content" padding="none" direction="row">
                    <f-text variant="para" size="small" weight="regular" class="word-break"
                      >${this.fInputSuffix}</f-text
                    >
                  </f-div>
                `
              : ""}
            ${iconRight}
          `
        : "";
    /**
     * append suffix
     */
    const suffixAppend = !this.loading
      ? this.value && this.clear
        ? html`<div class="f-input-suffix">
            ${passwordToggle}
            <f-icon
              ?clickable=${true}
              source="i-close"
              .size=${this.iconSize}
              @click=${this.clearInputValue}
              class=${!this.size ? "f-input-icons-size" : ""}
            ></f-icon>
            ${mainSuffix} ${dangerSign}
          </div>`
        : html`<div class="f-input-suffix">${passwordToggle} ${mainSuffix} ${dangerSign}</div>`
      : html`
          <div class="f-input-suffix">${passwordToggle}${mainSuffix} ${dangerSign}</div>
          <div class="loader-suffix">${unsafeSVG(loader)}</div>
        `;

    /**
     * Final html to render
     */

    return html`
      <f-div
        padding="none"
        .gap=${this._hasLabel && this._hasHelperText ? "x-small" : "none"}
        direction="column"
        width="100%"
      >
        <f-div
          padding="none"
          gap="none"
          align="bottom-left"
          @click=${() => (this.isCodeMenuOpen = false)}
        >
          <f-div
            padding="none"
            .gap=${this._hasLabel ? "x-small" : "none"}
            direction="column"
            width="fill-container"
          >
            <f-div
              padding="none"
              gap="small"
              direction="row"
              width="hug-content"
              height="hug-content"
            >
              <f-div padding="none" direction="row" width="hug-content" height="hug-content">
                <slot name="label" @slotchange=${this._onLabelSlotChange}></slot>
              </f-div>
              <slot name="icon-toolttip"></slot>
            </f-div>
            <slot name="description"></slot>
          </f-div>
          <f-div
            .padding=${this._hasLabel ? "none" : this.maxLength ? "none none x-small none" : "none"}
            gap="none"
            width="hug-content"
          >
            ${this.maxLength
              ? html` <f-text variant="para" size="small" weight="regular" state="secondary"
                  >${(this.value as string)?.length ?? 0} / ${this.maxLength}</f-text
                >`
              : null}
          </f-div>
        </f-div>
        <f-div
          .padding=${this._hasLabel && !this._hasHelperText ? "x-small none none none" : "none"}
          gap="x-small"
          direction="row"
          width="100%"
          class="f-input-row"
          align="middle-center"
          overflow="hidden"
        >
          <div
            class="f-input-wrapper"
            id="f-input-wrapper"
            variant=${this.variant}
            category=${this.category}
            state=${this.state}
            size=${this.size}
          >
            ${this.type === "tel"
              ? html` <f-div
                  height="100%"
                  border="small solid default right"
                  align="middle-center"
                  class="f-input-tel-wrapper"
                  gap="medium"
                  padding="none medium"
                >
                  <f-div align="middle-center"
                    ><f-text variant="para" size="small" weight="regular"
                      >${this.selectedCallingCode}</f-text
                    ></f-div
                  >
                  <f-icon
                    .source=${this.isCodeMenuOpen ? "i-caret-up" : "i-caret-down"}
                    size="small"
                    clickable
                    @click=${() => {
                      this.isCodeMenuOpen = !this.isCodeMenuOpen;
                    }}
                  ></f-icon>
                </f-div>`
              : ""}
            ${prefixAppend}
            <input
              class=${classMap({ "f-input": true })}
              variant=${this.variant}
              category=${this.category}
              type=${this.type}
              state=${this.state}
              placeholder=${this.placeholder}
              .value="${this.value || ""}"
              size=${this.size}
              ?readonly=${this.readOnly}
              .maxlength="${this.maxLength}"
              @input=${this.handleInput}
              @blur=${this.handleBlur}
              @keydown=${this.handleKeyDown}
            />
            ${suffixAppend}
          </div>
        </f-div>
        ${this.type === "tel"
          ? html` <div
              class="f-input-tel-options"
              id="f-input-tel-options"
              .style="${this.applyOptionsStyle(100)}"
            >
              <f-div padding="none" gap="none" direction="column">
                ${countryCallingCodes?.map(
                  (option) =>
                    html`<f-div
                      class="f-select-options-clickable"
                      padding="medium"
                      height="hug-content"
                      width="fill-container"
                      direction="row"
                      ?clickable=${true}
                      align="middle-left"
                      gap="small"
                      .selected=${this.isSelected(option.code) ? "background" : undefined}
                      @click=${(e: MouseEvent) => {
                        this.handleOptionSelection(option.code, e);
                      }}
                      ><f-div padding="none" gap="none" height="hug-content" width="fill-container"
                        ><f-text variant="para" size="small" weight="regular"
                          >${option.code}</f-text
                        ></f-div
                      >
                      ${this.isSelected(option.code)
                        ? html` <f-div
                            padding="none"
                            gap="none"
                            height="hug-content"
                            width="hug-content"
                            ><f-icon size="medium" source="i-tick"></f-icon
                          ></f-div>`
                        : ""}
                    </f-div>`
                )}
              </f-div>
            </div>`
          : ""}
        <f-div
          .padding=${this._hasHelperText && !this._hasLabel ? "x-small none none none" : "none"}
        >
          <slot name="help" @slotchange=${this._onHelpSlotChange}></slot>
        </f-div>
        ${!this._hasHelperText && this.helpMessage
          ? html` <f-div padding="x-small none none none">
              <f-text .state=${this.state} variant="para" size="small" weight="regular"
                >${this.helpMessage}</f-text
              >
            </f-div>`
          : ""}
      </f-div>
    `;
  }
  firstUpdated() {
    this.firstState = this.state ?? "default";
    if (this.type === "tel") {
      this.selectedCallingCode = this.callingCode ?? "";
    }
  }
  updated() {
    this.updateDimentions();
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-input": FInput;
  }
}
