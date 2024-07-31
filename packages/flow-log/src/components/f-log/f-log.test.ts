import { html, fixture, expect } from "@open-wc/testing";

import samplelogs from "./sample-logs";

// import flow-core elements
import "@nonfx/flow-core";
import { FLog } from "@nonfx/flow-log";
import { FDiv } from "@nonfx/flow-core";

describe("f-log", () => {
	it("is defined", () => {
		const el = document.createElement("f-log");
		expect(el).instanceOf(FLog);
	});
	it("shouldn't render tool bar by default", async () => {
		const el = await fixture(html` <f-log .logs=${samplelogs}></f-log> `);
		const topBar = el.shadowRoot!.querySelector<FDiv>(".top-bar");
		expect(topBar).is.null;
	});
	it("should render tool bar", async () => {
		const el = await fixture(html` <f-log show-toolbar .logs=${samplelogs}></f-log> `);
		const topBar = el.shadowRoot!.querySelector<FDiv>(".top-bar");
		expect(topBar).instanceOf(FDiv);
	});

	it("should wrap lines", async () => {
		const el = await fixture<FLog>(html` <f-log .logs=${samplelogs}></f-log> `);
		await el.updateComplete;
		let pre = el.shadowRoot!.querySelector<FDiv>("pre");
		expect(pre.offsetHeight).is.equal(12976);
		el.wrapText = true;
		await el.updateComplete;
		pre = el.shadowRoot!.querySelector<FDiv>("pre");
		expect(pre.offsetHeight).is.equal(26544);
	});

	it("should display only selected log level", async () => {
		const el = await fixture<FLog>(html`
			<f-log .logs=${samplelogs} .selectedLogLevel=${"ERROR"}></f-log>
		`);
		await el.updateComplete;
		const visibleLines = el.shadowRoot!.querySelectorAll<HTMLSpanElement>(".log-line:not(.hidden)");
		expect(visibleLines.length).is.equal(57);
	});
});
