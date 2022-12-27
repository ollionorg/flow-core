import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-switch.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";

export type FSwitchState = "primary" | "default" | "success" | "warning" | "danger" | "inherit";

@customElement("f-switch")
export class FSwitch extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FText.styles, ...FDiv.styles];

  /**
   * @attribute variant of button.
   */
  @property({ reflect: true, type: String })
  value?: "on" | "off" = "off";

  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  state?: FSwitchState = "inherit";

  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  size?: "small" | "medium";

  handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const event = new CustomEvent("update", {
      detail: {
        value: e.target.checked ? "off" : "on",
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    /**
     * Final html to render
     */

    return html`<label class="f-switch" size=${this.size} state=${this.state}>
      <input
        type="checkbox"
        checked=${this.value === "on" ? true : false}
        @input=${this.handleInput}
      />
      <span class="slider round"></span>
    </label>`;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-switch": FSwitch;
  }
}
