import { expect } from "@open-wc/testing";
import "@nonfx/flow-core";

import { FTabNode } from "@nonfx/flow-core";

describe("f-tab-node", () => {
	it("is defined", () => {
		const el = document.createElement("f-tab-node");
		expect(el).instanceOf(FTabNode);
	});
});
