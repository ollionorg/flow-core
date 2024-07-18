import { html, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { FRoot, flowElement, FButton, FDiv } from "@ollion/flow-core";
import globalStyle from "./f-code-editor-global.scss?inline";
import * as monaco from "monaco-editor";

import { property, query } from "lit/decorators.js";
import { languageCommentsMap } from "../../utils/lang-comments-map";
import { injectCss } from "@ollion/flow-core-config";
import { format } from "./tf-formatter";

monaco.languages.register({ id: "hcl" });

monaco.languages.setMonarchTokensProvider("hcl", {
	defaultToken: "",
	tokenPostfix: ".hcl",

	keywords: [
		"var",
		"local",
		"path",
		"for_each",
		"any",
		"string",
		"number",
		"bool",
		"true",
		"false",
		"null",
		"if ",
		"else ",
		"endif ",
		"for ",
		"in",
		"endfor"
	],

	operators: [
		"=",
		">=",
		"<=",
		"==",
		"!=",
		"+",
		"-",
		"*",
		"/",
		"%",
		"&&",
		"||",
		"!",
		"<",
		">",
		"?",
		"...",
		":"
	],

	symbols: /[=><!~?:&|+\-*/^%]+/,
	escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
	terraformFunctions:
		/(abs|ceil|floor|log|max|min|pow|signum|chomp|format|formatlist|indent|join|lower|regex|regexall|replace|split|strrev|substr|title|trimspace|upper|chunklist|coalesce|coalescelist|compact|concat|contains|distinct|element|flatten|index|keys|length|list|lookup|map|matchkeys|merge|range|reverse|setintersection|setproduct|setunion|slice|sort|transpose|values|zipmap|base64decode|base64encode|base64gzip|csvdecode|jsondecode|jsonencode|urlencode|yamldecode|yamlencode|abspath|dirname|pathexpand|basename|file|fileexists|fileset|filebase64|templatefile|formatdate|timeadd|timestamp|base64sha256|base64sha512|bcrypt|filebase64sha256|filebase64sha512|filemd5|filemd1|filesha256|filesha512|md5|rsadecrypt|sha1|sha256|sha512|uuid|uuidv5|cidrhost|cidrnetmask|cidrsubnet|tobool|tolist|tomap|tonumber|toset|tostring)/,
	terraformMainBlocks: /(module|data|terraform|resource|provider|variable|output|locals)/,
	tokenizer: {
		root: [
			// highlight main blocks
			[
				/^@terraformMainBlocks([ \t]*)([\w-]+|"[\w-]+"|)([ \t]*)([\w-]+|"[\w-]+"|)([ \t]*)(\{)/,
				["type", "", "string", "", "string", "", "@brackets"]
			],
			// highlight all the remaining blocks
			[
				/(\w+[ \t]+)([ \t]*)([\w-]+|"[\w-]+"|)([ \t]*)([\w-]+|"[\w-]+"|)([ \t]*)(\{)/,
				["identifier", "", "string", "", "string", "", "@brackets"]
			],
			// highlight block
			[
				/(\w+[ \t]+)([ \t]*)([\w-]+|"[\w-]+"|)([ \t]*)([\w-]+|"[\w-]+"|)(=)(\{)/,
				["identifier", "", "string", "", "operator", "", "@brackets"]
			],
			// terraform general highlight - shared with expressions
			{ include: "@terraform" }
		],
		terraform: [
			// highlight terraform functions
			[/@terraformFunctions(\()/, ["type", "@brackets"]],
			// all other words are variables or keywords
			[
				/[a-zA-Z_]\w*-*/, // must work with variables such as foo-bar and also with negative numbers
				{
					cases: {
						"@keywords": { token: "keyword.$0" },
						"@default": "variable"
					}
				}
			],
			{ include: "@whitespace" },
			{ include: "@heredoc" },
			// delimiters and operators
			[/[{}()[\]]/, "@brackets"],
			[/[<>](?!@symbols)/, "@brackets"],
			[
				/@symbols/,
				{
					cases: {
						"@operators": "operator",
						"@default": ""
					}
				}
			],
			// numbers
			[/\d*\d+[eE]([-+]?\d+)?/, "number.float"],
			[/\d*\.\d+([eE][-+]?\d+)?/, "number.float"],
			[/\d[\d']*/, "number"],
			[/\d/, "number"],
			[/[;,.]/, "delimiter"], // delimiter: after number because of .\d floats
			// strings
			[/"/, "string", "@string"], // this will include expressions
			[/'/, "invalid"]
		],
		heredoc: [
			[/<<[-]*\s*["]?([\w-]+)["]?/, { token: "string.heredoc.delimiter", next: "@heredocBody.$1" }]
		],
		heredocBody: [
			[
				/([\w-]+)$/,
				{
					cases: {
						"$1==$S2": [
							{
								token: "string.heredoc.delimiter",
								next: "@popall"
							}
						],
						"@default": "string.heredoc"
					}
				}
			],
			[/./, "string.heredoc"]
		],
		whitespace: [
			[/[ \t\r\n]+/, ""],
			[/\/\*/, "comment", "@comment"],
			[/\/\/.*$/, "comment"],
			[/#.*$/, "comment"]
		],
		comment: [
			[/[^/*]+/, "comment"],
			[/\*\//, "comment", "@pop"],
			[/[/*]/, "comment"]
		],
		string: [
			[/\$\{/, { token: "delimiter", next: "@stringExpression" }],
			[/[^\\"$]+/, "string"],
			[/@escapes/, "string.escape"],
			[/\\./, "string.escape.invalid"],
			[/"/, "string", "@popall"]
		],
		stringInsideExpression: [
			[/[^\\"]+/, "string"],
			[/@escapes/, "string.escape"],
			[/\\./, "string.escape.invalid"],
			[/"/, "string", "@pop"]
		],
		stringExpression: [
			[/\}/, { token: "delimiter", next: "@pop" }],
			[/"/, "string", "@stringInsideExpression"],
			{ include: "@terraform" }
		]
	}
});

monaco.languages.setLanguageConfiguration("hcl", {
	comments: {
		lineComment: "#",
		blockComment: ["/*", "*/"]
	},
	brackets: [
		["{", "}"],
		["[", "]"],
		["(", ")"]
	],
	autoClosingPairs: [
		{ open: "{", close: "}" },
		{ open: "[", close: "]" },
		{ open: "(", close: ")" },
		{ open: '"', close: '"', notIn: ["string"] }
	],
	surroundingPairs: [
		{ open: "{", close: "}" },
		{ open: "[", close: "]" },
		{ open: "(", close: ")" },
		{ open: '"', close: '"' }
	]
});

monaco.languages.registerDocumentFormattingEditProvider("hcl", {
	provideDocumentFormattingEdits: model => {
		const text = model.getValue();
		console.log("Formatting!!");
		// Format the text using a custom formatter or an external HCL formatter
		const formattedText = format(text); // You need to implement this function or use a library

		return [
			{
				range: model.getFullModelRange(),
				text: formattedText
			}
		];
	}
});

injectCss("f-code-editor", globalStyle);

export type FCodeEditorLanguage =
	| "scala"
	| "python"
	| "json"
	| "css"
	| "scss"
	| "less"
	| "html"
	| "yaml"
	| "javascript"
	| "typescript"
	| "hcl";

export type FCodeEditorSettings = monaco.editor.IStandaloneEditorConstructionOptions;
export type FCodeEditorServices = monaco.editor.IStandaloneEditorConstructionOptions;

export type FCodeEditorStateProp = "subtle" | "default" | "secondary";
function createDependencyProposals(range: {
	startLineNumber: number;
	endLineNumber: number;
	startColumn: number;
	endColumn: number;
}) {
	// returning a static list of proposals, not even looking at the prefix (filtering is done by the Monaco editor),
	// here you could do a server side lookup
	return [
		{
			label: '"lodash"',
			kind: monaco.languages.CompletionItemKind.Function,
			documentation: "The Lodash library exported as Node.js modules.",
			insertText: '"lodash": "*"',
			range: range
		},
		{
			label: '"express"',
			kind: monaco.languages.CompletionItemKind.Function,
			documentation: "Fast, unopinionated, minimalist web framework",
			insertText: '"express": "*"',
			range: range
		},
		{
			label: '"mkdirp"',
			kind: monaco.languages.CompletionItemKind.Function,
			documentation: "Recursively mkdir, like <code>mkdir -p</code>",
			insertText: '"mkdirp": "*"',
			range: range
		},
		{
			label: '"my-third-party-library"',
			kind: monaco.languages.CompletionItemKind.Function,
			documentation: "Describe your library here",
			insertText: '"${1:my-third-party-library}": "${2:1.2.3}"',
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		}
	];
}

// function showPopoverAtPosition(
// 	editor: monaco.editor.IStandaloneCodeEditor,
// 	content: HTMLElement,
// 	position: monaco.IPosition
// ) {
// 	const overlayWidget: monaco.editor.IContentWidget = {
// 		getId: function () {
// 			return "myPopoverWidget";
// 		},
// 		getDomNode: function () {
// 			return content;
// 		},
// 		getPosition: function () {
// 			return {
// 				position: position,
// 				preference: [
// 					monaco.editor.ContentWidgetPositionPreference.BELOW,
// 					monaco.editor.ContentWidgetPositionPreference.ABOVE
// 				]
// 			};
// 		}
// 	};
// 	editor.addContentWidget(overlayWidget);
// }
@flowElement("f-code-editor")
export class FCodeEditor extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle)];

	/**
	 * editor instance
	 */
	editor?: monaco.editor.IStandaloneCodeEditor;

	/**
	 * actual code to display in editor
	 */
	@property({ type: String })
	code?: string;

	/**
	 * @attribute header title
	 */
	@property({ reflect: true, type: String })
	title = "";

	/**
	 * @attribute state property defines the background color.
	 */
	@property({ reflect: true, type: String })
	state?: FCodeEditorStateProp = "default";

	/**
	 * language of code
	 */
	@property({ reflect: true, type: String })
	language?: FCodeEditorLanguage = "typescript";

	/**
	 * height to is required to create editor
	 */
	@property({ type: String })
	height?: string = "100%";

	/**
	 * width to is required to create editor
	 */
	@property({ type: String })
	width?: string = "100%";

	@property({ type: Object })
	settings?: FCodeEditorSettings = {};

	@property({ type: Object })
	services?: FCodeEditorServices = {};

	/**
	 * @attribute comments toggle actions
	 */
	@property({ type: Boolean, reflect: true })
	comments?: boolean = false;

	/**
	 * @attribute copy on click action
	 */
	@property({ type: Boolean, reflect: true, attribute: "copy-button" })
	copyButton?: boolean = false;

	/**
	 * @attribute show/hide line no.
	 */
	@property({ type: Boolean, reflect: true, attribute: "show-line-numbers" })
	showLineNumbers?: boolean = true;

	/**
	 * @attribute read-only-mode
	 */
	@property({ type: Boolean, reflect: true, attribute: "read-only" })
	readOnly?: boolean = false;

	@query(".copy-button")
	copyCodeButton?: FButton;

	@query("#sample-popover")
	samplePopover!: FDiv;

	removedCommentsMap = new Map<number, string>();

	get dymanicWidth() {
		return this.title ? "hug-content" : "100%";
	}

	get fixedLang() {
		return this.language ?? "javascript";
	}

	multiLineStart(startIndex: number, endIndex: number, line: string) {
		if (startIndex >= 0 && endIndex >= 0) {
			return line.substring(0, startIndex) + line.substring(endIndex + 2);
		} else {
			return line.substring(0, startIndex);
		}
	}

	multiLineEnd(endIndex: number, line: string) {
		if (endIndex >= 0) {
			return { code: line.substring(endIndex + 2), insideMultiLine: false };
		} else {
			return { code: "", insideMultiLine: true };
		}
	}

	addNewLine(modifiedLine: string, newLines: string[]) {
		if (modifiedLine.trim() !== "") {
			newLines.push(modifiedLine);
		}
	}

	toggleComments() {
		if (!this.editor) return;
		const code = this.editor.getValue();
		const lines = code.split("\n");
		const newLines: string[] = [];
		let insideMultiLineComment = false;
		const removedCommentsMap = new Map<number, string>();
		const startPattern = languageCommentsMap.get(this.fixedLang)?.multiLine?.start;
		const endPattern = languageCommentsMap.get(this.fixedLang)?.multiLine?.end;
		const singleLinePattern = languageCommentsMap.get(this.fixedLang)?.singleLine;

		for (const [index, line] of lines.entries()) {
			let modifiedLine = line;

			// Check for multi-line comments start
			if (startPattern && endPattern && !insideMultiLineComment && line.includes(startPattern)) {
				insideMultiLineComment = true;
				const startIndex = line.indexOf(startPattern);
				const endIndex = line.indexOf(endPattern);
				modifiedLine = this.multiLineStart(startIndex, endIndex, line);
				// Save the multi-line comment in the map
				removedCommentsMap.set(index, line);
			}

			// Check for multi-line comments end
			if (endPattern && insideMultiLineComment) {
				const endIndex = line.indexOf(endPattern);
				const { code, insideMultiLine } = this.multiLineEnd(endIndex, line);
				modifiedLine = code;
				insideMultiLineComment = insideMultiLine ?? true;
				removedCommentsMap.set(index, line);
			}

			// Check for single-line comments
			if (singleLinePattern) {
				const commentIndex = modifiedLine.indexOf(singleLinePattern);
				if (commentIndex >= 0 && !insideMultiLineComment) {
					modifiedLine = modifiedLine.substring(0, commentIndex);
					// Save the single-line comment in the map
					removedCommentsMap.set(index, line);
				}
				this.addNewLine(modifiedLine, newLines);
				// Only add the line if it's not an empty line after removing the comments
			}
		}
		this.editor.setValue(newLines.join("\n"));
		this.removedCommentsMap = removedCommentsMap;
	}

	restoreComments() {
		if (!this.editor) return;
		const modifiedLines = this.editor.getValue().split("\n");
		const lines = modifiedLines.slice();
		const restoredLines = modifiedLines.slice();

		for (const [_index, removedComment] of this.removedCommentsMap.entries()) {
			lines.forEach((item, lineIndex) => {
				if (removedComment.trim().includes(item.trim())) {
					restoredLines.splice(lineIndex, 1);
				}
			});
		}

		for (const [index, removedComment] of this.removedCommentsMap.entries()) {
			// Restore the removed comment to its original position
			restoredLines.splice(index, 0, removedComment);
		}

		const code = restoredLines.join("\n");

		this.editor?.setValue(code);
		this.removedCommentsMap.clear();
	}

	errorMessageOnCopy() {
		if (this.copyCodeButton) {
			this.copyCodeButton.state = "danger";
			this.copyCodeButton.label = "ERROR!";
			this.copyCodeButton.iconLeft = "i-close";
		}
		setTimeout(() => {
			if (this.copyCodeButton) {
				this.copyCodeButton.state = "primary";
				this.copyCodeButton.label = "COPY";
				this.copyCodeButton.iconLeft = "i-copy";
			}
		}, 2000);
	}

	successMessageOnCopy() {
		if (this.copyCodeButton) {
			this.copyCodeButton.state = "success";
			this.copyCodeButton.label = "COPIED!";
			this.copyCodeButton.iconLeft = "i-tick";
		}
		setTimeout(() => {
			if (this.copyCodeButton) {
				this.copyCodeButton.state = "primary";
				this.copyCodeButton.label = "COPY";
				this.copyCodeButton.iconLeft = "i-copy";
			}
		}, 2000);
	}

	// Function to copy the code inside the editor to the clipboard
	copyCodeToClipboard() {
		if (this.editor) {
			const code = this.editor?.getValue();

			// Copy the entire code to the clipboard
			navigator.clipboard
				.writeText(code)
				.then(() => {
					this.successMessageOnCopy();
				})
				.catch(() => {
					this.errorMessageOnCopy();
				});
		}
	}

	handleChange(e: CustomEvent<{ value: unknown }>) {
		if (!e.detail.value) {
			this.toggleComments();
		} else {
			this.restoreComments();
		}
	}

	/**
	 * monoco editor never works in shadow dom
	 */
	createRenderRoot() {
		return this;
	}

	render() {
		const titleSection = this.title
			? html` <f-div gap="medium" align="middle-left">
					<f-icon source="i-code" state="default" size="x-small"></f-icon>
					<f-text variant="code" size="small" weight="regular" state="secondary"
						>${this.title}</f-text
					>
			  </f-div>`
			: nothing;

		const copyButtonSection = this.copyButton
			? html` <f-button
					class="copy-button"
					variant="curved"
					category="fill"
					size="x-small"
					label="COPY"
					icon-left="i-copy"
					@click=${this.copyCodeToClipboard}
			  ></f-button>`
			: nothing;
		const commentsToggleSection = this.comments
			? html` <f-div gap="small" align="middle-left" width="hug-content">
					<f-text variant="heading" size="x-small" weight="regular" state="subtle">Comments</f-text>
					<f-div width="hug-content" overflow="hidden">
						<f-switch size="small" @input=${this.handleChange} .value=${true}></f-switch>
					</f-div>
			  </f-div>`
			: nothing;

		const actionSection =
			this.copyButton || this.comments
				? html` <f-div gap="medium" align="middle-right" width=${this.dymanicWidth}>
						${commentsToggleSection} ${copyButtonSection}
				  </f-div>`
				: nothing;

		const samplePopOver = html`<f-div
			id="sample-popover"
			width="300px"
			state="secondary"
			padding="medium"
			style="display:none !important;"
		>
			<f-text
				>Suspendisse potenti. Ut sed mi sed tortor placerat eleifend id id libero. Nam eget metus
				mattis, consequat odio eget, interdum risus. Curabitur ac gravida lorem, ac dignissim mi.
				Etiam semper tortor nec tincidunt accumsan. Nunc malesuada sit amet purus semper suscipit.
				Maecenas dapibus eleifend nisi, a euismod urna tristique eu. Cras et odio sed massa
				vulputate pellentesque et quis lorem. Orci varius natoque penatibus et magnis dis parturient
				montes, nascetur ridiculus mus.</f-text
			>
		</f-div>`;
		if (this.comments || this.copyButton || this.title) {
			return html` <f-div state="secondary" class="f-code-editor-header" padding="medium">
				${titleSection} ${actionSection} ${samplePopOver}
			</f-div>`;
		} else {
			return samplePopOver;
		}
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		if (this.editor) {
			this.editor.dispose();
		}
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		this.style.height = this.height as string;
		this.style.width = this.width as string;
		if (this.code) {
			monaco.languages.registerCompletionItemProvider(this.language ?? "hcl", {
				provideCompletionItems: function (model, position) {
					const word = model.getWordUntilPosition(position);
					const range = {
						startLineNumber: position.lineNumber,
						endLineNumber: position.lineNumber,
						startColumn: word.startColumn,
						endColumn: word.endColumn
					};
					return {
						suggestions: createDependencyProposals(range)
					};
				}
			});

			this.editor = monaco.editor.create(
				this,
				{
					value: this.code,
					theme: "vs-dark",
					language: this.language,
					automaticLayout: true,
					autoDetectHighContrast: false,
					readOnly: this.readOnly,
					fontSize: 16,
					padding: {
						top: 16
					},
					detectIndentation: false,
					glyphMargin: true,
					formatOnPaste: true,
					formatOnType: false,
					minimap: { enabled: false },
					dimension: {
						width: this.offsetWidth,
						height: this.offsetHeight
					},
					...this.settings
				},
				this.services
			);

			const hoverMessage = `## Components\nVisit the [Flow components Storybook](https://flow.ollion.com/v2/index.html)
			
			\n## Templates
			
			\nVisit the [Flow templates Storybook](https://flow.ollion.com/templates/index.html)
			
			\n## Dependencies
			
			\n- Tables (In development)
			\n- Logs (coming soon)
			\n- Force graph (coming soon)
			\n- Themes (coming soon)
			\n- Time-series (coming soon)
			
			\n## Resources
			
			\n- [Documentation](https://drive.google.com/drive/u/0/folders/1K4TLqpqrY0BNjQZ4fwZK_ZF-9M69Q4is)
			\n- [Figma for designers](https://www.figma.com/community/file/1240565037876928288/Flow-UI-Kit)
			\n- [VS code plugin](https://marketplace.visualstudio.com/items?itemName=dev-vikas.flow-intellisense-vscode)
			\n- Releases
			
			\n## Get in touch
			
			\nIf you would like to get in touch or contribute, please write to <flow@ollion.com>.
			`;
			this.editor.createDecorationsCollection([
				// {
				// 	range: new monaco.Range(3, 1, 5, 1),
				// 	options: {
				// 		isWholeLine: true,
				// 		linesDecorationsClassName: "myLineDecoration"
				// 	}
				// },
				// {
				// 	range: new monaco.Range(7, 1, 7, 24),
				// 	options: { inlineClassName: "myInlineDecoration" }
				// },
				{
					range: new monaco.Range(2, 1, 2, 1),
					options: {
						isWholeLine: true,
						className: "myContentClass",
						glyphMarginClassName: "myGlyphMarginClass",

						glyphMarginHoverMessage: [{ value: hoverMessage }],
						lineNumberHoverMessage: [{ value: hoverMessage }],
						hoverMessage: [{ value: hoverMessage }]
					}
				}
			]);
			const formatDoc = this.editor.getAction("editor.action.formatDocument");
			if (formatDoc !== null) {
				setTimeout(() => {
					void formatDoc.run();
				}, 100);
			}
			if (this.showLineNumbers) {
				this.editor.updateOptions({ lineNumbers: "on" });
			} else {
				this.editor.updateOptions({ lineNumbers: "off" });
			}

			//const position: monaco.IPosition = { lineNumber: 10, column: 35 };

			//showPopoverAtPosition(this.editor, this.samplePopover, position);

			this.editor?.getModel()?.onDidChangeContent(() => {
				// if (formatDoc !== null) {
				// 	void formatDoc.run();
				// }
				const inputEvent = new CustomEvent("content-change", {
					detail: {
						value: this.editor?.getModel()?.getValue()
					},
					bubbles: true,
					composed: true
				});

				this.dispatchEvent(inputEvent);
			});

			this.querySelector(".monaco-editor")?.setAttribute("state", this.state ?? "default");
		}
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-code-editor": FCodeEditor;
	}
}
