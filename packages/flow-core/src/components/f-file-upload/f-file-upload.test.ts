import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@cldcvr/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@cldcvr/flow-core";

import { ConfigUtil, FText, FFileUpload } from "@cldcvr/flow-core";
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
		const el = await fixture(
			html`
				<f-file-upload placeholder="Drag and Drop Files or Click here to upload"></f-file-upload>
			`
		);
		const descendant = el.shadowRoot!.querySelector(".f-file-upload-placeholder")!;
		const ftext = descendant.children[0];
		expect(ftext).instanceOf(FText);
		expect(ftext.innerHTML).includes("Drag and Drop Files or Click here to upload");
	});
});
