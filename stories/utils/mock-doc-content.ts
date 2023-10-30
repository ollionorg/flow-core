import { html } from "lit";
import { faker } from "@faker-js/faker";

import { FDocumentStatement, FDocViewerContent } from "@cldcvr/flow-core";

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
