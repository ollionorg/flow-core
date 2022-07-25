import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-icon.scss";
import { FElement } from "./../../shared/f-element";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import iconPack from "./../../../../flow-icon-free/dist/types";

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
  })
  get source() {
    return this._source;
  }
  set source(value) {
    this._source = iconPack[value];
  }

  render() {
    return html`${unsafeSVG(this.source)}`;
  }
}
