import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-pictogram.scss";
import { FElement } from "../../mixins/components/f-element/f-element";
import { ConfigUtil } from "./../../modules/config";
import { isValidHttpUrl } from "./../../utils";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

const variants = ["circle", "square", "hexagon", "squircle"] as const;
const sizes = ["x-large", "large", "medium", "small"] as const;
const states = ["primary", "danger", "warning", "success", "default"] as const;

export type FPictogramVariant = typeof variants[number];
export type FPictogramSize = typeof sizes[number];
export type FPictogramState = typeof states[number];

@customElement("f-pictogram")
export class FPictogram extends FElement {
  /**
   * css loaded from scss file
   */
  static styles = [unsafeCSS(eleStyle)];
  /**
   * @attribute Variants are various representations of Pictogram. For example Pictogram can be round, curved, square, or hexagon.
   */
  @property({ type: String, reflect: true })
  variant?: FPictogramVariant = "squircle";

  /**
   * @attribute source for f-pictogram, source could be icon name, url, raw SVG, text, emoji etc.
   */
  @property({ type: String })
  source!: string;

  /**
   * @attribute Size of f-pictogram
   */
  @property({ type: String, reflect: true })
  size?: FPictogramSize = "large";

  /**
   * @attribute State Border colorm for f-pictogram.
   */
  @property({ type: String, reflect: true })
  state?: FPictogramState = "default";

  /**
   * @attribute Loader .
   */
  @property({ reflect: true, type: Boolean })
  loading?: boolean = false;

  /**
   * @attribute The disabled attribute can be set to keep a user from clicking on the Pictogram.
   */
  @property({ reflect: true, type: Boolean })
  disabled?: boolean = false;

  /**
   * @attribute The hover attribute to change background on hovering on pictogram.
   */
  @property({ reflect: true, type: Boolean })
  hover?: boolean = false;

  get sourceSize() {
    if (this.size === "x-large") {
      return "large";
    } else if (this.size === "large") {
      return "medium";
    } else if (this.size === "medium") {
      return "small";
    } else {
      return "x-small";
    }
  }

  get sourceValue() {
    const emojiRegex = /\p{Extended_Pictographic}/u;
    const textRegex = /^([a-zA-Z0-9\u0600-\u06FF\u0660-\u0669\u06F0-\u06F9 _.-]+)$/;
    let _source;
    if (isValidHttpUrl(this.source)) {
      _source = `<img src="${this.source}" />`;
    } else if (emojiRegex.test(this.source)) {
      _source = `<f-icon source=${this.source} size=${this.sourceSize}></f-icon>`;
    } else {
      const IconPack = ConfigUtil.getConfig().iconPack;
      if (IconPack) {
        const svg = IconPack[this.source];
        if (svg) {
          _source = `<f-icon source="${this.source}" size=${this.sourceSize}></f-icon>`;
        } else {
          if (textRegex.test(this.source)) {
            _source = `<p class="text-styling">${this.source?.slice(0, 2)}</p>`;
          } else {
            _source = `<div class="svg-styling">${this.source}</div>`;
          }
        }
      }
    }
    return _source;
  }

  render() {
    return html`
      <div
        class="f-pictogram"
        variant=${this.variant}
        state=${this.state}
        size=${this.size}
        ?disabled=${this.disabled}
        ?loading=${this.loading}
        ?hover=${this.hover}
      >
        ${unsafeHTML(this.sourceValue)}
        ${this.variant === "squircle"
          ? html`<svg width="0" height="0">
              <defs>
                <clipPath id="squircle" clipPathUnits="objectBoundingBox">
                  <path
                    d="M .5,0 C .1,0 0,.1 0,.5 0,.9 .1,1 .5,1 .9,1 1,.9 1,.5 1,.1 .9,0 .5,0 Z"
                  />
                </clipPath>
              </defs>
            </svg>`
          : null}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "f-pictogram": FPictogram;
  }
}
