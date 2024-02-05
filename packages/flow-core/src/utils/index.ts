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
	let result = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
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
