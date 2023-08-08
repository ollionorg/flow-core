import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import eleStyle from "./f-switch.scss";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";

export type FSwitchState = "primary" | "default" | "success" | "warning" | "danger";

export type FSwitchCustomEvent = {
	value: boolean;
};

@customElement("f-switch")
export class FSwitch extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles];

	/**
	 * @attribute Value of a switch defines if it is on or off.
	 */
	@property({ reflect: true, type: String })
	value?: boolean = false;

	/**
	 * @attribute States are used to communicate purpose and connotations.
	 */
	@property({ reflect: true, type: String })
	state?: FSwitchState = "default";

	/**
	 * @attribute f-switch can have 2 sizes.
	 */
	@property({ reflect: true, type: String })
	size?: "small" | "medium";

	/**
	 * @attribute f-switch can have 2 sizes.
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	/**
	 * emit event.
	 */
	handleInput(e: InputEvent) {
		e.stopPropagation();

		this.value = !this.value;
		const event = new CustomEvent<FSwitchCustomEvent>("input", {
			detail: {
				value: this.value
			},
			bubbles: true,
			composed: true
		});

		this.dispatchEvent(event);
	}

	render() {
		if (!this.value) {
			this.value = false;
		}
		/**
		 * Final html to render
		 */

		return html` <f-div
			padding="none"
			gap="x-small"
			direction="column"
			width="hug-content"
			class="f-switch-section"
			size=${this.size}
		>
			<f-div
				padding="none"
				gap="medium"
				direction="row"
				height="hug-content"
				class="f-switch-wrapper"
			>
				<label class="f-switch" size=${this.size} state=${this.state}>
					<input
						type="checkbox"
						data-qa-id=${this.getAttribute("data-qa-element-id")}
						checked=${this.value}
						@input=${this.handleInput}
					/>
					<span class="f-switch-slider"></span>
				</label>
				<f-div padding="none" align="middle-left" direction="row" gap="small">
					<slot name="label"></slot>
					<slot name="icon-tooltip"></slot>
				</f-div>
			</f-div>
			<slot name="help"></slot>
		</f-div>`;
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-switch": FSwitch;
	}
}
