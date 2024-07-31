import {
	LineageNodeElement,
	LineageNodeLinks,
	LineageNodeSize,
	LineageNodeTemplate,
	LineageNodes
} from "@nonfx/flow-lineage";
import { html } from "lit-html";

export default {
	title: "@nonfx/flow-lineage/Examples",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, any>) => {
		const nodes: LineageNodes = {
			user: {
				fData: {
					icon: "i-user",
					state: "neutral"
				}
			},
			computer: {
				fData: {
					icon: "i-computer",
					state: "primary",
					effect: "pulse"
				}
			},
			failed: {
				fData: {
					icon: "i-org-fill",
					state: "danger"
				}
			},
			result: {
				fData: {
					icon: "i-crown",
					state: "neutral"
				}
			}
		};
		const links: LineageNodeLinks = [
			{
				from: "user",
				to: "computer"
			},
			{
				from: "user",
				to: "failed"
			},
			{
				from: "failed",
				to: "result"
			},
			{
				from: "computer",
				to: "result"
			},
			{
				from: "user",
				to: "result"
			}
		];

		const nodeTemplate: LineageNodeTemplate = node => {
			return html`<f-icon-button
				.icon=${node.fData?.icon}
				.state=${node.fData?.state}
				.effect=${node.fData?.effect}
			></f-icon-button>`;
		};

		const nodeSize: LineageNodeSize = {
			width: 36,
			height: 36
		};
		let idx = 0;
		const states = ["primary", "danger", "success", "neutral"];
		setInterval(() => {
			if (nodes.result.fData?.state) {
				nodes.result.fData.state = states[idx];
			}
			idx++;
			if (idx === 4) {
				idx = 0;
			}
		}, 1500);
		return html`<f-lineage
			.nodes=${nodes}
			.links=${links}
			direction="vertical"
			gap="250"
			.node-size=${nodeSize}
			.node-template=${nodeTemplate}
		></f-lineage>`;
	},
	name: "Icon Buttons Nodes ",
	height: "500px"
};
