import { FLog } from "./f-log";
import * as Mark from "mark.js";

export function closeSearchBar(this: FLog) {
	this.showToolbar = false;
	this.highlightText("");
}

/**
 * Filter lines based on selected log level
 * @param filterText
 */
export function filterLines(this: FLog, filterText: string) {
	if (filterText.trim() !== "") {
		const lines = this.shadowRoot?.querySelectorAll(".log-line");
		if (lines) {
			lines.forEach(element => {
				if (!element.textContent?.toLowerCase()?.includes(filterText)) {
					element.classList.add("hidden");
				}
			});
		}
	}
}
/**
 * clear filtered lines
 */
export function clearFilter(this: FLog) {
	const lines = this.shadowRoot?.querySelectorAll(".log-line.hidden");
	if (lines) {
		lines.forEach(element => {
			element.classList.remove("hidden");
		});
	}
}

/**
 * It will highlight text present in logs with mark tag
 * @param searchText
 */
export function highlightText(this: FLog, searchText: string): void {
	if (this.searchDebounceTimeout) {
		clearTimeout(this.searchDebounceTimeout);
	}
	this.searchDebounceTimeout = setTimeout(() => {
		const markInstance = new Mark(
			this.shadowRoot?.querySelectorAll(".log-line:not(.hidden)") as NodeListOf<HTMLSpanElement>
		);
		if (this.lastSearchValue && this.lastSearchValue !== "") {
			markInstance.unmark(this.lastSearchValue as unknown as HTMLElement);
		}
		this.lastSearchValue = searchText;
		if (searchText && searchText !== "") {
			markInstance.mark(searchText, {
				done: (occurrences: number) => {
					this.searchOccurrences = occurrences;
					const firstMark = this.shadowRoot?.querySelector("mark[data-markjs='true']");
					firstMark?.scrollIntoView({ block: "start", behavior: "smooth" });
					firstMark?.classList.add("active");
					this.currentMarkIndex = 0;
					if (occurrences > 0) {
						if (this.searchInput) this.searchInput.suggestElement.suffix = `1 of ${occurrences}`;
					} else {
						if (this.searchInput) this.searchInput.suggestElement.suffix = `No results`;
					}
				}
			});
		} else {
			if (this.searchInput) this.searchInput.suggestElement.suffix = undefined;
			this.searchOccurrences = 0;
		}
	}, 500);
}

/**
 * when next arrow is clicked, it will go to next highlighted mark
 */
export function nextMark(this: FLog) {
	if (this.searchOccurrences > 0 && this.allMarks) {
		this.allMarks[this.currentMarkIndex].classList.remove("active");
		this.currentMarkIndex += 1;
		if (this.currentMarkIndex === this.allMarks.length) {
			this.currentMarkIndex = 0;
		}
		this.allMarks[this.currentMarkIndex].scrollIntoView({ block: "start", behavior: "smooth" });
		this.allMarks[this.currentMarkIndex].classList.add("active");
		if (this.searchInput) {
			this.searchInput.suggestElement.suffix = `${this.currentMarkIndex + 1} of ${
				this.searchOccurrences
			}`;
		}
	}
}

/**
 * when previous arrow is clicked, it will go to previous highlighted mark
 */
export function prevMark(this: FLog) {
	if (this.searchOccurrences > 0 && this.allMarks) {
		this.allMarks[this.currentMarkIndex].classList.remove("active");
		this.currentMarkIndex -= 1;
		if (this.currentMarkIndex === -1) {
			this.currentMarkIndex = this.allMarks.length - 1;
		}
		this.allMarks[this.currentMarkIndex].scrollIntoView({ block: "start", behavior: "smooth" });
		this.allMarks[this.currentMarkIndex].classList.add("active");
		if (this.searchInput) {
			this.searchInput.suggestElement.suffix = `${this.currentMarkIndex + 1} of ${
				this.searchOccurrences
			}`;
		}
	}
}

export function handleLogLevelFilter(this: FLog, event: CustomEvent<{ scope: string }>) {
	this.clearFilter();
	const logLevel = event.detail.scope;
	if (logLevel && logLevel !== "ALL") {
		this.filterLines(logLevel.toLowerCase());
	}
}

export function handleSearch(this: FLog, event: CustomEvent<{ value: string; scope: string }>) {
	this.highlightText(event.detail.value);
	this.handleLogLevelFilter(event);
}
