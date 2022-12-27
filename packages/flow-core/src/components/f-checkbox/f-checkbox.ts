import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-checkbox.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";

export type FCheckboxState = "primary" | "default" | "success" | "warning" | "danger" | "inherit";

@customElement("f-checkbox")
export class FCheckbox extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FText.styles, ...FDiv.styles];

  /**
   * @attribute variant of button.
   */
  @property({ reflect: true, type: String })
  value?: "checked" | "unchecked" | "indeterminate" = "unchecked";

  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  state?: FCheckboxState = "inherit";

  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  size?: "small" | "medium";

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
      <!-- <input class="f-checkbox" /> -->

      <div class="f-checkbox-wrapper" size=${this.size}>
        <input
          id="f-checkbox"
          type="checkbox"
          checked=${this.value === "unchecked" ? false : true}
          state=${this.state}
          class="f-checkbox"
          @input=${this.handleInput}
        />
        <label for="f-checkbox" value=${this.value} state=${this.state} size=${this.size}>
          ${this.value === "checked"
            ? html` <svg
                width="11"
                height="9"
                viewBox="0 0 11 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_350_67069)">
                  <path
                    d="M1.05501 4.754L4.38701 7.44501L9.07802 1.045"
                    stroke="#202A36"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_350_67069">
                    <rect width="10.126" height="8.195" fill="white" />
                  </clipPath>
                </defs>
              </svg>`
            : html`
                <svg
                  width="10"
                  height="2"
                  viewBox="0 0 10 2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_350_67124)">
                    <path
                      d="M0.793427 1H9.20676"
                      stroke="#202A36"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_350_67124">
                      <rect width="10" height="2" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              `}
        </label>
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
