import { expect } from "@open-wc/testing";
import "@cldcvr/flow-core";

import { FTemplate } from "@cldcvr/flow-core";

describe("f-template", () => {
  it("is defined", () => {
    const el = document.createElement("f-template");
    expect(el).instanceOf(FTemplate);
  });
});
