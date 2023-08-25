import { html, PropertyValueMap, unsafeCSS } from "lit";
import { customElement, query } from "lit/decorators.js";
import { FRoot } from "@cldcvr/flow-core/src/mixins/components/f-root/f-root";
import eleStyle from "./f-force-graph.scss";
import * as d3 from "d3";

import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import { SimulationLinkDatum, SimulationNodeDatum } from "d3";
import { FDiv } from "@cldcvr/flow-core/src/components/f-div/f-div";
import { FText } from "@cldcvr/flow-core/src/components/f-text/f-text";
import { FPictogram } from "@cldcvr/flow-core/src/components/f-pictogram/f-pictogram";

@customElement("f-force-graph")
export class FForceGraph extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [unsafeCSS(eleStyle), ...FDiv.styles, ...FText.styles, ...FPictogram.styles];

	@query("svg")
	svg!: SVGSVGElement;

	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);
		const width = document.body.offsetWidth;
		const height = document.body.offsetHeight;
		const [nodeWidth, nodeHeight] = [44, 44];
		type ForceNode = SimulationNodeDatum & { id: number };
		const dataset: {
			nodes: ForceNode[];
			links: SimulationLinkDatum<ForceNode>[];
		} = {
			nodes: [
				{ id: 1 },
				{ id: 2 },
				{ id: 3 },
				{ id: 4 },
				{ id: 5 },
				{ id: 6 },
				{ id: 7 },
				{ id: 8 }
			],
			links: [
				{ source: 1, target: 2 },
				{ source: 2, target: 3 },
				{ source: 2, target: 4 },
				{ source: 3, target: 1 },
				{ source: 5, target: 4 },
				{ source: 3, target: 5 },
				{ source: 6, target: 3 },
				{ source: 5, target: 7 },
				{ source: 8, target: 5 }
			]
		};

		const simulation = d3
			.forceSimulation(dataset.nodes)
			.force(
				"link",
				d3
					.forceLink(dataset.links)
					.id(d => (d as ForceNode).id)
					.distance(150)
					.strength(0.5)
			)
			.force("charge", d3.forceManyBody().distanceMin(200).strength(-3000))
			.force("x", d3.forceX().strength(0.1))
			.force("y", d3.forceY().strength(0))
			.alpha(1);

		const svg = d3.select(this.svg).attr("viewBox", [-width / 2, -height / 2, width, height]);

		const graphContainer = svg.append("g");
		const handleZoom = (e: any) => {
			graphContainer.attr("transform", e.transform);
		};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const zoom = d3.zoom().scaleExtent([0.3, 4]).on("zoom", handleZoom) as any;

		svg.call(zoom).on("dblclick.zoom", null);

		const linkG = graphContainer
			.append("g")
			.attr("stroke", "var(--color-border-default)")
			.selectAll("g")
			.data(dataset.links)
			.join("g");

		const link = linkG
			.append("path")
			.attr("d", (d: any) => {
				return `M ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`;
			})
			.attr("id", (d: any) => {
				return `${d.source.id}->${d.target.id}`;
			});

		/**
		 * Link label background
		 */
		linkG
			.append("text")
			.attr("class", "label-wrapper")
			.append("textPath")
			.attr("text-anchor", "middle")
			.attr("xlink:href", function (d: any) {
				return `#${d.source.id}->${d.target.id}`;
			})
			.attr("startOffset", `50%`)
			.attr("stroke", "var(--color-surface-default)")
			.attr("stroke-width", "12px")
			.attr("dy", 20)
			.text("direction");

		/**
		 * Arrow
		 */
		linkG
			.append("text")
			.attr("class", "label")
			.attr("stroke", "var(--color-surface-default)")
			.attr("stroke-width", "1px")
			.attr("dy", 5.75)
			.attr("dx", 1)
			.append("textPath")
			.attr("text-anchor", "end")
			.attr("xlink:href", function (d: any) {
				return `#${d.source.id}->${d.target.id}`;
			})
			.attr("startOffset", `calc(100% - ${nodeHeight / 2}px)`)
			.attr("fill", "var(--color-border-secondary)")
			.text("▶");

		/**
		 * Link label
		 */
		linkG
			.append("text")
			.attr("class", "label")
			.attr("stroke", "var(--color-surface-default)")
			.attr("stroke-width", "1px")
			.attr("dy", 5)
			.append("textPath")
			.attr("text-anchor", "middle")
			.attr("xlink:href", function (d: any) {
				return `#${d.source.id}->${d.target.id}`;
			})
			.attr("startOffset", `50%`)
			.attr("stroke", "var(--color-text-secondary)")
			.text("direction");

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

		const drag = d3
			.drag()
			.on("start", dragstarted)
			.on("drag", dragged)
			.on("end", dragended) as unknown;
		type NodeDragType = (
			selection: d3.Selection<SVGForeignObjectElement, ForceNode, SVGGElement, unknown>,
			...args: any[]
		) => void;

		const node = graphContainer
			.append("g")
			.selectAll("g")
			.data(dataset.nodes)
			.join("g")
			.append("foreignObject")
			.attr("width", nodeWidth)
			.attr("height", nodeHeight)
			.html((d: any) => {
				return `<f-div width="100%" height="fit-content" gap="x-small" overflow="visible" direction="column" align="middle-center">
				<f-pictogram source="i-org" variant="circle" size="x-large"></f-pictogram>
				<f-div direction="column" width="200px" align="middle-center" overflow="visible" >
				<f-text class="no-wrap" align="center" inline state="subtle" size="x-small">Team ${d.id} </f-text>
				<f-text class="no-wrap" align="center" inline >Development </f-text>
				<f-text class="no-wrap" align="center" state="secondary" size="small" inline>team id | team location </f-text>
				</f-div>
				</f-div>`;
			})
			.on("dblclick", this.handleDbClick)
			.call(drag as NodeDragType);

		// const text = graphContainer
		// 	.append("g")
		// 	.selectAll("text")
		// 	.data(dataset.nodes)
		// 	.join("text")
		// 	.text(d => d.id)
		// 	.attr("fill", "var(--color-text-default)")
		// 	.call(drag);

		simulation.on("tick", () => {
			link.attr("d", (d: any) => {
				return `M ${d.source.x} ${d.source.y} L ${d.target.x} ${d.target.y}`;
			});

			node.attr("x", (d: any) => d.x - nodeWidth / 2).attr("y", (d: any) => d.y - nodeHeight / 2);
		});
	}
	handleDbClick(event: MouseEvent, d: any) {
		console.log(event, d);
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
