import { html, fixture, expect } from "@open-wc/testing";

import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";
// setting icon pack for testing icon related test cases

import { FCountdown, ConfigUtil, FDiv } from "@nonfx/flow-core";

ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-coundown", () => {
	it("is defined", () => {
		const el = document.createElement("f-countdown");
		expect(el).instanceOf(FCountdown);
	});

	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-countdown duration="10"></f-countdown> `);

		expect(el.getAttribute("size")).to.equal("medium");
		expect(el.getAttribute("category")).to.equal("fill");
		expect(el.getAttribute("label-placement")).to.equal("left");
		expect(el.getAttribute("state")).to.equal("default");
	});

	it("should render with outline category", async () => {
		const el = await fixture(html` <f-countdown duration="10" category="outline"></f-countdown> `);
		const descendant = el.shadowRoot!.querySelector(".f-countdown-outline-wrapper")!;
		expect(descendant).instanceOf(FDiv);
	});

	it("should render with fill category", async () => {
		const el = await fixture(html` <f-countdown duration="10" category="fill"></f-countdown> `);
		const descendant = el.shadowRoot!.querySelector(".f-countdown-wrapper")!;
		expect(descendant).instanceOf(FDiv);
	});

	it("should render with label-placement top", async () => {
		const el = await fixture(html`
			<f-countdown duration="10" category="fill" label-placement="top"></f-countdown>
		`);
		const descendant = el.shadowRoot!.querySelector(".f-countdown-wrapper")!;
		const labelDiv = descendant.children[0];
		expect(labelDiv).instanceOf(FDiv);
	});

	it("should render with label-placement bottom", async () => {
		const el = await fixture(html`
			<f-countdown category="fill" duration="10" label-placement="bottom"></f-countdown>
		`);
		const descendant = el.shadowRoot!.querySelector(".f-countdown-wrapper")!;
		const labelDiv = descendant.children[descendant.children.length - 1];
		expect(labelDiv).instanceOf(FDiv);
	});
	it("should throw error", async () => {
		try {
			await fixture(html` <f-countdown duration="3700"></f-countdown>`);
		} catch (e) {
			expect((e as Error).message).to.equal(
				"f-countdown: Please enter a value for time less than 3600 seconds"
			);
		}
	});

	it("should throw error", async () => {
		try {
			await fixture(html` <f-countdown duration="61:30"></f-countdown>`);
		} catch (e) {
			expect((e as Error).message).to.equal(
				"f-countdown: Please enter valid values for minutes (less than 60) and seconds (less than 60)"
			);
		}
	});
});
