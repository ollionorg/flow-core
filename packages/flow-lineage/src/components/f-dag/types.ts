export type CoOrdinates = {
	x?: number;
	y?: number;
};
export type FDagElement = {
	id: string;
	label: string;
	icon: string;
	height: number;
	width: number;
	group?: string;
} & CoOrdinates;

export type FDagLinkDirection = "horizontal" | "vertical";
export type FDagLink = {
	from: CoOrdinates & { elementId: string };
	to: CoOrdinates & { elementId: string };
	linkDirection?: FDagLinkDirection;
};

export type FDagConfig = {
	nodes: FDagElement[];
	links: FDagLink[];
	groups: FDagElement[];
};

export type FDagComputedNode = {
	next: FDagComputedNode[];
} & FDagElement;
