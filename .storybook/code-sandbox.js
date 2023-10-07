import { getParameters } from "codesandbox/lib/api/define";

export function getCodeSandBoxUrl(story) {
	const params = getParameters({
		files: {
			"index.js": {
				content: `import "@cldcvr/flow-core";
		  import "@cldcvr/flow-system-icon";
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
						"@cldcvr/flow-system-icon": "latest",
						"@cldcvr/flow-core": "latest"
					}
				}
			}
		}
	});

	return `https://codesandbox.io/api/v1/sandboxes/define?parameters=${params}`;
}
