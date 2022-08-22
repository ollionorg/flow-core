import { html, fixture, expect } from "@open-wc/testing";
import loadingSVG from "./../../mixins/svg/loader";

import "@cldcvr/flow-core";

import { FCounter } from "@cldcvr/flow-core";

describe("f-counter", () => {
  it("is defined", () => {
    const el = document.createElement("f-counter");
    expect(el).instanceOf(FCounter);
  });

  it("should render label in default slot", async () => {
    const el = await fixture(html` <f-counter label="888"></f-counter> `);
    const descendant = el.shadowRoot!.querySelector(".f-counter")!;
    expect(descendant.textContent?.trim()).to.equal("888");
  });

  it("should render with all default properties", async () => {
    const el = await fixture(html` <f-counter label="78"></f-counter> `);
    const descendant = el.shadowRoot!.querySelector(".f-counter")!;
    expect(descendant.getAttribute("size")).to.equal("medium");
    expect(descendant.getAttribute("state")).to.equal("neutral");
  });

  it("should render loader", async () => {
    const el = await fixture(html` <f-counter label="12" loading></f-counter>`);
    const descendant = el.shadowRoot!.querySelector(".f-counter")!;
    const loading = descendant.children[0];
    const svg = await fixture(loadingSVG);
    expect(loading.outerHTML).equal(svg.outerHTML);
  });
  it("should throw error", async () => {
    try {
      await fixture(html` <f-counter></f-counter>`);
    } catch (e) {
      expect((e as Error).message).to.equal(
        "f-counter : label is mandatory field"
      );
    }
  });
});
