import { html } from "lit-html";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { useArgs } from "@storybook/manager-api";
import { useState } from "@storybook/preview-api";
import { FDocViewerContent } from "@cldcvr/flow-core";
import getFakeDocContent from "../utils/mock-doc-content";

export default {
	title: "@cldcvr/flow-core/f-document-viewer",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export type DocViewerArgs = {
	content: FDocViewerContent;
	["jump-links"]: boolean;
	["collapsible-jump-links"]: boolean;
	["level-selector"]: boolean;
};

export const Playground = {
	render: (args: DocViewerArgs) => {
		return html`
			<f-document-viewer
				.content=${args.content}
				?jump-links=${args["jump-links"]}
				?collapsible-jump-links=${args["collapsible-jump-links"]}
				?level-selector=${args["level-selector"]}
			></f-document-viewer>
		`;
	},

	name: "Playground",

	argTypes: {
		content: {
			control: "object"
		},
		["jump-links"]: {
			control: "boolean"
		},
		["collapsible-jump-links"]: {
			control: "boolean"
		},
		["level-selector"]: {
			control: "boolean"
		}
	},

	args: {
		content: getFakeDocContent(20, 4),
		["jump-links"]: true,
		["collapsible-jump-links"]: true,
		["level-selector"]: true
	}
};
