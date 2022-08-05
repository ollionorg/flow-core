import { Story } from "@storybook/web-components";
import { html } from "lit-html";

const StatesAndSizesTemplate: Story<unknown> = () => {
  const states = ["primary", "neutral", "success", "warning", "danger"];
  const sizes = ["large", "medium", "small", "x-small"];
  return html`
    <f-button label="add" icon-right="i-crown" size="medium"></f-button>
    <f-button label="add" icon-left="i-crown" size="medium"></f-button>
    <f-button
      label="add"
      icon-left="i-plus"
      icon-right="i-user"
      shape="block"
      size="medium"
      variant="round"
    ></f-button>
    <br />
    <br />
    <f-button
      label="add"
      icon-left="i-plus"
      icon-right="i-user"
      shape="block"
      size="medium"
      variant="block"
    ></f-button>
    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button label="label" .state=${state}></f-button> &nbsp;`
    )}
    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button label="label" type="outline" .state=${state}></f-button>
          &nbsp;`
    )}
    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="label"
            variant="curved"
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
            type="outline"
            variant="curved"
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
            type="transparent"
            variant="curved"
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
        html`<f-button label="label" type="outline" .size=${size}></f-button>
          &nbsp;`
    )}

    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button label="label" variant="block" .state=${state}></f-button>
          &nbsp;`
    )}

    <br />
    <br />
    ${states.map(
      (state) =>
        html`<f-button
            label="label"
            type="outline"
            variant="block"
            .state=${state}
          ></f-button>
          &nbsp;`
    )}
  `;
};
export default StatesAndSizesTemplate;
