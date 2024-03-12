import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderTextInputField } from "../../../types";
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
	const field = _field as FormBuilderTextInputField;
	const fieldHtml = html`
		<f-input
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			aria-label="${getAriaLabel(field) ?? name}"
			name=${name}
			.type=${field.type}
			${ref(fieldRef)}
			.placeholder=${field.placeholder}
			.value=${value}
			data-qa-element-id=${ifDefined(field.qaId || field.id)}
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
			@click=${field.onClick}
			@focus=${field.onFocus}
			@input=${field.onInput}
			@keypress=${field.onKeyPress}
			@keydown=${field.onKeyDown}
			@keyup=${field.onKeyUp}
			@mouseover=${field.onMouseOver}
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
