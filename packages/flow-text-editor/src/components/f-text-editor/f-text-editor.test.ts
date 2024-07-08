import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";
import { expect } from "@open-wc/testing";

// import flow-core elements
import "@ollion/flow-core";

import { ConfigUtil } from "@ollion/flow-core";
import { FTextEditor } from "@ollion/flow-text-editor";
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-text-editor", () => {
	it("is defined", () => {
		const el = document.createElement("f-text-editor");
		expect(el).instanceOf(FTextEditor);
	});
});
