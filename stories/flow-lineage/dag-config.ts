import { FDagConfig } from "@ollion/flow-lineage";

const dagConfig: FDagConfig = {
	nodes: [
		{
			id: "node1",
			label: "Node 1",
			icon: "i-box",
			height: "48px",
			width: "200px",
			x: 50,
			y: 63
		},
		{
			id: "node2",
			label: "Node 2",
			icon: "i-box",
			height: "48px",
			width: "200px",
			x: 167,
			y: 444
		},
		{
			id: "node3",
			label: "Node 3",
			icon: "i-box",
			height: "48px",
			width: "200px",
			x: 527,
			y: 252,
			group: "group1"
		},
		{
			id: "node4",
			label: "Node 4",
			icon: "i-box",
			height: "48px",
			width: "200px",
			x: 760,
			y: 623,
			group: "group2"
		},
		{
			id: "node5",
			label: "Node 5",
			icon: "i-box",
			height: "48px",
			width: "100px",
			x: 858,
			y: 155,
			group: "group3"
		}
	],
	links: [
		{
			from: {
				elementId: "node1",
				x: 249,
				y: 72
			},
			to: {
				elementId: "node5",
				x: 857,
				y: 185
			},
			linkDirection: "horizontal"
		},
		{
			from: {
				elementId: "node1",
				x: 102,
				y: 110
			},
			to: {
				elementId: "node3",
				x: 590,
				y: 251
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "group1",
				x: 539,
				y: 321
			},
			to: {
				elementId: "node2",
				x: 246,
				y: 443
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "node2",
				x: 223,
				y: 491
			},
			to: {
				elementId: "node4",
				x: 838,
				y: 622
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "group3",
				x: 892,
				y: 239
			},
			to: {
				elementId: "group2",
				x: 717,
				y: 399
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "node5",
				x: 924,
				y: 202
			},
			to: {
				elementId: "node4",
				x: 784,
				y: 622
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "node3",
				x: 526,
				y: 270
			},
			to: {
				elementId: "node1",
				x: 249,
				y: 90
			},
			linkDirection: "horizontal"
		},
		{
			from: {
				elementId: "node3",
				x: 631,
				y: 299
			},
			to: {
				elementId: "node2",
				x: 214,
				y: 443
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "group3",
				x: 724,
				y: 207
			},
			to: {
				elementId: "node2",
				x: 366,
				y: 476
			},
			linkDirection: "horizontal"
		},
		{
			from: {
				elementId: "node1",
				x: 142,
				y: 110
			},
			to: {
				elementId: "node2",
				x: 299,
				y: 443
			},
			linkDirection: "vertical"
		}
	],
	groups: [
		{
			id: "group1",
			label: "Group 1",
			icon: "i-tree",
			height: "300px",
			width: "500px",
			x: 503,
			y: 22
		},
		{
			id: "group2",
			label: "Group 2",
			icon: "i-tree",
			height: "300px",
			width: "500px",
			x: 484,
			y: 400
		},
		{
			id: "group3",
			label: "Group 3",
			icon: "i-tree",
			height: "150px",
			width: "250px",
			x: 725,
			y: 90,
			group: "group1"
		}
	]
};

export default dagConfig;
