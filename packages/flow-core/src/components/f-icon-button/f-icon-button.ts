import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-icon-button.scss";
import { FElement } from "../../mixins/components/f-element/f-element";
import { classMap } from "lit-html/directives/class-map.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";

const variants = ["round", "curved", "block"] as const;
const types = ["fill", "outline", "transparent", "packed"] as const;
const sizes = ["large", "medium", "small", "x-small"] as const;
const states = ["primary", "danger", "warning", "success", "neutral"] as const;

export type FIconButtonVariant = typeof variants[number];
export type FIconButtonType = typeof types[number];
export type FIconButtonSize = typeof sizes[number];
export type FIconButtonState = typeof states[number];

@customElement("f-icon-button")
export class FIconButton extends FElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute Icon property defines what icon will be displayed on the icon. It can take the icon name from a library , any inline SVG or any URL for the image.
   */
  @property({ type: String })
  icon!: string;

  /**
   * @attribute Variants are various representations of an icon button. For example an icon button can be round, curved or block.
   */
  @property({ type: String })
  variant?: FIconButtonVariant = "round";
  /**
   * @attribute Type of f-icon-button
   */
  @property({ type: String })
  type?: FIconButtonType = "fill";

  /**
   * @attribute Size of f-icon-button
   */
  @property({ type: String })
  size?: FIconButtonSize = "medium";

  /**
   * @attribute Size of f-icon-button
   */
  @property({ type: String })
  state?: FIconButtonState = "primary";

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

  render() {
    const iconClasses = {
      "fill-button-surface": this.type === "fill" && this.variant !== "block",
    };

    /**
     * create counter if available
     */
    const counterClasses = {
      "fill-button-surface": this.type === "fill",
    };
    const counter = this.counter
      ? html`<f-counter
          .state=${this.type === "fill" ? "neutral" : this.state}
          .size=${this.counterSize}
          .label=${this.counter}
          class=${classMap(counterClasses)}
        ></f-counter>`
      : "";

    return html`<button
      class="f-icon-button"
      variant=${this.variant}
      type=${this.type}
      size=${this.size}
      state=${this.state}
      ?counter=${this.counter}
      ?disabled=${this.disabled}
      ?loading=${this.loading}
    >
      ${this.loading ? unsafeSVG(loader) : ""}
      <f-icon
        .source=${this.icon}
        .state=${this.state}
        .size=${this.size}
        class=${classMap(iconClasses)}
      ></f-icon>
      ${counter}
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "f-icon-button": FIconButton;
  }
}