import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-radio.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";

export type FRadioState = "primary" | "default" | "success" | "warning" | "danger" | "inherit";

@customElement("f-radio")
export class FRadio extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FText.styles, ...FDiv.styles];

  /**
   * @attribute variant of button.
   */
  @property({ reflect: true, type: String })
  value?: "selected" | "unselected" = "unselected";

  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  state?: FRadioState = "inherit";

  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  size?: "small" | "medium" = "medium";

  handleClick(e: any) {
    if (this.value === "unselected") {
      this.value = "selected";
    } else {
      this.value = "unselected";
    }
    e.preventDefault();
    e.stopPropagation();
  }

  render() {
    /**
     * Final html to render
     */

    return html`
      <input
        type="radio"
        class="f-radio"
        checked=${this.value === "selected" ? true : false}
        size=${this.size}
        state=${this.state}
        @click=${(e: any) => this.handleClick(e)}
      />
    `;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-radio": FRadio;
  }
}
