import {
	TimeseriesData,
	TimeseriesPoint,
	FTimeseriesChartConfig,
	FTimeseriesChart,
	YAxisLine,
	XAxisLine,
	TooltipPoints
} from "@ollion/flow-dashboard";
import { html } from "lit-html";
import { createRef, ref } from "lit/directives/ref.js";

export default {
	title: "@ollion/flow-dashboard/f-timeseries-chart",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

function getColor() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}
function generateLineChartData(
	numPoints: number,
	from?: Date,
	noOfSeries: number = 1
): TimeseriesData[] {
	const startFrom = new Date().getTime();
	const masterData: TimeseriesData[] = [];
	const colors = [
		"#7fc97f",
		"#1f77b4",
		"#a703d5",
		"#ffff99",
		"#386cb0",
		"#f0027f",
		"#bf5b17",
		"#666666"
	];
	const seriesTypes: ("line" | "bar" | "area")[] = ["area", "bar", "line"];

	for (let j = 0; j < noOfSeries; j++) {
		const startDate = from ? from.getTime() : startFrom;
		const points: TimeseriesPoint[] = [];
		for (let i = 0; i < numPoints; i++) {
			const currentDate = startDate + i * 60 * 1000; // Incrementing date by one day
			let fluctuatingValue = Math.floor(Math.random() * 10) + 50 * (j + 1); //Math.random() * (yOffSet ?? 100) + Math.sin(i / 8) * 50; // Adding a sine wave for fluctuation
			if (fluctuatingValue < 0) {
				fluctuatingValue *= -1;
			}
			if (fluctuatingValue % 9 === 0) {
				fluctuatingValue = 50 * (j + 1) * getRndInteger(1, 2);
			}
			const dataPoint: TimeseriesPoint = {
				date: currentDate,
				value: +fluctuatingValue.toFixed(0)
			};

			points.push(dataPoint);
		}
		masterData.push({
			seriesName: `Series-${j + 1}`,
			points,
			color: colors[j] ?? getColor(),
			type: seriesTypes[j] ?? "line"
		});
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
				color: "yellow"
			},
			{
				value: chartData[0].points[160].date,
				color: "yellow"
			}
		];

		const chartRef = createRef<FTimeseriesChart>();

		const customTickValues = [];
		for (let d = 0; d < 10; d++) {
			const date = new Date();
			date.setMinutes(date.getMinutes() + 15 * (d + 1));
			customTickValues.push(date);
		}
		const chartConfig: FTimeseriesChartConfig = {
			data: chartData,
			xAxis: {
				lines: xLines,
				tickConfig: {
					format: (d: Date) => {
						return `${d.getHours()}h${d.getMinutes()}m`;
					},
					// type: "auto"
					type: "interval",
					interval: {
						type: "minutes",
						every: 5
					}
					// type: "values",
					// values: customTickValues
				}
			},
			yAxis: {
				lines: yLines,
				tickConfig: {
					format: (value: number) => {
						return `#${value}`;
					},
					type: "auto"
					// type: "values",
					// values: [50, 100]
				}
			},
			legends: {
				disabled: false,
				position: "bottom",
				template: ({ click, mouseEnter, mouseLeave }) => {
					return html`<f-div height="hug-content" gap="medium" align="middle-center">
						${chartData.map(series => {
							return html`<f-div
								.id=${"legend-" + series.seriesName}
								class="timeseries-legend"
								width="hug-content"
								height="hug-content"
								@click=${() => click(series.seriesName)}
								@mouseenter=${() => mouseEnter(series.seriesName)}
								@mouseleave=${() => mouseLeave()}
								clickable
								align="middle-left"
								gap="small"
								><f-div
									width="16px"
									height="16px"
									variant="round"
									.state=${"custom," + series.color}
								></f-div
								><f-text>${series.seriesName}</f-text></f-div
							>`;
						})}
					</f-div>`;
				}
			},
			tooltipTemplate: (tooltipDate: Date, tooltipPoints: TooltipPoints) => {
				return html`<f-div
					width="280px"
					max-height="500px"
					overflow="scroll"
					direction="column"
					gap="small"
				>
					${tooltipPoints.map(point => {
						return html`<f-text weight="medium" .state=${"custom," + point.color}
							>${point.seriesName} : ${point?.value}</f-text
						>`;
					})}
					<f-divider state="subtle"></f-divider>
					<f-div align="middle-right" gap="x-small">
						<f-text inline variant="code" size="small">
							${tooltipDate.toLocaleDateString()} | ${tooltipDate.toLocaleTimeString()}</f-text
						>
					</f-div>
				</f-div>`;
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
		}, 3000);
		return html`<f-div height="500px">
			<f-timeseries-chart ${ref(chartRef)} .config=${chartConfig}></f-timeseries-chart>
		</f-div>`;
	},

	name: "basic"
};

export const CustomLegendTemplate = {
	render: () => {
		const chartData = generateLineChartData(200, new Date(), 3);

		const chartRef = createRef<FTimeseriesChart>();

		const chartConfig: FTimeseriesChartConfig = {
			data: chartData,
			xAxis: {
				tickConfig: {
					format: (d: Date) => {
						return `${d.getHours()}h${d.getMinutes()}m`;
					},
					// type: "auto"
					type: "interval",
					interval: {
						type: "minutes",
						every: 5
					}
					// type: "values",
					// values: customTickValues
				}
			},
			yAxis: {
				tickConfig: {
					format: (value: number) => {
						return `#${value}`;
					},
					type: "auto"
					// type: "values",
					// values: [50, 100]
				}
			},
			legends: {
				disabled: false,
				position: "bottom",
				template: ({ click, mouseEnter, mouseLeave }) => {
					const icons = ["i-user", "i-home", "i-computer"];
					return html`<f-div height="hug-content" align="middle-center">
						${chartData.map((series, idx) => {
							return html`<f-div
								.id=${"legend-" + series.seriesName}
								class="timeseries-legend"
								width="hug-content"
								height="hug-content"
								padding="small medium"
								@click=${() => click(series.seriesName)}
								@mouseenter=${() => mouseEnter(series.seriesName)}
								@mouseleave=${() => mouseLeave()}
								clickable
								align="middle-left"
								gap="small"
							>
								<f-icon-button
									.state=${"custom," + series.color}
									category="packed"
									size="small"
									.icon=${icons[idx]}
								></f-icon-button>
								<f-text .state=${"custom," + series.color}>${series.seriesName}</f-text></f-div
							>`;
						})}
					</f-div>`;
				}
			}
		};
		return html`<f-div height="500px">
			<f-timeseries-chart ${ref(chartRef)} .config=${chartConfig}></f-timeseries-chart>
		</f-div>`;
	},

	name: "legends-template"
};

export const Lines = {
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
				color: "yellow"
			},
			{
				value: chartData[0].points[160].date,
				color: "yellow"
			}
		];

		const chartRef = createRef<FTimeseriesChart>();

		const chartConfig: FTimeseriesChartConfig = {
			data: chartData,
			xAxis: {
				lines: xLines
			},
			yAxis: {
				lines: yLines
			}
		};

		return html`<f-div height="500px">
			<f-timeseries-chart ${ref(chartRef)} .config=${chartConfig}></f-timeseries-chart>
		</f-div>`;
	},

	name: "x-&-y-lines"
};

export const CustomTooltip = {
	render: () => {
		const chartData = generateLineChartData(200, new Date(), 3);

		const chartRef = createRef<FTimeseriesChart>();

		const chartConfig: FTimeseriesChartConfig = {
			data: chartData,

			tooltipTemplate: (tooltipDate: Date, tooltipPoints: TooltipPoints) => {
				return html`<f-div
					width="280px"
					max-height="500px"
					overflow="scroll"
					direction="column"
					gap="small"
				>
					${tooltipPoints.map(point => {
						return html`<f-text weight="medium" .state=${"custom," + point.color}
							>${point.seriesName} : ${point?.value}</f-text
						>`;
					})}
					<f-divider state="subtle"></f-divider>
					<f-div align="middle-right" gap="x-small">
						<f-text inline variant="code" size="small">
							${tooltipDate.toLocaleDateString()} | ${tooltipDate.toLocaleTimeString()}</f-text
						>
					</f-div>
				</f-div>`;
			}
		};

		return html`<f-div height="500px">
			<f-timeseries-chart ${ref(chartRef)} .config=${chartConfig}></f-timeseries-chart>
		</f-div>`;
	},

	name: "tooltip-template"
};

export const TickFormat = {
	render: () => {
		const chartData = generateLineChartData(200, new Date(), 3);

		const chartRef = createRef<FTimeseriesChart>();

		const chartConfig: FTimeseriesChartConfig = {
			data: chartData,
			xAxis: {
				tickConfig: {
					format: (d: Date) => {
						return `${d.getHours()}h${d.getMinutes()}m`;
					},
					type: "auto"
				}
			},
			yAxis: {
				tickConfig: {
					format: (value: number) => {
						return `#${value}`;
					},
					type: "auto"
				}
			}
		};

		return html`<f-div height="500px">
			<f-timeseries-chart ${ref(chartRef)} .config=${chartConfig}></f-timeseries-chart>
		</f-div>`;
	},

	name: "tick-format"
};

export const Realtime = {
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
				color: "yellow"
			},
			{
				value: chartData[0].points[160].date,
				color: "yellow"
			}
		];

		const chartRef = createRef<FTimeseriesChart>();

		const chartConfig: FTimeseriesChartConfig = {
			data: chartData,
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
		}, 60000 * 60);
		return html`<f-div height="500px">
			<f-timeseries-chart ${ref(chartRef)} .config=${chartConfig}></f-timeseries-chart>
		</f-div>`;
	},

	name: "realtime-data"
};
