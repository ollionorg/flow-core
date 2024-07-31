import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { LineageNodeLinks, LineageNodes } from "@nonfx/flow-lineage";
import { nodeTemplate, childrenNodeTemplate } from "./node-templates";

export default {
	title: "@nonfx/flow-lineage/Debug/Links",
	argTypes: {
		["node-template"]: {
			control: false
		},
		["children-node-template"]: {
			control: false
		}
	}
} as Meta<Record<string, any>>;

const nodes: LineageNodes = {
	rdj: {
		fData: {
			fullName: "Robert Downey Jr.",
			description: "Movies",
			state: "secondary"
		},
		fChildren: {
			child1: {
				fData: {
					icon: "i-hashtag",
					title: "Iron man 1"
				}
			},
			child2: {
				fData: {
					icon: "i-hashtag",
					title: "Iron man 2"
				}
			}
		},
		fHideChildren: false
	},
	judge: {
		fData: {
			fullName: "The Judge",
			description: "Hank Palmer",
			state: "custom,#006ecc"
		}
	},
	ironman: {
		fData: {
			fullName: "Iron Man",
			description: "Tony stark",
			state: "secondary"
		},
		fChildren: {
			iman1: {
				fData: {
					icon: "i-hashtag",
					title: "Iron man 1"
				}
			},
			iman2: {
				fData: {
					icon: "i-paragraph",
					title: "Iron man 2"
				}
			}
		}
	},
	hank: {
		fData: {
			fullName: "Hank Palmer",
			description: "Actor",
			state: "secondary"
		},
		fChildren: {
			hhchild1: {
				fData: {
					icon: "i-hashtag",
					title: "Node child 1"
				}
			},
			hhchild2: {
				fData: {
					icon: "i-paragraph",
					title: "Node child 2"
				}
			}
		},
		fHideChildren: false
	},
	prop1: {
		fData: {
			fullName: "Bugs",
			description: "Roota Voota",
			state: "primary"
		},
		fChildren: {
			hchild1: {
				fData: {
					icon: "i-hashtag",
					title: "H Node child 1"
				}
			},
			hchild2: {
				fData: {
					icon: "i-paragraph",
					title: "H Node child 2"
				}
			}
		}
	}
};
const links: LineageNodeLinks = [
	{
		from: "prop1",
		to: "judge"
	},
	{
		from: "rdj",
		to: "judge"
	},
	{
		from: "rdj",
		to: "ironman"
	},
	{
		from: "judge",
		to: "hank"
	},
	{
		from: "iman1",
		to: "child1"
	},
	{
		from: "ironman",
		to: "prop1"
	},
	{
		from: "hank",
		to: "rdj"
	}
	//   {
	//     from: "hank",
	//     to: "prop1",
	//   },
];

const Template: Story<unknown> = (args: any) => {
	return html`
		<f-lineage
			direction="horizontal"
			padding="16"
			gap="75"
			.node-size=${{ width: 240, height: 53 }}
			.children-node-size=${{ width: 240, height: 32 }}
			.max-children=${args["max-children"]}
			.node-template=${args["node-template"]}
			.children-node-template=${args["children-node-template"]}
			.links=${links}
			.nodes=${nodes}
			stagger-load="1"
		></f-lineage>
	`;
};

export const basic = Template.bind({});

basic.args = {
	["node-template"]: nodeTemplate,
	["children-node-template"]: childrenNodeTemplate
};

// let updateCounter = 0;

// setInterval(() => {
//   updateCounter += 1;

//   if (nodes.rdj?.fData) {
//     nodes.rdj.fData.fullName = `Property Update ${updateCounter}`;
//   }
//   if (nodes.ironman?.fData) {
//     nodes.ironman.fData = {
//       fullName: `New Object ${updateCounter}`,
//       description: "Tony stark",
//       state: "secondary",
//     };
//   }
//   if (nodes.rdj.fChildren && nodes.rdj.fChildren.child1.fData) {
//     nodes.rdj.fChildren.child1.fData.title = `Child Property Update ${updateCounter}`;
//   }
//   if (nodes.rdj.fChildren && nodes.rdj.fChildren.child2.fData) {
//     nodes.rdj.fChildren.child2.fData = {
//       icon: "i-hashtag",
//       title: `New Child Object ${updateCounter}`,
//     };
//   }
//   if (nodes.prop1.fData) nodes.prop1.fData.state = "danger";
// }, 5000);
