import { LitElement, unsafeCSS } from "lit";
import { html } from "lit-html";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-complex.scss";

export type FComplexTypeProp = "high" | "low" | "medium";
export type FComplexPriorityProp = "high" | "low" | "medium";
export type FComplexAssignee = {
  firstname?: string;
  lastname?: string;
  username: string;
};

export type FComplexLanguage = "vue" | "angular" | "react";

export type FComplexLanguageProp = FComplexLanguage[];

/**
 *  to test attributes of all types.
 *
 * @element f-complex
 * {@link http://cldcvr.com|Docs}
 */
@customElement("f-complex")
export class FComplex extends LitElement {
  static styles = [unsafeCSS(eleStyle)];
  /**
   * This is a description of a property with an attribute with exactly the same name: "type".
   * @type { "high" | "low" | "medium"}
   * @attr
   */
  @property({ reflect: true, type: String })
  type!: FComplexTypeProp;

  @property({ reflect: true, type: String })
  priority?: FComplexPriorityProp = "low";

  @property({ reflect: true, type: Object })
  assignee?: null | FComplexAssignee;

  @property({ reflect: true, type: Array })
  language?: FComplexLanguageProp;

  @property({ reflect: true, type: Boolean })
  active?: boolean = false;

  readonly required = ["type"];

  render() {
    return html`${this.assignee?.username}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "f-complex": FComplex;
  }
}
