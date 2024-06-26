import * as d3 from "d3";
import type { FDag } from "./f-dag";
import { CoOrdinates, FDagLink } from "./types";

export default function drawLinks(this: FDag) {
	const getConnectingPosition = (
		id: string,
		side: "left" | "right" | "top" | "bottom",
		size: number
	) => {
		const element = this.querySelector<HTMLElement>(`#${id}`)!;
		let connectionCount: number = Number(element.dataset[side]);
		if (!connectionCount) {
			connectionCount = 0;
		}
		let point = size / 2;
		if (connectionCount % 2 !== 0) {
			point = size / 2 - connectionCount * 12;
		}

		element.dataset[side] = `${connectionCount + 1}`;
		if (point > size || point < 0) {
			return size / 2;
		}
		return point;
	};

	// cloning because d3 is not re-drawing links
	const links = structuredClone(this.config.links);
	const svg = d3.select(this.linksSVG);
	svg.html(``);
	svg
		.selectAll("path.dag-line")
		.data<FDagLink>(links)
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

				const fromWidth = fromElement.hidden ? this.collapsedNodeWidth : fromElement.width;
				const fromHeight = fromElement.hidden ? this.collapsedNodeHeight : fromElement.height;
				const toWidth = toElement.hidden ? this.collapsedNodeWidth : toElement.width;
				const toHeight = toElement.hidden ? this.collapsedNodeHeight : toElement.height;

				if (this.config.layoutDirection === "horizontal") {
					d.direction = "horizontal";
					if (d.to.x! > d.from.x!) {
						d.from.x! += fromWidth!;
						d.from.y! += getConnectingPosition(d.from.elementId, "right", fromHeight!);
						d.to.y! += getConnectingPosition(d.to.elementId, "left", toHeight!);
					} else {
						d.from.y! += getConnectingPosition(d.from.elementId, "left", fromHeight!);
						d.to.x! += toWidth!;
						d.to.y! += getConnectingPosition(d.to.elementId, "right", fromHeight!);
					}
				} else {
					d.direction = "vertical";
					if (d.to.y! > d.from.y!) {
						d.from.x! += getConnectingPosition(d.from.elementId, "bottom", fromWidth!);
						d.from.y! += fromHeight!;
						d.to.x! += getConnectingPosition(d.to.elementId, "top", toWidth!);
					} else {
						d.from.x! += getConnectingPosition(d.from.elementId, "top", fromWidth!);
						d.to.x! += getConnectingPosition(d.to.elementId, "bottom", toWidth!);
						d.to.y! += toHeight!;
					}
				}
			}
			if (!d.direction) {
				if (this.config.layoutDirection === "horizontal") {
					d.direction = "horizontal";
				} else {
					d.direction = "vertical";
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

			return this.generatePath(points, d.direction)!.toString();
		})
		.attr("stroke", d => {
			const fromElement = this.getElement(d.from.elementId);

			const toElement = this.getElement(d.to.elementId);
			if (fromElement.hidden || toElement.hidden) {
				return "var(--color-border-secondary)";
			}
			return "var(--color-border-default)";
		})
		.attr("stroke-dasharray", d => {
			const fromElement = this.getElement(d.from.elementId);

			const toElement = this.getElement(d.to.elementId);
			if (fromElement.hidden || toElement.hidden) {
				return "4 4";
			}
			return "0";
		});

	svg
		.selectAll("text.link-arrow")
		.data<FDagLink>(links)
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
		.attr("fill", d => {
			const fromElement = this.getElement(d.from.elementId);

			const toElement = this.getElement(d.to.elementId);
			if (fromElement.hidden || toElement.hidden) {
				return "var(--color-border-secondary)";
			}
			return "var(--color-border-default)";
		})

		.text("▶");
}
