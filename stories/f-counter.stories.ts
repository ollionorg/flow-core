import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "components/f-counter",
  component: "f-counter",
} as Meta;

const Template: Story<unknown> = () => {
  const states = ["primary", "success", "warning", "danger", "neutral"];
  const sizes = ["large", "medium", "small"];
  return html`
    ${states.map(
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
    )}
    <br /><br />
    Disabled<br /><br />
    <f-counter label="88" state="primary" disabled size="large"></f-counter>
    <br /><br />
    Loading<br /><br />
    <f-counter label="88" state="primary" loading size="large"></f-counter>
  `;
};

export const basic = Template.bind({});
