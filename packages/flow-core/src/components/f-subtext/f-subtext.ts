import { html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-subtext.scss";

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@customElement("f-subtext")
export class FSubtext extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute local state for managing custom fill.
   */

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
    "f-subtext": FSubtext;
  }
}
