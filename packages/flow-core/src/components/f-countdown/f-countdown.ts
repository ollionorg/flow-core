import { html, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import eleStyle from "./f-countdown.scss?inline";
import globalStyle from "./f-countdown-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { flowElement } from "../../utils";
import { injectCss } from "@cldcvr/flow-core-config";
import getCustomFillColor from "../../utils/get-custom-fill-color";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { FText } from "../f-text/f-text";

injectCss("f-countdown", globalStyle);

const states = ["primary", "danger", "warning", "success", "default"] as const;
const sizes = ["large", "medium", "small", "x-small"] as const;
const categories = ["fill", "outline"] as const;
const placements = ["left", "right", "bottom", "top", "none"] as const;

export type FCountdownStateProp = (typeof states)[number];
export type FCountdownCategoryProp = (typeof categories)[number];
export type FCountdownSizesProp = (typeof sizes)[number];
export type FCountdownLabelProp = (typeof placements)[number];

@flowElement("f-countdown")
export class FCountdown extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle), ...FDiv.styles, ...FText.styles];

	/**
	 * @attribute toggle accordion
	 */
	@property({ reflect: true, type: String })
	category?: FCountdownCategoryProp = "fill";

	/**
	 * @attribute toggle accordion
	 */
	@property({ reflect: true, type: String })
	duration?: number | string = 5;

	/**
	 * @attribute Each variant has various sizes. By default medium is the default size.
	 */
	@property({ type: String, reflect: true })
	size?: FCountdownSizesProp = "medium";

	/**
	 * @attribute The states on tags are to indicate various degrees of emphasis of the action.
	 */
	@property({ reflect: true, type: String })
	state?: FCountdownStateProp = "default";

	/**
	 * @attribute The states on tags are to indicate various degrees of emphasis of the action.
	 */
	@property({ reflect: true, type: String, attribute: "label-placement" })
	labelPlacement?: FCountdownLabelProp = "left";

	fill = "";

	remaining = 0;

	timerText = this.convertSecondsToMinutesAndSeconds(this.secondsDuration);

	timerRef: Ref<FText> = createRef();

	currentProgress = 0;

	/**
	 * apply inline styles to shadow-dom for custom fill.
	 */
	get applyStyles() {
		if (this.fill) {
			return `background: ${this.fill};`;
		}
		return "";
	}

	get applyPieStyles() {
		return `background: var(--color-input-default); animation-duration: ${this.secondsDuration}s`;
	}

	get maskStyles() {
		return `animation-duration: ${this.secondsDuration}s`;
	}

	get outlineTimerStyle() {
		if (this.fill) {
			return `--duration: ${this.secondsDuration}; --state-color:${this.fill}`;
		}
		return `--duration: ${this.secondsDuration}; --state-color:${
			this.state !== "default"
				? `var(--color-${this.state}-default)`
				: `var(--color-primary-default)`
		};`;
	}

	get secondsDuration() {
		if (this.duration) {
			const timer = String(this.duration).split(":");

			if (timer.length === 1) {
				return Number(timer[0]);
			} else {
				return Number(timer[0]) * 60 + Number(timer[1]);
			}
		} else return 5;
	}

	interval!: number;

	init() {
		this.interval = setInterval(() => {
			this.remaining -= 1;
			this.timerText = this.convertSecondsToMinutesAndSeconds(this.remaining);

			if (this.remaining === 0) {
				this.remaining = this.secondsDuration;
				this.timerText = this.convertSecondsToMinutesAndSeconds(this.secondsDuration);
			}
			this.updateTimerText();
		}, 1000);
	}

	convertSecondsToMinutesAndSeconds(seconds: string | number) {
		const minutes = Math.floor(Number(seconds) / 60);
		const remainingSeconds = Number(seconds) % 60;
		if (minutes === 0) {
			return remainingSeconds + "s";
		}
		return minutes + "m " + remainingSeconds + "s";
	}

	updateTimerText() {
		if (this.timerRef.value) {
			this.timerRef.value.textContent = this.timerText;
		}
	}

	disconnectedCallback() {
		clearInterval(this.interval);
		super.disconnectedCallback();
	}

	get labelSize() {
		switch (this.size) {
			case "large":
				return "medium";
			case "medium":
				return "small";
			case "small":
				return "x-small";
			case "x-small":
				return "x-small";
			default:
				return "x-small";
		}
	}

	render() {
		this.fill = getCustomFillColor(this.state ?? "");

		//top and left label placement
		const labelTopAndLeft =
			this.labelPlacement === "left" || this.labelPlacement === "top"
				? html`<f-div
						width=${this.labelPlacement === "left" ? "55px" : ""}
						align=${this.labelPlacement === "left" ? "middle-right" : "middle-center"}
				  >
						<f-text weight="regular" .size=${this.labelSize} ${ref(this.timerRef)} inline></f-text>
				  </f-div>`
				: nothing;

		//bottom and right label placemet
		const labelBottomAndRight =
			this.labelPlacement === "right" || this.labelPlacement === "bottom"
				? html`<f-div align="middle-center">
						<f-text weight="regular" .size=${this.labelSize} ${ref(this.timerRef)} inline> </f-text>
				  </f-div>`
				: nothing;

		//fill category timer structure
		const fillTimer = html`<div
			class="f-countdown-circle"
			state=${this.state}
			size=${this.size}
			style=${this.applyStyles}
		>
			<div
				class="f-countdown-pie f-countdown-spinner"
				state=${this.state}
				style=${this.applyPieStyles}
			></div>
			<div
				class="f-countdown-pie f-countdown-filler"
				state=${this.state}
				style=${this.applyPieStyles}
			></div>
			<div class="mask" style=${this.maskStyles}></div>
		</div>`;

		const outlineTimer = html`<div class="timer" size=${this.size} style=${this.outlineTimerStyle}>
			<div class="mask"></div>
		</div>`;

		return this.category === "fill"
			? html`
					<f-div
						class="f-countdown-wrapper"
						align="middle-center"
						direction=${this.labelPlacement === "left" || this.labelPlacement === "right"
							? "row"
							: "column"}
						gap="x-small"
					>
						${labelTopAndLeft} ${fillTimer} ${labelBottomAndRight}
					</f-div>
			  `
			: html`
					<f-div
						align="middle-center"
						direction=${this.labelPlacement === "left" || this.labelPlacement === "right"
							? "row"
							: "column"}
						gap="x-small"
						class="f-countdown-outline-wrapper"
					>
						${labelTopAndLeft} ${outlineTimer} ${labelBottomAndRight}
					</f-div>
			  `;
	}

	protected firstUpdated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): void {
		super.updated(changedProperties);
		this.remaining = this.secondsDuration;
		this.init();
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
		super.updated(changedProperties);
		changedProperties.forEach((oldValue, propName) => {
			if (propName === "category" && oldValue !== this.category && oldValue !== undefined) {
				clearInterval(this.interval);
				this.remaining = this.secondsDuration;
				this.init();
			}
		});
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-countdown": FCountdown;
	}
}
