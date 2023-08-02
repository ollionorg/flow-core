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

export const languageCommentsRegexMap = new Map([
	// JavaScript (single-line comments start with //, and multi-line comments are enclosed between /* and */)
	[
		"javascript",
		{
			singleLine: /\/\/(.*)/,
			multiLine: /\/\*([\s\S]*?)\*\//
		}
	],

	// TypeScript (single-line comments start with //, and multi-line comments are enclosed between /* and */)
	[
		"typescript",
		{
			singleLine: /\/\/(.*)/,
			multiLine: /\/\*([\s\S]*?)\*\//
		}
	],

	// Python (single-line comments start with #, and multi-line comments are enclosed between ''' or """)
	[
		"python",
		{
			singleLine: /#(.*)/,
			multiLine: /(['"]{3})([\s\S]*?)\1/
		}
	],

	// Java (single-line comments start with //, and multi-line comments are enclosed between /* and */)
	[
		"java",
		{
			singleLine: /\/\/(.*)/,
			multiLine: /\/\*([\s\S]*?)\*\//
		}
	],

	// C++ (single-line comments start with //, and multi-line comments are enclosed between /* and */)
	[
		"cpp",
		{
			singleLine: /\/\/(.*)/,
			multiLine: /\/\*([\s\S]*?)\*\//
		}
	],

	// C# (single-line comments start with //, and multi-line comments are enclosed between /* and */)
	[
		"csharp",
		{
			singleLine: /\/\/(.*)/,
			multiLine: /\/\*([\s\S]*?)\*\//
		}
	],

	// PHP (single-line comments start with // or #, and multi-line comments are enclosed between /* and */)
	[
		"php",
		{
			singleLine: /(\/\/|#)(.*)/,
			multiLine: /\/\*([\s\S]*?)\*\//
		}
	],

	// Ruby (single-line comments start with #, and multi-line comments are enclosed between =begin and =end)
	[
		"ruby",
		{
			singleLine: /#(.*)/,
			multiLine: /(?<=^=begin)([\s\S]*?)(?=^=end)/m
		}
	],

	// Swift (single-line comments start with //, and multi-line comments are enclosed between /* and */)
	[
		"swift",
		{
			singleLine: /\/\/(.*)/,
			multiLine: /\/\*([\s\S]*?)\*\//
		}
	],

	// Go (single-line comments start with //, and multi-line comments are enclosed between /* and */)
	[
		"go",
		{
			singleLine: /\/\/(.*)/,
			multiLine: /\/\*([\s\S]*?)\*\//
		}
	],

	// Rust (single-line comments start with //, and multi-line comments are enclosed between /* and */)
	[
		"rust",
		{
			singleLine: /\/\/(.*)/,
			multiLine: /\/\*([\s\S]*?)\*\//
		}
	],

	// Kotlin (single-line comments start with //, and multi-line comments are enclosed between /* and */)
	[
		"kotlin",
		{
			singleLine: /\/\/(.*)/,
			multiLine: /\/\*([\s\S]*?)\*\//
		}
	],

	// Dart (single-line comments start with //, and multi-line comments are enclosed between /* and */)
	[
		"dart",
		{
			singleLine: /\/\/(.*)/,
			multiLine: /\/\*([\s\S]*?)\*\//
		}
	],

	// HTML (single-line comments start with <!--, and multi-line comments are not supported)
	[
		"html",
		{
			singleLine: /<!--(.*?)-->/,
			multiLine: null
		}
	],

	// CSS (single-line comments start with /* or //, and multi-line comments are not supported)
	[
		"css",
		{
			singleLine: /\/\*([\s\S]*?)\*\/|\/\/(.*)/,
			multiLine: null
		}
	],

	// SCSS (single-line comments start with /* or //, and multi-line comments are not supported)
	[
		"scss",
		{
			singleLine: /\/\*([\s\S]*?)\*\/|\/\/(.*)/,
			multiLine: null
		}
	],

	// Less (single-line comments start with //, and multi-line comments are not supported)
	[
		"less",
		{
			singleLine: /\/\/(.*)/,
			multiLine: null
		}
	],

	// JSON (single-line comments start with // or /* or #, and multi-line comments are not supported)
	[
		"json",
		{
			singleLine: /(\/\/|#)[^\n\r]*|\/\*[\s\S]*?\*\//,
			multiLine: null
		}
	],

	// YAML (single-line comments start with #, and multi-line comments are not supported)
	[
		"yaml",
		{
			singleLine: /#(.*)/,
			multiLine: null
		}
	]
]);
