/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { getStyles, getNode } = require("./api");
const prettier = require("prettier");

const fs = require("fs");

// Constants
const THEME_FLOW_GEN = "f-open-source";
const THEME_OLLION = "f-ollion";

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
			/**
			 * !important added to have highest css specificity if used with flow1
			 */
			scss += `
	[data-theme="${theme}"]{ `;

			for (let [variable, value] of tokenEntries) {
				const cssVariable = `color-${variable}`;
				scss += `$${cssVariable} : ${value} ;\n`;
				scss += `--${cssVariable} : #{$${cssVariable}} !important;\n`;
				scss += `--${cssVariable}-hover : #{getHover($${cssVariable})} !important;\n`;
				scss += `--${cssVariable}-selected : #{getSelected($${cssVariable})} !important;\n`;
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
				singleQuote: false,
				tabWidth: 4,
				parser: "css"
			})
		);
		console.log(`\x1b[32m \r ${tokenFileName} generated  \u2705 \x1b[0m`);
	} catch (e) {
		console.log(e);
	}
}

/**
 * This will generate /src/shared/_text-tokens.scss file and it is consumed in `f-root.scss and one more file to consume this tokens dynamically i.e f-text-variables-dynamic.scss`
 * @param {*} textTokens Json object of variants, weights and size for text.
 */
function generateTextScss(textTokens) {
	const tokenTextFileName = `${__dirname}/../src/components/f-text/_f-text-variables-dynamic.scss`;
	const scssFile = `${__dirname}/../src/mixins/scss/_text-tokens.scss`;
	let scss = "";

	let scssContent = "";

	scssContent += createVariablesSCSS(textTokens[THEME_FLOW_GEN]);
	Object.keys(textTokens).forEach(theme => {
		textTokens[theme].fontFamily.general = textTokens[theme].variants["para"]["medium"].fontFamily;
		textTokens[theme].fontFamily.code = textTokens[theme].variants["code"]["medium"].fontFamily;
		scss += createTokenSCSS(textTokens[theme], theme);
	});

	try {
		fs.writeFileSync(
			scssFile,
			prettier.format(scss, {
				printWidth: 100,
				singleQuote: false,
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
				singleQuote: false,
				tabWidth: 4,
				parser: "css"
			})
		);
		console.log(`\x1b[32m \r ${tokenTextFileName} generated  \u2705 \x1b[0m`);
	} catch (e) {
		console.log(e);
	}
}

/**
 * This will generate /src/shared/_text-tokens.scss file and it is consumed in `f-root.scss and one more file to consume this tokens dynamically i.e f-text-variables-dynamic.scss`
 * @param {*} textStyle Json object from API consisting of text type and styling.
 */
function generateTextTokens(textStyle, textTokens) {
	const {
		name,
		style: { fontSize, lineHeightPx, fontWeight, fontFamily }
	} = textStyle;
	const [theme, tokenName, size, weight] = name.split("/");

	textTokens[theme] ??= {
		variants: {},
		weights: { medium: null, bold: null, regular: null },
		fontFamily: { general: null, code: null }
	};
	textTokens[theme].variants[tokenName] ??= {};
	textTokens[theme].variants[tokenName][size] ??= {
		fontSize,
		lineHeight: lineHeightPx,
		fontFamily: fontFamily
	};

	if (textTokens[theme].variants[tokenName][size].weight === undefined) {
		textTokens[theme].variants[tokenName][size].weight = {
			medium: null,
			bold: null,
			regular: null
		};
	}

	textTokens[theme].variants[tokenName][size].weight[weight] ??= fontWeight;
}

function fontTokenString(category, size) {
	return `--text-${category}-${size}-font`;
}

function lineHeightTokenString(category, size) {
	return `--text-${category}-${size}-lineheight`;
}

function newWeightTokenString(category, size, weight) {
	return `--text-${category}-${size}-${weight}`;
}

function fontFamilyTokenString(category, size) {
	return `--text-${category}-${size}-fontfamily`;
}

/**
 *
 * @param {*} data Json object of variants, weights and size for text
 * @returns scss string formed for creating text-variable file
 */
function createVariablesSCSS(data) {
	const scssContent = Object.keys(data.variants)
		.map(category => {
			const categoryContent = Object.entries(data.variants[category])
				.map(([size, value]) => {
					const fontSizeToken = fontTokenString(category, size);
					const lineHeightToken = lineHeightTokenString(category, size);
					const fontFamilyToken = fontFamilyTokenString(category, size);
					return (
						`\t\t"${size}": (\n` +
						`\t\t\t"fontSize": var(${fontSizeToken}),\n` +
						`\t\t\t"lineHeight": var(${lineHeightToken}),\n` +
						`\t\t\t"weight": (\n` +
						`${Object.keys(value.weight)
							.map(item => {
								const newWeightToken = newWeightTokenString(category, size, item);
								return `\t\t\t\t"${item}": var(${newWeightToken}),\n`;
							})
							.join("")}` +
						`\t\t\t),\n` +
						`\t\t\t"fontFamily": var(${fontFamilyToken})\n` +
						`\t\t),\n`
					);
				})
				.join("");

			return `\t"${category}": (\n${categoryContent}\t),\n`;
		})
		.join("");

	return `\n$variants: (\n${scssContent});\n\n`;
}

/**
 *
 * @param {*} data Json object of variants, weights and size for text
 * @param {*} theme theme for ollion or general flow-core, as we need top create separate tokens with separate values for both diffeent themes.
 * @returns
 */
function createTokenSCSS(data, theme) {
	const themeSelector =
		theme === THEME_OLLION
			? `[data-theme="f-ollion-dark"], [data-theme="f-ollion-light"]`
			: `[data-theme="f-dark"], [data-theme="f-light"]`;

	const scssContent = `
  ${themeSelector} {
    ${generateCategoryStyles(data.variants, theme)};\t\n
	--flow-font: ${createFontFamily("para", data.fontFamily.general)};\t\n
	--flow-code-font: ${createFontFamily("code", data.fontFamily.code)};\t\n
  }\n`;

	return scssContent;
}

/**
 *
 * @param {*} variants json object for variants of text and their font-sizes
 * @returns stringified scss tokens for texts
 */
function generateCategoryStyles(variants, theme) {
	return Object.keys(variants)
		.map(category => generateSizeStyles(category, variants[category], theme))
		.join("");
}

/**
 *
 * @param {*} category variant for the fontfamily
 * @param {*} fontFamily name of font
 * @returns proper font-family string creation
 */
function createFontFamily(category, fontFamily) {
	return category === "code"
		? `"${fontFamily}", monospace`
		: `"${fontFamily}", "Montserrat", sans-serif`;
}

/**
 *
 * @param {*} category category includes - para, code, heading
 * @param {*} sizes sizes values are different for every category
 * @returns stringified scss tokens for text variants
 */
function generateSizeStyles(category, sizes, theme) {
	return Object.keys(sizes)
		.map(size => {
			const { fontSize, lineHeight, weight, fontFamily } = sizes[size];
			return `${fontTokenString(category, size)}: ${fontSize}px;\t\n
			${lineHeightTokenString(category, size)}: ${
				theme === THEME_OLLION
					? `${category === "heading" ? 1.2 : 1.4}`
					: `${Math.ceil(lineHeight)}px`
			};\t\n
			${generateWeightStyles(weight, category, size)}
			${fontFamilyTokenString(category, size)}: ${createFontFamily(category, fontFamily)};\t\n
			`;
		})
		.join("");
}

/**
 *
 * @param {*} weights weights json holds - bold, medium, regular
 * @returns stringified scss tokens for text weights
 */
function generateWeightStyles(weight, category, size) {
	return Object.entries(weight)
		.map(([w, value]) => {
			return `
						${newWeightTokenString(category, size, w)}: ${Math.round(value)};\t\n
			`;
		})
		.join("");
}

/**
 *
 * @param {*} theme theme present is for ollion of general-flow-core
 * @param {*} nodeIds list of nodeids
 * @param {*} colorTokens Json object of theme and color variables
 * @param {*} textTokens Json object of variants, weights and size for text.
 */
async function processStyles(nodeIds, colorTokens, textTokens) {
	try {
		const nodes = await getNode(nodeIds.join(","));

		for (const [_id, obj] of Object.entries(nodes.data.nodes)) {
			const textTheme = obj.document.name.split("/")[0];
			if (
				obj.document.type === "TEXT" &&
				(textTheme === THEME_FLOW_GEN || textTheme === THEME_OLLION)
			) {
				generateTextTokens(obj.document, textTokens);
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
	} catch (error) {
		console.error(`Error processing styles:`, error);
		throw error;
	}
}

/**
 * Get document of specified file Id
 */
async function generateStyles() {
	const colorTokens = {};
	const textTokens = {};

	try {
		const response = await getStyles();
		const nodeids1 = response.data.meta.styles.map(element => element.node_id);

		// Process and update colorTokens for the first set
		await processStyles(nodeids1, colorTokens, textTokens);

		console.log("\n");
		generateTokenScss(colorTokens);
		generateTextScss(textTokens);
	} catch (error) {
		console.error(error);
	}
}

generateStyles();
