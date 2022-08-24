import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "f-divider",
  component: "f-divider",
} as Meta;

const Template: Story<unknown> = () => {
  return html`
    <br />
    <f-div width="500px" direction="column" padding="large" gap="large">
      <f-text type="para" size="small">Size: Medium, Variant: Dotted</f-text>
      <f-divider variant="dotted" size="medium" state="default"></f-divider>
      <f-text type="para" size="small">Size: Large, Variant: Solid</f-text>
      <f-divider variant="solid" size="large" state="default"></f-divider>
      <f-text type="para" size="small">Size: Medium, Variant: Dashed, State: secondary</f-text>
      <f-divider variant="dashed" size="medium" state="secondary"></f-divider>
      <f-text type="para" size="small">Size: Medium, Variant: Dashed, State: subtle</f-text>
      <f-divider variant="dashed" size="medium" state="subtle"></f-divider>
      <f-text type="para" size="small">Vertical Dividers</f-text>
      <f-div direction="row" height="200px" padding="large" gap="large">
        <f-divider variant="dashed" size="medium" state="secondary"></f-divider>
        <f-divider variant="solid" size="large" state="secondary"></f-divider>
      </f-div>
    </f-div>
    <br />
  `;
};

const DividerUsageTemplate: Story<unknown> = () => {
  return html`
    <f-div direction="column" width="100%" height="100%">
      <f-div height="hug-content" gap="auto" padding="small">
        <f-div gap="small" width="hug-content" align="middle-center">
          <f-icon source="p-cloudcover-dark" size="large" state="primary"></f-icon>
          <f-text variant="para" size="x-small" weight="regular"> Home </f-text>
        </f-div>
        <f-div gap="large" width="hug-content">
          <f-icon .clickable=${true} source="i-bug" size="large" state="default"></f-icon>
          <f-divider variant="solid" size="medium" state="subtle"></f-divider>
          <f-icon .clickable=${true} source="i-file" size="large" state="default"></f-icon>
          <f-icon .clickable=${true} source="i-fire" size="large" state="default"></f-icon>
          <f-icon .clickable=${true} source="i-alarm" size="large" state="default"></f-icon>
          <f-icon .clickable=${true} source="i-org" size="large" state="default"></f-icon>
          <f-icon .clickable=${true} source="i-user" size="large" state="default"></f-icon>
        </f-div>
      </f-div>
      <f-divider variant="solid" size="medium" state="secondary"></f-divider>
      <f-div height="300px">
        <f-div align="middle-center" width="49%" padding="large">
          <f-text type="para" size="small"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.</f-text
          >
        </f-div>
        <f-divider variant="solid" size="large" state="default"></f-divider>
        <f-div align="middle-center" width="49%" padding="large">
          <f-text type="para" size="small"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.</f-text
          >
        </f-div>
      </f-div>
      <f-divider variant="dashed" size="medium" state="subtle"></f-divider>
      <f-div height="300px">
        <f-div align="middle-center" width="51%" padding="large">
          <f-text type="para" size="small"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.</f-text
          >
        </f-div>
        <f-divider variant="dashed" size="medium" state="subtle"></f-divider>
        <f-div align="middle-center" width="47%" padding="large">
          <f-text type="para" size="small"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.</f-text
          >
        </f-div>
      </f-div>
      <f-divider variant="dotted" size="medium" state="subtle"></f-divider>

    </f-div>
  `;
};

export const basic = Template.bind({});
export const DividerUsage = DividerUsageTemplate.bind({});
