import { Story } from "@storybook/web-components";
import { html } from "lit-html";

const Icon_Left_Right_Template: Story<unknown> = () => {
  const states = ["primary", "neutral", "success", "warning", "danger"];
  const sizes = ["large", "medium", "small", "x-small"];
  return html`
    ${states.map(
      (state) =>
        html`<f-button
            label="done"
            .state=${state}
            icon-right="i-generic"
            icon-left="i-generic"
            counter="88"
          ></f-button>
          &nbsp;`
    )}
    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="done"
            type="outline"
            icon-right="i-generic"
            icon-left="i-generic"
            counter="88"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}
    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="done"
            variant="curved"
            icon-right="i-generic"
            icon-left="i-generic"
            counter="88"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}
    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="done"
            type="outline"
            variant="curved"
            icon-right="i-generic"
            icon-left="i-generic"
            counter="88"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}

    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="done"
            type="transparent"
            variant="curved"
            icon-right="i-generic"
            icon-left="i-generic"
            counter="88"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}

    <br />
    <br />
    ${sizes.map(
      (size) =>
        html`<f-button
            label="done"
            icon-right="i-generic"
            icon-left="i-generic"
            counter="88"
            .size=${size}
          ></f-button>
          &nbsp;`
    )}
    <br />
    <br />
    ${sizes.map(
      (size) =>
        html`<f-button
            label="done"
            type="outline"
            icon-right="i-generic"
            icon-left="i-generic"
            counter="88"
            .size=${size}
          ></f-button>
          &nbsp;`
    )}

    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="done"
            variant="block"
            icon-right="i-generic"
            icon-left="i-generic"
            counter="88"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}

    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="done"
            type="outline"
            variant="block"
            icon-right="i-generic"
            icon-left="i-generic"
            counter="88"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}
  `;
};

export default Icon_Left_Right_Template;
