import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderSelectField } from "../../../types";
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
	const field = _field as FormBuilderSelectField;
	const fieldHtml = html`
		<f-select
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			aria-label="${getAriaLabel(field) ?? name}"
			name=${name}
			${ref(fieldRef)}
			.placeholder=${field.placeholder}
			.type=${field.selection ?? "single"}
			.state=${field.state ?? "default"}
			?searchable=${field.searchable}
			.options=${field.options}
			.value=${value}
			?checkbox=${field.checkbox}
			.clear=${field.clear}
			.width=${field.width}
			.maxOptionsWidth=${field.maxOptionsWidth}
			.useVirtualizer=${field.useVirtualizer}
			data-qa-element-id=${ifDefined(field.qaId || field.id)}
			height=${ifDefined(field.height)}
			?disabled=${field.disabled}
			selection-limit=${ifDefined(field.selectionLimit)}
			?create-option=${field.createOption}
			?loading=${field.loading ?? false}
			.optionTemplate=${field.optionTemplate}
			icon-left=${ifDefined(field.iconLeft)}
			@click=${field.onClick}
			@focus=${field.onFocus}
			@input=${field.onInput}
			@keypress=${field.onKeyPress}
			@keydown=${field.onKeyDown}
			@keyup=${field.onKeyUp}
			@mouseover=${field.onMouseOver}
		>
			${getSlots(name, field)}
		</f-select>
	`;
	if (field.layout === "label-left") {
		return getLabelLeftLayout(field, fieldHtml);
	}
	return fieldHtml;
}
