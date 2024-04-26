import type { LineageLinkElement, LineageNodeElement, LineageNodeLinks } from "../lineage-types";

export default function createLinks(
	links: LineageNodeLinks,
	nodeElementsMap: Record<string, LineageNodeElement>,
	biDirectionalLinks: string[]
) {
	/**
	 * array to hold all links
	 */
	const linkElements: LineageLinkElement[] = [];

	/**
	 * Converting array to object for better access of node elements
	 */
	const nodeElementsObj = nodeElementsMap;

	/**
	 * calculate source and target of link for nodes
	 *
	 */

	links.forEach(link => {
		const sourceNode = nodeElementsObj[link.from];
		const targetNode = nodeElementsObj[link.to];
		if (sourceNode && targetNode) {
			if (biDirectionalLinks.indexOf(targetNode.id + "->" + sourceNode.id) === -1) {
				linkElements.push({
					id: sourceNode.id + "->" + targetNode.id,
					level: sourceNode.level,
					source: sourceNode,
					target: nodeElementsObj[targetNode.id as string],
					fClick: link.fClick,
					label: link.label,
					tooltip: link.tooltip,
					showLabelOn: link.showLabelOn
				});
			}
		}
	});

	return linkElements;
}
