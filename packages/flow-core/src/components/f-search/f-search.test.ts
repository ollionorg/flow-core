import { expect, fixture, oneEvent } from "@open-wc/testing";
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@nonfx/flow-core";

import { ConfigUtil, FDiv, FSearch, FSuggest } from "@nonfx/flow-core";
import { html } from "lit";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-search", () => {
	it("is defined", () => {
		const el = document.createElement("f-search");
		expect(el).instanceOf(FSearch);
	});
	it("it should display results on focus", async () => {
		const el = await fixture<FSearch>(html`
			<f-search
				.result=${["Suggestion 1", "Suggestion 2", "Suggestion 3", "Suggestion 4"]}
			></f-search>
		`);
		const suggest = el.shadowRoot?.querySelector("f-suggest");
		await suggest.updateComplete;
		const listner = oneEvent(suggest.fInput, "focus");
		suggest.fInput.dispatchEvent(new FocusEvent("focus"));

		await listner;
		expect(suggest.popOverElement.open).equals(true);
	});
	it("it should select result on click", async () => {
		const el = await fixture<FSearch>(html`
			<f-search
				.result=${["Suggestion 1", "Suggestion 2", "Suggestion 3", "Suggestion 4"]}
			></f-search>
		`);
		const suggest = el.shadowRoot?.querySelector<FSuggest>("f-suggest");
		await suggest.updateComplete;
		const listner = oneEvent(suggest.fInput, "focus");
		suggest.fInput.dispatchEvent(new FocusEvent("focus"));

		await listner;
		expect(suggest.popOverElement.open).equals(true);

		const suggestion = Array.from(
			suggest.popOverElement.querySelectorAll<FDiv>("f-div.f-select-options-clickable")
		).find(d => d.children[0].children[1].textContent?.trim() === "Suggestion 2");
		expect(suggestion).instanceOf(FDiv);
		const suggestionListner = oneEvent(suggestion as FDiv, "click");
		(suggestion as FDiv).click();
		await suggestionListner;

		expect(suggest.value).equals("Suggestion 2");
		expect(suggest.popOverElement.open).equals(false);
	});

	it("it should filter result based on value", async () => {
		const el = await fixture<FSearch>(html`
			<f-search
				.result=${["Suggestion 1", "Suggestion 2", "filter 3", "filter 4"]}
				value="filter"
			></f-search>
		`);
		const suggest = el.shadowRoot?.querySelector<FSuggest>("f-suggest");

		await suggest.updateComplete;
		const listner = oneEvent(suggest.fInput, "focus");
		suggest.fInput.dispatchEvent(new FocusEvent("focus"));

		await listner;
		expect(suggest.popOverElement.open).equals(true);

		const suggestions = Array.from(
			suggest.popOverElement.querySelectorAll<FDiv>("f-div.f-select-options-clickable")
		).filter(d => d.children[0].children[1].textContent?.trim().includes("filter"));

		expect(suggestions.length).equals(2);
	});
});
