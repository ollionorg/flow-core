import { html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import eleStyle from "./f-template.scss";
import { FElement } from "../../mixins/components/f-element/f-element";

@customElement("f-template")
export class FTemplate extends FElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "f-template": FTemplate;
  }
}
