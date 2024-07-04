import type { FDag } from "./f-dag";
import { FDagGroup, FDagNode } from "./types";
import { keyed } from "lit/directives/keyed.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { html } from "lit";

export default function getNodeGroupTemplate(
	this: FDag,
	element: FDagNode | FDagGroup,
	type: "node" | "group" = "node"
) {
	if (type === "node") {
		const n = element as FDagNode;
		// to force re-redner
		const nKey = new Date().getTime();
		const width = n.hidden ? this.collapsedNodeWidth : n.width;
		const height = n.hidden ? this.collapsedNodeHeight : n.height;
		return keyed(
			nKey,
			html`<f-div
				align="middle-center"
				.height=${height + "px"}
				.width=${width + "px"}
				class="dag-node ${n.hidden ? "hidden" : "visible"}"
				data-group=${ifDefined(n.group)}
				clickable
				data-node-type="node"
				data-effect=${ifDefined(n.effect)}
				.id=${`${n.id}`}
				style="z-index:2;transform:translate(${n.x}px, ${n.y}px);visibility:${n.hidden
					? "hidden"
					: "visible"}"
				@click=${this.highlightConnections}
				@mousemove=${this.dragNode}
				@mouseup=${this.updateNodePosition}
				@contextmenu=${this.handleNodeClick}
			>
				${(() => {
					if (n.template) {
						return n.template(n);
					}
					if (this.config.nodeTemplate) {
						return this.config.nodeTemplate(n);
					}
					return html`<f-div
						border="small solid subtle around"
						align="middle-left"
						gap="medium"
						state="secondary"
						padding="medium"
						variant="curved"
						><f-icon .source=${n.icon}></f-icon>
						<f-text size="small" weight="medium">${n.label}</f-text></f-div
					>`;
				})()}
				${["left", "right", "top", "bottom"].map(side => {
					return html`<span
						data-node-id=${n.id}
						class="circle ${side}"
						@mouseup=${this.dropLine}
						@mousedown=${this.startPlottingLine}
					></span>`;
				})}
			</f-div>`
		);
	} else {
		const g = element as FDagGroup;
		// to force re-redner
		const gKey = new Date().getTime();
		return keyed(
			gKey,
			html`<f-div
				align="top-left"
				variant="curved"
				@contextmenu=${this.handleNodeClick}
				.height=${(g.height ?? this.defaultElementHeight) + "px"}
				.width=${(g.width ?? this.defaultElementWidth) + "px"}
				data-group=${ifDefined(g.group)}
				data-effect=${ifDefined(g.effect)}
				class="dag-node ${g.hidden ? "hidden" : "visible"}"
				data-node-type="group"
				border="small solid subtle around"
				.id=${g.id}
				direction="column"
				style="z-index:1;transform:translate(${g.x}px, ${g.y}px);"
				@click=${this.highlightConnections}
				@mousemove=${this.dragNode}
				@mouseup=${this.updateNodePosition}
			>
				<f-div
					gap="medium"
					class="group-header"
					height="hug-content"
					clickable
					state="secondary"
					padding="small"
					align="middle-left"
				>
					<f-icon size="small" .source=${g.icon}></f-icon>
					<f-text size="x-small" weight="medium" ellipsis .tooltip=${g.label}>${g.label}</f-text>
					<f-div
						padding="none none none small"
						width="hug-content"
						@mouseup=${(e: MouseEvent) => e.stopPropagation()}
						@click=${() => this.toggleGroup(g)}
					>
						<f-icon-button
							category="packed"
							state="neutral"
							size="x-small"
							.tooltip=${g.collapsed && !g.hidden ? "Exapnd" : "Collapse"}
							.icon=${g.collapsed ? "i-chevron-down" : "i-chevron-up"}
						></f-icon-button>
					</f-div>
				</f-div>
				<f-div class="group-content"> </f-div>
				${["left", "right", "top", "bottom"].map(side => {
					return html`<span
						data-node-id=${g.id}
						class="circle ${side}"
						@mouseup=${this.dropLine}
						@mousedown=${this.startPlottingLine}
					></span>`;
				})}
				${["right-bottom"].map(side => {
					return html`<span
						data-node-id=${g.id}
						class="expander ${side}"
						@mousemove=${this.expandGroup}
					></span>`;
				})}
			</f-div>`
		);
	}
}
