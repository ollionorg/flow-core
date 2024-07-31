import { html, nothing, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { FRoot, FDivider, FDividerState, FText, FDiv } from "@nonfx/flow-core";
import eleStyle from "./f-field-separator.scss?inline";
import globalStyle from "./f-field-separator-global.scss?inline";
import { injectCss } from "@nonfx/flow-core-config";

injectCss("f-field-separator", globalStyle);

export type FFieldSeparatorState = FDividerState;

@customElement("f-field-separator")
export class FFieldSeparator extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FDivider.styles,
		...FText.styles,
		...FDiv.styles
	];

	/**
	 * @attribute comments baout title
	 */
	@property({ type: String })
	label?: string;

	/**
	 * @attribute The solid variant is the default.
	 */
	@property({ reflect: true, type: String })
	type?: "solid" | "dashed" | "dotted" = "solid";

	/**
	 * @attribute The medium size is the default.
	 */
	@property({ reflect: true, type: String })
	size?: "large" | "medium" = "medium";

	/**
	 * @attribute The state of Divider helps in indicating the degree of emphasis. By default it is default state.
	 */
	@property({ reflect: true, type: String })
	state?: FFieldSeparatorState = "default";

	/**
	 * @attribute The state of Divider helps in indicating the degree of emphasis. By default it is default state.
	 */
	@property({ reflect: true, type: String })
	direction?: "vertical" | "horizontal" = "vertical";

	render() {
		return html`<f-div
			.direction=${this.direction === "horizontal" ? "column" : "row"}
			align="middle-center"
		>
			<f-div
				.width=${this.direction === "horizontal" ? "hug-content" : "fill-container"}
				.direction=${this.direction === "horizontal" ? "row" : "column"}
			>
				<f-divider .variant=${this.type} .size=${this.size} .state="${this.state ?? "default"}">
				</f-divider>
			</f-div>
			${this.label
				? html`<f-text
						align="center"
						state="subtle"
						weight="bold"
						inline
						class="f-field-separator-label"
						>${this.label}</f-text
				  >`
				: nothing}

			<f-div
				.width=${this.direction === "horizontal" ? "hug-content" : "fill-container"}
				.direction=${this.direction === "horizontal" ? "row" : "column"}
			>
				<f-divider .variant=${this.type} .size=${this.size} .state="${this.state ?? "default"}">
				</f-divider>
			</f-div>
		</f-div>`;
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-field-separator": FFieldSeparator;
	}
}
