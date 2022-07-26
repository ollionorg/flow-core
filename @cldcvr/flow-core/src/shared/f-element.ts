import { LitElement, unsafeCSS } from "lit";
import eleStyle from "./f-element.scss";

/**
 * @summary Every component must extent this class to consume gbobal styles , such as css reset, font family,...
 *
 */
export class FElement extends LitElement {
  static styles = [unsafeCSS(eleStyle)];

  createRenderRoot() {
    return this;
  }
}
