import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "Foundation/Design tokens",
} as Meta;

const Template: Story<unknown> = () => {
  return html`
    <f-div padding="medium" gap="small">
      <f-text>Coming Soon...</f-text>
    </f-div>
  `;
};

export const Font = Template.bind({});

const IconTemplate: Story<unknown> = () => {
  return html`
    <f-div padding="medium" gap="small">
      <f-text>Coming Soon...</f-text>
    </f-div>
  `;
};

export const Icon = IconTemplate.bind({});
