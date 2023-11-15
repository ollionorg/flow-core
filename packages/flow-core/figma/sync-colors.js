/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { getStyles, getNode } = require("./api");
const prettier = require("prettier");

const fs = require("fs");

// Constants
const THEME_FLOW_GEN = "flow-gen";
const THEME_OLLION = "ollion";

const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

/**
 * This will generate /src/shared/_color-tokens.scss file and it is consumed in `f-root.scss`
 * @param {*} colorTokens Json object of theme and color variables
 */
function generateTokenScss(colorTokens) {
	const tokenFileName = `${__dirname}/../src/mixins/scss/_color-tokens.scss`;

	//   let scss = `@layer default,custom;
	// @layer default { `;
	let scss = `
  @function getHover($value) {
	$hover-color: lighten($value, 5%);
	@if lightness($value) > 50 {
	  $hover-color: darken($value, 10%);
	}
	@return $hover-color;
  } 
  @function getSelected($value) {
    $hover-color: lighten($value, 10%);
    @if lightness($value) > 50 {
        $hover-color: darken($value, 20%);
    }
    @return $hover-color;
}
  `;
	for (const [theme, tokens] of Object.entries(colorTokens)) {
		if (
			theme === "f-dark" ||
			theme === "f-light" ||
			theme === "f-ollion-dark" ||
			theme === "f-ollion-light"
		) {
			const tokenEntries = Object.entries(tokens);

			scss += `
	[data-theme="${theme}"]{ `;

			for (let [variable, value] of tokenEntries) {
				const cssVariable = `color-${variable}`;
				scss += `$${cssVariable} : ${value} ;\n`;
				scss += `--${cssVariable} : #{$${cssVariable}} ;\n`;
				scss += `--${cssVariable}-hover : #{getHover($${cssVariable})};\n`;
				scss += `--${cssVariable}-selected : #{getSelected($${cssVariable})};\n`;
			}
			scss += `
};\n`;
		}
	}
	//   scss += `}`;
	try {
		fs.writeFileSync(
			tokenFileName,
			prettier.format(scss, {
				printWidth: 100,
				singleQuote: true,
				tabWidth: 4,
				parser: "css"
			})
		);
		console.log(`\x1b[32m \r ${tokenFileName} generated  \u2705 \x1b[0m`);
	} catch (e) {
		console.log(e);
	}
}

function generateTextScss(textTokens) {
	const tokenTextFileName = `${__dirname}/../src/components/f-text/_f-text-variables-dynamic.scss`;
	const scssFile = `${__dirname}/../src/mixins/scss/_text-tokens.scss`;
	let scss = "";

	let scssContent = "";
	scssContent += convertToSCSSSyntax(textTokens[THEME_FLOW_GEN]);
	Object.keys(textTokens).forEach(theme => {
		scss += createTokenSCSS(textTokens[theme], theme);
	});

	try {
		fs.writeFileSync(
			scssFile,
			prettier.format(scss, {
				printWidth: 100,
				singleQuote: true,
				tabWidth: 4,
				parser: "css"
			})
		);
		console.log(`\x1b[32m \r ${scssFile} generated  \u2705 \x1b[0m`);
	} catch (e) {
		console.log(e);
	}

	try {
		fs.writeFileSync(
			tokenTextFileName,
			prettier.format(scssContent, {
				printWidth: 100,
				singleQuote: true,
				tabWidth: 4,
				parser: "css"
			})
		);
		console.log(`\x1b[32m \r ${tokenTextFileName} generated  \u2705 \x1b[0m`);
	} catch (e) {
		console.log(e);
	}
}

function generateTextTokens(textStyle, variants, weights, fontFamily) {
	const text = textStyle.name.split("/");
	const name = text[0];
	const size = text[1];
	const weight = text[2];
	const styling = textStyle.style;

	if (!(name in variants)) {
		variants[name] = {};
	}
	if (!(size in variants[name])) {
		variants[name][size] = { fontSize: styling.fontSize, lineHeight: styling.lineHeightPx };
	}

	if (!(weight in weights)) {
		weights[weight] = styling.fontWeight;
	}

	if (!("general" in fontFamily)) {
		if (name !== "code") {
			fontFamily.general = styling.fontFamily;
		}
	}
	if (!("code" in fontFamily)) {
		if (name === "code") {
			fontFamily.code = styling.fontFamily;
		}
	}
}

function convertToSCSSSyntax(data) {
	let scssContent = `\n$variants: (\n`;

	Object.keys(data.variants).forEach(category => {
		scssContent += `\t"${category}": (\n`;

		Object.keys(data.variants[category]).forEach(size => {
			scssContent += `\n\t\t"${size}": (\n`;
			scssContent += `\t\t\t"fontSize": var(${fontTokenString(category, size)}),\n`;
			scssContent += `\t\t\t"lineHeight": var(${lineHeightTokenString(category, size)})\n`;
			scssContent += `\t\t),\n`;
		});

		scssContent += `\t),\n`;
	});

	scssContent += `);`;

	scssContent += `\n$weights: (\n`;

	Object.keys(data.weights).forEach((key, index, array) => {
		scssContent += `\t"${key}": var(${weightTokenString(key)})`;

		if (index !== array.length - 1) {
			scssContent += ",";
		}

		scssContent += "\n";
	});

	scssContent += `);\n`;

	return scssContent;
}

function fontTokenString(category, size) {
	return `--text-${category}-${size}-font`;
}

function lineHeightTokenString(category, size) {
	return `--text-${category}-${size}-lineheight`;
}

function weightTokenString(key) {
	return `--text-${key}-weight`;
}

function createTokenSCSS(data, theme) {
	let scssContent =
		theme === THEME_OLLION
			? `[data-theme="f-ollion-dark"], [data-theme="f-ollion-light"] {\n`
			: `[data-theme="f-dark"], [data-theme="f-light"] {\n`;

	Object.keys(data.variants).forEach(category => {
		Object.keys(data.variants[category]).forEach(size => {
			const { fontSize, lineHeight } = data.variants[category][size];
			scssContent += `${fontTokenString(category, size)} : ${fontSize}px;\t\n`;
			scssContent += `${lineHeightTokenString(category, size)} : ${Math.round(lineHeight)}px;\t\n`;
		});
	});

	Object.keys(data.weights).forEach(key => {
		scssContent += `${weightTokenString(key)} : ${data.weights[key]};\t\n`;
	});

	scssContent += `--flow-font : ${
		theme === THEME_OLLION ? `"${data.fontFamily.general}", serif` : `"Montserrat", sans-serif`
	};\t\n`;
	scssContent += `--flow-code-font : ${
		theme === THEME_OLLION ? `"${data.fontFamily.code}", monospace` : `"Courier Prime", monospace`
	};\t\n`;

	scssContent += `\n}\n`;

	return scssContent;
}

/**
 * Get document of specified file Id
 */
async function processStyles(theme, nodeIds, colorTokens, textTokens) {
	try {
		const nodes = await getNode(nodeIds.join(","), theme);
		const variants = {};
		const weights = {};
		const fontFamily = {};

		for (const [_id, obj] of Object.entries(nodes.data.nodes)) {
			if (obj.document.type === "TEXT") {
				generateTextTokens(obj.document, variants, weights, fontFamily);
			} else {
				if (obj.document.fills[0].color) {
					const { r, g, b } = obj.document.fills[0].color;
					const [currentTheme, token] = obj.document.name.split("/");

					if (!colorTokens[currentTheme]) {
						colorTokens[currentTheme] = {};
					}

					colorTokens[currentTheme][token] = rgbToHex(
						+(r * 255).toFixed(0),
						+(g * 255).toFixed(0),
						+(b * 255).toFixed(0)
					);
				}
			}
		}
		if (theme === THEME_OLLION) {
			if (!(THEME_OLLION in textTokens)) {
				textTokens[THEME_OLLION] = { variants: variants, weights: weights, fontFamily: fontFamily };
			}
		} else {
			if (!(THEME_FLOW_GEN in textTokens)) {
				textTokens[THEME_FLOW_GEN] = {
					variants: variants,
					weights: weights,
					fontFamily: fontFamily
				};
			}
		}
	} catch (error) {
		console.error(`Error processing styles for ${theme}:`, error);
		throw error;
	}
}

async function generateStyles() {
	const colorTokens = {};
	const textTokens = {};

	try {
		const [response1, response2] = await Promise.all([getStyles(), getStyles(THEME_OLLION)]);

		const nodeids1 = response1.data.meta.styles.map(element => element.node_id);
		const nodeids2 = response2.data.meta.styles.map(element => element.node_id);

		// Process and update colorTokens for the first set
		await processStyles(THEME_FLOW_GEN, nodeids1, colorTokens, textTokens);

		// Process and update colorTokens for the second set
		await processStyles(THEME_OLLION, nodeids2, colorTokens, textTokens);

		console.log("\n");
		generateTokenScss(colorTokens);
		generateTextScss(textTokens);
	} catch (error) {
		console.error(error);
	}
}

generateStyles();
