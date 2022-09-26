/* eslint-disable @typescript-eslint/no-explicit-any */
import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";

export default {
  title: "components/f-popover",
} as Meta;

const Template: Story<Record<string, any>> = (args: Record<string, any>) => {
  return html`
    <f-div align="top-right" height="100%">
      <f-popover
        ?open=${args.open}
        ?overlay=${args.overlay}
        size="large"
        target="#popoverTarget"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
        imperdiet enim ut mi egestas, non efficitur odio varius. Phasellus
        accumsan pellentesque ex vehicula tristique. Etiam id tempor velit.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia curae; Donec sodales mi vitae felis ornare facilisis.
        Suspendisse et ante sit amet lectus ullamcorper gravida.
      </f-popover>

      <f-button id="popoverTarget" label="Open"> </f-button>
    </f-div>
  `;
};

export const basic = Template.bind({});
basic.args = {
  open: true,
  overlay: true,
};
