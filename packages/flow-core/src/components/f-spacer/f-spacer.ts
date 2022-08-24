import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-spacer.scss";
import { FElement } from "../../mixins/components/f-element/f-element";

@customElement("f-spacer")
export class FSpacer extends FElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute The medium size is the default.
   */
  @property({ type: String })
  size?: "fill-container" | "x-large" | "large" | "medium" | "small" | "x-small" | string = "medium";

  render() {
    return html``;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "f-spacer": FSpacer;
  }
}
