import { html } from "lit";
import { faker } from "@faker-js/faker";

import { FDocumentStatement, FDocViewerContent } from "@nonfx/flow-core";

export default function getFakeDocContent(
	items = 2,
	levels = 2,
	isTemplate = false
): FDocViewerContent {
	const obj = {} as FDocViewerContent;
	for (let i = 0; i < items; i++) {
		obj[`${i + 1}.`] = createContentObject(levels, i + 1, "heading");
		if (isTemplate) {
			(obj[`${i + 1}.`] as FDocumentStatement).template = function (
				highlight: string | null | undefined
			) {
				return html`
					<f-div gap="medium">
						<f-div gap="medium">
							<f-text inline size="small" weight="bold" .highlight=${highlight ?? ""}>1. </f-text>
							<f-div>
								<f-text inline size="small" weight="bold" .highlight=${highlight ?? ""}
									>${(obj[`${i + 1}.`] as FDocumentStatement).title}</f-text
								>
							</f-div>
						</f-div>
						<f-divider state="secondary"></f-divider>
						<f-div width="150px" padding="none large"
							><f-tag label="Required" size="small" state="custom,#C29270"></f-tag
						></f-div>
					</f-div>
				`;
			};
		}
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
