import { html, unsafeCSS } from "lit";
import { customElement, property, state, queryAll, query } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FText } from "../f-text/f-text";
import { FormBuilder, TempFormBuilder } from "./f-form-types";
import eleStyle from "./f-form.scss";
import { FDiv } from "../f-div/f-div";
import { FFormElementGroup } from "../f-form-element-group/f-form-element-group";
import { FFormElement } from "../f-form-element/f-form-element";
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
    ...FFormElementGroup.styles,
    ...FFormElement.styles,
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

  onFocusOut(
    field: {
      value: string;
      validationRules: [
        {
          name: string;
          when: [];
          errorPresent: boolean;
          validate: (value: string | unknown[]) => boolean;
        }
      ];
      errorPresent: boolean;
    },
  ) {
    const element = ref.value;
    console.log("hello", ref.value);
    // Binding a click event
    field.validationRules.forEach((validation) => {
      if (validation.name === "required") {
        if (!field.value) {
          validation.when.forEach((item) => {
            element?.addEventListener(item, () => {
              field.errorPresent = true;
              validation.errorPresent = true;
            });
          });
        } else {
          validation.when.forEach((item) => {
            element?.addEventListener(item, () => {
              validation.errorPresent = false;
            });
          });
        }
      }
      if (validation.name === "email" && field.value) {
        if (!isValidEmail(field.value)) {
          validation.when.forEach((item) => {
            element?.addEventListener(item, () => {
              field.errorPresent = true;
              validation.errorPresent = true;
            });
          });
        } else {
          validation.when.forEach((item) => {
            element?.addEventListener(item, () => {
              validation.errorPresent = false;
            });
          });
        }
      }
    });
    // field.validationRules.forEach((validation) => {
    //   if (validation.name === "required") {
    //     if (!field.value && this.checkForValidation(validation, "onBlur")) {
    //       field.errorPresent = true;
    //       this.updateValue(validation, true);
    //     } else {
    //       this.updateValue(validation, false);
    //     }
    //   }
    //   if (validation.name === "email") {
    //     console.log("email", field.value);
    //     if (
    //       field.value &&
    //       !isValidEmail(field.value) &&
    //       this.checkForValidation(validation, "onBlur")
    //     ) {
    //       field.errorPresent = true;
    //       this.updateValue(validation, true);
    //     } else {
    //       this.updateValue(validation, false);
    //     }
    //   }
    //   if (validation.name === "customFunction") {
    //     if (
    //       field.value &&
    //       !validation?.validate(field.value) &&
    //       this.checkForValidation(validation, "onBlur")
    //     ) {
    //       field.errorPresent = true;
    //       this.updateValue(validation, true);
    //     } else {
    //       this.updateValue(validation, false);
    //     }
    //   }
    // });
    this.requestUpdate();

    // if (field.validationRules.every((item) => !item.errorPresent)) {
    //   field.errorPresent = false;
    //   this.requestUpdate();
    // }
  }

  checkForValidation(validation: { when: [] }, trigger: string) {
    return validation.when?.some((item) => item === trigger);
  }

  updateValue(validation: { when: []; errorPresent: boolean }, value: boolean) {
    if (validation) {
      validation.errorPresent = value;
    }
  }

  // inputRef = createRef<HTMLInputElement>();

  render() {
    /**
     * Final html to render
     */

    this.localFields = this.fields;
    console.log(this.localFields);
    return html`
      <f-div padding="large" width="100%" direction="column" gap="medium">
        <f-div padding="none" gap="large" width="100%" direction="row">
          <f-text variant="heading" size="small"> ${this.localFields?.label.title} </f-text>
          ${this.localFields?.label.icon
            ? html` <f-icon source=${this.localFields.label.icon}></f-icon> `
            : ""}
        </f-div>
        <f-text variant="para" size="small"> ${this.localFields?.label.description} </f-text>
        ${this.localFields?.group.map(
          (group) => html`
            <f-form-element-group orientation=${group.direction}>
              ${group?.label?.title
                ? html` <f-text variant="para" size="small">${group?.label?.title}</f-text>`
                : ""}
              ${group.fields.map((field) => {
                return html`
                  <f-form-element
                    state=${group.state ? group.state : null}
                    validation-state=${field.errorPresent ? "danger" : ""}
                  >
                    ${field?.label?.title
                      ? html` <f-text variant="para" size="small">${field?.label?.title}</f-text>`
                      : ""}
                    ${field.type === "text"
                      ? html`
                          <f-input
                            value=${field.value}
                            placeholder=${field.placeholder}
                            @input=${()=>this.requestUpdate()}
                          ></f-input>
                          ${field.validationRules.map((validation) => {
                            if (validation.errorPresent)
                              return html` <f-div padding="none" gap="none">
                                <f-text state="danger" variant="para" size="small"
                                  >${validation.message}</f-text
                                ></f-div
                              >`;
                          })}
                        `
                      : ""}
                  </f-form-element>
                `;
              })}
            </f-form-element-group>
          `
        )}
      </f-div>
    `;
  }
  firstUpdated() {
        console.log("render", this.shadowRoot?.querySelectorAll("f-input"));
        this.shadowRoot?.querySelectorAll("f-input").forEach((element, index)=>{
          this.localFields?.group.forEach(group=>{
                  group.fields[index]?.validationRules?.forEach((validation) => {
                                console.log("render1", index, validation);

                    if (validation.name === "required") {
                      if (!group.fields[index].value) {
                         validation.when.forEach((item) => {
                           element?.addEventListener(item, () => {
                            console.log("blur")
                             group.fields[index].errorPresent = true;
                             validation.errorPresent = true;
                            this.requestUpdate();
                           });
                         });
                      } else {
                        validation.when.forEach((item) => {
                          element?.addEventListener(item, () => {
                            validation.errorPresent = false;
                            this.requestUpdate();
                          });
                        });
                      }
                    }
                    if (validation.name === "email" && group.fields[index].value) {
                      if (!isValidEmail(group.fields[index].value)) {
                        validation.when.forEach((item) => {
                          element?.addEventListener(item, () => {
                            group.fields[index].errorPresent = true;
                            validation.errorPresent = true;
                            this.requestUpdate();
                          });
                        });
                      } else {
                        validation.when.forEach((item) => {
                          element?.addEventListener(item, () => {
                            validation.errorPresent = false;
                            this.requestUpdate();
                          });
                        });
                      }
                    }
                  });
          })
        })
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
