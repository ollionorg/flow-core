import { html, unsafeCSS } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import eleStyle from "./f-tooltip.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { FText } from "../f-text/f-text";
import { FPopover } from "../f-popover/f-popover";

export type FTooltipPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "right"
  | "right-start"
  | "right-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "auto";

@customElement("f-tooltip")
export class FTooltip extends FRoot {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle), ...FDiv.styles, ...FText.styles, ...FPopover.styles];

  /**
   * local attribute for opem/close of tooltip
   */
  @state()
  open = false;

  /**
   * @attribute placement of `f-tooltip`
   */
  @property({ type: String, reflect: true })
  placement?: FTooltipPlacement = "auto";

  /**
   * @attribute query selector of target
   */
  @property({ type: [String, Object], reflect: true })
  target!: string | HTMLElement;

  /**
   * record the attribute change of open and close and render accordingly.
   */
  connectedCallback() {
    super.connectedCallback();
    const tooltip = this.closest("f-tooltip");
    if (tooltip) {
      const observer = new MutationObserver((mutationList) => {
        mutationList.forEach((mutation) => {
          switch (mutation.type) {
            case "attributes":
              if (tooltip?.getAttribute("open") === "true") {
                this.open = true;
              }
              if (tooltip?.getAttribute("open") === "false") {
                this.open = false;
              }
              break;
          }
        });
      });
      const observerOptions = {
        attributes: true,
      };
      observer.observe(tooltip, observerOptions);
      this.requestUpdate();
    } else {
      this.open = false;
    }
  }

  render() {
    /**
     * Final html to render
     */
    return html`<f-popover
      .overlay=${false}
      .placement=${this.placement}
      ?open=${this.open}
      .target=${this.target}
      class="tooltip"
    >
      <slot></slot>
    </f-popover>`;
  }
}

/**
 * Required for typescript
 */
declare global {
  interface HTMLElementTagNameMap {
    "f-tooltip": FTooltip;
  }
}
