import { html } from "lit";
import { FFormInputElements, FormBuilderColorPickerField, FormBuilderField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { getSlots } from "../../../modules/helpers";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderColorPickerField;
	return html`
		<f-color-picker
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			name=${name}
			${ref(fieldRef)}
			.value=${value}
			data-qa-element-id=${field.qaId || field.id}
			state=${ifDefined(field.state)}
			?disabled=${field.disabled ?? false}
			?read-only=${field.readOnly ?? false}
			@click=${ifDefined(field.onClick)}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
		>
			${getSlots(name, field)}
		</f-color-picker>
	`;
}
