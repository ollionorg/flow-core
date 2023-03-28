import { html, fixture, expect } from "@open-wc/testing";

import "@cldcvr/flow-core";
import { FCarouselContent, FDiv } from "@cldcvr/flow-core";

describe("f-carousel-content", () => {
	it("is defined", () => {
		const el = document.createElement("f-carousel-content");
		expect(el).instanceOf(FCarouselContent);
	});
	it("active false display style to be none", async () => {
		const el = await fixture(html` <f-carousel-content></f-carousel-content> `);
		const descendant = el.shadowRoot!.querySelector<FDiv>(".f-carousel-content")!;
		expect(descendant.style.display).to.equal("none");
	});
});