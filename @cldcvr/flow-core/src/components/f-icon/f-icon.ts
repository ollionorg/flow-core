import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-icon.scss";
import { FElement } from "./../../shared/f-element";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { ConfigUtil } from "./../../modules/config";

@customElement("f-icon")
export class FIcon extends FElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];

  private _source!: string;

  /**
   * @attribute Source property defines what will be displayed on the icon. For icon variant It can take the icon name from a library , any inline SVG or any URL for the image. For emoji, it takes emoji as inline text.
   */
  @property({
    type: String,
    reflect: true,
  })
  get source(): string {
    return this._source;
  }
  set source(value) {
    const IconPack = ConfigUtil.getConfig().iconPack;
    if (IconPack) {
      this._source = IconPack[value];
    } else {
      throw new Error(
        `Icon pack not configured! \n please install \`yarn add @cldcvr/flow-icon-free\` \n Set config as below \n 	
		\`import IconPack from "@cldcvr/flow-icon-free" \n;
		import { ConfigUtil } from "@cldcvr/flow-core" \n;
	   ConfigUtil.setConfig({ iconPack: IconPack });\``
      );
    }
  }

  readonly required = ["source"];

  render() {
    return html`${unsafeSVG(this.source)}`;
  }
}
