import { LitElement, unsafeCSS } from "lit";
import eleStyle from "./f-root.scss";

/**
 * @summary Every component must extent this class to consume gbobal styles , such as css reset, font family,...
 *
 */
export class FRoot extends LitElement {
  static styles = [unsafeCSS(eleStyle)];
}
