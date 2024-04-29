import { html, fixture, expect } from "@open-wc/testing";

// import flow-core elements
import { register, flowCoreElements } from "@ollion/flow-core";
register(flowCoreElements);

import { FRadio } from "@ollion/flow-core";

describe("f-radio", () => {
	it("is defined", () => {
		const el = document.createElement("f-radio");
		expect(el).instanceOf(FRadio);
	});
	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-radio></f-radio> `);
		const descendant = el.shadowRoot!.querySelector(".f-radio")!;
		expect(descendant.getAttribute("state")).to.equal("default");
	});
});
