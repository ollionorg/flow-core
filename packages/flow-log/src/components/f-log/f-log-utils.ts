// Adds some general formatting/highlighting to logs
export function formatLogLine(logLine: string): string {
	// Highlight [xxx] with a greyed out version
	let newLine = logLine
		// Highlight quoted strings
		.replace(/("[^"]*?"|'[^']*?')/g, '<span style="color: var(--color-warning-subtle)">$1</span>')

		// Highlight bracket contents
		// 100 is an arbitrary limit to prevent catastrophic backtracking in Regex
		.replace(
			/(\[[^\]]{0,100}\])/g,
			'<span style="color:var(--color-text-subtle); font-weight: bold;">$1</span>'
		)

		// Highlight potential dates (YYYY/MM/DD HH:MM:SS)
		.replace(
			/(\d{1,4}\/\d{1,2}\/\d{1,4}(?: \d{1,2}:\d{1,2}:\d{1,2})?)/g,
			'<span style="color: #68c9f2">$1</span>'
		)

		// Highlight potential dates (YYYY-MM-DD with timezone)
		.replace(
			/(\d{1,4}-\d{1,2}-\d{1,4}(?:\s?T?\d{1,2}:\d{1,2}:[\d.]{1,10})?Z?)/g,
			'<span style="color: #68c9f2">$1</span>'
		)

		// Highlight YAML keys
		// 100 is an arbitrary limit to prevent catastrophic backtracking in Regex
		.replace(
			/(^\s*[-\sa-z0-9_]{1,100}:\s)/gi,
			'<span style="color:var(--color-primary-default)">$1</span>'
		)

		// Highlight urls
		.replace(
			/((https?:\/\/)([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}(:[0-9]+)?(\/[^" ]*)?)/g,
			'<a style="color: var(--color-primary-default); text-decoration: underline" href="$1" rel="noopener" target="_blank">$1</a>'
		);

	if (/(ERROR|FAILED)/gi.test(newLine)) {
		newLine = `<span style="background: var(--color-danger-subtle)">${newLine}</span>`;
	}

	return newLine;
}

export function getUniqueStringId() {
	return `${new Date().valueOf()}`;
}
