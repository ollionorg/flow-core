import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "sandbox",
} as Meta;

const Template: Story<unknown> = () => {
  return html`
    <f-div
      direction="column"
      gap="large"
      state="default"
      width="100%"
      height="100%"
      padding="large"
    >
      <f-div
        state="secondary"
        direction="row"
        gap="medium"
        width="374px"
        height="36px"
        align="top-left"
      >
        <f-icon size="x-large" state="secondary" source="i-letter"></f-icon>
        <f-div
          direction="row"
          state="transparent"
          gap="small"
          width="fill-container"
          height="fill-container"
          align="middle-left"
        >
          <f-text variant="heading" size="medium" weight="bold" state="default"
            >Heading</f-text
          >
          <f-counter size="medium" state="neutral" label="88"></f-counter>
        </f-div>
        <f-div
          state="transparent"
          gap="small"
          width="hug-content"
          height="fill-container"
          align="middle-center"
        >
          <f-button
            variant="curved"
            state="neutral"
            size="x-small"
            label="label"
          ></f-button>
        </f-div>
      </f-div>

      <f-div
        state="secondary"
        direction="row"
        gap="medium"
        width="374px"
        height="36px"
        align="middle-left"
      >
        <f-icon size="x-large" state="secondary" source="i-letter"></f-icon>
        <f-div
          direction="row"
          state="transparent"
          gap="small"
          width="fill-container"
          height="fill-container"
          align="middle-left"
          style="border: 1px solid red"
        >
          <f-text
            variant="heading"
            size="medium"
            weight="bold"
            state="default"
            style="border: 1px solid red"
            >Heading</f-text
          >
          <f-counter size="medium" state="neutral" label="88"></f-counter>
        </f-div>
        <f-div
          state="transparent"
          gap="small"
          width="hug-content"
          height="fill-container"
          align="middle-center"
        >
          <f-icon-button
            variant="block"
            type="packed"
            size="small"
            state="neutral"
            icon="i-plus-fill"
          ></f-icon-button>
          <f-icon-button
            variant="block"
            type="packed"
            size="small"
            state="neutral"
            icon="i-plus-fill"
          ></f-icon-button>
          <f-icon-button
            variant="block"
            type="packed"
            size="small"
            state="neutral"
            icon="i-plus-fill"
          ></f-icon-button>
        </f-div>
      </f-div>
    </f-div>
  `;
};

export const basic = Template.bind({});
