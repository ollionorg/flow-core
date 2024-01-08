import { expect } from "@open-wc/testing";
import "@ollion/flow-core";

import { FTemplate } from "@ollion/flow-core";

describe("f-template", () => {
	it("is defined", () => {
		const el = document.createElement("f-template");
		expect(el).instanceOf(FTemplate);
	});
});
