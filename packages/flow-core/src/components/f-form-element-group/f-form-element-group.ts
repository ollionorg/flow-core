import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-form-element-group.scss";

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@customElement("f-form-element-group")
export class FFormElementGroup extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: String, reflect: true })
  orientation?: "vertical" | "horizontal" = "vertical";

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: String, reflect: true })
  gap?: "large" | "medium" | "small" | "x-small" = "small";

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
    "f-form-element-group": FFormElementGroup;
  }
}
