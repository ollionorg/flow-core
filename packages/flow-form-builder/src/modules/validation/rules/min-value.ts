import { getSingleParam, isEmpty } from "./../../utils";
import { FormBuilderValidatorFunction } from "../../../types";

export type MinValueParams = {
	min: number;
};
const minValueValidator: FormBuilderValidatorFunction<unknown, MinValueParams> = (
	value,
	params
): boolean => {
	if (isEmpty(value)) {
		return true;
	}

	const min = getSingleParam(params as MinValueParams, "min");
	if (Array.isArray(value)) {
		return value.length > 0 && value.every(val => minValueValidator(val, { min }));
	}

	return Number(value) >= Number(min);
};

export default minValueValidator;
