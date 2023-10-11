import { getSingleParam, isEmpty } from "./../../utils";
import { FormBuilderValidatorFunction } from "../../../types";
export type MaxParams = {
	length: number;
};
const maxLengthValidator: FormBuilderValidatorFunction<unknown, MaxParams> = (
	value,
	params
): boolean => {
	if (isEmpty(value)) {
		return true;
	}

	const length = getSingleParam(params as MaxParams, "length");
	if (Array.isArray(value)) {
		return value.every(val => maxLengthValidator(val, { length }));
	}

	return String(value).length <= Number(length);
};

export default maxLengthValidator;
