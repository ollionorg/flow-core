import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import eleStyle from "./f-counter.scss?inline";
import globalStyle from "./f-counter-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import { classMap } from "lit-html/directives/class-map.js";
import getTextContrast from "../../utils/get-text-contrast";
import getCustomFillColor from "../../utils/get-custom-fill-color";
import { validateHTMLColor } from "validate-color";
import { validateHTMLColorName } from "validate-color";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
import { ifDefined } from "lit/directives/if-defined.js";

injectCss("f-counter", globalStyle);

export type FCounterStateProp =
	| "primary"
	| "success"
	| "warning"
	| "danger"
	| "neutral"
	| "inherit"
	| `custom, ${string}`;

@flowElement("f-counter")
export class FCounter extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle)];

	/**
	 * @attribute local state for managing custom fill.
	 */
	@state()
	fill = "";

	/**
	 * @attribute category of COUNTER
	 */
	@property({ reflect: true, type: String })
	category?: "fill" | "outline" | "transparent" = "fill";

	/**
	 * @attribute A counter label denotes the numeric count of the entity associated with it
	 */
	@property({ type: Number })
	label!: number;

	/**
	 * @attribute The medium size is the default.
	 */
	@property({ type: String })
	size?: "large" | "medium" | "small" = "medium";

	/**
	 * @attribute The state of a counter helps in indicating the degree of emphasis of the parent component. The counter component inherits the state from the parent component. By default it is subtle.
	 */
	@property({ type: String })
	state?: FCounterStateProp = "neutral";

	/**
	 * @attribute Loader icon replaces the content of the counter .
	 */
	@property({ type: Boolean })
	loading?: boolean = false;

	/**
	 * @attribute The disabled attribute can be set to keep a user from clicking on the counter.
	 */
	@property({ type: Boolean })
	disabled?: boolean = false;

	/**
	 * mention required fields here
	 */
	readonly required = ["label"];

	validateProperties() {
		if (this.label === undefined) {
			throw new Error("f-counter : label is mandatory field");
		}
		if (
			this.state?.includes("custom") &&
			this.fill &&
			!validateHTMLColor(this.fill) &&
			!validateHTMLColorName(this.fill)
		) {
			throw new Error("f-counter : enter correct color-name or hex-color-code");
		}
	}
	// this will abbreviate long labels to short
	get computedLabel() {
		if (this.label < 10) {
			return `0${this.label}`;
		} else if (this.label >= 10 && this.label < 1000) {
			return this.label;
		} else if (this.label >= 1000 && this.label < 10000) {
			return this.abbrNum(this.label, 1);
		} else if (this.label >= 10000 && this.label < 1000000) {
			return this.abbrNum(this.label, 0);
		} else if (this.label >= 1000000 && this.label < 10000000) {
			return this.abbrNum(this.label, 1);
		} else {
			return this.abbrNum(this.label, 0);
		}
	}

	abbrNum(number: number, decPlaces: number) {
		decPlaces = Math.pow(10, decPlaces);
		let fixedNumber = "";
		const abbrev = ["K", "M", "B", "T"];
		for (let i = abbrev.length - 1; i >= 0; i--) {
			const size = Math.pow(10, (i + 1) * 3);
			if (size <= number) {
				number = Math.round((number * decPlaces) / size) / decPlaces;
				if (number == 1000 && i < abbrev.length - 1) {
					number = 1;
					i++;
				}
				fixedNumber = String(number);
				fixedNumber += abbrev[i];
				break;
			}
		}

		return fixedNumber;
	}

	/**
	 * compute textColor when custom color of tag is defined.
	 */
	get textColor() {
		return getTextContrast(this.fill) === "dark-text" ? "#202a36" : "#fcfcfd";
	}

	/**
	 * compute loaderColor when custom color of tag is defined.
	 */
	get loaderColor() {
		return getTextContrast(this.fill) === "dark-text" ? "#202a36" : "#808080";
	}

	/**
	 * apply inline styles to shadow-dom for custom fill.
	 */
	applyStyles() {
		if (this.fill) {
			if (this.loading) {
				return `background-color: var(--color-primary-surface)`;
			} else {
				if (this.category === "fill") {
					return `background: ${this.fill}; color: ${this.textColor};`;
				} else if (this.category === "outline") {
					return `background: transparent; color: ${this.fill}; border: 1px solid ${this.fill}`;
				} else {
					return `background:transparent; color: ${this.fill}`;
				}
			}
		}
		return "";
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "mark";
	}

	render() {
		/**
		 * creating local fill variable out of state prop.
		 */
		this.fill = getCustomFillColor(this.state ?? "");
		// validate props/attributes and throws errors if required
		this.validateProperties();
		// classes to apply on inner element
		const classes: Record<string, boolean> = {
			"f-counter": true
		};
		// merging host classes
		this.classList.forEach(cl => {
			classes[cl] = true;
		});

		/**
		 * Final html to render
		 */
		return html`<div
			class=${classMap(classes)}
			style=${this.applyStyles()}
			size=${ifDefined(this.size)}
			state=${ifDefined(this.state)}
			category=${ifDefined(this.category)}
			?loading=${this.loading}
			?disabled=${this.disabled}
		>
			${this.loading ? html`${unsafeSVG(loader)}` : html`${this.computedLabel}`}
		</div>`;
	}
}
/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-counter": FCounter;
	}
}
