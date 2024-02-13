import { html } from "lit";
import { FFormInputElements, FormBuilderField, FormBuilderFileField } from "../../../types";
import { Ref, ref } from "lit/directives/ref.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { getLabelLeftLayout, getSlots } from "../../../modules/helpers";
export default function (
	name: string,
	_field: FormBuilderField,
	fieldRef: Ref<FFormInputElements>,
	value: unknown
) {
	const field = _field as FormBuilderFileField;
	const fieldHtml = html`
		<f-file-upload
			id=${ifDefined(field.id)}
			class=${ifDefined(field.className)}
			name=${name}
			data-qa-element-id=${field.qaId || field.id}
			${ref(fieldRef)}
			.placeholder=${field.placeholder ?? "Drag and Drop Files or Click here to upload"}
			.value=${value}
			file-type=${ifDefined(field.fileType)}
			state=${ifDefined(field.state)}
			max-size=${ifDefined(field.maxSize)}
			.type=${field.multiple ? "multiple" : "single"}
			?loading=${field.loading ?? false}
			?disabled=${field.disabled ?? false}
			@click=${ifDefined(field.onClick)}
			@focus=${ifDefined(field.onFocus)}
			@input=${ifDefined(field.onInput)}
			@keypress=${ifDefined(field.onKeyPress)}
			@keydown=${ifDefined(field.onKeyDown)}
			@keyup=${ifDefined(field.onKeyUp)}
			@mouseover=${ifDefined(field.onMouseOver)}
		>
			${getSlots(name, field)}
		</f-file-upload>
	`;
	if (field.layout === "label-left") {
		return getLabelLeftLayout(field, fieldHtml);
	}
	return fieldHtml;
}
