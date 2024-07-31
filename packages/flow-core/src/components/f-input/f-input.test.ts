import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";
import { expect, fixture, html } from "@open-wc/testing";

// import flow-core elements
import "@nonfx/flow-core";

import { ConfigUtil, FIcon, FInput, FText } from "@nonfx/flow-core";
// importing `loadingSVG` to cross check
import loadingSVG from "../../mixins/svg/loader";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-input", () => {
	it("is defined", () => {
		const el = document.createElement("f-input");
		expect(el).instanceOf(FInput);
	});
	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-input></f-input> `);
		const descendant = el.shadowRoot!.querySelector(".f-input")!;
		expect(descendant.getAttribute("variant")).to.equal("curved");
		expect(descendant.getAttribute("category")).to.equal("fill");
		expect(descendant.getAttribute("state")).to.equal("default");
		expect(descendant.getAttribute("type")).to.equal("text");
	});
	it("should render icon left", async () => {
		const el = await fixture(html` <f-input icon-left="i-plus"></f-input> `);
		const descendant = el.shadowRoot!.querySelector(".f-input-prefix")!;
		const icon = descendant.children[0];
		expect(icon).instanceOf(FIcon);
	});
	it("should render icon right", async () => {
		const el = await fixture(html` <f-input icon-right="i-plus"></f-input> `);
		const descendant = el.shadowRoot!.querySelector(".f-input-suffix")!;
		const icon = descendant.children[0];
		expect(icon).instanceOf(FIcon);
	});
	it("should render with prefix string", async () => {
		const el = await fixture(html` <f-input prefix="abc"></f-input> `);
		const descendant = el.shadowRoot!.querySelector(".f-input-prefix")!;
		const ftext = descendant.children[0].children[0];
		expect(ftext).instanceOf(FText);
		expect(ftext.textContent?.trim()).equal("abc");
	});
	it("should render with suffix string", async () => {
		const el = await fixture(html` <f-input suffix="abc"></f-input> `);
		const descendant = el.shadowRoot!.querySelector(".f-input-suffix")!;
		const ftext = descendant.children[0].children[0];
		expect(ftext).instanceOf(FText);
		expect(ftext.textContent?.trim()).equal("abc");
	});
	it("should render with prefix string and prefix icon", async () => {
		const el = await fixture(html` <f-input prefix="abc" icon-left="i-app"></f-input> `);
		const descendant = el.shadowRoot!.querySelector(".f-input-prefix")!;
		const ftext = descendant.children[0].children[0];
		const ficon = descendant.children[1];
		expect(ftext).instanceOf(FText);
		expect(ficon).instanceOf(FIcon);
		expect(ftext.textContent?.trim()).equal("abc");
	});
	it("should render with suffix string and suffix icon", async () => {
		const el = await fixture(html` <f-input suffix="abc" icon-right="i-app"></f-input> `);
		const descendant = el.shadowRoot!.querySelector(".f-input-suffix")!;
		const ftext = descendant.children[0].children[0];
		const ficon = descendant.children[1];
		expect(ftext).instanceOf(FText);
		expect(ficon).instanceOf(FIcon);
		expect(ftext.textContent?.trim()).equal("abc");
	});
	it("should render clear icon at right side", async () => {
		const el = await fixture(html` <f-input value="abc" ?clear=${true}></f-input> `);
		const descendant = el.shadowRoot!.querySelector(".f-input-suffix")!;
		const icon = descendant.children[0];
		expect(icon).instanceOf(FIcon);
		expect(icon.getAttribute("source")).to.equal("i-close");
	});
	it("should render hide/view icon at right side", async () => {
		const el = await fixture(html` <f-input value="abc" type="password"></f-input> `);
		const descendant = el.shadowRoot!.querySelector(".f-input-suffix")!;
		const icon = descendant.children[0];
		expect(icon).instanceOf(FIcon);
	});
	it("should render loader", async () => {
		const el = await fixture(html` <f-input value="abc" ?loading=${true}></f-input> `);
		const descendant = el.shadowRoot!.querySelector(".loader-suffix")!;
		const loading = descendant.children[0];
		const svg = await fixture(loadingSVG);
		expect(loading.outerHTML).equal(svg.outerHTML);
	});
});
