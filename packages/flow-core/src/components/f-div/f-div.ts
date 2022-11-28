import { html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-div.scss";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import getCustomFillColor from "../../utils/get-custom-fill-color";

export type FDivBorderWidth = "small" | "medium" | "large";
export type FDivBorderStyle = "solid" | "dashed" | "dotted";
export type FDivBorderColor = "default" | "secondary" | "subtle";
export type FDivBorderPosition = "bottom" | "top" | "left" | "right" | "around";
export type FDivPadding = "x-large" | "large" | "medium" | "small" | "x-small" | "none";

export type FDivBorderProp =
  | FDivBorderWidth
  | `${FDivBorderWidth} ${FDivBorderStyle}`
  | `${FDivBorderWidth} ${FDivBorderStyle} ${FDivBorderColor}`
  | `${FDivBorderWidth} ${FDivBorderStyle} ${FDivBorderColor} ${FDivBorderPosition}`;

export type FDivPaddingProp =
  | FDivPadding
  | `${FDivPadding} ${FDivPadding}`
  | `${FDivPadding} ${FDivPadding}`
  | `${FDivPadding} ${FDivPadding} ${FDivPadding} ${FDivPadding}`;

export type FDivWidthProp =
  | "fill-container"
  | "hug-content"
  | `${number}px`
  | `${number}%`
  | `${number}vw`;

export type FDivHeightProp =
  | "fill-container"
  | "hug-content"
  | `${number}px`
  | `${number}%`
  | `${number}vh`;

export type FDivStateProp =
  | "subtle"
  | "default"
  | "secondary"
  | "tertiary"
  | "success"
  | "warning"
  | "danger"
  | "primary"
  | "transparent"
  | "inherit"
  | `custom, ${string}`;

/**
 * START :  constant values required for `f-div`
 */
const BORDER_WIDTH_VALUES = {
  small: "1px",
  medium: "2px",
  large: "4px",
};

const BORDER_COLOR_VALUES = {
  default: "var(--color-border-default)",
  subtle: "var(--color-border-subtle)",
  secondary: "var(--color-border-secondary)",
};

const PADDING_VALUES = {
  "x-large": "24px",
  large: "16px",
  medium: "12px",
  small: "8px",
  "x-small": "4px",
  none: "0px",
};

const DEFAULT_BORDER = {
  borderWidth: "small",
  borderStyle: "solid",
  borderColor: "default",
  borderPosition: "around",
};
const BORDER_POSITION_CSS = {
  bottom: "border-bottom",
  top: "border-top",
  left: "border-left",
  right: "border-right",
  around: "border",
} as Record<string, string>;

/**
 * END :  constant values required for `f-div`
 */

/**
 * @summary F-div is used as a container for HTML elements.
 */
@customElement("f-div")
export class FDiv extends FRoot {
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
   * @attribute Variants are various representations of a f-div.
   */
  @property({ type: String, reflect: true })
  variant?: "block" | "curved" = "block";
  /**
   * @attribute Direction will decide whether these elements needs to be displayed in vertical or horizontal manner.
   */
  @property({ type: String, reflect: true })
  direction?: "row" | "column" = "row";

  /**
   * @attribute state property defines the background color of a f-div. It can take only surface colors defined in the library.
   */
  @property({ reflect: true, type: String })
  state?: FDivStateProp = "transparent";

  /**
   * @attribute Border property enables a border for f-div.  You can combine border properties to achieve a desired result.
   */
  @property({
    type: String,
    reflect: true,
  })
  border?: FDivBorderProp;

  /**
   * @attribute Gap defines the space between the items of a f-div
   */
  @property({ type: String, reflect: true })
  gap?: "auto" | "x-large" | "large" | "medium" | "small" | "x-small" | "none" = "none";

  /**
   * @attribute Padding defines extra space across the elements inside a f-div.
   */
  @property({
    type: String,
    reflect: true,
  })
  padding?: FDivPaddingProp = "none";

  /**
   * @attribute Align property places the elements of a layout in particular positions with respect to the f-div.
   */
  @property({ type: String, reflect: true })
  align?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "middle-left"
    | "middle-center"
    | "middle-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right" = "top-left";

  /**
   * @attribute width of `f-div`
   */
  @property({ type: String, reflect: true })
  width?: FDivWidthProp = "fill-container";
  /**
   * @attribute height of `f-div`
   */
  @property({ type: String, reflect: true })
  height?: FDivHeightProp = "fill-container";

  /**
   * @attribute The disabled attribute can be set to keep a user from clicking on the f-icon.
   */
  @property({ reflect: true, type: Boolean })
  disabled?: boolean = false;

  /**
   * @attribute display loader
   */
  @property({ reflect: true, type: String })
  loading?: "skeleton" | "loader";

  /**
   * @attribute is clickable
   */
  @property({ reflect: true, type: Boolean })
  clickable?: boolean = false;

  /**
   * @attribute Overflow property defines the behavior of the overflowing elements inside a f-div
   */
  @property({ reflect: true, type: String })
  overflow?: "wrap" | "scroll" | "hidden" = "wrap";

  /**
   * @attribute Sets the f-div to a selected state. Select between border, background, or notch based on your use case.
   */
  @property({ reflect: true, type: String })
  selected?: "none" | "background" | "border" | "notch-right" | "notch-left" = "none";

  /**
   * @attribute Sticky property defines a f-div’s position based on the scroll position of the container
   */
  @property({ reflect: true, type: String })
  sticky?: "none" | "top" | "bottom" | "left" | "right" = "none";

  /**
   * Applying border related style, based on value
   */
  applyBorder() {
    if (this.border) {
      const [borderWidth, borderStyle, borderColor, borderPosition] = this.border.split(" ") || [];
      const meta = {
        width: BORDER_WIDTH_VALUES[(borderWidth || DEFAULT_BORDER.borderWidth) as FDivBorderWidth],
        style: borderStyle || DEFAULT_BORDER.borderStyle,
        color: BORDER_COLOR_VALUES[(borderColor || DEFAULT_BORDER.borderColor) as FDivBorderColor],
        position: borderPosition || DEFAULT_BORDER.borderPosition,
      };

      this.style.setProperty(
        BORDER_POSITION_CSS[meta.position],
        `${meta.width} ${meta.style} ${meta.color}`
      );
    }
  }

  /**
   * Applying padding related style, based on value
   */
  applyPadding() {
    if (this.padding) {
      const paddingValues = (this.padding.split(" ") || []) as FDivPadding[];

      let paddingCSS = PADDING_VALUES[`none`];
      if (paddingValues) {
        paddingCSS = paddingValues
          .slice(0, 4)
          .map((val) => {
            return PADDING_VALUES[val];
          })
          .join(" ");
      }
      this.style.padding = paddingCSS;
    }
  }

  /**
   * Applying height,width related style, based on value
   */
  applySize() {
    const fixedValues = ["fill-container", "hug-content"];
    if (this.width && !fixedValues.includes(this.width)) {
      this.style.width = this.width;
    }
    if (this.height && !fixedValues.includes(this.height)) {
      this.style.height = this.height;
    }
  }

  render() {
    /**
     * creating local fill variable out of state prop.
     */
    this.fill = getCustomFillColor(this.state ?? "");

    /**
     * START :  apply inline styles based on attribute values
     */

    if (this.state?.includes("custom") && this.fill) {
      this.style.backgroundColor = this.fill;
    } else {
      this.style.backgroundColor = "";
    }
    this.applyBorder();
    this.applyPadding();
    this.applySize();
    /**
     * END :  apply inline styles based on attribute values
     */

    /**
     * Final html to render
     */
    return html`<slot></slot>${this.loading === "loader" ? html`${unsafeSVG(loader)}` : ""}`;
  }
}

/**
 * Required for typescript
 */
declare global {
  export interface HTMLElementTagNameMap {
    "f-div": FDiv;
  }
}
