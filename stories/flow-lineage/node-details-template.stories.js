import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useState, useEffect } from "@storybook/client-api";
import NodeDetailsTemplateAnatomy from "../svg/i-node-details-anatomy.js";

export default {
	title: "@nonfx/flow-lineage/Templates/node-details popover",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Anatomy = {
	render: () =>
		html`<div class="align-center" padding="medium">${unsafeSVG(NodeDetailsTemplateAnatomy)}</div>`,
	name: "Anatomy"
};

export const NodeDetails = {
	render: args => {
		const [open, setOpen] = useState(false);

		const [meta, setMeta] = useState({
			title: "Node 1",
			subTitle: "Node 1 Subtitle"
		});

		const [array, setArray] = useState(["Table Details", "Transformation Details"]);

		const [tabData, setTabData] = useState({
			["Table Details"]: {
				["Created on"]: {
					type: "text",
					value: "Today, 09:39 pm"
				},

				["Updated on"]: {
					type: "text",
					value: "Today, 11:39 pm"
				},

				["Owner"]: {
					type: "text",
					value: "name@gmail.com"
				},

				["Domain"]: {
					type: "tag",
					value: "Code Pipes",
					iconLeft: "💰"
				},

				["Classification"]: {
					type: "tag",
					value: "Code Pipes",
					iconLeft: "💰"
				},

				["Description"]: {
					type: "text",
					value: "This is a description of the table in"
				},

				["Tags"]: {
					type: "text",
					value: "Code promotion, Catalog, Ingest, Active users"
				},

				["Columns"]: {
					type: "text",
					value: "12"
				},

				["Rows"]: {
					type: "text",
					value: "2.2k"
				},

				["Visibility"]: {
					type: "text",
					value: "Visible to all"
				},

				["Glossary"]: {
					type: "link",
					value: "Glossary 1, Glossary 2, Glossary 3, Glossary 4"
				}
			},

			["Transformation Details"]: {
				["Mode"]: {
					type: "text",
					value: "DataBrew"
				},

				["Timestamp"]: {
					type: "text",
					value: "Wed Sept 21 2022 12:06:03 GMT +0530 (IST)"
				},

				["User"]: {
					type: "text",
					value: "name@gmail.com"
				},

				["Recipe Name"]: {
					type: "text",
					value: "testing-recipe"
				},

				codeSnippet: {
					type: "code",

					value: html`<f-div
						width="fill-container"
						padding="small none"
						state="default"
						direction="column"
					>
						<f-div padding="medium"
							><f-text variant="para" weight="bold" size="small">Recipe steps(6):</f-text></f-div
						>
						<f-div padding="none medium" direction="column">
							<f-div direction="row" gap="x-small">
								<f-text variant="para" weight="regular" size="small" inline
									>1. Delete column</f-text
								>
								<f-text inline variant="para" weight="regular" size="small" state="success"
									>dateChecked, hash, negative, positive</f-text
								>
							</f-div>
							<f-div direction="row" gap="x-small">
								<f-text variant="para" weight="regular" size="small" inline
									>2. Filter values by</f-text
								>
								<f-text inline variant="para" weight="regular" size="small" state="success"
									>state</f-text
								>
							</f-div>
							<f-div direction="row" gap="x-small">
								<f-text variant="para" weight="regular" size="small" inline
									>3. Create column</f-text
								>
								<f-text inline variant="para" weight="regular" size="small" state="subtle"
									>date_formatted</f-text
								><f-text variant="para" weight="regular" size="small" inline
									>using dateTime.</f-text
								>
							</f-div>
							<f-div direction="row" gap="x-small">
								<f-text variant="para" weight="regular" size="small" inline
									>4. Change type of</f-text
								>
								<f-text inline variant="para" weight="regular" size="small" state="success"
									>date_formatted</f-text
								><f-text variant="para" weight="regular" size="small" inline>to Date</f-text>
							</f-div>
							<f-div direction="row" gap="x-small">
								<f-text variant="para" weight="regular" size="small" inline
									>5. Delete column</f-text
								>
								<f-text inline variant="para" weight="regular" size="small" state="subtle"
									>date</f-text
								>
							</f-div>
							<f-div direction="row" gap="x-small">
								<f-text variant="para" weight="regular" size="small" inline
									>6. Create column</f-text
								>
								<f-text inline variant="para" weight="regular" size="small" state="subtle"
									>positiveRate</f-text
								><f-text variant="para" weight="regular" size="small" inline
									>using Math function</f-text
								>
								<f-text inline variant="para" weight="regular" size="small" state="subtle"
									>DIVIDE</f-text
								>
							</f-div>
						</f-div></f-div
					>`
				}
			}
		});

		const [selected, setSelected] = useState("Table Details");

		const handleChangeTab = id => {
			setSelected(id);
		};

		return html`
			<f-div>
				<f-popover target="#open-popover" ?open=${open} size="medium">
					<!--Start : node-details popover content  -->
					<f-div
						data-f-id="popover-content"
						state="secondary"
						width="100%"
						height="540px"
						align="top-left"
						variant="curved"
						direction="column"
					>
						<!--Start : node-details header section  -->
						<f-div
							data-f-id="header-section"
							gap="medium"
							align="middle-center"
							padding="medium"
							height="hug-content"
							width="95%"
						>
							<f-icon-button
								icon="i-table-1"
								size="medium"
								category="fill"
								variant="round"
								state="neutral"
							></f-icon-button>
							<f-div direction="column" gap="x-small" height="hug-content">
								<f-text variant="heading" size="x-small" weight="medium">${meta?.title}</f-text>
								<f-text variant="para" size="x-small" weight="regular">${meta?.subTitle}</f-text>
							</f-div>
							<f-div width="hug-content" align="middle-center" height="hug-content">
								<f-icon-button
									icon="i-tick-double"
									state="success"
									size="small"
									variant="block"
									type="packed"
								></f-icon-button>
								<f-icon-button
									icon="i-shield"
									size="small"
									variant="block"
									type="packed"
								></f-icon-button>
							</f-div>
						</f-div>
						<!--End : node-details header section  -->
						<!--Start : node-details tab-bar section  -->
						${array?.length > 0
							? html` <f-tab data-f-id="Tab bar - regular">
									${array.map(
										item =>
											html` <f-tab-node
												?active=${selected === item ? true : false}
												content-id=${`tab-${item}`}
												@click=${() => handleChangeTab(item)}
												><f-div width="100%" height="100%" align="middle-center" direction="column">
													<f-text>${item}</f-text>
												</f-div></f-tab-node
											>`
									)}</f-tab
							  >`
							: ""}
						<!--End : node-details tab-bar section  -->
						<!--Start : node-details content section  -->
						<f-div data-f-id="content-section" direction="column" overflow="scroll">
							${tabData &&
							Object.entries(tabData).map(
								([name, config], idx) =>
									html` <f-tab-content id=${`tab-${name}`}>
										${name === "Table Details"
											? html` <f-div padding="medium" direction="column">
													${Object.entries(config).map(
														([configName, configValue], idx) => html`
															<f-div width="fill-container" direction="row" padding="medium none">
																<f-div width="30%"
																	><f-text variant="para" size="small" weight="bold"
																		>${configName}</f-text
																	></f-div
																>
																<f-div width="fill-container">
																	${configValue?.type === "text"
																		? html` <f-text variant="para" size="small" weight="regular"
																				>${configValue?.value}</f-text
																		  >`
																		: configValue?.type === "tag"
																		? html`<f-tag size="small" label=${configValue?.value} state="primary" icon-left=${configValue?.iconLeft}></f-tab>`
																		: html`<f-text variant="para" size="small" weight="regular"
																				><a>${configValue?.value} +8 more</a></f-text
																		  >`}</f-div
																>
															</f-div>
														`
													)}</f-div
											  >`
											: html`
													<f-div padding="medium" direction="column">
														${Object.entries(config).map(
															([configName, configValue], idx) =>
																html` <f-div
																	width="fill-container"
																	direction="row"
																	padding="medium none"
																>
																	${configName !== "codeSnippet"
																		? html` <f-div width="30%"
																				><f-text variant="para" size="small" weight="bold"
																					>${configName}</f-text
																				></f-div
																		  >`
																		: ""}
																	<f-div width="fill-container">
																		${configValue?.type === "text"
																			? html` <f-text variant="para" size="small" weight="regular"
																					>${configValue?.value}</f-text
																			  >`
																			: configValue?.type === "tag"
																			? html`<f-tag size="small" label=${configValue?.value} state="primary" icon-left=${configValue?.iconLeft}></f-tab>`
																			: configValue?.type === "code"
																			? html`${configValue.value}`
																			: html`<f-text variant="para" size="small" weight="regular"
																					><a>${configValue?.value} +8 more</a></f-text
																			  >`}</f-div
																	>
																</f-div>`
														)}
													</f-div>
											  `}
									</f-tab-content>`
							)}
						</f-div>
						<!--End : node-details content section  -->
					</f-div>
					<!--End : node-details popover content -->
				</f-popover>
				<f-button
					id="open-popover"
					label="open popover"
					@click=${() => setOpen(!open)}
					@overlay-click=${() => setOpen(!open)}
				></f-button>
			</f-div>
		`;
	},

	name: "node-details",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 300
		}
	}
};
