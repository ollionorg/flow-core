import { html, fixture, expect } from "@open-wc/testing";

import "@cldcvr/flow-core";
import { FCarousel } from "@cldcvr/flow-core";

describe("f-carousel", () => {
	it("is defined", () => {
		const el = document.createElement("f-carousel");
		expect(el).instanceOf(FCarousel);
	});
	it("should render with default values", async () => {
		const el = await fixture(html` <f-carousel></f-carousel> `);
		expect(el.getAttribute("size")).to.equal("medium");
		expect(el.getAttribute("interval")).to.equal("5000");
	});
});
