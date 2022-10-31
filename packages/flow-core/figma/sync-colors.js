/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const { getStyles, getNode } = require("./api");
const prettier = require("prettier");

const fs = require("fs");

const rgbToHex = (r, g, b) =>
  "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);

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
    if (theme === "f-dark" || theme === "f-light") {
      const tokenEntries = Object.entries(tokens);

      scss += `
	[flow-element][theme="${theme}"]{ `;

      for (let [variable, value] of tokenEntries) {
        variable = `color-${variable}`;
        scss += `$${variable} : ${value} ;\n`;
        scss += `--${variable} : #{$${variable}} ;\n`;
        scss += `--${variable}-hover : #{getHover($${variable})};\n`;
        scss += `--${variable}-selected : #{getSelected($${variable})};\n`;
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
        parser: "css",
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
      generateTokenScss(colorTokens);
    });
    console.log("\n");
  })
  .catch((error) => {
    console.error(error);
  });
