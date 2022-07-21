import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import "@cldcvr/flow-core/src/components/f-button/f-button";

export default {
  title: "f-button",
} as Meta;

const Template: Story<any> = () => {
  return html` <f-button label="label"></f-button>
    <f-button label="label" state="success"></f-button
    ><f-button label="label" state="danger"></f-button
    ><f-button label="label" state="warning"></f-button>`;
};

export const basic = Template.bind({});
