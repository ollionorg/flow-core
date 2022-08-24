import { html, fixture, expect } from "@open-wc/testing";
import "@cldcvr/flow-core";

import { ConfigUtil, FDivider } from "@cldcvr/flow-core";

describe("f-divider", () => {
  it("is defined", () => {
    const el = document.createElement("f-divider");
    expect(el).instanceOf(FDivider);
  });

  it("should render with all default properties", async () => {
    const el = await fixture(html` <f-divider></f-divider> `);
    const descendant = el.shadowRoot!.querySelectorAll("f-divider")!;
    descendant.forEach((item) => {
      expect(item.getAttribute("variant")).to.equal("solid");
      expect(item.getAttribute("size")).to.equal("medium");
      expect(item.getAttribute("state")).to.equal("default");
    });
  });
});
