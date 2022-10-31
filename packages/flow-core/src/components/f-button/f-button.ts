import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FElement } from "../../mixins/components/f-element/f-element";
import eleStyle from "./f-button.scss";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import { classMap } from "lit-html/directives/class-map.js";

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
   * @attribute category of button
   */
  @property({ reflect: true, type: String })
  category?: "fill" | "outline" | "transparent" = "fill";

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
   * @attribute variant of button.
   */
  @property({ reflect: true, type: String })
  variant?: "round" | "curved" | "block" = "round";

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
    /**
     * checks if host element's `:before` has shimmer by accessing  computedstyles
     */
    const hasShimmer =
      (getComputedStyle(this, "::before") as any)["animation-name"] ===
      "shimmer";

    /**
     * if hasShimmer true then add class
     */
    if (hasShimmer) {
      this.classList.add("hasShimmer");
    }
    /**
     * validate properties before render
     */
    this.validateProperties();
    /**
     * classes to apply on icon , based on category
     */
    const iconClasses = {
      "fill-button-surface": this.category === "fill",
    };
    /**
     * create iconLeft if available
     */
    const iconLeft = this.iconLeft
      ? html`<f-icon
          .source=${this.iconLeft}
          .state=${this.state}
          class=${classMap({ "left-icon": true, ...iconClasses })}
          .size=${this.size}
          clickable
        ></f-icon>`
      : "";
    /**
     * create iconRight if available
     */
    const iconRight = this.iconRight
      ? html`<f-icon
          .source=${this.iconRight}
          .state=${this.state}
          class=${classMap({ "right-icon": true, ...iconClasses })}
          .size=${this.size}
          clickable
        ></f-icon>`
      : "";

    /**
     * create counter if available
     */
    const counterClasses = {
      "fill-button-surface": this.category === "fill",
    };
    const counter = this.counter
      ? html`<f-counter
          .state=${this.category === "fill" ? "neutral" : this.state}
          .size=${this.counterSize}
          .label=${this.counter}
          class=${classMap(counterClasses)}
        ></f-counter>`
      : "";
    /**
     * render loading if required
     */
    if (this.loading) {
      return html`<button
        class=${classMap({ "f-button": true, hasShimmer })}
        category=${this.category}
        size=${this.size}
        state=${this.state}
        variant=${this.variant}
        ?loading=${this.loading}
        ?disabled=${this.disabled}
      >
        ${unsafeSVG(loader)}${this.label}
      </button>`;
    }

    /**
     * Final html to render
     */
    return html`<button
      class=${classMap({ "f-button": true, hasShimmer })}
      category=${this.category}
      size=${this.size}
      state=${this.state}
      variant=${this.variant}
      ?loading=${this.loading}
      ?disabled=${this.disabled}
    >
      ${iconLeft}${this.label}${iconRight}${counter}
    </button>`;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-button": FButton;
  }
}
