/* eslint-disable no-mixed-spaces-and-tabs */
import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@cldcvr/flow-system-icon/dist/types/icon-pack";
import sampleMd from "./sample-md";

// import flow-core elements
import "@cldcvr/flow-core";

import { ConfigUtil, FIconButton } from "@cldcvr/flow-core";
import { FMDEditor } from "@cldcvr/flow-md-editor";
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-md-editor", () => {
	it("is defined", () => {
		const el = document.createElement("f-md-editor");
		expect(el).instanceOf(FMDEditor);
	});
	it("should match view mode snapshot", async () => {
		const el = await fixture<FMDEditor>(
			html` <f-md-editor .value=${sampleMd} mode="view"></f-md-editor>`
		);
		await el.updateComplete;
		await expect(el).lightDom.to.equalSnapshot();
	});
	it("should match edit mode snapshot", async () => {
		const el = await fixture<FMDEditor>(
			html` <f-md-editor .value=${sampleMd} mode="edit"></f-md-editor>`
		);
		await el.updateComplete;
		await expect(el).lightDom.to.equalSnapshot();
	});
});
