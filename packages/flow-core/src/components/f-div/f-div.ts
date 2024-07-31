import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import { FRoot } from "../../mixins/components/f-root/f-root";
import eleStyle from "./f-div.scss?inline";
import globalStyle from "./f-div-global.scss?inline";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import loader from "../../mixins/svg/loader";
import getCustomFillColor from "../../utils/get-custom-fill-color";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";

export type FDivBorderWidth = "small" | "medium" | "large";
export type FDivBorderStyle = "solid" | "dashed" | "dotted";
export type FDivBorderColor = "default" | "secondary" | "subtle";
export type FDivBorderPosition = "bottom" | "top" | "left" | "right" | "around";
export type FDivPadding = "x-large" | "large" | "medium" | "small" | "x-small" | "none";

export type FDivBorderProp =
	| FDivBorderWidth
	| `${FDivBorderWidth} ${FDivBorderStyle}`
	| `${FDivBorderWidth} ${FDivBorderStyle} ${FDivBorderColor}`
	| `${FDivBorderWidth} ${FDivBorderStyle} ${FDivBorderColor} ${FDivBorderPosition}`;

export type FDivPaddingProp =
	| FDivPadding
	| `${FDivPadding} ${FDivPadding}`
	| `${FDivPadding} ${FDivPadding} ${FDivPadding} ${FDivPadding}`;

export type FDivWidthProp =
	| "fill-container"
	| "hug-content"
	| `${number}px`
	| `${number}%`
	| `${number}vw`;

export type FDivHeightProp =
	| "fill-container"
	| "hug-content"
	| `${number}px`
	| `${number}%`
	| `${number}vh`;

export type FDivMaxWidthProp = `${number}px` | `${number}%` | `${number}vw`;

export type FDivMaxHeightProp = `${number}px` | `${number}%` | `${number}vh`;

export type FDivStateProp =
	| "subtle"
	| "default"
	| "secondary"
	| "tertiary"
	| "success"
	| "warning"
	| "danger"
	| "primary"
	| "transparent"
	| "inherit"
	| `custom, ${string}`;

/**
 * START :  constant values required for `f-div`
 */
const BORDER_WIDTH_VALUES = {
	small: "1px",
	medium: "2px",
	large: "4px"
};

const BORDER_COLOR_VALUES = {
	default: "var(--color-border-default)",
	subtle: "var(--color-border-subtle)",
	secondary: "var(--color-border-secondary)"
};

const PADDING_VALUES = {
	"x-large": "24px",
	large: "16px",
	medium: "12px",
	small: "8px",
	"x-small": "4px",
	none: "0px"
};

const DEFAULT_BORDER = {
	borderWidth: "small",
	borderStyle: "solid",
	borderColor: "default",
	borderPosition: "around"
};
const BORDER_POSITION_CSS = {
	bottom: "border-bottom",
	top: "border-top",
	left: "border-left",
	right: "border-right",
	around: "border"
} as Record<string, string>;

/**
 * END :  constant values required for `f-div`
 */

injectCss("f-div", globalStyle);

/**
 * @summary F-div is used as a container for HTML elements.
 */
@flowElement("f-div")
export class FDiv extends FRoot {
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
	 * @attribute Variants are various representations of a f-div.
	 */
	@property({ type: String, reflect: true })
	variant?: "block" | "curved" | "round" = "block";
	/**
	 * @attribute Direction will decide whether these elements needs to be displayed in vertical or horizontal manner.
	 */
	@property({ type: String, reflect: true })
	direction?: "row" | "column" = "row";

	/**
	 * @attribute state property defines the background color of a f-div. It can take only surface colors defined in the library.
	 */
	@property({ reflect: true, type: String })
	state?: FDivStateProp = "transparent";

	/**
	 * @attribute Border property enables a border for f-div.  You can combine border properties to achieve a desired result.
	 */
	@property({
		type: String,
		reflect: true
	})
	border?: FDivBorderProp;

	/**
	 * @attribute Gap defines the space between the items of a f-div
	 */
	@property({ type: String, reflect: true })
	gap?: "auto" | "x-large" | "large" | "medium" | "small" | "x-small" | "none" = "none";

	/**
	 * @attribute Padding defines extra space across the elements inside a f-div.
	 */
	@property({
		type: String,
		reflect: true
	})
	padding?: FDivPaddingProp = "none";

	/**
	 * @attribute Align property places the elements of a layout in particular positions with respect to the f-div.
	 */
	@property({ type: String, reflect: true })
	align?:
		| "top-left"
		| "top-center"
		| "top-right"
		| "middle-left"
		| "middle-center"
		| "middle-right"
		| "bottom-left"
		| "bottom-center"
		| "bottom-right" = "top-left";

	/**
	 * @attribute width of `f-div`
	 */
	@property({ type: String, reflect: true })
	width?: FDivWidthProp = "fill-container";
	/**
	 * @attribute height of `f-div`
	 */
	@property({ type: String, reflect: true })
	height?: FDivHeightProp = "fill-container";

	/**
	 * @attribute width of `f-div`
	 */
	@property({ type: String, reflect: true, attribute: "max-width" })
	maxWidth?: FDivWidthProp;
	/**
	 * @attribute height of `f-div`
	 */
	@property({ type: String, reflect: true, attribute: "max-height" })
	maxHeight?: FDivHeightProp;

	/**
	 * @attribute The disabled attribute can be set to keep a user from clicking on the f-icon.
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * @attribute display loader
	 */
	@property({ reflect: true, type: String })
	loading?: "skeleton" | "loader";

	/**
	 * @attribute is clickable
	 */
	@property({ reflect: true, type: Boolean })
	clickable?: boolean = false;

	/**
	 * @attribute is highlighted
	 */
	@property({ reflect: true, type: Boolean })
	highlight?: boolean = false;

	/**
	 * @attribute set true when to hide scrollbar
	 */
	@property({ reflect: true, type: Boolean, attribute: "show-scrollbar" })
	showScrollbar?: boolean = false;

	/**
	 * @attribute Overflow property defines the behavior of the overflowing elements inside a f-div
	 */
	@property({ reflect: true, type: String })
	overflow?: "wrap" | "scroll" | "hidden" | "visible" = "wrap";

	/**
	 * @attribute Sets the f-div to a selected state. Select between border, background, or notch based on your use case.
	 */
	@property({ reflect: true, type: String })
	selected?: "none" | "background" | "border" | "notch-right" | "notch-left" = "none";

	/**
	 * @attribute Sticky property defines a f-div’s position based on the scroll position of the container
	 */
	@property({ reflect: true, type: String })
	sticky?: "none" | "top" | "bottom" | "left" | "right" = "none";

	/**
	 * Applying border related style, based on value
	 */
	applyBorder() {
		if (this.border) {
			const [borderWidth, borderStyle, borderColor, borderPosition] = this.border.split(" ") || [];
			const meta = {
				width: BORDER_WIDTH_VALUES[(borderWidth || DEFAULT_BORDER.borderWidth) as FDivBorderWidth],
				style: borderStyle || DEFAULT_BORDER.borderStyle,
				color: BORDER_COLOR_VALUES[(borderColor || DEFAULT_BORDER.borderColor) as FDivBorderColor],
				position: borderPosition || DEFAULT_BORDER.borderPosition
			};

			this.style.setProperty(
				BORDER_POSITION_CSS[meta.position],
				`${meta.width} ${meta.style} ${meta.color}`
			);
		}
	}

	/**
	 * Applying padding related style, based on value
	 */
	applyPadding() {
		if (this.padding) {
			const paddingValues = (this.padding.split(" ") || []) as FDivPadding[];

			let paddingCSS = PADDING_VALUES[`none`];
			if (paddingValues) {
				paddingCSS = paddingValues
					.slice(0, 4)
					.map(val => {
						return PADDING_VALUES[val];
					})
					.join(" ");
			}
			this.style.padding = paddingCSS;
		}
	}

	/**
	 * Applying height,width related style, based on value
	 */
	applySize() {
		const fixedValues = ["fill-container", "hug-content"];
		if (this.width && !fixedValues.includes(this.width)) {
			this.style.width = this.width;
		}
		if (this.height && !fixedValues.includes(this.height)) {
			this.style.height = this.height;
		}
		if (this.maxWidth) {
			this.classList.add("f-div-custom-width");
			this.style.setProperty("--max-width", this.maxWidth);
		} else {
			this.style.removeProperty("--max-width");
			this.classList.remove("f-div-custom-width");
		}
		if (this.maxHeight) {
			this.classList.add("f-div-custom-height");
			this.style.setProperty("--max-height", this.maxHeight);
		} else {
			this.style.removeProperty("--max-height");
			this.classList.remove("f-div-custom-height");
		}
	}

	checkHighlight() {
		const highlights = document.querySelectorAll("f-div[highlight]");
		const overlayEl = document.querySelector(".f-div-highlight-overlay");
		if (highlights.length > 0 && !overlayEl) {
			const overlay = `<div class="f-div-highlight-overlay"></div>`;
			document.body?.insertAdjacentHTML("afterbegin", overlay);
		}
		if (highlights.length === 0) {
			overlayEl?.remove();
		}
	}

	disconnectedCallback() {
		if (this.highlight) {
			this.checkHighlight();
		}
		super.disconnectedCallback();
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		if (!this.role) this.role = "none";
	}

	render() {
		/**
		 * creating local fill variable out of state prop.
		 */
		this.fill = getCustomFillColor(this.state ?? "");

		/**
		 * START :  apply inline styles based on attribute values
		 */

		if (this.state?.includes("custom") && this.fill) {
			this.style.backgroundColor = this.fill;
		} else {
			this.style.backgroundColor = "";
		}
		this.applyBorder();
		this.applyPadding();
		this.applySize();

		/**
		 * END :  apply inline styles based on attribute values
		 */

		/**
		 * Final html to render
		 */
		return html` <slot></slot>${this.loading === "loader" ? html`${unsafeSVG(loader)}` : ""}`;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
		super.updated(changedProperties);

		if (
			changedProperties.has("highlight") &&
			(changedProperties.get("highlight") === true || this.highlight)
		) {
			this.checkHighlight();
		}

		void this.updateComplete.then(() => {
			if (this.variant === "round") {
				this.style.borderRadius = `${this.offsetHeight / 2}px`;
			} else if (this.variant === "curved") {
				this.style.borderRadius = `4px`;
			} else {
				this.style.borderRadius = "0px";
			}
		});
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-div": FDiv;
	}
}
