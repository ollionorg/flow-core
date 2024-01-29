import { TickInterval, TooltipPoints } from "./f-timeseries-chart-types";
import * as d3 from "d3";
import { html } from "lit";

export function getTickInterval({ type, every }: TickInterval) {
	return d3.timeInterval(
		(_date: Date) => {},
		(date: Date, _step: number) => {
			switch (type) {
				case "milliseconds":
					date.setMilliseconds(date.getMilliseconds() + every);
					break;
				case "seconds":
					date.setSeconds(date.getSeconds() + every);
					break;
				case "minutes":
					date.setMinutes(date.getMinutes() + every);
					break;
				case "hours":
					date.setHours(date.getHours() + every);
					break;
				case "days":
					date.setDate(date.getDate() + every);
					break;
				case "months":
					date.setMonth(date.getMonth() + every);
					break;
				case "years":
					date.setFullYear(date.getFullYear() + every);
			}
		}
	);
}

export function defaultTooltipTemplate(tooltipDate: Date, tooltipPoints: TooltipPoints) {
	return html`<f-div width="100%" direction="column" gap="small">
		<f-text>Date : ${tooltipDate.toLocaleDateString()} ${tooltipDate.toLocaleTimeString()}</f-text>
		${tooltipPoints.map(point => {
			return html`<f-text
				>${point.seriesName} :
				<f-text inline weight="bold" .state=${"custom," + point.color}
					>${point?.value}</f-text
				></f-text
			>`;
		})}
	</f-div>`;
}

export function escapeSeriesName(name: string) {
	return name.replace(/[^a-zA-Z0-9]/g, "_");
}
