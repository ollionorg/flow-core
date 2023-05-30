import { html, PropertyValueMap, unsafeCSS } from "lit";
import { property } from "lit/decorators.js";
import eleStyle from "./f-log.scss";

import { FRoot, flowElement } from "@cldcvr/flow-core";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { SearchAddon } from "xterm-addon-search";
import { SearchBarAddon } from "xterm-addon-search-bar";
import { WebLinksAddon } from "xterm-addon-web-links";
import xtermCSS from "xterm/css/xterm.css";

/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@flowElement("f-log")
export class FLog extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), unsafeCSS(xtermCSS)];

	/**
	 * @attribute logs to be displayed on screen
	 */
	@property({ type: String, reflect: false })
	logs?: string;

	/**
	 * @attribute show search bar
	 */
	@property({ type: Boolean, reflect: true, attribute: "show-search" })
	showSearch?: boolean = false;

	/**
	 * @attribute show scroll bar to scroll the terminal
	 */
	@property({ type: Boolean, reflect: true, attribute: "show-scrollbar" })
	showScrollbar?: boolean = false;

	terminal!: Terminal;

	fitAddon!: FitAddon;

	searchAddon!: SearchAddon;

	searchAddonBar!: SearchBarAddon;

	themeobserver!: MutationObserver;

	lineNumber = 1;

	fterminalRef: Ref<HTMLDivElement> = createRef();

	/**
	 *
	 * @param logs string value
	 */
	write(logs: string | undefined) {
		if (logs) {
			this.terminal.write(this.addLineNumbers(logs));
		}
	}

	/**
	 * show and hide search
	 */
	toggleSearch() {
		if (this.showSearch && this.fterminalRef.value) {
			this.searchAddonBar.show();
			const searchInput =
				this.fterminalRef.value.querySelector<HTMLInputElement>(".search-bar__input");

			searchInput?.parentElement?.addEventListener("click", (e: MouseEvent) => {
				e.stopPropagation();
			});

			if (searchInput) {
				searchInput.placeholder = "Search";
			}
		} else {
			this.searchAddonBar.hidden();
		}
	}

	/**
	 *
	 * @param logs string value of logs
	 * @returns line no.'s appended on every line
	 */
	addLineNumbers(logs: string) {
		const termRegex = /"([^"]+)":/g;
		return `${("\x1b[38;2;123;147;178m" + this.lineNumber++ + "\x1b[0m ").padEnd(4)} ${logs
			.replace(/\n/g, "\r\n")
			.replace(/\[INFO\]/g, "\x1b[38;2;26;149;255m[INFO]\x1b[0m")
			.replace(/\[WARN\]/g, "\x1b[38;2;254;164;1m[WARN]\x1b[0m")
			.replace(/\[ERROR\]/g, "\x1b[38;2;242;66;66m[ERROR]\x1b[0m")
			.replace(/\[DEBUG\]/g, "\x1b[38;2;211;153;255m[DEBUG]\x1b[0m")
			.replace(/\d{4}[-\/][01]\d[-\/][0-3]\d.[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?Z?/g, date => {
				return `\x1b[38;2;123;147;178m${date}\x1b[0m`;
			})
			.replace(termRegex, key => {
				return `\x1b[38;2;242;137;104m${key}\x1b[0m`;
			})
			.replace(/(\r\n|\n\r|\n|\r)/g, (_match, p1, _offset, _string) => {
				return `${p1}${("\x1b[38;2;123;147;178m" + this.lineNumber++ + "\x1b[0m ").padEnd(4)} `;
			})}`;
	}

	/**
	 * custom event on close of search bar
	 */
	dispatchCloseSearchEvent() {
		const event = new CustomEvent("close", {
			detail: {
				value: false
			},
			bubbles: true,
			composed: true
		});
		this.showSearch = false;
		this.dispatchEvent(event);
	}

	/**
	 * destroy themeobserver
	 */
	disconnectedCallback() {
		if (this.themeobserver) {
			this.themeobserver.disconnect();
		}
		super.disconnectedCallback();
	}

	/**
	 * creating the terminal
	 */
	init() {
		// Checking if parent container is present
		if (this.fterminalRef.value) {
			this.fterminalRef.value.innerHTML = "";

			// finding theme element from DOM
			const themeElement = document.querySelector<HTMLElement>("[data-theme]");

			/**
			 * CSS variables are not working in Canvas , so need to read values through computed style
			 */

			if (themeElement) {
				const style = getComputedStyle(themeElement);

				const getTheme = () => {
					return {
						foreground: style.getPropertyValue("--color-text-default"),
						selectionBackground: "#ffff05",
						selectionForeground: "#000"
					};
				};

				/**
				 * Create Terminal Instance
				 */
				this.terminal = new Terminal({
					fontSize: 14,
					cursorStyle: "underline",
					scrollback: 999999,
					theme: getTheme()
				});

				/**
				 * Observe for theme changes
				 */
				if (!this.themeobserver) {
					this.themeobserver = new MutationObserver(() => {
						this.terminal.options = { theme: getTheme() };
					});

					this.themeobserver.observe(themeElement, {
						attributes: true,
						childList: false,
						subtree: false
					});
				}
				/**
				 * Fit according to container width and height
				 */
				this.fitAddon = new FitAddon();
				/**
				 * Search add-on for searching text inside canvas
				 */
				this.searchAddon = new SearchAddon();
				this.searchAddonBar = new SearchBarAddon({
					searchAddon: this.searchAddon
				});
				this.lineNumber = 1;

				this.terminal.loadAddon(this.fitAddon);
				this.terminal.loadAddon(this.searchAddon);
				this.terminal.loadAddon(this.searchAddonBar);
				this.terminal.loadAddon(new WebLinksAddon());

				this.terminal.open(this.fterminalRef.value);

				// adding line numbers
				this.write(this.logs);

				this.toggleSearch();

				const closeSearch = this.fterminalRef.value.querySelector(".search-bar__btn.close");
				const nextSearch = this.fterminalRef.value.querySelector(".search-bar__btn.next");
				const prevSearch = this.fterminalRef.value.querySelector(".search-bar__btn.prev");

				closeSearch?.addEventListener("click", () => {
					this.searchAddonBar.hidden();
					this.dispatchCloseSearchEvent();
				});

				nextSearch?.addEventListener("click", () => {
					const searchInputValue =
						this.fterminalRef.value?.querySelector<HTMLInputElement>(".search-bar__input")?.value;
					this.searchAddon.findNext(searchInputValue ?? "");
				});

				prevSearch?.addEventListener("click", () => {
					const searchInputValue =
						this.fterminalRef.value?.querySelector<HTMLInputElement>(".search-bar__input")?.value;
					this.searchAddon.findPrevious(searchInputValue ?? "");
				});

				this.fitAddon.fit();

				new ResizeObserver(() => {
					try {
						this.fitAddon.fit();
					} catch (e) {
						//@ts-check
						console.error(e);
					}
				}).observe(this.fterminalRef.value);
			}
		}
	}

	/**
	 *
	 * @returns html remdered
	 */
	render() {
		/**
		 * Final html to render
		 */
		return html`
			<div ${ref(this.fterminalRef)} class="f-log" ?data-scrollbar=${this.showScrollbar}></div>
		`;
	}

	/**
	 * on mount
	 */
	protected firstUpdated() {
		this.init();
	}

	/**
	 * works on every updates taking place
	 * @param changedProperties updated properties
	 */
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		changedProperties.forEach((oldValue, propName) => {
			if (propName === "logs" && oldValue !== this.logs) {
				this.init();
			}
			if (propName === "showSearch" && oldValue !== this.showSearch) {
				this.toggleSearch();
			}
		});
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-log": FLog;
	}
}
