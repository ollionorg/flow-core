import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FElement } from "./../../mixins/components/f-element/f-element";
import eleStyle from "./f-text.scss";

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@customElement("f-text")
export class FText extends FElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute Variants of text component are use cases such as Heading, paragraph, and code.
   */
  @property({ type: String, reflect: true })
  variant?: "heading" | "para" | "code" = "para";

  /**
   * @attribute Each variant has various sizes. By default medium is the default size.
   */
  @property({ type: String, reflect: true })
  size?: "x-large" | "large" | "medium" | "small" | "x-small" = "medium";

  /**
   * @attribute Weight property defines the visual weight of the text such as regular, medium and bold.
   */
  @property({ type: String, reflect: true })
  weight?: "bold" | "medium" | "regular";

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: String, reflect: true })
  state?:
    | "default"
    | "secondary"
    | "subtle"
    | "primary"
    | "success"
    | "danger"
    | "warning" = "default";

  /**
   * @attribute Sets the alignment of the text. Can take 3 values: left, center, and right.
   */
  @property({ type: String, reflect: true })
  align?: "left" | "center" | "right" = "left";

  /**
   * @attribute Loader icon replaces the content of the button .
   */
  @property({ reflect: true, type: Boolean })
  loading?: boolean = false;

  /**
   * @attribute The disabled attribute can be set to keep a user from clicking on the button.
   */
  @property({ reflect: true, type: Boolean })
  disabled?: boolean = false;

  /**
   * @attribute is text editatble
   */
  @property({ reflect: true, type: Boolean })
  editable?: boolean = false;

  /**
   * @attribute will ellipsis apply on overflow
   */
  @property({ reflect: true, type: Boolean })
  ellipsis?: boolean = false;
  /**
   * @attribute will display `more` link after 2 lines
   */
  @property({ reflect: true, type: Boolean })
  expandable?: boolean = false;

  protected _contentBeforeFocus = "";
  protected value = "";

  constructor() {
    super();
    this.addEventListener("focusin", this._handleFocusIn);
    this.addEventListener("keyup", this._handleKeyUp);
  }
  _handleFocusIn() {
    if (this.editable) {
      this._contentBeforeFocus = this.innerHTML;
    }
  }
  _handleKeyUp(event: KeyboardEvent) {
    if (this.editable) {
      if (event.key === "Escape") {
        this.blur();
        this.innerHTML = this._contentBeforeFocus;
      }
      if (event.key === "Enter" && !event.shiftKey) {
        this.value = this.innerHTML;
        this.blur();
        this.dispatchEvent(new Event("input", { bubbles: true }));
      }
    }
  }
  get isTextClamped() {
    return this.scrollHeight > this.clientHeight && this.expandable;
  }
  render() {
    if (this.editable) {
      this.contentEditable = "true";
    } else {
      this.contentEditable = "false";
    }

    if (!this.weight) {
      if (this.variant === "heading") {
        this.weight = "bold";
      } else {
        this.weight = "regular";
      }
    }

    // if (this.isTextClamped) {
    //   const span = document.createElement("span");
    //   span.innerHTML = "more";
    //   this.appendChild(span);
    // }
    return html``;
  }
}
