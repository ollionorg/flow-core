import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "sandbox",
} as Meta;

const Template: Story<unknown> = () => {
  return html`
    <f-button label="left"></f-button>
    <f-spacer size="fill-container"></f-spacer>
    <f-button label="right"></f-button>
  `;
};

export const basic = Template.bind({});
