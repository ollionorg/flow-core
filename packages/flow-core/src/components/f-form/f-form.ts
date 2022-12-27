import { html, unsafeCSS } from "lit";
import { customElement, property, state, queryAll, query } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import { FormBuilder, TempFormBuilder } from "./f-form-types";
import eleStyle from "./f-form.scss";
import { FDiv } from "../f-div/f-div";
import { FFormGroup } from "../f-form-group/f-form-group";
import { FField } from "../f-field/f-field";
import isValidEmail from "../../utils/is-valid-email";
import { FInput } from "../f-input/f-input";
// import { ref, createRef } from "lit/directives/ref.js";

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@customElement("f-form")
export class FForm extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [
    unsafeCSS(eleStyle),
    ...FText.styles,
    ...FDiv.styles,
    ...FFormGroup.styles,
    ...FField.styles,
    ...FInput.styles,
  ];

  @query("f-input")
  formElements!: FRoot[];

  @state({})
  customState = "";

  @state({})
  localFields?: TempFormBuilder;

  @state({})
  customMessage = [];

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: String, reflect: true })
  fields?: FormBuilder;

  /**
   * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
   */
  @property({ reflect: true, type: String })
  size?: "medium" | "small" = "medium";

  render() {
    /**
     * Final html to render
     */

    return html`
      <f-div padding="large" width="100%" direction="column" gap="medium">
        <slot></slot>
      </f-div>
    `;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-form": FForm;
  }
}
