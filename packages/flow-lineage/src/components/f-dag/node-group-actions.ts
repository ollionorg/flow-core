import { html } from "lit";
import type { FDag } from "./f-dag";
import type { FPopover } from "@ollion/flow-core";

export default function getNodeGroupActions(this: FDag) {
	const selectNode = (event: PointerEvent) => {
		event.stopPropagation();

		if (this.currentClickedNode) {
			const nodeElement = this.currentClickedNode.element;
			nodeElement.classList.add("selected");
			this.nodeActions.style.display = "none";

			this.selectedNodes.push(this.currentClickedNode.node);
			this.addGroupButton.style.display = "flex";
			this.linkToButton.style.display = "flex";
		}
	};

	const unGroup = () => {
		const id = this.currentClickedNode!.node.id;
		this.config.groups
			.filter(g => g.group === id)
			.forEach(g => {
				g.group = undefined;
			});
		this.config.nodes
			.filter(n => n.group === id)
			.forEach(n => {
				n.group = undefined;
			});
		const groupIndex = this.config.groups.findIndex(e => e.id === id);
		if (groupIndex > -1) {
			this.config.groups.splice(groupIndex, 1);
		}

		this.config.links = this.config.links.filter(
			l => !(l.from.elementId === id || l.to.elementId === id)
		);
		this.requestUpdate();
	};

	const openLinkTo = () => {
		const linkToPopOver = this.querySelector<FPopover>(`#link-to-popover`)!;
		linkToPopOver.target = this.currentClickedNode!.element;
		linkToPopOver.open = true;
	};

	const unlink = () => {
		const nodeId = this.currentClickedNode!.node.id;
		this.config.links = this.config.links.filter(
			l => l.from.elementId !== nodeId && l.to.elementId !== nodeId
		);
		this.requestUpdate();
	};
	return html` <f-div
		id="nodeActions"
		style="position:absolute;z-index:12;display:none"
		variant="curved"
		border="small solid default around"
		width="hug-content"
		height="24px"
		state="default"
	>
		<f-div
			@click=${selectNode}
			clickable
			width="hug-content"
			align="middle-center"
			padding="x-small small"
		>
			<f-text size="x-small">Select</f-text>
		</f-div>

		<f-divider></f-divider>
		<f-div id="ungroup-action" @click=${unGroup}>
			<f-div clickable width="hug-content" align="middle-center" padding="x-small small">
				<f-text size="x-small">Ungroup</f-text>
			</f-div>

			<f-divider></f-divider>
		</f-div>
		<f-div
			@click=${openLinkTo}
			clickable
			width="hug-content"
			align="middle-center"
			padding="x-small small"
		>
			<f-text size="x-small">Link To</f-text>
		</f-div>

		<f-divider></f-divider>
		<f-div
			@click=${unlink}
			clickable
			width="hug-content"
			align="middle-center"
			padding="x-small small"
		>
			<f-text size="x-small">Unlink</f-text>
		</f-div>

		<f-divider></f-divider>
		<f-div
			@click=${this.deleteElement}
			clickable
			width="hug-content"
			align="middle-center"
			padding="x-small small"
		>
			<f-text size="x-small">Delete</f-text>
		</f-div>
	</f-div>`;
}
