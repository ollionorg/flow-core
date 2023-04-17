import { html, fixture, expect } from "@open-wc/testing";
// importing flow-core components
import "@cldcvr/flow-core";

import { FGrid } from "@cldcvr/flow-core";

describe("f-grid", () => {
	it("is defined", () => {
		const el = document.createElement("f-grid");
		expect(el).instanceOf(FGrid);
	});
	it("should render with default values", async () => {
		const el = await fixture(html` <f-grid></f-grid> `);
		expect(el.getAttribute("gap")).to.equal("small");
	});

	it("child elements should render with min-cell-width given", async () => {
		const el = await fixture(html` <f-grid min-cell-width="150px"></f-grid> `);
		const descendant = el.querySelectorAll("f-div")!;
		console.log(descendant);
		descendant.forEach(item => expect(item.offsetWidth).to.equal(120));
	});
});
