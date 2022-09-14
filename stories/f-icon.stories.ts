import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import SystemIconPack from "@cldcvr/flow-system-icon/dist/types/icon-pack";
import ProductIconPack from "@cldcvr/flow-product-icon/dist/types/icon-pack";
import GcpIconPack from "@cldcvr/flow-gcp-icon/dist/types/icon-pack";
import AwsIconPack from "@cldcvr/flow-aws-icon/dist/types/icon-pack";

export default {
  title: "components/f-icon",
  component: "f-icon",
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
    Icons from '@cldcvr/flow-system-icon' pack
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

const SystemIconTemplate: Story<unknown> = () => {
  return html`
    <f-div gap="small">
      ${Object.keys(SystemIconPack).map(
        (src) =>
          html` <f-div
            direction="column"
            width="120px"
            gap="small"
            align="middle-center"
          >
            <f-icon .source=${src} size="large"> </f-icon>
            <f-text>${src}</f-text>
          </f-div>`
      )}
    </f-div>
  `;
};

export const flow_system_icon = SystemIconTemplate.bind({});

const ProductIconTemplate: Story<unknown> = () => {
  return html`
    <f-div gap="small">
      ${Object.keys(ProductIconPack).map(
        (src) =>
          html` <f-div
            direction="column"
            width="120px"
            gap="small"
            align="middle-center"
          >
            <f-icon .source=${src} size="large"> </f-icon>
            <f-text>${src}</f-text>
          </f-div>`
      )}
    </f-div>
  `;
};

export const flow_product_icon = ProductIconTemplate.bind({});

const GcpIconTemplate: Story<unknown> = () => {
  return html`
    <f-div gap="small">
      ${Object.keys(GcpIconPack).map(
        (src) =>
          html` <f-div
            direction="column"
            width="120px"
            gap="small"
            align="middle-center"
          >
            <f-icon .source=${src} size="large"> </f-icon>
            <f-text>${src}</f-text>
          </f-div>`
      )}
    </f-div>
  `;
};

export const flow_gcp_icon = GcpIconTemplate.bind({});

const AwsIconTemplate: Story<unknown> = () => {
  return html`
    <f-div gap="small">
      ${Object.keys(AwsIconPack).map(
        (src) =>
          html` <f-div
            direction="column"
            width="120px"
            gap="small"
            align="middle-center"
          >
            <f-icon .source=${src} size="large"> </f-icon>
            <f-text>${src}</f-text>
          </f-div>`
      )}
    </f-div>
  `;
};

export const flow_aws_icon = AwsIconTemplate.bind({});
