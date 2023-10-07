import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import getFakeUsers, { popoverRef } from "./utils/mock-users-data.ts";
import { createRef, ref } from "lit/directives/ref.js";
import downloadFile from "./donwloadFile.ts";

export default {
	title: "@cldcvr/flow-table/Components/f-table-schema",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		const handleNext = () => {
			console.log("in next event");
		};

		const toggleRowDetails = event => {
			console.log("on row toggled", event.detail);
		};

		const onRowInput = event => {
			console.log("on row input", event.detail);
		};

		const onHeaderSelect = event => {
			console.log("on header selected", event.detail);
		};

		const handleOverlayClick = () => {
			if (popoverRef.value) {
				popoverRef.value.open = false;
			}
		};

		return html`
			<f-popover ${ref(popoverRef)} @overlay-click=${handleOverlayClick}>
				<f-div padding="large" state="secondary">
					<f-text
						>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
						has been the industry's standard dummy text ever since the 1500s, when an unknown
						printer took a galley of type and scrambled it to make a type specimen book.</f-text
					>
				</f-div>
			</f-popover>
			<f-button style="display:none" label="download" @click=${downloadFile}></f-button>
			<f-div state="default" id="reportTemplate" overflow="scroll">
				<f-table-schema
					.data=${args.data}
					.highlightSelected=${args["highlight-selected"]}
					.highlightHover=${args["highlight-hover"]}
					.selectable=${args.selectable}
					.variant=${args.variant}
					.size=${args.size}
					.headerCellTemplate=${args["header-cell-template"]}
					.stickyHeader=${args["sticky-header"]}
					.rowsPerPage=${args["rows-per-page"]}
					.sortBy=${args["sort-by"]}
					.sortOrder=${args["sort-order"]}
					.searchTerm=${args["search-term"]}
					.showSearchBar=${args["show-search-bar"]}
					@next=${handleNext}
					@toggle-row-details=${toggleRowDetails}
					@row-input=${onRowInput}
					@header-selected=${onHeaderSelect}
				>
				</f-table-schema>
			</f-div>
		`;
	},

	name: "Playground",

	argTypes: {
		variant: {
			control: "select",
			options: ["stripped", "outlined", "underlined", "bordered"]
		},

		size: {
			control: "select",
			options: ["medium", "small"]
		},

		selectable: {
			control: "select",
			options: ["single", "multiple", "none"]
		},

		["highlight-selected"]: {
			control: {
				type: "boolean"
			}
		},

		["highlight-hover"]: {
			control: {
				type: "boolean"
			}
		},

		["sticky-header"]: {
			control: {
				type: "boolean"
			}
		},

		["rows-per-page"]: {
			control: {
				type: "number"
			}
		},

		data: {
			control: {
				type: "object"
			}
		},

		["sort-by"]: {
			control: {
				type: "text"
			}
		},

		["sort-order"]: {
			control: "select",
			options: ["desc", "desc"]
		},

		["search-term"]: {
			control: {
				type: "text"
			}
		},

		["show-search-bar"]: {
			control: {
				type: "boolean"
			}
		}
	},

	args: {
		variant: "stripped",
		size: "medium",
		selectable: "none",
		["highlight-selected"]: true,
		["highlight-hover"]: true,
		["sticky-header"]: true,
		["rows-per-page"]: 20,
		data: getFakeUsers(50),
		["sort-by"]: "firstName",
		["sort-order"]: "asc",
		["search-term"]: "",
		["show-search-bar"]: true,

		["header-cell-template"]: val => {
			return html`<f-div gap="small" align="middle-center">
				<f-icon source="i-icon"></f-icon>
				<f-text>${val}</f-text></f-div
			>`;
		}
	}
};

export const Data = {
	render: args => {
		const data = getFakeUsers(5, 5);

		return html`
			<f-div gap="small" height="100%">
				<f-table-schema .data=${data}> </f-table-schema>
				<f-divider></f-divider>
				<f-div direction="column" gap="medium" padding="small">
					<f-text
						>Sample data used to display table.
						<a
							href="https://github.com/cldcvr/flow-core/blob/main/packages/flow-table/f-table-schema.doc.md"
							>Learn more</a
						></f-text
					>
					<f-divider></f-divider>
					<f-div>
						<pre>${JSON.stringify(data, undefined, 8)}</pre>
					</f-div>
				</f-div>
			</f-div>
		`;
	},

	name: "data"
};

export const HeaderCellTemplate = {
	render: args => {
		const data = getFakeUsers(5, 5);

		const headerCellTemplate = val => {
			return html`<f-div gap="small" align="middle-center">
				<f-icon source="i-icon"></f-icon>
				<f-text>${val}</f-text></f-div
			>`;
		};

		return html`
			<f-div gap="small" height="100%">
				<f-table-schema .data=${data} .headerCellTemplate=${headerCellTemplate}> </f-table-schema>
				<f-divider></f-divider>
				<f-div direction="column" gap="medium" padding="small">
					<f-text
						>Sample data used to display table.
						<a
							href="https://github.com/cldcvr/flow-core/blob/main/packages/flow-table/f-table-schema.doc.md"
							>Learn more</a
						></f-text
					>
					<f-divider></f-divider>
					<f-div>
						<pre>${JSON.stringify(data, undefined, 8)}</pre>
					</f-div>
				</f-div>
			</f-div>
		`;
	},

	name: "header-cell-template"
};

export const StickyHeader = {
	render: args => {
		const data = getFakeUsers(30, 5);

		return html`
			<f-div gap="small" height="100%" overflow="scroll" gap="auto" width="100%">
				<f-div direction="column" gap="medium" overflow="hidden">
					<f-text> sticky-header=true</f-text>
					<f-table-schema .data=${data} .stickyHeader=${true}> </f-table-schema>
				</f-div>
				<f-divider></f-divider>
				<f-div direction="column" gap="medium" overflow="hidden">
					<f-text> sticky-header=false</f-text>
					<f-table-schema .data=${data} .stickyHeader=${false}> </f-table-schema>
				</f-div>
			</f-div>
		`;
	},

	name: "sticky-header"
};

export const RowsPerPage = {
	render: args => {
		const data = getFakeUsers(30, 5);

		return html`
			<f-div gap="small" height="100%" overflow="scroll" gap="auto" width="100%">
				<f-div direction="column" gap="medium" overflow="hidden">
					<f-text> rows-per-page="5"</f-text>
					<f-table-schema rows-per-page="5" .data=${data} .stickyHeader=${true}> </f-table-schema>
				</f-div>
				<f-divider></f-divider>
				<f-div direction="column" gap="medium" overflow="hidden">
					<f-text> rows-per-page="10"</f-text>
					<f-table-schema rows-per-page="10" .data=${data} .stickyHeader=${false}> </f-table-schema>
				</f-div>
			</f-div>
		`;
	},

	name: "rows-per-page"
};

export const SortBy = {
	render: args => {
		const data = getFakeUsers(10, 5);

		return html`
			<f-div gap="small" height="100%" overflow="scroll" gap="auto" width="100%">
				<f-div direction="column" gap="medium" overflow="hidden">
					<f-text> sort-by="firstName"</f-text>
					<f-table-schema sort-by="firstName" .data=${data} .stickyHeader=${true}> </f-table-schema>
				</f-div>
				<f-divider></f-divider>
				<f-div direction="column" gap="medium" overflow="hidden">
					<f-text> sort-by="age"</f-text>
					<f-table-schema sort-by="age" .data=${data} .stickyHeader=${false}> </f-table-schema>
				</f-div>
			</f-div>
		`;
	},

	name: "sort-by"
};

export const SortOrder = {
	render: args => {
		const data = getFakeUsers(10, 5);

		return html`
			<f-div gap="small" height="100%" overflow="scroll" gap="auto" width="100%">
				<f-div direction="column" gap="medium" overflow="hidden">
					<f-text> sort-by="firstName" sort-order="asc"</f-text>
					<f-table-schema sort-by="firstName" sort-order="asc" .data=${data} .stickyHeader=${true}>
					</f-table-schema>
				</f-div>
				<f-divider></f-divider>
				<f-div direction="column" gap="medium" overflow="hidden">
					<f-text> sort-by="firstName" sort-order="desc"</f-text>
					<f-table-schema
						sort-by="firstName"
						sort-order="desc"
						.data=${data}
						.stickyHeader=${false}
					>
					</f-table-schema>
				</f-div>
			</f-div>
		`;
	},

	name: "sort-order"
};

export const SearchTerm = {
	render: args => {
		const data = getFakeUsers(50);

		return html`
			<f-div gap="small" height="100%" overflow="scroll" gap="auto" width="100%">
				<f-div direction="column" gap="medium" overflow="hidden">
					<f-text>search-term="female"</f-text>
					<f-table-schema search-term="female" .data=${data} .stickyHeader=${true}>
					</f-table-schema>
				</f-div>
			</f-div>
		`;
	},

	name: "search-term"
};

export const ShowSearchBar = {
	render: args => {
		const data = getFakeUsers(10, 5);

		return html`
			<f-div gap="small" height="100%" overflow="scroll" gap="auto" width="100%">
				<f-div direction="column" gap="medium" overflow="hidden">
					<f-text> show-search-bar="true"</f-text>
					<f-table-schema show-search-bar .data=${data}> </f-table-schema>
				</f-div>
				<f-divider></f-divider>
				<f-div direction="column" gap="medium" overflow="hidden">
					<f-text> show-search-bar="false"</f-text>
					<f-table-schema .showSearchBar=${false} .data=${data}> </f-table-schema>
				</f-div>
			</f-div>
		`;
	},

	name: "show-search-bar"
};

export const ToggleRowDetails = {
	render: args => {
		const data = getFakeUsers(10, 5);
		const fieldRef = createRef();

		const toggleRowDetails = event => {
			if (fieldRef.value) {
				fieldRef.value.textContent = JSON.stringify(event.detail, undefined, 2);
			}
		};

		return html`<f-div direction="column" state="subtle" padding="small" gap="large">
				<f-text>'toggle-row-details' event emitted whenever any row is open or closed</f-text>
				<f-table-schema .data=${data} @toggle-row-details=${toggleRowDetails}> </f-table-schema>
				<f-divider></f-divider>
			</f-div>
			<br />
			<f-divider></f-divider>
			<br />
			<f-text state="secondary">'event.detail' will display here</f-text>
			<pre ${ref(fieldRef)}></pre> `;
	},

	name: "@toggle-row-details"
};

export const RowInput = {
	render: args => {
		const data = getFakeUsers(10, 5);
		const fieldRef = createRef();

		const handleEvent = event => {
			if (fieldRef.value) {
				fieldRef.value.textContent = JSON.stringify(event.detail, undefined, 2);
			}
		};

		return html`<f-div direction="column" state="subtle" padding="small" gap="large">
				<f-text
					>'row-input' event emitted whenever any row is selected through checkbox or radio</f-text
				>
				<f-table-schema .data=${data} selectable="multiple" @row-input=${handleEvent}>
				</f-table-schema>
				<f-divider></f-divider>
			</f-div>
			<br />
			<f-divider></f-divider>
			<br />
			<f-text state="secondary">'event.detail' will display here</f-text>
			<pre ${ref(fieldRef)}></pre> `;
	},

	name: "@row-input"
};

export const HeaderSelected = {
	render: args => {
		const data = getFakeUsers(10, 5);
		const fieldRef = createRef();

		const handleEvent = event => {
			if (fieldRef.value) {
				fieldRef.value.textContent = JSON.stringify(event.detail, undefined, 2);
			}
		};

		return html`<f-div direction="column" state="subtle" padding="small" gap="large">
				<f-text
					>'header-selected' event emitted whenever any column is selected by clicking on column
					header</f-text
				>
				<f-table-schema .data=${data} selectable="multiple" @header-selected=${handleEvent}>
				</f-table-schema>
				<f-divider></f-divider>
			</f-div>
			<br />
			<f-divider></f-divider>
			<br />
			<f-text state="secondary">'event.detail' will display here</f-text>
			<pre ${ref(fieldRef)}></pre> `;
	},

	name: "@header-selected"
};

export const Next = {
	render: args => {
		const data = getFakeUsers(50, 5);
		const fieldRef = createRef();

		const handleEvent = event => {
			if (fieldRef.value) {
				fieldRef.value.textContent = JSON.stringify(event.detail, undefined, 2);
			}
		};

		return html`<f-div direction="column" state="subtle" padding="small" gap="large" height="50%">
				<f-text
					>'next' event emitted whenever user reach to at the end of records by scrolling.</f-text
				>
				<f-table-schema .data=${data} rows-per-page="20" @next=${handleEvent}> </f-table-schema>
				<f-divider></f-divider>
			</f-div>
			<br />
			<f-divider></f-divider>
			<br />
			<f-text state="secondary">'event.detail' will display here</f-text>
			<pre ${ref(fieldRef)}></pre> `;
	},

	name: "@next"
};
