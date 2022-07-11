import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import "flow-core/src/f-complex/f-complex";

export default {
  title: "Flow Core",
} as Meta;

const Template: Story<any> = () => {
  return html`<h1>Welcome</h1>
    <f-complex></f-complex>`;
};

export const Welcome = Template.bind({});
