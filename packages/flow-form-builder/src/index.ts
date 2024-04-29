import { FCheckboxGroup } from "./components/f-checkbox-group/f-checkbox-group";
import { FRadioGroup } from "./components/f-radio-group/f-radio-group";
import { FFormArray } from "./components/f-form-array/f-form-array";
import { FFormObject } from "./components/f-form-object/f-form-object";
import { FFieldSeparator } from "./components/f-field-separator/f-field-separator";
import { FFormBuilder } from "./components/f-form-builder/f-form-builder";

export * from "./types";
export * from "./components/f-checkbox-group/f-checkbox-group";
export * from "./components/f-radio-group/f-radio-group";
export * from "./components/f-form-array/f-form-array";
export * from "./components/f-form-object/f-form-object";
export * from "./components/f-field-separator/f-field-separator";
export * from "./components/f-form-builder/f-form-builder";

export { validateField } from "./modules/validation/validator";

export { html } from "lit";

export const flowFormBuilderElements = [
	FCheckboxGroup,
	FRadioGroup,
	FFormArray,
	FFormObject,
	FFieldSeparator,
	FFormBuilder
];
