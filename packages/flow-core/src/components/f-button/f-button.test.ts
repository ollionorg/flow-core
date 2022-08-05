import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@cldcvr/flow-icon";

import "@cldcvr/flow-core";
import { FButton, FIcon, ConfigUtil, FCounter } from "@cldcvr/flow-core";
import loadingSVG from "./../../mixins/svg/loader";

ConfigUtil.setConfig({ iconPack: IconPack });
describe("f-button", () => {
  it("is defined", () => {
    const el = document.createElement("f-button");
    expect(el).instanceOf(FButton);
  });
  it("should render label in default slot", async () => {
    const el = await fixture(html` <f-button label="abc"></f-button> `);

    expect(el.textContent).to.equal("abc");
  });
  it("should throw error", async () => {
    try {
      await fixture(html` <f-button></f-button>`);
    } catch (e) {
      expect((e as Error).message).to.equal(
        "f-button : label is mandatory field"
      );
    }
  });

  it("should render with all default properties", async () => {
    const el = await fixture(html` <f-button label="abc"></f-button> `);

    expect(el.getAttribute("variant")).to.equal("round");
    expect(el.getAttribute("size")).to.equal("medium");
    expect(el.getAttribute("state")).to.equal("primary");
    expect(el.getAttribute("type")).to.equal("fill");
  });

  it("should render icon left", async () => {
    const el = await fixture(
      html` <f-button label="abc" icon-left="i-plus"></f-button> `
    );
    const icon = el.children[0];
    expect(icon).instanceOf(FIcon);
  });
  it("should render icon right", async () => {
    const el = await fixture(
      html` <f-button label="abc" icon-right="i-plus"></f-button> `
    );
    const icon = el.children[0];
    expect(icon).instanceOf(FIcon);
  });
  it("should render counter", async () => {
    const el = await fixture(
      html` <f-button label="abc" counter="88"></f-button> `
    );
    const counter = el.children[el.children.length - 1];
    expect(counter).instanceOf(FCounter);
    expect(counter.textContent).equal("88");
  });
  it("should render loader", async () => {
    const el = await fixture(html` <f-button label="abc" loading></f-button> `);
    const loading = el.children[0];
    const svg = await fixture(loadingSVG);
    expect(loading.outerHTML).equal(svg.outerHTML);
  });
});
