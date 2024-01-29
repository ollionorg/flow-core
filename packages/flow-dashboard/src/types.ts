import { HTMLTemplateResult } from "lit";
import { FTimeseriesChartConfig } from "./components/f-timeseries-chart/f-timeseries-chart-types";

export type FDashboardConfig = {
	widgets: FDashboardWidget[];
};

export type FDashboardWidgetGridPlacement = {
	h: number;
	w: number;
	x?: number;
	y?: number;
};

export type FDashboardWidgetCore<T> = {
	id: string;
	placement: FDashboardWidgetGridPlacement;
	data: T;
	header?:
		| {
				title: string;
				description?: string;
		  }
		| (() => HTMLTemplateResult);
};

export type FDashboardBigNumberWidget = FDashboardWidgetCore<number> & {
	type: "big-number";
	dataType?: "storage" | "time" | "count" | "currency" | "percentage";
};
export type FDashboardWidget = FDashboardBigNumberWidget | FDashboardTimeseriesWidget;

export type FDashboardTimeseriesWidget = FDashboardWidgetCore<FTimeseriesChartConfig> & {
	type: "timeseries";
};
