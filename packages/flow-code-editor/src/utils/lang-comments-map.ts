interface CommentItem {
	singleLine: string;
	multiLine: { start: string; end: string } | null;
}

const commonItem: CommentItem = {
	singleLine: "//",
	multiLine: { start: "/*", end: "*/" }
};

export const languageCommentsMap: Map<string, CommentItem> = new Map([
	// JavaScript
	["javascript", commonItem],

	// TypeScript
	["typescript", commonItem],

	// Python
	[
		"python",
		{
			singleLine: "#",
			multiLine: { start: "'''", end: "'''" }
		}
	],

	// Java
	["java", commonItem],

	// C++
	["cpp", commonItem],

	// C#
	["csharp", commonItem],

	// PHP
	["php", commonItem],

	// Ruby
	[
		"ruby",
		{
			singleLine: "#",
			multiLine: { start: "=begin", end: "=end" }
		}
	],

	// Swift
	["swift", commonItem],

	// Go
	["go", commonItem],

	// Rust
	["rust", commonItem],

	// Kotlin
	["kotlin", commonItem],

	// Dart
	["dart", commonItem],

	// HTML (HTML does not support multi-line comments)
	[
		"html",
		{
			singleLine: "<!--",
			multiLine: null
		}
	],

	// CSS (CSS does not support multi-line comments)
	[
		"css",
		{
			singleLine: "//",
			multiLine: null
		}
	],

	// SCSS (SCSS does not support multi-line comments)
	[
		"scss",
		{
			singleLine: "//",
			multiLine: null
		}
	],

	// Less (Less does not support multi-line comments)
	[
		"less",
		{
			singleLine: "//",
			multiLine: null
		}
	],

	// JSON (JSON does not support multi-line comments)
	[
		"json",
		{
			singleLine: "//",
			multiLine: null
		}
	],

	// YAML (YAML does not support multi-line comments)
	[
		"yaml",
		{
			singleLine: "#",
			multiLine: null
		}
	]
]);
