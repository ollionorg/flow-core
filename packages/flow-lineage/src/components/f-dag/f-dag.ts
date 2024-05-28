/* eslint-disable @typescript-eslint/ban-ts-comment */
import { flowElement, FRoot } from "@ollion/flow-core";
import { injectCss } from "@ollion/flow-core-config";
import globalStyle from "./f-dag-global.scss?inline";
import { html, PropertyValueMap, unsafeCSS } from "lit";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import * as d3 from "d3";
import { SimulationLinkDatum, SimulationNodeDatum } from "d3";

injectCss("f-dag", globalStyle);
// Renders attribute names of parent element to textContent

export type DagNode = {
	id: string;
	group: number;
} & SimulationNodeDatum;

export type DagLink = {
	source: string;
	target: string;
} & SimulationLinkDatum<DagNode>;

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
		return html` <svg ${ref(this.svgElement)}></svg>`;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		let nodes: DagNode[] = [];

		const links: DagLink[] = [
			{ source: "User1", target: "User2" },
			{ source: "User3", target: "User4" },
			{ source: "User4", target: "User5" },
			{ source: "User4", target: "User1" }
		];

		for (let i = 0; i < 20; i++) {
			nodes.push({
				id: `User${i + 1}`,
				group: 1 + Math.floor(Math.random() * 4)
			});
		}

		for (let i = 0; i < 20; i++) {
			links.push({
				source: `User${1 + Math.floor(Math.random() * 20)}`,
				target: `User${1 + Math.floor(Math.random() * 20)}`
			});
		}

		const width = this.offsetWidth;
		const height = this.offsetHeight;
		const svg = d3.select("svg").attr("width", width).attr("height", height);

		function convexHulls(nodes: DagNode[]) {
			// debugger;
			const offset = 30;
			const hulls: Record<number, [number, number][]> = {};

			// create point sets
			for (let k = 0; k < nodes.length; ++k) {
				const n = nodes[k];

				const i = n.group,
					l = hulls[i] || (hulls[i] = []);
				l.push([n.x! - offset, n.y! - offset]);
				l.push([n.x! - offset, n.y! + offset]);
				l.push([n.x! + offset, n.y! - offset]);
				l.push([n.x! + offset, n.y! + offset]);
			}

			// create convex hulls
			const hullset = [];
			for (const i in hulls) {
				hullset.push({ group: +i, path: d3.polygonHull(hulls[i]) });
			}

			return hullset;
		}

		function centroid(nodes: DagNode[]) {
			let x = 0;
			let y = 0;
			let z = 0;
			for (const d of nodes) {
				const k = 4 ** 2;
				x += d.x! * k;
				y += d.y! * k;
				z += k;
			}
			return { x: x / z, y: y / z };
		}

		function forceCluster() {
			const strength = 0.9;

			function force(alpha: number) {
				const centroids = d3.rollup(nodes, centroid, d => d.group);
				const l = alpha * strength;
				for (const d of nodes) {
					const { x: cx, y: cy } = centroids.get(d.group)!;
					d.vx! -= (d.x! - cx) * l * 3;
					d.vy! -= (d.y! - cy) * l * 3;
				}
			}

			force.initialize = (_: DagNode[]) => (nodes = _);

			return force;
		}
		const simulation = d3
			.forceSimulation<DagNode>(nodes)
			.force(
				"link",
				d3
					.forceLink<DagNode, DagLink>(links)
					.id(d => d.id)
					.distance(l => {
						if ((l.source as DagNode).group === (l.target as DagNode).group) {
							return 50;
						}
						return 100;
					})
					.strength(l => {
						if ((l.source as DagNode).group === (l.target as DagNode).group) {
							return 0.01;
						}
						return 0.02;
					})
			)
			.force("charge", d3.forceManyBody().strength(-200))
			.force("center", d3.forceCenter(width / 2, height / 2))

			.force("collision", d3.forceCollide().radius(40))
			.force("cluster", forceCluster());
		simulation.alpha(0.3);
		simulation.tick(1);
		const link = svg
			.append("g")
			.attr("class", "links")
			.selectAll("line")
			.data(links)
			.enter()
			.append("line")
			.attr("class", "link")
			.attr("stroke", "var(--color-border-default)");

		const node = svg
			.append("g")
			.attr("class", "nodes")
			.selectAll("circle")
			.data(nodes)
			.enter()
			.append("circle")
			.attr("class", "node")
			.attr("fill", "var(--color-surface-tertiary)")
			.attr("stroke", "var(--color-border-default)")
			.attr("r", 20)
			.call(
				d3
					.drag<SVGCircleElement, DagNode>()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended)
			);
		const color = d3.scaleOrdinal(d3.range(10), d3.schemeCategory10);
		const label = svg
			.append("g")
			.attr("class", "labels")
			.selectAll("text")
			.data(nodes)
			.enter()
			.append("text")
			.attr("class", "label")
			.attr("fill", "var(--color-text-default)")
			.attr("dy", -3)
			.text(d => `Group${d.group}-${d.id}`);
		const curve = d3.line().curve(d3.curveCardinalClosed.tension(0.85));
		function drawCluster(d: any) {
			return curve(d.path as [number, number][]);
		}
		const hulls = svg
			.append("g")
			.selectAll("path.hull")
			.data(convexHulls(nodes))
			.enter()
			.append("path")
			.attr("class", "hull")
			.attr("d", drawCluster)
			.attr("stroke", d => color(d.group))
			.attr("stroke-width", 2)
			.attr("stroke-opacity", 0.4)
			.attr("fill-opacity", 0.05)
			.attr("fill", d => color(d.group));
		const applyPositions = () => {
			link
				.attr("x1", d => (d.source as DagNode).x!)
				.attr("y1", d => (d.source as DagNode).y!)
				.attr("x2", d => (d.target as DagNode).x!)
				.attr("y2", d => (d.target as DagNode).y!);

			node.attr("cx", d => d.x!).attr("cy", d => d.y!);

			label.attr("x", d => d.x!).attr("y", d => d.y!);
			hulls.data(convexHulls(nodes)).attr("d", drawCluster);
		};
		simulation.on("tick", applyPositions).on("end", applyPositions);

		function dragstarted(event: any, d: DagNode) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(event: any, d: DagNode) {
			d.fx = event.x;
			d.fy = event.y;
		}

		function dragended(event: any, d: DagNode) {
			if (!event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}
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
