import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderDatetimeField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { getLabelLeftLayout, getSlots } from "../../../modules/helpers";
import { getAriaLabel } from "../../../modules/utils";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderDatetimeField;
	const fieldHtml = html`
		<f-date-time-picker
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			aria-label="${getAriaLabel(field) ?? name}"
			name=${name}
			.type=${field.type}
			${ref(fieldRef)}
			.placeholder=${field.placeholder}
			.value=${value}
			data-qa-element-id=${field.qaId || field.id}
			state=${ifDefined(field.state)}
			mode=${ifDefined(field.mode)}
			.min-date=${field.minDate}
			.max-date=${field.maxDate}
			.disable-date=${field.disableDate}
			.is-range=${field.isRange}
			.week-number=${field.weekNumber}
			?inline=${field.inline ?? false}
			?loading=${field.loading ?? false}
			?disabled=${field.disabled ?? false}
			?clear=${field.clear ?? true}
			@click=${ifDefined(field.onClick)}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
		>
			${getSlots(name, field)}
		</f-date-time-picker>
	`;
	if (field.layout === "label-left") {
		return getLabelLeftLayout(field, fieldHtml);
	}
	return fieldHtml;
}
