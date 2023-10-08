import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import Properties from "./lineage-properties.mdx";
import { useState, useEffect } from "@storybook/client-api";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { createRef, ref } from "lit/directives/ref.js";

export default {
	title: "Components/f-lineage",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	//   setInterval(()=> {
	render:
		//  if(divRef.value && divRef.value.style.display==="flex"){
		//    divRef.value.style.display="none";
		//    }else{
		//      divRef.value.style.display="flex";
		//    }
		//    },2000);
		// const data = lineageDataGenerator();
		args => {
			const [meta, setMeta] = useState(null);
			const [tabNodeData, setTabNodeData] = useState([]);
			const [tabData, setTabData] = useState(null);
			const [selected, setSelected] = useState("Table Details");

			const handleReady = e => {
				console.log("Got ready event", e);
			};

			const handleNodeMeta = e => {
				setMeta(e.detail.node.fNodeMeta);
				console.log(e?.detail);

				if (e.detail.node.fNodeMeta?.tabSections) {
					setTabNodeData(Object.keys(e.detail.node.fNodeMeta?.tabSections));
					setTabData(e.detail.node.fNodeMeta?.tabSections);
				} else {
					setTabNodeData([]);
					setTabData(null);
				}
			};

			const handleChangeTab = id => {
				setSelected(id);
			};

			const divRef = createRef();

			return html`<f-div ${ref(divRef)} height="100%"
				><f-div
					><f-lineage
						.direction=${args.direction}
						.padding=${args.padding}
						.gap=${args.gap}
						.node-size=${args["node-size"]}
						.children-node-size=${args["children-node-size"]}
						.max-children=${args["max-children"]}
						.node-template=${args["node-template"]}
						.children-node-template=${args["children-node-template"]}
						.links=${args.links}
						.nodes=${args.nodes}
						stagger-load="1"
						@ready=${handleReady}
						@node-meta=${handleNodeMeta}
					>
						<!--Start : node-details popover content  -->
						<f-div
							data-f-id="popover-content"
							state="secondary"
							width="100%"
							height="540px"
							align="top-left"
							variant="curved"
							direction="column"
							slot="node-meta"
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
								<f-div width="hug-content" align="middle-center" height="hug-content" gap="x-small">
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
							${tabNodeData?.length > 0
								? html` <f-tab data-f-id="Tab bar - regular">
										${tabNodeData.map(
											item =>
												html` <f-tab-node
													?active=${selected === item ? true : false}
													content-id=${`tab-${item}`}
													@click=${() => handleChangeTab(item)}
													><f-div
														width="100%"
														height="100%"
														align="middle-center"
														direction="column"
													>
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
																				? html`${unsafeHTML(configValue?.value)}`
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
					</f-lineage></f-div
				></f-div
			>`;
		},

	name: "Playground",
	height: "500px",

	argTypes: {
		direction: {
			control: "select",
			options: ["horizontal", "vertical"]
		},

		fData: {
			control: "object"
		},

		padding: {
			control: "number"
		},

		gap: {
			control: "number"
		},

		["node-size"]: {
			control: "object"
		},

		["children-node-size"]: {
			control: "object"
		},

		["max-children"]: {
			control: "number"
		}
	},

	args: {
		direction: "horizontal",
		padding: 28,
		gap: 100,

		["node-size"]: {
			width: 200,
			height: 52
		},

		["children-node-size"]: {
			width: 200,
			height: 32
		},

		["max-children"]: 8,

		["node-template"]: function (node) {
			return html` <f-div style="position:absolute;top:-20px;z-index:1;" gap="x-small">
					<f-tag label="Construction" state="primary" size="small"></f-tag>
					<f-tag label="Cat" size="small" counter="35"></f-tag>
				</f-div>
				<f-div
					state=${node.id === "Max" ? "custom,#006ecc" : "secondary"}
					width="100%"
					height="100%"
					padding="none medium"
					align="middle-left"
					variant="curved"
					gap="small"
					${node.fChildren && !node.fHideChildren ? 'border="small solid default bottom"' : ""}
				>
					<f-icon-button icon="i-table" state="neutral"></f-icon-button>
					<f-div direction="column" height="hug-content" align="middle-left">
						<f-text variant="code" size="large" ellipsis>${node.id}</f-text>
					</f-div>
					${node.childrenToggle}
				</f-div>`;
		},

		["children-node-template"]: function (node) {
			return html`<f-div
				state="secondary"
				width="100%"
				height="100%"
				padding="none medium"
				align="middle-left"
				gap="small"
				border="small solid default bottom"
			>
				<f-icon source="i-hashtag" size="small"></f-icon>
				<f-text variant="code" size="medium" ellipsis>${node.id}</f-text>
			</f-div>`;
		},

		links: [
			{
				from: "Tony",
				to: "Charlie"
			},
			{
				from: "Charlie",
				to: "Tony"
			},
			{
				from: "Max",
				to: "Charlie"
			},
			{
				from: "Calvin",
				to: "Hansen"
			},
			{
				from: "Brooke",
				to: "Tamara"
			},
			{
				from: "Calvin",
				to: "Bradley"
			},
			{
				from: "Tamara",
				to: "Bradley"
			},
			{
				from: "Charlie",
				to: "Roger"
			},
			{
				from: "Charlie",
				to: "Brooke"
			},
			{
				from: "Bradley",
				to: "John"
			},
			{
				from: "Bradley",
				to: "Tim"
			},
			{
				from: "Bradley",
				to: "Sam"
			},
			{
				from: "Bradley",
				to: "Rex"
			},
			{
				from: "Rex",
				to: "Bradley"
			},
			{
				from: "Roger",
				to: "Calvin"
			},
			{
				from: "Charlie",
				to: "Alicen"
			},
			{
				from: "Alicen",
				to: "Jennifer"
			},
			{
				from: "Jennifer",
				to: "John"
			},
			{
				from: "child1",
				to: "Tim"
			},
			{
				from: "Rex",
				to: "Pat"
			},
			{
				from: "A",
				to: "B"
			},
			{
				from: "Brooke",
				to: "child1"
			},
			{
				from: "mchild1",
				to: "child2"
			}
		],

		nodes: {
			Calvin: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Calvin"
				},

				fNodeMeta: {
					title: "StreetTree_Census.Environment",
					subTitle: "datapipes_census.street_2022",

					tabSections: {
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

								value: `<f-div width="fill-container" padding="small none" state="default" direction="column">
                        <f-div padding="medium"><f-text variant="para" weight="bold" size="small">Recipe steps(6):</f-text></f-div>
                        <f-div padding="none medium" direction="column">
                          <f-div direction="row" gap="x-small">
                          <f-text variant="para" weight="regular" size="small" inline>1. Delete column</f-text> <f-text inline variant="para" weight="regular" size="small" state="success">dateChecked, hash, negative, positive</f-text>
                        </f-div>
                        <f-div direction="row" gap="x-small">
                          <f-text variant="para" weight="regular" size="small" inline>2. Filter values by</f-text> <f-text inline variant="para" weight="regular" size="small" state="success">state</f-text>
                        </f-div>
                        <f-div direction="row" gap="x-small">
                          <f-text variant="para" weight="regular" size="small" inline>3. Create column</f-text> <f-text inline variant="para" weight="regular" size="small" state="subtle">date_formatted</f-text><f-text variant="para" weight="regular" size="small" inline>using dateTime.</f-text>
                        </f-div>
                        <f-div direction="row" gap="x-small">
                          <f-text variant="para" weight="regular" size="small" inline>4. Change type of</f-text> <f-text inline variant="para" weight="regular" size="small" state="success">date_formatted</f-text><f-text variant="para" weight="regular" size="small" inline>to Date</f-text>
                        </f-div>
                        <f-div direction="row" gap="x-small">
                          <f-text variant="para" weight="regular" size="small" inline>5. Delete column</f-text> <f-text inline variant="para" weight="regular" size="small" state="subtle">date</f-text>
                        </f-div>
                        <f-div direction="row" gap="x-small">
                          <f-text variant="para" weight="regular" size="small" inline>6. Create column</f-text> <f-text inline variant="para" weight="regular" size="small" state="subtle">positiveRate</f-text><f-text variant="para" weight="regular" size="small" inline>using Math function</f-text>
                          <f-text inline variant="para" weight="regular" size="small" state="subtle">DIVIDE</f-text>
                        </f-div>
                      </f-div>`
							}
						}
					}
				},

				fChildren: {
					child1: {
						fNodeMeta: {
							title: "StreetTree_Census.Environment",
							subTitle: "datapipes_census.street_2022"
						},

						fClick: function (event, node) {
							console.log("Child Node Clicked", event, node);
						},

						fRightClick: function (event, node) {
							console.log("Child Node Right Clicked", event, node);
						}
					},

					child2: {},
					child3: {},
					child4: {},
					child5: {},
					child6: {},
					child7: {},
					child8: {},
					child9: {},
					child10: {},
					child11: {},
					child12: {},
					child13: {},
					child14: {},
					child15: {},
					child16: {}
				},

				fClick: function (event, node) {
					console.log("Node Clicked", event, node);
				},

				fRightClick: function (event, node) {
					console.log("Node Right Clicked", event, node);
				}
			},

			Hansen: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Hansen"
				},

				fRightClick: function (event, node) {
					console.log("Node Right Clicked", event, node);
				},

				fNodeMeta: {
					title: "StreetTree_Census.Environment",
					subTitle: "datapipes_census.street_2022",

					tabSections: {
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

								value: `<f-div width="fill-container" padding="small none" state="default" direction="column">
                        <f-div padding="medium"><f-text variant="para" weight="bold" size="small">Recipe steps(6):</f-text></f-div>
                        <f-div padding="none medium" direction="column">
                          <f-div direction="row" gap="x-small">
                          <f-text variant="para" weight="regular" size="small" inline>1. Delete column</f-text> <f-text inline variant="para" weight="regular" size="small" state="success">dateChecked, hash, negative, positive</f-text>
                        </f-div>
                        <f-div direction="row" gap="x-small">
                          <f-text variant="para" weight="regular" size="small" inline>2. Filter values by</f-text> <f-text inline variant="para" weight="regular" size="small" state="success">state</f-text>
                        </f-div>
                        <f-div direction="row" gap="x-small">
                          <f-text variant="para" weight="regular" size="small" inline>3. Create column</f-text> <f-text inline variant="para" weight="regular" size="small" state="subtle">date_formatted</f-text><f-text variant="para" weight="regular" size="small" inline>using dateTime.</f-text>
                        </f-div>
                        <f-div direction="row" gap="x-small">
                          <f-text variant="para" weight="regular" size="small" inline>4. Change type of</f-text> <f-text inline variant="para" weight="regular" size="small" state="success">date_formatted</f-text><f-text variant="para" weight="regular" size="small" inline>to Date</f-text>
                        </f-div>
                        <f-div direction="row" gap="x-small">
                          <f-text variant="para" weight="regular" size="small" inline>5. Delete column</f-text> <f-text inline variant="para" weight="regular" size="small" state="subtle">date</f-text>
                        </f-div>
                        <f-div direction="row" gap="x-small">
                          <f-text variant="para" weight="regular" size="small" inline>6. Create column</f-text> <f-text inline variant="para" weight="regular" size="small" state="subtle">positiveRate</f-text><f-text variant="para" weight="regular" size="small" inline>using Math function</f-text>
                          <f-text inline variant="para" weight="regular" size="small" state="subtle">DIVIDE</f-text>
                        </f-div>
                      </f-div>`
							}
						}
					}
				},

				fChildren: {
					hchild1: {}
				}
			},

			Alicen: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Alicen"
				}
			},

			Jennifer: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Jennifer"
				}
			},

			Brooke: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Brooke"
				}
			},

			Tamara: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Tamara"
				}
			},

			Bradley: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Bradley"
				}
			},

			Roger: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Roger"
				}
			},

			Max: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Max"
				},

				fHideChildren: false,

				fChildren: {
					mchild1: {},
					mchild2: {},
					mchild3: {},
					mchild4: {},
					mchild5: {},
					mchild6: {},
					mchild7: {},
					mchild8: {},
					mchild9: {},
					mchild10: {},
					mchild11: {},
					mchild12: {},
					mchild13: {},
					mchild14: {},
					mchild15: {},
					mchild16: {}
				}
			},

			Tony: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Tony"
				},

				fNodeTemplate: function (node) {
					return html` <f-div
						state="custom,#284376"
						width="100%"
						height="100%"
						padding="none medium"
						align="middle-left"
						variant="curved"
						gap="small"
						style="border-radius:100px;"
						${node.fChildren ? 'border="small solid default bottom"' : ""}
					>
						<f-icon-button icon="i-user"></f-icon-button>
						<f-div direction="column" height="hug-content" align="middle-left">
							<f-text variant="code" size="large" ellipsis>${node.id}</f-text>
							<f-text variant="code" size="small" ellipsis>x: ${node.x}, y: ${node.y}</f-text>
						</f-div>
						${node.childrenToggle}
					</f-div>`;
				}
			},

			Charlie: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Roger"
				}
			},

			John: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "John"
				}
			},

			Tim: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Tim"
				}
			},

			Sam: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Sam"
				}
			},

			Rex: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Rex"
				}
			},

			Pat: {
				fData: {
					email: "abc@cldcvr.com",
					mobile: "+91-12345 67890",
					name: "Pat"
				}
			}
		}
	}
};
