import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "f-spacer",
  component: "f-spacer",
} as Meta;

const Template: Story<unknown> = () => {
  return html`
  `;
};

const SpacerUsageTemplate: Story<unknown> = () => {
  return html`
   
  `;
};

export const basic = Template.bind({});
export const SpacerUsage = SpacerUsageTemplate.bind({});
