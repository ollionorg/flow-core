import {
	TimeseriesData,
	TimeseriesPoint,
	FTimeseriesChartConfig,
	FTimeseriesChart,
	YAxisLine,
	XAxisLine
} from "@cldcvr/flow-dashboard";
import { html } from "lit-html";
import { createRef, ref } from "lit/directives/ref.js";

export default {
	title: "@cldcvr/flow-dashboard/f-timeseries-chart",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

function generateLineChartData(
	numPoints: number,
	from?: Date,
	noOfSeries: number = 1
): TimeseriesData[] {
	const startFrom = new Date().getTime();
	const masterData: TimeseriesData[] = [];
	const colors = [
		"#1f77b4",
		"#ff7f0e",
		"#2ca02c",
		"#d62728",
		"#9467bd",
		"#8c564b",
		"#e377c2",
		"#7f7f7f",
		"#bcbd22",
		"#17becf"
	];
	for (let j = 0; j < noOfSeries; j++) {
		const startDate = from ? from.getTime() : startFrom;
		const points: TimeseriesPoint[] = [];
		for (let i = 0; i < numPoints; i++) {
			const currentDate = startDate + i * 60 * 1000; // Incrementing date by one day
			let fluctuatingValue = Math.floor(Math.random() * 10) + 100; //Math.random() * (yOffSet ?? 100) + Math.sin(i / 8) * 50; // Adding a sine wave for fluctuation
			if (fluctuatingValue < 0) {
				fluctuatingValue *= -1;
			}
			if (fluctuatingValue % 9 === 0) {
				fluctuatingValue = 150 * getRndInteger(1, 2);
			}
			const dataPoint: TimeseriesPoint = {
				date: currentDate,
				value: +fluctuatingValue.toFixed(0)
			};

			points.push(dataPoint);
		}
		masterData.push({ seriesName: `Series-${j + 1}`, points, color: colors[j] });
	}

	return masterData;
}

function getRndInteger(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const Basic = {
	render: () => {
		const chartData = generateLineChartData(200, new Date(), 3);

		const yLines: YAxisLine[] = [
			{
				value: 260,
				color: "var(--color-danger-default)"
			},
			{
				value: 160,
				color: "var(--color-warning-default)"
			}
		];

		const xLines: XAxisLine[] = [
			{
				value: chartData[0].points[120].date,
				color: "var(--color-highlight-default)"
			},
			{
				value: chartData[0].points[160].date,
				color: "var(--color-highlight-default)"
			}
		];

		const chartRef = createRef<FTimeseriesChart>();
		const chartConfig: FTimeseriesChartConfig = {
			data: chartData,
			type: "line",
			xAxis: {
				lines: xLines
			},
			yAxis: {
				lines: yLines
			}
		};

		const interval = setInterval(() => {
			const chartDataFlat = chartData.map(series => series.points).flat();
			const newPoints = generateLineChartData(
				1,
				new Date(chartDataFlat[chartDataFlat.length - 1].date + 60 * 1000),
				3
			);
			newPoints.forEach(element => {
				const series = chartData.find(c => c.seriesName === element.seriesName);
				series?.points.shift();
				series?.points.push(...element.points);
			});
			if (chartRef.value) {
				chartRef.value.config = { ...chartConfig };
			}
		}, 1000);

		setTimeout(() => {
			clearInterval(interval);
		}, 15000);
		return html`<f-div height="500px">
			<f-timeseries-chart ${ref(chartRef)} .config=${chartConfig}></f-timeseries-chart>
		</f-div>`;
	},

	name: "basic"
};
