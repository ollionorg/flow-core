import { html, fixture, expect } from "@open-wc/testing";

import "@cldcvr/flow-core";
import { FCarousel, FCarouselContent, FDiv } from "@cldcvr/flow-core";

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
	it("should render only active content id", async () => {
		const el = await fixture(html`
			<f-carousel active-content-id=${1}>
				<f-carousel-content content-id=${0}><f-div>hello-1</f-div></f-carousel-content>
				<f-carousel-content content-id=${1}><f-div>hello-2</f-div></f-carousel-content>
				<f-carousel-content content-id=${2}><f-div>hello-3</f-div></f-carousel-content>
			</f-carousel>
		`);
		const descendants = el.querySelectorAll<FCarouselContent>("f-carousel-content")!;
		descendants.forEach(item => {
			if (item.contentId === 1) {
				const carouselContent = item.shadowRoot.querySelector<FDiv>(".f-carousel-content")!;
				expect(carouselContent).instanceOf(FDiv);
			} else {
				const carouselContent = item.shadowRoot.querySelector<FDiv>(".f-carousel-content")!;
				expect(carouselContent).to.equal(null);
			}
		});
	});
});
