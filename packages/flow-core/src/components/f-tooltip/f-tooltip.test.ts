import { html, fixture, expect } from "@open-wc/testing";

import "@cldcvr/flow-core";
import { FTooltip } from "@cldcvr/flow-core";

describe("f-tooltip", () => {
  it("is defined", () => {
    const el = document.createElement("f-tooltip");
    expect(el).instanceOf(FTooltip);
  });
  it("should render open tooltip ", async () => {
    const el = await fixture(html` <f-button label="add" tooltip="This is a tooltip"></f-button> `);
    // expect(el.textContent?.trim()).to.equal("Test");
    // const descendant = el.shadowRoot!.querySelector(".f-overlay")!;
    // expect(descendant).not.null;
    const tooltip = document.querySelector<FTooltip>("#flow-tooltip");
    if (tooltip) {
      const isOpen = (tooltip.open = true);
      if (isOpen) {
        console.log(tooltip.shadowRoot!.querySelector("f-popover"));
      }
    }
  });
});
