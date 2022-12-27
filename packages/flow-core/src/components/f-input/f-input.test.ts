import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@cldcvr/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@cldcvr/flow-core";

import { FButton, FIcon, ConfigUtil, FCounter, FInput, FText } from "@cldcvr/flow-core";
// importing `loadingSVG` to cross check
import loadingSVG from "../../mixins/svg/loader";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-input", () => {
  it("is defined", () => {
    const el = document.createElement("f-input");
    expect(el).instanceOf(FInput);
  });
  // it("should render label in default slot", async () => {
  //   const el = await fixture(html` <f-input></f-input> `);
  //   const descendant = el.shadowRoot!.querySelector(".f-input")!;
  //   expect(descendant.textContent?.trim()).to.equal("abc");
  // });
  // it("should throw error", async () => {
  //   try {
  //     await fixture(html` <f-input></f-input>`);
  //   } catch (e) {
  //     expect((e as Error).message).to.equal("f-input : label is mandatory field");
  //   }
  // });

  it("should render with all default properties", async () => {
    const el = await fixture(html` <f-input></f-input> `);
    const descendant = el.shadowRoot!.querySelector(".f-input")!;
    expect(descendant.getAttribute("variant")).to.equal("curved");
    expect(descendant.getAttribute("category")).to.equal("fill");
    expect(descendant.getAttribute("state")).to.equal("inherit");
    expect(descendant.getAttribute("type")).to.equal("text");
  });

  it("should render icon left", async () => {
    const el = await fixture(html` <f-input icon-left="i-plus"></f-input> `);
    const descendant = el.shadowRoot!.querySelector(".f-input-prefix")!;
    const icon = descendant.children[0];
    expect(icon).instanceOf(FIcon);
  });
  it("should render icon right", async () => {
    const el = await fixture(html` <f-input icon-right="i-plus"></f-input> `);
    const descendant = el.shadowRoot!.querySelector(".f-input-suffix")!;
    const icon = descendant.children[0];
    expect(icon).instanceOf(FIcon);
  });
  it("should render with prefix string", async () => {
    const el = await fixture(html` <f-input prefix="abc"></f-input> `);
    const descendant = el.shadowRoot!.querySelector(".f-input-prefix")!;
    const ftext = descendant.children[0].children[0];
    expect(ftext).instanceOf(FText);
    expect(ftext.textContent?.trim()).equal("abc");
  });
  // it("should render loader", async () => {
  //   const el = await fixture(html` <f-input label="abc" loading></f-input> `);
  //   const descendant = el.shadowRoot!.querySelector(".f-input")!;
  //   const loading = descendant.children[0];
  //   const svg = await fixture(loadingSVG);
  //   expect(loading.outerHTML).equal(svg.outerHTML);
  // });
});
