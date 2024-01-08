import { expect } from "@open-wc/testing";
import "@ollion/flow-core";

import { FTabNode } from "@ollion/flow-core";

describe("f-tab-node", () => {
	it("is defined", () => {
		const el = document.createElement("f-tab-node");
		expect(el).instanceOf(FTabNode);
	});
});
