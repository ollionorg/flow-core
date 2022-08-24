import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-spacer.scss";
import { FElement } from "../../mixins/components/f-element/f-element";

export type FSpacerWidthProp =
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
  size?: FSpacerWidthProp = "fill-container";

  applySize() {
    const fixedValues = ["fill-container", "x-large", "large", "medium", "small", "x-small"];
    const parentDiv = document?.querySelector("f-spacer")?.closest("f-div");
    if (this.size && !fixedValues.includes(this.size)) {
      if (parentDiv?.direction === "column") {
        this.style.height = this.size;
        this.style.width = "100%";
      } else {
        this.style.width = this.size;
        this.style.height = "100%";
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
