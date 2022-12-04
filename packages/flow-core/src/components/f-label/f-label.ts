import { html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-label.scss";

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@customElement("f-label")
export class FLabel extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  render() {
    /**
     * Final html to render
     */
    return html`<slot></slot>`;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-label": FLabel;
  }
}
