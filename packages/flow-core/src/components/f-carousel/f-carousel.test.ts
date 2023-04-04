import { html, fixture, expect } from "@open-wc/testing";

import "@cldcvr/flow-core";
import { FCarousel, FCarouselContent, FDiv } from "@cldcvr/flow-core";

function isInViewport(element) {
	const rect = element.getBoundingClientRect();
	console.log(element);
	console.log(
		rect.top,
		rect.left,
		rect.bottom,
		rect.right,
		window.innerHeight,
		window.innerWidth,
		document.documentElement.clientHeight,
		document.documentElement.clientWidth
	);
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}

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
				expect(isInViewport(item)).to.equal(true);
			}
		});
	});
});
