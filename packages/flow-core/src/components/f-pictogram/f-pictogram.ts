import { html, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import eleStyle from "./f-pictogram.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { ConfigUtil } from "./../../modules/config";
import { isValidHttpUrl } from "./../../utils";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { classMap } from "lit-html/directives/class-map.js";
import { FIcon } from "../f-icon/f-icon";
import { flowElement } from "./../../utils";

const variants = ["circle", "square", "hexagon", "squircle"] as const;
const sizes = ["x-large", "large", "medium", "small"] as const;
const states = ["primary", "danger", "warning", "success", "default", "inherit"] as const;

export type FPictogramVariant = (typeof variants)[number];
export type FPictogramSize = (typeof sizes)[number];
export type FPictogramState = (typeof states)[number];

@flowElement("f-pictogram")
export class FPictogram extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FIcon.styles];

	/**
	 * @attribute Variants are various representations of Pictogram. For example Pictogram can be round, curved, square, or hexagon.
	 */
	@property({ type: String, reflect: true })
	variant?: FPictogramVariant = "squircle";

	/**
	 * @attribute source for f-pictogram, source could be icon name, url, raw SVG, text, emoji etc.
	 */
	@property({ type: String, reflect: true })
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
	clickable?: boolean = false;

	// returns html where source is being as input
	get renderedHtml() {
		const emojiRegex = /\p{Extended_Pictographic}/u;
		if (isValidHttpUrl(this.source)) {
			return `<img src="${this.source}" />`;
		} else if (emojiRegex.test(this.source)) {
			return `<f-icon class="${"f-pictogram-" + this.size + "-emoji"}" source="${
				this.source
			}" size="${this.sourceSize()}"></f-icon>`;
		} else {
			const IconPack = ConfigUtil.getConfig().iconPack;
			if (IconPack) {
				const svg = IconPack[this.source];
				if (svg) {
					return `<f-icon  class="${"f-pictogram-" + this.size}" source="${
						this.source
					}" size="${this.sourceSize()}"></f-icon>`;
				}
			}
		}
		return `<p class="text-styling">${this.source?.slice(0, 2)}</p>`;
	}
	// calculating computed source size according to the user input size
	sourceSize() {
		if (this.size === "x-large") {
			return "medium";
		} else if (this.size === "large") {
			return "small";
		} else if (this.size === "medium") {
			return "x-small";
		} else {
			return "x-small";
		}
	}

	render() {
		const hasShimmer = (getComputedStyle(this, "::before") as any)["animation-name"] === "shimmer";

		if (hasShimmer) {
			this.classList.add("hasShimmer");
		}

		/**
		 * Final html to render
		 */
		return html`
			<div
				class=${classMap({ "f-pictogram": true, hasShimmer })}
				variant=${this.variant}
				state=${this.state}
				size=${this.size}
				?disabled=${this.disabled}
				?loading=${this.loading}
				?clickable=${this.clickable}
			>
				${unsafeHTML(this.renderedHtml)}
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

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-pictogram": FPictogram;
	}
}
