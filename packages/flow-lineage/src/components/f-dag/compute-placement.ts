import type { FDag } from "./f-dag";
import buildHierarchy from "./hierarchy-builder";
import {
	CustomPlacementByElement,
	CustomPlacementBySection,
	FDagElement,
	FDagGroup,
	HierarchyNode
} from "./types";

export default function computePlacement(this: FDag) {
	this.groupsHTML = [];
	this.nodesHTML = [];

	const { roots: rootNodes, customPlacements } = buildHierarchy(this.config);

	const positionNodes = (
		containerId: string,
		elements: HierarchyNode[],
		x: number,
		y: number,
		isCollapsed: boolean,
		spaceX = 100,
		spaceY = 100
	) => {
		const elementIds = elements.map(e => e.id);
		const conatinerElementObject = this.getElement(containerId) as FDagGroup;
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
		for (const link of nodeLinks) {
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
		}

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
				if (!isCollapsed) {
					if (layoutDirection === "vertical") {
						y += maxHeight + spaceY;
						x = initialX;
					} else {
						x += maxWidth + spaceX;
						y = initialY;
					}
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
					for (const b of beforeCustomElements) {
						if (b) placeElement(b);
					}

					if (elementObject.x === undefined) {
						elementObject.x = x;
					} else {
						x = elementObject.x;
					}
					if (elementObject.y === undefined) {
						elementObject.y = y;
					} else {
						y = elementObject.y;
					}

					if (n.type === "group" && n.children && n.children.length > 0) {
						const isCollapseRequired =
							isCollapsed || Boolean((elementObject as FDagGroup).collapsed);
						const { width, height } = positionNodes(
							n.id,
							n.children,
							isCollapseRequired ? x : x + 20,
							isCollapseRequired ? y : y + 60,
							isCollapseRequired,
							(elementObject as FDagGroup).spacing?.x,
							(elementObject as FDagGroup).spacing?.y
						);
						if (isCollapsed) {
							elementObject.hidden = true;
						} else {
							elementObject.hidden = false;
						}
						elementObject.width = width < 150 ? 150 : width;
						elementObject.height = height + (isCollapseRequired ? 0 : 20);
					} else if (isCollapsed) {
						elementObject.hidden = true;
					} else {
						elementObject.hidden = false;
					}

					if (!elementObject.width) {
						elementObject.width = this.defaultElementWidth;
					}
					if (!elementObject.height) {
						elementObject.height = this.defaultElementHeight;
					}

					if (n.type === "group") {
						this.groupsHTML.push(this.getNodeGroupTemplate(elementObject, "group"));
					} else {
						this.nodesHTML.push(this.getNodeGroupTemplate(elementObject));
					}

					if (x + elementObject.width > maxX) {
						maxX = x + elementObject.width;
					}
					if (y + elementObject.height > maxY) {
						maxY = y + elementObject.height;
					}

					if (!isCollapsed) {
						if (layoutDirection === "vertical") {
							x += elementObject.width + spaceX;
						} else {
							y += elementObject.height + spaceY;
						}
					}

					if (elementObject.width > maxWidth) {
						maxWidth = elementObject.width;
					}
					if (elementObject.height > maxHeight) {
						maxHeight = elementObject.height;
					}

					for (const b of afterCustomElements) {
						if (b) placeElement(b);
					}
					currentNodeId = null;
					if (n.next) nexts.push(...n.next);
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
			for (const b of beforeElements) {
				if (b) placeElement(b);
			}

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
			for (const b of afterElements) {
				if (b) placeElement(b);
			}
			nextSection();

			if (nexts.length > 0) calculateCords(nexts);
		};
		calculateCords(Array.from(roots));
		if (isCollapsed) {
			return {
				width: this.collapsedNodeWidth,
				height: this.collapsedNodeHeight
			};
		}

		return {
			width: maxX - minX + 40,
			height: maxY - minY + 60
		};
	};

	positionNodes("root", rootNodes, 0, 0, false, this.config.spacing?.x, this.config.spacing?.y);
}
