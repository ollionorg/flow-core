import { validateHTMLColorName } from "validate-color";
import getColourNameToHex from "./get-hex-color";

export default function getCustomFillColor(state: string) {
	let fill = "";
	if (state && state.includes("custom")) {
		const croppedValues = state.split(",").map(function (value) {
			return value.trim();
		});
		fill = croppedValues[1];
		if (validateHTMLColorName(fill)) {
			fill = getColourNameToHex(fill);
		}
	}
	return fill;
}
