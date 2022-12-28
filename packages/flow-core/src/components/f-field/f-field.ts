import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { FText } from "../f-text/f-text";
import eleStyle from "./f-field.scss";

export type FFieldStateProp = "default" | "primary" | "success" | "danger" | "warning";
/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@customElement("f-field")
export class FField extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FDiv.styles, ...FText.styles];

  /**
   * @attribute States on f-field are used to communicate purpose and it’s connotation.
   */
  @property({ type: String, reflect: true })
  state?: FFieldStateProp = "default";

  /**
   * @attribute f-field can have 2 sizes.
   */
  @property({ type: String, reflect: true })
  size?: "medium" | "small";

  /**
   * @attribute Displays a description to support the input element.
   */
  @property({ type: String, reflect: true })
  description?: string;

  /**
   * @attribute Allows the input element to be duplicated by clicking on the plus button
   */
  @property({ type: Boolean, reflect: true, attribute: "can-duplicate" })
  canDuplicate?: boolean = false;

  /**
   * @attribute Shows disabled state of input element.
   */
  @property({ type: Boolean, reflect: true })
  disabled?: boolean = false;

  /**
   * @attribute Shows loading state of input element.
   */
  @property({ type: Boolean, reflect: true })
  loading?: boolean = false;

  /**
   * @attribute When true the user can not select the input element.
   */
  @property({ type: Boolean, reflect: true, attribute: "read-only" })
  readOnlyValue?: boolean = false;

  render() {
    let type;
    for (const item in this.children) {
      if (this.children[item].tagName === "F-INPUT") {
        if (this.loading) {
          this.children[item].setAttribute("loading", "");
        } else {
          this.children[item].removeAttribute("loading");
        }
      }
      if (
        this.children[item].tagName === "F-CHECKBOX" ||
        this.children[item].tagName === "F-RADIO" ||
        this.children[item].tagName === "F-SWITCH"
      ) {
        type = "f-field-inline";
      }
    }
    /**
     * Final html to render
     */
    return html`<f-div
      padding="none"
      direction="column"
      class="f-field-wrapper"
      gap="small"
      type=${type}
      ><div class="f-field" state=${this.state} size=${this.size} type=${type}><slot></slot></div>
      ${this.description
        ? html` <f-div padding="none"
            ><f-text variant="heading" size="x-small" weight="regular" .state=${this.state}
              >${this.description}</f-text
            ></f-div
          >`
        : null}
    </f-div>`;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-field": FField;
  }
}
