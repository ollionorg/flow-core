import { Story } from "@storybook/web-components";
import { html } from "lit-html";

const Icon_Right_Template: Story<unknown> = () => {
  const states = ["primary", "neutral", "success", "warning", "danger"];
  const sizes = ["large", "medium", "small", "x-small"];
  return html`
    ${states.map(
      (state) =>
        html`<f-button
            label="done"
            .state=${state}
            icon-right="i-tick"
          ></f-button>
          &nbsp;`
    )}
    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="done"
            category="outline"
            icon-right="i-tick"
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
            icon-right="i-tick"
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
            category="outline"
            variant="curved"
            icon-right="i-tick"
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
            category="transparent"
            variant="curved"
            icon-right="i-tick"
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
            icon-right="i-tick"
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
            category="outline"
            icon-right="i-tick"
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
            icon-right="i-tick"
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
            category="outline"
            variant="block"
            icon-right="i-tick"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}
  `;
};

export default Icon_Right_Template;
