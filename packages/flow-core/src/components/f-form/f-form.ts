import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import eleStyle from "./f-form.scss";
import { FDiv } from "../f-div/f-div";

// import { ref, createRef } from "lit/directives/ref.js";

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@customElement("f-form")
export class FForm extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FText.styles, ...FDiv.styles];
  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  size?: "medium" | "small" = "medium";

  render() {
    /**
     * Final html to render
     */

    return html`
      <f-div padding="large" width="100%" direction="column" gap="medium">
        <slot></slot>
      </f-div>
    `;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-form": FForm;
  }
}
