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
	height?: number;
	width?: number;
	group?: string;
	spacing?: {
		x: number;
		y: number;
	};
	placement?: CustomPlacement;
} & CoOrdinates;

export type FDagLinkDirection = "horizontal" | "vertical";
export type FDagLink = {
	from: CoOrdinates & { elementId: string };
	to: CoOrdinates & { elementId: string };
	direction?: FDagLinkDirection;
};

export type FDagConfig = {
	nodes: FDagElement[];
	links: FDagLink[];
	groups: Omit<FDagElement, "height" | "width">[];
	spacing?: {
		x: number;
		y: number;
	};
	defaultNodeSize?: {
		width: number;
		height: number;
	};
	layoutDirection?: "horizontal" | "vertical";
};

export type FDagComputedNode = {
	next: FDagComputedNode[];
} & FDagElement;
