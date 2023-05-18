import { FButton, FDiv, flowElement, FRoot, FSearch, FText } from "@cldcvr/flow-core";
import { html, HTMLTemplateResult, nothing, PropertyValueMap, unsafeCSS } from "lit";
import { property, query, state } from "lit/decorators.js";
import { FTable, FTableSelectable, FTableSize, FTableVariant } from "../f-table/f-table";
import { FTcell } from "../f-tcell/f-tcell";
import { FTrow } from "../f-trow/f-trow";
import eleStyle from "./f-table-schema.scss";

export type FTableSchemaDataRow = {
	selected?: boolean;
	data: Record<string, FTableSchemaCell>;
};
export type FTableSchemaData = {
	header: Record<string, FTableSchemaHeaderCell>;
	rows: FTableSchemaDataRow[];
};

export type FTableSchemaHeaderCell = string | FTableSchemaHeaderCellObject;

export type FTableSchemaCell = unknown | FTableSchemaCellObject;
export type FTableSchemaCellObject = {
	value: unknown;
	template: () => HTMLTemplateResult;
	toString: () => string;
};

export type FTableSchemaHeaderCellObject = {
	value: string | unknown;
	template?: () => HTMLTemplateResult;
	width?: string;
};

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
		...FText.styles
	];

	/**
	 * @attribute data to dusplay in table
	 */
	@property({ type: Object })
	data!: FTableSchemaData;

	@property({ type: String, reflect: true })
	variant?: FTableVariant = "stripped";

	@property({ type: String, reflect: true, attribute: "sort-by" })
	sortBy?: string;

	@property({ type: String, reflect: true, attribute: "sort-order" })
	sortOrder?: "asc" | "desc" = "asc";

	@property({ type: Number, reflect: true, attribute: "rows-per-page" })
	rowsPerPage?: number = 50;
	/**
	 * @attribute size to apply on each cell
	 */
	@property({ type: String, reflect: true })
	size?: FTableSize = "medium";

	/**
	 * @attribute whether to display checkbox or radiobox
	 */
	@property({ type: String, reflect: true })
	selectable?: FTableSelectable = "none";

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

	@state()
	offset = 0;

	@state()
	searchTerm: string | null = null;

	@query("f-div.load-more")
	loadMoreButton?: FDiv;

	nextEmitted = false;

	get max() {
		return this.rowsPerPage ?? 50;
	}

	get header() {
		return this.data.header
			? html`<f-trow slot="header">
					${Object.entries(this.data.header).map(columnHeader => {
						let width = undefined;
						if (typeof columnHeader[1] === "object" && columnHeader[1].width) {
							width = columnHeader[1].width;
						}
						return html`<f-tcell .width=${width}>
							<f-div gap="small" width="fit-content">
								<f-text>${this.getHeaderCellTemplate(columnHeader[1])}</f-text>
								${this.getSortIcon(columnHeader[0])}</f-div
							></f-tcell
						>`;
					})}
			  </f-trow>`
			: nothing;
	}

	getHeaderCellTemplate(cell: FTableSchemaHeaderCell) {
		if (cell && typeof cell === "object" && cell.value && cell.template) {
			return cell.template();
		} else if (cell && typeof cell === "object" && cell.value) {
			return cell.value;
		}

		return cell;
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

	get rowsHtml() {
		return this.filteredRows.map(row => {
			return html`<f-trow>
				${Object.entries(this.data.header).map(columnHeader => {
					let width = undefined;
					if (typeof columnHeader[1] === "object" && columnHeader[1].width) {
						width = columnHeader[1].width;
					}
					return html`<f-tcell .width=${width}
						><f-text inline .highlight=${this.searchTerm}
							>${this.getCellTemplate(row.data[columnHeader[0]])}</f-text
						></f-tcell
					>`;
				})}
			</f-trow>`;
		});
	}

	getCellTemplate(cell: FTableSchemaCell) {
		if (
			cell &&
			typeof cell === "object" &&
			(cell as FTableSchemaCellObject).value &&
			(cell as FTableSchemaCellObject).template
		) {
			return (cell as FTableSchemaCellObject).template();
		}

		return cell;
	}

	get filteredRows() {
		return this.paginatedRows;
	}

	get searchedRows() {
		if (this.searchTerm) {
			return this.data.rows.filter(row => {
				return (
					Object.values(row.data).findIndex(v => {
						if (this.searchTerm !== null) {
							if (typeof v === "string") {
								return (v as string)
									.toLocaleLowerCase()
									.includes(this.searchTerm.toLocaleLowerCase());
							} else if (typeof v === "object" && v !== null) {
								return v
									.toString()
									.toLocaleLowerCase()
									.includes(this.searchTerm.toLocaleLowerCase());
							} else if (typeof v === "number" && v !== null) {
								return v === Number(this.searchTerm);
							}

							return false;
						}
						return true;
					}) !== -1
				);
			});
		}
		return this.data.rows;
	}

	get sortedRows() {
		return this.searchedRows.sort((first, second) => {
			if (this.sortBy) {
				const columnA = first.data[this.sortBy],
					columnB = second.data[this.sortBy];
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
				} else if (typeof columnA === "object" && typeof columnB === "object") {
					const cellA = columnA as FTableSchemaCellObject;
					const cellB = columnB as FTableSchemaCellObject;
					if (cellA.value instanceof Date && cellB.value instanceof Date) {
						return this.sortOrder === "asc"
							? (cellA.value as any) - (cellB.value as any)
							: (cellB.value as any) - (cellA.value as any);
					}

					if (cellA.toString() < cellB.toString()) {
						return this.sortOrder === "asc" ? -1 : 1;
					}
					if (cellA.toString() > cellB.toString()) {
						return this.sortOrder === "asc" ? 1 : -1;
					}
					return 0;
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
		this.searchTerm = event.detail.value;
	}

	render() {
		this.nextEmitted = false;
		return html`
			<div>
				<slot name="search">
					<f-div padding="medium none">
						<f-search variant="round" @input=${this.search}></f-search>
					</f-div>
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
				<f-div class="load-more" style="display:none" align="middle-right" padding="medium none">
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
						detail: {},
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
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-table-schema": FTableSchema;
	}
}
