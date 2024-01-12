import { Meta, Story } from "@storybook/web-components";
import { html } from "lit-html";

export default {
	title: "@ollion/flow-lineage/f-dag"
} as Meta<Record<string, any>>;

export const Basic = {
	render: () => {
		return html` <f-div width="100%" height="100%"><f-dag></f-dag> </f-div>`;
	}
};
