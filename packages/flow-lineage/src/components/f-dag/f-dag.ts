/* eslint-disable @typescript-eslint/ban-ts-comment */
import { flowElement, FRoot } from "@ollion/flow-core";
import { injectCss } from "@ollion/flow-core-config";
import globalStyle from "./f-dag-global.scss?inline";
import { html, PropertyValueMap, unsafeCSS } from "lit";
import { ref, createRef, Ref } from "lit/directives/ref.js";
import * as d3 from "d3";

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

	createRenderRoot() {
		return this;
	}
	scale = 1;

	svgElement: Ref<SVGSVGElement> = createRef();
	currentLine?: d3.Selection<SVGLineElement, unknown, null, undefined>;

	dragNode(event: MouseEvent) {
		if (event.buttons === 1 && this.currentLine === undefined) {
			const nodeElement = event.currentTarget as HTMLElement;

			if (nodeElement) {
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
				const dagLine = d3.selectAll(".dag-line");

				dagLine
					.attr("x2", function () {
						return +d3.select(this).attr("x2") + event.movementX;
					})
					.attr("y2", function () {
						return +d3.select(this).attr("y2") + event.movementY;
					});
			}
		}
	}

	plotLine(event: MouseEvent) {
		event.stopPropagation();
		const circle = event.currentTarget as HTMLElement;
		const rect = circle.getBoundingClientRect();
		const dagRect = this.getBoundingClientRect();
		const svg = d3.select(this.svgElement.value!);
		this.currentLine = svg
			.append("line")
			.attr("class", "dag-line")
			.attr("x2", rect.left - dagRect.left + 4)
			.attr("y2", rect.top - dagRect.top + 4)
			.attr("x1", event.clientX - dagRect.left)
			.attr("y1", event.clientY - dagRect.top)
			.attr("stroke", "var(--color-primary-default)");
	}
	checkMouseMove(event: MouseEvent) {
		if (event.buttons === 1 && this.currentLine) {
			const dagRect = this.getBoundingClientRect();
			this.currentLine
				.attr("x1", event.clientX - dagRect.left)
				.attr("y1", event.clientY - dagRect.top);
		} else {
			this.currentLine = undefined;
			//this.currentLine?.remove();
		}
	}

	render() {
		return html`<f-div width="100%" height="100%" @mousemove=${this.checkMouseMove}
			><svg class="main-svg" ${ref(this.svgElement)}></svg>
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
			<f-div
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
				@mousemove=${this.dragNode}
			>
				<f-icon source="i-user"></f-icon>
				<f-text size="small" weight="medium">Node</f-text>
				<span class="circle left" @mousedown=${this.plotLine}></span>
				<span class="circle right" @mousedown=${this.plotLine}></span>
				<span class="circle top" @mousedown=${this.plotLine}></span>
				<span class="circle bottom" @mousedown=${this.plotLine}></span>
			</f-div>
		</f-div> `;
	}
	protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
		super.updated(changedProperties);

		const svg = d3.select(this.svgElement.value!);

		svg
			.append("line")
			.attr("class", "dag-line")
			.attr("x1", this.offsetWidth / 2)
			.attr("y1", this.offsetHeight / 2)
			.attr("x2", 100)
			.attr("y2", 48)
			.attr("stroke", "var(--color-border-default)");
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
