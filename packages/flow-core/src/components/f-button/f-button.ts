import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FElement } from "../../mixins/components/f-element/f-element";
import eleStyle from "./f-button.scss";
/**
 * @summary Buttons allow users to perform an action or to initiate a new function.
 */
@customElement("f-button")
export class FButton extends FElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  /**
   * @attribute label property defines the text label on a button. Label of a button is always uppercase.
   */
  @property({ type: String })
  label!: string;

  /**
   * @attribute Use the visual style (variant) in combination with the properties to identify the type of action performed and its importance compared to other actions in the same context. Default variant for a button is filled.
   */
  @property({ reflect: true, type: String })
  variant?: "fill" | "outline" | "transparent" = "fill";

  /**
   * @attribute The medium size is the default and recommended option.
   */
  @property({ reflect: true, type: String })
  size?: "large" | "medium" | "small" | "x-small" = "medium";

  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  state?: "primary" | "neutral" | "success" | "warning" | "danger" = "primary";

  /**
   * @attribute shape of button.
   */
  @property({ reflect: true, type: String })
  shape?: "round" | "curved" | "block" = "round";

  /**
   * @attribute Icon-left enables an icon on the left of the label of a button.
   */
  @property({ reflect: true, type: String, attribute: "icon-left" })
  iconLeft?: string;

  /**
   * @attribute Icon-right enables an icon on the right of the label of a button.
   */
  @property({ reflect: true, type: String, attribute: "icon-right" })
  iconRight?: string;

  /**
   * @attribute Counter property enables a counter on the button.
   */
  @property({ reflect: true, type: Number })
  counter?: string;

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
   * @attribute Set true if want to wrap content if there is no space in button
   */
  @property({ reflect: true, type: Boolean, attribute: "label-wrap" })
  labelWrap?: boolean = false;

  readonly required = ["label"];

  validateProperties() {
    if (!this.label) {
      throw new Error("f-button : label is mandatory field");
    }
  }

  render() {
    this.validateProperties();
    return html`${this.label}`;
  }
}
