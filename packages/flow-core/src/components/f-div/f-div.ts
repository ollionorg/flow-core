import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FElement } from "./../../mixins/components/f-element/f-element";
import eleStyle from "./f-div.scss";

export type FDivBorderWidth = "small" | "medium" | "large";
export type FDivBorderStyle = "solid" | "dashed" | "dotted";
export type FDivBorderColor = "default" | "secondary" | "subtle";
export type FDivBorderPosition = "bottom" | "top" | "left" | "right" | "around";
export type FDivPadding = "large" | "medium" | "small" | "x-small" | "none";

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
  large: "24px",
  medium: "16px",
  small: "12px",
  "x-small": "8px",
  none: "0px",
};

const DEFAULT_BORDER = {
  borderWidth: "small",
  borderStyle: "solid",
  borderColor: "default",
  borderPosition: "bottom",
};
@customElement("f-div")
export class FDiv extends FElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute Variant will decide whether these elements needs to be displayed in vertical or horizontal manner.
   */
  @property({ type: String, reflect: true })
  variant?: "row" | "column" = "row";

  /**
   * @attribute Fill property defines the background color of a f-div. It can take only surface colors defined in the library.
   */
  @property({ type: String, reflect: true })
  fill?: "subtle" | "default" | "secondary" | "tertiary";

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
  gap?: "auto" | "x-large" | "large" | "medium" | "small" | "x-small" | "none" =
    "none";

  /**
   * @attribute Padding defines extra space across the elements inside a f-div.
   */
  @property({
    type: String,
    reflect: true,
  })
  padding?: FDivPaddingProp = "none";

  applyBorder() {
    if (this.border) {
      const [borderWidth, borderStyle, borderColor, borderPosition] =
        this.border.split(" ") || [];
      const meta = {
        width:
          BORDER_WIDTH_VALUES[
            (borderWidth || DEFAULT_BORDER.borderWidth) as FDivBorderWidth
          ],
        style: borderStyle || DEFAULT_BORDER.borderStyle,
        color:
          BORDER_COLOR_VALUES[
            (borderColor || DEFAULT_BORDER.borderColor) as FDivBorderColor
          ],
        position: borderPosition || DEFAULT_BORDER.borderPosition,
      };

      this.style.border = `${meta.width} ${meta.style} ${meta.color}`;
    }
  }

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
  render() {
    this.applyBorder();
    this.applyPadding();
    return html`<slot></slot>`;
  }
}

/**
 * ts to know and define element
 */
declare global {
  export interface HTMLElementTagNameMap {
    "f-div": FDiv;
  }
}
