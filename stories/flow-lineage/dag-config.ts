import { FDagConfig } from "@ollion/flow-lineage";

const dagConfig: FDagConfig = {
	nodes: [
		{
			id: "node1",
			label: "Node 1",
			icon: "i-box",
			height: 48,
			width: 200
		},
		{
			id: "node2",
			label: "Node 2",
			icon: "i-box",
			height: 48,
			width: 200
		},
		{
			id: "node3",
			label: "Node 3",
			icon: "i-box",
			height: 48,
			width: 200,

			group: "group1"
		},
		{
			id: "node4",
			label: "Node 4",
			icon: "i-box",
			height: 48,
			width: 200,

			group: "group2"
		},
		{
			id: "node5",
			label: "Node 5",
			icon: "i-box",
			height: 48,
			width: 100,

			group: "group3"
		},
		{
			id: "node6",
			label: "Node 6",
			icon: "i-box",
			height: 48,
			width: 100,

			group: "group3"
		},
		{
			id: "node7",
			label: "Node 7",
			icon: "i-box",
			height: 48,
			width: 100,

			group: "group4"
		}
	],
	links: [
		{
			from: {
				elementId: "node1"
			},
			to: {
				elementId: "node5"
			},
			linkDirection: "horizontal"
		},
		{
			from: {
				elementId: "node1"
			},
			to: {
				elementId: "node3"
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "group1"
			},
			to: {
				elementId: "node2"
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "node2"
			},
			to: {
				elementId: "node4"
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "group3"
			},
			to: {
				elementId: "group2"
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "node3"
			},
			to: {
				elementId: "node1"
			},
			linkDirection: "horizontal"
		},
		{
			from: {
				elementId: "node3"
			},
			to: {
				elementId: "node2"
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "group3"
			},
			to: {
				elementId: "node2"
			},
			linkDirection: "horizontal"
		},
		{
			from: {
				elementId: "node1"
			},
			to: {
				elementId: "node2"
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "node5"
			},
			to: {
				elementId: "node4"
			},
			linkDirection: "vertical"
		}
	],
	groups: [
		{
			id: "group1",
			label: "Group 1",
			icon: "i-tree",
			height: 300,
			width: 500
		},
		{
			id: "group2",
			label: "Group 2",
			icon: "i-tree",
			height: 300,
			width: 500
		},
		{
			id: "group3",
			label: "Group 3",
			icon: "i-tree",
			height: 150,
			width: 250,

			group: "group1"
		},
		{
			id: "group4",
			label: "Group 4",
			icon: "i-tree",
			height: 150,
			width: 250,

			group: "group2"
		}
	]
};

export default dagConfig;
