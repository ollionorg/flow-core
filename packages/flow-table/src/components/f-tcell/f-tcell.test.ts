import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";

// import flow-core elements
import "@nonfx/flow-core";

import { ConfigUtil, FIconButton } from "@nonfx/flow-core";
import { FTcell, FTable } from "@nonfx/flow-table";
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-tcell", () => {
	it("is defined", () => {
		const el = document.createElement("f-tcell");
		expect(el).instanceOf(FTcell);
	});
	it("should display all actions", async () => {
		const el = await fixture<FTable>(
			html` <f-table>
				<f-trow slot="header"> <f-tcell> Header </f-tcell>; </f-trow>
				<f-trow>
					<f-tcell
						id="cell-to-test"
						.actions=${[
							{ icon: "i-copy", onClick: () => console.log("i-launch clicked") },
							{ icon: "i-git-branch", onClick: () => console.log("i-launch clicked") },
							{ icon: "i-launch", onClick: () => console.log("i-launch clicked") }
						]}
					>
						<f-text> Column </f-text>
					</f-tcell> </f-trow
				>;
			</f-table>`
		);
		await el.updateComplete;
		const cell = el.querySelector<FTcell>("f-tcell#cell-to-test");
		await cell?.updateComplete;
		const allIconsButtons = cell?.shadowRoot?.querySelectorAll<FIconButton>(".f-tcell-actions");
		expect(allIconsButtons?.length).to.equal(3);

		if (allIconsButtons) {
			await allIconsButtons[0].updateComplete;
			expect(allIconsButtons[0].icon).to.equal("i-copy");
			await allIconsButtons[1].updateComplete;
			expect(allIconsButtons[1].icon).to.equal("i-git-branch");
			await allIconsButtons[2].updateComplete;
			expect(allIconsButtons[2].icon).to.equal("i-launch");
		}
	});
});
