import { Story } from "@storybook/web-components";
import { html } from "lit-html";

const Icon_Left_Template: Story<unknown> = () => {
  const states = ["primary", "neutral", "success", "warning", "danger"];
  const sizes = ["large", "medium", "small", "x-small"];
  return html`
    ${states.map(
      (state) =>
        html`<f-button
            label="add"
            .state=${state}
            icon-left="i-plus"
          ></f-button>
          &nbsp;`
    )}
    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="add"
            variant="outline"
            icon-left="i-plus"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}
    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="add"
            shape="curved"
            icon-left="i-plus"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}
    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="add"
            variant="outline"
            shape="curved"
            icon-left="i-plus"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}

    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="add"
            variant="transparent"
            shape="curved"
            icon-left="i-plus"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}

    <br />
    <br />
    ${sizes.map(
      (size) =>
        html`<f-button label="add" icon-left="i-plus" .size=${size}></f-button>
          &nbsp;`
    )}
    <br />
    <br />
    ${sizes.map(
      (size) =>
        html`<f-button
            label="add"
            variant="outline"
            icon-left="i-plus"
            .size=${size}
          ></f-button>
          &nbsp;`
    )}

    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="add"
            shape="block"
            icon-left="i-plus"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}

    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="add"
            variant="outline"
            shape="block"
            icon-left="i-plus"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}
  `;
};

export default Icon_Left_Template;
