import { html, fixture, expect } from "@open-wc/testing";

import "@nonfx/flow-core";
import { FFormGroup } from "@nonfx/flow-core";

describe("f-form-group", () => {
	it("is defined", () => {
		const el = document.createElement("f-form-group");
		expect(el).instanceOf(FFormGroup);
	});

	it("should render with default values", async () => {
		const el = await fixture(html` <f-form-group></f-form-group> `);
		expect(el.getAttribute("variant")).to.equal("normal");
		expect(el.getAttribute("direction")).to.equal("vertical");
		expect(el.getAttribute("gap")).to.equal("small");
		expect(el.getAttribute("collapse")).to.equal("none");
	});
});
