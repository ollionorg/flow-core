/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { getStyles, getNode } = require("./api");
const prettier = require("prettier");

const fs = require("fs");

const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

/**
 * generate MDX File for Base Colors. base-colors.mdx would be generated.
 * @param {*} colorTokens Json object of theme and color variables
 */
function generateBaseColorMdx(colorTokens) {
	const tokenFileName = `${__dirname}/../figma/base-colors.mdx`;

	let surfaceColors = [];
	let textColors = [];
	let iconColors = [];
	let borderColors = [];

	surfaceColors = compareAndFindTokens(colorTokens, "surface", "base-color");
	textColors = compareAndFindTokens(colorTokens, "text", "base-color");
	iconColors = compareAndFindTokens(colorTokens, "icon", "base-color");
	borderColors = compareAndFindTokens(colorTokens, "border", "base-color");

	let mdxFile = `## Base colors

<f-divider></f-divider>

<br/>

<p>
  The base system is the basic color palette, this is responsible for most elements you see on the
  screen. The base system consists of 4 colors and their derivative colors.
</p>

<br/>

### Surface colors

<f-divider></f-divider>

`;

	mdxFile += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value (light mode)</th>
      <th>Value (dark mode)</th>
    </tr>`;
	for (let i = 0; i < surfaceColors.length; i++) {
		mdxFile += getPreviewColorTable(surfaceColors[i]);
	}
	mdxFile += `
</tbody></table></Preview>

<br/>

### Text Colors

<f-divider></f-divider>

`;

	mdxFile += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value (light mode)</th>
      <th>Value (dark mode)</th>
    </tr>`;
	for (let i = 0; i < textColors.length; i++) {
		mdxFile += getPreviewColorTable(textColors[i]);
	}
	mdxFile += `
</tbody></table></Preview>

<br/>

### Icon Colors

<f-divider></f-divider>

`;

	mdxFile += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value (light mode)</th>
      <th>Value (dark mode)</th>
    </tr>`;
	for (let i = 0; i < iconColors.length; i++) {
		mdxFile += getPreviewColorTable(iconColors[i]);
	}
	mdxFile += `
</tbody></table></Preview>

<br/>

### Border Colors

<f-divider></f-divider>

`;

	mdxFile += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value (light mode)</th>
      <th>Value (dark mode)</th>
    </tr>`;
	for (let i = 0; i < borderColors.length; i++) {
		mdxFile += getPreviewColorTable(borderColors[i]);
	}
	mdxFile += `
</tbody></table></Preview>`;

	try {
		fs.writeFileSync(
			tokenFileName,
			prettier.format(mdxFile, {
				printWidth: 100,
				singleQuote: true,
				tabWidth: 4,
				parser: "mdx"
			})
		);
		console.log(`\x1b[32m \r ${tokenFileName} generated  \u2705 \x1b[0m`);
	} catch (e) {
		console.log(e);
	}
}

/**
 * generate MDX File for System Colors. system-colors.mdx would be generated.
 * @param {*} colorTokens Json object of theme and color variables
 */
function generateSystemColorMdx(colorTokens) {
	const tokenFileName = `${__dirname}/../figma/system-colors.mdx`;

	let primaryColors = [];
	let highlightColors = [];
	let neutralColors = [];
	let successColors = [];
	let warningColors = [];
	let dangerColors = [];

	primaryColors = compareAndFindTokens(colorTokens, "color-primary", "system-color");
	highlightColors = compareAndFindTokens(colorTokens, "color-highlight", "system-color");
	neutralColors = compareAndFindTokens(colorTokens, "color-neutral", "system-color");
	successColors = compareAndFindTokens(colorTokens, "color-success", "system-color");
	warningColors = compareAndFindTokens(colorTokens, "color-warning", "system-color");
	dangerColors = compareAndFindTokens(colorTokens, "color-danger", "system-color");

	mdxFile = `## System colors

<f-divider></f-divider>

<br/>

<p>
    System colors are primarily used for highlighting actionable elements like buttons, links, and to
  convey status like success, warning and danger.
</p>

<br/>

### Primary colors

<f-divider></f-divider>

<p>
  These are the colors that are most frequently used for actions, buttons, links and imparts a
  distinct identity to the product. These are the colors that a brand sets as their identity.
</p>

`;

	mdxFile += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value (light mode)</th>
      <th>Value (dark mode)</th>
    </tr>`;
	for (let i = 0; i < primaryColors.length; i++) {
		mdxFile += getPreviewColorTable(primaryColors[i]);
	}
	mdxFile += `
</tbody></table></Preview>

<br/>

### Highlight Colors

<f-divider></f-divider>

<p class="margin-btm-24">
  These colors highlight or complement the primary color and are to be used sparingly to make
  secondary UI elements stand out.
</p>

`;

	mdxFile += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value (light mode)</th>
      <th>Value (dark mode)</th>
    </tr>`;
	for (let i = 0; i < highlightColors.length; i++) {
		mdxFile += getPreviewColorTable(highlightColors[i]);
	}
	mdxFile += `
</tbody></table></Preview>

<br/>

### Neutral Colors

<f-divider></f-divider>

<p>These colors are used to communicate less prominence than the other UI elements.</p>

`;

	mdxFile += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value (light mode)</th>
      <th>Value (dark mode)</th>
    </tr>`;
	for (let i = 0; i < neutralColors.length; i++) {
		mdxFile += getPreviewColorTable(neutralColors[i]);
	}
	mdxFile += `
</tbody></table></Preview>

<br/>

### Success Colors

<f-divider></f-divider>

<p>
  These are the colors that communicate purpose and emotion. Success colors are Green and have a
  positive connotation and we use Green to convey success, confirmation, create, etc.
</p>

`;

	mdxFile += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value (light mode)</th>
      <th>Value (dark mode)</th>
    </tr>`;
	for (let i = 0; i < successColors.length; i++) {
		mdxFile += getPreviewColorTable(successColors[i]);
	}
	mdxFile += `
</tbody></table></Preview>

<br/>

### Warning Colors

<f-divider></f-divider>

<p>
  These are the colors that communicate purpose and emotion. Warning colors are orange and have an
  awareness connotation and we use orange to convey non critical errors, warnings, might require
  attention etc.
</p>

`;

	mdxFile += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value (light mode)</th>
      <th>Value (dark mode)</th>
    </tr>`;
	for (let i = 0; i < warningColors.length; i++) {
		mdxFile += getPreviewColorTable(warningColors[i]);
	}
	mdxFile += `
</tbody></table></Preview>

<br/>

### Danger Colors

<f-divider></f-divider>

<p>
  These are the colors that communicate purpose and emotion. Danger colors are red and have an
  alarming connotation and we use red to convey critical errors, danger alerts, immediate action
  required, delete, destroy, remove etc.
</p>

`;

	mdxFile += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value (light mode)</th>
      <th>Value (dark mode)</th>
    </tr>`;
	for (let i = 0; i < dangerColors.length; i++) {
		mdxFile += getPreviewColorTable(dangerColors[i]);
	}
	mdxFile += `
</tbody></table></Preview>`;
	try {
		fs.writeFileSync(
			tokenFileName,
			prettier.format(mdxFile, {
				printWidth: 100,
				singleQuote: true,
				tabWidth: 4,
				parser: "mdx"
			})
		);
		console.log(`\x1b[32m \r ${tokenFileName} generated  \u2705 \x1b[0m`);
	} catch (e) {
		console.log(e);
	}
}

/**
 * Get document of specified file Id
 */
getStyles()
	.then(async response => {
		let nodeids = [];
		response.data.meta.styles.forEach(element => {
			nodeids.push(element.node_id);
		});
		await getNode(nodeids.join(",")).then(async response => {
			const colorTokens = {};
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			for (const [_id, obj] of Object.entries(response.data.nodes)) {
				if (obj.document.fills[0].color) {
					const { r, g, b } = obj.document.fills[0].color;

					const [theme, token] = obj.document.name.split("/");
					if (!colorTokens[theme]) {
						colorTokens[theme] = {};
					}

					colorTokens[theme][token] = rgbToHex(
						+(r * 255).toFixed(0),
						+(g * 255).toFixed(0),
						+(b * 255).toFixed(0)
					);
				}
			}
			// generate mdx for base colors
			generateBaseColorMdx(colorTokens);
			//genrating mdx for system colors
			generateSystemColorMdx(colorTokens);
		});
		console.log("\n");
	})
	.catch(error => {
		console.error(error);
	});

/**
 * get structurized Table according to colors.
 * @param {*} colorObject Json object of color variable name and its values for light and dark theme.
 */
function getPreviewColorTable(colorObject) {
	mdx = `
    <tr>
      <td>
        <p class="color-table-token">--${colorObject.variable}</p>
      </td>
      <td>
        <div class="custom-table-flex">
          <div class="width-set">
            <p>${colorObject.fLightValue ? colorObject.fLightValue : ""}</p>
          </div>
          <div style={{background: "${
						colorObject.fLightValue
					}", height: 16, width: 60, borderRadius: 0, marginLeft: 50}}></div>
        </div>
      </td>z
      <td>
        <div class="custom-table-flex">
          <div class="width-set">
            <p>${colorObject.fDarkValue ? colorObject.fDarkValue : ""}</p>
          </div>
          <div style={{background: "${
						colorObject.fDarkValue
					}", height: 16, width: 60, borderRadius: 0, marginLeft: 50}}></div>
        </div>
      </td>
    </tr>`;
	return mdx;
}

/**
 * get categorized and structurized array of colorTokens.
 * @param {*} colorTokens Json object of theme and color variables
 * @param {*} comparisionString string by which categorization needs to happen
 * @param {*} colorCategory string to identify whether categorization is for base-color or system-color
 * @return {Array<[Object]>} the resulting structurized array would be returned
 */
function compareAndFindTokens(colorTokens, comparisionString, colorCategory) {
	let resultingArr = [];
	for (const [theme, tokens] of Object.entries(colorTokens)) {
		const tokenEntries = Object.entries(tokens);

		for (let [variable, value] of tokenEntries) {
			variable = `color-${variable}`;
			hasComparision = false;
			if (colorCategory === "base-color") {
				hasComparision = variable.includes(comparisionString);
			} else {
				hasComparision =
					variable.includes(comparisionString) &&
					!variable.includes("surface") &&
					!variable.includes("text");
			}
			if (hasComparision) {
				if (resultingArr.length > 0 && resultingArr.some(item => item.variable === variable)) {
					let index = resultingArr.findIndex(item => item.variable === variable);
					if (theme === "f-light") {
						resultingArr[index].fLightValue = value;
					} else {
						resultingArr[index].fDarkValue = value;
					}
				} else {
					if (theme === "f-light") {
						resultingArr.push({ variable: variable, fLightValue: value });
					} else {
						resultingArr.push({ variable: variable, fDarkValue: value });
					}
				}
			}
		}
	}
	return resultingArr;
}
