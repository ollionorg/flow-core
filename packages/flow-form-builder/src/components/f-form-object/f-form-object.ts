import { html, nothing, PropertyValueMap, TemplateResult, unsafeCSS } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { FDiv, FRoot } from "@nonfx/flow-core";
import eleStyle from "./f-form-object.scss?inline";
import globalStyle from "./f-form-object-global.scss?inline";

import fieldRenderer from "../f-form-builder/fields";
import { createRef, Ref } from "lit/directives/ref.js";
import {
	CanValidateFields,
	FFormInputElements,
	FormBuilderBaseField,
	FormBuilderObjectField,
	FormBuilderValidationPromise,
	FormBuilderValues
} from "../../types";
import { validateField } from "../../modules/validation/validator";
import { Subject } from "rxjs";
import { getEssentialFlowCoreStyles, propogateProperties } from "../../modules/helpers";
import { FFormGroup } from "@nonfx/flow-core";
import { FFieldSeparator } from "../f-field-separator/f-field-separator";
import { radioGroupStyles } from "../f-radio-group/f-radio-group";
import { checkboxGroupStyles } from "../f-checkbox-group/f-checkbox-group";
import { ifDefined } from "lit/directives/if-defined.js";

export type ObjectValueType = Record<
	string,
	// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
	string | string[] | number | number[] | unknown | unknown[] | undefined
>;
@customElement("f-form-object")
export class FFormObject extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		...FFieldSeparator.styles,
		unsafeCSS(radioGroupStyles),
		unsafeCSS(checkboxGroupStyles),
		...getEssentialFlowCoreStyles(),
		unsafeCSS(globalStyle)
	];

	/**
	 * @attribute comments baout title
	 */
	@property({ type: Object })
	config!: FormBuilderObjectField;

	/**
	 * @attribute value
	 */
	@property({
		type: Object,
		hasChanged(newVal: ObjectValueType, oldVal: ObjectValueType) {
			return JSON.stringify(newVal) !== JSON.stringify(oldVal);
		}
	})
	value!: ObjectValueType;

	@property({ reflect: true, type: String })
	state?: "primary" | "default" | "success" | "warning" | "danger" = "default";

	/**
	 * @attribute Gap is used to define the gap between the elements
	 */
	@property({ reflect: true, type: String })
	gap?: "large" | "medium" | "small" | "x-small" = "medium";

	@query("f-form-group")
	formGroupElement?: FFormGroup;

	fieldRefs: Record<string, Ref<FFormInputElements>> = {};

	showWhenSubject!: Subject<FormBuilderValues>;

	render() {
		return html`${this.buildFields()}`;
	}

	getFieldValue(fieldname: string) {
		return this.value ? this.value[fieldname] : undefined;
	}

	getLabelOffSet() {
		const allFields = Object.entries(this.fieldRefs);
		let element = allFields[allFields.length - 1][1].value as FFormInputElements;
		if (this.config.direction == "vertical") {
			element = allFields[0][1].value as FFormInputElements;
		}
		const labelHeight: number =
			(element.querySelector("[slot='label']") as HTMLElement)?.offsetHeight ?? 0;
		const descriptionHeight: number =
			(element.querySelector("[slot='description']") as HTMLElement)?.offsetHeight ?? 0;
		let totalHeight = labelHeight + descriptionHeight;
		if (this.formGroupElement) {
			const fDiv = this.formGroupElement.shadowRoot?.querySelector<HTMLElement>(
				"f-div.f-form-group-label-wrapper"
			);

			if (fDiv) {
				totalHeight += fDiv.offsetHeight + 12;
			}
		}
		return totalHeight;
	}

	buildFields() {
		const fieldTemplates: TemplateResult[] = [];
		Object.entries(this.config.fields).forEach(([fieldname, fieldConfig], idx, fieldArray) => {
			const fieldRef: Ref<FFormInputElements> = createRef();
			if (fieldConfig.type === "separator") {
				fieldConfig.direction = this.config.direction ?? "vertical";
			}
			this.fieldRefs[fieldname] = fieldRef;
			fieldTemplates.push(html`
				${fieldRenderer[fieldConfig.type](
					fieldname,
					fieldConfig,
					fieldRef,
					this.getFieldValue(fieldname)
				)}
				${this.config.fieldSeparator && idx < fieldArray.length - 1
					? html`<f-divider id="${fieldname}-divider"></f-divider>`
					: ""}
			`);
		});

		return html` <f-div gap="small" direction="column" width="100%">
			<f-form-group
				.direction=${this.config.direction ?? "horizontal"}
				.variant=${this.config.variant}
				.label=${this.config.label}
				gap=${ifDefined(this.config.gap ?? this.gap)}
				data-qa-id=${ifDefined(this.config.qaId || this.config.id)}
				.collapse=${this.config.isCollapsible ? "accordion" : "none"}
			>
				${fieldTemplates}
			</f-form-group>

			<slot name="help">
				${this.config.helperText
					? html`<f-text
							variant="para"
							size="small"
							weight="regular"
							data-qa-help-for=${ifDefined(this.config.qaId || this.config.id)}
							.state=${this.config.state ?? "secondary"}
							>${this.config?.helperText}</f-text
					  >`
					: nothing}
			</slot>
		</f-div>`;
	}

	async validate(silent = false) {
		await this.updateComplete;
		const allValidations: FormBuilderValidationPromise[] = [];
		Object.entries(this.config.fields).forEach(([fieldname, fieldConfig]) => {
			if (
				(fieldConfig.type === "object" || fieldConfig.type === "array") &&
				this.fieldRefs[fieldname].value
			) {
				allValidations.push(
					(this.fieldRefs[fieldname].value as FFormInputElements).validate(silent)
				);
				allValidations.push(validateField(fieldConfig, this.fieldRefs[fieldname].value, silent));
			} else {
				if (this.fieldRefs[fieldname]) {
					allValidations.push(
						validateField(
							fieldConfig as CanValidateFields,
							this.fieldRefs[fieldname].value as FFormInputElements,
							silent
						)
					);
				}
			}
		});
		return Promise.all(allValidations);
	}

	/**
	 * updated hook of lit element
	 * @param _changedProperties
	 */
	protected async updated(
		_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
		super.updated(_changedProperties);

		await this.updateComplete;

		Object.entries(this.fieldRefs).forEach(([name, ref]) => {
			if (ref.value) {
				ref.value.showWhenSubject = this.showWhenSubject;
				const fieldValidation = async (event: Event) => {
					event.stopPropagation();
					if (!this.value) {
						this.value = {};
					}
					this.value[name] = ref.value?.value;
					/**
					 * FLOW-903 moving up to avoid race condition
					 */
					if (event.type !== "blur") {
						this.dispatchInputEvent();
					}
					await validateField(
						this.config.fields[name] as CanValidateFields,
						ref.value as FFormInputElements,
						false
					);
				};
				ref.value.oninput = fieldValidation;
				ref.value.onblur = fieldValidation;
				const fieldConfig = this.config.fields[name];
				if (fieldConfig.showWhen) {
					this.showWhenSubject.subscribe(values => {
						if (fieldConfig.showWhen && ref.value) {
							const showField = fieldConfig.showWhen(values);
							if (!showField) {
								ref.value.dataset.hidden = "true";
								const divider = this.shadowRoot?.querySelector<HTMLElement>(
									`#${ref.value.getAttribute("name")}-divider`
								);
								if (divider) {
									divider.dataset.hidden = "true";
								}

								if ((fieldConfig as FormBuilderBaseField).layout === "label-left") {
									const wrapper = ref.value.closest<FDiv>(".label-left-layout");
									if (wrapper) {
										wrapper.dataset.hidden = "true";
									}
								}
							} else {
								ref.value.dataset.hidden = "false";
								const divider = this.shadowRoot?.querySelector<HTMLElement>(
									`#${ref.value.getAttribute("name")}-divider`
								);
								if (divider) {
									divider.dataset.hidden = "false";
								}

								if ((fieldConfig as FormBuilderBaseField).layout === "label-left") {
									const wrapper = ref.value.closest<FDiv>(".label-left-layout");
									if (wrapper) {
										wrapper.dataset.hidden = "false";
									}
								}
							}
							this.dispatchShowWhenExeEvent();
						}
					});
					this.dispatchShowWhenEvent();
				}
			}
		});

		await propogateProperties(this);
	}

	dispatchInputEvent() {
		const input = new CustomEvent("input", {
			detail: this.value,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(input);
	}

	/**
	 * dispatch showWhen event so that root will publish new form values
	 */
	dispatchShowWhenEvent() {
		const showWhen = new CustomEvent("show-when", {
			detail: true,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(showWhen);
	}

	/**
	 * dispatch showWhen event so that root will publish new form values
	 */
	dispatchShowWhenExeEvent() {
		const showWhen = new CustomEvent("show-when-exe", {
			detail: true,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(showWhen);
	}
}
