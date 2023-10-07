import { Story,Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { LineageNodeLinks } from "@cldcvr/flow-lineage/src";
import nodes from "./nodes";
import { nodeTemplate, childrenNodeTemplate } from "./nodeTemplates";

export default {
  title: "Debug/Reverse-bend",
  argTypes: {
    ["node-template"]: {
      control: false,
    },
    ["children-node-template"]: {
      control: false,
    },
  },
} as Meta;

const links: LineageNodeLinks = [
	{
		from: "node1",
		to: "node2"
	},
	{
		from: "node1",
		to: "node4"
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
		from: "node5",
		to: "node4"
	},
	{
		from: "node3",
		to: "node1"
	},
	{
		from: "node1",
		to: "node5"
	},
	{
		from: "node6",
		to: "node5"
	},
	{
		from: "node4child1",
		to: "node5child2"
	},
	{
		from: "node4child1",
		to: "node5child1"
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
