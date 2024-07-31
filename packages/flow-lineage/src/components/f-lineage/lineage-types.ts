/* eslint-disable @typescript-eslint/no-explicit-any */

import { FPopover } from "@nonfx/flow-core";
import { FLineage } from "./f-lineage";
import { Ref } from "lit-html/directives/ref.js";
import { HTMLTemplateResult } from "lit";

export type LineageNodeTemplate = (node: LineageNodeElement) => HTMLTemplateResult;

export type LineageBaseNode = {
	id?: string;
	__id__?: string;
	__isProxy?: string;
	links?: LineageNodeLink[];
	fData?: Record<string, any>;
	fNodeMeta?: Record<string, any>;
	fNodeTemplate?: LineageNodeTemplate;
	fClick?: (event: Event, node: LineageNodeElement) => void;
	fRightClick?: (event: Event, node: LineageNodeElement) => void;
};
export type LineageNodeChildren = LineageBaseNode;
// Lineage node type
export type LineageNode = {
	to?: LineageNode[];
	fHideChildren?: boolean;
	fChildren?: Record<string, LineageNodeChildren>;
} & LineageBaseNode;

// Lineage Node children

export type LineageNodeLink = {
	nodeid: string;
};

export type LineageNodeSize = {
	width: number;
	height: number;
};
export type LineageNodeElement = {
	x: number;
	y: number;
	level: number;
	isChildren?: boolean;
	childrenYMax?: number;
	childrenXMax?: number;
	hasScrollbaleChildren?: boolean;
	parentId?: string;
	parent?: LineageNodeElement;
	offset?: number;
	isVisible?: boolean;
	childrenToggle?: HTMLTemplateResult;
	popoverToggle?: string;
	fHideChildren?: boolean;
	fClick?: (event: Event, node: LineageNodeElement) => void;
} & Omit<LineageNode, "to">;

export type LineageGapElement = {
	x: number;
	y: number;
};

export type LineageLevelGaps = Record<number, LineageGapElement[]>;
export type Lineage = {
	nodes: LineageNodeElement[];
	links: LineageLinkElement[];
	gaps: LineageLevelGaps;
	levelPointers: LevelPointer;
};

export type LineageLinkElement = {
	id: string;
	source: LineageNodeElement;
	target: LineageNodeElement;
	level: number;
	label?: string;
	tooltip?: string;
	showLabelOn?: "click" | "hover";
	fClick?: (event: Event, node: LineageLinkElement) => void;
};

export type LineageDirection = "horizontal" | "vertical";

export type LevelLinkGap = Record<number, { linkgap: number; nodeLinkGap: Record<string, number> }>;

export type LineageData = LineageNode[];

export type DrawLineageParams = {
	lineage: Lineage;
	svg: d3.Selection<SVGGElement, unknown, null, undefined>;
	nodeSize: LineageNodeSize;
	childrenNodeSize: LineageNodeSize;
	gap: number;
	direction: LineageDirection;
	maxChildrenHeight: number;
	element: FLineage;
	levelsToPlot: number[];
	page: number;
	filter?: (link: LineageLinkElement) => boolean;
	popoverRef?: Ref<FPopover>;
};

export type CreateLineageParams = {
	data: LineageNode[];
	nodeSize: LineageNodeSize;
	childrenNodeSize: LineageNodeSize;
	padding: number;
	gap: number;
	direction: LineageDirection;
	maxChildrenHeight: number;
	links: LineageNodeLinks;
	biDirectionalLinks: string[];
};

export type CreateLinkPathParams = {
	sx: number;
	sy: number;
	dx: number;
	dy: number;
	endArcRadius: number;
	startArcRadius: number;
	getLinkGap: (level: number, nodeid: string) => number;
	nodeSize: LineageNodeSize;
	gap: number;
	d: LineageLinkElement;
	lineage: Lineage;
	element?: FLineage;
};

export type HorizontalLinkPathParams = {
	midX: number;
} & CreateLinkPathParams;
export type VerticalLinkPathParams = {
	midY: number;
} & CreateLinkPathParams;

export type LevelPointer = Record<number, { x: number; y: number }>;

export type LineageNodeChildrens = Record<string, LineageNodeChildren>;
export type LineageNodePartial = Omit<LineageNode, "to" | "links" | "id"> & {
	fChildren?: LineageNodeChildrens;
	fClick?: (event: Event, node: LineageNodeElement) => void;
};
export type LineageNodes = Record<string, LineageNodePartial>;

export type LineageNodeLinkSchema = {
	from: string;
	to: string;
	showLabelOn?: "click" | "hover";
	label?: string;
	tooltip?: string;
	fClick?: (event: Event, node: LineageLinkElement) => void;
	state?: "success" | "danger" | "warning" | "primary" | "default";
	type?: "solid" | "dotted" | "dashed";
};
export type LineageNodeLinks = LineageNodeLinkSchema[];
