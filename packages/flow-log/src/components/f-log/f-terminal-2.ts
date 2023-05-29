import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import eleStyle from "./f-log.scss";

import { FRoot, flowElement } from "@cldcvr/flow-core";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { SearchBarAddon } from "xterm-addon-search-bar";
import { WebLinksAddon } from "xterm-addon-web-links";
import xtermCSS from "xterm/css/xterm.css";

export type FTerminalStateProp =
	| "default"
	| "secondary"
	| "subtle"
	| "primary"
	| "success"
	| "danger"
	| "warning"
	| "inherit"
	| `custom, ${string}`;

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@flowElement("f-log")
export class FTerminal extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(xtermCSS)];

	/**
	 * @attribute local state for managing custom fill.
	 */
	@state()
	fill = "";

	/**
	 * @attribute Variants of text component are use cases such as Heading, paragraph, and code.
	 */
	@property({ type: String, reflect: false })
	logs?: string;

	@property({ type: Boolean, reflect: true, attribute: "show-search" })
	showSearch?: boolean = false;

	@property({ type: Boolean, reflect: true, attribute: "show-scrollbar" })
	showScrollbar?: boolean = false;

	terminal!: Terminal;

	fitAddon!: FitAddon;

	searchAddon!: SearchAddon;

	searchAddonBar!: SearchBarAddon;

	themeobserver!: MutationObserver;

	lineNumber = 1;

	fterminalRef: Ref<HTMLDivElement> = createRef();

	write(logs: string | undefined) {
		if (logs) {
			this.terminal.write(this.addLineNumbers(logs));
		}
	}
	toggleSearch() {
		if (this.showSearch) {
			this.searchAddonBar.show();
			const searchInput = document.querySelector<HTMLInputElement>(".search-bar__input");
			if (searchInput) {
				searchInput.placeholder = "Search";
			}
		}
	}

	addLineNumbers(logs: string) {
		return `${`\x1b[38;2;123;147;178m${this.lineNumber++}\x1b[0m `.padEnd(4)} ${logs
			.replace(/\n/g, "\r\n")
			.replace(/\[INFO\]/g, "\x1b[38;2;26;149;255m[INFO]\x1b[0m")
			.replace(/\[WARN\]/g, "\x1b[38;2;254;164;1m[WARN]\x1b[0m")
			.replace(/\[ERROR\]/g, "\x1b[38;2;242;66;66m[ERROR]\x1b[0m")
			.replace(/\[DEBUG\]/g, "\x1b[38;2;211;153;255m[DEBUG]\x1b[0m")
			.replace(/\d{4}(?:-|\/)[01]\d(?:-|\/)[0-3]\d.[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/g, date => {
				return `\x1b[38;2;123;147;178m${date}\x1b[0m`;
			})
			.replace(/".+":/g, key => {
				return `\x1b[38;2;242;137;104m${key}\x1b[0m`;
			})
			.replace(/(\r\n|\n\r|\n|\r)/g, (match, p1, _offset, _string) => {
				return `${p1}${`\x1b[38;2;123;147;178m${this.lineNumber++}\x1b[0m `.padEnd(4)} `;
			})}`;
	}

	init() {
		// Checking if parent container is present
		if (this) {
			this.innerHTML = "";

			// finding theme element from DOM
			const themeElement = document.querySelector<HTMLElement>(".data-theme");
			console.log(this, themeElement);

			/**
			 * CSS variables are not working in Canvas , so need to read values through computed style
			 */

			// const style = themeElement ? getComputedStyle(themeElement) : "";

			const getTheme = () => {
				/**
				 * Check if light theme applied and return theme object
				 */
				if (themeElement) {
					if (themeElement.getAttribute("data-theme") === "f-dark") {
						console.log("f-dark");
						return {
							white: "#000",
							brightWhite: "#000",
							brightBlack: "#fff",
							black: "#fff"
						};
					} else {
						/**
						 * Default Dark theme object
						 */
						return {
							white: "#fff",
							brightWhite: "#fff",
							brightBlack: "#000",
							black: "#000"
						};
					}
				}
			};

			/**
			 * Create Terminal Instance
			 */
			this.terminal = new Terminal({
				fontSize: 14,
				cursorStyle: "underline",
				scrollback: 9999999,
				theme: {
					white: "red",
					brightMagenta: "yellow",
					magenta: "pink",
					brightWhite: "red",
					selectionBackground: "yellow",
					selectionForeground: "black",
					black: "pink",
					brightBlack: "pink"
				}
			});

			/**
			 * Observe for theme changes
			 */
			// if (!this.themeobserver) {
			// 	this.themeobserver = new MutationObserver(async () => {
			// 		this.terminal.setOption("theme", getTheme());
			// 	});

			// 	// this.themeobserver.observe(themeElement, {
			// 	// 	attributes: true,
			// 	// 	childList: false,
			// 	// 	subtree: false
			// 	// });
			// }
			/**
			 * Fit according to container width and height
			 */
			this.fitAddon = new FitAddon();
			/**
			 * Search add-on for searching text inside canvas
			 */
			this.searchAddon = new SearchAddon();
			this.searchAddonBar = new SearchBarAddon({ searchAddon: this.searchAddon });
			this.lineNumber = 1;

			this.terminal.loadAddon(this.fitAddon);
			this.terminal.loadAddon(this.searchAddon);
			this.terminal.loadAddon(this.searchAddonBar);
			this.terminal.loadAddon(new WebLinksAddon());

			this.terminal.open(this);

			// adding line numbers
			this.write(this.logs);

			this.searchAddonBar.on(".search-bar__btn.close", "click", () => {
				// this.$emit("update:showSearch", false);
				console.log("update:showSearch", false);
			});

			this.toggleSearch();

			this.fitAddon.fit();

			// new ResizeObserver(() => {
			// 	try {
			// 		this.fitAddon.fit();
			// 	} catch (e) {
			// 		//@ts-checkconsole.error(e);
			// 	}
			// }).observe(this);

			// window.addEventListener(
			// 	"resize",
			// 	() => {
			// 		this.fitAddon.fit();
			// 	},
			// 	false
			// );

			/**
			 * fix for font loading issue
			 */
			// this.terminal.onResize(() => {
			// 	this.terminal.setOption("fontFamily", `"Operator Mono SSm A", "Operator Mono SSm B"`);
			// 	this.fitAddon.fit();
			// });
		}
	}

	// render() {
	// 	/**
	// 	 * Final html to render
	// 	 */
	// 	return html`
	// 		<div ${ref(this.fterminalRef)} class="f-log" :data-scrollbar="showScrollbar"></div>
	// 	`;
	// }

	createRenderRoot() {
		return this;
	}

	// protected firstUpdated() {
	// 	this.init();
	// }

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		this.init();

		// changedProperties.forEach((oldValue, propName) => {
		// 	if (propName === "logs") {
		// 		console.log(changedProperties);
		// 	}
		// });
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-log": FTerminal;
	}
}
