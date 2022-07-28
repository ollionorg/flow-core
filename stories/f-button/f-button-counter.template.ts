import { Story } from "@storybook/web-components";
import { html } from "lit-html";

const Counter_Template: Story<unknown> = () => {
  const states = ["primary", "neutral", "success", "warning", "danger"];
  const sizes = ["large", "medium", "small", "x-small"];
  return html`
    ${states.map(
      (state) =>
        html`<f-button label="label" .state=${state} counter="88"></f-button>
          &nbsp;`
    )}
    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="label"
            variant="outline"
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
            label="label"
            shape="curved"
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
            label="label"
            variant="outline"
            shape="curved"
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
            label="label"
            variant="transparent"
            shape="curved"
            counter="88"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}

    <br />
    <br />
    ${sizes.map(
      (size) =>
        html`<f-button label="label" counter="88" .size=${size}></f-button>
          &nbsp;`
    )}
    <br />
    <br />
    ${sizes.map(
      (size) =>
        html`<f-button
            label="label"
            variant="outline"
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
            label="label"
            shape="block"
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
            label="label"
            variant="outline"
            shape="block"
            counter="88"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}
  `;
};

export default Counter_Template;
