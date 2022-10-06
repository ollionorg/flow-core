import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "Foundation/Design tokens/Color",
} as Meta;

const Template: Story<unknown> = () => {
  return html`
    <f-div padding="medium" gap="small">
      <f-text>Coming Soon...</f-text>
    </f-div>
  `;
};

export const BaseColor = Template.bind({});

const SystemColorTemplate: Story<unknown> = () => {
  return html`
    <f-div padding="medium" gap="small">
      <f-text>Coming Soon...</f-text>
    </f-div>
  `;
};

export const SystemColor = SystemColorTemplate.bind({});

const ThemesTemplate: Story<unknown> = () => {
  return html`
    <f-div padding="medium" gap="small">
      <f-text>Coming Soon...</f-text>
    </f-div>
  `;
};

export const Themes = ThemesTemplate.bind({});

const SystemModifierTemplate: Story<unknown> = () => {
  return html`
    <f-div padding="medium" gap="small">
      <f-text>Coming Soon...</f-text>
    </f-div>
  `;
};

export const SystemModifier = SystemModifierTemplate.bind({});
