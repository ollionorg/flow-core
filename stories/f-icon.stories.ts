import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "f-icon",
} as Meta;

const Template: Story<unknown> = () => {
  const states = [
    "default",
    "secondary",
    "subtle",
    "primary",
    "success",
    "danger",
    "warning",
    "neutral",
  ];
  const sizes = ["x-large", "large", "medium", "small", "x-small"];
  const chromeIconUrl =
    "https://lh3.googleusercontent.com/0cDOOJjp8pUGDDFLqHFITEi35uMGZ5wHpZ9KTKridxk71kpR9MfeydpQqG5n8Mvetvkg5iVuZGeL2xMvxgBY_UL-T9p0x_Eo4EAh";
  return html`
    Emojis
    <br />
    <br />
    ${sizes.map(
      (size) =>
        html` <f-icon source="📦" .size=${size}></f-icon>
          &nbsp; &nbsp;`
    )}
    <br />
    <br />
    Icons from '@cldcvr/flow-icon' pack
    <br />
    <br />
    ${states.map(
      (state) =>
        html`${sizes.map(
            (size) =>
              html` <f-icon
                  source="i-user"
                  .state=${state}
                  .size=${size}
                ></f-icon>
                &nbsp; &nbsp;`
          )}<br /><br />`
    )}
    disabled
    <br />
    <br />

    <f-icon size="x-large" source="i-alarm" disabled></f-icon>

    <br />
    <br />
    loading
    <br />
    <br />

    <f-icon size="x-large" source="i-alarm" loading></f-icon>

    <br />
    <br />
    clickable
    <br />
    <br />

    <f-icon size="x-large" source="i-alarm" clickable></f-icon>
    <br />
    <br />
    url as source
    <br />
    <br />

    <f-icon size="x-large" .source=${chromeIconUrl} tabindex="-1"></f-icon>
  `;
};

export const basic = Template.bind({});
