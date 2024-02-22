import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderTextInputField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { getLabelLeftLayout, getSlots } from "../../../modules/helpers";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderTextInputField;
	const fieldHtml = html`
		<f-input
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			aria-label="${field.label?.title ?? name}"
			name=${name}
			.type=${field.type}
			${ref(fieldRef)}
			.placeholder=${field.placeholder}
			.value=${value}
			data-qa-element-id=${field.qaId || field.id}
			icon-left=${ifDefined(field.iconLeft)}
			icon-right=${ifDefined(field.iconRight)}
			prefix=${ifDefined(field.prefix)}
			suffix=${ifDefined(field.suffix)}
			state=${ifDefined(field.state)}
			.suffixWhen=${field.suffixWhen}
			max-length=${ifDefined(field.maxLength)}
			?loading=${field.loading ?? false}
			?disabled=${field.disabled ?? false}
			?clear=${field.clear ?? true}
			?read-only=${field.readonly ?? false}
			@click=${ifDefined(field.onClick)}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
			autofocus=${ifDefined(field.autofocus)}
			autocomplete=${ifDefined(field.autocomplete)}
		>
			${getSlots(name, field)}
		</f-input>
	`;
	if (field.layout === "label-left") {
		return getLabelLeftLayout(field, fieldHtml);
	}
	return fieldHtml;
}
