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
				elementId: "node5",
				x: 908,
				y: 206
			},
			to: {
				elementId: "node4",
				x: 873,
				y: 547
			}
		},
		{
			from: {
				elementId: "group3",
				x: 864,
				y: 237
			},
			to: {
				elementId: "group2",
				x: 734,
				y: 395
			}
		},
		{
			from: {
				elementId: "node5",
				x: 853,
				y: 179
			},
			to: {
				elementId: "node1",
				x: 253,
				y: 87
			}
		},
		{
			from: {
				elementId: "node2",
				x: 299,
				y: 563
			},
			to: {
				elementId: "group2",
				x: 479,
				y: 550
			}
		},
		{
			from: {
				elementId: "node2",
				x: 196,
				y: 534
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
				x: 196,
				y: 534
			},
			to: {
				elementId: "node1",
				x: 150,
				y: 114
			}
		},
		{
			from: {
				elementId: "node3",
				x: 627,
				y: 303
			},
			to: {
				elementId: "node4",
				x: 761,
				y: 569
			}
		},
		{
			from: {
				elementId: "group1",
				x: 753,
				y: 325
			},
			to: {
				elementId: "node4",
				x: 866,
				y: 540
			}
		},
		{
			from: {
				elementId: "group3",
				x: 734,
				y: 159
			},
			to: {
				elementId: "node2",
				x: 196,
				y: 534
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
			x: 739,
			y: 84,
			group: "group1"
		}
	]
};

export default dagConfig;
