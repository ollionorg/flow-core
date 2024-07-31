import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";
import "@nonfx/flow-core";
import { FPictogram, ConfigUtil } from "@nonfx/flow-core";

ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-pictogram", () => {
	it("is defined", () => {
		const el = document.createElement("f-pictogram");
		expect(el).instanceOf(FPictogram);
	});
	it("should throw error", async () => {
		try {
			await fixture(html` <f-pictogram></f-pictogram>`);
		} catch (e) {
			expect((e as Error).message).to.equal("f-pictogram : source is mandatory field");
		}
	});
	it("should render with default values", async () => {
		const el = await fixture(html` <f-pictogram source="A1"></f-pictogram>`);
		const descendant = el.shadowRoot!.querySelector(".f-pictogram")!;
		expect(descendant.getAttribute("variant")).to.equal("squircle");
		expect(descendant.getAttribute("size")).to.equal("large");
		expect(descendant.getAttribute("state")).to.equal("default");
	});
	it("should render img tag when source is an url", async () => {
		const source =
			"https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80";
		const htmlCheck = html`<img src="${source}" />`;
		const el = await fixture(html` <f-pictogram source="${source}"></f-pictogram>`);
		const descendant = el.shadowRoot!.querySelector(".f-pictogram")!;
		const imgTag = descendant.children[0];
		const checkForImg = await fixture(htmlCheck);
		expect(imgTag.outerHTML).equal(checkForImg.outerHTML);
	});
	it("should render p tag when source is a text", async () => {
		const source = "John Doe";
		const el = await fixture(html` <f-pictogram source="${source}"></f-pictogram>`);
		const descendant = el.shadowRoot!.querySelector(".f-pictogram")!;
		const pTag = descendant.children[0];
		expect(pTag.innerHTML).includes("JD");
	});
});
