import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderRadioField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { getSlots } from "../../../modules/helpers";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderRadioField;

	return html`
		<f-radio-group
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			name=${name}
			data-qa-element-id=${field.qaId || field.id}
			${ref(fieldRef)}
			.options=${field.options}
			.value=${value}
			state=${ifDefined(field.state)}
			direction=${ifDefined(field.direction)}
			gap=${ifDefined(field.gap)}
			.disabled=${ifDefined(field.disabled)}
			@click=${ifDefined(field.onClick)}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
		>
			${getSlots(name, field)}
		</f-radio-group>
	`;
}
