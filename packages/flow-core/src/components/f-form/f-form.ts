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
   * @attribute Controls size of all input elements within the form
   */
  @property({ reflect: true, type: String })
  size?: "medium" | "small" = "medium";

  /**
   * @attribute Variants are various visual representations of all elements inside form.
   */
  @property({ reflect: true, type: String })
  variant?: "curved" | "round" | "block" = "curved";

  /**
   * @attribute Categories are various visual representations of all elements inside form.
   */
  @property({ reflect: true, type: String })
  category?: "fill" | "outline" | "transparent" = "fill";

  /**
   * @attribute Gap is used to define the gap between the elements
   */
  @property({ reflect: true, type: String })
  gap?: "large" | "medium" | "small" | "x-small" = "medium";

  /**
   * @attribute group seperator
   */
  @property({ reflect: true, type: Boolean })
  seperator?: boolean = false;

  render() {
    /**
     * Final html to render
     */
    return html`
      <form gap=${this.gap}>
        <slot></slot>
      </form>
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
