import { html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-form-element.scss";

export type FFormElementStateProp = "default" | "primary" | "success" | "danger" | "warning";
/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@customElement("f-form-element")
export class FFormElement extends FRoot {
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
    "f-form-element": FFormElement;
  }
}
