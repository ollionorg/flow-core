import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "f-text",
} as Meta;

const Template: Story<unknown> = () => {
  const textSizes = ["x-small", "small", "medium", "large", "x-large"];
  const variants = ["heading", "para", "code"];
  const weights = ["regular", "medium", "bold"];
  return html`<f-div direction="column" gap="large"
    >${variants.map(
      (v) => html` <f-div direction="column" gap="small">
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

  return html`<f-div direction="column" gap="large"
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

const ATemplate: Story<unknown> = () => {
  const aligns = ["left", "center", "right"];

  return html`<f-div direction="column" gap="large" width="100%">
    ${aligns.map(
      (a) =>
        html` <f-text .align=${a}
          >This is ${a} aligned.Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Etiam semper diam at erat pulvinar, at pulvinar felis
          blandit. Vestibulum volutpat tellus diam, consequat gravida libero
          rhoncus ut.</f-text
        >`
    )}
  </f-div>`;
};

export const align = ATemplate.bind({});

const LTemplate: Story<unknown> = () => {
  return html`<f-div direction="column" gap="large" width="100%">
    <f-text loading>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam
      at erat pulvinar.
    </f-text>
  </f-div>`;
};

export const loading = LTemplate.bind({});

const DTemplate: Story<unknown> = () => {
  return html`<f-div direction="column" gap="large" width="100%">
    <f-text disabled>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam
      at erat pulvinar.
    </f-text>
  </f-div>`;
};

export const disabled = DTemplate.bind({});

const ELTemplate: Story<unknown> = () => {
  return html`<f-div direction="column" gap="large" width="100%">
    <f-text ellipsis>
      <b> Lorem<sup>2</sup> ipsum dolor </b>sit amet,
      <a href="#">here</a> consectetur adipiscing elit. <i>Etiam</i> semper diam
      at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus
      diam, consequat gravida libero rhoncus ut.Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at
      pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida
      libero rhoncus ut.
    </f-text>
    <f-text expandable>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam semper diam
      at erat pulvinar, at pulvinar felis blandit. Vestibulum volutpat tellus
      diam, consequat gravida libero rhoncus ut.Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Etiam semper diam at erat pulvinar, at
      pulvinar felis blandit. Vestibulum volutpat tellus diam, consequat gravida
      libero rhoncus ut.
    </f-text>
    <f-text state="success">
      <ul>
        <li>John Lennon</li>
        <li>Paul McCartney</li>
        <li>George Harrison</li>
        <li>Ringo Starr</li>
      </ul>
    </f-text>
  </f-div>`;
};

export const ellipsis = ELTemplate.bind({});
