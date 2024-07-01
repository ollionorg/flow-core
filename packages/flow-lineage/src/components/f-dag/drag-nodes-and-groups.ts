import * as d3 from "d3";
import type { CoOrdinates, FDagLink } from "./types";
import type { FDag } from "./f-dag";

export function getTranslateValues(element: HTMLElement) {
	const style = window.getComputedStyle(element);
	const matrix = new DOMMatrixReadOnly(style.transform);

	// Extract translateX and translateY values
	const translateX = matrix.m41;
	const translateY = matrix.m42;

	return { translateX, translateY };
}

export function moveElement(this: FDag, nodeElement: HTMLElement, event: MouseEvent) {
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

	const newTranslateX = translateX + event.movementX * (1 / this.scale);
	const newTranslateY = translateY + event.movementY * (1 / this.scale);
	nodeElement.style.setProperty("transform", `translate(${newTranslateX}px, ${newTranslateY}px)`);

	const elementObject = this.getElement(nodeElement.getAttribute("id")!);
	elementObject.x = newTranslateX;
	elementObject.y = newTranslateY;

	nodeElement.dataset.lastTranslateX = `${newTranslateX}`;
	nodeElement.dataset.lastTranslateY = `${newTranslateY}`;
	const fromLines = d3.selectAll<SVGPathElement, FDagLink>(
		`.dag-line[id^="${nodeElement.getAttribute("id")}->"]`
	);

	fromLines.datum(d => {
		if (!d.from.x) {
			d.from.x = 0;
		}
		if (!d.from.y) {
			d.from.y = 0;
		}
		return {
			...d,
			from: {
				x: (d.from.x += event.movementX * (1 / this.scale)),
				y: (d.from.y += event.movementY * (1 / this.scale)),
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

		return this.generatePath(points, d.direction);
	});

	const toLines = d3.selectAll<SVGPathElement, FDagLink>(
		`.dag-line[id$="->${nodeElement.getAttribute("id")}"]`
	);

	toLines.datum(d => {
		if (!d.to.x) {
			d.to.x = 0;
		}
		if (!d.to.y) {
			d.to.y = 0;
		}
		return {
			...d,
			to: {
				x: (d.to.x += event.movementX * (1 / this.scale)),
				y: (d.to.y += event.movementY * (1 / this.scale)),
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

		return this.generatePath(points, d.direction).toString();
	});
}

export function dragNestedGroups(this: FDag, groupElement: HTMLElement, event: MouseEvent) {
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
export function dragNode(this: FDag, event: MouseEvent) {
	event.stopPropagation();
	if (event.buttons === 1 && this.currentLine === undefined) {
		const nodeElement = event.currentTarget as HTMLElement;
		nodeElement.style.zIndex = `3`;
		nodeElement.classList.add("dragging");
		if (nodeElement) {
			this.moveElement(nodeElement, event);
			this.dragNestedGroups(nodeElement, event);
		}
	}
}

export function updateNodePosition(this: FDag, event: MouseEvent) {
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
	nodeElement.classList.remove("dragging");
	const allGroupsAndNodes = this.querySelectorAll<HTMLElement>(`[data-node-type="group"]`);
	let insideGroup = false;
	let placedIn: HTMLElement | undefined;
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
			if (nodeElement.dataset.group !== group.getAttribute("id")) placedIn = group;
			nodeElement.dataset.group = group.getAttribute("id")!;
		}
	}

	if (!insideGroup) {
		delete nodeElement.dataset.group;
	} else if (placedIn) {
		placedIn.classList.add("dropped");

		setTimeout(() => {
			placedIn.classList.remove("dropped");
		}, 1000);
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
			d.direction
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
			d.direction
		);
	});

	console.log(this.config);
}
