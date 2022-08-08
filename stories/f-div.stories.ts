import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "f-div",
} as Meta;

const Template: Story<unknown> = () => {
  return html`
    <f-div border="small solid default">
      <f-button label="Add" icon-left="i-plus"></f-button>
      <f-button label="Warning" icon-right="i-alarm" state="warning"></f-button>
      <f-button label="Done" state="success"></f-button>
      <f-button label="Something went wrong" state="danger"></f-button>
    </f-div>
    <f-div border="small" padding="small"></f-div>
    <f-div border="small" padding="medium"></f-div>

    <f-div border="small" padding="small medium"></f-div>
    <f-div border="small" padding="small medium large"></f-div>
    <f-div border="small" padding="small medium small large"></f-div>
  `;
};

export const basic = Template.bind({});
