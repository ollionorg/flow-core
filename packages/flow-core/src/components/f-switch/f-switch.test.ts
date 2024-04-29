import { html, fixture, expect } from "@open-wc/testing";

// import flow-core elements
import { register, flowCoreElements } from "@ollion/flow-core";
register(flowCoreElements);

import { FSwitch } from "@ollion/flow-core";

describe("f-switch", () => {
	it("is defined", () => {
		const el = document.createElement("f-switch");
		expect(el).instanceOf(FSwitch);
	});
	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-switch></f-switch> `);
		const descendant = el.shadowRoot!.querySelector(".f-switch")!;
		expect(descendant.getAttribute("state")).to.equal("default");
	});
});
