import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-text-area.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import { FDiv } from "../f-div/f-div";

export type FTextAreaState = "primary" | "default" | "success" | "warning" | "danger" | "inherit";

@customElement("f-text-area")
export class FTextArea extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FText.styles, ...FDiv.styles];

  /**
   * @attribute value to be inserted in text-area.
   */
  @property({ reflect: true, type: String })
  value?: string;

  /**
   * @attribute categories are of three types.
   */
  @property({ reflect: true, type: String })
  category?: "fill" | "transparent" | "outline" = "fill";

  /**
   * @attribute States are used to communicate purpose and connotations.
   */
  @property({ reflect: true, type: String })
  state?: FTextAreaState = "inherit";

  /**
   * @attribute f-text-area can have 2 sizes.
   */
  @property({ reflect: true, type: String })
  size?: "small" | "medium";

  /**
   * @attribute Defines the  no. of rows to display. By default f-text-area provides 3 rows. After 3 rows text area becomes scrollable.
   */
  @property({ reflect: true, type: String })
  row?: string;

  /**
   * @attribute Defines the placeholder text for f-text-area.
   */
  @property({ reflect: true, type: String })
  placeholder?: string;

  /**
   * @attribute This shows the character count while typing and auto limits after reaching the max length.
   */
  @property({ reflect: true, type: String, attribute: "max-length" })
  maxLength?: string;

  /**
   * @attribute Provides a resize handle on the bottom right of text-area which enables a user to resize the text-area within the parents scope.
   */
  @property({ reflect: true, type: Boolean })
  resizable?: boolean = false;

  /**
   * @attribute Displays a close icon-button on the right side of the input that allows the user to clear the input value
   */
  @property({ reflect: true, type: Boolean })
  clear?: boolean = false;

  /**
   * @attribute Displays a close icon-button on the right side of the input that allows the user to clear the input value
   */
  @property({ reflect: true, type: Boolean })
  disabled?: boolean = false;

  /**
   * emit event
   */
  handleInput(e: InputEvent) {
    e.stopPropagation();
    const event = new CustomEvent("input", {
      detail: {
        value: (e.target as HTMLInputElement)?.value,
      },
    });
    this.value = (e.target as HTMLInputElement)?.value;
    this.dispatchEvent(event);
  }

  /**
   * clear value inside f-text-area on click of clear icon.
   */
  clearValue() {
    const event = new CustomEvent("input", {
      detail: {
        value: "",
      },
    });
    this.value = "";
    this.dispatchEvent(event);
  }

  /**
   * apply styles
   */
  applyStyles(parent: HTMLElement | "") {
    if (parent && parent.style.height) {
      return `max-height: ${parent.style.height}`;
    } else {
      return `max-height: inherit`;
    }
  }

  render() {
    const parentDiv = this.parentElement?.tagName === "F-DIV" ? this.parentElement : "";
    /**
     * Final html to render
     */

    return html`
      <f-div padding="none" gap="x-small" direction="column" width="100%">
        <f-div padding="none" gap="none" align="bottom-left">
          <f-div padding="none" gap="x-small" direction="column" width="fill-container">
            <slot name="label"></slot>
            <slot name="description"></slot>
          </f-div>
          <f-div padding="none" gap="none" width="hug-content">
            ${this.maxLength
              ? html` <f-text variant="para" size="small" weight="regular" state="secondary"
                  >${this.value?.length ?? 0} / ${this.maxLength}</f-text
                >`
              : null}
          </f-div>
        </f-div>
        <div class="f-text-area-wrapper">
          <textarea
            class="f-text-area"
            style=${this.applyStyles(parentDiv)}
            state=${this.state}
            placeholder=${this.placeholder}
            category=${this.category}
            rows=${this.row ?? "3"}
            maxlength=${this.maxLength}
            ?resizable=${this.resizable}
            @input=${this.handleInput}
          >
${this.value}</textarea
          >
          ${this.clear && this.value
            ? html` <f-icon
                class="f-text-area-clear-icon"
                source="i-close"
                clickable
                size="x-small"
                @click=${this.clearValue}
              ></f-icon>`
            : null}
        </div>
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
    "f-text-area": FTextArea;
  }
}
