import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import "@cldcvr/flow-core/src/components/f-icon/f-icon";
import IconPack from "@cldcvr/flow-icon-free";
import { ConfigUtil } from "@cldcvr/flow-core/src/modules/config";
ConfigUtil.setConfig({ iconPack: IconPack });

export default {
  title: "f-icon",
} as Meta;

const Template: Story<unknown> = () => {
  return html`
    <f-icon source="i-user"></f-icon> &nbsp; <f-icon source="i-alarm"></f-icon>
  `;
};

export const basic = Template.bind({});
