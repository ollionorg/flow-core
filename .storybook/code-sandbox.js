import { getParameters } from "codesandbox/lib/api/define";

export function getCodeSandBoxUrl(story) {
	const params = getParameters({
		files: {
			"index.js": {
				content: `import { register, flowCoreElements } from "@ollion/flow-core";
register(flowCoreElements);
		  import "@ollion/flow-system-icon";
		  document.getElementById("app").innerHTML =\`${story}\`
		  `,
				isBinary: false
			},
			"index.html": {
				content: `<!DOCTYPE html>
		<html>
		
		<head>
			<title>Parcel Sandbox</title>
			<meta charset="UTF-8" />
		</head>
		
		<body>
			<div id="app"></div>
		
			<script src="index.js"> 
			</script>
		</body>
		
		</html>`,
				isBinary: false
			},
			"package.json": {
				content: {
					dependencies: {
						"@ollion/flow-system-icon": "latest",
						"@ollion/flow-core": "latest"
					}
				}
			}
		}
	});

	return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${params}`;
}
