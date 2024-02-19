import isValidHttpUrl from "./is-valid-http-url";
import getTextContrast from "./get-text-contrast";
import getColourNameToHex from "./get-hex-color";
import isValidEmail from "./is-valid-email";
import getCustomFillColor from "./get-custom-fill-color";
import LightenDarkenColor from "./get-lighten-darken-color";
import getFormattedBytes from "./get-formatted-bytes";
import flowElement from "./flow-element";
import getExtensionsFromMimeType from "./mime-extension-map";

function generateId(length = 5) {
	const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const randomValues = new Uint32Array(length);
	let randomString = "";

	// Filling randomValues array with cryptographically strong random values
	window.crypto.getRandomValues(randomValues);

	for (let i = 0; i < length; i++) {
		// Using bitwise AND operation with 63 (111111 in binary) to get an index within the charset length
		randomString += charset[randomValues[i] % charset.length];
	}
	return randomString;
}

export {
	isValidHttpUrl,
	getTextContrast,
	getColourNameToHex,
	isValidEmail,
	getCustomFillColor,
	LightenDarkenColor,
	getFormattedBytes,
	flowElement,
	generateId,
	getExtensionsFromMimeType
};
