import { html, fixture, expect } from "@open-wc/testing";

import "@nonfx/flow-core";
import { FDiv } from "@nonfx/flow-core";

describe("f-div", () => {
	it("is defined", () => {
		const el = document.createElement("f-div");
		expect(el).instanceOf(FDiv);
	});

	it("should render with default values", async () => {
		const el = await fixture(html` <f-div></f-div> `);
		expect(el.getAttribute("variant")).to.equal("block");
		expect(el.getAttribute("direction")).to.equal("row");
		expect(el.getAttribute("state")).to.equal("transparent");
		expect(el.getAttribute("gap")).to.equal("none");
		expect(el.getAttribute("padding")).to.equal("none");
		expect(el.getAttribute("align")).to.equal("top-left");
		expect(el.getAttribute("width")).to.equal("fill-container");
		expect(el.getAttribute("height")).to.equal("fill-container");
		expect(el.getAttribute("overflow")).to.equal("wrap");
	});
});
