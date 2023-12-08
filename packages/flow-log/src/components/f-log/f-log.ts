/* eslint-disable @typescript-eslint/ban-ts-comment */
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
	FSelect
} from "@cldcvr/flow-core";

import { injectCss } from "@cldcvr/flow-core-config";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { classMap } from "lit/directives/class-map.js";
// Anser is used to highlight bash color codes
import anser from "anser";

import { formatLogLine, getUniqueStringId } from "./f-log-utils";
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
		...FSelect.styles
	];

	/**
	 * @attribute logs to be displayed on screen
	 */
	@property({ type: String, reflect: false })
	logs!: string;

	/**
	 * @attribute show search bar
	 */
	@property({ type: Boolean, reflect: true, attribute: "show-search" })
	showSearch?: boolean = false;

	/**
	 * @attribute show scroll bar to scroll the terminal
	 */
	@property({ type: Boolean, reflect: true, attribute: "wrap-text" })
	wrapText?: boolean = false;

	scrollRef: Ref<FDiv> = createRef();

	logContainer: Ref<HTMLPreElement> = createRef();
	renderStatus: Ref<FDiv> = createRef();

	@query("#statusText")
	statusText!: FText;

	@query("#search-input")
	searchInput!: FSearch;

	@queryAll("mark[data-markjs='true']")
	allMarks!: NodeListOf<HTMLElement>;

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
		return `<span class="log-line">${anser.ansiToHtml(
			formatLogLine(this.logs.substring(this.lastPointerIdx, this.currentIdx + 1))
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

			this.statusText.innerHTML = `${perecentageDone.toFixed(0)}%`;
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
		}
	}

	get topBar() {
		return html`<f-div height="hug-content" align="middle-right" class="top-bar">
			${this.searchBarTemplate}
		</f-div>`;
	}

	get searchBarTemplate() {
		if (this.showSearch) {
			return html`<f-div height="hug-content" align="middle-right">
				<f-div width="460px">
					<f-search
						id="search-input"
						placeholder="Search"
						.scope=${["ALL", "ERROR", "WARN", "DEBUG", "INFO", "TRACE", "FATAL"]}
						.selectedScope=${"ALL"}
						@input=${this.handleSearch}
						variant="block"
						.disableResult=${true}
					></f-search>
				</f-div>
				<f-div width="hug-content" align="middle-center">
					<f-icon-button
						state="neutral"
						@click=${this.prevMark}
						variant="packed"
						icon="i-arrow-up"
					></f-icon-button>
					<f-divider></f-divider>
					<f-icon-button
						state="neutral"
						variant="packed"
						icon="i-arrow-down"
						@click=${this.nextMark}
					></f-icon-button>
					<f-divider></f-divider>
					<f-icon-button
						state="neutral"
						variant="packed"
						icon="i-close"
						@click=${() => this.closeSearchBar()}
					></f-icon-button>
				</f-div>
			</f-div>`;
		}
		return nothing;
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
				.height=${this.showSearch ? "calc(100% - 36px)" : "100%"}
			>
				<pre ${ref(this.logContainer)}></pre>

				<f-div
					height="36px"
					padding="none small"
					state="default"
					class="loading-logs"
					gap="small"
					align="middle-right"
					${ref(this.renderStatus)}
				>
					<f-icon source="i-loading" loading></f-icon>
					<f-text id="statusText" inline>0%</f-text>
				</f-div>
			</f-div>`;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		if (changedProperties.has("logs")) {
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

		window.addEventListener("keydown", this.searchShortCutHhandler, { capture: true });
	}

	disconnectedCallback(): void {
		super.disconnectedCallback();

		window.removeEventListener("keydown", this.searchShortCutHhandler);
	}

	searchShortCutHhandler = (event: KeyboardEvent) => {
		event.stopPropagation();
		if ((event.metaKey || event.ctrlKey) && event.key === "f") {
			this.showSearch = true;
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
