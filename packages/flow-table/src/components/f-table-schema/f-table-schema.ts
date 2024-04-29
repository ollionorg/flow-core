/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FButton, FDiv, FRoot, FSearch, FText } from "@ollion/flow-core";
import { html, HTMLTemplateResult, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import { FTable, FTableSelectable, FTableSize, FTableVariant } from "../f-table/f-table";
import { FTcell, FTcellActions, FTcellAlign } from "../f-tcell/f-tcell";
import { FTrow, FTrowChevronPosition, FTrowState } from "../f-trow/f-trow";
import eleStyle from "./f-table-schema.scss?inline";
import globalStyle from "./f-table-schema-global.scss?inline";
import { repeat } from "lit/directives/repeat.js";
import { injectCss } from "@ollion/flow-core-config";

injectCss("f-table-schema", globalStyle);

export type FTableSchemaDataRow = {
	selected?: boolean;
	details?: () => HTMLTemplateResult;
	state?: FTrowState;
	open?: boolean;
	id: string;
	disableSelection?: boolean;
	expandIconPosition?: FTrowChevronPosition;
	data: Record<string, FTableSchemaCell>;
};
export type FTableSchemaData = {
	header: Record<string, FTableSchemaHeaderCell>;
	rows: FTableSchemaDataRow[];
};

export type FTableSchemaCell<T = any> = {
	value: T;
	actions?: FTcellActions;
	align?: FTcellAlign;
	template?: (highlightText?: string | null) => HTMLTemplateResult;
	toString?: () => string;
};

export type FTableSchemaHeaderCell<T = any> = {
	value: T;
	template?: () => HTMLTemplateResult;
	width?: string;
	align?: FTcellAlign;
	selected?: boolean;
	disableSort?: boolean;
	sticky?: boolean;
};

export type FTableSchemaVariant = FTableVariant;
export type FTableSchemaSize = FTableSize;
export type FTableSchemaSelectable = FTableSelectable;

export type FTableSchemaHeaderCellemplate<T = any> = (value: T) => HTMLTemplateResult;
export type FTableSchemaStickyBackground = "default" | "secondary" | "tertiary" | "subtle";

export class FTableSchema extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FTable.styles,
		...FTcell.styles,
		...FTrow.styles,
		...FButton.styles,
		...FSearch.styles,
		...FText.styles,
		...FDiv.styles
	];

	/**
	 * @attribute data to display in table
	 */
	@property({ type: Object, reflect: true })
	data!: FTableSchemaData;

	@property({ type: String, reflect: true })
	variant?: FTableSchemaVariant = "stripped";

	/**
	 * header key used to specify sort attribute
	 */
	@property({ type: String, reflect: true, attribute: "sort-by" })
	sortBy?: string;

	/**
	 * sort order for `sort-by` attribute
	 */
	@property({ type: String, reflect: true, attribute: "sort-order" })
	sortOrder?: "asc" | "desc" = "asc";

	/**
	 * max rows per page , after that it will paginate on scroll
	 */
	@property({ type: Number, reflect: true, attribute: "rows-per-page" })
	rowsPerPage?: number = 50;
	/**
	 * @attribute size to apply on each cell
	 */
	@property({ type: String, reflect: true })
	size?: FTableSchemaSize = "medium";

	/**
	 * @attribute whether to display checkbox or radiobox
	 */
	@property({ type: String, reflect: true })
	selectable?: FTableSchemaSelectable = "none";

	/**
	 * @attribute highlight selected row, when selectable has value "single" or "multiple"
	 */
	@property({ type: Boolean, reflect: true, attribute: "highlight-selected" })
	highlightSelected = false;

	// fix for vue
	set ["highlight-selected"](val: boolean) {
		this.highlightSelected = val;
	}

	/**
	 * @attribute highlight on hover
	 */
	@property({ type: Boolean, reflect: true, attribute: "highlight-hover" })
	highlightHover = false;

	// fix for vue
	set ["highlight-hover"](val: boolean) {
		this.highlightHover = val;
	}

	/**
	 * @attribute highlight on column hover
	 */
	@property({ type: Boolean, reflect: true, attribute: "highlight-column-hover" })
	highlightColumnHover = true;

	// fix for vue
	set ["highlight-column-hover"](val: boolean) {
		this.highlightColumnHover = val;
	}
	/**
	 * @attribute is sticky header
	 */
	@property({ type: Boolean, reflect: true, attribute: "sticky-header" })
	stickyHeader = false;

	/**
	 * @attribute is sticky cell background
	 */
	@property({ type: String, reflect: true, attribute: "sticky-cell-background" })
	stickyCellBackground: FTableSchemaStickyBackground = "default";

	/**
	 * filter rows based on search term
	 */
	@property({ type: String, reflect: true, attribute: "search-term" })
	searchTerm: string | null = null;
	/**
	 * search on selected header
	 */
	@property({ type: String, reflect: true, attribute: "search-scope" })
	searchScope = "all";
	/**
	 * show search input box on top
	 */
	@property({ type: Boolean, reflect: true, attribute: "show-search-bar" })
	showSearchBar = true;

	set ["show-search-bar"](val: boolean) {
		this.showSearchBar = val;
	}

	/**
	 * @attribute header-cell-template
	 */
	@property({ reflect: false, type: Function, attribute: "header-cell-template" })
	headerCellTemplate?: FTableSchemaHeaderCellemplate;

	set ["header-cell-template"](val: FTableSchemaHeaderCellemplate | undefined) {
		this.headerCellTemplate = val;
	}

	@state()
	offset = 0;

	@query("f-div.load-more")
	loadMoreButton?: FDiv;

	@query("#f-table-element")
	tableElement?: FTable;

	nextEmitted = false;

	get max() {
		return this.rowsPerPage ?? 50;
	}

	get ariaSortOrder() {
		return this.sortOrder === "asc" ? "ascending" : "descending";
	}

	get header() {
		return this.data?.header
			? html`<f-trow slot="header" part="header">
					${Object.entries(this.data.header).map((columnHeader, idx) => {
						let width = undefined;
						let selected = false;
						let sticky = undefined;
						if (typeof columnHeader[1] === "object") {
							if (columnHeader[1].width) {
								width = columnHeader[1].width;
							}
							selected = columnHeader[1].selected ?? false;
							sticky = columnHeader[1].sticky;
						}

						return html`<f-tcell
							part="cell"
							role="columnheader"
							.selected=${selected}
							.width=${width}
							aria-colindex="${idx + 1}"
							aria-sort="${this.sortBy === columnHeader[0] ? this.ariaSortOrder : "none"}"
							.align=${columnHeader[1].align}
							data-background="${this.stickyCellBackground}"
							?sticky-left=${sticky}
							?sticky-top=${this.stickyHeader}
							@selected-column=${this.handleColumnSelection}
							@update-row-selection=${(event: CustomEvent<boolean>) =>
								this.handleHeaderInput(event, columnHeader[1])}
						>
							<f-div .align=${columnHeader[1].align} gap="small" height="100%" width="fit-content">
								${this.getHeaderCellTemplate(columnHeader[1])}
								${columnHeader[1].disableSort ? nothing : this.getSortIcon(columnHeader[0])}</f-div
							></f-tcell
						>`;
					})}
			  </f-trow>`
			: nothing;
	}

	get rowsHtml() {
		return repeat(
			this.filteredRows,
			row => row.id,
			(row, idx) => {
				const getDetailsSlot = () => {
					if (row.details) {
						return html` <f-div slot="details" width="100%"> ${row.details()} </f-div>`;
					} else {
						return nothing;
					}
				};
				return html`<f-trow
					part="row"
					id=${row.id}
					aria-rowindex="${idx + 1}"
					.expandIconPosition=${row.expandIconPosition ?? "right"}
					.open=${row.open ?? false}
					.selected=${row.selected ?? false}
					.disableSelection=${Boolean(row.disableSelection)}
					.state=${row.state ?? "default"}
					@click=${(e: PointerEvent) => this.handleRowClick(row, e)}
					@toggle-row=${(e: CustomEvent) => this.toggleRowDetails(row, e)}
					@selected-row=${(e: CustomEvent) => this.handleRowSelection(row, e)}
				>
					${getDetailsSlot()}
					${Object.entries(this.data.header).map((columnHeader, cdx) => {
						let width = undefined;
						let selected = false;
						let sticky = undefined;
						let actions = undefined;
						if (typeof columnHeader[1] === "object") {
							if (columnHeader[1].width) {
								width = columnHeader[1].width;
							}
							selected = columnHeader[1].selected ?? false;
							sticky = columnHeader[1].sticky;
						}
						const cell = row.data[columnHeader[0]];

						actions = cell.actions;

						let highlightTerm = columnHeader[0] === this.searchScope ? this.searchTerm : null;
						if (this.searchScope === "all") {
							highlightTerm = this.searchTerm;
						}

						return html`<f-tcell
							part="cell"
							.selected=${selected}
							aria-colindex="${cdx + 1}"
							.width=${width}
							.actions=${actions}
							.align=${cell.align}
							data-background="${this.stickyCellBackground}"
							?sticky-left=${sticky}
							>${this.getCellTemplate(row.data[columnHeader[0]], highlightTerm)}
						</f-tcell>`;
					})}
				</f-trow>`;
			}
		);
	}

	get filteredRows() {
		return this.paginatedRows;
	}

	get searchedRows() {
		if (this.searchScope === "all" && this.searchTerm) {
			return this.data.rows.filter(row => {
				return (
					Object.values(row.data).findIndex(v => {
						if (this.searchTerm !== null) {
							if (v !== null) {
								if (typeof v.value === "object" && v.toString) {
									return v
										.toString()
										.toLocaleLowerCase()
										.includes(this.searchTerm.toLocaleLowerCase());
								} else {
									return String(v.value)
										.toLocaleLowerCase()
										.includes(this.searchTerm.toLocaleLowerCase());
								}
							}

							return false;
						}
						return true;
					}) !== -1
				);
			});
		} else if (this.searchScope !== "all" && this.searchTerm) {
			return this.data.rows.filter(row => {
				if (this.searchTerm !== null) {
					const v = row.data[this.searchScope];
					if (v !== null) {
						if (typeof v.value === "object" && v.toString) {
							return v.toString().toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase());
						} else {
							return String(v.value)
								.toLocaleLowerCase()
								.includes(this.searchTerm.toLocaleLowerCase());
						}
					}
				}
				return false;
			});
		}
		return this.data?.rows ?? [];
	}

	get sortedRows() {
		return this.searchedRows.sort((first, second) => {
			if (this.sortBy) {
				let columnA = first.data[this.sortBy].value,
					columnB = second.data[this.sortBy].value;

				if (
					first.data[this.sortBy].toString &&
					typeof columnA === "object" &&
					!(columnA instanceof Date)
				) {
					// @ts-ignore
					columnA = first.data[this.sortBy].toString();
				}

				if (
					second.data[this.sortBy].toString &&
					typeof columnB === "object" &&
					!(columnB instanceof Date)
				) {
					// @ts-ignore
					columnB = second.data[this.sortBy].toString();
				}

				if (typeof columnA === "string" && typeof columnB === "string") {
					if (columnA.trim().toLocaleLowerCase() < columnB.trim().toLocaleLowerCase()) {
						return this.sortOrder === "asc" ? -1 : 1;
					}
					if (columnA.trim().toLocaleLowerCase() > columnB.trim().toLocaleLowerCase()) {
						return this.sortOrder === "asc" ? 1 : -1;
					}
					return 0;
				} else if (typeof columnA === "number" && typeof columnB === "number") {
					return this.sortOrder === "asc" ? columnB - columnA : columnA - columnB;
				} else if (columnA instanceof Date && columnB instanceof Date) {
					return this.sortOrder === "asc"
						? (columnA as any) - (columnB as any)
						: (columnB as any) - (columnA as any);
				}
				return 0;
			} else {
				return 0;
			}
		});
	}

	get paginatedRows() {
		return this.sortedRows.slice(0, this.offset + this.max);
	}

	search(event: CustomEvent) {
		this.searchScope = event.detail.scope;
		this.searchTerm = event.detail.value;
	}
	get noDataTemplate() {
		if (this.data.rows.length === 0 && this.data.header) {
			return html`<f-div
				style="grid-column-start:1;grid-column-end:${Object.keys(this.data.header).length + 1};"
			>
				<slot name="no-data">
					<f-div padding="small" state="secondary" align="middle-center" width="100%">
						<f-text inline>No data to display</f-text>
					</f-div>
				</slot>
			</f-div>`;
		}

		return nothing;
	}

	render() {
		this.nextEmitted = false;

		if (!this.data) {
			return html`<f-text state="warning"> Warning: The 'data' property is required.</f-text>`;
		}
		return html`
			<div class="f-table-schema-wrapper">
				<slot name="search">
					${this.showSearchBar
						? html`<f-div padding="medium none">
								<f-search
									.scope=${["all", ...Object.keys(this.data.header)]}
									.selected-scope=${this.searchScope}
									.value=${this.searchTerm}
									variant="round"
									@input=${this.search}
								></f-search>
						  </f-div>`
						: nothing}
				</slot>
				<f-table
					id="f-table-element"
					.variant=${this.variant}
					.size=${this.size}
					.selectable=${this.selectable}
					.highlightSelected=${this.highlightSelected}
					.highlightHover=${this.highlightHover}
					.highlightColumnHover=${this.highlightColumnHover}
					aria-rowcount="${this.data.rows.length}"
					aria-colcount="${Object.keys(this.data.header).length}"
				>
					${this.header} ${this.rowsHtml} ${this.noDataTemplate}
				</f-table>
				<f-div class="load-more" style="display:none" align="middle-left" padding="medium none">
					<f-button @click=${this.paginate} label="load more" category="outline"></f-button>
				</f-div>
			</div>
		`;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		this.onscroll = () => {
			if (this.scrollTop + this.offsetHeight >= this.scrollHeight) {
				this.paginate();
			}
			if (this.filteredRows.length === this.searchedRows.length && !this.nextEmitted) {
				setTimeout(() => {
					this.nextEmitted = true;
					const toggle = new CustomEvent("next", {
						detail: { offset: this.offset, rowsPerPage: this.rowsPerPage },
						bubbles: true,
						composed: true
					});
					this.dispatchEvent(toggle);
				});
			}
		};
		void this.updateComplete.then(async () => {
			if (
				this.scrollHeight === this.offsetHeight &&
				this.filteredRows.length < this.searchedRows.length
			) {
				this.loadMoreButton?.style.removeProperty("display");
			} else if (this.loadMoreButton) {
				this.loadMoreButton.style.display = "none";
			}
			if (this.tableElement) {
				await this.tableElement.updateHeaderSelectionCheckboxState();
			}
		});
	}

	handleHeaderInput(event: CustomEvent<boolean>, headerCell: FTableSchemaHeaderCell) {
		this.toggleAllRows(event.detail);
		const toggle = new CustomEvent("header-input", {
			detail: { value: event.detail, header: headerCell },
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(toggle);
	}

	toggleAllRows(val: boolean) {
		this.data.rows.forEach(row => {
			row.selected = val;
		});
	}

	paginate() {
		if (this.filteredRows.length < this.searchedRows.length) {
			this.offset += this.max;
		}
	}

	setSortBy(columnKey: string) {
		if (columnKey === this.sortBy) {
			if (this.sortOrder === "asc") {
				this.sortOrder = "desc";
			} else {
				this.sortOrder = "asc";
			}
		} else {
			this.sortBy = columnKey;
			this.sortOrder = "asc";
		}
		/**
		 * emitting sort event with latest sortBy and sortOrder value
		 */
		const sortEvent = new CustomEvent("sort", {
			detail: {
				sortBy: this.sortBy,
				sortOrder: this.sortOrder
			},
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(sortEvent);
	}

	getSortIcon(columnKey: string) {
		let iconName = "i-sort";
		if (columnKey === this.sortBy) {
			if (this.sortOrder === "asc") {
				iconName = "i-sort-asc";
			}
			if (this.sortOrder === "desc") {
				iconName = "i-sort-desc";
			}
		}

		return html`<f-icon-button
			@click=${(event: Event) => {
				event.stopPropagation();
				this.setSortBy(columnKey);
			}}
			.icon=${iconName}
			category="packed"
			state="neutral"
		></f-icon-button>`;
	}

	handleRowSelection(row: FTableSchemaDataRow, event: CustomEvent) {
		row.selected = event.detail.value;
		/**
		 * Whenever row is selected/de-selected this event emitts with header object
		 */
		const rowInputEvent = new CustomEvent("row-input", {
			detail: row,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(rowInputEvent);
	}
	handleRowClick(row: FTableSchemaDataRow, _event: PointerEvent) {
		const rowInputEvent = new CustomEvent("row-click", {
			detail: row,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(rowInputEvent);
	}

	toggleRowDetails(row: FTableSchemaDataRow, _event: CustomEvent) {
		row.open = !row.open;
		/**
		 * Whenever row is selected/de-selected this event emitts with header object
		 */
		const rowInputEvent = new CustomEvent("toggle-row-details", {
			detail: row,
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(rowInputEvent);
	}

	getCellTemplate(cell: FTableSchemaCell, highlightTerm: string | null) {
		if (cell?.template) {
			return cell.template(highlightTerm);
		}

		return html`<f-text .highlight=${highlightTerm}>${cell.value}</f-text>`;
	}

	handleColumnSelection(e: CustomEvent) {
		if (this.data?.header) {
			const cellToToggleEntry = Object.entries(this.data.header)[e.detail.columnIndex];
			let cellToToggle: string;
			if (cellToToggleEntry) {
				cellToToggle = cellToToggleEntry[0];
			}

			Object.entries(this.data.header).forEach(cellEntry => {
				const [key, cellObject] = cellEntry;
				if (cellToToggle === key) {
					cellObject.selected = !cellObject.selected;
					if (cellObject.selected) {
						/**
						 * Whenever header is selcted this event emitts with header object
						 */
						const headerSelected = new CustomEvent("header-selected", {
							detail: cellObject,
							bubbles: true,
							composed: true
						});
						this.dispatchEvent(headerSelected);
					}
				} else {
					cellObject.selected = false;
				}
			});
		}
	}
	getHeaderCellTemplate(cell: FTableSchemaHeaderCell) {
		if (cell && typeof cell === "object" && cell.value && cell.template) {
			return cell.template();
		} else if (cell && typeof cell === "object" && cell.value && this.headerCellTemplate) {
			return this.headerCellTemplate(cell.value);
		} else if (cell && typeof cell === "object" && cell.value) {
			return html`<f-text>${cell.value}</f-text>`;
		}

		return html`<f-text>${cell}</f-text>`;
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-table-schema": FTableSchema;
	}
}
