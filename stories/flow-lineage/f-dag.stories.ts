import { Meta, Story } from "@storybook/web-components";
import { html } from "lit-html";
import dagConfig from "./dag-config";

export default {
	title: "@ollion/flow-lineage/f-dag"
} as Meta<Record<string, any>>;

export const Basic = {
	render: () => {
		return html`<f-div width="100%" direction="column" height="100%">
			<f-dag .config=${dagConfig}></f-dag>
		</f-div>`;
	}
};
