import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-input.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { classMap } from "lit-html/directives/class-map.js";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";

export type FInputState = "primary" | "default" | "success" | "warning" | "danger" | "inherit";

@customElement("f-input")
export class FInput extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FText.styles, ...FDiv.styles];

  /**
   * @attribute variant of button.
   */
  @property({ reflect: true, type: String })
  variant?: "curved-fill" | "round-fill" | "transparent" | "outline" = "curved-fill";

  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  state?: FInputState = "inherit";

  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  size?: "medium" | "small";

  /**
   * @attribute variant of button.
   */
  @property({ reflect: true, type: String })
  category?: "text" | "number" | "email" | "password" | "url" | "tel" | "date" | "time" = "text";

  /**
   * @attribute variant of button.
   */
  @property({ reflect: true, type: String })
  value?: string;

  /**
   * @attribute variant of button.
   */
  @property({ reflect: true, type: String })
  placeholder?: string;

  /**
   * @attribute Icon-left enables an icon on the left of the label of a button.
   */
  @property({ reflect: true, type: String, attribute: "icon-left" })
  iconLeft?: string;

  /**
   * @attribute Icon-left enables an icon on the left of the label of a button.
   */
  @property({ reflect: true, type: String, attribute: "icon-right" })
  iconRight?: string;

  /**
   * @attribute Icon-left enables an icon on the left of the label of a button.
   */
  @property({ reflect: true, type: String, attribute: "prefix" })
  prefixString?: string;

  /**
   * @attribute Icon-left enables an icon on the left of the label of a button.
   */
  @property({ reflect: true, type: String, attribute: "suffix" })
  suffixString?: string;

  /**
   * @attribute Loader icon replaces the content of the button .
   */
  @property({ reflect: true, type: Boolean })
  loading?: boolean = false;

  get isReadOnly() {
    return this.closest("f-field")?.hasAttribute("read-only") ?? false;
  }

  inputHandler(e: any) {
    console.log(e.target.value);
    this.value = e.target.value;
  }

  render() {
    /**
     * START :  apply inline styles based on attribute values
     */
    // this.applySize();
    /**
     * END :  apply inline styles based on attribute values
     */

    /**
     * Final html to render
     */

    /**
     * create iconLeft if available
     */
    const iconLeft = this.iconLeft
      ? html` <f-icon .source=${this.iconLeft} size="small"></f-icon>`
      : "";
    /**
     * create iconRight if available
     */
    const iconRight = this.iconRight
      ? html`<f-icon .source=${this.iconRight} size="small"></f-icon>`
      : "";

    const prefixAppend =
      this.prefixString || this.iconLeft
        ? html` <div class="prefix">
            ${this.prefixString
              ? html`
                  <f-div
                    height="hug-content"
                    width="hug-content"
                    padding="none medium none none"
                    direction="row"
                    border="small solid default right"
                  >
                    <f-text variant="para" size="small" weight="regular" class="word-break"
                      >${this.prefixString}</f-text
                    >
                  </f-div>
                `
              : ""}
            ${iconLeft}
          </div>`
        : "";
    const suffixAppend = !this.loading
      ? this.suffixString || this.iconRight
        ? html` <div class="suffix">
            ${this.suffixString
              ? html`
                  <f-div height="hug-content" width="hug-content" padding="none" direction="row">
                    <f-text variant="para" size="small" weight="regular" class="word-break"
                      >${this.suffixString}</f-text
                    >
                  </f-div>
                `
              : ""}
            ${iconRight}
          </div>`
        : ""
      : html`<div class="loader-suffix">${unsafeSVG(loader)}</div>`;

    return html`
      <div class="input-icons" variant=${this.variant} state=${this.state}>
        ${prefixAppend}
        <input
          class=${classMap({ "f-input": true })}
          variant=${this.variant}
          type=${this.category}
          placeholder=${this.placeholder}
          .value="${this.value || ""}"
          size=${this.size}
          ?readonly=${this.isReadOnly}
          @input="${this.inputHandler}"
        />
        ${suffixAppend}
      </div>
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
