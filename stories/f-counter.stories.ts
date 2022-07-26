import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "f-counter",
} as Meta;

const Template: Story<unknown> = () => {
  const states = [
    "primary",
    "subtle",
    "success",
    "warning",
    "danger",
    "neutral",
  ];
  const sizes = ["large", "medium", "small"];
  return html` ${states.map(
    (state) =>
      html`${sizes.map(
          (size) =>
            html` <f-counter
                label="88"
                .state=${state}
                .size=${size}
              ></f-counter>
              &nbsp; &nbsp;`
        )}<br /><br />`
  )}`;
};

export const basic = Template.bind({});
