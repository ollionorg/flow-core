import { html } from "lit-html";
import { useState } from "@storybook/preview-api";
import { FDocViewerContent } from "@nonfx/flow-core";
import getFakeDocContent from "../utils/mock-doc-content";

export default {
	title: "@nonfx/flow-core/f-document-viewer",

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

export const Content = {
	render: () => {
		const content = {
			["1."]: {
				title: "Preface",
				type: "heading",
				open: true,
				data: {
					"1.1": "The technology landscape of the financial sector is transforming at a rapid pace",
					"1.2": "The technology landscape of the financial sector is transforming at a rapid pace",
					"1.3": {
						title:
							"The technology landscape of the financial sector is transforming at a rapid pace",
						open: true,
						data: {
							"1.3.a":
								"The technology landscape of the financial sector is transforming at a rapid pace",
							"1.3.b":
								"The technology landscape of the financial sector is transforming at a rapid pace"
						}
					}
				}
			},
			["2."]: {
				title: "Technology",
				type: "heading",
				open: true,
				template: function (highlight: string) {
					return html`
						<f-div gap="medium">
							<f-div gap="medium">
								<f-text inline size="small" weight="bold" .highlight=${highlight} state="warning"
									>2.
								</f-text>
								<f-div>
									<f-text inline size="small" weight="bold" .highlight=${highlight} state="warning"
										>${this.title}</f-text
									>
								</f-div>
							</f-div>
							<f-divider state="secondary"></f-divider>
							<f-div width="150px" padding="none large"
								><f-tag label="Required" size="small" state="custom,#C29270"></f-tag
							></f-div>
						</f-div>
					`;
				},
				data: {
					"2.1": "The technology landscape of the financial sector is transforming at a rapid pace",
					"2.2": "The technology landscape of the financial sector is transforming at a rapid pace"
				}
			}
		};
		return html`
			<f-document-viewer .content=${content} ?collapsible-jump-links=${true}></f-document-viewer>
		`;
	},

	name: "content"
};

export const JumpLinks = {
	render: () => {
		const [jumpLinks, setJumpLinks] = useState(true);
		return html`
			<f-div direction="column" height="100%">
				<f-div state="subtle" padding="medium" height="hug-content"
					><f-button
						label=${`jump-links=${jumpLinks}`}
						@click=${() => {
							setJumpLinks(!jumpLinks);
						}}
					></f-button
				></f-div>
				<f-div>
					<f-document-viewer
						.content=${getFakeDocContent()}
						?jump-links=${jumpLinks}
						?collapsible-jump-links=${true}
					></f-document-viewer>
				</f-div>
			</f-div>
		`;
	},

	name: "jump-links"
};

export const CollapsibleJumpLinks = {
	render: () => {
		const [collapsibleJumpLinks, setCollapsibleJumpLinks] = useState(true);
		return html`
			<f-div direction="column" height="100%">
				<f-div state="subtle" padding="medium" height="hug-content"
					><f-button
						label=${`collpasible-jump-links=${collapsibleJumpLinks}`}
						@click=${() => {
							setCollapsibleJumpLinks(!collapsibleJumpLinks);
						}}
					></f-button
				></f-div>
				<f-div>
					<f-document-viewer
						.content=${getFakeDocContent()}
						?collapsible-jump-links=${collapsibleJumpLinks}
					></f-document-viewer>
				</f-div>
			</f-div>
		`;
	},

	name: "collapsible-jump-links"
};

export const LevelSelector = {
	render: () => {
		const [levelSelector, setLevelSelector] = useState(true);
		return html`
			<f-div direction="column" height="100%">
				<f-div state="subtle" padding="medium" height="hug-content"
					><f-button
						label=${`level-selector=${levelSelector}`}
						@click=${() => {
							setLevelSelector(!levelSelector);
						}}
					></f-button
				></f-div>
				<f-div>
					<f-document-viewer
						.content=${getFakeDocContent()}
						?level-selector=${levelSelector}
					></f-document-viewer>
				</f-div>
			</f-div>
		`;
	},

	name: "level-selector"
};
