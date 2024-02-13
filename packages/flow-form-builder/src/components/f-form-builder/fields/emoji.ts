import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderEmojiField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { getLabelLeftLayout, getSlots } from "../../../modules/helpers";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderEmojiField;
	const fieldHtml = html`
		<f-emoji-picker
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			name=${name}
			${ref(fieldRef)}
			.placeholder=${field.placeholder}
			value=${value}
			.state=${ifDefined(field.state)}
			data-qa-element-id=${field.qaId || field.id}
			?disabled=${field.disabled ?? false}
			.clear=${field.clear ? true : false}
			.recent=${ifDefined(field.recent)}
			.include="${ifDefined(field.include)};"
			.exclude="${ifDefined(field.exclude)};"
			.exclude-emojis=${ifDefined(field.excludeEmojis)}
			.custom=${ifDefined(field.custom)}
			?close-on-select=${field.closeOnSelect ?? true}
			@click=${(e: PointerEvent) => {
				e.stopPropagation();
				if (field.onClick) {
					field.onClick(e);
				}
			}}
			@mouseup=${(e: PointerEvent) => {
				e.stopPropagation();
			}}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
		>
			${getSlots(name, field)}
		</f-emoji-picker>
	`;
	if (field.layout === "label-left") {
		return getLabelLeftLayout(field, fieldHtml);
	}
	return fieldHtml;
}
