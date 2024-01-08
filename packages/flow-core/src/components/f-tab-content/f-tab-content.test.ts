import { expect } from "@open-wc/testing";
import "@ollion/flow-core";

import { FTabContent } from "@ollion/flow-core";

describe("f-tab-content", () => {
	it("is defined", () => {
		const el = document.createElement("f-tab-content");
		expect(el).instanceOf(FTabContent);
	});
});
