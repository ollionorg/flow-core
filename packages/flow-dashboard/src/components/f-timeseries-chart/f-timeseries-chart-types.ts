import { HTMLTemplateResult } from "lit";

export type AxisLine = {
	value: number;
	color: string;
};

export type YAxisLine = AxisLine;
export type XAxisLine = AxisLine;
export type TimeseriesPoint = {
	date: number;
	value: number;
};

export type SeriesType = "line" | "bar" | "area";
export type TimeseriesData = {
	seriesName: string;
	points: TimeseriesPoint[];
	color: string;
	type: SeriesType;
	disable?: boolean;
};

export type FTimeseriesTickAuto = {
	type: "auto";
};

export type TickInterval = {
	type: "milliseconds" | "seconds" | "minutes" | "hours" | "days" | "months" | "years";
	every: number;
};

export type FTimeseriesXTickInterval = {
	type: "interval";
	interval: TickInterval;
};

export type FTimeseriesXTickValues = {
	type: "values";
	values: Date[];
};

export type FTimeseriesYTickValues = {
	type: "values";
	values: number[];
};

export type FTimeseriesXTickConfig = {
	format?: (tickDate: Date) => string;
} & (FTimeseriesTickAuto | FTimeseriesXTickInterval | FTimeseriesXTickValues);

export type FTimeseriesYTickConfig = {
	format?: (value: number) => string;
} & (FTimeseriesTickAuto | FTimeseriesYTickValues);

export type FTimeseriesLegendTemplate = (
	interactions: FTimeseriesLegendInteraction
) => HTMLTemplateResult;
export type FTimeseriesLegendInteraction = {
	click: (seriesName: string) => void;
	mouseLeave: () => void;
	mouseEnter: (seriesName: string) => void;
};

export type FTimeseriesChartConfig = {
	data: TimeseriesData[];
	size?: {
		width?: number;
		height?: number;
		margin?: {
			top?: number;
			right?: number;
			left?: number;
			bottom?: number;
		};
	};
	xAxis?: {
		lines?: XAxisLine[];
		tickConfig?: FTimeseriesXTickConfig;
	};
	yAxis?: {
		lines?: YAxisLine[];
		tickConfig?: FTimeseriesYTickConfig;
	};
	legends?: {
		disabled?: boolean;
		position?: "bottom" | "left" | "right" | "top";
		template?: FTimeseriesLegendTemplate;
	};
	tooltipTemplate?: (tooltipDate: Date, tooltipPoints: TooltipPoints) => HTMLTemplateResult;
};

export type TooltipPoints = {
	seriesName: string;
	value: number;
	color: string;
	type: SeriesType;
}[];
