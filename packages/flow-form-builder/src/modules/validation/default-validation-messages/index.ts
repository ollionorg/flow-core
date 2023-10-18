const messages: Record<string, string> = {
	required: "{{name}} is a required field",
	email: "{{name}} is not a valid email address",
	between: "{{name}} must be between {{min}} and {{max}}",
	min: "{{name}} must be at least {{length}} characters long",
	max: "{{name}} can be max {{length}} characters long",
	["min-value"]: "{{name}} must be greater than or equal to {{min}}",
	["max-value"]: "{{name}} must be less than or equal to {{max}}",
	regex: "{{name}} is not matching with {{regex}}"
};

export default messages;
