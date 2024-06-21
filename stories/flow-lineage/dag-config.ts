import { FDagConfig, FDagNode } from "@ollion/flow-lineage";
import { html } from "lit";

const nodeTemplate = (node: FDagNode) => {
	return html`<f-div
		variant="curved"
		overflow="visible"
		border="small solid subtle around"
		align="middle-center"
		><f-icon .source=${node.icon} size="large"></f-icon>
		<f-text style="position:absolute;top:calc(100% + 4px);" size="x-small">${node.label}</f-text>
	</f-div>`;
};

const dagConfig: FDagConfig = {
	nodes: [
		{
			id: "node1",
			label: "Node 1",
			icon: "p-slack"
		},
		{
			id: "node2",
			label: "Node 2",
			icon: "p-kubernetes"
		},
		{
			id: "node3",
			label: "Node 3",
			icon: "p-docker",
			group: "group1"
		},
		{
			id: "node4",
			label: "Node 4",
			icon: "p-azure",
			group: "group2"
		},
		{
			id: "node5",
			label: "Node 5",
			icon: "p-gitlab",

			group: "group3"
		},
		{
			id: "node6",
			label: "Node 6",
			icon: "p-github",

			group: "group3"
		},
		{
			id: "node7",
			label: "Node 7",
			icon: "p-snowflake",

			group: "group4"
		},
		{
			id: "node8",
			label: "Node 8",
			icon: "p-ollion"
		},
		{
			id: "node9",
			label: "Node 9",
			icon: "p-terraform",

			group: "group5"
		},
		{
			id: "node10",
			label: "Node 10",
			icon: "p-aws-dark",

			group: "group5"
		},
		{
			id: "node11",
			label: "Node 11",
			icon: "p-postgresql",

			group: "group6"
		},
		{
			id: "node91",
			label: "Node 91",
			icon: "p-hadoop",

			group: "group7"
		},
		{
			id: "node101",
			label: "Node 101",
			icon: "p-redis",

			group: "group7"
		},
		{
			id: "node111",
			label: "Node 111",
			icon: "p-mysql",

			group: "group7"
		}
	],
	links: [
		{
			from: {
				elementId: "node1"
			},
			to: {
				elementId: "group4"
			}
		},
		{
			from: {
				elementId: "node1"
			},
			to: {
				elementId: "group1"
			}
		},
		{
			from: {
				elementId: "node3"
			},
			to: {
				elementId: "node4"
			}
		},
		{
			from: {
				elementId: "node2"
			},
			to: {
				elementId: "group3"
			}
		},
		{
			from: {
				elementId: "group1"
			},
			to: {
				elementId: "group2"
			}
		},
		{
			from: {
				elementId: "node6"
			},
			to: {
				elementId: "node8"
			}
		}
	],
	groups: [
		{
			id: "group1",
			label: "Group 1",
			icon: "i-tree",
			spacing: {
				x: 50,
				y: 50
			}
		},
		{
			id: "group2",
			label: "Group 2",
			icon: "i-tree",
			spacing: {
				x: 50,
				y: 50
			}
		},
		{
			id: "group3",
			label: "Group 3",
			icon: "i-tree",
			spacing: {
				x: 20,
				y: 20
			},
			group: "group4"
		},
		{
			id: "group4",
			label: "Group 4",
			icon: "i-tree",
			spacing: {
				x: 20,
				y: 20
			},
			group: "group1",
			layoutDirection: "vertical"
		},
		{
			id: "group5",
			label: "Group 5",
			icon: "i-tree",
			spacing: {
				x: 20,
				y: 20
			},
			placement: {
				section: 1,
				position: "before"
			}
		},
		{
			id: "group7",
			label: "Group 7",
			icon: "i-tree",
			spacing: {
				x: 20,
				y: 20
			},
			layoutDirection: "vertical",
			placement: {
				elementId: "group1",
				position: "after"
			}
		},
		{
			id: "group6",
			label: "Group 6",
			icon: "i-tree",
			spacing: {
				x: 20,
				y: 20
			},
			placement: {
				elementId: "node8",
				position: "after"
			}
		}
	],
	spacing: {
		x: 100,
		y: 60
	},
	defaultNodeSize: {
		width: 48,
		height: 48
	},
	nodeTemplate,
	layoutDirection: "vertical"
};

export default dagConfig;
