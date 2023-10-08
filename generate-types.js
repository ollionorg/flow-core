/* eslint-disable*/
const fs = require("fs-extra");
const path = require("path");

const cwd = process.cwd();

const customElementsJSON = require(path.resolve(cwd, "custom-elements.json"));
const vue3TypesFileName = `${cwd}/dist/types/vue3.ts`;
const vue2TypesFileName = `${cwd}/dist/types/vue2.ts`;
const reactTypesFileName = `${cwd}/dist/types/react.ts`;

const { transformSchema } = require("@cldcvr/custom-elements-manifest-to-types");

fs.mkdirpSync(`${cwd}/dist/types`);

Promise.all([
	transformSchema(customElementsJSON, "vue2", "./src/index"),
	transformSchema(customElementsJSON, "vue3", "./src/index"),
	transformSchema(customElementsJSON, "react", "./src/index")
]).then(([vue2Types, vue3Types, reactTypes]) => {
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
});
