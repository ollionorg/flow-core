export function format(hclCode: string): string {
	let formattedCode = "";
	let indentLevel = 0;
	hclCode = hclCode.replace(/ /g, " ");
	const lines = hclCode.split("\n");
	let keyValues: string[] = [];

	const alignEquals = (input: string) => {
		const lines = input.split("\n");

		// Find the maximum position of the equal sign
		const maxEqualPos = lines.reduce((maxPos, line) => {
			const equalPos = line.indexOf("=");
			return equalPos > maxPos ? equalPos : maxPos;
		}, 0);

		// Adjust each line to align the equal signs
		const alignedLines = lines.map(line => {
			const equalPos = line.indexOf("=");
			if (equalPos === -1) {
				return line;
			}
			const spacesToAdd = maxEqualPos - equalPos;
			const [beforeEqual, afterEqual] = line.split("=");

			return `${" ".repeat(indentLevel * 2)}${
				beforeEqual + " ".repeat(spacesToAdd) + "=" + afterEqual
			}`;
		});

		return alignedLines.join("\n");
	};

	for (let line of lines) {
		line = line.trim();

		// Handle comments
		if (line.startsWith("#")) {
			formattedCode += `${" ".repeat(indentLevel * 2)}${line}\n`;
			continue;
		}

		// Detect block start and end
		if (line.includes("{")) {
			if (keyValues.length > 0) {
				formattedCode += `${alignEquals(keyValues.join("\n"))}\n`;
				keyValues = [];
			}

			if (line.endsWith("{")) {
				formattedCode += `${" ".repeat(indentLevel * 2)}${line}\n`;
			} else {
				const lineBrIdx = line.indexOf("{");
				formattedCode += `${" ".repeat(indentLevel * 2)}${line.substring(0, lineBrIdx + 1)}\n`;
				formattedCode += `${" ".repeat(indentLevel * 2 + 1)}${line.substring(lineBrIdx + 1)}\n`;
			}
			indentLevel++;
		} else if (line.includes("}")) {
			if (keyValues.length > 0) {
				formattedCode += `${alignEquals(keyValues.join("\n"))}\n`;
				keyValues = [];
			}
			indentLevel--;
			formattedCode += `${" ".repeat(indentLevel * 2)}${line}\n`;
		} else if (line.includes("=")) {
			keyValues.push(line);
		} else {
			formattedCode += `${" ".repeat(indentLevel * 2)}${line}\n`;
		}
	}
	console.log(formattedCode.trim());

	return formattedCode.trim();
}
