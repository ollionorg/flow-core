import { LitElement, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import { FTooltip } from "src/components/f-tooltip/f-tooltip";
import eleStyle from "./f-root.scss";

/**
 * @summary Every component must extent this class to consume gbobal styles , such as css reset, font family,...
 *
 */
export class FRoot extends LitElement {
  static styles = [unsafeCSS(eleStyle)];

  @query("f-popover")
  tooltipElement!: HTMLElement;

  /**
   * @attribute Value of a switch defines if it is on or off.
   */
  @property({ reflect: true, type: String })
  tooltip?: string;

  updated() {
    //check if tooltip string is present in anu of the coponents or not
    if (this.tooltip) {
      let tooltip = document.querySelector("#flow-tooltip");
      // if tooltip not present with particular id `flow-tooltip`
      if (!tooltip) {
        const tooltipDefine = `<f-tooltip placement="top" id="flow-tooltip"><f-div state="custom,black" padding="small medium">
        <f-text variant="para" size="small" id="tooltip-text">
         ${this.tooltip}
        </f-text>
      </f-div></f-tooltip>`;
        document.body?.insertAdjacentHTML("beforeend", tooltipDefine);
      }
      // if tooltip present with particular id `flow-tooltip`
      tooltip = document.querySelector("#flow-tooltip");
      this.addEventListener("mouseenter", () => {
        (tooltip as FTooltip).target = this;
        const tooltipText = tooltip?.querySelector("#tooltip-text");
        if (tooltipText) {
          tooltipText.innerHTML = this.tooltip as string;
        }
        tooltip?.setAttribute("open", "true");
      });
      this.addEventListener("mouseleave", () => {
        tooltip?.setAttribute("open", "false");
      });
    } else {
      // if current element has existing `id`
      if (this?.id) {
        // current element id should match with target of f-tooltip
        const tooltip = document.querySelector(`[target="#${this?.id}"]`);
        // if f-tooltip `target` and `element id` matches
        if (tooltip) {
          this.addEventListener("mouseenter", () => {
            tooltip?.setAttribute("open", "true");
          });
          this.addEventListener("mouseleave", () => {
            tooltip?.setAttribute("open", "false");
          });
        }
      }
    }
  }
}
