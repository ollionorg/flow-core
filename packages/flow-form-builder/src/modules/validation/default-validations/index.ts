import { FormBuilderValidationRules } from "../../../types";
import { isEmpty, isValidEmail, isValidUrl } from "../../../modules/utils";

export default function defaultValidations(
	fieldType: string,
	validations: FormBuilderValidationRules
) {
	if (fieldType === "email") {
		validations.push({
			name: "custom",
			message: "Please Enter a valid Email Address",
			validate: (value: unknown) => {
				return isEmpty(value) ? true : Boolean(isValidEmail(value as string));
			}
		});
	}
	if (fieldType === "url") {
		validations.push({
			name: "custom",
			message: "Please Enter a valid URL",
			validate: (value: unknown) => {
				return isEmpty(value) ? true : isValidUrl(value as string);
			}
		});
	}
}
