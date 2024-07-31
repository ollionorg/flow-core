// import { FRoot } from "@nonfx/flow-core";
import { html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { RadioOption, RadioOptions } from "../../types";
import eleStyle from "./f-radio-group.scss?inline";
import globalStyle from "./f-radio-group-global.scss?inline";
import { FDiv, FRadio, FRoot, FText } from "@nonfx/flow-core";
import { isEqual } from "lodash-es";
import { injectCss } from "@nonfx/flow-core-config";

injectCss("f-checkbox-group", globalStyle);

export const radioGroupStyles = eleStyle;
/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@customElement("f-radio-group")
export class FRadioGroup extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FDiv.styles,
		...FText.styles,
		...FRadio.styles
	];

	/**
	 * @attribute Controls size of all input elements within the form
	 */
	@property({ reflect: false, type: Array })
	options: RadioOptions = [];

	/**
	 * @attribute Controls size of all input elements within the form
	 */
	@property({ reflect: true, type: String })
	state?: "primary" | "default" | "success" | "warning" | "danger" = "default";

	/**
	 * @attribute Controls size of all input elements within the form
	 */
	@property({ reflect: true, type: String })
	value?: RadioOption;

	/**
	 * @attribute Decides the direction of the input elements within the group.
	 */
	@property({ type: String, reflect: true })
	direction?: "vertical" | "horizontal" = "vertical";

	/**
	 * @attribute decides the gap between elements of a group
	 */
	@property({ type: String, reflect: true })
	gap?: "large" | "medium" | "small" | "x-small" = "small";

	@property({ type: String, reflect: true })
	helperText?: string;

	/**
	 * @attribute The disabled attribute can be set to keep a user from clicking on the radio group.
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	handleChange(option: RadioOption) {
		const event = new CustomEvent("input", {
			detail: {
				value: option
			}
		});
		this.value = option;
		this.dispatchEvent(event);
	}

	isChecked(option: RadioOption) {
		return isEqual(option, this.value) ? "selected" : "unselected";
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.role = "radiogroup";
	}

	render() {
		/**
		 * Final html to render
		 */
		return html`
			<f-div
				class="f-radio-group-wrapper"
				?disabled=${this.disabled}
				.gap=${this.gap}
				direction="column"
				width="100%"
			>
				<f-div padding="none" gap="x-small" direction="column" width="fill-container">
					<f-div padding="none" gap="auto" direction="row" height="hug-content">
						<f-div
							padding="none"
							gap="small"
							direction="row"
							width="hug-content"
							height="hug-content"
						>
							<slot name="label"></slot>
							<slot name="icon-tooltip"></slot>
						</f-div>
						<f-div width="hug-content">
							<slot name="subtitle"></slot>
						</f-div>
					</f-div>
					<slot name="description"></slot>
				</f-div>
				<div class="f-radio-group" gap=${this.gap} direction=${this.direction}>
					${this.options?.map(
						item => html`
							<f-radio
								data-qa-element-id=${item.qaId ?? item.id}
								.value=${this.isChecked(item)}
								@input=${() => this.handleChange(item)}
								.state=${this.state}
								?disabled=${item.disabled}
							>
								<f-div slot="label" padding="none" gap="none">
									${typeof item.title === "object"
										? item.title
										: html`<f-text
												weight="regular"
												data-qa-label-for=${item.title ?? item.id}
												size="small"
												>${item.title ?? item.id}</f-text
										  >`}
								</f-div>
								${item.description
									? html` <f-div
											slot="description"
											data-qa-description-for=${item.title ?? item.id}
											padding="none"
											gap="none"
											>${item.description}</f-div
									  >`
									: ""}
								${item.iconTooltip
									? html`
											<f-icon
												data-qa-info-icon-for=${item.title ?? item.id}
												slot="icon-tooltip"
												source="i-question-filled"
												size="small"
												state="subtle"
												.tooltip="${item.iconTooltip}"
												clickable
											></f-icon>
									  `
									: ""}
								${item?.subTitle
									? html`
											<f-text size="small" slot="subtitle" align="right" state="secondary"
												>${item?.subTitle}</f-text
											>
									  `
									: ""}
							</f-radio>
						`
					)}
				</div>
				${this?.helperText
					? html`<f-text
							variant="para"
							size="small"
							weight="regular"
							data-qa-help-for=${this.getAttribute("data-qa-element-id")}
							.state=${this.state}
							>${this?.helperText}</f-text
					  >`
					: html`<slot name="help"></slot>`}
			</f-div>
		`;
	}
}
