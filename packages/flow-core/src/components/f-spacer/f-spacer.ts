import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-spacer.scss";
import { FElement } from "../../mixins/components/f-element/f-element";

export type FSpacerSizeProp =
  | "fill-container"
  | "x-large"
  | "large"
  | "medium"
  | "small"
  | "x-small"
  | `${number}px`
  | `${number}%`
  | `${number}vw`;

@customElement("f-spacer")
export class FSpacer extends FElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute width of `f-spacer`
   */
  @property({ type: String, reflect: true })
  size?: FSpacerSizeProp = "medium";

  applySize() {
    const fixedValues = [
      "fill-container",
      "x-large",
      "large",
      "medium",
      "small",
      "x-small",
    ];
    const parentDiv = this?.closest("f-div");
    if (this.size && !fixedValues.includes(this.size)) {
      if (parentDiv?.direction === "row") {
        this.style.width = this.size;
        this.style.height = "100%";
      } else {
        this.style.height = this.size;
        this.style.width = "100%";
      }
    }
  }

  render() {
    this.applySize();
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "f-spacer": FSpacer;
  }
}
