import { Meta, Story } from "@storybook/web-components";
import { html } from "lit-html";

export default {
	title: "@ollion/flow-lineage/f-dag"
} as Meta<Record<string, any>>;

export const Basic = {
	render: () => {
		return html` <f-dag></f-dag> `;
	}
};
