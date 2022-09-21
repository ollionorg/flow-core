/* eslint-disable*/
const fs = require("fs");
const customElementsJSON = require("./custom-elements.json");
const vue3TypesFileName = `${__dirname}/dist/types/vue3.ts`;
const vue2TypesFileName = `${__dirname}/dist/types/vue2.ts`;
const reactTypesFileName = `${__dirname}/dist/types/react.ts`;

const { transformSchema } = require("custom-elements-manifest-vue");

const vue2Types = transformSchema(customElementsJSON, "vue2", "./src/index");
const vue3Types = transformSchema(customElementsJSON, "vue3", "./src/index");

const reactTypes = transformSchema(customElementsJSON, "react", "./src/index");

try {
  fs.writeFileSync(vue2TypesFileName, vue2Types);
  console.log(`\x1b[32m \r ${vue2TypesFileName} generated  \u2705 \x1b[0m`);
  fs.writeFileSync(vue3TypesFileName, vue3Types);
  console.log(`\x1b[32m \r ${vue3TypesFileName} generated  \u2705 \x1b[0m`);
  fs.writeFileSync(reactTypesFileName, reactTypes);
  console.log(`\x1b[32m \r ${reactTypesFileName} generated  \u2705 \x1b[0m`);
} catch (e) {
  console.log(e);
}
