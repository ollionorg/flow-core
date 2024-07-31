import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@nonfx/flow-core";

import { ConfigUtil, FCheckbox } from "@nonfx/flow-core";
import { FTable, FTcell } from "@nonfx/flow-table";

ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-table", () => {
	it("is defined", () => {
		const el = document.createElement("f-table");
		expect(el).instanceOf(FTable);
	});
	it("should display checkboxes when selectable='multiple'", async () => {
		const el = await fixture<FTable>(
			html`<f-table .selectable=${"multiple"}>
				<f-trow slot="header">
					${[1, 2, 3, 4, 5].map(cellNumber => {
						return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
					})}
				</f-trow>
				${[1, 2].map(_rowNumber => {
					return html`<f-trow selected>
						${[1, 2, 3, 4, 5].map(cellNumber => {
							return html`<f-tcell class=${cellNumber === 1 ? "test-checkbox" : ""}>
								<f-text> Column ${cellNumber} </f-text>
							</f-tcell>`;
						})}
					</f-trow>`;
				})}
			</f-table>`
		);
		await el.updateComplete;

		const cells = el?.querySelectorAll<FTcell>(".test-checkbox");
		await Promise.all([cells[0].updateComplete, cells[1].updateComplete]);
		for (let i = 0; i < cells.length; i++) {
			const checkbox = cells[i].shadowRoot?.querySelector<FCheckbox>("f-checkbox");
			expect(checkbox?.value).to.equal("checked");
		}
	});
});
