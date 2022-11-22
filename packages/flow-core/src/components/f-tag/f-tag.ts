import { html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-tag.scss";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import { classMap } from "lit-html/directives/class-map.js";
import { validateHTMLColor, validateHTMLColorName } from "validate-color";
import getTextContrast from "../../utils/get-text-contrast";
import getColourNameToHex from "../../utils/get-hex-color";

/**
 * @summary Tags allow users to categorize the content. They can be used to add metadata to an element such as category, or property or show a status.
 */
@customElement("f-tag")
export class FTag extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute local state for managing custom fill.
   */
  @state()
  fill = "";

  /**
   * @attribute label property defines the text label on a tag. Label of a tag is always uppercase.
   */
  @property({ type: String })
  label!: string;

  /**
   * @attribute The medium size is the default and recommended option.
   */
  @property({ reflect: true, type: String })
  size?: "large" | "medium" | "small" = "medium";

  /**
   * @attribute The states on tags are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  state?: "primary" | "neutral" | "success" | "warning" | "danger" | "inherit" | string = "neutral";

  /**
   * @attribute Icon-left enables an icon on the left of the label of a tag.
   */
  @property({ reflect: true, type: String, attribute: "icon-left" })
  iconLeft?: string;

  /**
   * @attribute Icon-right enables an icon on the right of the label of a tag.
   */
  @property({ reflect: true, type: String, attribute: "icon-right" })
  iconRight?: string;

  /**
   * @attribute Counter property enables a counter on the tag.
   */
  @property({ reflect: true, type: Number })
  counter?: string;

  /**
   * @attribute Loader icon replaces the content of the tag .
   */
  @property({ reflect: true, type: Boolean })
  loading?: boolean = false;

  /**
   * @attribute Loader icon replaces the content of the tag .
   */
  @property({ reflect: true, type: Boolean })
  selected?: boolean = false;

  /**
   * @attribute The disabled attribute can be set to keep a user from clicking on the tag.
   */
  @property({ reflect: true, type: Boolean })
  disabled?: boolean = false;

  /**
   * compute icon size based on tag size
   */
  get iconSize() {
    if (this.size === "large") {
      return "medium";
    } else if (this.size === "medium") {
      return "small";
    } else {
      return "x-small";
    }
  }

  /**
   * compute textColor when custom color of tag is defined.
   */
  get textColor() {
    if (validateHTMLColor(this.fill)) {
      return getTextContrast(this.fill);
    }
    if (validateHTMLColorName(this.fill)) {
      return getTextContrast(getColourNameToHex(this.fill));
    }
    return "inherit";
  }

  /**
   * apply inline styles to shadow-dom for custom fill.
   */
  applyStyles() {
    if (this.fill) {
      if (this.selected) {
        return `background: ${this.fill}; border: 1px solid ${this.fill}; filter: brightness(60%);`;
      } else if (this.loading) {
        return `background-color: ${this.fill}; border: 1px solid ${this.fill}; color: transparent;`;
      } else {
        return `background: ${this.fill}; border: 1px solid ${this.fill}; color: ${this.textColor}`;
      }
    }
    return "";
  }

  /**
   * validation for all atrributes
   */
  validateProperties() {
    if (!this.label && !this.iconLeft) {
      throw new Error("f-tag : label OR icon-left is mandatory field");
    }
    if (
      this.state?.includes("custom") &&
      this.fill &&
      !validateHTMLColor(this.fill) &&
      !validateHTMLColorName(this.fill)
    ) {
      throw new Error("f-tag : enter correct color-name or color-code");
    }
  }

  /**
   * cropping color name from custom filled state prop.
   */
  applyCustomFill() {
    if (this.state && this.state.includes("custom")) {
      const croppedValues = this.state.split(",").map(function (value) {
        return value.trim();
      });
      this.fill = croppedValues[1];
    }
  }

  render() {
    /**
     * creating local fill variable out of state prop.
     */
    this.applyCustomFill();

    /**
     * validate
     */
    this.validateProperties();

    /**
     * checks if host element's `:before` has shimmer by accessing  computedstyles
     */
    const hasShimmer = (getComputedStyle(this, "::before") as any)["animation-name"] === "shimmer";

    /**
     * if hasShimmer true then add class
     */
    if (hasShimmer) {
      this.classList.add("hasShimmer");
    }

    /**
     * classes to apply on icon , based on category
     */
    const iconClasses = {
      "fill-button-surface": true,
    };
    /**
     * create iconLeft if available
     */
    const iconLeft = this.iconLeft
      ? html`<f-icon
          .source=${this.iconLeft}
          .state=${this.state}
          class=${classMap({ "left-icon": true, ...iconClasses })}
          .size=${this.iconSize}
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
          .size=${this.iconSize}
        ></f-icon>`
      : "";

    /**
     * create counter if available
     */
    const counterClasses = {
      "fill-button-surface": true,
    };
    const counter = this.counter
      ? html`<f-counter
          state="neutral"
          .size=${this.size}
          .label=${Number(this.counter)}
          class=${classMap(counterClasses)}
        ></f-counter>`
      : "";
    /**
     * render loading if required
     */
    if (this.loading) {
      return html`<div
        class=${classMap({ "f-tag": true, hasShimmer })}
        style=${this.applyStyles()}
        ?label=${this.label ? true : false}
        size=${this.size}
        state=${this.state}
        ?loading=${this.loading}
        ?disabled=${this.disabled}
        ?selected=${this.selected}
      >
        ${unsafeSVG(
          this.fill
            ? `<svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="loader-svg"
              >
                <path
                  d="M24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12C0 5.37259 5.37258 5.72204e-06 12 5.72204e-06C18.6274 5.72204e-06 24 5.37259 24 12ZM3.15853 12C3.15853 16.883 7.11699 20.8415 12 20.8415C16.883 20.8415 20.8415 16.883 20.8415 12C20.8415 7.117 16.883 3.15854 12 3.15854C7.11699 3.15854 3.15853 7.117 3.15853 12Z"
                  fill="var(--color-icon-default)"
                ></path>
                <path
                  class="loader-fill"
                  d="M19.7392 2.82916C18.0239 1.38162 15.937 0.444167 13.7156 0.123279C11.4942 -0.197609 9.22734 0.110935 7.17251 1.01386C5.11768 1.91679 3.35726 3.3779 2.09124 5.23122C0.825214 7.08454 0.104336 9.25577 0.0104934 11.4983L3.28474 11.6353C3.35296 10.0052 3.87697 8.42692 4.79725 7.07973C5.71753 5.73254 6.99719 4.67044 8.49086 4.0141C9.98453 3.35776 11.6323 3.13347 13.2471 3.36673C14.8619 3.59998 16.3788 4.28143 17.6257 5.33365L19.7392 2.82916Z"
                  fill="${this.textColor === "white" ? "gray" : "black"}"
                ></path>
              </svg>`
            : loader
        )}${this.label}
      </div>`;
    }

    /**
     * Final html to render
     */
    return html`<div
      class=${classMap({ "f-tag": true, hasShimmer })}
      style=${this.applyStyles()}
      ?label=${this.label ? true : false}
      size=${this.size}
      state=${this.state}
      ?loading=${this.loading}
      ?disabled=${this.disabled}
      ?selected=${this.selected}
    >
      ${iconLeft}${this.label}${counter}${iconRight}
    </div>`;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-tag": FTag;
  }
}
