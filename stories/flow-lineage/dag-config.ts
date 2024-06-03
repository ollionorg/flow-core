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
			x: 96,
			y: 539
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
			x: 766,
			y: 545,
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
				elementId: "group1",
				x: 502,
				y: 123
			}
		},
		{
			from: {
				elementId: "node2",
				x: 295,
				y: 563
			},
			to: {
				elementId: "group1",
				x: 502,
				y: 225
			}
		},
		{
			from: {
				elementId: "node2",
				x: 295,
				y: 565
			},
			to: {
				elementId: "node4",
				x: 765,
				y: 579
			}
		},
		{
			from: {
				elementId: "node3",
				x: 681,
				y: 299
			},
			to: {
				elementId: "node4",
				x: 800,
				y: 544
			}
		},
		{
			from: {
				elementId: "node5",
				x: 857,
				y: 176
			},
			to: {
				elementId: "node3",
				x: 658,
				y: 251
			}
		},
		{
			from: {
				elementId: "node3",
				x: 594,
				y: 251
			},
			to: {
				elementId: "node1",
				x: 249,
				y: 99
			}
		},
		{
			from: {
				elementId: "node3",
				x: 569,
				y: 299
			},
			to: {
				elementId: "node2",
				x: 229,
				y: 538
			}
		},
		{
			from: {
				elementId: "group3",
				x: 842,
				y: 239
			},
			to: {
				elementId: "node4",
				x: 858,
				y: 544
			}
		},
		{
			from: {
				elementId: "node5",
				x: 890,
				y: 208
			},
			to: {
				elementId: "group2",
				x: 887,
				y: 399
			}
		},
		{
			from: {
				elementId: "group3",
				x: 787,
				y: 239
			},
			to: {
				elementId: "group2",
				x: 806,
				y: 399
			}
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
