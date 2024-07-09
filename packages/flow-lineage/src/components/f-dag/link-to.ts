import { FormBuilderField } from "@ollion/flow-form-builder";
import { FDag } from "./f-dag";
import { html } from "lit";
import { FPopover } from "@ollion/flow-core";

export function linkTo(this: FDag) {
	const linkToFormFields: FormBuilderField = {
		type: "object",

		direction: "vertical",
		fields: {
			groups: {
				type: "select",
				placeholder: "Select Groups",
				selection: "multiple",
				options: this.config.groups.map(g => g.id)
			},
			nodes: {
				type: "select",
				placeholder: "Select Nodes",
				selection: "multiple",
				options: this.config.nodes.map(n => n.id)
			}
		}
	};
	let values: { groups?: string[]; nodes?: string[] } = {
		groups: [],
		nodes: []
	};
	const handleInput = (event: CustomEvent<{ groups?: string[]; nodes?: string[] }>) => {
		values = event.detail;
	};
	const handleLinkTo = () => {
		if (this.selectedNodes.length > 0) {
			for (const currentNode of this.selectedNodes) {
				const { groups, nodes } = values;
				[...(groups ?? []), ...(nodes ?? [])].forEach(linkTo => {
					this.config.links.push({
						from: {
							elementId: currentNode.id
						},
						to: {
							elementId: linkTo
						}
					});
				});
			}
			this.selectedNodes = [];
			this.linkToButton.style.display = "none";
			this.addGroupButton.style.display = "none";
		} else {
			const currentNode = this.currentClickedNode!.node;

			const { groups, nodes } = values;
			[...(groups ?? []), ...(nodes ?? [])].forEach(linkTo => {
				this.config.links.push({
					from: {
						elementId: currentNode.id
					},
					to: {
						elementId: linkTo
					}
				});
			});
		}
		const linkToPopOver = this.querySelector<FPopover>(`#link-to-popover`)!;

		linkToPopOver.open = false;
		this.requestUpdate();
	};
	const handleClose = () => {
		const linkToPopOver = this.querySelector<FPopover>(`#link-to-popover`)!;

		linkToPopOver.open = false;
	};
	return html`
		<f-popover id="link-to-popover" size="small" id="add-group-popover" .overlay=${false}>
			<f-div @wheel=${(e: Event) => e.stopPropagation()} direction="column">
				<f-div padding="medium" align="middle-left" border="small solid subtle bottom">
					<f-text variant="heading" size="small">Select Groups Or Nodes</f-text>
					<f-icon-button
						icon="i-close"
						category="packed"
						size="small"
						state="neutral"
						@click=${handleClose}
					></f-icon-button>
				</f-div>
				<f-div padding="medium">
					<f-form-builder @input=${handleInput} .values=${values} .field=${linkToFormFields}>
					</f-form-builder>
				</f-div>
				<f-button @click=${handleLinkTo} variant="block" label="Link"></f-button>
			</f-div>
		</f-popover>
	`;
}
