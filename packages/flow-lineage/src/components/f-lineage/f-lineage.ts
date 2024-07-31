import { html, PropertyValues, render, unsafeCSS } from "lit";
import { customElement, property, query, queryAssignedElements } from "lit/decorators.js";
import eleStyle from "./f-lineage.scss?inline";
import globalStyle from "./f-lineage-global.scss?inline";
import * as d3 from "d3";
import createLineage from "./create/create-lineage";
import {
	DrawLineageParams,
	LineageData,
	LineageDirection,
	LineageNodeElement,
	LineageNodeLinks,
	LineageNodes,
	LineageNodeSize,
	LineageNodeTemplate
} from "./lineage-types";
import { unsafeSVG } from "lit-html/directives/unsafe-svg.js";
import drawLineage from "./draw/draw-lineage";
import lowlightPath from "./highlight/lowlight-path";
import createHierarchy from "./create/create-hierarchy";
import { FButton, FDiv, FIcon, FIconButton, FPopover, FText } from "@nonfx/flow-core";
import { FRoot } from "@nonfx/flow-core";
import { debounce } from "../../utils";
import getProxies from "./draw/hot-reload-proxies";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import { injectCss } from "@nonfx/flow-core-config";

injectCss("f-lineage", globalStyle);
// Renders attribute names of parent element to textContent

@customElement("f-lineage")
export class FLineage extends FRoot {
	/**
	 * css loaded from scss file
	 */
	static styles = [
		unsafeCSS(eleStyle),
		unsafeCSS(globalStyle),
		...FDiv.styles,
		...FText.styles,
		...FIconButton.styles,
		...FIcon.styles
	];

	@query("svg")
	svg!: SVGSVGElement;

	@property({ reflect: true, type: String })
	direction?: LineageDirection = "horizontal";

	@property({ reflect: true, type: String })
	background?: string = "var(--color-surface-default)";

	@property({ type: Object })
	nodes!: LineageNodes;

	@property({ type: Array })
	links!: LineageNodeLinks;

	@property({ reflect: true, type: Number })
	padding?: number = 16;

	@property({ reflect: true, type: Number })
	gap?: number = 100;

	@property({
		reflect: true,
		type: Object
	})
	["node-size"]?: LineageNodeSize;

	/**
	 * Workaround for vue 2 for property name with hyphen
	 */
	set nodeSize(value: LineageNodeSize | undefined) {
		this["node-size"] = value;
	}

	@property({
		reflect: true,
		type: String
	})
	["center-node"]?: string;

	/**
	 * Workaround for vue 2 for property name with hyphen
	 */
	set centerNode(value: string | undefined) {
		this["center-node"] = value;
	}

	@property({
		reflect: true,
		type: Number
	})
	["stagger-load"] = 10;

	/**
	 * Workaround for vue 2 for property name with hyphen
	 */
	set stagerLoad(value: number) {
		this["stagger-load"] = value;
	}

	@property({
		reflect: true,
		type: Object
	})
	["children-node-size"]?: LineageNodeSize;
	/**
	 * Workaround for vue 2 for property name with hyphen
	 */
	set childrenNodeSize(value: LineageNodeSize | undefined) {
		this["children-node-size"] = value;
	}

	@property({
		reflect: true,
		type: Number
	})
	["max-children"]?: number;
	/**
	 * Workaround for vue 2 for property name with hyphen
	 */
	set maxChildren(value: number | undefined) {
		this["max-children"] = value;
	}

	@property({
		reflect: false,
		type: String
	})
	["node-template"]?: LineageNodeTemplate;
	/**
	 * Workaround for vue 2 for property name with hyphen
	 */
	set nodeTemplate(value: LineageNodeTemplate | undefined) {
		this["node-template"] = value;
	}

	@property({
		reflect: false,
		type: String
	})
	["children-node-template"]?: LineageNodeTemplate;
	/**
	 * Workaround for vue 2 for property name with hyphen
	 */
	set childrenNodeTemplate(value: LineageNodeTemplate | undefined) {
		this["children-node-template"] = value;
	}

	@query("#page-number")
	pageNumberElement!: FButton;

	@query("#progress")
	progressElement!: FDiv;

	@queryAssignedElements({ slot: "node-meta" })
	_metaNodes!: NodeListOf<HTMLElement>;

	_hasMetaNodes = false;

	/**
	 * holds maximum available level count
	 */
	maxAvailableLevels = 0;

	centerNodeElement?: LineageNodeElement;

	biDirectionalLinks: string[] = [];

	private data!: LineageData;

	foreignObjects!: d3.Selection<SVGForeignObjectElement, LineageNodeElement, SVGGElement, unknown>;

	/**
	 * holds which levels to display
	 */
	levelsToPlot: number[] = [];

	/**
	 * page to levels map
	 */
	pageToLevels: Record<number, number[]> = {};

	private lineageDrawParams!: DrawLineageParams;

	page = 1;

	timeout!: ReturnType<typeof setTimeout>;
	renderCount = 0;
	currentTransform = null;

	popoverRef: Ref<FPopover> = createRef();

	/**
	 * To debounce requestUpdate
	 */
	debounceUpdate = debounce(() => this.requestUpdate());
	/**
	 * For obeserving size changes
	 */
	resizeObserver?: ResizeObserver;
	/**
	 * To avoid first resize observer call when connected to DOM
	 */
	activateResizeObserver = false;

	applyBackground() {
		this.style.backgroundColor = this.background as string;
		this.svg.style.backgroundColor = this.background as string;
	}

	getNumbersFromRange(min: number, max: number) {
		return Array.from({ length: max - min + 1 }, (_, i) => i + min);
	}

	getDrawParams() {
		return this.lineageDrawParams;
	}

	increaseDegree() {
		const minLevel = Math.min(...this.levelsToPlot);
		const maxLevel = Math.max(...this.levelsToPlot);

		if (this.maxAvailableLevels > maxLevel) {
			this.levelsToPlot = [
				...this.getNumbersFromRange(minLevel - this["stagger-load"], minLevel - 1),
				...this.getNumbersFromRange(maxLevel + 1, maxLevel + this["stagger-load"])
			];

			this.page += 1;
			this.pageToLevels[this.page] = this.levelsToPlot;
			this.pageNumberElement.innerText = `${((maxLevel * 100) / this.maxAvailableLevels).toFixed(
				0
			)}%`;
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			drawLineage({
				...this.lineageDrawParams,
				levelsToPlot: this.levelsToPlot,
				page: this.page
			})
				.then(() => {
					this.timeout = setTimeout(() => {
						this.increaseDegree();
					});
				})
				.catch(error => {
					console.error(error);
				});
		} else {
			this.dispatchReadyEvent();
			this.pageNumberElement.innerText = `100%`;
			this.progressElement.style.display = "none";
		}
	}

	dispatchReadyEvent() {
		const ready = new CustomEvent("ready", {
			detail: { ...this.data },
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(ready);
	}
	decreaseDegree() {
		if (this.page > 1) {
			const pageToDelete = this.page;
			this.page -= 1;
			this.levelsToPlot = this.pageToLevels[this.page];
			this.pageNumberElement.label = `${this.page}`;
			this.shadowRoot?.querySelectorAll(`[data-page="${pageToDelete}"`).forEach(element => {
				element.remove();
			});
		}
	}

	reDrawChunk(page: number, _level: number) {
		this.shadowRoot?.querySelectorAll(`[data-page="${page}"`).forEach(element => {
			element.remove();
		});

		const levelsToPlot = this.pageToLevels[page];

		drawLineage({
			...this.lineageDrawParams,
			levelsToPlot,
			page,
			filter: link => {
				if (link.source.isChildren || link.target.isChildren) {
					return true;
				}
				if (
					link.source.level - link.target.level > 1 ||
					link.target.level - link.source.level > 1
				) {
					return true;
				}
				if (link.target.level <= link.source.level) {
					return true;
				}
				return levelsToPlot.includes(link.source.level) || levelsToPlot.includes(link.target.level);
			}
		}).catch(error => {
			console.error(error);
		});
	}

	_onPopoverSlotChange() {
		this._hasMetaNodes = this._metaNodes.length > 0;
	}

	render() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		this.renderCount += 1;
		return html`
			${unsafeSVG(`<svg xmlns="http://www.w3.org/2000/svg"></svg>`)}
			${this.renderCount % 2
				? html`<f-div
						align="middle-center"
						gap="x-small"
						padding="small"
						state="tertiary"
						variant="curved"
						width="80px"
						class="degree-selector even"
						id="progress"
				  >
						<f-icon source="i-tick" loading></f-icon>
						<f-text id="page-number">${this.page}%</f-text>
				  </f-div>`
				: html`<f-div
						align="middle-center"
						gap="x-small"
						padding="small"
						state="tertiary"
						variant="curved"
						width="80px"
						class="degree-selector odd"
						id="progress"
				  >
						<f-icon source="i-tick" loading></f-icon>
						<f-text id="page-number">${this.page}%</f-text>
				  </f-div>`}
			<f-popover ${ref(this.popoverRef)} ?open=${false}
				><f-div height="100%"
					><f-icon-button
						icon="i-close"
						size="small"
						variant="block"
						type="packed"
						state="inherit"
						class="f-lineage-popover-close"
					></f-icon-button
					><slot name="node-meta" @slotchange=${this._onPopoverSlotChange}></slot></f-div
			></f-popover>
			<f-tooltip placement="auto" id="lineage-tooltip">
				<f-text variant="para" size="small" id="lineage-tooltip-text"> </f-text>
			</f-tooltip>
		`;
	}
	connectedCallback() {
		super.connectedCallback();
		/**
		 * Creating ResizeObserver Instance
		 */
		this.resizeObserver = new ResizeObserver(() => {
			//avoid first call , since it is not required
			if (this.activateResizeObserver) {
				this.debounceUpdate(new CustomEvent("f-resize"));
			}
			this.activateResizeObserver = true;
		});

		this.resizeObserver.observe(this);
	}
	disconnectedCallback() {
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		/**
		 * disconnecting resize observer
		 */
		this.resizeObserver?.disconnect();
		super.disconnectedCallback();
	}
	/**
	 * get width based on what parent is used
	 */
	getWidth() {
		let width = 1000;
		if (this.parentElement && this.parentElement.tagName === "F-DIV") {
			if (this.parentElement.getAttribute("direction") === "row") {
				width = this.offsetWidth;
			} else {
				width = this.parentElement.offsetWidth;
			}
		} else if (this.parentElement) {
			width = this.parentElement.offsetWidth;
		}
		return width;
	}
	/**
	 *  get height based on what parent is used
	 */
	getHeight() {
		let height = 1000;
		if (this.parentElement && this.parentElement.tagName === "F-DIV") {
			height = this.offsetHeight;
			if (this.parentElement.getAttribute("direction") === "column") {
				height = this.offsetHeight;
			} else {
				height = this.parentElement.offsetHeight;
			}
		} else if (this.parentElement) {
			height = this.parentElement.offsetHeight;
		}
		return height;
	}
	protected updated(changedProperties: PropertyValues) {
		super.updated(changedProperties);
		// console.groupCollapsed("Lineage");
		// console.time("Total duration");
		this.applyBackground();
		/**
		 * cleaning up svg if it has any exisitng content
		 */

		const nodeSize = this["node-size"] || { width: 200, height: 52 };

		const childrenNodeSize = this["children-node-size"]
			? this["children-node-size"]
			: { width: 200, height: 32 };

		const padding = this.padding ?? 16;
		const gap = this.gap ?? 100;
		const direction = this.direction ?? "horizontal";
		const maxChildrens = this["max-children"] ?? 8;
		const maxChildrenHeight = maxChildrens * childrenNodeSize.height;

		this["node-template"] =
			this["node-template"] ??
			function (node) {
				return html`<f-div
					state="secondary"
					width="100%"
					height="100%"
					padding="none medium"
					align="middle-left"
					variant="curved"
					gap="small"
					${node.fChildren && !node.fHideChildren ? 'border="small solid default bottom"' : ""}
				>
					<f-text variant="code" size="large" ellipsis>${node.id}</f-text>
					${node.childrenToggle}
				</f-div>`;
			};
		this["children-node-template"] =
			this["children-node-template"] ??
			function (node) {
				return html`<f-div
					state="secondary"
					width="100%"
					height="100%"
					padding="none medium"
					align="middle-left"
					variant="curved"
					gap="small"
					border="small solid default bottom"
				>
					<f-text variant="code" size="large" ellipsis>${node.id}</f-text>
				</f-div>`;
			};
		this.svg.innerHTML = ``;
		this.page = 1;

		if (this.links) {
			/**
			 * Creates hierarchy based on nodes and links provided by user
			 */
			// eslint-disable-next-line @typescript-eslint/no-this-alias

			/**
			 * template data proxy for hot reload
			 */
			const templateDataProxy = getProxies(this);
			const { data, biDirectionalLinks } = createHierarchy(
				this.links,
				this.nodes,
				templateDataProxy
			);
			this.data = data;
			// holds birectional links
			this.biDirectionalLinks = biDirectionalLinks;
		}
		if (this.data && this.data.length > 0) {
			/**
			 * Lineage with nodes , links and gap parameters
			 */
			const lineage = createLineage({
				data: this.data,
				nodeSize,
				childrenNodeSize,
				padding,
				gap,
				direction,
				maxChildrenHeight,
				links: this.links,
				biDirectionalLinks: this.biDirectionalLinks
			});

			this.centerNodeElement = lineage.nodes.find(n => n.id === this.data[0].id);

			if (this["center-node"]) {
				this.centerNodeElement = lineage.nodes.find(n => n.id === this["center-node"]);
			}

			if (this.centerNodeElement) {
				this.levelsToPlot = [
					...this.getNumbersFromRange(
						this.centerNodeElement.level - this["stagger-load"],
						this.centerNodeElement.level
					),
					...this.getNumbersFromRange(
						this.centerNodeElement.level + 1,
						this.centerNodeElement.level + this["stagger-load"]
					)
				];

				this.pageToLevels[1] = this.levelsToPlot;
			} else {
				console.warn(`center-node ${this["center-node"]} not found!`);
			}

			this.maxAvailableLevels = lineage.nodes.reduce((preValue, currentNode) => {
				if (currentNode.level > preValue) {
					preValue = currentNode.level;
				}
				return preValue;
			}, 0);

			/**
			 * main svg element: setting height and width
			 */
			const svgElement = d3
				.select(this.svg)
				.attr("class", "lineage-svg")
				.attr("width", this.getWidth())
				.attr("height", this.getHeight());
			/**
			 * Inner `g` to hold chart to handel zoom in/ zoom out
			 */
			const lineageContainer = svgElement.append("g");

			/**
			 * Apply transform if it is exists.
			 */
			if (this.currentTransform) {
				lineageContainer.attr("transform", this.currentTransform);
			}

			this.lineageDrawParams = {
				lineage,
				svg: lineageContainer,
				nodeSize,
				childrenNodeSize,
				gap,
				direction,
				maxChildrenHeight,
				element: this,
				levelsToPlot: this.levelsToPlot,
				page: this.page,
				popoverRef: this.popoverRef
			};
			drawLineage(this.lineageDrawParams).catch(error => {
				console.error(error);
			});
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const handleZoom = (e: any) => {
				/**
				 * store transform and it is used to apply on update
				 */
				this.currentTransform = e.transform;
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				lineageContainer.attr("transform", e.transform);
				if (this.isSafari()) {
					const scale = e.transform.k;
					this.shadowRoot
						?.querySelectorAll("foreignObject")
						.forEach((obj: SVGForeignObjectElement) => {
							for (let i = 0; i < obj.children.length; i++) {
								const element = obj.children[i];
								(element as HTMLElement).style.transform = `scale(${scale}) `;
							}
						});
				}
			};
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			const zoom = d3.zoom().scaleExtent([0.3, 4]).on("zoom", handleZoom) as any;

			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			svgElement.call(zoom).on("dblclick.zoom", null);

			svgElement.on("click", (event: MouseEvent) => {
				event.stopPropagation();
				lowlightPath(this);
			});
			this.timeout = setTimeout(() => {
				this.increaseDegree();
			});
		} else {
			//this.pageNumberElement.innerText = `No data to display`;
			this.progressElement.setAttribute("width", "500px");
			this.progressElement.innerHTML = "No data to display";
		}
	}
	isSafari() {
		return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
	}

	doTemplateHotUpdate(
		node: LineageNodeElement,
		nodeSVGElement: HTMLElement | null,
		isChildNode = false
	): void {
		try {
			if (isChildNode) {
				if (node.fNodeTemplate && nodeSVGElement) {
					render(node.fNodeTemplate(node), nodeSVGElement);
				} else if (this["children-node-template"] && nodeSVGElement) {
					render(this["children-node-template"](node), nodeSVGElement);
				}
			} else {
				if (node.fChildren) {
					const iconDirection = node.fHideChildren ? "down" : "up";
					node.childrenToggle = html`<f-icon-button type="transparent" state="inherit" icon="i-chevron-${iconDirection}" class="children-toggle" size="x-small"></f-icon>`;
				} else {
					node.childrenToggle = html``;
				}
				if (node.fNodeTemplate && nodeSVGElement) {
					render(node.fNodeTemplate(node), nodeSVGElement);
				} else if (this["node-template"] && nodeSVGElement) {
					render(this["node-template"](node), nodeSVGElement);
				}
			}
		} catch (error: unknown) {
			console.error(`Error reading node ${node.id}.fData`, error);
			if (nodeSVGElement) {
				render(
					html`<f-div
						state="secondary"
						width="100%"
						height="100%"
						padding="none medium"
						align="top-left"
						direction="column"
						overflow="scroll"
						variant="curved"
						gap="small"
						${node.fChildren && !node.fHideChildren ? 'border="small solid default bottom"' : ""}
					>
						<f-text variant="code" size="large" state="danger"
							>Error reading node ${node.id}.fData</f-text
						>
					</f-div>`,
					nodeSVGElement
				);
			}
		}
	}

	nodeMetaDispatchEvent(node: LineageNodeElement, isChildNode = false) {
		const nodeMeta = new CustomEvent("node-meta", {
			detail: { node: node, isChildNode: isChildNode },
			bubbles: true,
			composed: true
		});
		this.dispatchEvent(nodeMeta);
	}
}

/**
 * Required for typescript
 */
declare global {
	interface HTMLElementTagNameMap {
		"f-lineage": FLineage;
	}
}
