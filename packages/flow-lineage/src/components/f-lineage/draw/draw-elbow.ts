/* eslint-disable @typescript-eslint/no-unused-vars */
import { FLineage } from "../f-lineage";
import {
	LevelLinkGap,
	Lineage,
	LineageDirection,
	LineageLinkElement,
	LineageNodeSize,
	LineageGapElement,
	LineageNodeElement
} from "../lineage-types";
import * as d3 from "d3";

export type DrawElbowParams = {
	d: LineageLinkElement;
	levelLinkGap: LevelLinkGap;
	nodeSize: LineageNodeSize;
	childrenNodeSize: LineageNodeSize;
	gap: number;
	direction: LineageDirection;
	lineage: Lineage;
	element: FLineage;
};
import curveStep from "./curve-steps";

type Point = { x: number; y: number };

export default function drawElbow({
	d,
	nodeSize,
	gap,
	element,
	childrenNodeSize,
	levelLinkGap,
	lineage
}: DrawElbowParams) {
	const curveAngle = 12;
	const link = getParentLinkForHiddenChild(d);
	// random delta for node used to pass link in gap
	const getLinkGap = (level: number, nodeid: string) => {
		const levelGaps = levelLinkGap[level];
		if (levelGaps && levelGaps.nodeLinkGap && levelGaps.nodeLinkGap[nodeid]) {
			return levelGaps.nodeLinkGap[nodeid];
		}
		if (!levelGaps) {
			levelLinkGap[level] = {
				linkgap: 0.3,
				nodeLinkGap: {}
			};
		}
		levelLinkGap[level].nodeLinkGap[nodeid] = levelLinkGap[level].linkgap;
		levelLinkGap[level].linkgap += 0.1;
		if (levelLinkGap[level].linkgap >= 0.7) {
			levelLinkGap[level].linkgap = 0.3;
		}
		return levelLinkGap[level].nodeLinkGap[nodeid];
	};

	// line plotting function on given points
	const line = d3
		.line()
		.x(p => (p as unknown as Point).x)
		.y(p => (p as unknown as Point).y)
		//@ts-expect-error @todo vikas to check
		.curve(curveStep.angle(curveAngle));

	// add point on node for connection
	let startPoint: Point = {
		x: link.source.x + (link.source.isChildren ? childrenNodeSize.width : nodeSize.width),
		y: link.source.y + (link.source.isChildren ? childrenNodeSize.height / 2 : nodeSize.height / 2)
	};
	const points: Point[] = [];

	points.push(startPoint);
	// checking if link is forward
	if (link.target.level > link.source.level) {
		for (let l = link.source.level; l < link.target.level; l++) {
			let gapDelta = gap * getLinkGap(link.source.level, link.source.id as string);

			if (link.target.level === l + 1 && link.target.level - link.source.level !== 1) {
				gapDelta = gap * getLinkGap(link.target.level, link.target.id as string);
			}

			let closestGapPoint: LineageGapElement;
			if (link.target.level === l + 1) {
				closestGapPoint = {
					x: link.target.x,
					y:
						link.target.y +
						(link.target.isChildren ? childrenNodeSize.height / 2 : nodeSize.height / 2)
				};
			} else {
				closestGapPoint = lineage.gaps[l + 1].reduce(
					(previous, current) => {
						if (previous.x === -1) {
							return current;
						}
						return Math.abs(current.y - startPoint.y) < Math.abs(previous.y - startPoint.y)
							? current
							: previous;
					},
					{ x: -1, y: -1 }
				);

				closestGapPoint = {
					x: closestGapPoint.x + nodeSize.width,
					y: closestGapPoint.y + gap / 2
				};
			}

			const secondPoint = {
				x: startPoint.x + gapDelta,
				y: startPoint.y
			};
			points.push(secondPoint);

			// check if curve is feasible
			const isCurveFeasible = Math.abs(closestGapPoint.y - startPoint.y) >= curveAngle;

			const thirdPoint = {
				x: startPoint.x + gapDelta,
				y: isCurveFeasible ? closestGapPoint.y : startPoint.y
			};

			points.push(thirdPoint);

			points.push(closestGapPoint);

			startPoint = { ...closestGapPoint };
		}
	} else if (link.target.level <= link.source.level) {
		// for backward connection
		for (let l = link.source.level; l >= link.target.level - 1; l--) {
			let gapDelta = gap * getLinkGap(link.source.level, link.source.id as string);

			if (link.target.level === l && link.target.level - link.source.level > 1) {
				gapDelta = gap * getLinkGap(link.target.level, link.target.id as string);
			}

			let closestGapPoint: LineageGapElement;
			if (link.target.level - 1 === l) {
				closestGapPoint = {
					x: link.target.x,
					y:
						link.target.y +
						(link.target.isChildren ? childrenNodeSize.height / 2 : nodeSize.height / 2)
				};
			} else {
				closestGapPoint = lineage.gaps[l].reduce(
					(previous, current) => {
						if (previous.x === -1) {
							return current;
						}
						return Math.abs(current.y - startPoint.y) < Math.abs(previous.y - startPoint.y)
							? current
							: previous;
					},
					{ x: -1, y: -1 }
				);

				closestGapPoint = {
					x: closestGapPoint.x - gapDelta,
					y: closestGapPoint.y + gap / 2
				};
			}

			const secondPoint = {
				x: startPoint.x - gapDelta * (link.source.level == l ? -1 : 1),
				y: startPoint.y
			};
			points.push(secondPoint);

			// check if curve is feasible
			const isCurveFeasible = Math.abs(closestGapPoint.y - startPoint.y) >= curveAngle;

			const thirdPoint = {
				x: startPoint.x - gapDelta * (link.source.level == l ? -1 : 1),
				y: isCurveFeasible ? closestGapPoint.y : startPoint.y
			};

			points.push(thirdPoint);

			points.push(closestGapPoint);

			startPoint = { ...closestGapPoint };
		}
	}

	if (element) {
		if (element.getDrawParams().svg.attr("transform") == null) {
			const leftX = element?.padding ?? 0;

			const leftMostPoint = points.find(p => {
				return p.x < leftX;
			});

			if (leftMostPoint) {
				d3.select(element.svg).attr(
					"viewBox",
					`${leftMostPoint.x - gap} 0 ${element.getWidth()} ${element.getHeight()}`
				);
			}
		}
	}
	const path = line(points as unknown as [number, number][]);
	return path;
}

export function getParentLinkForHiddenChild(d: LineageLinkElement) {
	const link = JSON.parse(JSON.stringify(d)) as LineageLinkElement;

	if (link.source.isChildren && !link.source.isVisible) {
		link.source.x = (link.source.parent as LineageNodeElement).x;
		link.source.y = (link.source.parent as LineageNodeElement).y;
		link.source.isChildren = false;
	}
	if (link.target.isChildren && !link.target.isVisible) {
		link.target.x = (link.target.parent as LineageNodeElement).x;
		link.target.y = (link.target.parent as LineageNodeElement).y;
		link.target.isChildren = false;
	}

	return link;
}

export function isDashedLink(d: LineageLinkElement) {
	const link = d;
	if (link.source.isChildren && !link.source.isVisible) {
		return true;
	}
	if (link.target.isChildren && !link.target.isVisible) {
		return true;
	}
	return false;
}

export function getHiddenChildLinkId(d: LineageLinkElement) {
	const link = JSON.parse(JSON.stringify(d)) as LineageLinkElement;

	if (link.source.isChildren && !link.source.isVisible) {
		link.source.id = (link.source.parent as LineageNodeElement).id;
	}
	if (link.target.isChildren && !link.target.isVisible) {
		link.target.id = (link.target.parent as LineageNodeElement).id;
	}

	return link.source.id + "->" + link.target.id;
}
