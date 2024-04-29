import { expect } from "@open-wc/testing";
import { register, flowCoreElements } from "@ollion/flow-core";
register(flowCoreElements);

import { FTabContent } from "@ollion/flow-core";

describe("f-tab-content", () => {
	it("is defined", () => {
		const el = document.createElement("f-tab-content");
		expect(el).instanceOf(FTabContent);
	});
});
