import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "components/f-pictogram",
  component: "f-pictogram",
} as Meta;

const Template: Story<unknown> = () => {
  const sizes = ["small", "medium", "large", "x-large"];

  return html`
    <f-div align="middle-left" padding="small" gap="large">
      ${sizes.map(
        (size) => html` <f-pictogram source="😀" .size=${size} .clickable=${true}></f-pictogram>`
      )}
    </f-div>
    <f-div align="middle-left" padding="small" gap="large">
      ${sizes.map((size) => html` <f-pictogram source="i-user" .size=${size}></f-pictogram>`)}
    </f-div>
    <f-div align="middle-left" padding="small" gap="large">
      ${sizes.map(
        (size) =>
          html` <f-pictogram
            source="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            .size=${size}
          ></f-pictogram>`
      )}
    </f-div>
    <f-div align="middle-left" padding="small" gap="large">
      ${sizes.map(
        (size, index) => html` <f-pictogram source="A${index + 1}" .size=${size}></f-pictogram>`
      )}
    </f-div>
  `;
};

const VariantTemplate: Story<unknown> = () => {
  const variants = ["hexagon", "square", "squircle", "circle"];

  return html`
    <f-div align="middle-left" padding="small" gap="large">
      ${variants.map(
        (variant) => html` <f-pictogram source="😀" .variant=${variant}></f-pictogram>`
      )}
    </f-div>
    <f-div align="middle-left" padding="small" gap="large">
      ${variants.map(
        (variant) => html` <f-pictogram source="i-user" .variant=${variant}></f-pictogram>`
      )}
    </f-div>
    <f-div align="middle-left" padding="small" gap="large">
      ${variants.map(
        (variant) =>
          html` <f-pictogram
            source="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
            .variant=${variant}
          ></f-pictogram>`
      )}
    </f-div>
    <f-div align="middle-left" padding="small" gap="large">
      ${variants.map(
        (variant, index) =>
          html` <f-pictogram source="A${index + 1}" .variant=${variant}></f-pictogram>`
      )}
    </f-div>
  `;
};

const StatesTemplate: Story<unknown> = () => {
  const variants = ["hexagon", "square", "squircle", "circle"];
  const states = ["default", "primary", "success", "warning", "danger"];

  return html`
    ${variants.map(
      (variant, index) => html` <f-div align="middle-left" padding="small" gap="large">
        ${states.map(
          (state) => html` <f-pictogram
            .source=${index === 1
              ? "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
              : "i-git"}
            .variant=${variant}
            .state=${state}
          ></f-pictogram>`
        )}
      </f-div>`
    )}
  `;
};

const LoaderTemplate: Story<unknown> = () => {
  const variants = ["hexagon", "square", "squircle", "circle"];
  const states = ["default", "primary", "success", "warning", "danger"];

  return html`
    ${variants.map(
      (variant) => html` <f-div align="middle-left" padding="small" gap="large">
        ${states.map(
          (state) => html` <f-pictogram
            source="i-git"
            .variant=${variant}
            .state=${state}
            .loading=${true}
          ></f-pictogram>`
        )}
      </f-div>`
    )}
  `;
};

const DisabledTemplate: Story<unknown> = () => {
  const variants = ["hexagon", "square", "squircle", "circle"];
  const states = ["default", "primary", "success", "warning", "danger"];

  return html`
    ${variants.map(
      (variant) => html` <f-div align="middle-left" padding="small" gap="large">
        ${states.map(
          (state) => html` <f-pictogram
            source="i-git"
            .variant=${variant}
            .state=${state}
            .disabled=${true}
            .clickable=${true}
          ></f-pictogram>`
        )}
      </f-div>`
    )}
  `;
};

export const Basic = Template.bind({});
export const Variants = VariantTemplate.bind({});
export const States = StatesTemplate.bind({});
export const Loader = LoaderTemplate.bind({});
export const Disabled = DisabledTemplate.bind({});
