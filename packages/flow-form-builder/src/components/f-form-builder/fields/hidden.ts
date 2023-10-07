import { html } from "lit";
import { FFormInputElements, FormBuilderHiddenField, FormBuilderField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderHiddenField;
	return html`
		<input
			type="hidden"
			name=${name}
			data-qa-id=${field.qaId || field.id}
			${ref(fieldRef)}
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			value=${value}
		/>
	`;
}
