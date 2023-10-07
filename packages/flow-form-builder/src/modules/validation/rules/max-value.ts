import { getSingleParam, isEmpty } from "./../../utils";
import { FormBuilderValidatorFunction } from "../../../types";

export type MaxValueParams = {
	max: number;
};

const maxValueValidator: FormBuilderValidatorFunction<unknown, MaxValueParams> = (
	value,
	params
): boolean => {
	if (isEmpty(value)) {
		return true;
	}

	const max = getSingleParam(params as MaxValueParams, "max");
	if (Array.isArray(value)) {
		return value.length > 0 && value.every(val => maxValueValidator(val, { max }));
	}

	return Number(value) <= Number(max);
};

export default maxValueValidator;
