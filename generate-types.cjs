/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require("fs-extra");
const path = require("path");
const { transformSchema } = require("@nonfx/custom-elements-manifest-to-types");
const { execSync } = require("child_process");

const dirPaths = execSync('find ./packages -name "custom-elements.json"', {
	cwd: __dirname,
	encoding: "utf-8"
})
	.split("\n")
	.filter(Boolean)
	.map(dirPath => {
		return path.dirname(path.resolve(__dirname, dirPath));
	});

console.log(`Going to process ${dirPaths.length} packages`);

Promise.all(
	dirPaths.map(async dirPath => {
		const customElementsJSON = require(path.resolve(dirPath, "custom-elements.json"));

		fs.mkdirpSync(`${dirPath}/dist/types`);

		Promise.all([
			transformSchema(customElementsJSON, "vue2", "../src/index"),
			transformSchema(customElementsJSON, "vue3", "../src/index"),
			transformSchema(customElementsJSON, "react", "../src/index")
		]).then(([vue2Types, vue3Types, reactTypes]) => {
			try {
				fs.writeFileSync(`${dirPath}/dist/types/vue2.ts`, vue2Types);
				fs.writeFileSync(`${dirPath}/dist/types/vue3.ts`, vue3Types);
				fs.writeFileSync(`${dirPath}/dist/types/react.ts`, reactTypes);
				console.log(`\x1b[32m \r ${dirPath} types generated  \u2705 \x1b[0m`);
			} catch (e) {
				console.log(e);
			}
		});
	})
);
