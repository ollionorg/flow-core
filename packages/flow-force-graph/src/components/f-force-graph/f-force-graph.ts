import { html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, query } from "lit/decorators.js";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import eleStyle from "./f-force-graph.scss";
import * as d3 from "d3";

import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { BaseType, SimulationLinkDatum, SimulationNodeDatum } from "d3";

@customElement("f-force-graph")
export class FForceGraph extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle)];

	@query("svg")
	svg!: SVGSVGElement;

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		const width = document.body.offsetWidth;
		const height = document.body.offsetHeight;

		type ForceNode = SimulationNodeDatum & { id: number };
		const dataset: {
			nodes: ForceNode[];
			links: SimulationLinkDatum<ForceNode>[];
		} = {
			nodes: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 61 }],
			links: [
				{ source: 1, target: 5 },
				{ source: 4, target: 5 },
				{ source: 4, target: 61 },
				{ source: 3, target: 2 },
				{ source: 5, target: 2 },
				{ source: 1, target: 2 },
				{ source: 3, target: 4 }
			]
		};

		const simulation = d3
			.forceSimulation(dataset.nodes)
			.force(
				"link",
				d3
					.forceLink(dataset.links)
					.id(d => (d as ForceNode).id)
					.distance(200)
					.strength(0.5)
			)
			.force("charge", d3.forceManyBody().distanceMin(100).strength(-5000))
			.force("x", d3.forceX())
			.force("y", d3.forceY())
			.alpha(1);

		const svg = d3.select(this.svg).attr("viewBox", [-width / 2, -height / 2, width, height]);

		const graphContainer = svg.append("g");
		const handleZoom = (e: any) => {
			graphContainer.attr("transform", e.transform);
		};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const zoom = d3.zoom().scaleExtent([0.3, 4]).on("zoom", handleZoom) as any;

		svg.call(zoom).on("dblclick.zoom", null);

		const link = graphContainer
			.append("g")
			.attr("stroke", "#999")
			.attr("stroke-opacity", 0.6)
			.selectAll("line")
			.data(dataset.links)
			.join("line");

		function dragstarted(event: any, d: any) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(event: any, d: any) {
			d.fx = event.x;
			d.fy = event.y;
		}

		function dragended(event: any, d: any) {
			if (!event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}

		const drag = d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended) as (
			selection: d3.Selection<BaseType | SVGCircleElement, ForceNode, SVGGElement, unknown>,
			...args: any[]
		) => void;

		const node = graphContainer
			.append("g")
			.selectAll("circle")
			.data(dataset.nodes)
			.join("circle")
			.attr("fill", "var(--color-border-default)")
			.attr("stroke", "var(--color-surface-default)")
			.attr("r", 30)
			.call(drag);

		const text = graphContainer
			.append("g")
			.selectAll("text")
			.data(dataset.nodes)
			.join("text")
			.text(d => d.id)
			.attr("fill", "var(--color-text-default)")
			.call(drag);

		simulation.on("tick", () => {
			link
				.attr("x1", (d: any) => d.source.x)
				.attr("y1", (d: any) => d.source.y)
				.attr("x2", (d: any) => d.target.x)
				.attr("y2", (d: any) => d.target.y);

			node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);
			text.attr("x", (d: any) => d.x - 5).attr("y", (d: any) => d.y + 5);
		});
	}
	render() {
		return html` ${unsafeSVG(`<svg xmlns="http://www.w3.org/2000/svg"></svg>`)}`;
	}
}

/**
 * Required for typescript
 */
declare global {
	export interface HTMLElementTagNameMap {
		"f-force-graph": FForceGraph;
	}
}
