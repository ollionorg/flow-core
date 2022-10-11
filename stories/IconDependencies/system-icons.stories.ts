import { Story, Meta } from "@storybook/web-components";
import { LitElement } from "lit";
import { html } from "lit-html";
import { customElement } from "lit/decorators.js";
import SystemIconPack from "@cldcvr/flow-system-icon/dist/types/icon-pack";
import ProductIconPack from "@cldcvr/flow-product-icon/dist/types/icon-pack";
import GcpIconPack from "@cldcvr/flow-gcp-icon/dist/types/icon-pack";
import AwsIconPack from "@cldcvr/flow-aws-icon/dist/types/icon-pack";

@customElement("system-icons")
export class SystemIconStoryElement extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <f-div gap="x-large" padding="large">
        ${Object.keys(SystemIconPack).map(
          (src) =>
            html` <f-div direction="column" width="hug-content" gap="medium" align="middle-center">
              <f-icon .source=${src} size="large"> </f-icon>
              <f-text variant="para" size="small" weight="medium">${src}</f-text>
            </f-div>`
        )}
      </f-div>
    `;
  }
}

@customElement("product-icons")
export class ProductIconStoryElement extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <f-div gap="x-large" padding="large">
        ${Object.keys(ProductIconPack).map(
          (src) =>
            html` <f-div direction="column" width="hug-content" gap="medium" align="middle-center">
              <f-icon .source=${src} size="large"> </f-icon>
              <f-text variant="para" size="small" weight="medium">${src}</f-text>
            </f-div>`
        )}
      </f-div>
    `;
  }
}

@customElement("gcp-icons")
export class GCPIconStoryElement extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <f-div gap="x-large" padding="large">
        ${Object.keys(GcpIconPack).map(
          (src) =>
            html` <f-div direction="column" width="hug-content" gap="medium" align="middle-center">
              <f-icon .source=${src} size="large"> </f-icon>
              <f-text variant="para" size="small" weight="medium">${src}</f-text>
            </f-div>`
        )}
      </f-div>
    `;
  }
}

@customElement("aws-icons")
export class AWSIconStoryElement extends LitElement {
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <f-div gap="x-large" padding="large">
        ${Object.keys(AwsIconPack).map(
          (src) =>
            html` <f-div direction="column" width="hug-content" gap="medium" align="middle-center">
              <f-icon .source=${src} size="large"> </f-icon>
              <f-text variant="para" size="small" weight="medium">${src}</f-text>
            </f-div>`
        )}
      </f-div>
    `;
  }
}
