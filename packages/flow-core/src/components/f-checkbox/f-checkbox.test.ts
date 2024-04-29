import { html, fixture, expect } from "@open-wc/testing";

// import flow-core elements
import { register, flowCoreElements } from "@ollion/flow-core";
register(flowCoreElements);

import { FCheckbox } from "@ollion/flow-core";

describe("f-checkbox", () => {
	it("is defined", () => {
		const el = document.createElement("f-checkbox");
		expect(el).instanceOf(FCheckbox);
	});
	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-checkbox></f-checkbox> `);
		const descendant = el.shadowRoot!.querySelector(".f-checkbox")!;
		expect(descendant.getAttribute("state")).to.equal("default");
	});
});
