import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "f-divider",
  component: "f-divider",
} as Meta;

const Template: Story<unknown> = () => {
  const variants = ["solid", "dashed", "dotted"];
  const states = ["primary", "success", "warning", "danger", "neutral"];
  const sizes = ["large", "medium"];
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

export const basic = Template.bind({});
