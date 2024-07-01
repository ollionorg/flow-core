/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FButton, flowElement, FPopover, FRoot, FTabNode } from "@ollion/flow-core";
import { injectCss } from "@ollion/flow-core-config";
import globalStyle from "./f-dag-global.scss?inline";
import { html, PropertyValueMap, unsafeCSS } from "lit";
import * as d3 from "d3";
import { eventOptions, property, query, queryAll } from "lit/decorators.js";

import {
	dragNestedGroups,
	dragNode,
	getTranslateValues,
	moveElement,
	updateNodePosition
} from "./drag-nodes-and-groups";
import type {
	CustomPlacementByElement,
	CustomPlacementBySection,
	FDagConfig,
	FDagGroup,
	FDagLink,
	FDagNode,
	HierarchyNode
} from "./types";
import {
	dropLine,
	generatePath,
	startPlottingLine,
	updateLinePath,
	updateLink
} from "./connect-link";
import { Keyed } from "lit/directives/keyed.js";
import { DirectiveResult } from "lit/directive.js";
import computePlacement from "./compute-placement";
import {
	addGroupPopover,
	addSelectionToGroup,
	addToGroup,
	addToNewGroup,
	handleAddGroup,
	switchTab
} from "./add-group";
import getNodeGroupTemplate from "./get-node-group-template";
import drawLinks from "./draw-links";
import backgroundSVG from "./background-svg";
import getNodeGroupActions from "./node-group-actions";
import { linkTo } from "./link-to";

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

	/**
	 * Holds all groups and nodes
	 */
	@queryAll(`.dag-node`)
	allGroupsAndNodes?: HTMLElement[];

	/**
	 * Holds all nodes
	 */
	@queryAll(`.dag-node[data-node-type="node"]`)
	allNodes?: HTMLElement[];

	@queryAll(`.gr-selection-tabs`)
	groupSelectionTabs!: FTabNode[];

	/**
	 * Holds reference of view port and required elements
	 */
	@query(`.dag-view-port`)
	dagViewPort!: HTMLElement;
	@query(`#nodeActions`)
	nodeActions!: HTMLElement;
	@query(`.background-pattern`)
	backgroundPattern!: HTMLElement;
	@query(`#d-dag-links`)
	linksSVG!: SVGSVGElement;
	@query(`#add-group`)
	addGroupButton!: FButton;
	@query(`#add-group-popover`)
	addGroupPopoverRef!: FPopover;

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

	currentLine?: d3.Selection<SVGPathElement, FDagLink, null, undefined>;
	currentArrow?: d3.Selection<SVGTextPathElement, FDagLink, null, undefined>;

	collapsedNodeWidth = 100;
	collapsedNodeHeight = 34;

	groupsHTML: DirectiveResult<typeof Keyed>[] = [];
	nodesHTML: DirectiveResult<typeof Keyed>[] = [];

	currentClickedNode?: {
		element: HTMLElement;
		node: FDagNode | FDagGroup;
	};

	selectedNodes: (FDagNode | FDagGroup)[] = [];

	/**
	 * Node utils
	 */
	moveElement = moveElement;
	dragNestedGroups = dragNestedGroups;
	dragNode = dragNode;
	updateNodePosition = updateNodePosition;
	computePlacement = computePlacement;
	getNodeGroupActions = getNodeGroupActions;

	/**
	 * Add Group utils
	 */
	addGroupPopover = addGroupPopover;
	handleAddGroup = handleAddGroup;
	addToNewGroup = addToNewGroup;
	addSelectionToGroup = addSelectionToGroup;
	addToGroup = addToGroup;
	switchTab = switchTab;
	getNodeGroupTemplate = getNodeGroupTemplate;

	/**
	 * Link utils
	 */

	startPlottingLine = startPlottingLine;
	updateLinePath = updateLinePath;
	dropLine = dropLine;
	updateLink = updateLink;
	generatePath = generatePath;
	drawLinks = drawLinks;
	linkTo = linkTo;

	getElement(id: string): FDagNode | FDagGroup {
		return [...this.config.nodes, ...this.config.groups].find(n => n.id === id)!;
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

	deleteNode(id: string) {
		const nodeIndex = this.config.nodes.findIndex(e => e.id === id);
		if (nodeIndex > -1) {
			this.config.nodes.splice(nodeIndex, 1);
		}

		this.config.links = this.config.links.filter(
			l => !(l.from.elementId === id || l.to.elementId === id)
		);
	}

	deleteGroup(id: string) {
		this.config.groups
			.filter(g => g.group === id)
			.forEach(g => {
				this.deleteGroup(g.id);
			});
		this.config.nodes
			.filter(n => n.group === id)
			.forEach(n => {
				this.deleteNode(n.id);
			});
		const groupIndex = this.config.groups.findIndex(e => e.id === id);
		if (groupIndex > -1) {
			this.config.groups.splice(groupIndex, 1);
		}

		this.config.links = this.config.links.filter(
			l => !(l.from.elementId === id || l.to.elementId === id)
		);
	}

	unGroup() {
		const id = this.currentClickedNode!.node.id;
		this.config.groups
			.filter(g => g.group === id)
			.forEach(g => {
				g.group = undefined;
			});
		this.config.nodes
			.filter(n => n.group === id)
			.forEach(n => {
				n.group = undefined;
			});
		const groupIndex = this.config.groups.findIndex(e => e.id === id);
		if (groupIndex > -1) {
			this.config.groups.splice(groupIndex, 1);
		}

		this.config.links = this.config.links.filter(
			l => !(l.from.elementId === id || l.to.elementId === id)
		);
		this.requestUpdate();
	}
	deleteElement() {
		const nodeType = this.currentClickedNode?.element.dataset.nodeType;
		if (nodeType === "node") {
			this.deleteNode(this.currentClickedNode!.node.id);
		}
		if (nodeType === "group") {
			this.deleteGroup(this.currentClickedNode!.node.id);
		}

		this.requestUpdate();
	}

	protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.willUpdate(changedProperties);
		this.computePlacement();
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

	getAllSubElements(g: FDagGroup): FDagGroup[] {
		const subGroups = this.config.groups.filter(gr => gr.group === g.id);
		const childNodes = this.config.nodes.filter(gr => gr.group === g.id);
		const nestedSubGroups = subGroups.map<FDagGroup[]>(sg => this.getAllSubElements(sg));

		return [...subGroups, ...childNodes, ...nestedSubGroups.flat()];
	}

	toggleGroup(g: FDagGroup) {
		g.collapsed = !g.collapsed;
		g.width = undefined;
		g.height = undefined;

		const subElements = this.getAllSubElements(g);

		subElements.forEach(e => {
			e.x = undefined;
			e.y = undefined;
		});

		this.config.links.forEach(l => {
			l.from.x = undefined;
			l.from.y = undefined;
			l.to.x = undefined;
			l.to.y = undefined;
		});
		this.requestUpdate();
	}

	handleNodeClick(event: PointerEvent) {
		event.preventDefault();
		event.stopPropagation();

		const nodeElement = event.currentTarget as HTMLElement;
		const { translateX, translateY } = getTranslateValues(nodeElement);

		const nodeObject = this.getElement(nodeElement.getAttribute("id")!);

		this.currentClickedNode = {
			node: nodeObject,
			element: nodeElement
		};

		this.nodeActions.style.top = `${translateY - 26}px`;
		this.nodeActions.style.left = `${translateX}px`;
		this.nodeActions.style.display = "flex";

		if (nodeElement.dataset.nodeType === "node") {
			this.nodeActions.querySelector<HTMLElement>("#ungroup-action")!.style.display = "none";
		} else {
			this.nodeActions.querySelector<HTMLElement>("#ungroup-action")!.style.display = "flex";
		}
	}

	selectNode(event: PointerEvent) {
		event.stopPropagation();

		if (this.currentClickedNode) {
			const nodeElement = this.currentClickedNode.element;
			nodeElement.classList.add("selected");
			this.nodeActions.style.display = "none";

			this.selectedNodes.push(this.currentClickedNode.node);
			this.addGroupButton.style.display = "flex";
		}
	}

	handleViewPortClick() {
		this.nodeActions.style.display = "none";
	}

	openLinkTo() {
		const linkToPopOver = this.querySelector<FPopover>(`#link-to-popover`)!;
		linkToPopOver.target = this.currentClickedNode!.element;
		linkToPopOver.open = true;
	}

	render() {
		return html`<f-div
			class="d-dag-root"
			width="100%"
			height="100%"
			@wheel=${this.handleZoom}
			@mousemove=${this.dragLine}
			@click=${this.handleViewPortClick}
		>
			<f-button
				id="add-group"
				class="f-add-group"
				label="Add To Group"
				size="small"
				category="outline"
				@click=${this.handleAddGroup}
				style="position:absolute;right:0px;display:none"
			></f-button>
			${this.addGroupPopover()} ${this.linkTo()}${backgroundSVG()}
			<f-div class="dag-view-port">
				${this.groupsHTML.reverse()}${this.nodesHTML.reverse()}
				<svg class="main-svg" id="d-dag-links"></svg>
				${this.getNodeGroupActions()}
			</f-div>
		</f-div> `;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		this.drawLinks();

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
