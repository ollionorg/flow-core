import type { FormBuilderValidatorFunction } from "../../../types";
import required from "./required";
import email from "./email";
import between from "./between";
import max from "./max";
import min from "./min";
import minValue from "./min-value";
import maxValue from "./max-value";
import regex from "./regex";

const all: Record<string, FormBuilderValidatorFunction<unknown, any>> = {
	required,
	email,
	between,
	max,
	min,
	["min-value"]: minValue,
	["max-value"]: maxValue,
	regex
};

export default all;
