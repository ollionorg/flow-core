import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query } from "lit/decorators.js";
import eleStyle from "./f-pictogram.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { ConfigUtil } from "@cldcvr/flow-core-config";
import { getTextContrast, isValidHttpUrl } from "./../../utils";
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

	@query(".f-pictogram")
	fPicorgramWrapper!: HTMLDivElement;

	/**
	 * @attribute The hover attribute to change background on hovering on pictogram.
	 */
	@property({ reflect: true, type: Boolean })
	clickable?: boolean = false;

	@property({ reflect: true, type: Boolean, attribute: "auto-bg" })
	autoBg = false;

	colors = [
		"#FFB900",
		"#D83B01",
		"#B50E0E",
		"#E81123",
		"#B4009E",
		"#5C2D91",
		"#0078D7",
		"#00B4FF",
		"#008272",
		"#107C10"
	];

	get getLetters() {
		const acronym = this.source
			.split(/\s/)
			.reduce((response, word) => (response += word.slice(0, 1)), "");
		return acronym?.toUpperCase()?.slice(0, 2);
	}

	capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	get textSource() {
		const sourceLength = this.source.split(" ").length;
		if (sourceLength <= 1) {
			return this.capitalizeFirstLetter(this.source?.slice(0, 2));
		} else {
			return this.getLetters;
		}
	}

	hslToHex(h: number, s: number, l: number) {
		l /= 100;
		const a = (s * Math.min(l, 1 - l)) / 100;
		const f = (n: number) => {
			const k = (n + h / 30) % 12;
			const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
			return Math.round(255 * color)
				.toString(16)
				.padStart(2, "0"); // convert to Hex and prefix "0" if needed
		};
		return `#${f(0)}${f(8)}${f(4)}`;
	}

	get textColor() {
		if (!this.hashCode(this.source).includes("#")) {
			const hsla = this.hashCode(this.source)
				.replace("hsla", "")
				.replace(/[\(\)]/g, "")
				.split("%")
				.join("")
				.split(",");

			const hex = this.hslToHex(Number(hsla[0]), Number(hsla[1]), Number(hsla[2]));
			return getTextContrast(hex) === "dark-text" ? "#202a36" : "#fcfcfd";
		} else {
			return getTextContrast(this.hashCode(this.source)) === "dark-text" ? "#202a36" : "#fcfcfd";
		}
	}

	get textColorStyling() {
		if (this.autoBg) {
			return `color:${this.textColor} !important`;
		}
		return "";
	}

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
		return `<p class="text-styling" style=${this.textColorStyling}>${this.textSource}</p>`;
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

	hashCode(str: string) {
		let sum = 0;
		for (let i = 0; i < str.length; i++) {
			sum += str.charCodeAt(i);
		}
		return this.colors[sum % this.colors.length];
	}

	stringReplaceAtIndex(str: string, index: number, chr: number) {
		if (index > str.length - 1) return str;
		return str.substring(0, index) + chr + str.substring(index + 1);
	}

	hashCodeHover(str: string) {
		let sum = 0;
		for (let i = 0; i < str.length; i++) {
			sum += str.charCodeAt(i);
		}
		const color = this.colors[sum % this.colors.length];
		return this.stringReplaceAtIndex(color, color.length - 2, 0.7);
	}

	generateHslaColors(saturation: number, lightness: number, alpha: number, amount: number) {
		const colors = [];
		const huedelta = Math.trunc(360 / amount);

		for (let i = 0; i < amount; i++) {
			const hue = i * huedelta;
			colors.push(`hsla(${hue},${saturation}%,${lightness}%,${alpha})`);
		}
		return colors;
	}

	validateProperties() {
		if (!this.source) {
			throw new Error("f-pictogram : source is mandatory field");
		}
	}

	render() {
		this.colors = this.generateHslaColors(50, 60, 1.0, 10);
		this.validateProperties();
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
				?auto-bg=${this.autoBg}
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
	protected async updated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
		super.updated(changedProperties);
		if (this.fPicorgramWrapper && this.autoBg) {
			// Modify the background-color property
			this.fPicorgramWrapper.style.setProperty(
				"--after-background-color",
				this.hashCode(this.source)
			);
			this.fPicorgramWrapper.style.setProperty(
				"--after-background-color-hover",
				this.hashCodeHover(this.source)
			);
			this.fPicorgramWrapper.style.setProperty(
				"--before-background-color",
				this.hashCode(this.source)
			);
		} else {
			this.fPicorgramWrapper.style.setProperty(
				"--after-background-color",
				"var(--color-neutral-subtle)"
			);
			this.fPicorgramWrapper.style.setProperty(
				"--after-background-color-hover",
				"var(--color-neutral-subtle-hover)"
			);
			this.fPicorgramWrapper.style.setProperty("--before-background-color", "");
		}
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
