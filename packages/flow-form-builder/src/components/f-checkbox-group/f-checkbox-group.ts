import { html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CheckboxOption, CheckboxOptions } from "../../types";
import eleStyle from "./f-checkbox-group.scss?inline";
import globalStyle from "./f-checkbox-group-global.scss?inline";
import { FRoot, FDiv, FText, FCheckbox } from "@nonfx/flow-core";
import { isEqual } from "lodash-es";
export type FCheckboxGroupValue = string[];
export const checkboxGroupStyles = eleStyle;
import { injectCss } from "@nonfx/flow-core-config";

injectCss("f-checkbox-group", globalStyle);
@customElement("f-checkbox-group")
export class FCheckboxGroup extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		...FText.styles,
		unsafeCSS(globalStyle),
		unsafeCSS(eleStyle),
		...FDiv.styles,
		...FCheckbox.styles
	];

	/**
	 * @attribute Controls size of all input elements within the form
	 */
	@property({ reflect: false, type: Array })
	options: CheckboxOptions = [];

	/**
	 * @attribute Controls size of all input elements within the form
	 */
	@property({ reflect: true, type: String })
	state?: "primary" | "default" | "success" | "warning" | "danger" = "default";

	/**
	 * @attribute Controls size of all input elements within the form
	 */
	@property({
		reflect: true,
		type: Array,
		hasChanged(newVal: FCheckboxGroupValue, oldVal: FCheckboxGroupValue) {
			return JSON.stringify(newVal) !== JSON.stringify(oldVal);
		}
	})
	value?: CheckboxOptions;

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
	 * @attribute The disabled attribute can be set to keep a user from clicking on the checkbox group.
	 */
	@property({ reflect: true, type: Boolean })
	disabled?: boolean = false;

	handleChange(e: CustomEvent, option: CheckboxOption) {
		e.stopPropagation();
		let tempValues = this.value && this.value?.length > 0 ? [...this.value] : [];
		if (this.isChecked(option) === "unchecked") {
			tempValues.push(option);
		} else {
			tempValues = tempValues.filter(item => !isEqual(item, option));
		}

		const event = new CustomEvent("input", {
			detail: {
				value: tempValues
			}
		});
		this.value = tempValues;
		this.dispatchEvent(event);
	}

	isChecked(option: CheckboxOption) {
		return this.value?.find(item => isEqual(item, option)) ? "checked" : "unchecked";
	}

	render() {
		/**
		 * Final html to render
		 */
		return html`
			<f-div
				class="f-checkbox-group-wrapper"
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
				<div
					class="f-checkbox-group"
					gap=${this.gap}
					direction=${this.direction}
					state=${this.state}
				>
					${this.options?.map(
						item => html`
							<f-checkbox
								data-qa-element-id=${item.qaId ?? item.id}
								.value=${this.isChecked(item)}
								@input=${(event: CustomEvent) => this.handleChange(event, item)}
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
								${item?.description
									? html` <f-div
											slot="description"
											data-qa-description-for=${item.title ?? item.id}
											padding="none"
											gap="none"
											>${item?.description}</f-div
									  >`
									: ""}
								${item?.iconTooltip
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
							</f-checkbox>
						`
					)}
				</div>
				${this?.helperText
					? html`<f-text
							variant="para"
							data-qa-help-for=${this.getAttribute("data-qa-element-id")}
							size="small"
							weight="regular"
							.state=${this.state}
							>${this?.helperText}</f-text
					  >`
					: html`<slot name="help"></slot>`}
			</f-div>
		`;
	}
}
