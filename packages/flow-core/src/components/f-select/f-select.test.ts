import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@cldcvr/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@cldcvr/flow-core";

import { FIcon, ConfigUtil, FSelect, FText } from "@cldcvr/flow-core";
// importing `loadingSVG` to cross check
import loadingSVG from "../../mixins/svg/loader";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-select", () => {
  it("is defined", () => {
    const el = document.createElement("f-select");
    expect(el).instanceOf(FSelect);
  });
  it("should render with all default properties", async () => {
    const el = await fixture(html` <f-select .options=${["option 1"]}></f-select> `);
    const descendant = el.shadowRoot!.querySelector(".f-select-wrapper")!;
    expect(descendant.getAttribute("variant")).to.equal("curved");
    expect(descendant.getAttribute("category")).to.equal("fill");
    expect(descendant.getAttribute("state")).to.equal("default");
    expect(descendant.getAttribute("type")).to.equal("single");
  });
  //   it("should render icon left", async () => {
  //     const el = await fixture(html` <f-select icon-left="i-plus"></f-select> `);
  //     const descendant = el.shadowRoot!.querySelector(".f-select-prefix")!;
  //     const icon = descendant.children[0];
  //     expect(icon).instanceOf(FIcon);
  //   });
  //   it("should render icon right", async () => {
  //     const el = await fixture(html` <f-select icon-right="i-plus"></f-select> `);
  //     const descendant = el.shadowRoot!.querySelector(".f-select-suffix")!;
  //     const icon = descendant.children[0];
  //     expect(icon).instanceOf(FIcon);
  //   });
  //   it("should render with prefix string", async () => {
  //     const el = await fixture(html` <f-select prefix="abc"></f-select> `);
  //     const descendant = el.shadowRoot!.querySelector(".f-select-prefix")!;
  //     const ftext = descendant.children[0].children[0];
  //     expect(ftext).instanceOf(FText);
  //     expect(ftext.textContent?.trim()).equal("abc");
  //   });
  //   it("should render with suffix string", async () => {
  //     const el = await fixture(html` <f-select suffix="abc"></f-select> `);
  //     const descendant = el.shadowRoot!.querySelector(".f-select-suffix")!;
  //     const ftext = descendant.children[0].children[0];
  //     expect(ftext).instanceOf(FText);
  //     expect(ftext.textContent?.trim()).equal("abc");
  //   });
  //   it("should render with prefix string and prefix icon", async () => {
  //     const el = await fixture(html` <f-select prefix="abc" icon-left="i-app"></f-select> `);
  //     const descendant = el.shadowRoot!.querySelector(".f-select-prefix")!;
  //     const ftext = descendant.children[0].children[0];
  //     const ficon = descendant.children[1];
  //     expect(ftext).instanceOf(FText);
  //     expect(ficon).instanceOf(FIcon);
  //     expect(ftext.textContent?.trim()).equal("abc");
  //   });
  //   it("should render with suffix string and suffix icon", async () => {
  //     const el = await fixture(html` <f-select suffix="abc" icon-right="i-app"></f-select> `);
  //     const descendant = el.shadowRoot!.querySelector(".f-select-suffix")!;
  //     const ftext = descendant.children[0].children[0];
  //     const ficon = descendant.children[1];
  //     expect(ftext).instanceOf(FText);
  //     expect(ficon).instanceOf(FIcon);
  //     expect(ftext.textContent?.trim()).equal("abc");
  //   });
  //   it("should render clear icon at right side", async () => {
  //     const el = await fixture(html` <f-select value="abc" ?clear=${true}></f-select> `);
  //     const descendant = el.shadowRoot!.querySelector(".f-select-suffix")!;
  //     const icon = descendant.children[0];
  //     expect(icon).instanceOf(FIcon);
  //     expect(icon.getAttribute("source")).to.equal("i-close");
  //   });
  //   it("should render hide/view icon at right side", async () => {
  //     const el = await fixture(html` <f-select value="abc" type="password"></f-select> `);
  //     const descendant = el.shadowRoot!.querySelector(".f-select-suffix")!;
  //     const icon = descendant.children[0];
  //     expect(icon).instanceOf(FIcon);
  //   });
  //   it("should render loader", async () => {
  //     const el = await fixture(html` <f-select value="abc" ?loading=${true}></f-select> `);
  //     const descendant = el.shadowRoot!.querySelector(".loader-suffix")!;
  //     const loading = descendant.children[0];
  //     const svg = await fixture(loadingSVG);
  //     expect(loading.outerHTML).equal(svg.outerHTML);
  //   });
});
