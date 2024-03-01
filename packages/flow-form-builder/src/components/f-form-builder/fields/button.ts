import { html } from "lit";
import {
	FFormInputElements,
	FormBuilderBaseField,
	FormBuilderButtonField,
	FormBuilderField
} from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { getAriaLabel } from "../../../modules/utils";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>
) {
	const field = _field as FormBuilderButtonField;

	return html`
		<f-button
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			aria-label="${getAriaLabel(field as unknown as FormBuilderBaseField) ?? name}"
			name=${name}
			data-qa-element-id=${field.qaId || field.id}
			${ref(fieldRef)}
			.state=${field.state ?? "primary"}
			.label=${ifDefined(field.label)}
			.iconLeft=${ifDefined(field.iconLeft)}
			.iconRight=${ifDefined(field.iconRight)}
			.counter=${ifDefined(field.counter)}
			.variant=${ifDefined(field.variant)}
			.category=${ifDefined(field.category)}
			.size=${ifDefined(field.size)}
			?disabled=${field.disabled ?? false}
			?loading=${field.loading ?? false}
			@click=${ifDefined(field.onClick)}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
			@mouseleave=${ifDefined(field.onMouseLeave)}
		>
		</f-button>
	`;
}
