export const languageCommentsMap = new Map([
	// JavaScript
	[
		"javascript",
		{
			singleLine: "//",
			multiLine: { start: "/*", end: "*/" }
		}
	],

	// TypeScript
	[
		"typescript",
		{
			singleLine: "//",
			multiLine: { start: "/*", end: "*/" }
		}
	],

	// Python
	[
		"python",
		{
			singleLine: "#",
			multiLine: { start: "'''", end: "'''" }
		}
	],

	// Java
	[
		"java",
		{
			singleLine: "//",
			multiLine: { start: "/*", end: "*/" }
		}
	],

	// C++
	[
		"cpp",
		{
			singleLine: "//",
			multiLine: { start: "/*", end: "*/" }
		}
	],

	// C#
	[
		"csharp",
		{
			singleLine: "//",
			multiLine: { start: "/*", end: "*/" }
		}
	],

	// PHP
	[
		"php",
		{
			singleLine: "//",
			multiLine: { start: "/*", end: "*/" }
		}
	],

	// Ruby
	[
		"ruby",
		{
			singleLine: "#",
			multiLine: { start: "=begin", end: "=end" }
		}
	],

	// Swift
	[
		"swift",
		{
			singleLine: "//",
			multiLine: { start: "/*", end: "*/" }
		}
	],

	// Go
	[
		"go",
		{
			singleLine: "//",
			multiLine: { start: "/*", end: "*/" }
		}
	],

	// Rust
	[
		"rust",
		{
			singleLine: "//",
			multiLine: { start: "/*", end: "*/" }
		}
	],

	// Kotlin
	[
		"kotlin",
		{
			singleLine: "//",
			multiLine: { start: "/*", end: "*/" }
		}
	],

	// Dart
	[
		"dart",
		{
			singleLine: "//",
			multiLine: { start: "/*", end: "*/" }
		}
	],

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
