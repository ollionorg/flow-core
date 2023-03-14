import { html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, query } from "lit/decorators.js";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import eleStyle from "./f-force-chart.scss";
import * as d3 from "d3";
import sampleData from "./sample-data.json";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";

@customElement("f-force-chart")
export class FForceChart extends FRoot {
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

		const root = d3.hierarchy(sampleData);
		const links = root.links() as d3.SimulationLinkDatum<d3.SimulationNodeDatum>[];
		const nodes = root.descendants() as d3.SimulationNodeDatum[];

		const simulation = d3
			.forceSimulation(nodes)
			.force(
				"link",
				d3
					.forceLink(links)
					.id(d => d.index as number)
					.distance(50)
					.strength(0.3)
			)
			.force("charge", d3.forceManyBody().strength(-200))
			.force("x", d3.forceX())
			.force("y", d3.forceY());

		const svg = d3.select(this.svg).attr("viewBox", [-width / 2, -height / 2, width, height]);

		const link = svg
			.append("g")
			.attr("stroke", "#999")
			.attr("stroke-opacity", 0.6)
			.selectAll("line")
			.data(links)
			.join("line");

		function dragstarted(event: { active: any }, d: { fx: any; x: any; fy: any; y: any }) {
			if (!event.active) simulation.alphaTarget(0.3).restart();
			d.fx = d.x;
			d.fy = d.y;
		}

		function dragged(event: { x: any; y: any }, d: { fx: any; fy: any }) {
			d.fx = event.x;
			d.fy = event.y;
		}

		function dragended(event: { active: any }, d: { fx: null; fy: null }) {
			if (!event.active) simulation.alphaTarget(0);
			d.fx = null;
			d.fy = null;
		}

		const drag = d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended);

		const node = svg
			.append("g")
			.attr("fill", "#fff")
			.attr("stroke", "#000")
			.attr("stroke-width", 1.5)
			.selectAll("circle")
			.data(nodes)
			.join("circle")
			.attr("fill", d => (d.children ? null : "var(--color-border-default)"))
			.attr("stroke", d => (d.children ? null : "var(--color-surface-default)"))
			.attr("r", 20)
			.call(drag);

		node.append("title").text(d => d.data.name);

		simulation.on("tick", () => {
			link
				.attr("x1", d => d.source.x)
				.attr("y1", d => d.source.y)
				.attr("x2", d => d.target.x)
				.attr("y2", d => d.target.y);

			node.attr("cx", d => d.x).attr("cy", d => d.y);
		});

		//invalidation.then(() => simulation.stop());
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
		"f-force-chart": FForceChart;
	}
}
