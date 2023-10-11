const messages: Record<string, string> = {
	required: "{{name}} is a required field",
	email: "{{name}} is not a valid email address",
	between: "{{name}} must be between {{min}} and {{max}}",
	min: "{{name}} must be at least {{length}} characters long",
	max: "{{name}} can be max {{length}} characters long",
	["min-value"]: "{{name}} must be greater than {{min}}",
	["max-value"]: "{{name}} must be less than {{max}}",
	regex: "{{name}} is not matching with {{regex}}"
};

export default messages;
