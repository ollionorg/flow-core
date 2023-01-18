import { html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { FText } from "../f-text/f-text";
import eleStyle from "./f-form-group.scss";

export type FGroupLabel = { title: string; description: string; iconTooltip: string };

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@customElement("f-form-group")
export class FFormGroup extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FDiv.styles, ...FText.styles];

  @state()
  isAccordianOpen = false;

  /**
   * @attribute Label for showing group label
   */
  @property({ type: Object, reflect: true })
  label?: FGroupLabel;

  /**
   * @attribute Variant decides whether the input elements in a group have some gap or not when they are aligned horizontally.
   */
  @property({ type: String, reflect: true })
  variant?: "normal" | "compact" = "normal";

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: String, reflect: true })
  direction?: "vertical" | "horizontal" = "vertical";

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: String, reflect: true })
  gap?: "large" | "medium" | "small" | "x-small" = "small";

  /**
   * @attribute States on texts are used to communicate purpose and it’s connotation. For example, a red color connotes danger, whereas a green color connotes success and so on.
   */
  @property({ type: String, reflect: true })
  collapse?: "none" | "accordion" | "text" = "none";

  applyStyles() {
    if (this.collapse !== "none") {
      if (this.isAccordianOpen)
        return `max-height:800px; transition: max-height var(--transition-time-rapid) ease-in 0s; );`;
      else
        return `max-height:0px; transition: max-height var(--transition-time-rapid) ease-in 0s; );`;
    } else return ``;
  }

  render() {
    /**
     * Final html to render
     */
    return html`<f-div direction="column" .gap=${this.gap}>
      ${this.label &&
      Object.keys(this.label)?.length > 0 &&
      Object.values(this.label)?.every((item) => item !== undefined)
        ? html`
            <f-div direction="row" gap="auto" align="middle-left">
              <f-div gap="x-small" direction="column">
                <f-div gap="small" direction="row">
                  <f-div height="hug-content" width="hug-content">
                    <f-text
                      variant="heading"
                      size="small"
                      weight="regular"
                      .state=${this.collapse === "text" ? "primary" : "default"}
                    >
                      ${this.collapse === "text"
                        ? html`<a
                            href=""
                            @click=${(e: MouseEvent) => {
                              e.preventDefault();
                              if (this.collapse === "text") {
                                this.isAccordianOpen = !this.isAccordianOpen;
                              }
                            }}
                            >${this.label.title}</a
                          >`
                        : html`${this.label.title}`}
                    </f-text>
                  </f-div>
                  ${this.label?.iconTooltip
                    ? html` <f-icon
                        source="i-question-filled"
                        size="small"
                        state="default"
                        clickable
                      ></f-icon>`
                    : ""}
                </f-div>
                <f-div height="hug-content" width="hug-content">
                  <f-text variant="para" size="small" weight="regular">
                    ${this.label.description}
                  </f-text>
                </f-div>
              </f-div>
              <f-div width="30px">
                ${this.collapse === "accordion"
                  ? html` <f-icon
                      .source=${this.isAccordianOpen ? "i-chevron-up" : "i-chevron-down"}
                      size="small"
                      state="default"
                      clickable
                      @click=${() => (this.isAccordianOpen = !this.isAccordianOpen)}
                    ></f-icon>`
                  : ""}
              </f-div>
            </f-div>
          `
        : ""}
      ${this.isAccordianOpen || this.collapse === "none"
        ? html`
            <f-div
              direction=${this.direction === "vertical" ? "column" : "row"}
              .gap=${this.variant === "compact" && this.direction === "horizontal"
                ? "none"
                : this.gap}
              overflow="scroll"
            >
              <slot></slot>
            </f-div>
          `
        : ""}
    </f-div>`;
  }
  updated() {}
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-form-group": FFormGroup;
  }
}
