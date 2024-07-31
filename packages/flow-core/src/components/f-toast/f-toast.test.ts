import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@nonfx/flow-core";

import { FIcon, ConfigUtil, FToast } from "@nonfx/flow-core";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-toast", () => {
	it("is defined", () => {
		const el = document.createElement("f-toast");
		expect(el).instanceOf(FToast);
	});
	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-toast></f-toast> `);
		expect(el.getAttribute("type")).to.equal("auto-hide");
		expect(el.getAttribute("state")).to.equal("default");
		expect(el.getAttribute("duration")).to.equal("5000");
	});
	it("should render closing icon", async () => {
		const el = await fixture(html` <f-toast></f-toast> `);
		const descendant = el.shadowRoot!.querySelector(".f-toast-close")!;
		const icon = descendant.children[0];
		expect(icon).instanceOf(FIcon);
	});
});
