import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "f-text",
} as Meta;

const Template: Story<unknown> = () => {
  const textSizes = ["x-small", "small", "medium", "large", "x-large"];
  const variants = ["heading", "para", "code"];
  const weights = ["regular", "medium", "bold"];
  return html`<f-div variant="column" gap="large"
    >${variants.map(
      (v) => html` <f-div variant="column" gap="small">
        ${textSizes.map(
          (size) =>
            html`${weights.map(
              (w) => html`<f-text .weight=${w} .variant=${v} .size=${size}
                >${v} : ${size} size ${w} text</f-text
              >`
            )}`
        )}
      </f-div>`
    )}</f-div
  >`;
};

export const size_variants_weights = Template.bind({});
const STemplate: Story<unknown> = () => {
  const states = [
    "default",
    "secondary",
    "subtle",
    "primary",
    "success",
    "danger",
    "warning",
  ];

  return html`<f-div variant="column" gap="large"
    >${states.map(
      (s) =>
        html`<f-div .state=${s} padding="x-small">
          <f-text .state=${s}>This is in 'f-div' ${s} state</f-text></f-div
        >`
    )}
    ${states.map((s) => html` <f-text .state=${s}>This is ${s} state</f-text>`)}
  </f-div>`;
};

export const states = STemplate.bind({});
