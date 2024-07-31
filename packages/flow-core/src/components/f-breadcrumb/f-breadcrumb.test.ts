import { html, fixture, expect } from "@open-wc/testing";
import IconPack from "@ollion/flow-system-icon/dist/types/icon-pack";

// importing flow-core components
import "@nonfx/flow-core";

import { FBreadcrumb, ConfigUtil } from "@nonfx/flow-core";

// setting icon pack for testing icon related test cases
ConfigUtil.setConfig({ iconPack: IconPack });

describe("f-breadcrumb", () => {
	it("is defined", () => {
		const el = document.createElement("f-breadcrumb");
		expect(el).instanceOf(FBreadcrumb);
	});
	it("should render with default values", async () => {
		const el = await fixture(html`
			<f-breadcrumb
				.crumbs=${[
					{ tabIndex: 0, title: "Label 1" },
					{ tabIndex: 1, title: "Label 2" }
				]}
			></f-breadcrumb>
		`);
		expect(el.getAttribute("size")).to.equal("medium");
		expect(el.getAttribute("variant")).to.equal("text");
	});
	it("should render with x-small text-size when size is small", async () => {
		const el = await fixture(html`
			<f-breadcrumb
				size="small"
				.crumbs=${[
					{ tabIndex: 0, title: "Label 1" },
					{ tabIndex: 1, title: "Label 2" }
				]}
			></f-breadcrumb>
		`);
		const descendant = el.shadowRoot!.querySelector(".f-breadcrumb-text-hover")!;
		expect(descendant.getAttribute("size")).to.equal("x-small");
	});
	it("should render with proper crumb list", async () => {
		const el = await fixture(html`
			<f-breadcrumb
				size="small"
				.crumbs=${[
					{ tabIndex: 0, title: "Label 1" },
					{ tabIndex: 1, title: "Label 2" }
				]}
			></f-breadcrumb>
		`);
		const descendant = el.shadowRoot!.querySelectorAll(".f-breadcrumb-content")!;
		expect(descendant.length).to.equal(2);
	});
	it("should render with crumbs inside poppover when crumb length is more than 4", async () => {
		const el = await fixture(html`
			<f-breadcrumb
				.crumbs=${[
					{ tabIndex: 0, title: "Label 1" },
					{ tabIndex: 1, title: "Label 2" },
					{ tabIndex: 2, title: "Label 3" },
					{ tabIndex: 3, title: "Label 4" },
					{ tabIndex: 4, title: "Label 5" }
				]}
			></f-breadcrumb>
		`);
		const descendant = el.shadowRoot!.querySelectorAll(".popover-crumb-list")!;
		expect(descendant.length).to.equal(2);
	});

	it("should render with icon variant crumbs", async () => {
		const el = await fixture(html`
			<f-breadcrumb
				.variant=${"icon"}
				.crumbs=${[
					{ tabIndex: 0, title: "Label 1", icon: "i-app" },
					{ tabIndex: 1, title: "Label 2", icon: "i-app" },
					{ tabIndex: 2, title: "Label 3", icon: "i-home" },
					{ tabIndex: 3, title: "Label 4", icon: "i-info-fill" },
					{ tabIndex: 4, title: "Label 5", icon: "i-app" }
				]}
			></f-breadcrumb>
		`);
		const descendant = el.shadowRoot!.querySelector(".f-breadcrumbs")!;
		expect(descendant.children.length).to.equal(5);
	});

	it("should render with icon variant and the last crumb should be in active primary mode", async () => {
		const el = await fixture(html`
			<f-breadcrumb
				variant="icon"
				.crumbs=${[
					{ tabIndex: 0, title: "Home", icon: "i-app" },
					{ tabIndex: 1, title: "New Label", icon: "i-app" },
					{ tabIndex: 2, title: "Pipeline", icon: "i-home" },
					{ tabIndex: 3, title: "Working", icon: "i-info-fill" },
					{ tabIndex: 4, title: "Active", icon: "i-app" }
				]}
			></f-breadcrumb>
		`);
		const descendants = el.shadowRoot!.querySelector(".f-breadcrumbs")!;
		const selected = descendants.children[descendants.children.length - 1];
		const text = selected.querySelector("f-text")!;
		expect(text.innerHTML).includes("Active");
	});
});
