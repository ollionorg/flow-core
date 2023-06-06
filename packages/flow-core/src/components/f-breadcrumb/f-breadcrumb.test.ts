import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@cldcvr/flow-system-icon/dist/types/icon-pack";

// importing flow-core components
import "@cldcvr/flow-core";

import { FBreadcrumb, ConfigUtil } from "@cldcvr/flow-core";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-breadcrumb", () => {
	it("is defined", () => {
		const el = document.createElement("f-breadcrumb");
		expect(el).instanceOf(FBreadcrumb);
	});
	it("should render with default values", async () => {
		const el = await fixture(
			html`
				<f-breadcrumb
					.crumbs=${[
						{ tabIndex: 0, title: "Label 1" },
						{ tabIndex: 1, title: "Label 2" }
					]}
				></f-breadcrumb>
			`
		);
		expect(el.getAttribute("size")).to.equal("medium");
	});
	// it("should render with x-small text-size when size is small", async () => {
	// 	const el = await fixture(
	// 		html`
	// 			<f-breadcrumb
	// 				size="small"
	// 				.crumbs=${[
	// 					{ tabIndex: 0, title: "Label 1" },
	// 					{ tabIndex: 1, title: "Label 2" }
	// 				]}
	// 			></f-breadcrumb>
	// 		`
	// 	);
	// 	const descendant = el.shadowRoot!.querySelector(".f-breadcrumb-text-hover")!;
	// 	expect(descendant.getAttribute("size")).to.equal("x-small");
	// });
	it("should render with proper crumb list", async () => {
		const el = await fixture(
			html`
				<f-breadcrumb
					size="small"
					.crumbs=${[
						{ tabIndex: 0, title: "Label 1" },
						{ tabIndex: 1, title: "Label 2" }
					]}
				></f-breadcrumb>
			`
		);
		const descendant = el.shadowRoot!.querySelectorAll(".f-breadcrumb-content")!;
		expect(descendant.length).to.equal(2);
	});
	it("should render with crumbs inside poppover when crumb length is more than 4", async () => {
		const el = await fixture(
			html`
				<f-breadcrumb
					.crumbs=${[
						{ tabIndex: 0, title: "Label 1" },
						{ tabIndex: 1, title: "Label 2" },
						{ tabIndex: 2, title: "Label 3" },
						{ tabIndex: 3, title: "Label 4" },
						{ tabIndex: 4, title: "Label 5" }
					]}
				></f-breadcrumb>
			`
		);
		const descendant = el.shadowRoot!.querySelectorAll(".popover-crumb-list")!;
		expect(descendant.length).to.equal(2);
	});
});
