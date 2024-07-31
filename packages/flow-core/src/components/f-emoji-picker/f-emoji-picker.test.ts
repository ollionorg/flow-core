import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";
import { expect, fixture, html } from "@open-wc/testing";

// importing flow-core components
import "@nonfx/flow-core";

import { ConfigUtil, FEmojiPicker, FIcon } from "@nonfx/flow-core";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-emoji-picker", () => {
	it("is defined", () => {
		const el = document.createElement("f-emoji-picker");
		expect(el).instanceOf(FEmojiPicker);
	});

	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-emoji-picker></f-emoji-picker> `);
		expect(el.getAttribute("variant")).to.equal("curved");
		expect(el.getAttribute("category")).to.equal("fill");
		expect(el.getAttribute("size")).to.equal("medium");
		expect(el.getAttribute("state")).to.equal("default");
	});

	it("should render value", async () => {
		const el = await fixture(html` <f-emoji-picker value="🙂"></f-emoji-picker> `);
		const descendant = el.shadowRoot!.querySelector(".emoji-value")!;
		const icon = descendant.children[0];
		expect(icon).instanceOf(FIcon);
	});

	it("should render placeholder", async () => {
		const el = await fixture(html` <f-emoji-picker placeholder="😀"></f-emoji-picker> `);
		const descendant = el.shadowRoot!.querySelector(".emoji-value")!;
		const icon = descendant.children[0];
		expect(icon).instanceOf(FIcon);
	});
});
