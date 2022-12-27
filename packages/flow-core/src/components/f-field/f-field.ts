import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-field.scss";

export type FFieldStateProp = "default" | "primary" | "success" | "danger" | "warning";
/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@customElement("f-field")
export class FField extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: String, reflect: true })
  state?: FFieldStateProp = "default";

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: Boolean, reflect: true })
  disabled?: boolean = false;

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: Boolean, reflect: true })
  loading?: boolean = false;

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: Boolean, reflect: true, attribute: "read-only" })
  readOnlyValue?: boolean = false;

  render() {
    for (const item in this.children) {
      if (this.children[item].tagName === "F-INPUT") {
        if (this.loading) {
          this.children[item].setAttribute("loading", "");
        } else {
          this.children[item].removeAttribute("loading");
        }
      }
    }
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
    "f-field": FField;
  }
}
