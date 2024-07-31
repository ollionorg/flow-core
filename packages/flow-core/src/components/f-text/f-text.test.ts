import { html, fixture, expect } from "@open-wc/testing";

import "@nonfx/flow-core";
import { FText } from "@nonfx/flow-core";

describe("f-text", () => {
	it("is defined", () => {
		const el = document.createElement("f-text");
		expect(el).instanceOf(FText);
	});
	it("should render with default values", async () => {
		const el = await fixture(html` <f-text>Test inner text</f-text> `);
		expect(el.getAttribute("variant")).to.equal("para");
		expect(el.getAttribute("size")).to.equal("medium");
		expect(el.getAttribute("state")).to.equal("default");
		expect(el.getAttribute("align")).to.equal("left");

		expect(el.textContent?.trim()).to.equal("Test inner text");
	});
});
