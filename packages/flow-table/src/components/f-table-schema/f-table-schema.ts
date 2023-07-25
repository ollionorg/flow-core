/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FButton, FDiv, flowElement, FRoot, FSearch, FText } from "@cldcvr/flow-core";
import { html, HTMLTemplateResult, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { property, query, state } from "lit/decorators.js";
import { FTable, FTableSelectable, FTableSize, FTableVariant } from "../f-table/f-table";
import { FTcell, FTcellActions } from "../f-tcell/f-tcell";
import { FTrow, FTrowChevronPosition, FTrowState } from "../f-trow/f-trow";
import eleStyle from "./f-table-schema.scss";
import { repeat } from "lit/directives/repeat.js";

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

export type FTableSchemaCell = {
	value: any;
	actions?: FTcellActions;
	template?: () => HTMLTemplateResult;
	toString?: () => string;
};

export type FTableSchemaHeaderCell = {
	value: any;
	template?: () => HTMLTemplateResult;
	width?: string;
	selected?: boolean;
	disableSort?: boolean;
	sticky?: boolean;
};

export type FTableSchemaVariant = FTableVariant;
export type FTableSchemaSize = FTableSize;
export type FTableSchemaSelectable = FTableSelectable;

@flowElement("f-table-schema")
export class FTableSchema extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
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
	@property({ type: Object })
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

	/**
	 * @attribute highlight on hover
	 */
	@property({ type: Boolean, reflect: true, attribute: "highlight-hover" })
	highlightHover = false;

	/**
	 * @attribute is sticky header
	 */
	@property({ type: Boolean, reflect: true, attribute: "sticky-header" })
	stickyHeader = false;

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

	@state()
	offset = 0;

	@query("f-div.load-more")
	loadMoreButton?: FDiv;

	nextEmitted = false;

	get max() {
		return this.rowsPerPage ?? 50;
	}

	get header() {
		return this.data?.header
			? html`<f-trow slot="header">
					${Object.entries(this.data.header).map(columnHeader => {
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
							.selected=${selected}
							.width=${width}
							?sticky-left=${ifDefined(sticky)}
							?sticky-top=${ifDefined(this.stickyHeader)}
							@selected-column=${this.handleColumnSelection}
						>
							<f-div gap="small" height="100%" width="fit-content">
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
			row => {
				const getDetailsSlot = () => {
					if (row.details) {
						return html` <f-div slot="details" width="100%"> ${row.details()} </f-div>`;
					} else {
						return nothing;
					}
				};
				return html`<f-trow
					id=${row.id}
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
					${Object.entries(this.data.header).map(columnHeader => {
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
							.width=${width}
							.actions=${actions}
							?sticky-left=${ifDefined(sticky)}
							><f-text style="height:100%" inline .highlight=${highlightTerm}
								>${this.getCellTemplate(row.data[columnHeader[0]])}</f-text
							></f-tcell
						>`;
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
									return v.value
										.toString()
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
							return v.value
								.toString()
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
					if (columnA < columnB) {
						return this.sortOrder === "asc" ? -1 : 1;
					}
					if (columnA > columnB) {
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

	render() {
		this.nextEmitted = false;

		if (!this.data) {
			return html`<f-text state="warning"> Warning: The 'data' property is required.</f-text>`;
		}
		return html`
			<div>
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
					.variant=${this.variant}
					.size=${this.size}
					.selectable=${this.selectable}
					.highlightSelected=${this.highlightSelected}
					.highlightHover=${this.highlightHover}
				>
					${this.header} ${this.rowsHtml}
				</f-table>
				<f-div class="load-more" style="display:none" align="middle-left" padding="medium none">
					<f-button @click=${this.paginate} label="load more" category="outline"></f-button>
				</f-div>
			</div>
		`;
	}
	protected async updated(
		changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): Promise<void> {
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
		await this.updateComplete;
		if (
			this.scrollHeight === this.offsetHeight &&
			this.filteredRows.length < this.searchedRows.length
		) {
			this.loadMoreButton?.style.removeProperty("display");
		} else if (this.loadMoreButton) {
			this.loadMoreButton.style.display = "none";
		}
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

	getCellTemplate(cell: FTableSchemaCell) {
		if (cell?.template) {
			return cell.template();
		}

		return cell.value;
	}

	handleColumnSelection(e: CustomEvent) {
		if (this.data?.header) {
			const cellToToggleEntry = Object.entries(this.data.header).at(e.detail.columnIndex);
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
