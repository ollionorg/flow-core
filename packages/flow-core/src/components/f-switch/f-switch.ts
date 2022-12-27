import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-switch.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";

export type FSwitchState = "primary" | "default" | "success" | "warning" | "danger" | "inherit";

@customElement("f-switch")
export class FSwitch extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute Value of a switch defines if it is on or off.
   */
  @property({ reflect: true, type: String })
  value?: "on" | "off" = "off";

  /**
   * @attribute States are used to communicate purpose and connotations.
   */
  @property({ reflect: true, type: String })
  state?: FSwitchState = "inherit";

  /**
   * @attribute f-switch can have 2 sizes.
   */
  @property({ reflect: true, type: String })
  size?: "small" | "medium";

  /**
   * emit event.
   */
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
      <span class="f-switch-slider"></span>
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
