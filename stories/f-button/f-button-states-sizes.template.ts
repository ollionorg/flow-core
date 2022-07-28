import { Story } from "@storybook/web-components";
import { html } from "lit-html";

const StatesAndSizesTemplate: Story<unknown> = () => {
  const states = ["primary", "neutral", "success", "warning", "danger"];
  const sizes = ["large", "medium", "small", "x-small"];
  return html`
    ${states.map(
      (state) =>
        html`<f-button label="label" .state=${state}></f-button> &nbsp;`
    )}
    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="label"
            variant="outline"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}
    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button label="label" shape="curved" .state=${state}></f-button>
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
            .state=${state}
          ></f-button>
          &nbsp;`
    )}

    <br />
    <br />
    ${sizes.map(
      (size) => html`<f-button label="label" .size=${size}></f-button> &nbsp;`
    )}
    <br />
    <br />
    ${sizes.map(
      (size) =>
        html`<f-button label="label" variant="outline" .size=${size}></f-button>
          &nbsp;`
    )}

    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button label="label" shape="block" .state=${state}></f-button>
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
            .state=${state}
          ></f-button>
          &nbsp;`
    )}
  `;
};
export default StatesAndSizesTemplate;
