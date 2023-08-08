import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-radio.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";

export type FRadioState = "primary" | "default" | "success" | "warning" | "danger";
export type FRadioCustomEvent = {
	value: string;
};

@customElement("f-radio")
export class FRadio extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles];

	/**
	 * @attribute Value of a radio defines if it is selected or not
	 */
	@property({ reflect: true, type: String })
	value?: "selected" | "unselected" = "unselected";

	/**
	 * @attribute States are used to communicate purpose and connotations.
	 */
	@property({ reflect: true, type: String })
	state?: FRadioState = "default";

	/**
	 * @attribute f-radio can have 2 sizes.
	 */
	@property({ reflect: true, type: String })
	size?: "small" | "medium";

	/**
	 * @attribute
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * emit event on click
	 */
	handleClick(e: MouseEvent) {
		if (this.value === "unselected") {
			e.stopPropagation();
			const event = new CustomEvent<FRadioCustomEvent>("input", {
				detail: {
					value: "selected"
				},
				bubbles: true,
				composed: true
			});
			this.value = "selected";
			this.dispatchEvent(event);
		}
	}

	render() {
		/**
		 * Final html to render
		 */

		return html`
			<f-div
				class="f-radio-wrapper"
				padding="none"
				gap="x-small"
				direction="column"
				size=${this.size}
			>
				<f-div class="f-radio-section" align="middle-left" padding="none" gap="medium">
					<input
						type="radio"
						class="f-radio"
						data-qa-id=${this.getAttribute("data-qa-element-id")}
						checked=${this.value === "selected" ? true : false}
						size=${this.size}
						state=${this.state}
						@click=${this.handleClick}
					/>
					<f-div padding="none" align="middle-left" direction="row" gap="small">
						<f-div width="hug-content" height="hug-content"> <slot name="label"></slot></f-div>
						<f-div width="hug-content" height="hug-content"
							><slot name="icon-tooltip"></slot
						></f-div>
					</f-div>
				</f-div>
				<slot name="description"></slot>
				<slot name="help"></slot>
			</f-div>
		`;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-radio": FRadio;
	}
}
