import { FDagConfig } from "@ollion/flow-lineage";

const dagConfig: FDagConfig = {
	nodes: [
		{
			id: "node1",
			label: "Node 1",
			icon: "i-box",
			height: "48px",
			width: "200px",
			x: 78,
			y: 93
		},
		{
			id: "node2",
			label: "Node 2",
			icon: "i-box",
			height: "48px",
			width: "200px",
			x: 80,
			y: 489
		},
		{
			id: "node3",
			label: "Node 3",
			icon: "i-box",
			height: "48px",
			width: "200px",
			x: 549,
			y: 249,
			group: "group1"
		},
		{
			id: "node4",
			label: "Node 4",
			icon: "i-box",
			height: "48px",
			width: "200px",
			x: 611,
			y: 591,
			group: "group2"
		},
		{
			id: "node5",
			label: "Node 5",
			icon: "i-box",
			height: "48px",
			width: "100px",
			x: 768,
			y: 129,
			group: "group3"
		}
	],
	links: [
		{
			from: {
				elementId: "node1",
				x: 277,
				y: 102
			},
			to: {
				elementId: "node5",
				x: 767,
				y: 159
			},
			linkDirection: "horizontal"
		},
		{
			from: {
				elementId: "node1",
				x: 130,
				y: 140
			},
			to: {
				elementId: "node3",
				x: 612,
				y: 248
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "group1",
				x: 539,
				y: 313
			},
			to: {
				elementId: "node2",
				x: 159,
				y: 488
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "node2",
				x: 136,
				y: 536
			},
			to: {
				elementId: "node4",
				x: 689,
				y: 590
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "group3",
				x: 819,
				y: 211
			},
			to: {
				elementId: "group2",
				x: 713,
				y: 432
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "node3",
				x: 548,
				y: 267
			},
			to: {
				elementId: "node1",
				x: 277,
				y: 120
			},
			linkDirection: "horizontal"
		},
		{
			from: {
				elementId: "node3",
				x: 653,
				y: 288
			},
			to: {
				elementId: "node2",
				x: 127,
				y: 488
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "group3",
				x: 651,
				y: 179
			},
			to: {
				elementId: "node2",
				x: 279,
				y: 521
			},
			linkDirection: "horizontal"
		},
		{
			from: {
				elementId: "node1",
				x: 170,
				y: 140
			},
			to: {
				elementId: "node2",
				x: 212,
				y: 488
			},
			linkDirection: "vertical"
		},
		{
			from: {
				elementId: "node5",
				x: 852,
				y: 176
			},
			to: {
				elementId: "node4",
				x: 764,
				y: 590
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
			y: 14
		},
		{
			id: "group2",
			label: "Group 2",
			icon: "i-tree",
			height: "300px",
			width: "500px",
			x: 480,
			y: 433
		},
		{
			id: "group3",
			label: "Group 3",
			icon: "i-tree",
			height: "150px",
			width: "250px",
			x: 652,
			y: 62,
			group: "group1"
		}
	]
};

export default dagConfig;
