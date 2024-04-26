import { getSingleParam, isEmpty } from "./../../utils";
import type { FormBuilderValidatorFunction } from "../../../types";
export type MinParams = {
	length: number;
};
const minValidator: FormBuilderValidatorFunction<unknown, MinParams> = (value, params): boolean => {
	if (isEmpty(value)) {
		return true;
	}

	const length = getSingleParam(params as MinParams, "length");
	if (Array.isArray(value)) {
		return value.every(val => minValidator(val, { length }));
	}

	return String(value).length >= Number(length);
};

export default minValidator;
