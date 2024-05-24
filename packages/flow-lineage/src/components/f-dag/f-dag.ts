/* eslint-disable @typescript-eslint/ban-ts-comment */
import { flowElement, FRoot } from "@ollion/flow-core";
import { injectCss } from "@ollion/flow-core-config";
import globalStyle from "./f-dag-global.scss?inline";
import { html, PropertyValueMap, unsafeCSS } from "lit";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import * as d3 from "d3";

injectCss("f-dag", globalStyle);
// Renders attribute names of parent element to textContent

export type DagNode = {
	type?: "node" | "group";
	data?: Record<string, any>;
	width?: number;
	height?: number;
};

export type DagLink = {
	from: string;
	to: string;
};

export type ComputedNode = {
	x?: number;
	y?: number;
	id: string;
	next: ComputedNode[];
} & DagNode;

@flowElement("f-dag")
export class FDag extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(globalStyle)];

	createRenderRoot() {
		return this;
	}

	svgElement: Ref<SVGSVGElement> = createRef();

	render() {
		return html` <svg ${ref(this.svgElement)}>
			<g transform="translate(2, 2)">
				<defs id="defs" />
				<g id="links" />
				<g id="nodes" />
				<g id="arrows" />
			</g>
		</svg>`;
	}
	protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		const nodes: Record<string, DagNode> = {};
		const links: DagLink[] = [];
		const computedNodes: Record<string, ComputedNode> = {};
		const widths = [200, 150, 250, 300];
		const heights = [50, 75, 100, 125, 150, 175];
		for (let i = 0; i < 20; i++) {
			nodes[`${i + 1}`] = {
				width: widths[Math.floor(Math.random() * widths.length)],
				height: heights[Math.floor(Math.random() * heights.length)]
			};
		}

		for (let i = 0; i < 20; i++) {
			links.push({
				from: `${1 + Math.floor(Math.random() * 20)}`,
				to: `${1 + Math.floor(Math.random() * 20)}`
			});
		}

		const roots = new Set<string>();
		const nonroots = new Set<string>();
		links.forEach(link => {
			if (link.from !== link.to) {
				if (!nonroots.has(link.from)) {
					roots.add(link.from);
				}

				if (roots.has(link.to)) {
					roots.delete(link.to);
				}
				nonroots.add(link.to);

				let fromNode: ComputedNode = {
					id: link.from,
					next: [],
					...nodes[link.from]
				};
				let toNode: ComputedNode = {
					id: link.to,
					next: [],
					...nodes[link.to]
				};
				if (computedNodes[link.from]) {
					fromNode = computedNodes[link.from];
				}
				if (computedNodes[link.to]) {
					toNode = computedNodes[link.to];
				}
				computedNodes[link.from] = fromNode;
				computedNodes[link.to] = toNode;
				fromNode.next.push(toNode);
			}
		});

		const svg = d3
			.select(this.svgElement.value as SVGSVGElement)
			// pad a little for link thickness
			.style("width", this.offsetWidth)
			.style("height", this.offsetHeight);

		let x = 0;
		let y = 0;
		let maxX = 0;
		const [defaultWidth, defaultHeight] = [50, 50];
		const [spaceX, spaceY] = [200, 200];

		// const nodesG = svg.append("g").attr("class", "dag-nodes");

		const rootNodes = Array.from(roots).map(rid => {
			return computedNodes[rid];
		});

		const calculateCords = (ns: ComputedNode[]) => {
			const nexts: ComputedNode[] = [];
			let maxHeight = defaultHeight;
			ns.forEach(n => {
				if (!n.x && !n.y) {
					const nx = x;
					x += (n.width ?? defaultWidth) + spaceX;
					if (x > maxX) {
						maxX = x;
					}
					n.x = nx;
					n.y = y;
					if (n.height && n.height > maxHeight) {
						maxHeight = n.height;
					}
					nexts.push(...n.next);
				}
			});
			y += maxHeight + spaceY;
			x = 0;
			if (nexts.length > 0) calculateCords(nexts);
		};
		calculateCords(rootNodes);
		svg
			.append("g")
			.attr("class", "dag-nodes")
			.selectAll("rect.dag-node")
			.data(Object.values(computedNodes))
			.join("rect")
			.attr("id", d => d.id)
			.attr("class", "dag-node")
			.attr("width", d => d.width ?? defaultWidth)
			.attr("height", d => d.height ?? defaultHeight)
			.attr("x", d => d.x as number)
			.attr("rx", 8)
			.attr("ry", 8)
			.attr("y", d => d.y as number)
			.attr("fill", "var(--color-surface-secondary)");
		const linkG = svg.append("g").attr("class", "dag-links");
		function createPathBetweenPoints(fromNode: ComputedNode, toNode: ComputedNode): void {
			// Define the line generator
			let { x: x1, y: y1 } = fromNode as Required<ComputedNode>;
			let { x: x2, y: y2 } = toNode as Required<ComputedNode>;

			if (x2 > x1 && y1 !== y2) {
				x1 += fromNode.width ?? defaultWidth;
				y1 += (fromNode.height ?? defaultHeight) / 2;
				y2 += (toNode.height ?? defaultHeight) / 2;
			} else if (x1 > x2 && y1 !== y2) {
				y1 += (fromNode.height ?? defaultHeight) / 2;
				y2 += (toNode.height ?? defaultHeight) / 2;
				x2 += toNode.width ?? defaultWidth;
			} else if (x1 === x2 && y2 > y1) {
				y1 += fromNode.height ?? defaultHeight;
				x1 += (fromNode.width ?? defaultWidth) / 2;
				x2 += (toNode.width ?? defaultWidth) / 2;
			} else if (x1 === x2 && y1 > y2) {
				x1 += (fromNode.width ?? defaultWidth) / 2;
				y2 += toNode.height ?? defaultHeight;
				x2 += (toNode.width ?? defaultWidth) / 2;
			} else if (y1 === y2) {
				x1 += fromNode.width ?? defaultWidth;
				y1 += (fromNode.height ?? defaultHeight) / 2;
				y2 += (toNode.height ?? defaultHeight) / 2;
			}

			// if (y2 > y1) {
			// 	y1 += fromNode.height ?? defaultHeight;
			// 	x1 += (fromNode.width ?? defaultWidth) / 2;
			// 	x2 += (toNode.width ?? defaultWidth) / 2;
			// } else if (y1 > y2) {
			// 	x1 += (fromNode.width ?? defaultWidth) / 2;
			// 	y2 += toNode.height ?? defaultHeight;
			// 	x2 += (toNode.width ?? defaultWidth) / 2;
			// }

			// Generate the path data
			const pathData = `M ${x1} ${y1}
			C ${(x1 + x2) / 2} ${y1},
			  ${(x1 + x2) / 2} ${y2},
			  ${x2} ${y2}`;

			// Append the path to the SVG
			linkG
				.append("path")
				.attr("d", pathData || "")
				.attr("stroke", "var(--color-border-default)")
				.attr("stroke-width", 2)
				.attr("fill", "none");
		}

		svg
			.append("g")
			.attr("class", "dag-nodes-labels")
			.selectAll("text.dag-node-label")
			.data(Object.values(computedNodes))
			.join("text")
			.attr("id", d => `${d.id}-label`)
			.attr("class", "dag-node-label")
			.attr("x", d => {
				if (d.x !== undefined) {
					return d.x + (d.width ?? defaultWidth) / 2;
				}
				return 0;
			})
			.attr("y", d => {
				if (d.y !== undefined) {
					return d.y + (d.height ?? defaultHeight) / 2;
				}
				return 0;
			})
			.attr("fill", "var(--color-text-default)")
			.attr("text-anchor", "middle")
			.attr("dy", `12`)
			.text(d => d.id);

		links.forEach(link => {
			createPathBetweenPoints(computedNodes[link.from], computedNodes[link.to]);
		});

		svg.attr("viewBox", `0 0 ${maxX + spaceX} ${y}`);
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
