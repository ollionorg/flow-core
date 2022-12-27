import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-textarea.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";

export type FTextAreaState = "primary" | "default" | "success" | "warning" | "danger" | "inherit";

@customElement("f-textarea")
export class FTextArea extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FText.styles, ...FDiv.styles];

  /**
   * @attribute variant of button.
   */
  @property({ reflect: true, type: String })
  value?: string;

  /**
   * @attribute variant of button.
   */
  @property({ reflect: true, type: String })
  category?: "fill" | "transparent" | "outline" = "fill";

  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  state?: FTextAreaState = "inherit";

  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  size?: "small" | "medium";

  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  row?: string;

  /**
   * @attribute variant of button.
   */
  @property({ reflect: true, type: String })
  placeholder?: string;

  /**
   * @attribute variant of button.
   */
  @property({ reflect: true, type: String, attribute: "max-length" })
  maxLength?: string;

  /**
   * @attribute variant of button.
   */
  @property({ reflect: true, type: Boolean })
  resizable?: boolean = false;

  /**
   * @attribute variant of button.
   */
  @property({ reflect: true, type: Boolean })
  clear?: boolean = false;

  handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const event = new CustomEvent("update", {
      detail: {
        value: e.target.value,
      },
    });
    this.dispatchEvent(event);
  }

  clearValue() {
    const event = new CustomEvent("update", {
      detail: {
        value: "",
      },
    });
    this.dispatchEvent(event);
  }

  applyStyles(parent: HTMLElement | "") {
    if (parent && parent.style.height) {
      return `max-height: ${parent.style.height}`;
    } else {
      return `max-height: inherit`;
    }
  }

  render() {
    const parentDiv = this.parentElement?.tagName === "F-DIV" ? this.parentElement : "";
    console.log(this.value);
    /**
     * Final html to render
     */

    return html`
      <!-- <f-text>dsc</f-text> -->

      <div class="textarea-group">
        <textarea
          class="f-textarea"
          style=${this.applyStyles(parentDiv)}
          placeholder=${this.placeholder}
          category=${this.category}
          rows=${this.row ?? "3"}
          maxlength=${this.maxLength}
          ?resizable=${this.resizable}
          state=${this.state}
          @input=${this.handleInput}
        >
${this.value}</textarea
        >
        ${this.clear && this.value
          ? html` <f-icon
              class="icon-user"
              source="i-close"
              clickable
              size="x-small"
              @click=${this.clearValue}
            ></f-icon>`
          : null}
      </div>
    `;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-textarea": FTextArea;
  }
}
