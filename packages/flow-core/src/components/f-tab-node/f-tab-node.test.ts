import { expect } from "@open-wc/testing";
import "@cldcvr/flow-core";

import { FTabNode } from "@cldcvr/flow-core";

describe("f-tab-node", () => {
  it("is defined", () => {
    const el = document.createElement("f-tab-node");
    expect(el).instanceOf(FTabNode);
  });
});
