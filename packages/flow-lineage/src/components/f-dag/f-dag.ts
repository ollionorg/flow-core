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
	next?: HierarchyNode[];
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

	getElement(id: string) {
		let elementObj = this.config.nodes.find(n => n.id === id);
		if (!elementObj) {
			elementObj = this.config.groups.find(n => n.id === id);
		}
		return elementObj!;
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);

		const rootNodes = buildHierarchy(this.config);

		const [defaultWidth, defaultHeight] = [100, 100];

		const positionNodes = (
			elements: HierarchyNode[],
			x: number,
			y: number,
			spaceX = 100,
			spaceY = 100
		) => {
			const elementIds = elements.map(e => e.id);

			const nodeLinks = this.config.links.filter(
				l => elementIds.includes(l.from.elementId) && elementIds.includes(l.to.elementId)
			);
			const roots = new Set<HierarchyNode>(elements);
			const nonroots = new Set<HierarchyNode>();
			nodeLinks.forEach(link => {
				const fromElement = elements.find(e => e.id === link.from.elementId)!;
				if (!nonroots.has(fromElement)) {
					roots.add(fromElement);
				}
				if (!fromElement.next) {
					fromElement.next = [];
				}

				const toElement = elements.find(e => e.id === link.to.elementId)!;
				if (roots.has(toElement)) {
					roots.delete(toElement);
				}
				nonroots.add(toElement);
				fromElement.next.push(toElement);
			});

			const initialY = y;
			const initialX = x;
			let maxX = 0;
			let maxY = 0;
			const minX = x;
			const minY = y;
			const calculateCords = (ns: HierarchyNode[]) => {
				const nexts: HierarchyNode[] = [];
				let maxWidth = defaultWidth;
				let maxHeight = defaultHeight;
				ns.forEach(n => {
					const elementObject = this.getElement(n.id);
					if (!elementObject.x && !elementObject.y) {
						elementObject.x = x;
						elementObject.y = y;

						if (n.type === "group" && n.children && n.children.length > 0) {
							const { width, height } = positionNodes(
								n.children,
								x + 20,
								y + 60,
								elementObject.spacing?.x,
								elementObject.spacing?.y
							);

							elementObject.width = width;
							elementObject.height = height + 20;
						}
						if (x + elementObject.width > maxX) {
							maxX = x + elementObject.width;
						}
						if (y + elementObject.height > maxY) {
							maxY = y + elementObject.height;
						}

						if (this.config.layoutDirection === "vertical") {
							x += elementObject.width + spaceX;
						} else {
							y += elementObject.height + spaceY;
						}

						if (elementObject.width > maxWidth) {
							maxWidth = elementObject.width;
						}
						if (elementObject.height > maxHeight) {
							maxHeight = elementObject.height;
						}

						if (n.next) nexts.push(...n.next);
					}
				});
				if (this.config.layoutDirection === "vertical") {
					y += maxHeight + spaceY;
					x = initialX;
				} else {
					x += maxWidth + spaceX;
					y = initialY;
				}

				if (nexts.length > 0) calculateCords(nexts);
			};
			calculateCords(Array.from(roots));

			return {
				width: maxX - minX + 40,
				height: maxY - minY + 60
			};
		};

		positionNodes(rootNodes, 0, 0, this.config.spacing?.x, this.config.spacing?.y);
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

				if (!d.to.x && !d.to.y && !d.from.x && !d.from.y) {
					const fromElement = this.getElement(d.from.elementId);
					d.from.x = fromElement.x;
					d.from.y = fromElement.y;

					const toElement = this.getElement(d.to.elementId);
					d.to.x = toElement.x;
					d.to.y = toElement.y;
					if (this.config.layoutDirection === "horizontal") {
						d.linkDirection = "horizontal";
						if (d.to.x! > d.from.x!) {
							d.from.x! += fromElement.width;
							d.from.y! += fromElement.height / 2;
							d.to.y! += toElement.height / 2;
						} else {
							d.from.y! += fromElement.height / 2;
							d.to.x! += fromElement.width;
							d.to.y! += toElement.height / 2;
						}
					} else {
						d.linkDirection = "vertical";
						if (d.to.y! > d.from.y!) {
							d.from.x! += fromElement.width / 2;
							d.from.y! += fromElement.height;
							d.to.x! += toElement.width / 2;
						} else {
							d.from.x! += fromElement.width / 2;
							d.to.x! += fromElement.width / 2;
							d.to.y! += toElement.height;
						}
					}
				}
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
