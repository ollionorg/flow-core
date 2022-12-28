import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-checkbox.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import checkedMark from "../../mixins/svg/checked-mark";
import indeterminateMark from "../../mixins/svg/indeterminate-mark";
import { FDiv } from "../f-div/f-div";

export type FCheckboxState = "primary" | "default" | "success" | "warning" | "danger" | "inherit";

@customElement("f-checkbox")
export class FCheckbox extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FDiv.styles];

  /**
   * @attribute Value of a checkbox defines if it is selected, unselected or indeterminate.
   */
  @property({ reflect: true, type: String })
  value?: "checked" | "unchecked" | "indeterminate" = "unchecked";

  /**
   * @attribute States are used to communicate purpose and connotations. State of an checkbox is controlled by its wrapper f-field.
   */
  @property({ reflect: true, type: String })
  state?: FCheckboxState = "inherit";

  /**
   * @attribute f-checkbox can have 2 sizes.
   */
  @property({ reflect: true, type: String })
  size?: "small" | "medium";

  /**
   * emit event.
   */
  handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const event = new CustomEvent("update", {
      detail: {
        value: !e.target.checked ? "checked" : "unchecked",
      },
    });
    this.dispatchEvent(event);
  }

  render() {
    /**
     * Final html to render
     */
    return html`
      <div class="f-checkbox-wrapper" size=${this.size}>
        <f-div padding="none" gap="small" align="middle-left">
          <input
            id="f-checkbox"
            class="f-checkbox"
            type="checkbox"
            checked=${this.value === "unchecked" ? false : true}
            state=${this.state}
            @input=${this.handleInput}
          />
          <label for="f-checkbox" value=${this.value} state=${this.state} size=${this.size}>
            ${this.value === "checked"
              ? html`${unsafeSVG(checkedMark)}`
              : html`${unsafeSVG(indeterminateMark)}`}
          </label>
          <f-div padding="none" align="middle-left">
            <slot name="label-title"></slot>
          </f-div>
        </f-div>
        <div size=${this.size} class="f-checkbox-description">
          <slot name="label-description"></slot>
        </div>
      </div>
    `;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-checkbox": FCheckbox;
  }
}
