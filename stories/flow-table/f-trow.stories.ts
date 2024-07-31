import { html } from "lit-html";
import { createRef, ref } from "lit/directives/ref.js";

export default {
	title: "@nonfx/flow-table/f-trow",

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
			<f-table selectable="multiple" @selected-rows=${handleSelectedRows}>
				<f-trow slot="header">
					${[1, 2, 3, 4, 5].map(cellNumber => {
						return html`<f-tcell @click=${testOverrideClick}> Header ${cellNumber} </f-tcell>`;
					})}
				</f-trow>
				${[1, 2, 3, 4, 5].map(() => {
					return html`<f-trow
						.disableSelection=${args["disable-selection"]}
						.state=${args.state}
						.open=${args.open}
						.selected=${args.selected}
					>
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
		`;
	},

	name: "Playground",

	argTypes: {
		state: {
			control: "select",
			options: ["primary", "neutral", "success", "warning", "danger", "inherit", "default"]
		},

		open: {
			control: {
				type: "boolean"
			}
		},

		selected: {
			control: {
				type: "boolean"
			}
		},

		["disable-selection"]: {
			control: {
				type: "boolean"
			}
		}
	},

	args: {
		state: "default",
		open: false,
		selected: false,
		["disable-selection"]: false
	}
};

export const Anatomy = {
	render: () => html`<f-div align="middle-center" padding="large">Display anatomy here</f-div>`,
	name: "Anatomy"
};

export const State = {
	render: () =>
		html`<f-div direction="column" state="subtle" padding="small" gap="large"
			>${["primary", "neutral", "success", "warning", "danger", "inherit", "default"].map(
				state =>
					html`<f-text>state="${state}"</f-text
						><f-table>
							<f-trow slot="header">
								${[1, 2, 3, 4, 5].map(cellNumber => {
									return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
								})}
							</f-trow>
							${[1, 2, 3, 4, 5].map(() => {
								return html`<f-trow .state=${state}>
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

	name: "state"
};

export const Open = {
	render: () =>
		html`<f-div direction="column" state="subtle" padding="small" gap="large"
			>${[true, false].map(
				open =>
					html`<f-text>${open ? "open" : "--"}</f-text
						><f-table>
							<f-trow slot="header">
								${[1, 2, 3, 4, 5].map(cellNumber => {
									return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
								})}
							</f-trow>
							${[1, 2, 3, 4, 5].map(() => {
								return html`<f-trow .open=${open}>
									<f-div padding="large" slot="details">
										<f-text variant="heading" size="x-large">This is details slot</f-text>
									</f-div>
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

	name: "open"
};

export const Selected = {
	render: () =>
		html`<f-div direction="column" state="subtle" padding="small" gap="large"
			>${[true, false].map(
				selected =>
					html`<f-text>${selected ? "selected" : "--"}</f-text
						><f-table selectable="multiple">
							<f-trow slot="header">
								${[1, 2, 3, 4, 5].map(cellNumber => {
									return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
								})}
							</f-trow>
							${[1, 2, 3, 4, 5].map(() => {
								return html`<f-trow .selected=${selected}>
									<f-div padding="large" slot="details">
										<f-text variant="heading" size="x-large">This is details slot</f-text>
									</f-div>
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

	name: "selected"
};
export const ExpandIconPosition = {
	render: () =>
		html`<f-div direction="column" state="subtle" padding="small" gap="large"
			><f-table>
				<f-trow slot="header">
					${[1, 2].map(cellNumber => {
						return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
					})}
				</f-trow>
				${["left", "right"].map(iconPos => {
					return html`<f-trow expand-icon-position="${iconPos}">
						<f-div padding="large" slot="details">
							<f-text variant="heading" size="x-large">This is details slot</f-text>
						</f-div>
						${[1, 2].map(() => {
							return html`<f-tcell>
								<f-text> ${iconPos} icon position </f-text>
							</f-tcell>`;
						})}
					</f-trow>`;
				})}
			</f-table></f-div
		>`,

	name: "expand-icon-position"
};

export const SelectedRow = {
	render: () => {
		const fieldRef = createRef();

		const selectedRowHandler = (event: CustomEvent) => {
			if (fieldRef.value) {
				fieldRef.value.textContent = JSON.stringify(event.detail.value, undefined, 2);
			}
		};

		return html`<f-div direction="column" state="subtle" padding="small" gap="large"
				><f-text>Click on checkbox to trigger 'selected-row' event</f-text>
				<f-table selectable="multiple">
					<f-trow slot="header">
						${[1, 2, 3, 4, 5].map(cellNumber => {
							return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
						})}
					</f-trow>
					${[1, 2, 3, 4, 5].map(() => {
						return html`<f-trow @selected-row=${selectedRowHandler}>
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
				<f-divider></f-divider>
			</f-div>
			<br />
			<f-divider></f-divider>
			<br />
			<f-text state="secondary">'event.detail.value' will display here</f-text>
			<pre ${ref(fieldRef)}></pre>`;
	},

	name: "@selected-row"
};

export const ToggleRow = {
	render: () => {
		const fieldRef = createRef();

		const toggleRowHandler = (event: CustomEvent) => {
			if (fieldRef.value) {
				fieldRef.value.textContent = JSON.stringify(event.detail, undefined, 2);
			}
		};

		return html`<f-div direction="column" state="subtle" padding="small" gap="large">
				<f-text>Click on chevron to see row details, it will trigger 'toggle-row' event</f-text>
				<f-table selectable="multiple">
					<f-trow slot="header">
						${[1, 2, 3, 4, 5].map(cellNumber => {
							return html`<f-tcell> Header ${cellNumber} </f-tcell>`;
						})}
					</f-trow>
					${[1, 2, 3, 4, 5].map(() => {
						return html`<f-trow @toggle-row=${toggleRowHandler}>
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
				<f-divider></f-divider>
			</f-div>
			<br />
			<f-divider></f-divider>
			<br />
			<f-text state="secondary">'event.detail' will display here</f-text>
			<pre ${ref(fieldRef)}></pre>`;
	},

	name: "@toggle-row"
};
