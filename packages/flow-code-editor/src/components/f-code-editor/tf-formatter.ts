export function format(hclCode: string): string {
	let formattedCode = "";
	let indentLevel = 0;

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
			const [beforeEqual, afterEqual] = line.split("=");
			const equalPos = `${beforeEqual.trim()} = ${afterEqual.trim()}`.indexOf("=");
			if (equalPos === -1) {
				return line;
			}
			const spacesToAdd = maxEqualPos - equalPos;

			return `${" ".repeat(indentLevel * 2)}${
				beforeEqual.trim() +
				" ".repeat(spacesToAdd < 0 ? 0 : spacesToAdd) +
				" = " +
				afterEqual.trim()
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
				keyValues.push(line.substring(lineBrIdx + 1));
				// formattedCode += `${" ".repeat(indentLevel * 2 + 1)}${line.substring(lineBrIdx + 1)}\n`;
			}
			indentLevel++;
		} else if (line.includes("}")) {
			const alignKeyValues = () => {
				if (keyValues.length > 0) {
					formattedCode += `${alignEquals(keyValues.join("\n"))}\n`;
					keyValues = [];
				}
			};

			if (line === "}") {
				alignKeyValues();
				indentLevel--;
				formattedCode += `${" ".repeat(indentLevel * 2)}${line}\n`;
			} else {
				const [before, after] = line.split("}");
				if (before?.trim() !== "") keyValues.push(before);

				alignKeyValues();
				indentLevel--;
				formattedCode += `${" ".repeat(indentLevel * 2)}${"}"}\n`;
				if (after?.trim() !== "") keyValues.push(after);

				alignKeyValues();
			}
		} else if (line.includes("=")) {
			keyValues.push(line);
		} else {
			formattedCode += `${" ".repeat(indentLevel * 2)}${line}\n`;
		}
	}

	return formattedCode.trim();
}
