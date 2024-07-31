import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, queryAssignedElements } from "lit/decorators.js";
import eleStyle from "./f-switch.scss?inline";
import globalStyle from "./f-switch-global.scss?inline";
import { FRoot } from "../../mixins/components/f-root/f-root";
import { FDiv } from "../f-div/f-div";
import { flowElement } from "./../../utils";
import { injectCss } from "@nonfx/flow-core-config";
injectCss("f-switch", globalStyle);

export type FSwitchState = "primary" | "default" | "success" | "warning" | "danger";

export type FSwitchCustomEvent = {
	value: boolean;
};

@flowElement("f-switch")
export class FSwitch extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(globalStyle), ...FDiv.styles];

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

	@query(".switch-slots")
	switchSlots!: FDiv;

	/**
	 * @attribute assigned elements inside slot label
	 */
	@queryAssignedElements({ slot: "label" })
	_labelNodes!: NodeListOf<HTMLElement>;

	/**
	 * @attribute assigned elements inside slot description
	 */
	@queryAssignedElements({ slot: "subtitle" })
	_subtitleNodes!: NodeListOf<HTMLElement>;

	/**
	 * @attribute assigned elements inside slot help
	 */
	@queryAssignedElements({ slot: "icon-tooltip" })
	_iconTooltipNodes!: NodeListOf<HTMLElement>;

	/**
	 * has label slot
	 */
	get hasLabel() {
		return this._labelNodes.length > 0;
	}

	/**
	 * has subtitle slot
	 */
	get hasSubtitle() {
		return this._subtitleNodes.length > 0;
	}

	/**
	 * has icon-tooltip slot
	 */
	get hasIconTooltip() {
		return this._iconTooltipNodes.length > 0;
	}

	/**
	 * emit event.
	 */
	handleInput(e: InputEvent | KeyboardEvent) {
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

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "switch";
		this.tabIndex = 0;
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
			width="100%"
			class="f-switch-section"
			size=${this.size}
			?disabled=${this.disabled}
		>
			<f-div
				padding="none"
				gap="medium"
				direction="row"
				height="hug-content"
				class="f-switch-wrapper"
				width="hug-content"
			>
				<label class="f-switch" size=${this.size} state=${this.state}>
					<input
						style="visibility: hidden;"
						type="checkbox"
						data-qa-id=${this.getAttribute("data-qa-element-id")}
						checked=${this.value}
						@input=${this.handleInput}
					/>
					<span class="f-switch-slider"></span>
				</label>
				<f-div padding="none" align="middle-left" direction="row" gap="small" class="switch-slots">
					<slot name="label"></slot>
					<slot name="icon-tooltip"></slot>
					<slot name="subtitle"></slot>
				</f-div>
			</f-div>
			<slot name="help"></slot>
		</f-div>`;
	}

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
		super.updated(changedProperties);
		if (!this.hasLabel && !this.hasIconTooltip && !this.hasSubtitle) {
			this.switchSlots.style.display = "none";
		}

		if (this.value) {
			this.setAttribute("aria-checked", "true");
		} else {
			this.setAttribute("aria-checked", "false");
		}

		this.onkeyup = (e: KeyboardEvent) => {
			if (e.key === "Enter") this.handleInput(e);
		};
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
