import { html } from "lit";
import type { FDag } from "./f-dag";
import type { FInput, FSelect, FTabNode } from "@ollion/flow-core";

export function addGroupPopover(this: FDag) {
	const closeAddPopover = () => {
		this.addGroupPopoverRef.open = false;
	};
	return html` <f-popover size="small" id="add-group-popover" .overlay=${false} target="#add-group">
		<f-div @wheel=${(e: Event) => e.stopPropagation()}>
			<f-tab>
				<f-tab-node
					@click=${this.switchTab}
					class="gr-selection-tabs"
					active
					content-id=${`existing-group-selection`}
				>
					<f-div width="100%" height="100%" align="middle-center" direction="column">
						Exisiting
					</f-div>
				</f-tab-node>
				<f-tab-node @click=${this.switchTab} class="gr-selection-tabs" content-id=${`new-group`}>
					<f-div width="100%" height="100%" align="middle-center" direction="column">
						Create New
					</f-div>
				</f-tab-node>
			</f-tab>
			<f-tab-content id="existing-group-selection">
				<f-div padding="medium" gap="medium">
					<f-select
						id="f-group-dropdown"
						placeholder="Select Group"
						@input=${this.addToGroup}
						.options=${this.config.groups.map(g => g.id)}
					></f-select>
				</f-div>
				<f-button
					label="cancel"
					@click=${closeAddPopover}
					variant="block"
					state="neutral"
				></f-button>
			</f-tab-content>
			<f-tab-content id="new-group">
				<f-div direction="column">
					<f-div padding="medium" gap="medium">
						<f-input id="new-group-id" placeholder="New Group Id"></f-input>
						<f-input id="new-group-label" placeholder="New Group Label"></f-input>
					</f-div>

					<f-div>
						<f-div>
							<f-button
								label="cancel"
								@click=${closeAddPopover}
								variant="block"
								state="neutral"
							></f-button>
						</f-div>
						<f-div
							><f-button variant="block" label="Add" @click=${this.addToNewGroup}></f-button
						></f-div>
					</f-div>
				</f-div>
			</f-tab-content>
		</f-div>
	</f-popover>`;
}

export function handleAddGroup(this: FDag) {
	this.addGroupPopoverRef.open = true;
}

export function addSelectionToGroup(this: FDag, groupid: string) {
	this.selectedNodes.forEach(sn => {
		sn.group = groupid;
	});

	this.addGroupPopoverRef.open = false;

	this.config.nodes.forEach(n => {
		n.x = undefined;
		n.y = undefined;
	});
	this.config.groups.forEach(n => {
		n.x = undefined;
		n.y = undefined;
	});

	this.config.links.forEach(l => {
		l.from.x = undefined;
		l.from.y = undefined;
		l.to.x = undefined;
		l.to.y = undefined;
	});

	this.selectedNodes = [];
	this.addGroupButton.style.display = "none";
	this.requestUpdate();
}

export function addToNewGroup(this: FDag) {
	const groupIdInput = this.querySelector<FInput>("#new-group-id")!;
	const groupLabelInput = this.querySelector<FInput>("#new-group-label")!;
	const parentGroupIfAny = this.selectedNodes[0].group;

	const isAllFromSameGroup = this.selectedNodes.every(sn => sn.group === parentGroupIfAny);
	this.config.groups.push({
		id: groupIdInput.value as string,
		label: groupLabelInput.value as string,
		icon: "i-org",
		group: isAllFromSameGroup && parentGroupIfAny ? parentGroupIfAny : undefined
	});

	this.addSelectionToGroup(groupIdInput.value as string);
}

export function addToGroup(this: FDag) {
	const groupDropdown = this.querySelector<FSelect>(`#f-group-dropdown`)!;
	const groupid = groupDropdown.value as string;

	this.addSelectionToGroup(groupid);
}

export function switchTab(this: FDag, event: PointerEvent) {
	const tabNodeElement = event.currentTarget as FTabNode;

	this.groupSelectionTabs.forEach(tab => {
		tab.active = false;
	});
	tabNodeElement.active = true;
}
