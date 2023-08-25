import { html, PropertyValues, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-button.scss";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import { classMap } from "lit-html/directives/class-map.js";
import LightenDarkenColor from "../../utils/get-lighten-darken-color";
import { validateHTMLColor } from "validate-color";
import { validateHTMLColorName } from "validate-color";
import getCustomFillColor from "../../utils/get-custom-fill-color";
import getTextContrast from "../../utils/get-text-contrast";
import { FIcon } from "../f-icon/f-icon";
import { FCounter } from "../f-counter/f-counter";
import { flowElement } from "./../../utils";

export type FButtonState =
	| "primary"
	| "neutral"
	| "success"
	| "warning"
	| "danger"
	| "inherit"
	| `custom, ${string}`;

/**
 * @summary Buttons allow users to perform an action or to initiate a new function.
 */
@flowElement("f-button")
export class FButton extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FIcon.styles, ...FCounter.styles];

	/**
	 * @attribute local state for managing custom fill.
	 */
	@state()
	fill = "";

	/**
	 * @attribute label property defines the text label on a button. Label of a button is always uppercase.
	 */
	@property({ type: String })
	label!: string;

	/**
	 * @attribute category of button
	 */
	@property({ reflect: true, type: String })
	category?: "fill" | "outline" | "transparent" = "fill";

	/**
	 * @attribute The medium size is the default and recommended option.
	 */
	@property({ reflect: true, type: String })
	size?: "large" | "medium" | "small" | "x-small" = "medium";

	/**
	 * @attribute The states on buttons are to indicate various degrees of emphasis of the action.
	 */
	@property({ reflect: true, type: String })
	state?: FButtonState = "primary";

	/**
	 * @attribute variant of button.
	 */
	@property({ reflect: true, type: String })
	variant?: "round" | "curved" | "block" = "round";

	/**
	 * @attribute Icon-left enables an icon on the left of the label of a button.
	 */
	@property({ reflect: true, type: String, attribute: "icon-left" })
	iconLeft?: string;

	/**
	 * @attribute Icon-right enables an icon on the right of the label of a button.
	 */
	@property({ reflect: true, type: String, attribute: "icon-right" })
	iconRight?: string;

	/**
	 * @attribute Counter property enables a counter on the button.
	 */
	@property({ reflect: true, type: Number })
	counter?: string;

	/**
	 * @attribute Loader icon replaces the content of the button .
	 */
	@property({ reflect: true, type: Boolean })
	loading?: boolean = false;

	/**
	 * @attribute The disabled attribute can be set to keep a user from clicking on the button.
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * @attribute Set true if want to wrap content if there is no space in button
	 */
	@property({ reflect: true, type: Boolean, attribute: "label-wrap" })
	labelWrap?: boolean = false;

	/**
	 * icon element reference
	 */
	@query("f-icon")
	iconElement!: FIcon;

	/**
	 * counter element reference
	 */
	@query("f-counter")
	counterElement?: FCounter;

	/**
	 * compute counter size based on button size
	 */
	get counterSize() {
		if (this.size === "small") {
			return "medium";
		}
		if (this.size === "x-small") {
			return "small";
		}
		return this.size;
	}

	/**
	 * compute textColor when custom color of tag is defined.
	 */
	get textColor() {
		return getTextContrast(this.fill) === "dark-text" ? "#202a36" : "#fcfcfd";
	}

	/**
	 * mention required fields here for generating vue types
	 */
	readonly required = ["label"];

	/**
	 * validation for all atrributes
	 */
	validateProperties() {
		if (!this.label) {
			throw new Error("f-button : label is mandatory field");
		}
		if (
			this.state?.includes("custom") &&
			this.fill &&
			!validateHTMLColor(this.fill) &&
			!validateHTMLColorName(this.fill)
		) {
			throw new Error("f-button : enter correct color-name or hex-color-code");
		}
	}

	/**
	 * apply inline styles to shadow-dom for custom fill.
	 */
	applyStyles() {
		if (this.fill) {
			if (this.loading) {
				if (this.category === "fill") {
					return `background-color: ${LightenDarkenColor(
						this.fill,
						-150
					)}; border: 1px solid ${LightenDarkenColor(this.fill, -150)}; color: transparent; fill: ${
						this.fill
					}`;
				} else if (this.category === "outline") {
					return `background: transparent; border: 1px solid ${this.fill}; fill: ${this.fill};`;
				} else {
					return `background: transparent; border: none; fill: ${this.fill};`;
				}
			} else {
				if (this.category === "fill") {
					return `background: ${this.fill}; border: 1px solid ${this.fill}; color: ${this.textColor}`;
				} else if (this.category === "outline") {
					return `background: transparent; border: 1px solid ${this.fill}; color: ${this.fill}`;
				} else {
					return `background: transparent; border: none; color: ${this.fill}`;
				}
			}
		} else return "";
	}

	render() {
		/**
		 * creating local fill variable out of state prop.
		 */
		this.fill = getCustomFillColor(this.state ?? "");
		/**
		 * checks if host element's `:before` has shimmer by accessing  computedstyles
		 */
		const hasShimmer = (getComputedStyle(this, "::before") as any)["animation-name"] === "shimmer";

		/**
		 * if hasShimmer true then add class
		 */
		if (hasShimmer) {
			this.classList.add("hasShimmer");
		}
		/**
		 * validate properties before render
		 */
		this.validateProperties();
		/**
		 * classes to apply on icon , based on category
		 */
		// const iconClasses = {
		//   "fill-button-surface": this.category === "fill",
		// };
		const iconClasses = {
			"fill-button-surface": this.category === "fill" && !this.fill ? true : false,
			"fill-button-surface-light":
				this.fill && this.category === "fill" && getTextContrast(this.fill) === "light-text"
					? true
					: false,
			"fill-button-surface-dark":
				this.fill && this.category === "fill" && getTextContrast(this.fill) === "dark-text"
					? true
					: false
		};
		/**
		 * create iconLeft if available
		 */
		const iconLeft = this.iconLeft
			? html`<f-icon
					data-qa-icon-left=${this.iconLeft}
					.source=${this.iconLeft}
					.state=${this.state}
					class=${classMap({ "left-icon": true, ...iconClasses })}
					.size=${this.size}
					clickable
			  ></f-icon>`
			: "";
		/**
		 * create iconRight if available
		 */
		const iconRight = this.iconRight
			? html`<f-icon
					data-qa-icon-right=${this.iconRight}
					.source=${this.iconRight}
					.state=${this.state}
					class=${classMap({ "right-icon": true, ...iconClasses })}
					.size=${this.size}
					clickable
			  ></f-icon>`
			: "";

		/**
		 * create counter if available
		 */
		const counterClasses = {
			"fill-button-surface": !this.fill && this.category === "fill" ? true : false,
			"fill-button-surface-light":
				this.category === "fill" && this.fill && getTextContrast(this.fill) === "light-text"
					? true
					: false,
			"fill-button-surface-dark":
				this.category === "fill" && this.fill && getTextContrast(this.fill) === "dark-text"
					? true
					: false
		};
		const counter = this.counter
			? html`<f-counter
					data-qa-counter=${this.counter}
					.state=${this.state}
					.size=${this.counterSize}
					.label=${this.counter}
					class=${classMap(counterClasses)}
			  ></f-counter>`
			: "";
		/**
		 * render loading if required
		 */
		if (this.loading) {
			return html`<button
				class=${classMap({
					"f-button": true,
					hasShimmer,
					"custom-loader": this.fill ? true : false,
					"custom-hover": this.fill && this.category === "fill" ? true : false
				})}
				style=${this.applyStyles()}
				category=${this.category}
				size=${this.size}
				state=${this.state}
				variant=${this.variant}
				?loading=${this.loading}
				?disabled=${this.disabled}
				data-qa-id=${this.getAttribute("data-qa-element-id")}
			>
				${unsafeSVG(loader)}${this.label}
			</button>`;
		}

		/**
		 * Final html to render
		 */
		return html`<button
			class=${classMap({
				"f-button": true,
				hasShimmer,
				"custom-loader": this.fill ? true : false,
				"custom-hover": this.fill && this.category === "fill" ? true : false
			})}
			style=${this.applyStyles()}
			category=${this.category}
			size=${this.size}
			state=${this.state}
			variant=${this.variant}
			?loading=${this.loading}
			?disabled=${this.disabled}
			data-qa-id=${this.getAttribute("data-qa-element-id")}
		>
			${iconLeft}${this.label}${iconRight}${counter}
		</button>`;
	}

	protected updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);
		/**
		 * Force update child element
		 */
		this.iconElement?.requestUpdate();
		this.counterElement?.requestUpdate();
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-button": FButton;
	}
}
