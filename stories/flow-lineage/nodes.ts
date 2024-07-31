import { LineageNodes } from "@nonfx/flow-lineage/src";

const nodes: LineageNodes = {
	node1: {
		fData: {
			fullName: "Node 1",
			description: "Movies",
			state: "secondary"
		},
		fChildren: {
			node1child1: {
				fData: {
					icon: "i-hashtag",
					title: "Node 1 child 1"
				}
			}
		}
	},
	node2: {
		fData: {
			fullName: "Node 2",
			description: "Hank Palmer",
			state: "custom,#006ecc"
		},
		fChildren: {
			node2child1: {
				fData: {
					icon: "i-hashtag",
					title: "node 2 child 1"
				}
			},
			node2child2: {
				fData: {
					icon: "i-paragraph",
					title: "node 2 child 2"
				}
			}
		},
		fHideChildren: false
	},
	node3: {
		fData: {
			fullName: "Node 3",
			description: "Hank Palmer",
			state: "custom,#006ecc"
		}
	},
	node4: {
		fData: {
			fullName: "Node 4",
			description: "Tony stark",
			state: "secondary"
		},
		fChildren: {
			node4child1: {
				fData: {
					icon: "i-hashtag",
					title: "node 4 child 1"
				}
			},
			node4child2: {
				fData: {
					icon: "i-paragraph",
					title: "node 4 child 2"
				}
			}
		},
		fHideChildren: false
	},
	node5: {
		fData: {
			fullName: "Node 5",
			description: "Actor",
			state: "secondary"
		},
		fChildren: {
			node5child1: {
				fData: {
					icon: "i-hashtag",
					title: "Node 5 child 1"
				}
			},
			node5child3: {
				fData: {
					icon: "i-hashtag",
					title: "Node 5 child 3"
				}
			},
			node5child2: {
				fData: {
					icon: "i-paragraph",
					title: "Node 5 child 2"
				}
			}
		},
		fHideChildren: false
	},
	node6: {
		fData: {
			fullName: "Node 6",
			description: "Hank Palmer",
			state: "custom,#006ecc"
		}
	}
};

export default nodes;
