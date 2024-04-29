import { expect } from "@open-wc/testing";
import { register, flowCoreElements } from "@ollion/flow-core";
register(flowCoreElements);

import { FTemplate } from "@ollion/flow-core";

describe("f-template", () => {
	it("is defined", () => {
		const el = document.createElement("f-template");
		expect(el).instanceOf(FTemplate);
	});
});
