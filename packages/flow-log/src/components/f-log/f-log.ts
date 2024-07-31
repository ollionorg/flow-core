import { html, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, queryAll } from "lit/decorators.js";
import globalStyle from "./f-log-global.scss?inline";
import eleStyle from "./f-log.scss?inline";

import {
	FRoot,
	flowElement,
	FDiv,
	FIcon,
	FText,
	FIconButton,
	FDivider,
	FSearch,
	FSelect,
	FInput
} from "@nonfx/flow-core";

import { injectCss } from "@nonfx/flow-core-config";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { classMap } from "lit/directives/class-map.js";
// Anser is used to highlight bash color codes
import anser from "anser";

import { formatLogLine, getUniqueStringId, HighlightKeywords } from "./f-log-utils";
import {
	clearFilter,
	closeSearchBar,
	filterLines,
	handleLogLevelFilter,
	handleSearch,
	highlightText,
	nextMark,
	prevMark
} from "./f-log-search-and-filters";

injectCss("f-log", globalStyle);
// The number of lines we process in one batch
const DEFAULT_BATCH_SIZE = 1000;

// The maximum character length we process in a line, this is to prevent overflows
const MAXIMUM_LINE_LENGTH = 10000;

export type FLogHighlightKeywords = HighlightKeywords;
export type FLogLevels = string[];
/**
 * @summary Text component includes Headings, titles, body texts and links.
 */
@flowElement("f-log")
export class FLog extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FDiv.styles,
		...FIcon.styles,
		...FText.styles,
		...FSearch.styles,
		...FIconButton.styles,
		...FDivider.styles,
		...FSelect.styles,
		...FInput.styles
	];

	/**
	 * @attribute logs to be displayed on screen
	 */
	@property({ type: String, reflect: false })
	logs!: string;

	/**
	 * @attribute label will display on left top corner
	 */
	@property({ type: String, reflect: true })
	label?: string;
	/**
	 * @attribute show toolbar
	 */
	@property({ type: Boolean, reflect: true, attribute: "show-toolbar" })
	showToolbar?: boolean = false;

	/**
	 * @attribute show scroll bar to scroll the terminal
	 */
	@property({ type: Boolean, reflect: true, attribute: "wrap-text" })
	wrapText?: boolean = false;

	@property({ type: Array, reflect: true, attribute: "log-levels" })
	logLevels: FLogLevels = ["ALL", "ERROR", "WARN", "DEBUG", "INFO", "TRACE", "FATAL"];

	/**
	 * for vue2
	 */
	set ["log-levels"](val: string[]) {
		this.logLevels = val;
	}

	@property({ type: String, reflect: true, attribute: "selected-log-level" })
	selectedLogLevel: string = "ALL";

	@property({ type: Object, reflect: true, attribute: "highlight-keywords" })
	highlightKeywords?: FLogHighlightKeywords;

	@property({ type: String, reflect: true, attribute: "search-keyword" })
	searchKeyword?: string;

	/**
	 * for vue2
	 */
	set ["highlight-keywords"](val: FLogHighlightKeywords) {
		this.highlightKeywords = val;
	}

	scrollRef: Ref<FDiv> = createRef();

	logContainer: Ref<HTMLPreElement> = createRef();

	renderStatus: Ref<FDiv> = createRef();

	@query("#search-input")
	searchInput?: FSearch;

	@query("#linenumber-input")
	lineNumberInput?: FInput;

	@queryAll("mark[data-markjs='true']")
	allMarks?: NodeListOf<HTMLElement>;

	@queryAll(".log-line")
	allLines?: NodeListOf<HTMLElement>;

	lastSearchValue?: string;

	// These pointers are used to find out the current index of the logs string being rendered

	lastPointerIdx: number = 0;

	currentIdx: number = 0;

	currentBatchId: string = getUniqueStringId();

	requestIdleId?: number;

	range = document.createRange();
	currentMarkIndex = 0;
	searchOccurrences = 0;

	searchDebounceTimeout?: ReturnType<typeof setTimeout>;

	handleSearch = handleSearch;
	closeSearchBar = closeSearchBar;
	prevMark = prevMark;
	nextMark = nextMark;
	highlightText = highlightText;
	clearFilter = clearFilter;
	filterLines = filterLines;
	handleLogLevelFilter = handleLogLevelFilter;
	// Processes the current log batch and renders the lines in the terminal
	processNextBatch(batchSize = DEFAULT_BATCH_SIZE) {
		let currentBatchSize = 0;

		let fragment = "";

		while (currentBatchSize < batchSize) {
			if (
				this.logs &&
				// If we have reached a new line
				(this.logs[this.currentIdx] === "\n" ||
					// Or if we exceed maximum log lines we render and move on
					this.currentIdx - this.lastPointerIdx > MAXIMUM_LINE_LENGTH)
			) {
				fragment = `${fragment}${this.getCurrentLogLine()}`;
				this.lastPointerIdx = this.currentIdx + 1;
				currentBatchSize++;
			}

			// Check if we ended up processing beyond the file
			if (this.logs && this.currentIdx === this.logs.length) {
				fragment = `${fragment}${this.getCurrentLogLine()}`;
				break;
			}

			this.currentIdx++;
		}

		this.logContainer.value?.append(this.range.createContextualFragment(fragment));
	}

	getCurrentLogLine() {
		const logLine = this.logs.substring(this.lastPointerIdx, this.currentIdx + 1);
		let isLineHidden = false;
		if (
			this.selectedLogLevel !== "ALL" &&
			!logLine?.toLowerCase()?.includes(this.selectedLogLevel.toLowerCase())
		) {
			isLineHidden = true;
		}

		return `<span class="log-line${isLineHidden ? " hidden" : ""}">${anser.ansiToHtml(
			formatLogLine(logLine, this.highlightKeywords)
		)}</span>`;
	}

	// Renders log in batches to prevent browser from freezing
	renderBatchedLogs(batchId: string) {
		if (this.currentIdx < this.logs.length && this.currentBatchId === batchId) {
			this.processNextBatch();
			if (this.scrollRef.value && this.logs.length > 0) {
				this.scrollRef.value.scrollTop = this.scrollRef.value.scrollHeight;
			}
			if (this.requestIdleId) {
				cancelIdleCallback(this.requestIdleId);
			}
			const perecentageDone = (this.currentIdx * 100) / this.logs.length;

			if (perecentageDone >= 100) {
				this.renderStatus.value?.style.setProperty("display", "none");
			} else {
				this.renderStatus.value?.style.setProperty("display", "flex");
			}
			this.requestIdleId = requestIdleCallback(() => this.renderBatchedLogs(batchId));
		} else {
			if (this.requestIdleId) {
				cancelIdleCallback(this.requestIdleId);
			}
			if (this.searchKeyword) {
				this.highlightText(this.searchKeyword, true);
			}
		}
	}
	/**
	 *
	 * @param event on Enter press in line number input will go to line
	 */
	handleLineNumber(event: KeyboardEvent) {
		if (event.key === "Enter") {
			this.goToLine(this.lineNumberInput?.value as number);
		}
	}
	/**
	 *
	 * @param linenumber this function can be used externally as well to force to go line number
	 */
	goToLine(linenumber: number) {
		if (linenumber > 0 && this.allLines) {
			const lineToJump = this.allLines[linenumber - 1];
			lineToJump.scrollIntoView({
				block: "center",
				behavior: "smooth"
			});
			lineToJump.classList.add("blink");
			setTimeout(() => {
				lineToJump.classList.remove("blink");
			}, 6000);
		}
	}

	get labelTemplate() {
		if (this.label) {
			return html`<f-div width="hug-content" align="middle-left" gap="medium"
				><f-text variant="heading" size="medium" weight="medium">${this.label}</f-text
				><f-divider></f-divider
			></f-div>`;
		}

		return nothing;
	}

	get topBar() {
		if (this.showToolbar) {
			return html`<f-div
				height="44px"
				padding="none none small none"
				align="middle-left"
				class="top-bar"
				gap="medium"
			>
				${this.labelTemplate} ${this.searchBarTemplate}
				<slot name="header" class="header-slot"></slot>
				<f-div width="100px" height="hug-content">
					<f-input
						id="linenumber-input"
						type="number"
						placeholder="line #"
						@keypress=${this.handleLineNumber}
					>
					</f-input>
				</f-div>
				<slot name="actions" class="action-slot"></slot>
			</f-div>`;
		}
		return nothing;
	}

	get searchBarTemplate() {
		return html`<f-div height="hug-content" width="hug-content" gap="medium" align="middle-left">
			<f-div width="120px" gap="medium">
				<f-select
					@input=${this.handleLogLevelFilter}
					.options=${this.logLevels}
					.value=${this.selectedLogLevel}
				></f-select>
			</f-div>
			<f-div width="250px" gap="medium">
				<f-search
					id="search-input"
					variant="round"
					placeholder="Search"
					@input=${this.handleSearch}
					.value=${this.searchKeyword}
					.disableResult=${true}
				></f-search>
			</f-div>
			<f-div width="hug-content" gap="small" align="middle-center">
				<f-icon-button
					size="small"
					state="neutral"
					@click=${this.prevMark}
					icon="i-arrow-sm-up"
				></f-icon-button>
				<f-icon-button
					size="small"
					state="neutral"
					icon="i-arrow-sm-down"
					@click=${this.nextMark}
				></f-icon-button>
			</f-div>
		</f-div>`;
	}
	render() {
		const cssClasses = {
			"logs-view": true,
			"wrap-text": Boolean(this.wrapText)
		};
		return html` ${this.topBar}
			<f-div
				${ref(this.scrollRef)}
				class=${classMap(cssClasses)}
				align="top-left"
				overflow="scroll"
				width="100%"
				direction="column"
				show-scrollbar
				.height=${this.showToolbar ? "calc(100% - 44px)" : "100%"}
			>
				<pre ${ref(this.logContainer)}></pre>

				<f-div
					height="42px"
					padding="none small"
					state="default"
					class="loading-logs"
					gap="small"
					align="middle-center"
					${ref(this.renderStatus)}
				>
					<f-icon source="i-loading" size="large" loading></f-icon>
				</f-div>
			</f-div>`;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		/**
		 * render whole ogs only when logs property changes
		 */
		if (changedProperties.has("logs") || changedProperties.has("selectedLogLevel")) {
			void this.updateComplete.then(() => {
				this.lastPointerIdx = 0;
				this.currentIdx = 0;
				this.currentBatchId = getUniqueStringId();
				if (this.logContainer.value) {
					this.logContainer.value.innerHTML = "";
				}
				this.renderBatchedLogs(this.currentBatchId);
			});
		}
		if (changedProperties.has("searchKeyword")) {
			this.highlightText(this.searchKeyword, true);
		}

		window.addEventListener("keydown", this.searchShortCutHhandler, { capture: true });
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();

		window.removeEventListener("keydown", this.searchShortCutHhandler);
	}
	/**
	 *
	 * @param event shortcut to open toolbar
	 */
	searchShortCutHhandler = (event: KeyboardEvent) => {
		event.stopPropagation();
		if ((event.metaKey || event.ctrlKey) && event.key === "f") {
			this.showToolbar = true;
		}
		if (event.key === "Escape") {
			this.closeSearchBar();
		}
	};
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-log": FLog;
	}
}
