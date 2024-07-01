import { FormBuilderField } from "@ollion/flow-form-builder";
import { FDag } from "./f-dag";
import { html } from "lit";
import { FPopover } from "@ollion/flow-core";

export function linkTo(this: FDag) {
	const linkToFormFields: FormBuilderField = {
		type: "object",
		label: {
			title: "Select Groups Or Nodes"
		},
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
	const values = {
		groups: [],
		nodes: []
	};
	const handleLinkTo = (event: CustomEvent<{ groups?: string[]; nodes?: string[] }>) => {
		const currentNode = this.currentClickedNode!.node;

		const { groups, nodes } = event.detail;
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
		const linkToPopOver = this.querySelector<FPopover>(`#link-to-popover`)!;

		linkToPopOver.open = false;
		this.requestUpdate();
	};
	return html`
		<f-popover id="link-to-popover" size="small" id="add-group-popover" .overlay=${false}>
			<f-div padding="medium" @wheel=${(e: Event) => e.stopPropagation()}>
				<f-form-builder @submit=${handleLinkTo} .values=${values} .field=${linkToFormFields}>
					<f-button type="submit" variant="block" label="Link"></f-button>
				</f-form-builder>
			</f-div>
		</f-popover>
	`;
}
