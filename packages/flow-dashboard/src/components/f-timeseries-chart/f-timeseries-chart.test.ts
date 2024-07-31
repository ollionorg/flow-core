import { expect } from "@open-wc/testing";

// IconPack to test
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";
// import flow-core elements
import "@nonfx/flow-core";
import "@nonfx/flow-dashboard";
import { ConfigUtil } from "@nonfx/flow-core";
import { FTimeseriesChart } from "@nonfx/flow-dashboard";

ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-timeseries-chart", () => {
	it("is defined", () => {
		const el = document.createElement("f-timeseries-chart");
		expect(el).instanceOf(FTimeseriesChart);
	});
});
