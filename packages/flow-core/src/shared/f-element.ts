import { LitElement, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import eleStyle from "./f-element.scss";
/**
 * @summary Every component must extent this class to consume gbobal styles , such as css reset, font family,...
 *
 */
export class FElement extends LitElement {
  static styles = [unsafeCSS(eleStyle)];

  @property({
    reflect: true,
    type: Boolean,
    attribute: "flow-element",
  })
  flowElement = true;

  @property({ reflect: true, type: String })
  theme = "f-dark";

  createRenderRoot() {
    return this;
  }
}
