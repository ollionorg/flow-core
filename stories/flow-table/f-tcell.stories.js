import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { createRef, ref } from "lit/directives/ref.js";

export default {
	title: "@cldcvr/flow-table/f-tcell",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: args => {
		return html`
			<f-table>
				<f-trow slot="header">
					${[1, 2, 3].map(cellNumber => {
						return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
					})}
				</f-trow>
				${[1, 2, 3].map(rowNumber => {
					return html`<f-trow>
						${[1, 2, 3].map(cellNumber => {
							return html`<f-tcell .actions=${args.actions}>
								<f-text> Column ${cellNumber} </f-text>
							</f-tcell>`;
						})}
					</f-trow>`;
				})}
			</f-table>
		`;
	},

	name: "Playground",

	argTypes: {
		actions: {
			control: "object"
		},

		selected: {
			control: {
				type: "boolean"
			}
		}
	},

	args: {
		actions: [
			{
				icon: "i-copy",
				onClick: () => console.log("i-launch clicked")
			},
			{
				icon: "i-git-branch",
				onClick: () => console.log("i-launch clicked")
			},
			{
				icon: "i-launch",
				onClick: () => console.log("i-launch clicked")
			}
		],

		selected: false
	}
};

export const Anatomy = {
	render: () => html`<f-div align="middle-center" padding="large">Display anatomy here</f-div>`,
	name: "Anatomy"
};

export const Actions = {
	render: args =>
		html`<f-div direction="column" state="subtle" padding="small" gap="large">
			<f-text>3rd column has actions</f-text>
			<f-table>
				<f-trow slot="header">
					${[1, 2, 3].map(cellNumber => {
						return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
					})}
				</f-trow>
				${[1, 2, 3].map(rowNumber => {
					return html`<f-trow>
						${[1, 2, 3].map(cellNumber => {
							return html`<f-tcell
								.actions=${cellNumber === 3
									? [
											{
												icon: "i-copy",
												onClick: () => console.log("i-launch clicked")
											},
											{
												icon: "i-git-branch",
												onClick: () => console.log("i-launch clicked")
											},
											{
												icon: "i-launch",
												onClick: () => console.log("i-launch clicked")
											}
									  ]
									: []}
							>
								<f-text> Column ${cellNumber} </f-text>
							</f-tcell>`;
						})}
					</f-trow>`;
				})}
			</f-table>
		</f-div>`,

	name: "actions"
};

export const Selected = {
	render: args =>
		html`<f-div direction="column" state="subtle" padding="small" gap="large"
			>${[true].map(
				selected =>
					html`<f-text>2nd column is selected</f-text
						><f-table>
							<f-trow slot="header">
								${[1, 2, 3].map(cellNumber => {
									return html`<f-tcell .selected=${cellNumber === 2}>
										Header ${cellNumber}
									</f-tcell>`;
								})}
							</f-trow>
							${[1, 2, 3].map(rowNumber => {
								return html`<f-trow>
									${[1, 2, 3].map(cellNumber => {
										return html`<f-tcell .selected=${cellNumber === 2}>
											<f-text> Column ${cellNumber} </f-text>
										</f-tcell>`;
									})}
								</f-trow>`;
							})}
						</f-table>`
			)}</f-div
		>`,

	name: "selected"
};

export const HighlightColumn = {
	render: args => {
		const fieldRef = createRef();

		const highlightColumnHandler = event => {
			if (fieldRef.value) {
				fieldRef.value.textContent = JSON.stringify(event.detail, undefined, 2);
			}
		};

		return html`<f-div direction="column" state="subtle" padding="small" gap="large"
				>${[true].map(
					selected =>
						html`<f-text>Hover on header cell, it will trigger 'highlight-column' event </f-text>
							<f-table>
								<f-trow slot="header">
									${[1, 2, 3].map(cellNumber => {
										return html`<f-tcell
											@highlight-column=${highlightColumnHandler}
											.selected=${cellNumber === 2}
										>
											Hover to Highlight ${cellNumber}
										</f-tcell>`;
									})}
								</f-trow>
								${[1, 2, 3].map(rowNumber => {
									return html`<f-trow>
										${[1, 2, 3].map(cellNumber => {
											return html`<f-tcell .selected=${cellNumber === 2}>
												<f-text> Column ${cellNumber} </f-text>
											</f-tcell>`;
										})}
									</f-trow>`;
								})}
							</f-table> `
				)}
			</f-div>
			<br />
			<f-divider></f-divider>
			<br />
			<f-text state="secondary">'event.detail' will display here</f-text>
			<pre ${ref(fieldRef)}></pre>`;
	},

	name: "@highlight-column"
};

export const SelectedColumn = {
	render: args => {
		const fieldRef = createRef();

		const selectedColumnHandler = event => {
			if (fieldRef.value) {
				fieldRef.value.textContent = JSON.stringify(event.detail, undefined, 2);
			}
		};

		return html`<f-div direction="column" state="subtle" padding="small" gap="large"
				>${[true].map(
					selected =>
						html`<f-text>Click on header cell, it will trigger 'selected-column' event </f-text>
							<f-table>
								<f-trow slot="header">
									${[1, 2, 3].map(cellNumber => {
										return html`<f-tcell
											@selected-column=${selectedColumnHandler}
											.selected=${cellNumber === 2}
										>
											Click to select ${cellNumber}
										</f-tcell>`;
									})}
								</f-trow>
								${[1, 2, 3].map(rowNumber => {
									return html`<f-trow>
										${[1, 2, 3].map(cellNumber => {
											return html`<f-tcell .selected=${cellNumber === 2}>
												<f-text> Column ${cellNumber} </f-text>
											</f-tcell>`;
										})}
									</f-trow>`;
								})}
							</f-table> `
				)}
			</f-div>
			<br />
			<f-divider></f-divider>
			<br />
			<f-text state="secondary">'event.detail' will display here</f-text>
			<pre ${ref(fieldRef)}></pre>`;
	},

	name: "@selected-column"
};
