/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Story, Meta } from "@storybook/web-components";
import { LitElement } from "lit";
import { html } from "lit-html";
import { customElement } from "lit/decorators.js";

export default {
  title: "components/f-popover",
  component: "f-popover",
  docs: {
    inlineStories: false,
  },
} as Meta;
@customElement("story-basic")
class BasicStoryElement extends LitElement {
  storydata = { open: true, overlay: true };

  togglePopOver() {
    this.storydata.open = !this.storydata.open;
    // Important to call whenever state changes
    this.requestUpdate();
  }
  // to disable shadow dom
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <f-div align="top-right" height="500px">
        <f-popover
          ?open=${this.storydata.open}
          ?overlay=${this.storydata.overlay}
          size="small"
          target="#popoverTarget"
        >
          <f-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut mi
            egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
            tristique. Etiam id tempor velit. Vestibulum ante ipsum primis in faucibus orci luctus
            et ultrices posuere cubilia curae; Donec sodales mi vitae felis ornare facilisis.
            Suspendisse et ante sit amet lectus ullamcorper gravida.
          </f-text>
        </f-popover>

        <f-button id="popoverTarget" label="Open" @click=${this.togglePopOver}> </f-button>
      </f-div>
    `;
  }
}
const Template: Story<Record<string, any>> = (_args: Record<string, any>) => {
  return html`<story-basic></story-basic>`;
};

export const basic = Template.bind({});
