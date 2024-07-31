import { FTabNode } from "@nonfx/flow-core";
import { html } from "lit-html";
import { createRef, ref } from "lit/directives/ref.js";

export default {
	title: "@nonfx/flow-core/f-tab-node",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

export const Playground = {
	render: (args: Record<string, string>) => {
		return html` <f-div>
			<f-tab-node ?active=${args.active} .width=${args.width} variant=${args.variant}>
				<f-div width="100%" height="100%" align="middle-center" direction="column"
					><f-div align="middle-center" height="hug-content" width="hug-content">Tab Item</f-div
					><f-div align="middle-center" height="hug-content" width="hug-content"
						>Description</f-div
					></f-div
				>
			</f-tab-node>
		</f-div>`;
	},

	name: "Playground",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	},

	argTypes: {
		width: {
			control: "text"
		},

		active: {
			control: "boolean"
		},

		variant: {
			control: "radio",
			options: ["transparent", "fill"]
		}
	},

	args: {
		width: "fill",
		active: true,
		variant: "fill"
	}
};

export const ContentId = {
	render: () => {
		let selected = "uni-1";
		const tab1 = createRef<FTabNode>();
		const tab2 = createRef<FTabNode>();
		const setSelected = (tabid: string) => {
			if (tabid === "uni-1") {
				tab1.value!.active = true;
				tab2.value!.active = false;
				selected = "uni-1";
			} else {
				tab2.value!.active = true;
				tab1.value!.active = false;
				selected = "uni-2";
			}
		};
		return html`
			<f-div>
				<f-tab-node
					${ref(tab1)}
					?active=${selected === "uni-1"}
					content-id="uni-1"
					@click=${() => setSelected("uni-1")}
					>Tab 1</f-tab-node
				>
				<f-tab-node
					${ref(tab2)}
					?active=${selected === "uni-2"}
					content-id="uni-2"
					@click=${() => setSelected("uni-2")}
					>Tab 2</f-tab-node
				>
			</f-div>
			<f-tab-content transition="fade" id="uni-1"
				><f-div direction="column" width="100%" padding="large"
					><f-div
						><f-text variant="heading" size="x-large" weight="bold">Tab Content - 1</f-text></f-div
					>
					<f-div>
						<f-text
							>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
							Ipsum has been the industry's standard dummy text ever since the 1500s, when an
							unknown printer took a galley of type and scrambled it to make a type specimen book.
							It has survived not only five centuries, but also the leap into electronic
							typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
							release of Letraset sheets containing Lorem Ipsum passages, and more recently with
							desktop publishing software like Aldus PageMaker including versions of Lorem
							Ipsum.</f-text
						></f-div
					></f-div
				></f-tab-content
			>
			<f-tab-content transition="fade" id="uni-2"
				><f-div direction="column" width="100%" padding="large"
					><f-div
						><f-text variant="heading" size="x-large" weight="bold">Tab Content - 2</f-text></f-div
					>
					<f-div>
						<f-text
							>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
							Ipsum has been the industry's standard dummy text ever since the 1500s, when an
							unknown printer took a galley of type and scrambled it to make a type specimen book.
							It has survived not only five centuries, but also the leap into electronic
							typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
							release of Letraset sheets containing Lorem Ipsum passages, and more recently with
							desktop publishing software like Aldus PageMaker including versions of Lorem
							Ipsum.</f-text
						></f-div
					></f-div
				></f-tab-content
			>
		`;
	},

	name: "content-id",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};

export const Active = {
	render: () => {
		return html`<f-div>
			<f-tab-node ?active=${true} variant="fill">
				<f-div width="100%" height="100%" align="middle-center" direction="column"
					><f-div align="middle-center" height="hug-content" width="hug-content">Tab Item</f-div
					><f-div align="middle-center" height="hug-content" width="hug-content"
						>active="true"</f-div
					></f-div
				>
			</f-tab-node>
			<f-tab-node ?active=${false} variant="fill">
				<f-div width="100%" height="100%" align="middle-center" direction="column"
					><f-div align="middle-center" height="hug-content" width="hug-content">Tab Item</f-div
					><f-div align="middle-center" height="hug-content" width="hug-content"
						>active = "false"</f-div
					></f-div
				>
			</f-tab-node>
		</f-div>`;
	},

	name: "active",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};

export const Disabled = {
	render: () => {
		return html`<f-div>
			<f-tab-node variant="fill">
				<f-div width="100%" height="100%" align="middle-center" direction="column"
					><f-div align="middle-center" height="hug-content" width="hug-content">Tab Item</f-div
					><f-div align="middle-center" height="hug-content" width="hug-content"
						>disabled="false"</f-div
					></f-div
				>
			</f-tab-node>
			<f-tab-node disabled ?active=${false} variant="fill">
				<f-div width="100%" height="100%" align="middle-center" direction="column"
					><f-div align="middle-center" height="hug-content" width="hug-content">Tab Item</f-div
					><f-div align="middle-center" height="hug-content" width="hug-content"
						>disabled = "true"</f-div
					></f-div
				>
			</f-tab-node>
		</f-div>`;
	},

	name: "disabled",

	parameters: {
		docs: {
			inlineStories: false,
			iframeHeight: 200
		}
	}
};
