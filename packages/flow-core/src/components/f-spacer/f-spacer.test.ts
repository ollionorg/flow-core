import { html, fixture, expect } from "@open-wc/testing";
import "@cldcvr/flow-core";

import { FSpacer } from "@cldcvr/flow-core";

describe("f-spacer", () => {
  it("is defined", () => {
    const el = document.createElement("f-spacer");
    expect(el).instanceOf(FSpacer);
  });

  it("should render with all default properties", async () => {
    const el = await fixture(html` <f-spacer></f-spacer> `);
    const descendant = el.shadowRoot!.querySelectorAll("f-spacer")!;
    descendant.forEach((item) => {
      expect(item.getAttribute("size")).to.equal("x-large");
    });
  });
});
