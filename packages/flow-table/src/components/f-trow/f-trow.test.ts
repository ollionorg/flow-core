import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@nonfx/flow-core";

import { ConfigUtil } from "@nonfx/flow-core";
import { FTrow, FTable } from "@nonfx/flow-table";
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-trow", () => {
	it("is defined", () => {
		const el = document.createElement("f-trow");
		expect(el).instanceOf(FTrow);
	});
	it("should open details", async () => {
		const el = await fixture<FTable>(
			html`<f-table>
				<f-trow slot="header">
					<f-tcell> Header </f-tcell>
				</f-trow>
				<f-trow open id="row-to-test">
					<f-div padding="large" slot="details">
						<f-text variant="heading" size="x-large">This is details slot</f-text>
					</f-div>
					<f-tcell>
						<f-text> Column </f-text>
					</f-tcell>
					})}
				</f-trow>
			</f-table>`
		);
		await el.updateComplete;
		const row = el.querySelector<FTrow>("f-trow#row-to-test");
		await row?.updateComplete;
		const expandableElement = row?.shadowRoot?.querySelector(".expandable");

		expect(expandableElement?.classList.contains("opened")).to.equal(true);
	});
});
