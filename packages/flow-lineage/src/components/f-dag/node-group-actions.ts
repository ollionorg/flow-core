import { html } from "lit";
import type { FDag } from "./f-dag";

export default function getNodeGroupActions(this: FDag) {
	return html` <f-div
		id="nodeActions"
		style="position:absolute;z-index:12;display:none"
		variant="curved"
		border="small solid default around"
		width="hug-content"
		height="24px"
		state="default"
	>
		<f-div
			@click=${this.selectNode}
			clickable
			width="hug-content"
			align="middle-center"
			padding="x-small small"
		>
			<f-text size="x-small">Select</f-text>
		</f-div>

		<f-divider></f-divider>
		<f-div clickable width="hug-content" align="middle-center" padding="x-small small">
			<f-text size="x-small">Delete</f-text>
		</f-div>
	</f-div>`;
}
