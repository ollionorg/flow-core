import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@nonfx/flow-core";

import { FIcon, ConfigUtil, FSelect, FText, FTag, FCheckbox } from "@nonfx/flow-core";
// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-select", () => {
	it("is defined", () => {
		const el = document.createElement("f-select");
		expect(el).instanceOf(FSelect);
	});
	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-select .options=${["option 1"]}></f-select> `);
		const descendant = el.shadowRoot!.querySelector(".f-select-wrapper")!;
		expect(descendant.getAttribute("variant")).to.equal("curved");
		expect(descendant.getAttribute("category")).to.equal("fill");
		expect(descendant.getAttribute("state")).to.equal("default");
		expect(descendant.getAttribute("type")).to.equal("single");
	});
	it("should render with preselected f-tags as value and type=multiple is present", async () => {
		const el = await fixture(html`
			<f-select .options=${["option 1"]} .value=${["option 1"]} type="multiple"></f-select>
		`);
		const descendant = el.shadowRoot!.querySelectorAll(".f-tag-system-icon")!;
		const tag = descendant;
		const tagLength = descendant.length;
		expect(tag[0]).instanceOf(FTag);
		expect(tagLength).to.equal(1);
	});
	it("should render with preselected text as value and type=single is present", async () => {
		const el = await fixture(html`
			<f-select .options=${["option 1"]} .value=${"option 1"} type="single"></f-select>
		`);
		const descendant = el.shadowRoot!.querySelector(".f-select-searchable")!;
		const text = descendant.children[0].children[0];
		expect(text).instanceOf(FText);
	});
	it("should render icon left", async () => {
		const el = await fixture(html`
			<f-select icon-left="i-plus" .options=${["option 1"]}></f-select>
		`);
		const descendant = el.shadowRoot!.querySelector(".f-select-prefix")!;
		const icon = descendant.children[0];
		expect(icon).instanceOf(FIcon);
	});
	it("should render clear icon at right side", async () => {
		const el = await fixture(html`
			<f-select
				.options=${["option 1"]}
				.value=${["option 1"]}
				type="multiple"
				?clear=${true}
			></f-select>
		`);
		const descendant = el.shadowRoot!.querySelector(".f-select-suffix")!;
		const icon = descendant.children[0];
		expect(icon).instanceOf(FIcon);
		expect(icon.getAttribute("source")).to.equal("i-close");
	});
	it("should render with input box when searchable is true", async () => {
		const el = await fixture(html`
			<f-select
				.options=${["option 1"]}
				.value=${["option 1"]}
				type="multiple"
				?searchable=${true}
			></f-select>
		`);
		const descendant = el.shadowRoot!.querySelector(".f-select-searchable")!;
		const input = descendant.children[1];
		expect(input.tagName.toLowerCase()).to.equal("input");
	});

	it("options menu should render with checkboxes when checkbox is true", async () => {
		const el = await fixture(html`
			<f-select
				.options=${["option 1"]}
				.value=${["option 1"]}
				type="multiple"
				?checkbox=${true}
			></f-select>
		`);
		const descendant = el.shadowRoot!.querySelector(".f-select-options-clickable")!;
		const checkbox = descendant.children[0];
		expect(checkbox).instanceOf(FCheckbox);
	});

	it("render with 'view more' button if limit is less than selected-options", async () => {
		const el = await fixture(html`
			<f-select
				.options=${["option 1", "option 2"]}
				.value=${["option 1", "option 2"]}
				type="multiple"
				?checkbox=${true}
				selection-limit=${1}
			></f-select>
		`);
		const descendant = el.shadowRoot!.querySelector(".f-select-searchable")!;
		const text = descendant.children[1].children[0];
		expect(text).instanceOf(FText);
		expect(text.children[0].innerHTML).includes("more");
	});
});
