import { html, PropertyValueMap, PropertyValues, unsafeCSS } from "lit";
import { property, state } from "lit/decorators.js";
import eleStyle from "./f-icon.scss?inline";
import globalStyle from "./f-icon-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
// themeSubject will used to listen theme update
import { configSubject, themeSubject, injectCss } from "@nonfx/flow-core-config";
import { classMap } from "lit-html/directives/class-map.js";
import loader from "../../mixins/svg/loader";
import notFound from "../../mixins/svg/not-found";
import { flowElement, isValidHttpUrl } from "./../../utils";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import getCustomFillColor from "../../utils/get-custom-fill-color";
import { validateHTMLColor, validateHTMLColorName } from "validate-color";
import { Subscription } from "rxjs";

injectCss("f-icon", globalStyle);

export type FIconState =
	| "default"
	| "secondary"
	| "subtle"
	| "primary"
	| "success"
	| "danger"
	| "warning"
	| "neutral"
	| "inherit"
	| `custom, ${string}`;

@flowElement("f-icon")
export class FIcon extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle)];

	/**
	 * @attribute local state for managing custom fill.
	 */
	@state()
	fill = "";

	private _source!: string;
	private _originalSource?: string;

	/**
	 * @internal
	 * @property set it to true if source value is url
	 */
	private isURLSource = false;

	private _themeSubscription?: Subscription;
	private _configSubscription?: Subscription;

	/**
	 * @attribute The small size is the default.
	 */
	@property({ type: String })
	size?: "x-large" | "large" | "medium" | "small" | "x-small" = "small";

	/**
	 * @attribute The state of an Icon helps in indicating the degree of emphasis. The Icon component inherits the state from the parent component. By default it is subtle.
	 */
	@property({ type: String })
	state?: FIconState = "default";

	/**
	 * @attribute Source property defines what will be displayed on the icon. For icon variant It can take the icon name from a library , any inline SVG or any URL for the image. For emoji, it takes emoji as inline text.
	 */
	@property({
		type: String
	})
	get source(): string {
		return this._source;
	}
	// source computed based on value given by user
	set source(value) {
		this._originalSource = value;
		this.computeSource(value);
	}

	/**
	 * @attribute The disabled attribute can be set to keep a user from clicking on the f-icon.
	 */
	@property({ type: Boolean, reflect: true })
	disabled?: boolean = false;

	/**
	 * @attribute display loader
	 */
	@property({ type: Boolean })
	loading?: boolean = false;

	/**
	 * @attribute is clickable
	 */
	@property({ type: Boolean })
	clickable?: boolean = false;

	readonly required = ["source"];

	/**
	 * validation for all atrributes
	 */
	validateProperties() {
		if (!this.source) {
			throw new Error("f-icon : source is mandatory field");
		}
		if (
			this.state?.includes("custom") &&
			this.fill &&
			!validateHTMLColor(this.fill) &&
			!validateHTMLColorName(this.fill)
		) {
			throw new Error("f-icon : enter correct color-name or hex-color-code");
		}
	}

	connectedCallback() {
		super.connectedCallback();

		// whenever theme changes this subscription runs
		this._themeSubscription = themeSubject.subscribe(() => {
			this.requestUpdate();
		});

		this._configSubscription = configSubject.subscribe(() => {
			this.computeSource(this._originalSource!);
		});
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();
		this._themeSubscription?.unsubscribe();
		this._configSubscription?.unsubscribe();
	}

	/**
	 * apply inline styles to shadow-dom for custom fill.
	 */
	applyStyles() {
		if (this.fill) {
			if (this.loading) {
				return ``;
			} else {
				return `fill: ${this.fill}`;
			}
		}
		return "";
	}

	computeSource(value: string) {
		const emojiRegex = /\p{Extended_Pictographic}/u;
		if (isValidHttpUrl(value)) {
			this.isURLSource = true;
			this._source = `<img src="${value}"/>`;
		} else if (emojiRegex.test(value)) {
			this._source = value;
		} else {
			const IconPack = configSubject.value.iconPack;
			if (IconPack) {
				let svg = IconPack[value];
				const theme = configSubject.value.theme;
				if (!svg && theme === "f-dark") {
					svg = IconPack[value + "-dark"];
				}
				if (!svg && theme === "f-light") {
					svg = IconPack[value + "-light"];
				}
				if (svg) {
					this._source = svg;
				} else {
					this._source = notFound;
				}
			} else {
				this._source = notFound;
			}
		}
		this.requestUpdate();
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "img";
		if (!this.getAttribute("aria-label"))
			this.setAttribute("aria-label", "" + this._originalSource);
		this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
	}

	render() {
		/**
		 * creating local fill variable out of state prop.
		 */
		this.fill = getCustomFillColor(this.state ?? "");
		// validating properties
		this.validateProperties();
		// if state prop is inherit, this would inherit color properties of its latest parent f-div.

		// classes to apply on inner element
		const classes: Record<string, boolean> = {
			"f-icon": true,
			"custom-state": this.fill ? true : false
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
			state=${this.state}
			size=${this.size}
			?disabled=${this.disabled}
			?loading=${this.loading}
			?clickable=${this.clickable}
		>
			${this.loading
				? html`${unsafeSVG(loader)}`
				: html`${this.isURLSource ? unsafeHTML(this.source) : unsafeSVG(this.source)}`}
		</div>`;
	}

	protected updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-icon": FIcon;
	}
}
