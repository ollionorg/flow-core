import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FElement } from "../../mixins/components/f-element/f-element";
import eleStyle from "./f-button.scss";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import "./../f-counter/f-counter";
import "./../f-icon/f-icon";
/**
 * @summary Buttons allow users to perform an action or to initiate a new function.
 */
@customElement("f-button")
export class FButton extends FElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute label property defines the text label on a button. Label of a button is always uppercase.
   */
  @property({ type: String })
  label!: string;

  /**
   * @attribute Use the visual style (variant) in combination with the properties to identify the type of action performed and its importance compared to other actions in the same context. Default variant for a button is filled.
   */
  @property({ reflect: true, type: String })
  variant?: "fill" | "outline" | "transparent" = "fill";

  /**
   * @attribute The medium size is the default and recommended option.
   */
  @property({ reflect: true, type: String })
  size?: "large" | "medium" | "small" | "x-small" = "medium";

  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  state?: "primary" | "neutral" | "success" | "warning" | "danger" = "primary";

  /**
   * @attribute shape of button.
   */
  @property({ reflect: true, type: String })
  shape?: "round" | "curved" | "block" = "round";

  /**
   * @attribute Icon-left enables an icon on the left of the label of a button.
   */
  @property({ reflect: true, type: String, attribute: "icon-left" })
  iconLeft?: string;

  /**
   * @attribute Icon-right enables an icon on the right of the label of a button.
   */
  @property({ reflect: true, type: String, attribute: "icon-right" })
  iconRight?: string;

  /**
   * @attribute Counter property enables a counter on the button.
   */
  @property({ reflect: true, type: Number })
  counter?: string;

  /**
   * @attribute Loader icon replaces the content of the button .
   */
  @property({ reflect: true, type: Boolean })
  loading?: boolean = false;

  /**
   * @attribute The disabled attribute can be set to keep a user from clicking on the button.
   */
  @property({ reflect: true, type: Boolean })
  disabled?: boolean = false;

  /**
   * @attribute Set true if want to wrap content if there is no space in button
   */
  @property({ reflect: true, type: Boolean, attribute: "label-wrap" })
  labelWrap?: boolean = false;

  /**
   * compute counter size based on button size
   */
  get counterSize() {
    if (this.size === "small") {
      return "medium";
    }
    if (this.size === "x-small") {
      return "small";
    }
    return this.size;
  }
  /**
   * mention required fields here for generating vue types
   */
  readonly required = ["label"];

  /**
   * validation for all atrributes
   */
  validateProperties() {
    if (!this.label) {
      throw new Error("f-button : label is mandatory field");
    }
  }

  render() {
    this.validateProperties();

    /**
     * create iconLeft if available
     */
    const iconLeft = this.iconLeft
      ? html`<f-icon
          .source=${this.iconLeft}
          class="left-icon"
          .size=${this.size}
        ></f-icon>`
      : "";
    /**
     * create iconRight if available
     */
    const iconRight = this.iconRight
      ? html`<f-icon
          .source=${this.iconRight}
          class="right-icon"
          .size=${this.size}
        ></f-icon>`
      : "";

    /**
     * create counter if available
     */
    const counter = this.counter
      ? html`<f-counter
          .size=${this.counterSize}
          .label=${this.counter}
        ></f-counter>`
      : "";
    /**
     * render loading if required
     */
    if (this.loading) {
      return html`${unsafeSVG(loader)}${this.label}`;
    }
    return html`${iconLeft}${this.label}${iconRight}${counter}`;
  }
}

/**
 * ts to know and define element
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-button": FButton;
  }
}
