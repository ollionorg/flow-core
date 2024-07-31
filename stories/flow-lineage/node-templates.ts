import { html } from "lit-html";
import { LineageNodeElement } from "@nonfx/flow-lineage";

export function nodeTemplate(node: LineageNodeElement) {
	return html`<f-div
		state=${node.fData?.state}
		width="100%"
		height="100%"
		padding="small"
		align="top-left"
		variant="curved"
		gap="small"
		${node.fChildren && !node.fHideChildren ? 'border="small solid default bottom"' : ""}
	>
		<f-pictogram variant="circle" source="${node.fData?.fullName}"></f-pictogram>
		<f-div direction="column">
			<f-text size="small" ellipsis>${node.fData?.fullName}</f-text>
			<f-text size="x-small" ellipsis>${node.x} ${node.y}</f-text>
		</f-div>
		<f-div direction="column">
			<f-text size="small" ellipsis>${node.fData?.fullName}</f-text>
		</f-div>
		${node.childrenToggle}
	</f-div>`;
}

export function childrenNodeTemplate(node: LineageNodeElement) {
	return html`<f-div
		state="secondary"
		width="100%"
		height="100%"
		padding="none medium"
		align="middle-left"
		gap="small"
		border="small solid default bottom"
	>
		<f-icon source="${node.fData?.icon}" size="small"></f-icon>
		<f-text size="small" ellipsis>${node.fData?.title}</f-text>
	</f-div>`;
}
