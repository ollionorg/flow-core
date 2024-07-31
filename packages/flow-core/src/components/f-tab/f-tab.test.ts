import { html, fixture, expect } from "@open-wc/testing";
import "@nonfx/flow-core";

import { FTab } from "@nonfx/flow-core";

describe("f-tab", () => {
	it("is defined", () => {
		const el = document.createElement("f-tab");
		expect(el).instanceOf(FTab);
	});

	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-tab></f-tab> `);
		expect(el.getAttribute("variant")).to.equal("transparent");
		expect(el.getAttribute("direction")).to.equal("horizontal");
		expect(el.getAttribute("alignment")).to.equal("left");
		expect(el.getAttribute("node-width")).to.equal("hug-content");
	});
});
