import {
	CanValidateFields,
	FFormInputElements,
	FormBuilderAsyncValidatorFunction,
	FormBuilderField,
	FormBuilderGenericValidationRule,
	FormBuilderLabel,
	FormBuilderValidationPromise,
	FormBuilderValidationRules,
	FormBuilderValidatorFunction,
	ValidationResult,
	ValidationResults
} from "../../types";

import rules from "./rules";
import defaultMessages from "./default-validation-messages";
import {
	FButton,
	FDateTimePicker,
	FFileUpload,
	FIconButton,
	FInput,
	FInputLight,
	FSelect,
	FSuggest
} from "@nonfx/flow-core";
import defaultValidations from "./default-validations";
import { render } from "lit-html";
type FormBuilderValidationRuleWithPrivateFields = {
	_lastValue?: string;
	_lastResult?: boolean;
} & FormBuilderGenericValidationRule;
export default async function validate(
	value: string,
	elementRules: FormBuilderValidationRuleWithPrivateFields[],
	name: string,
	element: FFormInputElements | FInputLight | undefined
) {
	let result = true;
	let message = null;
	let rule!: FormBuilderGenericValidationRule["name"];
	if (elementRules) {
		for (const r of elementRules) {
			/**
			 * This will avoid validation rules called multiple time in silent validation
			 */
			if (r._lastValue === value && r._lastResult !== undefined && typeof value !== "object") {
				result = r._lastResult;
				if (!result) {
					rule = r.name;
					message = getValidationMessage(r, { name, value });
					break;
				}
			} else {
				r._lastValue = value;
				if (r.name !== "custom") {
					result = rules[r.name](value, r.params);
					r._lastResult = result;
					if (!result) {
						rule = r.name;
						message = getValidationMessage(r, { name, value });
						break;
					}
				} else {
					if (isAsync(r.validate)) {
						// this if statement is added to avoid multiple validation calls

						if (
							element instanceof FInput ||
							element instanceof FInputLight ||
							element instanceof FSelect ||
							element instanceof FDateTimePicker ||
							element instanceof FFileUpload ||
							element instanceof FSuggest
						) {
							element.loading = true;
						}
						// holding last value

						result = await r.validate(value, { ...r.params, element });
						r._lastResult = result;
						if (
							element instanceof FInput ||
							element instanceof FInputLight ||
							element instanceof FSelect ||
							element instanceof FDateTimePicker ||
							element instanceof FFileUpload ||
							element instanceof FSuggest
						) {
							element.loading = false;
						}
					} else {
						result = r.validate(value, { ...r.params, element }) as boolean;
						r._lastResult = result;
					}
					if (!result) {
						rule = r.name;
						message = getValidationMessage(r, { name, value });
						break;
					}
				}
			}
		}
	}

	return {
		result,
		message,
		rule,
		name
	};
}

function processCustomMessage(message: string, params: Record<string, string>) {
	for (const prop in params) {
		message = message.replace(new RegExp("{{" + prop + "}}", "g"), params[prop]);
	}
	return message;
}

function getValidationMessage(
	r: FormBuilderGenericValidationRule,
	{ name, value }: Record<string, string>
): string {
	if (r.message) {
		if (typeof r.message === "function") {
			return r.message(name, value);
		}

		return processCustomMessage(r.message, {
			name,
			value,
			...(r.params as Record<string, string>)
		});
	} else if (defaultMessages[r.name]) {
		return processCustomMessage(defaultMessages[r.name], {
			name,
			value,
			...(r.params as Record<string, string>)
		});
	} else {
		return "Validation failed";
	}
}

export async function validateField(
	field: CanValidateFields,
	element: FFormInputElements | FInputLight | undefined,
	silent = false,
	filter?: (r: FormBuilderGenericValidationRule) => boolean
): FormBuilderValidationPromise {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars

	let rulesToValidate = field.validationRules?.filter(filter ? filter : () => true);
	if (!rulesToValidate) {
		rulesToValidate = [];
	}

	defaultValidations(field.type, rulesToValidate);
	if (element && rulesToValidate.length > 0 && element.getAttribute("data-hidden") !== "true") {
		let fieldName = element.getAttribute("name") ?? "This";
		if (typeof (field.label as FormBuilderLabel)?.title === "string") {
			fieldName = (field.label as FormBuilderLabel)?.title as string;
		}
		const { result, message, rule, name } = await validate(
			(element.value as string) ?? "",
			rulesToValidate as FormBuilderValidationRules,
			fieldName,
			element
		);

		if (!result && message && element.offsetHeight > 0) {
			if (!silent) {
				updateMessage(element, message, field, "data-qa-error-for");
				element.state = "danger";
				element.setAttribute("aria-invalid", "true");
			}
		} else {
			element.setAttribute("aria-invalid", "false");
			const helpSlot = element.querySelector("[slot='help']");
			if (field.helperText) {
				if (typeof field.helperText === "string") {
					updateMessage(element, field.helperText, field, "data-qa-help-for");
				} else if (typeof field.helperText === "object") {
					updateMessage(element, "", field, "data-qa-help-for");
					const helpSlotToUpdate = element.querySelector<HTMLElement>("[slot='help']");

					if (helpSlotToUpdate) render(field.helperText, helpSlotToUpdate);
				}
			} else if (helpSlot) {
				helpSlot.remove();
			}

			if (field.state) {
				element.state = field.state as "primary" | "default" | "success" | "warning" | "danger";
			} else if (!(element instanceof FButton) && !(element instanceof FIconButton)) {
				element.state = "default";
			}
		}
		return { result, message, rule, name, label: field.label };
	}
	return {
		result: true,
		message: "NA",
		rule: "custom",
		name: "NA",
		label: field.label
	};
}

function updateMessage(
	element: HTMLElement,
	message: string,
	field: FormBuilderField,
	qaAttribute: string
) {
	const helpSlot = element.querySelector<HTMLSlotElement>("[slot='help']");
	if (helpSlot) {
		helpSlot.remove();
	}

	const newHelpSlot = document.createElement("f-div");
	newHelpSlot.setAttribute("slot", "help");
	newHelpSlot.setAttribute(qaAttribute, field.qaId || field.id || "");
	newHelpSlot.innerText = message;
	element.appendChild(newHelpSlot);
}

export function extractValidationState(allResults: ValidationResults) {
	const errors: ValidationResult[] = [];
	allResults.forEach(rs => {
		if (!Array.isArray(rs) && !rs.result) {
			errors.push(rs);
		} else if (Array.isArray(rs)) {
			errors.push(...extractValidationState(rs));
		}
	});

	return errors;
}

function isAsync(func: FormBuilderValidatorFunction | FormBuilderAsyncValidatorFunction) {
	if (func.constructor && func.constructor.name === "AsyncFunction") {
		return true;
	}
	return false;
}
