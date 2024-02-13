import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderSuggestField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { getLabelLeftLayout, getSlots } from "../../../modules/helpers";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderSuggestField;
	const fieldHtml = html`
		<f-suggest
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			name=${name}
			${ref(fieldRef)}
			.placeholder=${field.placeholder}
			.value=${value}
			icon-left=${ifDefined(field.iconLeft)}
			icon-right=${ifDefined(field.iconRight)}
			prefix=${ifDefined(field.prefix)}
			suffix=${ifDefined(field.suffix)}
			state=${ifDefined(field.state)}
			data-qa-element-id=${field.qaId || field.id}
			.suggestions=${field.suggestions}
			.suffixWhen=${field.suffixWhen}
			.suggestWhen=${ifDefined(field.suggestWhen)}
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
		>
			${getSlots(name, field)}
		</f-suggest>
	`;
	if (field.layout === "label-left") {
		return getLabelLeftLayout(field, fieldHtml);
	}

	return fieldHtml;
}
