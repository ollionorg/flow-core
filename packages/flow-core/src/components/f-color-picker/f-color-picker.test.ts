import { html, fixture, expect } from "@open-wc/testing";

// import flow-core elements
import "@nonfx/flow-core";

import { FColorPicker, FInput } from "@nonfx/flow-core";

describe("f-color-picker", () => {
	// check if component is defined
	it("is defined", () => {
		const el = document.createElement("f-color-picker");
		expect(el).instanceOf(FColorPicker);
	});
	it("should render with default attributes", async () => {
		const el = await fixture(html`<f-color-picker></f-color-picker>`);

		expect(el.getAttribute("variant")).to.equal("curved");
		expect(el.getAttribute("size")).to.equal("medium");
		expect(el.getAttribute("state")).to.equal("default");
	});

	it("should display color value in input box", async () => {
		const el = await fixture(html`<f-color-picker value="#CCCCCC"></f-color-picker>`);

		const input = el.shadowRoot?.querySelector<FInput>("#hex-input");
		expect(input.value).to.equal("#CCCCCC");
	});
});
