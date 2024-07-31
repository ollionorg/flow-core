import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@nonfx/flow-core";

import { ConfigUtil, FText, FFileUpload, FDiv } from "@nonfx/flow-core";
// importing `loadingSVG` to cross check
import loadingSVG from "../../mixins/svg/loader";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-file-upload", () => {
	it("is defined", () => {
		const el = document.createElement("f-file-upload");
		expect(el).instanceOf(FFileUpload);
	});

	it("should render with all default properties", async () => {
		const el = await fixture(html` <f-file-upload></f-file-upload> `);

		expect(el.getAttribute("type")).to.equal("single");
		expect(el.getAttribute("size")).to.equal("medium");
		expect(el.getAttribute("state")).to.equal("default");
		expect(el.getAttribute("file-type")).to.equal("all");
	});

	it("should render with placeholder", async () => {
		const el = await fixture(html`
			<f-file-upload placeholder="Drag and Drop Files or Click here to upload"></f-file-upload>
		`);
		const descendant = el.shadowRoot!.querySelector(".f-file-upload-placeholder")!;
		const ftext = descendant.children[0];
		expect(ftext).instanceOf(FText);
		expect(ftext.innerHTML).includes("Drag and Drop Files or Click here to upload");
	});

	it("should render with value for single file selection type", async () => {
		const el = await fixture(html`
			<f-file-upload .value=${new File(["test"], "test.pdf")}></f-file-upload>
		`);
		const descendant = el.shadowRoot!.querySelector("#overflow-text")!;
		const ftext = descendant.innerHTML;
		expect(descendant).instanceOf(FText);
		expect(ftext).includes("test.pdf");
	});

	it("should render with value array for multiple file selection type", async () => {
		const el = await fixture(html`
			<f-file-upload .value=${[new File(["test"], "test.pdf")]} type="multiple"></f-file-upload>
		`);
		const descendant = el.shadowRoot!.querySelectorAll("#multiple-file-selection")!;
		expect(descendant[0]).instanceOf(FDiv);
		expect(descendant).length(1);
		expect(descendant[0].children[0].innerHTML).includes("test.pdf");
	});

	it("should render with file type mentioned in selection area", async () => {
		const el = await fixture(html`
			<f-file-upload type="multiple" file-type=".pdf"></f-file-upload>
		`);
		const descendant = el.shadowRoot!.querySelector(".f-file-upload-placeholder")!;
		const ftext = descendant.children[1];
		expect(ftext).instanceOf(FText);
		expect(ftext.innerHTML).includes(".pdf");
	});
	it("should render loader", async () => {
		const el = await fixture(html` <f-file-upload ?loading=${true}></f-file-upload> `);
		const descendant = el.shadowRoot!.querySelector(".loader-suffix")!;
		const loading = descendant.children[0];
		const svg = await fixture(loadingSVG);
		expect(loading.outerHTML).equal(svg.outerHTML);
	});
});
