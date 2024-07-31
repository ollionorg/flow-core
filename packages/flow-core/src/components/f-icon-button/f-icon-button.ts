import { html, PropertyValueMap, PropertyValues, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import eleStyle from "./f-icon-button.scss?inline";
import globalStyle from "./f-icon-button-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { classMap } from "lit-html/directives/class-map.js";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import { FIcon } from "../f-icon/f-icon";
import { FCounter } from "../f-counter/f-counter";
import { validateHTMLColorName } from "validate-color";
import { validateHTMLColor } from "validate-color";
import getTextContrast from "../../utils/get-text-contrast";
import getCustomFillColor from "../../utils/get-custom-fill-color";
import LightenDarkenColor from "../../utils/get-lighten-darken-color";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
import { ifDefined } from "lit/directives/if-defined.js";
injectCss("f-icon-button", globalStyle);

const variants = ["round", "curved", "block"] as const;
const categories = ["fill", "outline", "transparent", "packed"] as const;
const sizes = ["large", "medium", "small", "x-small"] as const;

export type FIconButtonVariant = (typeof variants)[number];
export type FIconButtonType = (typeof categories)[number];
export type FIconButtonSize = (typeof sizes)[number];
export type FIconButtonState =
	| "primary"
	| "danger"
	| "warning"
	| "success"
	| "neutral"
	| "inherit"
	| `custom, ${string}`;

@flowElement("f-icon-button")
export class FIconButton extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle), ...FIcon.styles];

	/**
	 * @attribute local state for managing custom fill.
	 */
	@state()
	fill = "";

	/**
	 * @attribute local state for managing input class.
	 */
	@state()
	iconInputClass = false;

	/**
	 * @attribute Icon property defines what icon will be displayed on the icon. It can take the icon name from a library , any inline SVG or any URL for the image.
	 */
	@property({ type: String })
	icon!: string;

	/**
	 * @attribute Variants are various representations of an icon button. For example an icon button can be round, curved or block.
	 */
	@property({ type: String })
	variant?: FIconButtonVariant = "round";
	/**
	 * @attribute Type of f-icon-button
	 */
	@property({ type: String })
	category?: FIconButtonType = "fill";

	/**
	 * @attribute Size of f-icon-button
	 */
	@property({ type: String, reflect: true })
	size?: FIconButtonSize = "medium";

	/**
	 * @attribute Size of f-icon-button
	 */
	@property({ type: String })
	state?: FIconButtonState = "primary";

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
	 * @attribute effect to apply
	 */
	@property({ reflect: true, type: String })
	effect?: "pulse" | "wiggle";

	/**
	 * icon element reference
	 */
	@query("f-icon")
	iconElement!: FIcon;

	/**
	 * icon element reference
	 */
	@query("f-counter")
	counterElement?: FCounter;

	/**
	 * compute counter size based on button size
	 */
	get counterSize() {
		if (this.size === "small") {
			return this.category === "packed" ? "small" : "medium";
		}
		if (this.size === "x-small") {
			return "small";
		}
		if (this.size === "large" && this.category === "packed") {
			return "medium";
		}
		if (this.size === "medium" && this.category === "packed") {
			return "small";
		}
		return this.size;
	}

	/**
	 * apply inline styles to shadow-dom for custom fill.
	 */
	applyStyles() {
		if (this.fill) {
			if (this.loading) {
				if (this.category === "fill") {
					if (this.variant !== "block") {
						return `background-color: ${LightenDarkenColor(
							this.fill,
							-150
						)}; border: 1px solid ${LightenDarkenColor(
							this.fill,
							-150
						)}; color: transparent; fill: ${this.fill}`;
					} else {
						return `background: transparent; border: none; fill: ${this.fill};`;
					}
				} else if (this.category === "outline") {
					return `background: transparent; border: 1px solid ${this.fill}; fill: ${this.fill};`;
				} else {
					return `background: transparent; border: none; fill: ${this.fill};`;
				}
			} else {
				if (this.category === "fill") {
					if (this.variant !== "block") {
						return `background: ${this.fill}; border: 1px solid ${this.fill};--custom-state-color:${this.fill}`;
					} else {
						return "background: transparent; border: none;--custom-state-color:${this.fill}";
					}
				} else if (this.category === "outline") {
					return `background: transparent; border: 1px solid ${this.fill};--custom-state-color:${this.fill}`;
				} else {
					return "background: transparent; border: none;--custom-state-color:${this.fill}";
				}
			}
		} else return "";
	}

	/**
	 * validation for all atrributes
	 */
	validateProperties() {
		if (
			this.state?.includes("custom") &&
			this.fill &&
			!validateHTMLColor(this.fill) &&
			!validateHTMLColorName(this.fill)
		) {
			throw new Error("f-icon-button : enter correct color-name or hex-color-code");
		}
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "button";
		this.tabIndex = 0;
		this.setAttribute("focusable", "");
		this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
	}

	render() {
		/**
		 * creating local fill variable out of state prop.
		 */
		this.fill = getCustomFillColor(this.state ?? "");

		/**
		 * validate
		 */
		this.validateProperties();

		const iconClasses = {
			"fill-button-surface":
				this.category === "fill" && this.variant !== "block" && !this.fill ? true : false,
			"fill-button-surface-light":
				this.fill &&
				this.category === "fill" &&
				this.variant !== "block" &&
				getTextContrast(this.fill) === "light-text"
					? true
					: false,
			"fill-button-surface-dark":
				this.fill &&
				this.category === "fill" &&
				this.variant !== "block" &&
				getTextContrast(this.fill) === "dark-text"
					? true
					: false
		};
		/**
		 * create counter if available
		 */
		const counterClasses = {
			"absolute-counter": true,
			"outline-counter": this.category === "fill" ? true : false,
			[`packed-${this.size}`]: this.category === "packed" ? true : false,
			[`size-${this.size}`]: true,
			"fill-outline-counter": this.category === "fill" && this.fill ? true : false
		};
		const counter =
			this.counter && !(this.category === "packed" && this.size === "x-small")
				? html`<f-counter
						.state=${this.state}
						.size=${this.counterSize}
						.label=${this.counter}
						class=${classMap(counterClasses)}
				  ></f-counter>`
				: "";

		// classes to apply on inner element
		const classes: Record<string, boolean> = {
			"f-icon-button": true,
			"custom-loader": this.fill ? true : false,
			"custom-hover":
				this.fill && this.category === "fill" && this.variant !== "block" ? true : false
		};
		// merging host classes
		this.classList.forEach(cl => {
			classes[cl] = true;
			if (cl === "f-input-duplicate") {
				this.iconInputClass = true;
			}
		});

		return html`<span
			part="f-icon-button-wrapper"
			class=${classMap(classes)}
			style=${this.applyStyles()}
			variant=${ifDefined(this.variant)}
			category=${ifDefined(this.category)}
			size=${ifDefined(this.size)}
			state=${ifDefined(this.state)}
			effect="${ifDefined(this.effect)}"
			?counter=${this.counter}
			?disabled=${this.disabled}
			?loading=${this.loading}
			label="Icon-${this.icon}"
			aria-label="Icon-${this.icon}"
			data-qa-id=${ifDefined(this.getAttribute("data-qa-element-id")) ?? ""}
		>
			${this.loading ? unsafeSVG(loader) : ""}
			<f-icon
				data-qa-icon=${this.icon}
				.source=${this.icon}
				.state=${this.state}
				.size=${this.size}
				class=${classMap({
					...iconClasses,
					"fill-button-surface-input": this.iconInputClass ? true : false
				})}
				?clickable=${this.variant === "block"}
			></f-icon
			>${counter}
		</span>`;
	}

	protected updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);
		/**
		 * Force update child element
		 */
		this.iconElement.requestUpdate();
		this.counterElement?.requestUpdate();
		if (!this.getAttribute("aria-label")) this.setAttribute("aria-label", this.icon);
		if (!this.getAttribute("title")) this.setAttribute("title", this.icon);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"f-icon-button": FIconButton;
	}
}
