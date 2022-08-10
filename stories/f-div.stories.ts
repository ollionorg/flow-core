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
    overflow: {
      options: ["wrap", "scroll", "hidden"],
      control: { type: "select" },
    },
    state: {
      options: [
        "subtle",
        "default",
        "secondary",
        "tertiary",
        "success",
        "warning",
        "danger",
      ],
      control: { type: "select" },
    },
    selected: {
      options: ["none", "background", "border", "notch-right", "notch-left"],
      control: { type: "select" },
    },
    sticky: {
      options: ["none", "top", "bottom", "left", "right"],
      control: { type: "select" },
    },
    loading: {
      options: ["skeleton", "loader"],
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
        gap="small"
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
        overflow="hidden"
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

const OTemplate: Story<Record<string, string>> = (
  args: Record<string, string>
) => {
  return html`
    <f-div width="100%" height="100%" variant="column" gap="small">
      <f-div
        border="small solid default"
        gap="small"
        padding="small"
        .overflow=${args.overflow}
      >
        ${[...Array(1000).keys()].map(
          () =>
            html`<f-button
              .label=${args.overflow}
              icon-left="i-plus"
            ></f-button>`
        )}
      </f-div>
    </f-div>
  `;
};

export const overflow = OTemplate.bind({});

overflow.args = {
  overflow: "wrap",
};

const STemplate: Story<Record<string, string>> = (
  args: Record<string, string>
) => {
  return html`
    <f-div width="100%" height="100%" variant="column" gap="small">
      <f-div
        width="fill-container"
        height="hug-content"
        gap="small"
        padding="small"
        .state=${args.state}
        .selected=${args.selected}
      >
        <f-icon source="i-flag" size="large"></f-icon>
      </f-div>
    </f-div>
  `;
};

export const state = STemplate.bind({});

state.args = {
  state: "default",
  selected: "none",
};

const STTemplate: Story<Record<string, string>> = (
  args: Record<string, string>
) => {
  return html`
    <f-div
      width="100%"
      height="100%"
      .variant=${args.variant}
      gap="small"
      overflow="scroll"
    >
      ${[...Array(3).keys()].map(
        () =>
          html` <f-div border="small solid default" gap="small" padding="small"
            ><f-button label="normal" icon-left="i-plus"></f-button>
          </f-div>`
      )}

      <f-div
        gap="small"
        state="danger"
        padding="small"
        selected="notch-right"
        .sticky=${args.sticky}
        ><f-button label="normal" icon-left="i-plus"></f-button>
      </f-div>
      <f-div gap="small" disabled padding="small"
        ><f-button label="disabled" icon-left="i-plus"></f-button>
      </f-div>
      <f-div gap="small" clickable padding="small"
        ><f-button label="clickable" icon-left="i-plus"></f-button>
      </f-div>
      ${[...Array(100).keys()].map(
        () =>
          html` <f-div border="small solid default" gap="small" padding="small"
            ><f-button label="normal" icon-left="i-plus"></f-button>
          </f-div>`
      )}

      <f-div
        gap="small"
        state="danger"
        padding="small"
        selected="notch-right"
        .sticky=${args.sticky}
        ><f-button label="normal" icon-left="i-plus"></f-button>
      </f-div>
    </f-div>
  `;
};

export const sticky = STTemplate.bind({});

sticky.args = {
  variant: "column",
  sticky: "none",
};

const LTemplate: Story<Record<string, string>> = (
  args: Record<string, string>
) => {
  return html`
    <f-div width="100%" height="100%" gap="small" overflow="scroll">
      <f-div
        gap="small"
        height="hug-content"
        .loading=${args.loading}
        padding="small"
        variant="column"
      >
        <f-button label="loading" icon-left="i-plus"></f-button>
        <f-div gap="small" padding="small">
          <f-button label="loading" icon-left="i-plus"></f-button>
        </f-div>
        <f-div gap="small" padding="large"> Test text</f-div>
      </f-div>
    </f-div>
  `;
};

export const loading = LTemplate.bind({});

sticky.args = {
  loading: "skeleton",
};
