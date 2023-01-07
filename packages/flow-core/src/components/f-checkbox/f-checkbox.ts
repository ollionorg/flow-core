import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-checkbox.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import checkedMark from "../../mixins/svg/checked-mark";
import indeterminateMark from "../../mixins/svg/indeterminate-mark";
import { FDiv } from "../f-div/f-div";

export type FCheckboxState = "primary" | "default" | "success" | "warning" | "danger";
export type FCheckboxElement = {
  value: string;
};

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
  state?: FCheckboxState = "default";

  /**
   * @attribute f-checkbox can have 2 sizes.
   */
  @property({ reflect: true, type: String })
  size?: "small" | "medium";

  /**
   * @attribute disables the input element
   */
  @property({ reflect: true, type: Boolean })
  disabled?: boolean = false;

  /**
   * emit event.
   */
  handleInput(e: InputEvent) {
    e.stopPropagation();
    const event = new CustomEvent<FCheckboxElement>("input", {
      detail: {
        value: !(e.target as HTMLInputElement)?.checked ? "checked" : "unchecked",
      },
    });
    this.value = !(e.target as HTMLInputElement)?.checked ? "checked" : "unchecked";
    this.dispatchEvent(event);
  }

  render() {
    /**
     * Final html to render
     */
    return html`
      <f-div
        class="f-checkbox-wrapper"
        size=${this.size}
        padding="none"
        gap="x-small"
        direction="column"
      >
        <f-div
          class="f-checkbox-section"
          size=${this.size}
          align="middle-left"
          padding="none"
          gap="medium"
        >
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
            <slot name="label"></slot>
          </f-div>
        </f-div>
        <slot name="description"></slot>
        <slot name="help"></slot>
      </f-div>
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
