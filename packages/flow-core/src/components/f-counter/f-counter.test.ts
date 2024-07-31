import { html, fixture, expect } from "@open-wc/testing";
// importing `loadingSVG` to cross check
import loadingSVG from "./../../mixins/svg/loader";
// import flow-core elements
import "@nonfx/flow-core";

import { FCounter } from "@nonfx/flow-core";

describe("f-counter", () => {
	// check if component is defined
	it("is defined", () => {
		const el = document.createElement("f-counter");
		expect(el).instanceOf(FCounter);
	});

	it("should render label in default slot", async () => {
		const el = await fixture(html` <f-counter label="888"></f-counter> `);
		const descendant = el.shadowRoot!.querySelector(".f-counter")!;
		expect(descendant.textContent?.trim()).to.equal("888");
	});

	it("label in single digit", async () => {
		const el = await fixture(html` <f-counter label="4"></f-counter> `);
		const descendant = el.shadowRoot!.querySelector(".f-counter")!;
		expect(descendant.textContent?.trim()).to.equal("04");
	});

	it("label between 999 and 10,000", async () => {
		const el = await fixture(html` <f-counter label="8760"></f-counter> `);
		const descendant = el.shadowRoot!.querySelector(".f-counter")!;
		expect(descendant.textContent?.trim()).to.equal("8.8K");
	});

	it("label Between 10,000 and 1 million", async () => {
		const el = await fixture(html` <f-counter label="887650"></f-counter> `);
		const descendant = el.shadowRoot!.querySelector(".f-counter")!;
		expect(descendant.textContent?.trim()).to.equal("888K");
	});

	it("label Between 1 million and 10 million", async () => {
		const el = await fixture(html` <f-counter label="2560000"></f-counter> `);
		const descendant = el.shadowRoot!.querySelector(".f-counter")!;
		expect(descendant.textContent?.trim()).to.equal("2.6M");
	});

	it("label for 10 million and above", async () => {
		const el = await fixture(html` <f-counter label="678000000"></f-counter> `);
		const descendant = el.shadowRoot!.querySelector(".f-counter")!;
		expect(descendant.textContent?.trim()).to.equal("678M");
	});

	it("label for Billions", async () => {
		const el = await fixture(html` <f-counter label="13404000000"></f-counter> `);
		const descendant = el.shadowRoot!.querySelector(".f-counter")!;
		expect(descendant.textContent?.trim()).to.equal("13B");
	});

	it("label for Trillions", async () => {
		const el = await fixture(html` <f-counter label="16500040000000"></f-counter> `);
		const descendant = el.shadowRoot!.querySelector(".f-counter")!;
		expect(descendant.textContent?.trim()).to.equal("17T");
	});

	it("should render custom state prop with black color label", async () => {
		const el = await fixture(html` <f-counter label="888" state="custom, #fff"></f-counter> `);
		const descendant = el.shadowRoot!.querySelector(".f-counter")!;
		const compStyles = window.getComputedStyle(descendant);
		expect(compStyles.getPropertyValue("color")).to.equal("rgb(32, 42, 54)");
	});
	it("should render custom state prop with white color label text", async () => {
		const el = await fixture(html` <f-counter label="888" state="custom, #000"></f-counter> `);
		const descendant = el.shadowRoot!.querySelector(".f-counter")!;
		const compStyles = window.getComputedStyle(descendant);
		expect(compStyles.getPropertyValue("color")).to.equal("rgb(252, 252, 253)");
	});

	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-counter label="78"></f-counter> `);
		const descendant = el.shadowRoot!.querySelector(".f-counter")!;
		expect(descendant.getAttribute("size")).to.equal("medium");
		expect(descendant.getAttribute("state")).to.equal("neutral");
		expect(descendant.getAttribute("category")).to.equal("fill");
	});

	it("should render loader", async () => {
		const el = await fixture(html` <f-counter label="12" loading></f-counter>`);
		const descendant = el.shadowRoot!.querySelector(".f-counter")!;
		const loading = descendant.children[0];
		const svg = await fixture(loadingSVG);
		expect(loading.outerHTML).equal(svg.outerHTML);
	});
	it("should throw error", async () => {
		try {
			await fixture(html` <f-counter></f-counter>`);
		} catch (e) {
			expect((e as Error).message).to.equal("f-counter : label is mandatory field");
		}
	});
});
