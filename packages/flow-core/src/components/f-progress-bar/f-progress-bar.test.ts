import { html, fixture, expect } from "@open-wc/testing";

// import flow-core elements
import "@nonfx/flow-core";
import { FProgressBar } from "@nonfx/flow-core";

describe("f-progress-bar", () => {
	it("is defined", () => {
		const el = document.createElement("f-progress-bar");
		expect(el).instanceOf(FProgressBar);
	});
	it("should render with default values", async () => {
		const el = await fixture(html` <f-progress-bar></f-progress-bar>`);
		expect(el.getAttribute("variant")).to.equal("block");
		expect(el.getAttribute("size")).to.equal("medium");
		expect(el.getAttribute("state")).to.equal("default");
		expect(el.getAttribute("width")).to.equal("fill-container");
	});
});
