import { html, fixture, expect } from "@open-wc/testing";
// importing flow-core components
import "@nonfx/flow-core";

import { FDivider } from "@nonfx/flow-core";

describe("f-divider", () => {
	it("is defined", () => {
		const el = document.createElement("f-divider");
		expect(el).instanceOf(FDivider);
	});

	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-divider></f-divider> `);

		expect(el.getAttribute("variant")).to.equal("solid");
		expect(el.getAttribute("size")).to.equal("medium");
		expect(el.getAttribute("state")).to.equal("default");
	});
});
