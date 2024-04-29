import { html, fixture, expect } from "@open-wc/testing";
import { register, flowCoreElements } from "@ollion/flow-core";
register(flowCoreElements);

import { FSpacer } from "@ollion/flow-core";

describe("f-spacer", () => {
	it("is defined", () => {
		const el = document.createElement("f-spacer");
		expect(el).instanceOf(FSpacer);
	});

	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-spacer></f-spacer> `);

		expect(el.getAttribute("size")).to.equal("medium");
	});
});
