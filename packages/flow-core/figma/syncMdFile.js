/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { getStyles, getNode } = require("./api");
const prettier = require("prettier");

const fs = require("fs");

const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

/**
 * @param {*} colorTokens Json object of theme and color variables
 */
function generateBaseColorMdx(colorTokens) {
  const tokenFileName = `${__dirname}/../figma/base_colors.mdx`;

  let surfaceColors = [];
  let textColors = [];
  let iconColors = [];
  let borderColors = [];

  compareAndFindTokens(colorTokens, "surface", surfaceColors);
  compareAndFindTokens(colorTokens, "text", textColors);
  compareAndFindTokens(colorTokens, "icon", iconColors);
  compareAndFindTokens(colorTokens, "border", borderColors);

  scss = `## Base colors

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

  scss += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value(light mode)</th>
      <th>Value(dark mode)</th>
    </tr>`;
  for (let i = 0; i < surfaceColors.length; i++) {
    scss += getPreviewColorTable(surfaceColors[i]);
  }
  scss += `
</tbody></table></Preview>

<br/>

### Text Colors

<f-divider></f-divider>

`;

  scss += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value(light mode)</th>
      <th>Value(dark mode)</th>
    </tr>`;
  for (let i = 0; i < textColors.length; i++) {
    scss += getPreviewColorTable(textColors[i]);
  }
  scss += `
</tbody></table></Preview>

<br/>

### Icon Colors

<f-divider></f-divider>

`;

  scss += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value(light mode)</th>
      <th>Value(dark mode)</th>
    </tr>`;
  for (let i = 0; i < iconColors.length; i++) {
    scss += getPreviewColorTable(iconColors[i]);
  }
  scss += `
</tbody></table></Preview>

<br/>

### Border Colors

<f-divider></f-divider>

`;

  scss += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value(light mode)</th>
      <th>Value(dark mode)</th>
    </tr>`;
  for (let i = 0; i < borderColors.length; i++) {
    scss += getPreviewColorTable(borderColors[i]);
  }
  scss += `
</tbody></table></Preview>`;

  try {
    fs.writeFileSync(
      tokenFileName,
      prettier.format(scss, {
        printWidth: 100,
        singleQuote: true,
        tabWidth: 4,
        parser: "mdx",
      })
    );
    console.log(`\x1b[32m \r ${tokenFileName} generated  \u2705 \x1b[0m`);
  } catch (e) {
    console.log(e);
  }
}

function generateSystemColorMdx(colorTokens) {
  const tokenFileName = `${__dirname}/../figma/system_colors.mdx`;

  let primaryColors = [];
  let highlightColors = [];
  let neutralColors = [];
  let successColors = [];
  let warningColors = [];
  let dangerColors = [];

  compareAndStructureTokens(colorTokens, "color-primary", primaryColors);
  compareAndStructureTokens(colorTokens, "color-highlight", highlightColors);
  compareAndStructureTokens(colorTokens, "color-neutral", neutralColors);
  compareAndStructureTokens(colorTokens, "color-success", successColors);
  compareAndStructureTokens(colorTokens, "color-warning", warningColors);
  compareAndStructureTokens(colorTokens, "color-danger", dangerColors);

  scss = `## System colors

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

  scss += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value(light mode)</th>
      <th>Value(dark mode)</th>
    </tr>`;
  for (let i = 0; i < primaryColors.length; i++) {
    scss += getPreviewColorTable(primaryColors[i]);
  }
  scss += `
</tbody></table></Preview>

<br/>

### Highlight Colors

<f-divider></f-divider>

<p class="margin-btm-24">
  These colors highlight or complement the primary color and are to be used sparingly to make
  secondary UI elements stand out.
</p>

`;

  scss += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value(light mode)</th>
      <th>Value(dark mode)</th>
    </tr>`;
  for (let i = 0; i < highlightColors.length; i++) {
    scss += getPreviewColorTable(highlightColors[i]);
  }
  scss += `
</tbody></table></Preview>

<br/>

### Neutral Colors

<f-divider></f-divider>

<p>These colors are used to communicate less prominence than the other UI elements.</p>

`;

  scss += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value(light mode)</th>
      <th>Value(dark mode)</th>
    </tr>`;
  for (let i = 0; i < neutralColors.length; i++) {
    scss += getPreviewColorTable(neutralColors[i]);
  }
  scss += `
</tbody></table></Preview>

<br/>

### Success Colors

<f-divider></f-divider>

<p>
  These are the colors that communicate purpose and emotion. Success colors are Green and have a
  positive connotation and we use Green to convey success, confirmation, create, etc.
</p>

`;

  scss += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value(light mode)</th>
      <th>Value(dark mode)</th>
    </tr>`;
  for (let i = 0; i < successColors.length; i++) {
    scss += getPreviewColorTable(successColors[i]);
  }
  scss += `
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

  scss += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value(light mode)</th>
      <th>Value(dark mode)</th>
    </tr>`;
  for (let i = 0; i < warningColors.length; i++) {
    scss += getPreviewColorTable(warningColors[i]);
  }
  scss += `
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

  scss += `<Preview>
  <table class="custom-color-table">
  <tbody>
            <tr>
      <th>Token</th>
      <th>Value(light mode)</th>
      <th>Value(dark mode)</th>
    </tr>`;
  for (let i = 0; i < dangerColors.length; i++) {
    scss += getPreviewColorTable(dangerColors[i]);
  }
  scss += `
</tbody></table></Preview>`;
  try {
    fs.writeFileSync(
      tokenFileName,
      prettier.format(scss, {
        printWidth: 100,
        singleQuote: true,
        tabWidth: 4,
        parser: "mdx",
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
  .then(async (response) => {
    let nodeids = [];
    response.data.meta.styles.forEach((element) => {
      nodeids.push(element.node_id);
    });
    getNode(nodeids.join(",")).then(async (response) => {
      const colorTokens = {};
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const [_id, obj] of Object.entries(response.data.nodes)) {
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
      generateBaseColorMdx(colorTokens);
      generateSystemColorMdx(colorTokens);
    });
    console.log("\n");
  })
  .catch((error) => {
    console.error(error);
  });

// generate table according to colors
function getPreviewColorTable(item) {
  mdx = `
    <tr>
      <td>
        <p class="color-table-token">$${item.variable}</p>
      </td>
      <td>
        <div class="custom-table-flex">
          <div class="width-set">
            <p>${item.fLightValue ? item.fLightValue : ""}</p>
          </div>
          <div style={{background: "${
            item.fLightValue
          }", height: 16, width: 60, borderRadius: 0, marginLeft: 50}}></div>
        </div>
      </td>
      <td>
        <div class="custom-table-flex">
          <div class="width-set">
            <p>${item.fDarkValue ? item.fDarkValue : ""}</p>
          </div>
          <div style={{background: "${
            item.fDarkValue
          }", height: 16, width: 60, borderRadius: 0, marginLeft: 50}}></div>
        </div>
      </td>
    </tr>`;
  return mdx;
}

// structurizatrion for base_colors.mdx
function compareAndFindTokens(colorTokens, comparisionString, resultingArr) {
  for (const [theme, tokens] of Object.entries(colorTokens)) {
    const tokenEntries = Object.entries(tokens);

    for (let [variable, value] of tokenEntries) {
      if (variable.includes(comparisionString)) {
        variable = `color-${variable}`;
        if (resultingArr.length === 0) {
          if (theme === "f-light") {
            resultingArr.push({ variable: variable, fLightValue: value });
          } else {
            resultingArr.push({ variable: variable, fDarkValue: value });
          }
        } else if (
          resultingArr.length > 0 &&
          resultingArr.some((item) => item.variable === variable)
        ) {
          let index = resultingArr.findIndex((item) => item.variable === variable);
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
}

// structurizatrion for system_colors.mdx
function compareAndStructureTokens(colorTokens, comparisionString, resultingArr) {
  for (const [theme, tokens] of Object.entries(colorTokens)) {
    const tokenEntries = Object.entries(tokens);

    for (let [variable, value] of tokenEntries) {
      variable = `color-${variable}`;
      if (
        variable.includes(comparisionString) &&
        !variable.includes("surface") &&
        !variable.includes("text")
      ) {
        if (resultingArr.length === 0) {
          if (theme === "f-light") {
            resultingArr.push({ variable: variable, fLightValue: value });
          } else {
            resultingArr.push({ variable: variable, fDarkValue: value });
          }
        } else if (
          resultingArr.length > 0 &&
          resultingArr.some((item) => item.variable === variable)
        ) {
          let index = resultingArr.findIndex((item) => item.variable === variable);
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
}
