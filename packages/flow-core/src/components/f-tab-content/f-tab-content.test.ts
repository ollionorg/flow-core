import { expect } from "@open-wc/testing";
import "@nonfx/flow-core";

import { FTabContent } from "@nonfx/flow-core";

describe("f-tab-content", () => {
	it("is defined", () => {
		const el = document.createElement("f-tab-content");
		expect(el).instanceOf(FTabContent);
	});
});
