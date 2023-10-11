export default function getTextContrast(hexcolor: string) {
	hexcolor = hexcolor.replace("#", "");
	if (hexcolor.length === 3) {
		hexcolor = hexcolor
			.split("")
			.map(item => {
				return item + item;
			})
			.join("");
	}
	const r = parseInt(hexcolor.substr(0, 2), 16);
	const g = parseInt(hexcolor.substr(2, 2), 16);
	const b = parseInt(hexcolor.substr(4, 2), 16);
	const yiq = (r * 299 + g * 587 + b * 114) / 1000;
	return yiq >= 128 ? "dark-text" : "light-text";
}
