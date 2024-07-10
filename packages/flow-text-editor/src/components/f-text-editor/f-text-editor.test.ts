import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";
import { expect } from "@open-wc/testing";

// import flow-core elements
import "@ollion/flow-core";

import { ConfigUtil } from "@ollion/flow-core";
import { FTextEditor } from "@ollion/flow-text-editor";
ConfigUtil.setConfig({ iconPack: IconPack });

/**
 * flow-text-editor is based on Quill so we added our skin and few props. hence for feature testing we don't need more test cases
 */
describe("f-text-editor", () => {
	it("is defined", () => {
		const el = document.createElement("f-text-editor");
		expect(el).instanceOf(FTextEditor);
	});
});
