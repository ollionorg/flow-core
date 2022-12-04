import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
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

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: String, reflect: true })
  state?: FFormElementStateProp = "default";

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: Boolean, reflect: true, attribute: "required" })
  requiredValue?: boolean = false;

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: Boolean, reflect: true, attribute: "read-only" })
  readOnlyValue?: boolean = false;

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
