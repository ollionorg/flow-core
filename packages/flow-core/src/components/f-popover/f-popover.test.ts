import { html, fixture, expect, nextFrame } from "@open-wc/testing";

import "@cldcvr/flow-core";
import { FPopover } from "@cldcvr/flow-core";

describe("f-popover", () => {
  it("is defined", () => {
    const el = document.createElement("f-popover");
    expect(el).instanceOf(FPopover);
  });
  it("should render open popover ", async () => {
    const el = await fixture(html` <f-popover open>Test</f-popover> `);
    expect(el.textContent?.trim()).to.equal("Test");
    const descendant = el.shadowRoot!.querySelector(".f-overlay")!;
    expect(descendant).not.null;
  });
  it("should render closed popover ", async () => {
    const el = await fixture(html` <f-popover>Test</f-popover> `);
    expect(el.textContent?.trim()).to.equal("Test");
    const descendant = el.shadowRoot!.querySelector(".f-overlay")!;
    expect(descendant).is.null;
  });
  it("should render without overlay ", async () => {
    const el = await fixture(
      html` <f-popover open .overlay=${false}>Test</f-popover> `
    );
    expect(el.textContent?.trim()).to.equal("Test");
    const descendant = el.shadowRoot!.querySelector(".f-overlay")!;
    expect(descendant).is.null;
  });
  it("should render with default size ", async () => {
    const el = await fixture(html` <f-popover open>Test</f-popover> `);
    expect(el.getAttribute("size")).to.equal("medium");
  });
});
