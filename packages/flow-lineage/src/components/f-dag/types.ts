import { HTMLTemplateResult } from "lit";

export type CoOrdinates = {
	x?: number;
	y?: number;
};

export type CustomPlacementBySection = {
	section: number;
	position: "before" | "after";
};
export type CustomPlacementByElement = {
	elementId: string;
	position: "before" | "after";
};
export type CustomPlacement = CustomPlacementBySection | CustomPlacementByElement;
export type FDagElement = {
	id: string;
	label: string;
	icon: string;
	group?: string;
	placement?: CustomPlacement;
	hidden?: boolean;
	effect?: "pulse" | "loading";
} & CoOrdinates;

export type FDagNode = {
	height?: number;
	width?: number;
	template?: (node: FDagNode) => HTMLTemplateResult;
} & FDagElement;

export type FDagGroup = {
	height?: number;
	width?: number;
	spacing?: {
		x: number;
		y: number;
	};
	layoutDirection?: "horizontal" | "vertical";
	collapsed?: boolean;
} & FDagElement;

export type FDagLinkDirection = "horizontal" | "vertical";
export type FDagLink = {
	from: CoOrdinates & { elementId: string };
	to: CoOrdinates & { elementId: string };
	direction?: FDagLinkDirection;
};

export type FDagConfig = {
	nodes: FDagNode[];
	links: FDagLink[];
	groups: FDagGroup[];
	spacing?: {
		x: number;
		y: number;
	};
	defaultNodeSize?: {
		width: number;
		height: number;
	};
	nodeTemplate?: (node: FDagNode) => HTMLTemplateResult;
	layoutDirection?: "horizontal" | "vertical";
};

export type FDagComputedNode = {
	next: FDagComputedNode[];
} & FDagElement;

// Renders attribute names of parent element to textContent
export type HierarchyNode = {
	id: string;
	height?: number;
	width?: number;
	group?: string;
	type: "group" | "node";
	placement?: CustomPlacement;
	children: HierarchyNode[];
	next?: HierarchyNode[];
};
