/* eslint-disable*/
const fs = require("fs");
const customElementsJSON = require("./custom-elements.json");
const vueTypesFileName = `${__dirname}/custom-elements.vue.ts`;

const { transformSchema } = require("custom-elements-manifest-vue");

const vueTypes = transformSchema(customElementsJSON);

try {
  fs.writeFileSync(vueTypesFileName, vueTypes);
  console.log(`\x1b[32m \r ${vueTypesFileName} generated  \u2705 \x1b[0m`);
} catch (e) {
  console.log(e);
}
