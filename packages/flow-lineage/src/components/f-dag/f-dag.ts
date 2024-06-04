/* eslint-disable @typescript-eslint/ban-ts-comment */
import { flowElement, FRoot } from "@ollion/flow-core";
import { injectCss } from "@ollion/flow-core-config";
import globalStyle from "./f-dag-global.scss?inline";
import { html, PropertyValueMap, unsafeCSS } from "lit";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import * as d3 from "d3";
import { property, queryAll } from "lit/decorators.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import curveStep from "./curve-steps";

injectCss("f-dag", globalStyle);
// Renders attribute names of parent element to textContent

export type CoOrdinates = {
	x: number;
	y: number;
};
export type FDagElement = {
	id: string;
	label: string;
	icon: string;
	height: string;
	width: string;
	group?: string;
} & CoOrdinates;

export type FDagLinkDirection = "horizontal" | "vertical";
export type FDagLink = {
	from: CoOrdinates & { elementId: string };
	to: CoOrdinates & { elementId: string };
	linkDirection: FDagLinkDirection;
};

export type FDagConfig = {
	nodes: FDagElement[];
	links: FDagLink[];
	groups: FDagElement[];
};

function getTranslateValues(element: HTMLElement) {
	const style = window.getComputedStyle(element);
	const matrix = new DOMMatrixReadOnly(style.transform);

	// Extract translateX and translateY values
	const translateX = matrix.m41;
	const translateY = matrix.m42;

	return { translateX, translateY };
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

	moveElement(nodeElement: HTMLElement, event: MouseEvent) {
		let translateX = nodeElement.dataset.lastTranslateX
			? +nodeElement.dataset.lastTranslateX
			: undefined;
		let translateY = nodeElement.dataset.lastTranslateY
			? +nodeElement.dataset.lastTranslateY
			: undefined;
		if (!translateX || !translateY) {
			const translate = getTranslateValues(nodeElement);
			translateX = translate.translateX;
			translateY = translate.translateY;
		}

		nodeElement.style.setProperty(
			"transform",
			`translate(${translateX + event.movementX}px, ${translateY + event.movementY}px)`
		);
		nodeElement.dataset.lastTranslateX = `${translateX + event.movementX}`;
		nodeElement.dataset.lastTranslateY = `${translateY + event.movementY}`;
		const fromLines = d3.selectAll<SVGPathElement, FDagLink>(
			`.dag-line[id^="${nodeElement.getAttribute("id")}->"]`
		);

		fromLines.datum(d => {
			return {
				...d,
				from: {
					x: (d.from.x += event.movementX),
					y: (d.from.y += event.movementY),
					elementId: d.from.elementId
				}
			};
		});

		fromLines.attr("d", d => {
			const points: CoOrdinates[] = [];
			points.push({
				x: d.from.x,
				y: d.from.y
			});
			points.push({
				x: d.to.x,
				y: d.to.y
			});

			return this.generatePath(points, d.linkDirection).toString();
		});

		const toLines = d3.selectAll<SVGPathElement, FDagLink>(
			`.dag-line[id$="->${nodeElement.getAttribute("id")}"]`
		);

		toLines.datum(d => {
			return {
				...d,
				to: {
					x: (d.to.x += event.movementX),
					y: (d.to.y += event.movementY),
					elementId: d.to.elementId
				}
			};
		});
		toLines.attr("d", d => {
			const points: CoOrdinates[] = [];

			points.push({
				x: d.from.x,
				y: d.from.y
			});
			points.push({
				x: d.to.x,
				y: d.to.y
			});

			return this.generatePath(points, d.linkDirection).toString();
		});
	}

	dragNestedGroups(groupElement: HTMLElement, event: MouseEvent) {
		if (groupElement.dataset.nodeType === "group") {
			const groupNodes = this.querySelectorAll<HTMLElement>(
				`[data-group="${groupElement.getAttribute("id")}"]`
			);
			groupNodes.forEach(gn => {
				this.moveElement(gn, event);
				this.dragNestedGroups(gn, event);
			});
		}
	}
	dragNode(event: MouseEvent) {
		event.stopPropagation();
		if (event.buttons === 1 && this.currentLine === undefined) {
			const nodeElement = event.currentTarget as HTMLElement;
			nodeElement.style.zIndex = `3`;
			if (nodeElement) {
				this.moveElement(nodeElement, event);
				this.dragNestedGroups(nodeElement, event);
			}
		}
	}

	startPlottingLine(event: MouseEvent) {
		event.stopPropagation();
		this.allGroupsAndNodes?.forEach(n => {
			n.style.pointerEvents = "none";
		});
		const circle = event.currentTarget as HTMLElement;
		const rect = circle.getBoundingClientRect();
		const dagRect = this.getBoundingClientRect();
		const svg = d3.select(this.svgElement.value!);
		const circleX = rect.left - dagRect.left;
		const circleY = rect.top - dagRect.top;

		let x1 = event.clientX - dagRect.left;
		let y1 = event.clientY - dagRect.top;

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
				x: event.clientX - dagRect.left,
				y: event.clientY - dagRect.top,
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

				return this.generatePath(points, d.linkDirection).toString();
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
	updateLinePath(event: MouseEvent) {
		if (event.buttons === 1 && this.currentLine) {
			const dagRect = this.getBoundingClientRect();
			this.currentLine.attr("d", d => {
				d.to.x = event.clientX - dagRect.left;
				d.to.y = event.clientY - dagRect.top;

				const points: CoOrdinates[] = [];
				points.push({
					x: d.from.x,
					y: d.from.y
				});
				points.push({
					x: d.to.x,
					y: d.to.y
				});

				return this.generatePath(points, d.linkDirection).toString();
			});
		} else {
			this.allGroupsAndNodes?.forEach(n => {
				n.style.pointerEvents = "all";
			});
			this.currentLine?.remove();
			this.currentLine = undefined;
			this.currentArrow?.remove();
			this.currentArrow = undefined;
		}
	}
	dropLine(event: MouseEvent) {
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

			let x2 = event.clientX - dagRect.left;
			let y2 = event.clientY - dagRect.top;

			const circleX2 = rect.left - dagRect.left;
			const circleY2 = rect.top - dagRect.top;

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

					return this.generatePath(points, d.linkDirection).toString();
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

	updateLink(
		fromNodeId: string,
		toNodeId: string,
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		linkDirection: FDagLinkDirection
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

	updateNodePosition(event: MouseEvent) {
		const nodeElement = event.currentTarget as HTMLElement;
		const {
			top: nodeTop,
			height: nodeHeight,
			left: nodeLeft,
			width: nodeWidth
		} = nodeElement.getBoundingClientRect();
		if (nodeElement.dataset.nodeType === "group") {
			nodeElement.style.zIndex = `1`;
		} else {
			nodeElement.style.zIndex = `2`;
		}

		const allGroupsAndNodes = this.querySelectorAll<HTMLElement>(`[data-node-type="group"]`);
		let insideGroup = false;
		for (let index = 0; index < allGroupsAndNodes.length; index++) {
			const group = allGroupsAndNodes.item(index);
			const { top, height, left, width } = group.getBoundingClientRect();
			if (
				nodeTop > top &&
				nodeLeft > left &&
				nodeTop + nodeHeight < top + height &&
				nodeLeft + nodeWidth < left + width
			) {
				insideGroup = true;
				nodeElement.dataset.group = group.getAttribute("id")!;
			}
		}

		if (!insideGroup) {
			delete nodeElement.dataset.group;
		}

		let elementConfig;
		if (nodeElement.dataset.nodeType === "group") {
			elementConfig = this.config.groups.find(n => n.id === nodeElement.getAttribute("id"));
		} else {
			elementConfig = this.config.nodes.find(n => n.id === nodeElement.getAttribute("id"));
		}

		if (elementConfig) {
			elementConfig.group = nodeElement.dataset.group;
			const { translateX, translateY } = getTranslateValues(nodeElement);
			elementConfig.x = translateX;
			elementConfig.y = translateY;
		}

		const fromLines = d3.selectAll<SVGPathElement, FDagLink>(
			`.dag-line[id^="${nodeElement.getAttribute("id")}->"]`
		);
		const toLines = d3.selectAll<SVGPathElement, FDagLink>(
			`.dag-line[id$="->${nodeElement.getAttribute("id")}"]`
		);

		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const that = this;
		fromLines.each(function (d) {
			that.updateLink(
				d.from.elementId,
				d.to.elementId,
				d.from.x,
				d.from.y,
				d.to.x,
				d.to.y,
				d.linkDirection
			);
		});

		toLines.each(function (d) {
			that.updateLink(
				d.from.elementId,
				d.to.elementId,
				d.from.x,
				d.from.y,
				d.to.x,
				d.to.y,
				d.linkDirection
			);
		});

		console.log(this.config);
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
					.height=${n.height}
					.width=${n.width}
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
					.height=${g.height}
					.width=${g.width}
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

				return this.generatePath(points, d.linkDirection).toString();
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

	generatePath(points: CoOrdinates[], linkDirection: FDagLinkDirection) {
		const { x: sx, y: sy } = points[0];
		const { x: dx, y: dy } = points[1];

		if (linkDirection === "vertical") {
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
					.x(p => p.x)
					.y(p => p.y)
					//@ts-expect-error @todo vikas to check
					.curve(curveStep.angle(angle, "vertical-reverse"));
				return rVLine(points)!;
			}
			const vLine = d3
				.line<CoOrdinates>()
				.x(p => p.x)
				.y(p => p.y)
				//@ts-expect-error @todo vikas to check
				.curve(curveStep.angle(angle, "vertical"));
			return vLine(points)!;
		} else {
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
					.x(p => p.x)
					.y(p => p.y)
					//@ts-expect-error @todo vikas to check
					.curve(curveStep.angle(angle, "horizontal-reverse"));
				return rHLine(points)!;
			}
			const hLine = d3
				.line<CoOrdinates>()
				.x(p => p.x)
				.y(p => p.y)
				//@ts-expect-error @todo vikas to check
				.curve(curveStep.angle(angle, "horizontal"));
			return hLine(points)!;
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
