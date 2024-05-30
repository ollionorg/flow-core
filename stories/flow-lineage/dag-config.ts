import { FDagConfig } from "@ollion/flow-lineage";

const dagConfig: FDagConfig = {
	nodes: [
		{
			id: "node1",
			label: "Node 1",
			icon: "i-box",
			height: "48px",
			width: "200px",
			x: 100,
			y: 229
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
				x: 303,
				y: 253
			},
			to: {
				elementId: "group1",
				x: 498,
				y: 172
			}
		},
		{
			from: {
				elementId: "node2",
				x: 299,
				y: 563
			},
			to: {
				elementId: "node4",
				x: 761,
				y: 569
			}
		},
		{
			from: {
				elementId: "node2",
				x: 196,
				y: 534
			},
			to: {
				elementId: "node3",
				x: 522,
				y: 276
			}
		},
		{
			from: {
				elementId: "node1",
				x: 303,
				y: 253
			},
			to: {
				elementId: "group2",
				x: 474,
				y: 584
			}
		},
		{
			from: {
				elementId: "node1",
				x: 200,
				y: 280
			},
			to: {
				elementId: "node2",
				x: 91,
				y: 563
			}
		},
		{
			from: {
				elementId: "node3",
				x: 627,
				y: 247
			},
			to: {
				elementId: "group3",
				x: 734,
				y: 159
			}
		},
		{
			from: {
				elementId: "node5",
				x: 908,
				y: 206
			},
			to: {
				elementId: "node4",
				x: 866,
				y: 540
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
			x: 479,
			y: 434
		},
		{
			id: "group3",
			label: "Group 3",
			icon: "i-tree",
			height: "150px",
			width: "250px",
			x: 739,
			y: 84,
			group: "group1"
		}
	]
};

export default dagConfig;
