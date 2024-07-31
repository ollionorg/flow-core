import { html, fixture, expect } from "@open-wc/testing";

// IconPack to test
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";
// import flow-core elements
import "@nonfx/flow-core";
import { FIconButton, ConfigUtil } from "@nonfx/flow-core";

ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-icon-button", () => {
	it("is defined", () => {
		const el = document.createElement("f-icon-button");
		expect(el).instanceOf(FIconButton);
	});
	it("should render with default values", async () => {
		const el = await fixture(html` <f-icon-button></f-icon-button>`);
		const descendant = el.shadowRoot!.querySelector(".f-icon-button")!;
		expect(descendant.getAttribute("variant")).to.equal("round");
		expect(descendant.getAttribute("category")).to.equal("fill");
		expect(descendant.getAttribute("size")).to.equal("medium");
		expect(descendant.getAttribute("state")).to.equal("primary");
	});
});
