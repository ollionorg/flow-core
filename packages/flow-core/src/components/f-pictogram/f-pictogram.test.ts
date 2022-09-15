import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@cldcvr/flow-system-icon/dist/types/icon-pack";
import "@cldcvr/flow-core";
import { FPictogram, ConfigUtil } from "@cldcvr/flow-core";

ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-icon-button", () => {
  it("is defined", () => {
    const el = document.createElement("f-pictogram");
    expect(el).instanceOf(FPictogram);
  });
  it("should render with default values", async () => {
    const el = await fixture(html` <f-pictogram></f-pictogram>`);
    const descendant = el.shadowRoot!.querySelector(".f-pictogram")!;
    expect(descendant.getAttribute("variant")).to.equal("squircle");
    expect(descendant.getAttribute("size")).to.equal("large");
    expect(descendant.getAttribute("state")).to.equal("default");
  });
});
