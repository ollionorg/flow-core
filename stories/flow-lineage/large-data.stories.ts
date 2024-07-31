import { Story, Meta } from "@storybook/web-components";
import { html } from "lit-html";
import { LineageNodeElement, LineageNodeLinks, LineageNodes } from "@nonfx/flow-lineage";

export default {
	title: "@nonfx/flow-lineage/Examples/Large Data",
	argTypes: {
		["node-template"]: {
			control: false
		}
	}
} as Meta<Record<string, any>>;

const makeid = () => {
	const crypto = window.crypto;
	const array = new Uint32Array(1);
	return `N${crypto.getRandomValues(array)[0]}`;
};

function randomNumber(min: number, max: number) {
	// Get the current timestamp in milliseconds
	const timestamp = new Date().getTime();

	// Calculate a random number using the timestamp
	const randomNum = (timestamp % (max - min + 1)) + min;

	return randomNum;
}

const nodes: LineageNodes = {};
const links: LineageNodeLinks = [];

const levels: Record<number, string[]> = {};

for (let l = 0; l < 50; l++) {
	for (let n = 0; n < 20; n++) {
		const nodeid = makeid();
		nodes[nodeid] = {};
		if (!levels[l]) {
			levels[l] = [];
		}

		levels[l].push(nodeid);
		if (l > 0) {
			links.push({
				from: levels[l - 1][randomNumber(0, 9)],
				to: nodeid
			});
		}
	}
}

const Template: Story<unknown> = (args: any) => {
	return html`
		<f-lineage
			direction="horizontal"
			padding="16"
			gap="75"
			.node-size=${{ width: 44, height: 44 }}
			.children-node-size=${args["children-node-size"]}
			.max-children=${args["max-children"]}
			.node-template=${args["node-template"]}
			.children-node-template=${args["children-node-template"]}
			.links=${links}
			.nodes=${nodes}
			stagger-load="5"
		></f-lineage>
	`;
};

export const basic = Template.bind({});

basic.args = {
	["node-template"]: function (node: LineageNodeElement) {
		return html`<f-pictogram source="${node.id}" variant="circle" clickable></f-text>`;
	}
};
