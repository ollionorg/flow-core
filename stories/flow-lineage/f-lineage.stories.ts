import { FLineage, LineageNodeElement } from "@ollion/flow-lineage";
import { html } from "lit-html";
import { createRef, ref } from "lit/directives/ref.js";

export default {
	title: "@ollion/flow-lineage/f-lineage",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

const divRef = createRef();

const updateTooltip = (tooltip: string) => {
	const tooltipElement = document.querySelector("#lineage-tooltip");
	if (tooltipElement) {
		tooltipElement.innerHTML = tooltip;
	}
};

export const Playground = {
	render: (args: Record<string, unknown>) => {
		let meta = null;
		let tabNodeData = [];
		let tabData = null;

		let selected = "Table Details";
		const handleReady = (e: CustomEvent) => {
			console.log("Got ready event", e);
		};

		const handleNodeMeta = (e: CustomEvent) => {
			meta = e.detail.node.fNodeMeta;
			console.log(e?.detail);

			if (e.detail.node.fNodeMeta?.tabSections) {
				tabNodeData = Object.keys(e.detail.node.fNodeMeta?.tabSections);
				tabData = e.detail.node.fNodeMeta?.tabSections;
			} else {
				tabNodeData = [];
				tabData = null;
			}
		};

		const handleChangeTab = (id: string) => {
			selected = id;
		};

		return html`<f-div id="can-fullscreen" ${ref(divRef)} height="100%">
			<f-tooltip id="lineage-tooltip"></f-tooltip>
			<f-lineage
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
			</f-lineage>
		</f-div>`;
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

		["node-template"]: function (node: LineageNodeElement) {
			return html` <f-div
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
				<f-div
					@mouseenter=${() => updateTooltip(node.id ?? "NA")}
					direction="column"
					tooltip="#lineage-tooltip"
					height="hug-content"
					align="middle-left"
				>
					<f-text variant="code" size="large" ellipsis>${node.id}</f-text>
				</f-div>
				${node.childrenToggle}
			</f-div>`;
		},

		["children-node-template"]: function (node: LineageNodeElement) {
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
			},
			{
				from: "Pat",
				to: "Tony"
			}
		],

		nodes: {
			Calvin: {
				fData: {
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "Calvin"
				},

				fChildren: {
					child1: {
						fNodeMeta: {
							title: "StreetTree_Census.Environment",
							subTitle: "datapipes_census.street_2022"
						},

						fClick: function (event: CustomEvent, node: LineageNodeElement) {
							console.log("Child Node Clicked", event, node);
						},

						fRightClick: function (event: CustomEvent, node: LineageNodeElement) {
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

				fClick: function (event: CustomEvent, node: LineageNodeElement) {
					console.log("Node Clicked", event, node);
				},

				fRightClick: function (event: CustomEvent, node: LineageNodeElement) {
					console.log("Node Right Clicked", event, node);
				}
			},

			Hansen: {
				fData: {
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "Hansen"
				},

				fRightClick: function (event: CustomEvent, node: LineageNodeElement) {
					console.log("Node Right Clicked", event, node);
				},

				fChildren: {
					hchild1: {}
				}
			},

			Alicen: {
				fData: {
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "Alicen"
				}
			},

			Jennifer: {
				fData: {
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "Jennifer"
				}
			},

			Brooke: {
				fData: {
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "Brooke"
				}
			},

			Tamara: {
				fData: {
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "Tamara"
				}
			},

			Bradley: {
				fData: {
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "Bradley"
				}
			},

			Roger: {
				fData: {
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "Roger"
				}
			},

			Max: {
				fData: {
					email: "abc@ollion.com",
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
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "Tony"
				},

				fNodeTemplate: function (node: LineageNodeElement) {
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
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "Roger"
				}
			},

			John: {
				fData: {
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "John"
				}
			},

			Tim: {
				fData: {
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "Tim"
				}
			},

			Sam: {
				fData: {
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "Sam"
				}
			},

			Rex: {
				fData: {
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "Rex"
				}
			},

			Pat: {
				fData: {
					email: "abc@ollion.com",
					mobile: "+91-12345 67890",
					name: "Pat"
				}
			}
		}
	}
};
