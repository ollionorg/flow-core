import { LitElement } from "lit";
import { html } from "lit-html";
import { customElement } from "lit/decorators.js";

@customElement("story-basic")
class BasicStoryElement extends LitElement {
  /**
   * Static data required for open and close popover
   */
  storydata = { open: true, overlay: true };

  /**
   * Fiunction to close/open popover
   */
  togglePopOver() {
    this.storydata.open = !this.storydata.open;
    // Important to call whenever state changes (for lit elements only)
    this.requestUpdate();
  }
  // to disable shadow dom
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <!--Start: story markup (copy from here)-->
      <f-div align="middle-center">
        <f-popover
          ?open=${this.storydata.open}
          ?overlay=${this.storydata.overlay}
          size="small"
          target="#popoverTarget"
        >
          <f-div state="tertiary" padding="medium">
            <f-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet enim ut
              mi egestas, non efficitur odio varius. Phasellus accumsan pellentesque ex vehicula
              tristique.
            </f-text>
          </f-div>
        </f-popover>

        <f-button id="popoverTarget" label="Open" @click=${this.togglePopOver}> </f-button>
      </f-div>
      <!--END: story markup-->
    `;
  }
}
