import {
	html,
	HTMLTemplateResult,
	nothing,
	PropertyValueMap,
	PropertyValues,
	unsafeCSS
} from "lit";
import { property, query, state } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-button.scss?inline";
import globalStyle from "./f-button-global.scss?inline";
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
import { injectCss } from "@nonfx/flow-core-config";
import { ifDefined } from "lit/directives/if-defined.js";
import { FPopover } from "../f-popover/f-popover";
import { FDiv } from "../f-div/f-div";
import { FText } from "../f-text/f-text";

export type FButtonState =
	| "primary"
	| "neutral"
	| "success"
	| "warning"
	| "danger"
	| "inherit"
	| `custom, ${string}`;

injectCss("f-button", globalStyle);

export type FButtonAction = string | (() => HTMLTemplateResult);
export type FButtonActions = FButtonAction[];

/**
 * @summary Buttons allow users to perform an action or to initiate a new function.
 */
@flowElement("f-button")
export class FButton extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FIcon.styles,
		...FCounter.styles,
		...FDiv.styles,
		...FPopover.styles,
		...FText.styles
	];

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
	category?: "fill" | "outline" | "transparent" | "packed" = "fill";

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
	 * @attribute actions are used to display if single button can do multiple actions
	 */
	@property({ reflect: false, type: Array })
	actions?: FButtonActions = [];

	/**
	 * @attribute to show which action is currently selected
	 */
	@property({ reflect: true, type: String, attribute: "selected-action" })
	selectedAction?: FButtonAction;

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
	 * icon element reference
	 */
	@query("#f-button-actions")
	buttonActionsPopover?: FPopover;

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

	get iconSize() {
		const sizeMap = { large: "medium", medium: "small", small: "x-small", "x-small": "x-small" };
		return sizeMap[this.size ?? "medium"];
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

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "button";
		this.tabIndex = 0;
		this.setAttribute("focusable", "");
		this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
	}

	get hasActions() {
		return this.actions && this.actions.length > 0;
	}

	render() {
		/**
		 * creating local fill variable out of state prop.
		 */
		this.fill = getCustomFillColor(this.state ?? "");

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
					.size=${this.iconSize}
					clickable
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
					class=${classMap({ "right-icon": true, ...iconClasses })}
					.size=${this.iconSize}
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
			: nothing;
		/**
		 * render loading if required
		 */
		if (this.loading) {
			return html`<button
				part="f-button-wrapper"
				class=${classMap({
					"f-button": true,
					"custom-loader": this.fill ? true : false,
					"custom-hover": this.fill && this.category === "fill" ? true : false
				})}
				style=${this.applyStyles()}
				category=${ifDefined(this.category)}
				size=${ifDefined(this.size)}
				state=${ifDefined(this.state)}
				variant=${ifDefined(this.variant)}
				?loading=${this.loading}
				?disabled=${this.disabled}
				data-qa-id=${ifDefined(this.getAttribute("data-qa-element-id")) ?? ""}
			>
				${unsafeSVG(loader)}${this.label}
			</button>`;
		}

		/**
		 * Final html to render
		 */
		return html`<span
				part="f-button-wrapper"
				class=${classMap({
					"f-button": true,
					"custom-loader": this.fill ? true : false,
					"custom-hover": this.fill && this.category === "fill" ? true : false,
					"has-options": this.hasActions ? true : false
				})}
				style=${this.applyStyles()}
				category=${ifDefined(this.category)}
				size=${ifDefined(this.size)}
				state=${ifDefined(this.state)}
				variant=${ifDefined(this.variant)}
				?loading=${this.loading}
				?disabled=${this.disabled}
				data-qa-id=${ifDefined(this.getAttribute("data-qa-element-id")) ?? ""}
			>
				${iconLeft}${this.label}${iconRight}${counter}
			</span>
			${this.hasActions
				? html` <div
							class="options-wrapper"
							category=${ifDefined(this.category)}
							size=${ifDefined(this.size)}
							state=${ifDefined(this.state)}
							variant=${ifDefined(this.variant)}
							@click=${this.handleButtonActions}
						>
							<f-icon
								class=${classMap({ ...iconClasses })}
								.state=${this.state}
								.size=${this.iconSize}
								source="i-chevron-down"
							></f-icon>
						</div>
						<f-popover
							@overlay-click=${this.closeButtonActions}
							size="small"
							id="f-button-actions"
							placement="bottom-start"
							.overlay=${false}
						>
							<f-div direction="column" stat="secondary" overflow="scroll">
								${this.actions!.map((a, ai) => {
									const border = (() => {
										if (ai === this.actions!.length - 1) {
											return "none";
										}
										return "small solid secondary bottom";
									})();
									return html`<f-div
										.border=${border}
										align="middle-left"
										gap="auto"
										clickable
										@click=${() => this.selectAction(a)}
									>
										${typeof a === "function"
											? a()
											: html`<f-div padding="medium" align="middle-left"
													><f-text>${a}</f-text></f-div
											  >`}
										${this.selectedAction === a
											? html`<f-icon source="i-tick" style="margin-right:12px;"></f-icon>`
											: nothing}
									</f-div>`;
								})}
							</f-div>
						</f-popover>`
				: nothing} `;
	}

	selectAction(action: FButtonAction) {
		this.selectedAction = action;
		this.closeButtonActions();

		const event = new CustomEvent<{ action: FButtonAction }>("action", {
			detail: {
				action
			},
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(event);
	}
	handleButtonActions() {
		if (this.buttonActionsPopover) {
			this.buttonActionsPopover.target = this;
			this.buttonActionsPopover.offset = {
				mainAxis: 4,
				crossAxis: 0,
				alignmentAxis: 0
			};
			this.buttonActionsPopover.open = true;
		}
	}

	closeButtonActions() {
		if (this.buttonActionsPopover) {
			this.buttonActionsPopover.open = false;
		}
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
