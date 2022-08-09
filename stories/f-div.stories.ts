import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "f-div",
  argTypes: {
    variant: {
      options: ["row", "column"],
      control: { type: "select" },
    },
    align: {
      options: [
        "top-left",
        "top-center",
        "top-right",
        "left",
        "center",
        "right",
        "bottom-left",
        "bottom-center",
        "bottom-right",
      ],
      control: { type: "select" },
    },
  },
} as Meta;

const Template: Story<unknown> = () => {
  return html`
    <f-div width="fill-container" height="100%" variant="column" gap="small">
      <f-div
        border="small solid default"
        variant="column"
        gap="auto"
        padding="small"
      >
        <f-button label="Add" icon-left="i-plus"></f-button>
        <f-button
          label="Warning"
          icon-right="i-alarm"
          state="warning"
        ></f-button>
        <f-button label="Done" state="success"></f-button>
        <f-button label="Something went wrong" state="danger"></f-button>
      </f-div>

      <f-div
        border="small solid default"
        variant="row"
        gap="auto"
        height="hug-content"
        padding="small"
      >
        <f-button label="Add" icon-left="i-plus"></f-button>
        <f-button
          label="Warning"
          icon-right="i-alarm"
          state="warning"
        ></f-button>
        <f-button label="Done" state="success"></f-button>
        <f-button label="Something went wrong" state="danger"></f-button>
      </f-div>
      <f-div
        border="small solid default"
        variant="row"
        gap="auto"
        height="hug-content"
      >
        <f-button
          label="height hug content"
          icon-left="i-plus"
          variant="block"
        ></f-button>
        <f-button
          label="height hug content"
          icon-right="i-alarm"
          state="warning"
          variant="block"
        ></f-button>
      </f-div>

      <f-div
        border="small solid secondary around"
        padding="small"
        width="hug-content"
        height="hug-content"
      >
        <f-button label="Add" icon-left="i-plus"></f-button>
      </f-div>

      <f-div
        border="small solid default around"
        padding="small"
        gap="large"
        variant="column"
        width="hug-content"
        height="fill-container"
      >
        <f-button label="Add" icon-left="i-plus"></f-button>
        <f-button label="Add" icon-left="i-plus"></f-button>
      </f-div>
    </f-div>
  `;
};

export const basic = Template.bind({});

const ATemplate: Story<Record<string, string>> = (
  args: Record<string, string>
) => {
  return html`
    <f-div width="100%" height="100%" variant="column" gap="small">
      <f-div
        border="small solid default"
        gap="small"
        padding="small"
        .variant=${args.variant}
        .align=${args.align}
      >
        <f-button .label=${args.align} icon-left="i-plus"></f-button>
        <f-button
          .label=${args.align}
          icon-right="i-alarm"
          state="warning"
        ></f-button>
        <f-button .label=${args.align} state="success"></f-button>
      </f-div>
    </f-div>
  `;
};

export const align = ATemplate.bind({});

align.args = {
  variant: "row",
  align: "top-left",
};
