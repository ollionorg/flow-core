import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
	title: "@cldcvr/flow-dashboard/Auto fill",
	argTypes: {
		field: {
			control: false
		}
	}
} as Meta<any>;

const Template: Story<unknown> = (args: any) => {
	return html` <f-dashboard></f-dashboard> `;
};

export const basic = Template.bind({});
