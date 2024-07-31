import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@nonfx/flow-core";

import { FButton, FIcon, ConfigUtil, FCounter } from "@nonfx/flow-core";
// importing `loadingSVG` to cross check
import loadingSVG from "./../../mixins/svg/loader";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-button", () => {
	it("is defined", () => {
		const el = document.createElement("f-button");
		expect(el).instanceOf(FButton);
	});
	it("should render label in default slot", async () => {
		const el = await fixture(html` <f-button label="abc"></f-button> `);
		const descendant = el.shadowRoot!.querySelector(".f-button")!;
		expect(descendant.textContent?.trim()).to.equal("abc");
	});
	it("should throw error", async () => {
		try {
			await fixture(html` <f-button></f-button>`);
		} catch (e) {
			expect((e as Error).message).to.equal("f-button : label is mandatory field");
		}
	});

	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-button label="abc"></f-button> `);
		const descendant = el.shadowRoot!.querySelector(".f-button")!;
		expect(descendant.getAttribute("variant")).to.equal("round");
		expect(descendant.getAttribute("size")).to.equal("medium");
		expect(descendant.getAttribute("state")).to.equal("primary");
		expect(descendant.getAttribute("category")).to.equal("fill");
	});

	it("should render custom state prop with black color label", async () => {
		const el = await fixture(html` <f-button label="abc" state="custom, #fff"></f-button> `);
		const descendant = el.shadowRoot!.querySelector(".f-button")!;
		const compStyles = window.getComputedStyle(descendant);
		expect(compStyles.getPropertyValue("color")).to.equal("rgb(32, 42, 54)");
	});
	it("should render custom state prop with white color label text", async () => {
		const el = await fixture(html` <f-button label="abc" state="custom, #000"></f-button> `);
		const descendant = el.shadowRoot!.querySelector(".f-button")!;
		const compStyles = window.getComputedStyle(descendant);
		expect(compStyles.getPropertyValue("color")).to.equal("rgb(252, 252, 253)");
	});

	it("should render icon left", async () => {
		const el = await fixture(html` <f-button label="abc" icon-left="i-plus"></f-button> `);
		const descendant = el.shadowRoot!.querySelector(".f-button")!;
		const icon = descendant.children[0];
		expect(icon).instanceOf(FIcon);
	});
	it("should render icon right", async () => {
		const el = await fixture(html` <f-button label="abc" icon-right="i-plus"></f-button> `);
		const descendant = el.shadowRoot!.querySelector(".f-button")!;
		const icon = descendant.children[0];
		expect(icon).instanceOf(FIcon);
	});
	it("should render counter", async () => {
		const el = await fixture(html` <f-button label="abc" counter="88"></f-button> `);
		const descendant = el.shadowRoot!.querySelector(".f-button")!;
		const counter = descendant.children[descendant.children.length - 1];
		expect(counter).instanceOf(FCounter);
		const descCounter = counter.shadowRoot!.querySelector(".f-counter")!;
		expect(descCounter.textContent?.trim()).equal("88");
	});
	it("should render loader", async () => {
		const el = await fixture(html` <f-button label="abc" loading></f-button> `);
		const descendant = el.shadowRoot!.querySelector(".f-button")!;
		const loading = descendant.children[0];
		const svg = await fixture(loadingSVG);
		expect(loading.outerHTML).equal(svg.outerHTML);
	});
});
