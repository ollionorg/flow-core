import { html, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-tag.scss?inline";
import globalStyle from "./f-tag-global.scss?inline";
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
import { createRef, ref, Ref } from "lit/directives/ref.js";
import type { FDiv } from "../f-div/f-div";
import { injectCss } from "@nonfx/flow-core-config";
import { ifDefined } from "lit/directives/if-defined.js";
import { keyed } from "lit/directives/keyed.js";

injectCss("f-tag", globalStyle);

export type FTagStateProp =
	| "primary"
	| "neutral"
	| "success"
	| "warning"
	| "danger"
	| "inherit"
	| `custom, ${string}`;

export type FTagCategory = "fill" | "outline";

/**
 * @summary Tags allow users to categorize the content. They can be used to add metadata to an element such as category, or property or show a status.
 */
@flowElement("f-tag")
export class FTag extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FIcon.styles,
		...FCounter.styles
	];

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
	 * @attribute category defined background and border
	 */
	@property({ reflect: true, type: String })
	category?: FTagCategory = "fill";

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

	/**
	 * @attribute is clickable
	 */
	@property({ type: String, reflect: true, attribute: "max-width" })
	maxWidth: string = "240px";

	labelDiv: Ref<FDiv> = createRef();

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
		if (this.category === "fill") {
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
		} else {
			if (this.fill) {
				if (this.selected) {
					return `background: transparent; border: 1px solid ${this.fill}; filter: brightness(60%); color: ${this.fill}`;
				} else if (this.loading) {
					return `background-color: transparent; border: 1px solid ${LightenDarkenColor(
						this.fill,
						-150
					)}; color: transparent; fill: ${this.fill}`;
				} else {
					return `background: transparent; border: 1px solid ${this.fill}; color: ${this.fill}`;
				}
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
	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		/**
		 * creating local fill variable out of state prop.
		 */

		this.fill = getCustomFillColor(this.state ?? "");
		super.willUpdate(changedProperties);
	}

	render() {
		/**
		 * validate
		 */
		this.validateProperties();

		let iconClasses: Record<string, boolean> = {};
		/**
		 * classes to apply on icon , based on category
		 */
		if (this.category === "fill") {
			iconClasses = {
				"fill-button-surface": !this.fill ? true : false,
				"fill-button-surface-light":
					this.fill && getTextContrast(this.fill) === "light-text" ? true : false,
				"fill-button-surface-dark":
					this.fill && getTextContrast(this.fill) === "dark-text" ? true : false
			};
		}

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
			: nothing;
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
			: nothing;

		let counterClasses = {};
		/**
		 * create counter if available
		 */
		if (this.category === "fill") {
			counterClasses = {
				"fill-button-surface": !this.fill ? true : false,
				"fill-button-surface-light":
					this.fill && getTextContrast(this.fill) === "light-text" ? true : false,
				"fill-button-surface-dark":
					this.fill && getTextContrast(this.fill) === "dark-text" ? true : false
			};
		}
		const counter =
			this.counter !== undefined
				? html`<f-counter
						.category=${this.category === "outline" ? "transparent" : "fill"}
						data-qa-counter
						.state=${this.state}
						.size=${this.size}
						.label=${Number(this.counter)}
						class=${classMap(counterClasses)}
				  ></f-counter>`
				: nothing;
		/**
		 * render loading if required
		 */
		if (this.loading) {
			return html`<div
				data-qa-tag
				class=${classMap({
					"f-tag": true,
					"custom-loader": this.fill ? true : false
				})}
				style=${this.applyStyles()}
				?label=${this.label ? true : false}
				size=${ifDefined(this.size)}
				state=${ifDefined(this.state)}
				category=${ifDefined(this.category)}
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
		return keyed(
			this.category,
			html`<div
				class=${classMap({
					"f-tag": true,
					"custom-loader": this.fill ? true : false
				})}
				style=${this.applyStyles()}
				?label=${this.label ? true : false}
				size=${ifDefined(this.size)}
				state=${ifDefined(this.state)}
				category=${ifDefined(this.category)}
				?loading=${this.loading}
				?disabled=${this.disabled}
				?selected=${this.selected}
				?clickable=${this.clickable}
			>
				${iconLeft}
				<f-div class="text-content" style="max-width:${this.maxWidth}" ${ref(this.labelDiv)}
					>${this.label}</f-div
				>
				${counter}${iconRight}
			</div>`
		);
	}
	protected async updated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
		super.updated(changedProperties);
		await this.updateComplete;
		if (this.labelDiv.value) {
			const isEllipsis = this.labelDiv.value.offsetWidth < this.labelDiv.value.scrollWidth;
			if (isEllipsis) {
				this.labelDiv.value.tooltip = this.label;
			} else {
				this.labelDiv.value.tooltip = undefined;
			}
		}
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
