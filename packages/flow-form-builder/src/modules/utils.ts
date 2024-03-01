import { FormBuilderBaseField } from "../types";

export function isEmptyObject(obj: Record<string, unknown>) {
	return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
}

export function isNullOrUndefined(value: unknown): value is undefined | null {
	return value === null || value === undefined;
}

export function isEmptyArray(arr: unknown): boolean {
	return Array.isArray(arr) && arr.length === 0;
}

export function isValidEmail(email: string) {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
}

export function isValidHttpUrl(stringurl: string) {
	let url;

	try {
		url = new URL(stringurl);
	} catch (_) {
		return false;
	}
	return url.protocol === "http:" || url.protocol === "https:";
}

export function isValidUrl(stringurl: string) {
	try {
		new URL(stringurl);
	} catch (_) {
		return false;
	}
	return true;
}
export function getSingleParam<TParam = unknown>(
	params: [TParam] | Record<string, TParam>,
	paramName: string
) {
	return Array.isArray(params) ? params[0] : params[paramName];
}

export function isEmpty(value: unknown): boolean {
	if (value === null || value === undefined || value === "") {
		return true;
	}

	if (Array.isArray(value) && value.length === 0) {
		return true;
	}

	return false;
}

export function isAllNullOrUndefined(value: Array<unknown>) {
	return value.every(v => isNullOrUndefined(v));
}

export function getAriaLabel(field: FormBuilderBaseField) {
	if (field.ariaLabel) {
		return field.ariaLabel;
	}

	if (field.label && typeof field.label.title === "string") {
		return field.label.title;
	}

	return undefined;
}
