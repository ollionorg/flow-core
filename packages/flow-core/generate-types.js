/* eslint-disable*/
const fs = require("fs");
const customElementsJSON = require("./custom-elements.json");
const vueTypesFileName = `${__dirname}/dist/types/vue.d.ts`;
const reactTypesFileName = `${__dirname}/dist/types/react.d.ts`;

const { transformSchema } = require("custom-elements-manifest-vue");

const vueTypes = transformSchema(
  customElementsJSON,
  "vue",
  "@cldcvr/flow-core"
);

const reactTypes = transformSchema(
  customElementsJSON,
  "react",
  "@cldcvr/flow-core"
);

try {
  fs.writeFileSync(vueTypesFileName, vueTypes);
  console.log(`\x1b[32m \r ${vueTypesFileName} generated  \u2705 \x1b[0m`);
  fs.writeFileSync(reactTypesFileName, reactTypes);
  console.log(`\x1b[32m \r ${reactTypesFileName} generated  \u2705 \x1b[0m`);
} catch (e) {
  console.log(e);
}
