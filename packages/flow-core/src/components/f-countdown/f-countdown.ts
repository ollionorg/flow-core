import { html, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import eleStyle from "./f-countdown.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";

import getCustomFillColor from "../../utils/get-custom-fill-color";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { FText } from "../f-text/f-text";
import { classMap } from "lit-html/directives/class-map.js";
import { validateHTMLColor, validateHTMLColorName } from "validate-color";
import { keyed } from "lit/directives/keyed.js";

const states = ["primary", "danger", "warning", "success", "default"] as const;
const sizes = ["large", "medium", "small", "x-small"] as const;
const categories = ["fill", "outline"] as const;
const placements = ["left", "right", "bottom", "top", "none"] as const;

export type FCountdownStateProp = (typeof states)[number];
export type FCountdownCategoryProp = (typeof categories)[number];
export type FCountdownSizesProp = (typeof sizes)[number];
export type FCountdownLabelProp = (typeof placements)[number];
export type FCountdownDuration = number | string;

export class FCountdown extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles, ...FText.styles];

	/**
	 * @attribute toggle accordion
	 */
	@property({ reflect: true, type: String })
	category?: FCountdownCategoryProp = "fill";

	/**
	 * @attribute toggle accordion
	 */
	@property({ reflect: true, type: String })
	duration?: FCountdownDuration = 5;

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

	interval = 0;

	countdownId = 0;

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

	get countdownWidth() {
		return this.labelPlacement === "left" ? "55px" : "";
	}

	get countdownAlignment() {
		return this.labelPlacement === "left" ? "middle-right" : "middle-center";
	}

	init() {
		this.interval = setInterval(() => {
			this.remaining -= 1;
			this.timerText = this.convertSecondsToMinutesAndSeconds(this.remaining);

			if (this.remaining === 0) {
				this.remaining = this.secondsDuration;
				this.timerText = this.convertSecondsToMinutesAndSeconds(this.secondsDuration);
			}
			this.updateAriaAttributes();
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

	validateDurationProperties() {
		if (!this.duration) {
			throw new Error("f-countdown: Duration is required");
		}

		const time = this.duration;
		const regexNum = /^\d+$/;

		if (typeof time === "string") {
			if (time.includes(":")) {
				const [min, sec] = time.split(":");
				if (!regexNum.test(min) || !regexNum.test(sec)) {
					throw new Error("f-countdown: Please enter numeric values for minutes and seconds");
				}
				if (Number(min) >= 60 || Number(sec) > 60) {
					throw new Error(
						"f-countdown: Please enter valid values for minutes (less than 60) and seconds (less than 60)"
					);
				}
			} else if (!regexNum.test(time)) {
				throw new Error("f-countdown: Please enter a numeric value for time");
			} else if (Number(time) >= 3600) {
				throw new Error("f-countdown: Please enter a value for time less than 3600 seconds");
			}
		} else if (time >= 3600) {
			throw new Error("f-countdown: Please enter a value for time less than 3600 seconds");
		}
	}

	validateStateProperties() {
		if (
			this.state?.includes("custom") &&
			this.fill &&
			!validateHTMLColor(this.fill) &&
			!validateHTMLColorName(this.fill)
		) {
			throw new Error("f-countdown : enter correct color-name or hex-color-code");
		}
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.updateAriaAttributes();
		this.role = "timer";
	}

	updateAriaAttributes() {
		this.setAttribute("aria-live", `polite`);
		this.setAttribute("aria-label", `Remaining ${this.timerText}`);
	}

	render() {
		this.countdownId += 1;
		this.fill = getCustomFillColor(this.state ?? "");
		this.validateDurationProperties();
		this.validateStateProperties();

		//top and left label placement
		const labelTopAndLeft =
			this.labelPlacement === "left" || this.labelPlacement === "top"
				? html`<f-div width=${this.countdownWidth} align=${this.countdownAlignment}>
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
		const fillTimer = keyed(
			this.countdownId,
			html`<div
				class="f-countdown-circle"
				state="${this.state}"
				size="${this.size}"
				style=${this.applyStyles}
			>
				<div
					class="f-countdown-pie f-countdown-spinner"
					state="${this.state}"
					style=${this.applyPieStyles}
				></div>
				<div
					class="f-countdown-pie f-countdown-filler"
					state="${this.state}"
					style=${this.applyPieStyles}
				></div>
				<div class="mask" style=${this.maskStyles}></div>
			</div>`
		);

		const outlineTimer = keyed(
			this.countdownId,
			html`<div
				class="f-outline-countdown-timer"
				size="${this.size}"
				style=${this.outlineTimerStyle}
			>
				<div class="f-outline-countdown-mask"></div>
			</div>`
		);

		const classes: Record<string, boolean> = {
			"f-countdown-wrapper": this.category === "fill",
			"f-countdown-outline-wrapper": this.category === "outline"
		};
		this.classList.forEach(cl => {
			classes[cl] = true;
		});

		return html`
			<f-div
				class=${classMap(classes)}
				align="middle-center"
				direction=${this.labelPlacement === "left" || this.labelPlacement === "right"
					? "row"
					: "column"}
				gap="x-small"
			>
				${labelTopAndLeft} ${this.category === "fill" ? fillTimer : outlineTimer}
				${labelBottomAndRight}
			</f-div>
		`;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
		super.updated(changedProperties);
		clearInterval(this.interval);
		this.remaining = this.secondsDuration;
		this.init();
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
