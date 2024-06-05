/* eslint-disable @typescript-eslint/ban-ts-comment */
import { flowElement, FRoot } from "@ollion/flow-core";
import { injectCss } from "@ollion/flow-core-config";
import globalStyle from "./f-dag-global.scss?inline";
import { html, PropertyValueMap, unsafeCSS } from "lit";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import * as d3 from "d3";
import { property, queryAll } from "lit/decorators.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { dragNestedGroups, dragNode, moveElement, updateNodePosition } from "./node-utils";
import type { CoOrdinates, FDagConfig, FDagElement, FDagLink } from "./types";
import {
	dropLine,
	generatePath,
	startPlottingLine,
	updateLinePath,
	updateLink
} from "./link-utils";

injectCss("f-dag", globalStyle);
// Renders attribute names of parent element to textContent
export type HierarchyNode = {
	id: string;
	height: number;
	width: number;
	group?: string;
	type: "group" | "node";
	children: HierarchyNode[];
};
function buildHierarchy(config: FDagConfig) {
	const nodesMap = new Map<string, HierarchyNode>();
	const groupMap = new Map<string, FDagElement>();

	config.groups.forEach(group => {
		groupMap.set(group.id, group);
	});

	config.nodes.forEach(node => {
		nodesMap.set(node.id, {
			id: node.id,
			group: node.group,
			width: node.width,
			type: "node",
			height: node.height,
			children: []
		});
	});

	const roots: HierarchyNode[] = [];

	nodesMap.forEach(node => {
		if (!node.group) {
			roots.push(node);
		}
	});

	function addGroupToHierarchy(group: FDagElement, parent?: HierarchyNode): void {
		const groupNode: HierarchyNode = {
			id: group.id,
			type: "group",
			height: group.height,
			width: group.width,
			children: []
		};

		config.nodes.forEach(node => {
			if (node.group === group.id) {
				groupNode.children.push(nodesMap.get(node.id)!);
			}
		});

		if (parent) {
			parent.children.push(groupNode);
		} else {
			roots.push(groupNode);
		}

		config.groups.forEach(subGroup => {
			if (subGroup.group === group.id) {
				addGroupToHierarchy(subGroup, groupNode);
			}
		});
	}

	config.groups.forEach(group => {
		if (!group.group) {
			addGroupToHierarchy(group);
		}
	});

	return roots;
}

@flowElement("f-dag")
export class FDag extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle)];
	readonly required = ["config"];

	@property({ type: Object, reflect: false })
	config!: FDagConfig;

	@queryAll(`.dag-node`)
	allGroupsAndNodes?: HTMLElement[];

	@queryAll(`.dag-node[data-node-type="node"]`)
	allNodes?: HTMLElement[];

	createRenderRoot() {
		return this;
	}
	scale = 1;

	svgElement: Ref<SVGSVGElement> = createRef();
	currentLine?: d3.Selection<SVGPathElement, FDagLink, null, undefined>;
	currentArrow?: d3.Selection<SVGTextPathElement, FDagLink, null, undefined>;

	/**
	 * Node utils
	 */
	moveElement = moveElement;
	dragNestedGroups = dragNestedGroups;
	dragNode = dragNode;
	updateNodePosition = updateNodePosition;

	/**
	 * Link utils
	 */

	startPlottingLine = startPlottingLine;
	updateLinePath = updateLinePath;
	dropLine = dropLine;
	updateLink = updateLink;
	generatePath = generatePath;

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);

		const rootNodes = buildHierarchy(this.config);

		const [spaceX, spaceY] = [100, 100];

		const positionNodes = (elements: HierarchyNode[], x: number, y: number) => {
			let maxX = 0;
			let maxY = 0;
			const minX = x;
			const minY = y;
			const nodes = elements.filter(e => e.type === "node");
			const groups = elements.filter(e => e.type === "group");
			let nodeY = y + 60;
			nodes.forEach(n => {
				const nodeObject = this.config.nodes.find(nd => nd.id === n.id)!;
				nodeObject.x = x;
				nodeObject.y = nodeY;

				if (x + nodeObject.width > maxX) {
					maxX = x + nodeObject.width;
				}
				if (nodeY + nodeObject.height > maxY) {
					maxY = nodeY + nodeObject.height;
				}
				nodeY += nodeObject.height + spaceY;
			});
			x = maxX + spaceX;
			y += 60;
			groups.forEach(g => {
				const groupObject = this.config.groups.find(nd => nd.id === g.id)!;

				groupObject.x = x;
				groupObject.y = y;

				if (g.children && g.children.length > 0) {
					const { width, height } = positionNodes(g.children, x + 20, y);

					groupObject.width = width;
					groupObject.height = height + 20;
				}

				if (x + groupObject.width > maxX) {
					maxX = x + groupObject.width;
				}
				if (y + groupObject.height > maxY) {
					maxY = y + groupObject.height;
				}

				y += groupObject.height + spaceY;
			});

			return {
				width: maxX - minX + 40,
				height: maxY - minY
			};
		};

		positionNodes(rootNodes, 0, 0);
	}
	render() {
		return html`<f-div width="100%" height="100%" @mousemove=${this.updateLinePath}>
			<svg style="position: absolute;width: 100%;height: 100%;top: 0px;left: 0px;">
				<pattern
					id="pattern-1undefined"
					x="-1.12163554046424"
					y="-19.679982038499702"
					width="24"
					height="24"
					patternUnits="userSpaceOnUse"
					patternTransform="translate(-0.5,-0.5)"
				>
					<circle cx="0.5" cy="0.5" r="1" fill="var(--color-border-secondary)"></circle>
				</pattern>
				<rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-1undefined)"></rect>
			</svg>
			${this.config.nodes.map(n => {
				return html`<f-div
					padding="medium"
					state="secondary"
					align="middle-left"
					variant="curved"
					.height=${n.height + "px"}
					.width=${n.width + "px"}
					class="dag-node"
					gap="medium"
					border="small solid subtle around"
					data-group=${ifDefined(n.group)}
					clickable
					data-node-type="node"
					.id=${`${n.id}`}
					style="z-index:2;transform:translate(${n.x}px, ${n.y}px)"
					@mousemove=${this.dragNode}
					@mouseup=${this.updateNodePosition}
				>
					<f-icon .source=${n.icon}></f-icon>
					<f-text size="small" weight="medium">${n.label}</f-text>
					${["left", "right", "top", "bottom"].map(side => {
						return html`<span
							data-node-id=${n.id}
							class="circle ${side}"
							@mouseup=${this.dropLine}
							@mousedown=${this.startPlottingLine}
						></span>`;
					})}
				</f-div>`;
			})}
			${this.config.groups.map(g => {
				return html`<f-div
					align="top-left"
					variant="curved"
					.height=${g.height + "px"}
					.width=${g.width + "px"}
					data-group=${ifDefined(g.group)}
					class="dag-node"
					data-node-type="group"
					border="small solid subtle around"
					.id=${g.id}
					style="z-index:1;transform:translate(${g.x}px, ${g.y}px)"
					@mousemove=${this.dragNode}
					@mouseup=${this.updateNodePosition}
				>
					<f-div gap="medium" height="hug-content" clickable state="secondary" padding="medium">
						<f-icon .source=${g.icon}></f-icon>
						<f-text size="small" weight="medium">${g.label}</f-text>
					</f-div>
					${["left", "right", "top", "bottom"].map(side => {
						return html`<span
							data-node-id=${g.id}
							class="circle ${side}"
							@mouseup=${this.dropLine}
							@mousedown=${this.startPlottingLine}
						></span>`;
					})}
				</f-div>`;
			})}
			<svg class="main-svg" ${ref(this.svgElement)}></svg>
		</f-div> `;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		const svg = d3.select(this.svgElement.value!);
		svg
			.selectAll("path.dag-line")
			.data<FDagLink>(this.config.links)
			.join("path")
			.attr("class", "dag-line")
			.attr("id", d => {
				return `${d.from.elementId}->${d.to.elementId}`;
			})
			.attr("d", d => {
				const points: CoOrdinates[] = [];
				points.push({
					x: d.from.x,
					y: d.from.y
				});
				points.push({
					x: d.to.x,
					y: d.to.y
				});

				return this.generatePath(points, d.linkDirection)!.toString();
			})
			.attr("stroke", "var(--color-border-default)");

		svg
			.selectAll("text.link-arrow")
			.data<FDagLink>(this.config.links)
			.join("text")
			.attr("class", "link-arrow")
			.attr("id", function (d) {
				return `${d.from.elementId}~arrow`;
			})
			.attr("stroke", "var(--color-surface-default)")
			.attr("stroke-width", "1px")
			.attr("dy", 5.5)
			.attr("dx", 2)
			.append("textPath")
			.attr("text-anchor", "end")

			.attr("xlink:href", function (d) {
				return `#${d.from.elementId}->${d.to.elementId}`;
			})
			.attr("startOffset", "100%")
			.attr("fill", "var(--color-border-default)")
			.text("▶");
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-dag": FDag;
	}
}
