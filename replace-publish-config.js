/* eslint-disable @typescript-eslint/no-var-requires */
const { execSync } = require("child_process");
const process = require("process");

const args = process.argv.slice(2);
const fs = require("fs");

if (args.length !== 1) {
	console.error(`Invalid arguments to command: ${args}`);
	console.error(`Only pass the URL to the published registry`);
	process.exit(1);
}

const publishUrl = args[0];

const packageFiles = execSync('find ./packages -name "package.json"', {
	cwd: __dirname,
	encoding: "utf-8"
})
	.split("\n")
	.filter(Boolean);

console.log(
	`Going to replace publishConfig.registry with ${publishUrl} in ${packageFiles.length} files \n\n`
);

packageFiles.forEach(packageFile => {
	const packageJson = require(packageFile);

	if (!packageJson.publishConfig) {
		console.error(`No publishConfig in ${packageFile}`);
		return;
	}

	packageJson.publishConfig.registry = publishUrl;
	console.log(`Writing ${packageFile}`);
	fs.writeFileSync(packageFile, `${JSON.stringify(packageJson, null, 2)}\n`, "utf-8");
});
