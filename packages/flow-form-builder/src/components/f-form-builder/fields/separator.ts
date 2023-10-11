import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderSeparatorField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>
) {
	const field = _field as FormBuilderSeparatorField;
	return html`
		<f-field-separator
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			name=${name}
			data-qa-id=${field.qaId || field.id}
			${ref(fieldRef)}
			.label=${field.title}
			.state=${field.state}
			.direction=${field.direction}
			@click=${ifDefined(field.onClick)}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
		>
		</f-field-separator>
	`;
}
