import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-counter.scss";
import { FElement } from "../../mixins/components/f-element/f-element";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";

@customElement("f-counter")
export class FCounter extends FElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];
  /**
   * @attribute A counter label denotes the numeric count of the entity associated with it
   */
  @property({ type: String })
  label!: string;

  /**
   * @attribute The medium size is the default.
   */
  @property({ reflect: true, type: String })
  size?: "large" | "medium" | "small" = "medium";

  /**
   * @attribute The state of a counter helps in indicating the degree of emphasis of the parent component. The counter component inherits the state from the parent component. By default it is subtle.
   */
  @property({ reflect: true, type: String })
  state?: "primary" | "success" | "warning" | "danger" | "neutral" = "neutral";

  /**
   * @attribute Loader icon replaces the content of the counter .
   */
  @property({ reflect: true, type: Boolean })
  loading?: boolean = false;

  /**
   * @attribute The disabled attribute can be set to keep a user from clicking on the counter.
   */
  @property({ reflect: true, type: Boolean })
  disabled?: boolean = false;

  /**
   * mention required fields here
   */
  readonly required = ["label"];

  validateProperties() {
    if (!this.label) {
      throw new Error("f-counter : label is mandatory field");
    }
  }
  render() {
    this.validateProperties();
    return html`${this.loading
      ? html`${unsafeSVG(loader)}`
      : html`${this.label}`}`;
  }
}
declare global {
  interface HTMLElementTagNameMap {
    "f-counter": FCounter;
  }
}
