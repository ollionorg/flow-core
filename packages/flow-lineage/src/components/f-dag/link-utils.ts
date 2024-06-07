import * as d3 from "d3";
import type { FDag } from "./f-dag";
import { CoOrdinates, FDagLink, FDagLinkDirection } from "./types";
import curveStep from "./curve-steps";

export function startPlottingLine(this: FDag, event: MouseEvent) {
	event.stopPropagation();
	this.allGroupsAndNodes?.forEach(n => {
		n.style.pointerEvents = "none";
	});
	const circle = event.currentTarget as HTMLElement;
	const rect = circle.getBoundingClientRect();
	const dagRect = this.getBoundingClientRect();
	const svg = d3.select(this.svgElement.value!);
	const circleX = rect.left - dagRect.left - this.viewPortTranslate.x;
	const circleY = rect.top - dagRect.top - this.viewPortTranslate.y;

	let x1 = event.clientX - dagRect.left - this.viewPortTranslate.x;
	let y1 = event.clientY - dagRect.top - this.viewPortTranslate.y;

	if (Math.abs(x1 - circleX) <= 12) {
		let offset = 8;
		if (circle.classList.contains("right")) {
			offset = 0;
		}
		x1 = circleX + offset;
	}

	if (Math.abs(y1 - circleY) <= 12) {
		let offset = 8;
		if (circle.classList.contains("bottom")) {
			offset = 0;
		}
		y1 = circleY + offset;
	}

	const linkDirection =
		circle.classList.contains("right") || circle.classList.contains("left")
			? "horizontal"
			: "vertical";
	const link: FDagLink = {
		from: {
			x: x1,
			y: y1,
			elementId: circle.dataset.nodeId!
		},
		to: {
			x: event.clientX - dagRect.left - this.viewPortTranslate.x,
			y: event.clientY - dagRect.top - this.viewPortTranslate.y,
			elementId: ``
		},
		linkDirection
	};

	this.currentLine = svg
		.append("path")
		.datum(link)
		.attr("class", "dag-line")
		.attr("id", `${circle.dataset.nodeId}->`)
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

			return this.generatePath(points, d.linkDirection);
		})
		.attr("stroke", "var(--color-primary-default)");

	this.currentArrow = svg
		.append("text")
		.datum(link)
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

		.attr("xlink:href", function (_d) {
			return `#${circle.dataset.nodeId}->`;
		})
		.attr("startOffset", "100%")
		.attr("fill", "var(--color-primary-default)")
		.text("▶");
}
export function updateLinePath(this: FDag, event: MouseEvent) {
	if (event.buttons === 1 && this.currentLine) {
		const dagRect = this.getBoundingClientRect();
		this.currentLine.attr("d", d => {
			d.to.x = event.clientX - dagRect.left - this.viewPortTranslate.x;
			d.to.y = event.clientY - dagRect.top - this.viewPortTranslate.y;

			const points: CoOrdinates[] = [];
			points.push({
				x: d.from.x,
				y: d.from.y
			});
			points.push({
				x: d.to.x,
				y: d.to.y
			});

			return this.generatePath(points, d.linkDirection);
		});
	} else {
		this.allGroupsAndNodes?.forEach(n => {
			n.style.pointerEvents = "all";
		});
		this.currentLine?.remove();
		this.currentLine = undefined;
		this.currentArrow?.remove();
		this.currentArrow = undefined;

		if (event.buttons === 1) {
			this.viewPortTranslate.x += event.movementX;
			this.viewPortTranslate.y += event.movementY;
			this.backgroundPattern.setAttribute(
				"patternTransform",
				`translate(${this.viewPortTranslate.x * this.scale},${
					this.viewPortTranslate.y * this.scale
				})`
			);
			this.dagViewPort.style.transform = `scale(${this.scale}) translate(${this.viewPortTranslate.x}px,${this.viewPortTranslate.y}px)`;
		}
	}
}
export function dropLine(this: FDag, event: MouseEvent) {
	const circle = event.currentTarget as HTMLElement;
	const rect = circle.getBoundingClientRect();
	const dagRect = this.getBoundingClientRect();
	this.allGroupsAndNodes?.forEach(n => {
		n.style.pointerEvents = "all";
	});
	if (this.currentLine) {
		const linkElement = this.currentLine;
		const fromNodeId = linkElement.attr("id").replace(/(->)$/, "");
		const toNodeId = circle.dataset.nodeId!;

		let x2 = event.clientX - dagRect.left - this.viewPortTranslate.x;
		let y2 = event.clientY - dagRect.top - this.viewPortTranslate.y;

		const circleX2 = rect.left - dagRect.left - this.viewPortTranslate.x;
		const circleY2 = rect.top - dagRect.top - this.viewPortTranslate.y;

		if (Math.abs(y2 - circleY2) <= 12) {
			let offset = 8;
			if (circle.classList.contains("bottom")) {
				offset = 0;
			}
			y2 = circleY2 + offset;
		}
		if (Math.abs(x2 - circleX2) <= 12) {
			let offset = 8;
			if (circle.classList.contains("right")) {
				offset = 0;
			}
			x2 = circleX2 + offset;
		}

		this.currentLine
			.attr("id", function () {
				return linkElement.attr("id") + circle.dataset.nodeId;
			})
			.attr("d", d => {
				d.to.x = x2;
				d.to.y = y2;
				d.to.elementId = circle.dataset.nodeId!;
				const points: CoOrdinates[] = [];
				points.push({
					x: d.from.x,
					y: d.from.y
				});
				points.push({
					x: d.to.x,
					y: d.to.y
				});

				return this.generatePath(points, d.linkDirection);
			})
			.attr("stroke", "var(--color-border-default)");
		if (this.currentArrow) {
			this.currentArrow
				.attr("xlink:href", function (_d) {
					return `#${linkElement.attr("id")}`;
				})
				.attr("fill", "var(--color-border-default)");
		}

		this.updateLink(
			fromNodeId,
			toNodeId,
			linkElement.datum().from.x,
			linkElement.datum().from.y,
			linkElement.datum().to.x,
			linkElement.datum().to.y,
			linkElement.datum().linkDirection
		);

		this.currentLine = undefined;
		this.currentArrow = undefined;
	}
}

export function updateLink(
	this: FDag,
	fromNodeId: string,
	toNodeId: string,
	x1: number = 0,
	y1: number = 0,
	x2: number = 0,
	y2: number = 0,
	linkDirection: FDagLinkDirection = "horizontal"
) {
	let linkObject = this.config.links.find(
		l => l.from.elementId === fromNodeId && l.to.elementId === toNodeId
	);

	if (!linkObject) {
		linkObject = {
			from: {
				elementId: fromNodeId,
				x: x1,
				y: y1
			},
			to: {
				elementId: toNodeId,
				x: x2,
				y: y2
			},
			linkDirection
		};

		this.config.links.push(linkObject);
	} else {
		linkObject.from = {
			elementId: fromNodeId,
			x: x1,
			y: y1
		};
		linkObject.to = {
			elementId: toNodeId,
			x: x2,
			y: y2
		};
	}
}

export function generatePath(
	this: FDag,
	points: CoOrdinates[],
	linkDirection: FDagLinkDirection = "horizontal"
) {
	const { x: sx, y: sy } = points[0];
	const { x: dx, y: dy } = points[1];

	if (
		linkDirection === "vertical" &&
		sx !== undefined &&
		sy !== undefined &&
		dx !== undefined &&
		dy !== undefined
	) {
		const points = [
			{
				x: sx,
				y: sy
			},
			{
				x: sx,
				y: (sy + dy) / 2
			},
			{
				x: dx,
				y: (sy + dy) / 2
			},
			{
				x: dx,
				y: dy
			}
		];
		const angle = Math.abs(dx - sx) >= 24 ? 12 : Math.abs(dx - sx) / 2;
		if (sy > dy) {
			const rVLine = d3
				.line<CoOrdinates>()
				.x(p => p.x!)
				.y(p => p.y!)
				//@ts-expect-error @todo vikas to check
				.curve(curveStep.angle(angle, "vertical-reverse"));
			return rVLine(points)!;
		}
		const vLine = d3
			.line<CoOrdinates>()
			.x(p => p.x!)
			.y(p => p.y!)
			//@ts-expect-error @todo vikas to check
			.curve(curveStep.angle(angle, "vertical"));
		return vLine(points)!;
	} else if (sx !== undefined && sy !== undefined && dx !== undefined && dy !== undefined) {
		const points = [
			{
				x: sx,
				y: sy
			},
			{
				x: (sx + dx) / 2,
				y: sy
			},
			{
				x: (sx + dx) / 2,
				y: dy
			},
			{
				x: dx,
				y: dy
			}
		];
		const angle = Math.abs(dy - sy) >= 24 ? 12 : Math.abs(dy - sy) / 2;

		if (sx > dx) {
			const rHLine = d3
				.line<CoOrdinates>()
				.x(p => p.x!)
				.y(p => p.y!)
				//@ts-expect-error @todo vikas to check
				.curve(curveStep.angle(angle, "horizontal-reverse"));
			return rHLine(points)!;
		}
		const hLine = d3
			.line<CoOrdinates>()
			.x(p => p.x!)
			.y(p => p.y!)
			//@ts-expect-error @todo vikas to check
			.curve(curveStep.angle(angle, "horizontal"));
		return hLine(points)!;
	}
	return ``;
}
