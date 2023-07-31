import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-tag.scss";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import { classMap } from "lit-html/directives/class-map.js";
import { validateHTMLColor, validateHTMLColorName } from "validate-color";
import getTextContrast from "../../utils/get-text-contrast";
import getCustomFillColor from "../../utils/get-custom-fill-color";
import LightenDarkenColor from "../../utils/get-lighten-darken-color";
import { FIcon } from "../f-icon/f-icon";
import { FCounter } from "../f-counter/f-counter";
import { flowElement } from "./../../utils";
import { FDiv } from "../f-div/f-div";

export type FTagStateProp =
	| "primary"
	| "neutral"
	| "success"
	| "warning"
	| "danger"
	| "inherit"
	| `custom, ${string}`;

/**
 * @summary Tags allow users to categorize the content. They can be used to add metadata to an element such as category, or property or show a status.
 */
@flowElement("f-tag")
export class FTag extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FIcon.styles, ...FCounter.styles];

	/**
	 * @attribute boolean for inherited class
	 */
	@state()
	tagSystemIcon = false;

	/**
	 * @attribute local state for managing custom fill.
	 */
	@state()
	fill = "";

	/**
	 * @attribute label property defines the text label on a tag. Label of a tag is always uppercase.
	 */
	@property({ type: String })
	label!: string;

	/**
	 * @attribute The medium size is the default and recommended option.
	 */
	@property({ reflect: true, type: String })
	size?: "large" | "medium" | "small" = "medium";

	/**
	 * @attribute The states on tags are to indicate various degrees of emphasis of the action.
	 */
	@property({ reflect: true, type: String })
	state?: FTagStateProp = "neutral";

	/**
	 * @attribute Icon-left enables an icon on the left of the label of a tag.
	 */
	@property({ reflect: true, type: String, attribute: "icon-left" })
	iconLeft?: string;

	/**
	 * @attribute Icon-right enables an icon on the right of the label of a tag.
	 */
	@property({ reflect: true, type: String, attribute: "icon-right" })
	iconRight?: string;

	/**
	 * @attribute Counter property enables a counter on the tag.
	 */
	@property({ reflect: true, type: Number })
	counter?: number;

	/**
	 * @attribute Loader icon replaces the content of the tag .
	 */
	@property({ reflect: true, type: Boolean })
	loading?: boolean = false;

	/**
	 * @attribute Loader icon replaces the content of the tag .
	 */
	@property({ reflect: true, type: Boolean })
	selected?: boolean = false;

	/**
	 * @attribute The disabled attribute can be set to keep a user from clicking on the tag.
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * @attribute is clickable
	 */
	@property({ type: Boolean })
	clickable?: boolean = false;

	@query(".text-content")
	fTagTextContent?: FDiv;

	@query(".f-tag")
	fTagElement?: FDiv;

	/**
	 * compute icon size based on tag size
	 */
	get iconSize() {
		if (this.size === "large") {
			return "small";
		} else if (this.size === "medium") {
			return "x-small";
		} else if (this.size === "small") {
			return "x-small";
		} else {
			return "medium";
		}
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
			if (this.selected) {
				return `background: ${this.fill}; border: 1px solid ${this.fill}; filter: brightness(60%); color: ${this.textColor}`;
			} else if (this.loading) {
				return `background-color: ${LightenDarkenColor(
					this.fill,
					-150
				)}; border: 1px solid ${LightenDarkenColor(this.fill, -150)}; color: transparent; fill: ${
					this.fill
				}`;
			} else {
				return `background: ${this.fill}; border: 1px solid ${this.fill}; color: ${this.textColor}`;
			}
		}
		return "";
	}

	/**
	 * validation for all atrributes
	 */
	validateProperties() {
		if (!this.label && !this.iconLeft) {
			throw new Error("f-tag : label OR icon-left is mandatory field");
		}
		if (
			this.state?.includes("custom") &&
			this.fill &&
			!validateHTMLColor(this.fill) &&
			!validateHTMLColorName(this.fill)
		) {
			throw new Error("f-tag : enter correct color-name or color-code");
		}
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
		 * classes to apply on icon , based on category
		 */
		const iconClasses: Record<string, boolean> = {
			"fill-button-surface": !this.fill ? true : false,
			"fill-button-surface-light":
				this.fill && getTextContrast(this.fill) === "light-text" ? true : false,
			"fill-button-surface-dark":
				this.fill && getTextContrast(this.fill) === "dark-text" ? true : false
		};

		// merging host classes
		this.classList.forEach(cl => {
			iconClasses[cl] = true;
			if (cl === "f-tag-system-icon") {
				this.tagSystemIcon = true;
			}
		});
		/**
		 * create iconLeft if available
		 */
		const iconLeft = this.iconLeft
			? html`<f-icon
					data-qa-icon-left=${this.iconLeft}
					.source=${this.iconLeft}
					.state=${this.state}
					class=${classMap({
						"left-icon": true,
						...iconClasses,
						"f-tag-system-icon": this.tagSystemIcon ? true : false,
						"system-icon-size": this.size === "small" ? true : false,
						"f-tag-small-emoji": this.size === "small" ? true : false
					})}
					.size=${this.iconSize}
					?clickable=${true}
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
					class=${classMap({
						"right-icon": true,
						...iconClasses,
						"f-tag-system-icon": this.tagSystemIcon ? true : false,
						"system-icon-size": this.size === "small" ? true : false,
						"f-tag-small-emoji": this.size === "small" ? true : false
					})}
					.size=${this.iconSize}
					?clickable=${true}
			  ></f-icon>`
			: "";

		/**
		 * create counter if available
		 */
		const counterClasses = {
			"fill-button-surface": !this.fill ? true : false,
			"fill-button-surface-light":
				this.fill && getTextContrast(this.fill) === "light-text" ? true : false,
			"fill-button-surface-dark":
				this.fill && getTextContrast(this.fill) === "dark-text" ? true : false
		};
		const counter =
			this.counter !== undefined
				? html`<f-counter
						data-qa-counter
						.state=${this.state}
						.size=${this.size}
						.label=${Number(this.counter)}
						class=${classMap(counterClasses)}
				  ></f-counter>`
				: "";
		/**
		 * render loading if required
		 */
		if (this.loading) {
			return html`<div
				data-qa-tag
				class=${classMap({
					"f-tag": true,
					hasShimmer,
					"custom-loader": this.fill ? true : false
				})}
				style=${this.applyStyles()}
				?label=${this.label ? true : false}
				size=${this.size}
				state=${this.state}
				?loading=${this.loading}
				?disabled=${this.disabled}
				?selected=${this.selected}
			>
				${unsafeSVG(loader)}${this.label}
			</div>`;
		}

		/**
		 * Final html to render
		 */
		return html`<div
			class=${classMap({
				"f-tag": true,
				hasShimmer,
				"custom-loader": this.fill ? true : false
			})}
			style=${this.applyStyles()}
			?label=${this.label ? true : false}
			size=${this.size}
			state=${this.state}
			?loading=${this.loading}
			?disabled=${this.disabled}
			?selected=${this.selected}
			?clickable=${this.clickable}
		>
			${iconLeft}
			<f-div class="text-content">${this.label}</f-div>
			${counter}${iconRight}
		</div>`;
	}

	protected async updated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
		super.updated(changedProperties);
		requestAnimationFrame(() => {
			const parentElement = this.parentElement;

			if (parentElement) {
				const parentWidth = parentElement.clientWidth;
				if (parentWidth < 100 && this.fTagTextContent) {
					if (this.fTagElement && this.label) {
						this.fTagElement.style.width = `${parentElement.clientWidth}px`;
						this.fTagTextContent.tooltip = this.label;
					}
				}
			}

			if (this.fTagTextContent && this.fTagTextContent?.offsetWidth >= 100) {
				this.fTagTextContent.tooltip = this.label;
			} else {
				this.fTagTextContent?.removeAttribute("tooltip");
			}
		});
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-tag": FTag;
	}
}
