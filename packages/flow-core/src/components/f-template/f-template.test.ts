import { expect } from "@open-wc/testing";
import "@nonfx/flow-core";

import { FTemplate } from "@nonfx/flow-core";

describe("f-template", () => {
	it("is defined", () => {
		const el = document.createElement("f-template");
		expect(el).instanceOf(FTemplate);
	});
});
