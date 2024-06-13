/* eslint-disable @typescript-eslint/ban-ts-comment */
import { flowElement, FRoot } from "@ollion/flow-core";
import { injectCss } from "@ollion/flow-core-config";
import globalStyle from "./f-dag-global.scss?inline";
import { html, PropertyValueMap, unsafeCSS } from "lit";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import * as d3 from "d3";
import { eventOptions, property, query, queryAll } from "lit/decorators.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { dragNestedGroups, dragNode, moveElement, updateNodePosition } from "./node-utils";
import type {
	CoOrdinates,
	CustomPlacementByElement,
	CustomPlacementBySection,
	FDagConfig,
	FDagElement,
	FDagLink,
	HierarchyNode
} from "./types";
import {
	dropLine,
	generatePath,
	startPlottingLine,
	updateLinePath,
	updateLink
} from "./link-utils";
import buildHierarchy from "./hierarchy-builder";

injectCss("f-dag", globalStyle);

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

	@query(`.dag-view-port`)
	dagViewPort!: HTMLElement;
	@query(`.background-pattern`)
	backgroundPattern!: HTMLElement;

	viewPortRect!: DOMRect;

	createRenderRoot() {
		return this;
	}
	scale = 1;
	viewPortTranslate = {
		x: 0,
		y: 0
	};

	get defaultElementWidth(): number {
		return this.config.defaultNodeSize?.width ?? 50;
	}
	get defaultElementHeight(): number {
		return this.config.defaultNodeSize?.height ?? 50;
	}

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

	getCustomPlacementElements(section: number, customPlacements: Map<string, HierarchyNode>) {
		const nodes = this.config.nodes
			.filter(n => n.placement && (n.placement as CustomPlacementBySection).section === section)
			.map(n => customPlacements.get(n.id));
		const groups = this.config.groups
			.filter(n => n.placement && (n.placement as CustomPlacementBySection).section === section)
			.map(n => customPlacements.get(n.id));

		return [...nodes, ...groups];
	}

	getCustomPlacementElementsByElementId(
		elementId: string,
		customPlacements: Map<string, HierarchyNode>
	) {
		const nodes = this.config.nodes
			.filter(n => n.placement && (n.placement as CustomPlacementByElement).elementId === elementId)
			.map(n => customPlacements.get(n.id));
		const groups = this.config.groups
			.filter(n => n.placement && (n.placement as CustomPlacementByElement).elementId === elementId)
			.map(n => customPlacements.get(n.id));

		return [...nodes, ...groups];
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);

		const { roots: rootNodes, customPlacements } = buildHierarchy(this.config);

		const positionNodes = (
			containerId: string,
			elements: HierarchyNode[],
			x: number,
			y: number,
			spaceX = 100,
			spaceY = 100
		) => {
			const elementIds = elements.map(e => e.id);
			const conatinerElementObject = this.getElement(containerId) as FDagElement;
			const layoutDirection = (() => {
				if (containerId === "root") {
					return this.config.layoutDirection;
				}
				if (conatinerElementObject.layoutDirection === "vertical") {
					return "horizontal";
				}
				return "vertical";
			})();
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
			let section = 0;
			const calculateCords = (ns: HierarchyNode[]) => {
				const nexts: HierarchyNode[] = [];
				let maxWidth = this.defaultElementWidth;
				let maxHeight = this.defaultElementHeight;
				section += 1;
				const nextSection = () => {
					if (layoutDirection === "vertical") {
						y += maxHeight + spaceY;
						x = initialX;
					} else {
						x += maxWidth + spaceX;
						y = initialY;
					}
				};

				let currentNodeId: string | null;
				const isElementPlacement = (elementObject: FDagElement) =>
					elementObject.placement &&
					(elementObject.placement as CustomPlacementByElement).elementId === currentNodeId;
				const isSectionPlacement = (elementObject: FDagElement) =>
					elementObject.placement &&
					(elementObject.placement as CustomPlacementBySection).section === section &&
					containerId === "root";
				const placeElement = (n: HierarchyNode) => {
					const elementObject = this.getElement(n.id);
					if (
						!elementObject.placement ||
						isSectionPlacement(elementObject) ||
						isElementPlacement(elementObject)
					) {
						if (elementObject.x === undefined && elementObject.y === undefined) {
							const customPlacementsByElements = this.getCustomPlacementElementsByElementId(
								elementObject.id,
								customPlacements
							);
							if (customPlacementsByElements.length > 0) {
								currentNodeId = elementObject.id;
							}
							const beforeCustomElements = customPlacementsByElements.filter(
								c => c?.placement?.position === "before"
							);
							const afterCustomElements = customPlacementsByElements.filter(
								c => c?.placement?.position === "after"
							);
							beforeCustomElements.forEach(b => {
								if (b) placeElement(b);
							});
							elementObject.x = x;
							elementObject.y = y;

							if (n.type === "group" && n.children && n.children.length > 0) {
								const { width, height } = positionNodes(
									n.id,
									n.children,
									x + 20,
									y + 60,
									elementObject.spacing?.x,
									elementObject.spacing?.y
								);

								elementObject.width = width;
								elementObject.height = height + 20;
							} else {
								if (!elementObject.width) {
									elementObject.width = this.defaultElementWidth;
								}
								if (!elementObject.height) {
									elementObject.height = this.defaultElementHeight;
								}
							}
							if (x + elementObject.width > maxX) {
								maxX = x + elementObject.width;
							}
							if (y + elementObject.height > maxY) {
								maxY = y + elementObject.height;
							}

							if (layoutDirection === "vertical") {
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
							afterCustomElements.forEach(b => {
								if (b) placeElement(b);
							});
							currentNodeId = null;
							if (n.next) nexts.push(...n.next);
						}
					}
				};
				const customPlacementsElements =
					containerId === "root" ? this.getCustomPlacementElements(section, customPlacements) : [];

				const beforeElements =
					containerId === "root"
						? customPlacementsElements.filter(c => c?.placement?.position === "before")
						: [];
				const afterElements =
					containerId === "root"
						? customPlacementsElements.filter(c => c?.placement?.position === "after")
						: [];
				beforeElements.forEach(b => {
					if (b) placeElement(b);
				});

				if (beforeElements.length > 0) {
					nextSection();
					maxHeight = this.defaultElementHeight;
					maxWidth = this.defaultElementWidth;
				}

				const skipTheseElements = [...beforeElements, ...afterElements].map(ba => ba?.id);
				ns.filter(n => !skipTheseElements.includes(n.id)).forEach(placeElement);

				if (afterElements.length > 0) {
					nextSection();
					maxHeight = this.defaultElementHeight;
					maxWidth = this.defaultElementWidth;
				}
				afterElements.forEach(b => {
					if (b) placeElement(b);
				});
				nextSection();

				if (nexts.length > 0) calculateCords(nexts);
			};
			calculateCords(Array.from(roots));

			return {
				width: maxX - minX + 40,
				height: maxY - minY + 60
			};
		};

		positionNodes("root", rootNodes, 0, 0, this.config.spacing?.x, this.config.spacing?.y);
	}
	handleZoom(event: WheelEvent) {
		// const chartContainer = event.currentTarget as HTMLElement;
		this.scale += event.deltaY * -0.01;

		// Restrict scale
		this.scale = Math.min(Math.max(0.4, this.scale), 4);

		// Apply scale transform

		this.dagViewPort.style.transform = `scale(${this.scale}) translate(${this.viewPortTranslate.x}px,${this.viewPortTranslate.y}px)`;
		this.backgroundPattern.setAttribute("width", `${24 * this.scale}`);
		this.backgroundPattern.setAttribute("height", `${24 * this.scale}`);
	}

	@eventOptions({ capture: true })
	dragLine(event: MouseEvent) {
		this.updateLinePath(event);
	}

	render() {
		return html`<f-div
			class="d-dag-root"
			width="100%"
			height="100%"
			@wheel=${this.handleZoom}
			@mousemove=${this.dragLine}
		>
			<svg
				class="background-svg"
				style="position: absolute;width: 100%;height: 100%;top: 0px;left: 0px;"
			>
				<pattern
					class="background-pattern"
					id="pattern-1undefined"
					x="0"
					y="0"
					width="24"
					height="24"
					patternUnits="userSpaceOnUse"
					patternTransform="translate(-0.5,-0.5)"
				>
					<circle cx="0.5" cy="0.5" r="1" fill="var(--color-border-subtle)"></circle>
				</pattern>
				<rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-1undefined)"></rect>
			</svg>
			<f-div class="dag-view-port">
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
						.height=${((g as FDagElement).height ?? this.defaultElementHeight) + "px"}
						.width=${((g as FDagElement).width ?? this.defaultElementWidth) + "px"}
						data-group=${ifDefined(g.group)}
						class="dag-node"
						data-node-type="group"
						border="small solid subtle around"
						.id=${g.id}
						style="z-index:1;transform:translate(${g.x}px, ${g.y}px)"
						@mousemove=${this.dragNode}
						@mouseup=${this.updateNodePosition}
					>
						<f-div
							gap="medium"
							class="group-header"
							height="hug-content"
							clickable
							state="secondary"
							padding="medium"
						>
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
			</f-div>
		</f-div> `;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		function randomIntFromInterval(min: number, max: number) {
			// min and max included
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

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
						d.direction = "horizontal";
						if (d.to.x! > d.from.x!) {
							d.from.x! += fromElement.width!;
							d.from.y! += randomIntFromInterval(
								fromElement.height! / 3,
								fromElement.height! * (2 / 3)
							);
							d.to.y! += randomIntFromInterval(toElement.height! / 3, toElement.height! * (2 / 3));
						} else {
							d.from.y! += randomIntFromInterval(
								fromElement.height! / 3,
								fromElement.height! * (2 / 3)
							);
							d.to.x! += fromElement.width!;
							d.to.y! += randomIntFromInterval(toElement.height! / 3, toElement.height! * (2 / 3));
						}
					} else {
						d.direction = "vertical";
						if (d.to.y! > d.from.y!) {
							d.from.x! += randomIntFromInterval(
								fromElement.width! / 3,
								fromElement.width! * (2 / 3)
							);
							d.from.y! += fromElement.height!;
							d.to.x! += randomIntFromInterval(toElement.width! / 3, toElement.width! * (2 / 3));
						} else {
							d.from.x! += randomIntFromInterval(
								fromElement.width! / 3,
								fromElement.width! * (2 / 3)
							);
							d.to.x! += randomIntFromInterval(toElement.width! / 3, toElement.width! * (2 / 3));
							d.to.y! += toElement.height!;
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

				return this.generatePath(points, d.direction)!.toString();
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
		void this.updateComplete.then(() => {
			this.viewPortRect = this.dagViewPort.getBoundingClientRect();
		});

		this.onmousemove = (event: MouseEvent) => {
			if (event.buttons === 1) {
				this.viewPortTranslate.x += event.movementX * (1 / this.scale);
				this.viewPortTranslate.y += event.movementY * (1 / this.scale);
				this.backgroundPattern.setAttribute(
					"patternTransform",
					`translate(${this.viewPortTranslate.x * this.scale},${
						this.viewPortTranslate.y * this.scale
					})`
				);
				this.dagViewPort.style.transform = `scale(${this.scale}) translate(${this.viewPortTranslate.x}px,${this.viewPortTranslate.y}px)`;
			}
		};
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
