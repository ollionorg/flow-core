import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@nonfx/flow-core";

import { FTag, FIcon, ConfigUtil, FCounter } from "@nonfx/flow-core";
// importing `loadingSVG` to cross check
import loadingSVG from "../../mixins/svg/loader";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-tag", () => {
	it("is defined", () => {
		const el = document.createElement("f-tag");
		expect(el).instanceOf(FTag);
	});
	it("should render label in default slot", async () => {
		const el = await fixture(html` <f-tag label="abc"></f-tag> `);
		const descendant = el.shadowRoot!.querySelector(".f-tag")!;
		expect(descendant.textContent?.trim()).to.equal("abc");
	});
	it("should throw error", async () => {
		try {
			await fixture(html` <f-tag></f-tag>`);
		} catch (e) {
			expect((e as Error).message).to.equal("f-tag : label OR icon-left is mandatory field");
		}
	});
	it("should render custom state prop with black color label", async () => {
		const el = await fixture(html` <f-tag label="abc" state="custom, #fff"></f-tag> `);
		const descendant = el.shadowRoot!.querySelector(".f-tag")!;
		const compStyles = window.getComputedStyle(descendant);
		expect(compStyles.getPropertyValue("color")).to.equal("rgb(32, 42, 54)");
	});
	it("should render custom state prop with white color label text", async () => {
		const el = await fixture(html` <f-tag label="abc" state="custom, #000"></f-tag> `);
		const descendant = el.shadowRoot!.querySelector(".f-tag")!;
		const compStyles = window.getComputedStyle(descendant);
		expect(compStyles.getPropertyValue("color")).to.equal("rgb(252, 252, 253)");
	});
	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-tag label="abc"></f-tag> `);
		const descendant = el.shadowRoot!.querySelector(".f-tag")!;
		expect(descendant.getAttribute("size")).to.equal("medium");
		expect(descendant.getAttribute("state")).to.equal("neutral");
	});
	it("should render icon left", async () => {
		const el = await fixture(html` <f-tag label="abc" icon-left="i-plus"></f-tag> `);
		const descendant = el.shadowRoot!.querySelector(".f-tag")!;
		const icon = descendant.children[0];
		expect(icon).instanceOf(FIcon);
	});
	it("should render icon right", async () => {
		const el = await fixture(html` <f-tag label="abc" icon-right="i-plus"></f-tag> `);
		const descendant = el.shadowRoot!.querySelector(".f-tag")!;
		const icon = descendant.children[1];
		expect(icon).instanceOf(FIcon);
	});
	it("should render counter", async () => {
		const el = await fixture(html` <f-tag label="abc" counter="88"></f-tag> `);
		const descendant = el.shadowRoot!.querySelector(".f-tag")!;
		const counter = descendant.children[descendant.children.length - 1];
		expect(counter).instanceOf(FCounter);
		const descCounter = counter.shadowRoot!.querySelector(".f-counter")!;
		expect(descCounter.textContent?.trim()).equal("88");
	});
	it("should render loader", async () => {
		const el = await fixture(html` <f-tag label="abc" loading></f-tag> `);
		const descendant = el.shadowRoot!.querySelector(".f-tag")!;
		const loading = descendant.children[0];
		const svg = await fixture(loadingSVG);
		expect(loading.outerHTML).equal(svg.outerHTML);
	});
});
