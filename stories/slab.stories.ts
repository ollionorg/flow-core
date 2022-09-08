import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "templates/Slab",
} as Meta;

const Template: Story<unknown> = () => {
  return html`
    <f-div
      align="middle-left"
      gap="small"
      border="small solid default around"
      padding="medium"
      variant="curved"
    >
      <f-icon source="i-icon" size="medium"></f-icon>
      <f-text variant="heading" size="medium">Heading</f-text>
      <f-div align="middle-left" gap="small">
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
      </f-div>
      <f-spacer size="fill-container"></f-spacer>
      <f-div align="middle-left" gap="small" width="hug-content">
        <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
        <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
        <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
      </f-div>
    </f-div>
  `;
};

export const icon_text_itemgroup_itemgroup = Template.bind({});

const icon_text_itemgroup_template: Story<unknown> = () => {
  return html`
    <f-div
      align="middle-left"
      gap="small"
      border="small solid default around"
      padding="medium"
      variant="curved"
    >
      <f-icon source="i-icon" size="medium"></f-icon>
      <f-text variant="heading" size="medium">Heading</f-text>
      <f-div align="middle-left" gap="small">
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
      </f-div>
    </f-div>
  `;
};

export const icon_text_itemgroup = icon_text_itemgroup_template.bind({});

const text_itemgroup_itemgroup_template: Story<unknown> = () => {
  return html`
    <f-div
      align="middle-left"
      gap="small"
      border="small solid default around"
      padding="medium"
      variant="curved"
    >
      <f-text variant="heading" size="medium">Heading</f-text>
      <f-div align="middle-left" gap="small">
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
      </f-div>
      <f-spacer size="fill-container"></f-spacer>
      <f-div align="middle-left" gap="small" width="hug-content">
        <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
        <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
        <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
      </f-div>
    </f-div>
  `;
};

export const text_itemgroup_itemgroup = text_itemgroup_itemgroup_template.bind(
  {}
);

const text_itemgroup_template: Story<unknown> = () => {
  return html`
    <f-div
      align="middle-left"
      gap="small"
      border="small solid default around"
      padding="medium"
      variant="curved"
    >
      <f-text variant="heading" size="medium">Heading</f-text>
      <f-div align="middle-left" gap="small">
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
      </f-div>
    </f-div>
  `;
};

export const text_itemgroup = text_itemgroup_template.bind({});

const icon_text_itemgroup_subtext_itemgroup_template: Story<unknown> = () => {
  return html`
    <f-div
      align="top-left"
      gap="small"
      border="small solid default around"
      padding="medium"
      variant="curved"
    >
      <f-icon source="i-icon" size="x-large"></f-icon>
      <f-div direction="column" width="hug-content">
        <f-text variant="heading" size="medium">Heading</f-text>
        <f-text variant="para" size="medium" state="secondary">Title</f-text>
      </f-div>
      <f-div align="middle-left" gap="small">
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
      </f-div>
      <f-spacer size="fill-container"></f-spacer>
      <f-div align="middle-left" gap="small" width="hug-content">
        <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
        <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
        <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
      </f-div>
    </f-div>
  `;
};

export const icon_text_itemgroup_subtext_itemgroup =
  icon_text_itemgroup_subtext_itemgroup_template.bind({});

const icon_text_itemgroup_subtext_template: Story<unknown> = () => {
  return html`
    <f-div
      align="top-left"
      gap="small"
      border="small solid default around"
      padding="medium"
      variant="curved"
    >
      <f-icon source="i-icon" size="x-large"></f-icon>
      <f-div direction="column" width="hug-content">
        <f-text variant="heading" size="medium">Heading</f-text>
        <f-text variant="para" size="medium" state="secondary">Title</f-text>
      </f-div>
      <f-div align="middle-left" gap="small">
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
      </f-div>
    </f-div>
  `;
};

export const icon_text_itemgroup_subtext =
  icon_text_itemgroup_subtext_template.bind({});

const text_itemgroup_subtext_itemgroup_template: Story<unknown> = () => {
  return html`
    <f-div
      align="top-left"
      gap="small"
      border="small solid default around"
      padding="medium"
      variant="curved"
    >
      <f-div direction="column" width="hug-content">
        <f-text variant="heading" size="medium">Heading</f-text>
        <f-text variant="para" size="medium" state="secondary">Title</f-text>
      </f-div>
      <f-div align="middle-left" gap="small">
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
      </f-div>
      <f-spacer size="fill-container"></f-spacer>
      <f-div align="middle-left" gap="small" width="hug-content">
        <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
        <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
        <f-icon source="i-icon" size="medium" state="secondary"></f-icon>
      </f-div>
    </f-div>
  `;
};

export const text_itemgroup_subtext_itemgroup =
  text_itemgroup_subtext_itemgroup_template.bind({});

const text_itemgroup_subtext_template: Story<unknown> = () => {
  return html`
    <f-div
      align="top-left"
      gap="small"
      border="small solid default around"
      padding="medium"
      variant="curved"
    >
      <f-div direction="column" width="hug-content">
        <f-text variant="heading" size="medium">Heading</f-text>
        <f-text variant="para" size="medium" state="secondary">Title</f-text>
      </f-div>
      <f-div align="middle-left" gap="small">
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
        <f-icon source="i-icon" size="small" state="secondary"></f-icon>
      </f-div>
    </f-div>
  `;
};

export const text_itemgroup_subtext = text_itemgroup_subtext_template.bind({});
