import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "f-icon-button",
} as Meta;

const Template: Story<unknown> = () => {
  return html`
    <f-div direction="column" gap="medium">
      Fill
      <f-div gap="medium">
        <f-icon-button icon="i-plus" size="x-small"></f-icon-button>
        <f-icon-button icon="i-plus" size="small"></f-icon-button>
        <f-icon-button icon="i-plus"></f-icon-button>
        <f-icon-button icon="i-plus" size="large"></f-icon-button>
        <f-icon-button
          icon="i-plus"
          size="large"
          state="danger"
          loading
        ></f-icon-button>
      </f-div>
      Fill:Curved
      <f-div gap="medium">
        <f-icon-button
          icon="i-plus"
          size="x-small"
          variant="curved"
        ></f-icon-button>
        <f-icon-button
          icon="i-plus"
          size="small"
          variant="curved"
        ></f-icon-button>
        <f-icon-button icon="i-plus" variant="curved"></f-icon-button>
        <f-icon-button
          icon="i-plus"
          size="large"
          variant="curved"
        ></f-icon-button>
        <f-icon-button
          icon="i-plus"
          size="large"
          variant="curved"
          loading
        ></f-icon-button>
      </f-div>
      Outline
      <f-div gap="medium">
        <f-icon-button
          icon="i-plus"
          size="x-small"
          type="outline"
        ></f-icon-button>
        <f-icon-button
          icon="i-plus"
          size="small"
          type="outline"
        ></f-icon-button>
        <f-icon-button icon="i-plus" type="outline"></f-icon-button>
        <f-icon-button
          icon="i-plus"
          size="large"
          type="outline"
        ></f-icon-button>
        <f-icon-button
          icon="i-plus"
          size="large"
          type="outline"
          state="warning"
          loading
        ></f-icon-button>
      </f-div>
      Outline:Curved
      <f-div gap="medium">
        <f-icon-button
          icon="i-plus"
          size="x-small"
          type="outline"
          variant="curved"
        ></f-icon-button>
        <f-icon-button
          icon="i-plus"
          size="small"
          type="outline"
          variant="curved"
        ></f-icon-button>
        <f-icon-button
          icon="i-plus"
          type="outline"
          variant="curved"
        ></f-icon-button>
        <f-icon-button
          icon="i-plus"
          size="large"
          type="outline"
          variant="curved"
        ></f-icon-button>
      </f-div>
      Transparent
      <f-div gap="medium">
        <f-icon-button
          icon="i-plus"
          size="x-small"
          type="transparent"
        ></f-icon-button>
        <f-icon-button
          icon="i-plus"
          size="small"
          type="transparent"
        ></f-icon-button>
        <f-icon-button icon="i-plus" type="transparent"></f-icon-button>
        <f-icon-button
          icon="i-plus"
          size="large"
          type="transparent"
        ></f-icon-button>
        <f-icon-button
          icon="i-plus"
          size="large"
          type="transparent"
          state="success"
          loading
        ></f-icon-button>
      </f-div>
      Packed
      <f-div gap="medium">
        <f-icon-button
          icon="i-plus"
          size="x-small"
          type="packed"
        ></f-icon-button>
        <f-icon-button icon="i-plus" size="small" type="packed"></f-icon-button>
        <f-icon-button icon="i-plus" type="packed"></f-icon-button>
        <f-icon-button icon="i-plus" size="large" type="packed"></f-icon-button>
      </f-div>
      Block
      <f-div gap="medium">
        <f-icon-button
          icon="i-plus"
          size="x-small"
          variant="block"
        ></f-icon-button>
        <f-icon-button
          icon="i-plus"
          size="small"
          variant="block"
        ></f-icon-button>
        <f-icon-button icon="i-plus" variant="block"></f-icon-button>
        <f-icon-button
          icon="i-plus"
          size="large"
          variant="block"
        ></f-icon-button>
      </f-div>

      States
      <f-div gap="medium">
        <f-icon-button icon="i-plus" state="primary"></f-icon-button>
        <f-icon-button icon="i-plus" state="danger"></f-icon-button>
        <f-icon-button icon="i-plus" state="neutral"></f-icon-button>
        <f-icon-button icon="i-plus" state="success"></f-icon-button>
        <f-icon-button icon="i-plus" state="warning"></f-icon-button>
      </f-div>
      <f-div gap="medium">
        <f-icon-button
          type="outline"
          icon="i-plus"
          state="primary"
        ></f-icon-button>
        <f-icon-button
          type="outline"
          type="outline"
          icon="i-plus"
          state="danger"
        ></f-icon-button>
        <f-icon-button
          type="outline"
          icon="i-plus"
          state="neutral"
        ></f-icon-button>
        <f-icon-button
          type="outline"
          icon="i-plus"
          state="success"
        ></f-icon-button>
        <f-icon-button
          type="outline"
          icon="i-plus"
          state="warning"
        ></f-icon-button>
      </f-div>
      Counter
      <f-div gap="medium">
        <f-icon-button
          icon="i-plus"
          state="primary"
          counter="12"
        ></f-icon-button>
        <f-icon-button
          icon="i-plus"
          state="danger"
          counter="12"
        ></f-icon-button>
        <f-icon-button
          icon="i-plus"
          state="neutral"
          counter="12"
        ></f-icon-button>
        <f-icon-button
          icon="i-plus"
          state="success"
          counter="12"
        ></f-icon-button>
        <f-icon-button
          icon="i-plus"
          state="warning"
          counter="12"
        ></f-icon-button>
      </f-div>
      Disabled
      <f-div gap="medium">
        <f-icon-button
          icon="i-plus"
          state="primary"
          counter="12"
          disabled
        ></f-icon-button>
      </f-div>
      Loading
      <f-div gap="medium">
        <f-icon-button
          icon="i-plus"
          state="success"
          counter="12"
          loading
        ></f-icon-button>
      </f-div>
    </f-div>
  `;
};

export const basic = Template.bind({});
