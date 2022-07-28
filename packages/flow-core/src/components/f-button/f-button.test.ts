import { html, fixture, expect } from "@open-wc/testing";

import "@cldcvr/flow-core";
import { FButton } from "@cldcvr/flow-core";

describe("FButton", () => {
  it("is defined", () => {
    const el = document.createElement("f-button");
    expect(el).instanceOf(FButton);
  });
  it("should render label in default slot", async () => {
    const el = await fixture(html` <f-button label="abc"></f-button> `);
    console.log(el);
    expect(el.textContent).to.equal("abc");
  });

  it("should render with all default properties", async () => {
    const el = await fixture(html` <f-button label="abc"></f-button> `);

    expect(el.getAttribute("variant")).to.equal("fill");
    expect(el.getAttribute("size")).to.equal("medium");
    expect(el.getAttribute("state")).to.equal("primary");
    expect(el.getAttribute("shape")).to.equal("round");
  });
});
