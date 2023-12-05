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
	pollingConfig?: {
		frequency: number; //Frequency in milliseconds
	};
};
export type FDashboardWidget = FDashboardWidgetCore<number> & {
	type: "big-number";
	dataType?: "storage" | "time" | "count" | "currency" | "percentage";
};
