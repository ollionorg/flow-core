import { faker } from "@faker-js/faker";
import {
	FTimeseriesChartConfig,
	FTimeseriesChart,
	YAxisLine,
	XAxisLine,
	TooltipPoints,
	TimeseriesData
} from "@nonfx/flow-dashboard";
import { html } from "lit-html";
import { createRef, ref } from "lit/directives/ref.js";
import { generateTimeseriesChartData } from "./mock-data-utils";

export default {
	title: "@nonfx/flow-dashboard/f-timeseries-chart",

	parameters: {
		controls: {
			hideNoControlsWarning: true
		}
	}
};

function getXYLines(chartData: TimeseriesData[]) {
	const yLines: YAxisLine[] = [
		{
			value: faker.number.int({ min: 150, max: 200 }),
			color: "var(--color-danger-default)"
		},
		{
			value: faker.number.int({ min: 50, max: 100 }),
			color: "var(--color-warning-default)"
		}
	];

	const xLines: XAxisLine[] = [
		{
			value: chartData[0].points[+(chartData[0].points.length / 3).toFixed(0)].date,
			color: "yellow"
		},
		{
			value: chartData[0].points[+(chartData[0].points.length / 2).toFixed(0)].date,
			color: "yellow"
		}
	];

	return {
		xLines,
		yLines
	};
}

export const AllOptions = {
	render: () => {
		const chartData = generateTimeseriesChartData(new Date());
		const { xLines, yLines } = getXYLines(chartData);

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
					const icons = ["i-area", "i-bar", "i-line"];
					return html`<f-div height="hug-content" gap="medium" align="middle-center">
						${chartData.map((series, idx) => {
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
							>
								<f-icon-button
									.state=${"custom," + series.color}
									category="packed"
									size="medium"
									.icon=${icons[idx]}
								></f-icon-button>
								<f-text>${series.seriesName}</f-text></f-div
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
			const newPoints = generateTimeseriesChartData(
				new Date(chartDataFlat[chartDataFlat.length - 1].date + 60 * 1000),
				chartData.length,
				1
			);
			newPoints.forEach((element, idx) => {
				const series = chartData[idx];
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

	name: "all-options"
};

export const CustomLegendTemplate = {
	render: () => {
		const chartData = generateTimeseriesChartData(new Date());

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
		const chartData = generateTimeseriesChartData(new Date());

		const { xLines, yLines } = getXYLines(chartData);

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
		const chartData = generateTimeseriesChartData(new Date());

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
		const chartData = generateTimeseriesChartData(new Date());

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
		const chartData = generateTimeseriesChartData(new Date());

		const { xLines, yLines } = getXYLines(chartData);

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
			const newPoints = generateTimeseriesChartData(
				new Date(chartDataFlat[chartDataFlat.length - 1].date + 60 * 1000),
				chartData.length,
				1
			);
			newPoints.forEach((element, idx) => {
				const series = chartData[idx];
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
