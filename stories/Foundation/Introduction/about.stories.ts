import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "Foundation/Introduction",
} as Meta;

const Template: Story<unknown> = () => {
  return html`
    <f-div padding="medium" gap="small">
      <f-text>Coming Soon...</f-text>
    </f-div>
  `;
};

export const About = Template.bind({});

const ReleaseNotesTemplate: Story<unknown> = () => {
  return html`
    <f-div padding="medium" gap="small">
      <f-text>Coming Soon...</f-text>
    </f-div>
  `;
};

export const ReleaseNotes = ReleaseNotesTemplate.bind({});
