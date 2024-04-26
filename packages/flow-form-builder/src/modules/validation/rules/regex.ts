import { getSingleParam, isEmpty } from "./../../utils";
import type { FormBuilderValidatorFunction } from "../../../types";

export type RegexParams = {
	regex: RegExp | string;
};
const regexValidator: FormBuilderValidatorFunction<unknown, RegexParams> = (
	value,
	params
): boolean => {
	if (isEmpty(value)) {
		return true;
	}

	let regex = getSingleParam(params as RegexParams, "regex");
	if (typeof regex === "string") {
		regex = new RegExp(regex);
	}

	if (Array.isArray(value)) {
		return value.every(val => regexValidator(val, { regex }));
	}

	return regex.test(String(value));
};

export default regexValidator;
