import { html, fixture, expect, oneEvent } from "@open-wc/testing";
import IconPack from "@cldcvr/flow-system-icon/dist/types/icon-pack";

// importing flow-core components
import "@cldcvr/flow-core";

import { FDateTimePicker, ConfigUtil } from "@cldcvr/flow-core";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-date-time-picker", () => {
	it("is defined", () => {
		const el = document.createElement("f-date-time-picker");
		expect(el).instanceOf(FDateTimePicker);
	});

	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-date-time-picker></f-date-time-picker> `);

		expect(el.getAttribute("variant")).to.equal("curved");
		expect(el.getAttribute("category")).to.equal("fill");
		expect(el.getAttribute("mode")).to.equal("date-time");
		expect(el.getAttribute("size")).to.equal("medium");
		expect(el.getAttribute("state")).to.equal("default");
	});
	it("check if date picker renders", async () => {
		await fixture<FDateTimePicker>(html` <f-date-time-picker></f-date-time-picker> `);
		const flatpickr = document.body.querySelector(".flatpickr-calendar");
		expect(flatpickr?.classList.contains("open")).equals(false);
	});
	it("check if mode date-time both are present", async () => {
		await fixture<FDateTimePicker>(
			html` <f-date-time-picker mode="date-time"></f-date-time-picker> `
		);
		const flatpickr = document.body.querySelector(".flatpickr-calendar");
		expect(flatpickr?.classList.contains("hasTime")).equals(true);
	});

	it("check if value selected in calendar", async () => {
		await fixture<FDateTimePicker>(
			html` <f-date-time-picker .value=${new Date()}></f-date-time-picker> `
		);
		const flatpickrToday = document.body.querySelector(".today");
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December"
		];
		const dateFormat =
			months[new Date().getMonth()] + " " + new Date().getDate() + ", " + new Date().getFullYear();
		console.log(dateFormat);
		expect(flatpickrToday?.getAttribute("aria-label")).to.equal(dateFormat);
	});
});
