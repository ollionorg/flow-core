import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@nonfx/flow-core";

import { FIcon, ConfigUtil, FTextArea } from "@nonfx/flow-core";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-text-area", () => {
	it("is defined", () => {
		const el = document.createElement("f-text-area");
		expect(el).instanceOf(FTextArea);
	});
	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-text-area></f-text-area> `);
		const descendant = el.shadowRoot!.querySelector(".f-text-area")!;
		expect(descendant.getAttribute("category")).to.equal("fill");
		expect(descendant.getAttribute("state")).to.equal("default");
		expect(descendant.getAttribute("rows")).to.equal("3");
	});
	it("should render clear icon at right side", async () => {
		const el = await fixture(html` <f-text-area value="abc" ?clear=${true}></f-text-area> `);
		const descendant = el.shadowRoot!.querySelector(".f-text-area-wrapper")!;
		const icon = descendant.children[1];
		expect(icon).instanceOf(FIcon);
		expect(icon.getAttribute("source")).to.equal("i-close");
	});
});
