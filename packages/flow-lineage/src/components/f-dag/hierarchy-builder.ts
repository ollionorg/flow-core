import { FDagConfig, FDagElement, HierarchyNode } from "./types";

export default function buildHierarchy(config: FDagConfig) {
	const nodesMap = new Map<string, HierarchyNode>();
	const customPlacementMap = new Map<string, HierarchyNode>();
	const groupMap = new Map<string, FDagElement>();

	config.groups.forEach(group => {
		groupMap.set(group.id, group);
	});

	config.nodes.forEach(node => {
		if (node.group && node.placement) {
			node.placement = undefined;
		}
		nodesMap.set(node.id, {
			id: node.id,
			group: node.group,
			width: node.width,
			type: "node",
			height: node.height,
			placement: node.placement,
			children: []
		});
		if (node.placement) {
			customPlacementMap.set(node.id, nodesMap.get(node.id)!);
		}
	});

	const roots: HierarchyNode[] = [];

	nodesMap.forEach(node => {
		if (!node.group) {
			roots.push(node);
		}
	});

	function addGroupToHierarchy(group: FDagElement, parent?: HierarchyNode): void {
		if (group.group && group.placement) {
			group.placement = undefined;
		}
		const groupNode: HierarchyNode = {
			id: group.id,
			type: "group",
			height: group.height,
			width: group.width,
			placement: group.placement,
			children: []
		};

		if (group.placement) {
			customPlacementMap.set(group.id, groupNode);
		}

		config.nodes.forEach(node => {
			if (node.group === group.id) {
				groupNode.children.push(nodesMap.get(node.id)!);
			}
		});

		if (parent) {
			parent.children.push(groupNode);
		} else {
			roots.push(groupNode);
		}

		config.groups.forEach(subGroup => {
			if (subGroup.group === group.id) {
				addGroupToHierarchy(subGroup, groupNode);
			}
		});
	}

	config.groups.forEach(group => {
		if (!group.group) {
			addGroupToHierarchy(group);
		}
	});

	return { roots, customPlacements: customPlacementMap };
}
