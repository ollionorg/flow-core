import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { LineageNodeLinks } from "@nonfx/flow-lineage";
import { nodeTemplate, childrenNodeTemplate } from "./node-templates";
import nodes from "./nodes";

export default {
	title: "@nonfx/flow-lineage/Debug/dashed-hidden-children-link",
	argTypes: {
		["node-template"]: {
			control: false
		},
		["children-node-template"]: {
			control: false
		}
	}
} as Meta<Record<string, any>>;

const links: LineageNodeLinks = [
	{
		from: "node1",
		to: "node2"
	},

	{
		from: "node2",
		to: "node5"
	},
	{
		to: "node3",
		from: "node5"
	},
	{
		from: "node6",
		to: "node5"
	},

	{
		from: "node5",
		to: "node4"
	},
	{
		from: "node4child1",
		to: "node5child2"
	},
	{
		from: "node4child1",
		to: "node5child1"
	},
	{
		from: "node1child1",
		to: "node5child6"
	}
];

const Template: Story<unknown> = (args: any) => {
	return html`
		<f-lineage
			direction="horizontal"
			padding="16"
			gap="75"
			.node-size=${{ width: 240, height: 53 }}
			.children-node-size=${{ width: 240, height: 32 }}
			.max-children=${4}
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
