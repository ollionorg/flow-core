import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FElement } from "./../../mixins/components/f-element/f-element";
import eleStyle from "./f-div.scss";

@customElement("f-div")
export class FDiv extends FElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute comments baout title
   */
  @property({ type: String })
  variant?: "row" | "column" = "row";

  render() {
    return html``;
  }
}
