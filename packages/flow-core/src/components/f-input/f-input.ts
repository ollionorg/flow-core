import { html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import eleStyle from "./f-input.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { classMap } from "lit-html/directives/class-map.js";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";

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
  clear?: boolean = false;

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

  render() {
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
      <f-div padding="none" gap="x-small" direction="column" width="100%">
        <f-div padding="none" gap="none" align="bottom-left">
          <f-div padding="none" gap="x-small" direction="column" width="fill-container">
            <slot name="label"></slot>
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
        <f-div
          padding="none"
          gap="x-small"
          direction="row"
          width="100%"
          class="f-input-row"
          align="middle-center"
          overflow="hidden"
        >
          <div
            class="f-input-wrapper"
            variant=${this.variant}
            category=${this.category}
            state=${this.state}
            size=${this.size}
          >
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
              maxlength="${this.maxLength}"
              @input=${this.handleInput}
            />
            ${suffixAppend}
          </div>
        </f-div>
        <slot name="help"></slot>
      </f-div>
    `;
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
