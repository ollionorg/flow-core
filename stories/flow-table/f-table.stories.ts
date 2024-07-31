import { html } from "lit-html";
import { createRef, ref } from "lit/directives/ref.js";
import downloadFile from "./donwload-file";

export default {
	title: "@nonfx/flow-table/f-table",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, unknown>) => {
		const handleSelectedRows = (event: CustomEvent) => {
			console.log("selected rows", event.detail);
		};

		const testOverrideClick = (event: CustomEvent) => {
			console.log("clicked", event);
		};

		return html`
			<f-button style="display:none" label="download" @click=${downloadFile}></f-button>
			<f-div state="default" id="reportTemplate">
				<f-table
					.highlightSelected=${args["highlight-selected"]}
					.highlightHover=${args["highlight-hover"]}
					.highlightColumnHover=${args["highlight-column-hover"]}
					.selectable=${args.selectable}
					.variant=${args.variant}
					.size=${args.size}
					@selected-rows=${handleSelectedRows}
				>
					<f-trow slot="header">
						${[1, 2, 3, 4, 5].map(cellNumber => {
							return html`<f-tcell @click=${testOverrideClick}> Header ${cellNumber} </f-tcell>`;
						})}
					</f-trow>
					${[1, 2, 3, 4, 5].map(_rowNumber => {
						return html`<f-trow>
							<f-div padding="large" slot="details">
								<f-text variant="heading" size="x-large">This is details slot</f-text>
							</f-div>
							${[1, 2, 3, 4, 5].map(cellNumber => {
								return html`<f-tcell>
									<f-text> Column ${cellNumber} </f-text>
								</f-tcell>`;
							})}
						</f-trow>`;
					})}
				</f-table>
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
		["highlight-column-hover"]: {
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
		["highlight-column-hover"]: true
	}
};

export const Anatomy = {
	render: () => html`<f-div align="middle-center" padding="large">Display anatomy here</f-div>`,
	name: "Anatomy"
};

export const Variant = {
	render: () =>
		html`<f-div direction="column" state="subtle" padding="small" gap="large"
			>${["stripped", "outlined", "underlined", "bordered"].map(
				variant =>
					html`<f-text>variant="${variant}"</f-text
						><f-table .variant=${variant}>
							<f-trow slot="header">
								${[1, 2, 3, 4, 5].map(cellNumber => {
									return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
								})}
							</f-trow>
							${[1, 2, 3, 4, 5].map(() => {
								return html`<f-trow>
									${[1, 2, 3, 4, 5].map(cellNumber => {
										return html`<f-tcell>
											<f-text> Column ${cellNumber} </f-text>
										</f-tcell>`;
									})}
								</f-trow>`;
							})} </f-table
						><f-divider></f-divider>`
			)}</f-div
		>`,

	name: "variant"
};

export const Size = {
	render: () =>
		html`<f-div direction="column" state="subtle" padding="small" gap="large"
			>${["small", "medium"].map(
				size =>
					html`<f-text>size="${size}"</f-text
						><f-table .size=${size}>
							<f-trow slot="header">
								${[1, 2, 3, 4, 5].map(cellNumber => {
									return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
								})}
							</f-trow>
							${[1, 2, 3, 4, 5].map(() => {
								return html`<f-trow>
									${[1, 2, 3, 4, 5].map(cellNumber => {
										return html`<f-tcell>
											<f-text> Column ${cellNumber} </f-text>
										</f-tcell>`;
									})}
								</f-trow>`;
							})} </f-table
						><f-divider></f-divider>`
			)}</f-div
		>`,

	name: "size"
};

export const Selectable = {
	render: () =>
		html`<f-div direction="column" state="subtle" padding="small" gap="large"
			>${["single", "multiple", "none"].map(
				selectable =>
					html`<f-text>selectable="${selectable}"</f-text
						><f-table .selectable=${selectable}>
							<f-trow slot="header">
								${[1, 2, 3, 4, 5].map(cellNumber => {
									return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
								})}
							</f-trow>
							${[1, 2, 3, 4, 5].map(() => {
								return html`<f-trow>
									${[1, 2, 3, 4, 5].map(cellNumber => {
										return html`<f-tcell>
											<f-text> Column ${cellNumber} </f-text>
										</f-tcell>`;
									})}
								</f-trow>`;
							})} </f-table
						><f-divider></f-divider>`
			)}</f-div
		>`,

	name: "selectable"
};

export const HighlightSelected = {
	render: () =>
		html`<f-div direction="column" state="subtle" padding="small" gap="large"
			>${[true, false].map(
				highlightSelected =>
					html`<f-text>${highlightSelected ? "highlight-selected" : ""}</f-text
						><f-table .highlightSelected=${highlightSelected} selectable="multiple">
							<f-trow slot="header">
								${[1, 2, 3, 4, 5].map(cellNumber => {
									return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
								})}
							</f-trow>
							${[1, 2, 3, 4, 5].map(rowNumber => {
								return html`<f-trow .selected=${rowNumber === 3}>
									${[1, 2, 3, 4, 5].map(cellNumber => {
										return html`<f-tcell>
											<f-text> Column ${cellNumber} </f-text>
										</f-tcell>`;
									})}
								</f-trow>`;
							})} </f-table
						><f-divider></f-divider>`
			)}</f-div
		>`,

	name: "highlight-selected"
};

export const HighlightHover = {
	render: () =>
		html`<f-div direction="column" state="subtle" padding="small" gap="large"
			>${[true, false].map(
				highlightHover =>
					html`<f-text>${highlightHover ? "highlight-hover" : ""}</f-text
						><f-table .highlightHover=${highlightHover}>
							<f-trow slot="header">
								${[1, 2, 3, 4, 5].map(cellNumber => {
									return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
								})}
							</f-trow>
							${[1, 2, 3, 4, 5].map(() => {
								return html`<f-trow>
									${[1, 2, 3, 4, 5].map(cellNumber => {
										return html`<f-tcell>
											<f-text> Column ${cellNumber} </f-text>
										</f-tcell>`;
									})}
								</f-trow>`;
							})} </f-table
						><f-divider></f-divider>`
			)}</f-div
		>`,

	name: "highlight-hover"
};

export const HighlightColumnHover = {
	render: () =>
		html`<f-div direction="column" state="subtle" padding="small" gap="large">
			<f-text state="warning">Hover on column header to see result</f-text>
			${[true, false].map(
				highlightColumnHover =>
					html`<f-text>${highlightColumnHover ? "highlight-column-hover" : ""}</f-text
						><f-table .highlightColumnHover=${highlightColumnHover}>
							<f-trow slot="header">
								${[1, 2, 3, 4, 5].map(cellNumber => {
									return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
								})}
							</f-trow>
							${[1, 2, 3, 4, 5].map(() => {
								return html`<f-trow>
									${[1, 2, 3, 4, 5].map(cellNumber => {
										return html`<f-tcell>
											<f-text> Column ${cellNumber} </f-text>
										</f-tcell>`;
									})}
								</f-trow>`;
							})} </f-table
						><f-divider></f-divider>`
			)}</f-div
		>`,

	name: "highlight-column-hover"
};

export const SelectedRows = {
	render: () => {
		const fieldRef = createRef();

		const selectedRowsHandler = (event: CustomEvent) => {
			if (fieldRef.value) {
				const selectedrows: string[] = [];

				event.detail.forEach((element: HTMLElement) => {
					selectedrows.push(element.toString());
				});

				fieldRef.value.textContent = JSON.stringify(selectedrows, undefined, 2);
			}
		};

		// .highlightHover=${highlightHover}

		return html`<f-div direction="column" state="subtle" padding="small" gap="large">
				<f-text>'selected-rows' event emitted whenever any row is selected or de-selected</f-text>
				<f-table selectable="multiple" @selected-rows=${selectedRowsHandler}>
					<f-trow slot="header">
						${[1, 2, 3, 4, 5].map(cellNumber => {
							return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
						})}
					</f-trow>
					${[1, 2, 3, 4, 5].map(() => {
						return html`<f-trow>
							${[1, 2, 3, 4, 5].map(cellNumber => {
								return html`<f-tcell>
									<f-text> Column ${cellNumber} </f-text>
								</f-tcell>`;
							})}
						</f-trow>`;
					})}
				</f-table>
				<f-divider></f-divider>
			</f-div>
			<br />
			<f-divider></f-divider>
			<br />
			<f-text state="secondary">'event.detail' will display here</f-text>
			<pre ${ref(fieldRef)}></pre>`;
	},

	name: "@selected-rows"
};
