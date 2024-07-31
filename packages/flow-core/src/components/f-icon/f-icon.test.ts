import { html, fixture, expect, elementUpdated } from "@open-wc/testing";
import loadingSVG from "./../../mixins/svg/loader";
import notFound from "../../mixins/svg/not-found";
import { ConfigUtil } from "@nonfx/flow-core-config";

// import all flow -core components
import "@nonfx/flow-core";

import { FIcon } from "@nonfx/flow-core";

describe("f-icon", () => {
	it("is defined", () => {
		const el = document.createElement("f-icon");
		expect(el).instanceOf(FIcon);
	});

	it("should throw error", async () => {
		try {
			await fixture(html`<f-icon></f-icon>`);
		} catch (e) {
			expect((e as Error).message).to.equal("f-icon : source is mandatory field");
		}
	});

	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-icon source="😋"></f-counter> `);
		const descendant = el.shadowRoot!.querySelector(".f-icon")!;
		expect(descendant.getAttribute("size")).to.equal("small");
		expect(descendant.getAttribute("state")).to.equal("default");
	});

	it("should render loader", async () => {
		const el = await fixture(html` <f-icon source="😋" loading></f-icon>`);
		const descendant = el.shadowRoot!.querySelector(".f-icon")!;
		const loading = descendant.children[0];
		const svg = await fixture(loadingSVG);
		expect(loading.outerHTML).equal(svg.outerHTML);
	});

	it("should render deferred icon sets", async () => {
		const el = await fixture(html` <f-icon source="testing"></f-icon>`);
		await expect(el.shadowRoot!.firstElementChild?.firstElementChild).dom.to.equal(notFound);

		const testSvg = "<svg id='testing'></svg>";

		ConfigUtil.setConfig({
			iconPack: {
				testing: testSvg
			}
		});

		await elementUpdated(el);

		await expect(el.shadowRoot!.firstElementChild?.firstElementChild).dom.to.equal(testSvg);
	});
});
