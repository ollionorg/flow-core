import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderTextAreaField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { getSlots } from "../../../modules/helpers";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderTextAreaField;
	return html`
		<f-text-area
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			name=${name}
			${ref(fieldRef)}
			.value=${value}
			.placeholder=${field.placeholder}
			max-length=${ifDefined(field?.maxLength)}
			data-qa-element-id=${field.qaId || field.id}
			?disabled=${field?.disabled ?? false}
			?clear=${field?.clear ?? true}
			?read-only=${field?.readonly ?? false}
			?resizable=${field?.resizable ?? false}
			?mask-value=${field?.maskValue ?? false}
			rows=${ifDefined(field?.rows)}
			@click=${ifDefined(field.onClick)}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
		>
			${getSlots(name, field)}
		</f-text-area>
	`;
}
