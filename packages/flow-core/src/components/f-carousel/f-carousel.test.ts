import { expect, fixture, oneEvent } from "@open-wc/testing";
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";
import FCarouselExample from "./i-fcarousel-example";

// import flow-core elements
import "@nonfx/flow-core";

import { ConfigUtil, FCarousel } from "@nonfx/flow-core";
import { html } from "lit";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-suggest", () => {
	it("is defined", () => {
		const el = document.createElement("f-carousel");
		expect(el).instanceOf(FCarousel);
	});
	it("it should go to next slide", async () => {
		const el = await fixture<FCarousel>(html`
			<f-carousel active-content-id="slide-3">
				${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(
					idx =>
						html`<f-carousel-content content-id=${"slide-" + idx}>
							<f-div> ${unsafeSVG(FCarouselExample)} </f-div>
							<f-text>${"slide-" + idx}</f-text>
						</f-carousel-content>`
				)}
			</f-carousel>
		`);
		await el.updateComplete;

		const listner = oneEvent(el, "next");
		el.nextArrow.click();

		const ev = await listner;
		expect(ev.detail.contentId).equals("slide-4");

		const allDots = el.dots.querySelectorAll(".dot");

		expect(allDots.item(3).classList.contains("active")).equals(true);
	});
	it("it should go to prev slide", async () => {
		const el = await fixture<FCarousel>(html`
			<f-carousel active-content-id="slide-3">
				${[1, 2, 3, 4, 5, 6, 7, 8, 9].map(
					idx =>
						html`<f-carousel-content content-id=${"slide-" + idx}>
							<f-div> ${unsafeSVG(FCarouselExample)} </f-div>
							<f-text>${"slide-" + idx}</f-text>
						</f-carousel-content>`
				)}
			</f-carousel>
		`);

		await el.updateComplete;

		const listner = oneEvent(el, "prev");
		el.prevArrow.click();

		const ev = await listner;
		expect(ev.detail.contentId).equals("slide-2");

		const allDots = el.dots.querySelectorAll(".dot");

		expect(allDots.item(1).classList.contains("active")).equals(true);
	});
});
