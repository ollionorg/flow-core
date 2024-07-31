import { expect, fixture, oneEvent } from "@open-wc/testing";
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@nonfx/flow-core";

import { ConfigUtil, FDiv, FSuggest } from "@nonfx/flow-core";
import { html } from "lit";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-suggest", () => {
	it("is defined", () => {
		const el = document.createElement("f-suggest");
		expect(el).instanceOf(FSuggest);
	});
	it("it should display suggestions on focus", async () => {
		const el = await fixture<FSuggest>(html`
			<f-suggest
				.suggestions=${["Suggestion 1", "Suggestion 2", "Suggestion 3", "Suggestion 4"]}
			></f-suggest>
		`);
		await el.updateComplete;
		const listner = oneEvent(el.fInput, "focus");
		el.fInput.dispatchEvent(new FocusEvent("focus"));

		await listner;
		expect(el.popOverElement.open).equals(true);
	});
	it("it should select suggestion on click", async () => {
		const el = await fixture<FSuggest>(html`
			<f-suggest
				.suggestions=${["Suggestion 1", "Suggestion 2", "Suggestion 3", "Suggestion 4"]}
			></f-suggest>
		`);
		await el.updateComplete;
		const listner = oneEvent(el.fInput, "focus");
		el.fInput.dispatchEvent(new FocusEvent("focus"));

		await listner;
		expect(el.popOverElement.open).equals(true);

		const suggestion = Array.from(
			el.popOverElement.querySelectorAll<FDiv>("f-div.f-select-options-clickable")
		).find(d => d.children[0].children[0].textContent?.trim() === "Suggestion 2");

		expect(suggestion).instanceOf(FDiv);
		const suggestionListner = oneEvent(suggestion as FDiv, "click");
		(suggestion as FDiv).click();
		await suggestionListner;

		expect(el.value).equals("Suggestion 2");
		expect(el.popOverElement.open).equals(false);
	});

	it("it should filter suggestions based on value", async () => {
		const el = await fixture<FSuggest>(html`
			<f-suggest
				.suggestions=${["Suggestion 1", "Suggestion 2", "filter 3", "filter 4"]}
				value="filter"
			></f-suggest>
		`);

		await el.updateComplete;
		const listner = oneEvent(el.fInput, "focus");
		el.fInput.dispatchEvent(new FocusEvent("focus"));

		await listner;
		expect(el.popOverElement.open).equals(true);

		const suggestions = Array.from(
			el.popOverElement.querySelectorAll<FDiv>("f-div.f-select-options-clickable")
		).filter(d => {
			return d.children[0].children[0].textContent?.trim().includes("filter");
		});
		expect(suggestions.length).equals(2);
	});
});
