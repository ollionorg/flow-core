import { expect } from "@open-wc/testing";
import "@cldcvr/flow-core";

import { FTabContent } from "@cldcvr/flow-core";

describe("f-tab-content", () => {
	it("is defined", () => {
		const el = document.createElement("f-tab-content");
		expect(el).instanceOf(FTabContent);
	});
});
