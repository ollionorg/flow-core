import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-divider.scss";
import { FElement } from "../../mixins/components/f-element/f-element";

@customElement("f-divider")
export class FDivider extends FElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute The solid variant is the default.
   */
  @property({ reflect: true, type: String })
  variant?: "solid" | "dashed" | "dotted" = "solid";

  /**
   * @attribute The medium size is the default.
   */
  @property({ reflect: true, type: String })
  size?: "large" | "medium" = "medium";

  /**
   * @attribute The state of Divider helps in indicating the degree of emphasis. By default it is default state.
   */
  @property({ reflect: true, type: String })
  state?: "default" | "secondary" | "subtle" = "default";

  render() {
    // render empty string, since there no need of any child element
    return html``;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-divider": FDivider;
  }
}
