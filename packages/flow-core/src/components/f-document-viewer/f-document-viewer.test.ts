import { html, fixture, expect } from "@open-wc/testing";
import { FDocumentViewer, FDocViewerContent } from "@cldcvr/flow-core";
import { faker } from "@faker-js/faker";

export default function getFakeDocContent(items = 2, levels = 2): FDocViewerContent {
	const obj = {} as FDocViewerContent;
	for (let i = 0; i < items; i++) {
		obj[`${i + 1}.`] = createContentObject(levels, i + 1, "heading");
	}
	return obj;
}

function createContentObject(
	levels: number,
	index: number | string,
	type: "heading" | "para" = "para"
) {
	const data = {} as FDocViewerContent;
	const obj = {
		title: type === "heading" ? faker.lorem.words(6) : faker.lorem.sentence(100),
		type: type,
		open: true
	} as FDocumentStatement;

	if (levels > 0) {
		for (let i = 0; i < 2; i++) {
			if (i === 1) {
				data[`${index}.${i + 1}.`] = createContentObject(levels - 1, `${index}.${i + 1}`);
			} else {
				data[`${index}.${i + 1}.`] = faker.lorem.sentence(100);
			}
		}
	}
	if (data && Object.keys(data).length > 0) {
		obj.data = data;
	}
	return obj;
}

describe("f-document-viewer", () => {
	it("is defined", () => {
		const el = document.createElement("f-document-viewer");
		expect(el).instanceOf(FDocumentViewer);
	});

	it("should not show jumplinks on the basis of prop `jump-links`", async () => {
		const el = await fixture(html`
			<f-document-viewer .content=${getFakeDocContent()} .jump-links=${false}></f-document-viewer>
		`);
		const descendant = el.shadowRoot!.querySelector(".jumplinks-wrapper")!;
		expect(descendant).to.equal(null);
	});

	it("should not show notch for collapsing jump-links", async () => {
		const el = await fixture(html`
			<f-document-viewer
				.content=${getFakeDocContent()}
				?jump-links=${true}
				?collapsible-jump-links=${false}
			></f-document-viewer>
		`);
		const descendant = el.shadowRoot!.querySelector(".notch")!;
		expect(descendant).to.equal(null);
	});

	it("should render content", async () => {
		const el = await fixture(html`
			<f-document-viewer .content=${getFakeDocContent(3)}></f-document-viewer>
		`);
		const descendant = el.shadowRoot!.querySelector(".preview-scrollable")!;
		const content = descendant.children[0].children;
		expect(descendant.children.length).to.equal(3 + 1);
		expect(content.length).to.equal(2);
	});

	it("should render jumplinks section", async () => {
		const el = await fixture(html`
			<f-document-viewer .content=${getFakeDocContent(3)}></f-document-viewer>
		`);
		const descendant = el.shadowRoot!.querySelector(".jump-links")!;
		expect(descendant.children.length).to.equal(3);
	});
});
