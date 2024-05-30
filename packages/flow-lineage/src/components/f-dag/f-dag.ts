/* eslint-disable @typescript-eslint/ban-ts-comment */
import { flowElement, FRoot } from "@ollion/flow-core";
import { injectCss } from "@ollion/flow-core-config";
import globalStyle from "./f-dag-global.scss?inline";
import { html, PropertyValueMap, unsafeCSS } from "lit";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import * as d3 from "d3";
import { queryAll } from "lit/decorators.js";

injectCss("f-dag", globalStyle);
// Renders attribute names of parent element to textContent

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

	@queryAll(`[data-node-type="group"],[data-group]`)
	allGroups?: HTMLElement[];

	createRenderRoot() {
		return this;
	}
	scale = 1;

	svgElement: Ref<SVGSVGElement> = createRef();
	currentLine?: d3.Selection<SVGLineElement, unknown, null, undefined>;

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
		const fromLines = d3.selectAll(`.dag-line[id^="${nodeElement.getAttribute("id")}->"]`);

		fromLines
			.attr("x1", function () {
				return +d3.select(this).attr("x1") + event.movementX;
			})
			.attr("y1", function () {
				return +d3.select(this).attr("y1") + event.movementY;
			});

		const toLines = d3.selectAll(`.dag-line[id$="->${nodeElement.getAttribute("id")}"]`);

		toLines
			.attr("x2", function () {
				return +d3.select(this).attr("x2") + event.movementX;
			})
			.attr("y2", function () {
				return +d3.select(this).attr("y2") + event.movementY;
			});
	}
	dragNode(event: MouseEvent) {
		event.stopPropagation();
		if (event.buttons === 1 && this.currentLine === undefined) {
			const nodeElement = event.currentTarget as HTMLElement;
			nodeElement.style.zIndex = `3`;
			if (nodeElement) {
				this.moveElement(nodeElement, event);

				if (nodeElement.dataset.nodeType === "group") {
					const groupNodes = this.querySelectorAll<HTMLElement>(
						`[data-group="${nodeElement.getAttribute("id")}"]`
					);
					groupNodes.forEach(gn => {
						this.moveElement(gn, event);
					});
				}
			}
		}
	}

	startPlottingLine(event: MouseEvent) {
		event.stopPropagation();
		this.allGroups?.forEach(n => {
			n.style.pointerEvents = "none";
		});
		const circle = event.currentTarget as HTMLElement;
		const rect = circle.getBoundingClientRect();
		const dagRect = this.getBoundingClientRect();
		const svg = d3.select(this.svgElement.value!);
		this.currentLine = svg
			.append("line")
			.attr("class", "dag-line")
			.attr("id", `${circle.dataset.nodeId}->`)
			.attr("x1", rect.left - dagRect.left + 4)
			.attr("y1", rect.top - dagRect.top + 4)
			.attr("x2", event.clientX - dagRect.left)
			.attr("y2", event.clientY - dagRect.top)
			.attr("stroke", "var(--color-primary-default)");
	}
	updateLinePath(event: MouseEvent) {
		if (event.buttons === 1 && this.currentLine) {
			const dagRect = this.getBoundingClientRect();
			this.currentLine
				.attr("x2", event.clientX - dagRect.left)
				.attr("y2", event.clientY - dagRect.top);
		} else {
			this.currentLine?.remove();
			this.currentLine = undefined;
		}
	}
	dropLine(event: MouseEvent) {
		const circle = event.currentTarget as HTMLElement;
		const rect = circle.getBoundingClientRect();
		const dagRect = this.getBoundingClientRect();
		this.allGroups?.forEach(n => {
			n.style.pointerEvents = "all";
		});
		if (this.currentLine) {
			this.currentLine
				.attr("id", function () {
					return d3.select(this).attr("id") + circle.dataset.nodeId;
				})
				.attr("x2", rect.left - dagRect.left + 4)
				.attr("y2", rect.top - dagRect.top + 4);

			this.currentLine = undefined;
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

		const allGroups = this.querySelectorAll<HTMLElement>(`[data-node-type="group"]`);
		let insideGroup = false;
		for (let index = 0; index < allGroups.length; index++) {
			const group = allGroups.item(index);
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
			${[1, 2, 3, 4].map(n => {
				return html`<f-div
					padding="medium"
					state="secondary"
					align="middle-left"
					variant="curved"
					height="48px"
					width="200px"
					class="dag-node"
					gap="medium"
					border="small solid subtle around"
					clickable
					data-node-type="node"
					.id=${`d-node-${n}`}
					@mousemove=${this.dragNode}
					@mouseup=${this.updateNodePosition}
				>
					<f-icon source="i-user"></f-icon>
					<f-text size="small" weight="medium">Node ${n}</f-text>
					${["left", "right", "top", "bottom"].map(side => {
						return html`<span
							data-node-id=${`d-node-${n}`}
							class="circle ${side}"
							@mouseup=${this.dropLine}
							@mousedown=${this.startPlottingLine}
						></span>`;
					})}
				</f-div>`;
			})}
			${[1, 2].map(g => {
				return html`<f-div
					align="top-left"
					variant="curved"
					height="200px"
					width="400px"
					class="dag-node"
					data-node-type="group"
					border="small solid subtle around"
					.id=${`d-group-${g}`}
					@mousemove=${this.dragNode}
					@mouseup=${this.updateNodePosition}
				>
					<f-div gap="medium" height="hug-content" state="secondary" padding="medium">
						<f-icon source="i-user"></f-icon>
						<f-text size="small" weight="medium">Group ${g}</f-text>
					</f-div>
					${["left", "right", "top", "bottom"].map(side => {
						return html`<span
							data-node-id=${`d-group-${g}`}
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
