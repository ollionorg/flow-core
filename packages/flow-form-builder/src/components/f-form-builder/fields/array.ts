import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderArrayField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderArrayField;
	return html`
		<f-form-array
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			name=${name}
			data-qa-id=${field.qaId || field.id}
			${ref(fieldRef)}
			.config=${field}
			.value=${value}
			state=${ifDefined(field.state)}
			@click=${ifDefined(field.onClick)}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
		>
		</f-form-array>
	`;
}
