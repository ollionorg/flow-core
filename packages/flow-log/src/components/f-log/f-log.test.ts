import { html, fixture, expect } from "@open-wc/testing";

// import flow-core elements
import "@cldcvr/flow-core";

import { FLog } from "@cldcvr/flow-log";

describe("f-log", () => {
	it("is defined", () => {
		const el = document.createElement("f-log");
		expect(el).instanceOf(FLog);
	});
	it("should render no search box", async () => {
		const el = await fixture(html` <f-log ?show-search=${false}></f-log> `);
		const descendant = el.shadowRoot!.querySelector<HTMLDivElement>(".xterm-search-bar__addon")!;
		expect(descendant.style.visibility).to.equal("hidden");
	});
});
